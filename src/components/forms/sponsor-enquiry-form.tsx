
"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";

import Link from "next/link";

import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  RotateCcw,
  ShieldCheck,
  X,
} from "lucide-react";

import { sponsorEnquirySchema } from "@/lib/validations/forms";

import {
  TextField,
  TextAreaField,
  CheckboxField,
} from "@/components/ui/form-fields";

import {
  trackEvent,
  AnalyticsEvents,
} from "@/lib/analytics";

type SponsorValues = {
  companyName: string;
  contactPerson: string;
  businessEmail: string;
  phone: string;
  packageInterest: string;
  message: string;
  privacyConsent: boolean;
};

type SubmissionStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";

type ApiResponse = {
  error?: string;
  referenceNumber?: string;
};

const API_ENDPOINT = "/api/sponsor-enquiry";

const FIELD_IDS: Record<keyof SponsorValues, string> = {
  companyName: "sponsor-company",
  contactPerson: "sponsor-person",
  businessEmail: "sponsor-email",
  phone: "sponsor-phone",
  packageInterest: "sponsor-interest",
  message: "sponsor-message",
  privacyConsent: "sponsor-consent",
};

function makeInitialValues(): SponsorValues {
  return {
    companyName: "",
    contactPerson: "",
    businessEmail: "",
    phone: "",
    packageInterest: "",
    message: "",
    privacyConsent: false,
  };
}

/* ==================================================
   SUCCESS DIALOG
================================================== */

function SponsorSuccessDialog({
  contactName,
  referenceNumber,
  onClose,
  onReset,
}: {
  contactName: string;
  referenceNumber: string | null;
  onClose: () => void;
  onReset: () => void;
}) {
  const titleId = useId();
  const descriptionId = useId();

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef =
    useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const buttons = Array.from(
        dialogRef.current?.querySelectorAll<HTMLButtonElement>(
          "button:not([disabled])"
        ) ?? []
      );

      if (buttons.length === 0) return;

      const first = buttons[0];
      const last = buttons[buttons.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#191C21]/80 px-4 py-8"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="relative w-full max-w-[480px] overflow-hidden rounded-[12px] border border-[#E4E2DE] bg-white shadow-2xl"
      >
        <div
          aria-hidden="true"
          className="h-1 bg-brand-red"
        />

        {/* CLOSE */}

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close sponsorship confirmation"
          className="absolute right-4 top-5 flex h-10 w-10 items-center justify-center rounded-md text-muted transition-colors hover:bg-[#F7F6F3] hover:text-foreground focus-visible:outline-2 focus-visible:outline-brand-red"
        >
          <X
            aria-hidden="true"
            className="h-5 w-5"
            strokeWidth={1.8}
          />
        </button>

        <div className="px-7 pb-9 pt-10 text-center sm:px-10">
          {/* CONFIRMATION ICON */}

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#E4E2DE] bg-background">
            <CheckCircle2
              aria-hidden="true"
              className="h-9 w-9 text-brand-red"
              strokeWidth={1.7}
            />
          </div>

          <p className="mt-6 font-heading text-xs font-bold uppercase tracking-[0.15em] text-brand-red">
            Submission Successful
          </p>

          <h2
            id={titleId}
            className="mt-3 font-heading text-2xl font-bold leading-[1.25] tracking-[-0.035em] text-foreground sm:text-3xl"
          >
            Enquiry Submitted
          </h2>

          <p
            id={descriptionId}
            className="mx-auto mt-4 max-w-[365px] font-body text-sm leading-[1.8] text-muted"
          >
            Thank you, {contactName}. Your
            sponsorship enquiry has been
            submitted for review by the
            organizing team.
          </p>

          {/* REFERENCE NUMBER */}

          {referenceNumber && (
            <div className="mt-6 rounded-md border border-[#E4E2DE] bg-background px-5 py-4">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                Enquiry Reference
              </p>

              <p className="mt-2 break-all font-heading text-base font-bold text-foreground">
                {referenceNumber}
              </p>
            </div>
          )}

          <p className="mt-5 text-xs leading-6 text-muted">
            Submitting an enquiry does not
            confirm a sponsorship agreement
            or package allocation.
          </p>

          {/* POPUP ACTIONS */}

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-12 items-center justify-center rounded-button border border-[#D9D7D3] bg-white px-5 font-heading text-sm font-bold text-foreground transition-colors hover:border-brand-red hover:text-brand-red"
            >
              Close
            </button>

            <button
              type="button"
              onClick={onReset}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-button bg-brand-red px-5 font-heading text-sm font-bold text-white transition-colors hover:bg-brand-red-hover"
            >
              <RotateCcw
                aria-hidden="true"
                className="h-4 w-4"
              />
              New Enquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==================================================
   SPONSOR ENQUIRY FORM
================================================== */

export function SponsorEnquiryForm() {
  const [values, setValues] =
    useState<SponsorValues>(makeInitialValues);

  const [errors, setErrors] =
    useState<Record<string, string>>({});

  const [status, setStatus] =
    useState<SubmissionStatus>("idle");

  const [referenceNumber, setReferenceNumber] =
    useState<string | null>(null);

  const [serverError, setServerError] =
    useState<string | null>(null);

  const [showSuccessDialog, setShowSuccessDialog] =
    useState(false);

  const submittingRef = useRef(false);
  const errorRef = useRef<HTMLParagraphElement>(null);

  function update<K extends keyof SponsorValues>(
    field: K,
    value: SponsorValues[K]
  ) {
    setValues((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => {
      if (!previous[field]) return previous;

      const next = { ...previous };
      delete next[field];
      return next;
    });

    setServerError(null);

    if (status === "error") {
      setStatus("idle");
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (
      submittingRef.current ||
      status === "success"
    ) {
      return;
    }

    setServerError(null);

    const parsed =
      sponsorEnquirySchema.safeParse(values);

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};

      for (const issue of parsed.error.issues) {
        const field = String(issue.path[0] ?? "");

        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }

      setErrors(fieldErrors);
      setStatus("idle");

      const firstField = String(
        parsed.error.issues[0]?.path[0] ?? ""
      ) as keyof SponsorValues;

      requestAnimationFrame(() => {
        const elementId = FIELD_IDS[firstField];

        if (elementId) {
          document.getElementById(elementId)?.focus();
        }
      });

      return;
    }

    submittingRef.current = true;

    setErrors({});
    setStatus("loading");

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });

      const result = (await response.json().catch(
        () => null
      )) as ApiResponse | null;

      if (!response.ok) {
        throw new Error(
          typeof result?.error === "string"
            ? result.error
            : "Unable to submit your enquiry. Please try again."
        );
      }

      setReferenceNumber(
        typeof result?.referenceNumber === "string"
          ? result.referenceNumber
          : null
      );

      setStatus("success");
      setShowSuccessDialog(true);

      try {
        trackEvent(AnalyticsEvents.SPONSOR_ENQUIRY, {
          packageInterest: values.packageInterest,
        });
      } catch {
        // Analytics failure must not change
        // a successful API submission.
      }
    } catch (error) {
      setStatus("error");

      setServerError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );

      requestAnimationFrame(() => {
        errorRef.current?.focus();
      });
    } finally {
      submittingRef.current = false;
    }
  }

  const closeSuccessDialog = useCallback(() => {
    setShowSuccessDialog(false);
  }, []);

  const resetForm = useCallback(() => {
    if (submittingRef.current) return;

    setValues(makeInitialValues());
    setErrors({});
    setReferenceNumber(null);
    setServerError(null);
    setStatus("idle");
    setShowSuccessDialog(false);
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        aria-busy={status === "loading"}
        aria-label="Sponsorship enquiry form"
        className="space-y-7"
      >
        {/* COMPANY DETAILS */}

        <section aria-label="Company and contact details">
          <div className="mb-6">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-brand-red">
              Company &amp; Contact Details
            </p>

            <p className="mt-2 text-sm leading-7 text-muted">
              Tell us about your company
              and the person handling
              sponsorship discussions.
            </p>
          </div>

          <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
            <TextField
              id="sponsor-company"
              label="Company Name"
              required
              value={values.companyName}
              onChange={(event) =>
                update(
                  "companyName",
                  event.target.value
                )
              }
              error={errors.companyName}
            />

            <TextField
              id="sponsor-person"
              label="Contact Person"
              required
              value={values.contactPerson}
              onChange={(event) =>
                update(
                  "contactPerson",
                  event.target.value
                )
              }
              error={errors.contactPerson}
            />

            <TextField
              id="sponsor-email"
              label="Business Email"
              type="email"
              required
              value={values.businessEmail}
              onChange={(event) =>
                update(
                  "businessEmail",
                  event.target.value
                )
              }
              error={errors.businessEmail}
            />

            <TextField
              id="sponsor-phone"
              label="Mobile / WhatsApp Number"
              type="tel"
              required
              value={values.phone}
              onChange={(event) =>
                update("phone", event.target.value)
              }
              error={errors.phone}
            />
          </div>
        </section>

        {/* SPONSORSHIP REQUIREMENTS */}

        <section
          aria-label="Sponsorship requirements"
          className="border-t border-[#E4E2DE] pt-7"
        >
          <div className="mb-6">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-brand-red">
              Sponsorship Requirements
            </p>

            <p className="mt-2 text-sm leading-7 text-muted">
              Share the sponsorship opportunity
              or partnership format you would
              like to explore.
            </p>
          </div>

          <div className="space-y-5">
            <TextField
              id="sponsor-interest"
              label="Sponsorship Interest"
              required
              placeholder="Describe your sponsorship interest"
              value={values.packageInterest}
              onChange={(event) =>
                update(
                  "packageInterest",
                  event.target.value
                )
              }
              error={errors.packageInterest}
            />

            <TextAreaField
              id="sponsor-message"
              label="Additional Information"
              hint="Optional"
              value={values.message}
              onChange={(event) =>
                update("message", event.target.value)
              }
              error={errors.message}
            />
          </div>
        </section>

        {/* CONSENT */}

        <section
          aria-label="Privacy and consent"
          className="space-y-5 border-t border-[#E4E2DE] pt-7"
        >
          <p className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-brand-red">
            Privacy &amp; Consent
          </p>

          <CheckboxField
            id="sponsor-consent"
            required
            checked={values.privacyConsent}
            onChange={(event) =>
              update(
                "privacyConsent",
                event.target.checked
              )
            }
            error={errors.privacyConsent}
            label={
              <>
                I agree to the{" "}
                <Link
                  href="/privacy-policy"
                  className="font-semibold text-brand-red underline underline-offset-2 hover:text-brand-red-hover"
                >
                  Privacy Policy
                </Link>
                .
              </>
            }
          />

          <div className="flex items-start gap-3">
            <ShieldCheck
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-muted"
              strokeWidth={1.8}
            />

            <p className="text-xs leading-[1.75] text-muted">
              Your information will be used
              to review and respond to your
              sponsorship enquiry in accordance
              with the Privacy Policy.
            </p>
          </div>
        </section>

        {/* SERVER ERROR */}

        {serverError && (
          <p
            ref={errorRef}
            role="alert"
            tabIndex={-1}
            className="rounded-md border border-[#EBC9CD] bg-[#FFF4F5] px-4 py-3 text-sm leading-6 text-[#A91E29]"
          >
            {serverError}
          </p>
        )}

        {/* SUBMISSION */}

        <div className="border-t border-[#E4E2DE] pt-7">
          <button
            type="submit"
            disabled={
              status === "loading" ||
              status === "success"
            }
            className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-button bg-brand-red px-7 py-3.5 font-heading text-sm font-bold text-white transition-colors duration-200 hover:bg-brand-red-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {status === "loading" ? (
              <>
                <Loader2
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin"
                />
                Submitting Enquiry...
              </>
            ) : status === "success" ? (
              <>
                <CheckCircle2
                  aria-hidden="true"
                  className="h-4 w-4"
                />
                Enquiry Submitted
              </>
            ) : (
              <>
                Submit Sponsorship Enquiry

                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none"
                />
              </>
            )}
          </button>

          <p
            aria-live="polite"
            className="mt-3 text-xs leading-6 text-muted"
          >
            {status === "loading"
              ? "Your sponsorship enquiry is being submitted."
              : status === "success"
                ? "Your enquiry has been submitted."
                : status === "error"
                  ? "Please review the error and try again."
                  : "Please complete all required fields."}
          </p>

          {status === "success" && (
            <button
              type="button"
              onClick={resetForm}
              className="mt-3 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-brand-red hover:underline"
            >
              <RotateCcw
                aria-hidden="true"
                className="h-4 w-4"
              />
              Submit Another Enquiry
            </button>
          )}
        </div>
      </form>

      {/* CONFIRMATION POPUP */}

      {showSuccessDialog && (
        <SponsorSuccessDialog
          contactName={values.contactPerson}
          referenceNumber={referenceNumber}
          onClose={closeSuccessDialog}
          onReset={resetForm}
        />
      )}
    </>
  );
}
