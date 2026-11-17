
"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";

import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  RotateCcw,
  ShieldCheck,
  X,
} from "lucide-react";

import {
  TextField,
  SelectField,
  TextAreaField,
  CheckboxField,
} from "@/components/ui/form-fields";

import { Recaptcha } from "@/components/ui/recaptcha";

import {
  exhibitorRegistrationSchema,
  type ExhibitorRegistrationValues,
} from "@/lib/validations/registration-forms";

import { countryOptions } from "@/lib/content/form-options";

/* ==================================================
   INDIA BATTERY INTERNATIONAL SHOW

   EXHIBITOR ENQUIRY FORM
   - Existing validation and API preserved
   - Professional two-column layout
   - Immediate submission feedback
   - Accessible success popup
   - Prevents duplicate submissions
   - No artificial waiting time
================================================== */

const API_ENDPOINT = "/api/exhibitor-enquiry";

type SubmissionStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";

type ApiResponse = {
  error?: string;
  referenceNumber?: string;
};

const boothOptions = [
  {
    label: "Select booth size (optional)",
    value: "",
  },
  {
    label: "9 sq. m.",
    value: "9 sqm",
  },
  {
    label: "18 sq. m.",
    value: "18 sqm",
  },
  {
    label: "27 sq. m.",
    value: "27 sqm",
  },
  {
    label: "36 sq. m.",
    value: "36 sqm",
  },
  {
    label: "Free Size / Custom Area",
    value: "Free Size",
  },
];

function makeInitialValues(): ExhibitorRegistrationValues {
  return {
    companyName: "",
    designation: "",
    contactPerson: "",
    businessEmail: "",
    mobileNumber: "",
    country: "India",
    productsServices: "",
    preferredBoothSize: "",
    privacyConsent: false,
    recaptchaToken: "",
  };
}

/* ==================================================
   SUCCESS CONFIRMATION POPUP
================================================== */

function ExhibitorSuccessDialog({
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
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

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

      if (buttons.length === 0) {
        return;
      }

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

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
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

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close enquiry confirmation"
          className="absolute right-4 top-5 flex h-10 w-10 items-center justify-center rounded-md text-muted transition-colors hover:bg-[#F7F6F3] hover:text-foreground focus-visible:outline-2 focus-visible:outline-brand-red"
        >
          <X
            aria-hidden="true"
            className="h-5 w-5"
            strokeWidth={1.8}
          />
        </button>

        <div className="px-7 pb-9 pt-10 text-center sm:px-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#DDE8E0] bg-[#F1F7F3]">
            <CheckCircle2
              aria-hidden="true"
              className="h-9 w-9 text-[#287A4B]"
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
            className="mx-auto mt-4 max-w-[370px] text-sm leading-[1.8] text-muted"
          >
            Thank you, {contactName}. Your
            exhibitor enquiry has been submitted.
            The organizing team can now review
            your stand requirements.
          </p>

          {referenceNumber && (
            <div className="mt-6 rounded-md border border-[#E4E2DE] bg-[#F7F6F3] px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                Enquiry Reference
              </p>

              <p className="mt-2 break-all font-heading text-base font-bold text-foreground">
                {referenceNumber}
              </p>
            </div>
          )}

          <p className="mt-5 text-xs leading-6 text-muted">
            Your stand booking is not yet confirmed.
            Availability and commercial terms
            will be communicated separately.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-12 items-center justify-center rounded-button border border-[#D9D7D3] bg-white px-5 font-heading text-sm font-bold text-foreground transition-colors hover:border-brand-red hover:text-brand-red focus-visible:outline-2 focus-visible:outline-brand-red"
            >
              Close
            </button>

            <button
              type="button"
              onClick={onReset}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-button bg-brand-red px-5 font-heading text-sm font-bold text-white transition-colors hover:bg-brand-red-hover focus-visible:outline-2 focus-visible:outline-brand-red"
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
   EXHIBITOR ENQUIRY FORM
================================================== */

export function ExhibitorEnquiryForm() {
  const [values, setValues] =
    useState<ExhibitorRegistrationValues>(
      makeInitialValues
    );

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  const [status, setStatus] =
    useState<SubmissionStatus>("idle");

  const [serverError, setServerError] =
    useState<string | null>(null);

  const [referenceNumber, setReferenceNumber] =
    useState<string | null>(null);

  const [showSuccessDialog, setShowSuccessDialog] =
    useState(false);

  const [recaptchaVersion, setRecaptchaVersion] =
    useState(0);

  const submittingRef = useRef(false);
  const errorRef = useRef<HTMLParagraphElement>(null);

  /* -------------------------------------------
     UPDATE FIELD
  ------------------------------------------- */

  function update<K extends keyof ExhibitorRegistrationValues>(
    key: K,
    value: ExhibitorRegistrationValues[K]
  ) {
    setValues((previous) => ({
      ...previous,
      [key]: value,
    }));

    setErrors((previous) => {
      if (!previous[key]) {
        return previous;
      }

      const next = { ...previous };
      delete next[key];
      return next;
    });

    setServerError(null);

    if (status === "error") {
      setStatus("idle");
    }
  }

  /* -------------------------------------------
     CAPTCHA CALLBACK
  ------------------------------------------- */

  const onRecaptchaChange = useCallback(
    (token: string | null) => {
      setValues((previous) => ({
        ...previous,
        recaptchaToken: token ?? "",
      }));

      setErrors((previous) => {
        if (!previous.recaptchaToken) {
          return previous;
        }

        const next = { ...previous };
        delete next.recaptchaToken;
        return next;
      });
    },
    []
  );

  /* -------------------------------------------
     FORM SUBMISSION

     Popup opens only after successful API reply.
     No artificial timers or fake success states.
  ------------------------------------------- */

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
      exhibitorRegistrationSchema.safeParse(values);

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

      requestAnimationFrame(() => {
        const firstField = String(
          parsed.error.issues[0]?.path[0] ?? ""
        );

        const fieldIds: Record<string, string> = {
          companyName: "ex-company",
          contactPerson: "ex-contact",
          designation: "ex-designation",
          businessEmail: "ex-email",
          mobileNumber: "ex-mobile",
          country: "ex-country",
          productsServices: "ex-products",
          preferredBoothSize: "ex-booth",
          privacyConsent: "ex-privacy",
        };

        const elementId = fieldIds[firstField];

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

  /* -------------------------------------------
     POPUP CONTROLS
  ------------------------------------------- */

  const closeSuccessDialog = useCallback(() => {
    setShowSuccessDialog(false);
  }, []);

  const resetForm = useCallback(() => {
    setValues(makeInitialValues());
    setErrors({});
    setServerError(null);
    setReferenceNumber(null);
    setStatus("idle");
    setShowSuccessDialog(false);

    submittingRef.current = false;

    setRecaptchaVersion((current) => current + 1);
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        aria-busy={status === "loading"}
        aria-label="Exhibitor stand enquiry form"
        className="space-y-7"
      >
        {/* ======================================
            COMPANY DETAILS
        ====================================== */}

        <div>
          <div className="mb-5">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-brand-red">
              Company &amp; Contact Details
            </p>

            <p className="mt-2 text-sm leading-7 text-muted">
              Tell us about your organization
              and the person handling
              exhibition participation.
            </p>
          </div>

          <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
            <TextField
              id="ex-company"
              label="Company Name"
              required
              value={values.companyName}
              onChange={(event) =>
                update("companyName", event.target.value)
              }
              error={errors.companyName}
            />

            <TextField
              id="ex-contact"
              label="Contact Person"
              required
              value={values.contactPerson}
              onChange={(event) =>
                update("contactPerson", event.target.value)
              }
              error={errors.contactPerson}
            />

            <TextField
              id="ex-designation"
              label="Designation"
              required
              value={values.designation}
              onChange={(event) =>
                update("designation", event.target.value)
              }
              error={errors.designation}
            />

            <TextField
              id="ex-email"
              label="Business Email"
              type="email"
              required
              value={values.businessEmail}
              onChange={(event) =>
                update("businessEmail", event.target.value)
              }
              error={errors.businessEmail}
            />

            <TextField
              id="ex-mobile"
              label="Mobile / WhatsApp Number"
              type="tel"
              required
              value={values.mobileNumber}
              onChange={(event) =>
                update("mobileNumber", event.target.value)
              }
              error={errors.mobileNumber}
            />

            <SelectField
              id="ex-country"
              label="Country"
              required
              value={values.country}
              onChange={(event) =>
                update("country", event.target.value)
              }
              error={errors.country}
              options={countryOptions.map((country) => ({
                label: country,
                value: country,
              }))}
            />
          </div>
        </div>

        {/* ======================================
            EXHIBITION REQUIREMENTS
        ====================================== */}

        <div className="border-t border-[#E4E2DE] pt-7">
          <div className="mb-5">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-brand-red">
              Exhibition Requirements
            </p>

            <p className="mt-2 text-sm leading-7 text-muted">
              Share what you plan to showcase
              and your preferred exhibition area.
            </p>
          </div>

          <div className="space-y-5">
            <TextAreaField
              id="ex-products"
              label="Products & Services"
              required
              value={values.productsServices}
              onChange={(event) =>
                update("productsServices", event.target.value)
              }
              error={errors.productsServices}
            />

            <p className="text-xs leading-6 text-muted">
              Briefly describe your products
              or services. No minimum word count.
            </p>

            <SelectField
              id="ex-booth"
              label="Preferred Booth Size"
              hint="Optional"
              value={values.preferredBoothSize ?? ""}
              onChange={(event) =>
                update(
                  "preferredBoothSize",
                  event.target.value
                )
              }
              error={errors.preferredBoothSize}
              options={boothOptions}
            />

         
          </div>
        </div>

        {/* ======================================
            CONSENT AND VERIFICATION
        ====================================== */}

        <div className="space-y-5 border-t border-[#E4E2DE] pt-7">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-brand-red">
            Verification &amp; Consent
          </p>

          <CheckboxField
            id="ex-privacy"
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
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-red underline underline-offset-2 hover:text-brand-red-hover"
                >
                  Privacy Policy
                </a>
                .
              </>
            }
          />

          <Recaptcha
            key={recaptchaVersion}
            onChange={onRecaptchaChange}
            error={errors.recaptchaToken}
          />

          <div className="flex items-start gap-3">
            <ShieldCheck
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-muted"
              strokeWidth={1.8}
            />

            <p className="text-xs leading-[1.75] text-muted">
              Your submitted details will be used
              to review and respond to your
              exhibition enquiry in accordance
              with the Privacy Policy.
            </p>
          </div>
        </div>

        {/* ======================================
            ERROR MESSAGE
        ====================================== */}

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

        {/* ======================================
            SUBMIT BUTTON
        ====================================== */}

        <div className="border-t border-[#E4E2DE] pt-7">
          <button
            type="submit"
            disabled={
              status === "loading" ||
              status === "success"
            }
            className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-button bg-brand-red px-7 py-3.5 font-heading text-sm font-bold text-white transition-colors duration-200 hover:bg-brand-red-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red disabled:cursor-not-allowed disabled:opacity-65 sm:w-auto sm:min-w-[220px]"
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
                Submit Enquiry

                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
                />
              </>
            )}
          </button>

          <p
            aria-live="polite"
            className="mt-3 text-xs leading-6 text-muted"
          >
            {status === "loading"
              ? "Sending your exhibition enquiry."
              : status === "success"
                ? "Your enquiry has been submitted successfully."
                : status === "error"
                  ? "Please review the error above and retry."
                  : "Complete the required fields to submit your enquiry."}
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

      {/* SUCCESS POPUP */}

      {showSuccessDialog && (
        <ExhibitorSuccessDialog
          contactName={values.contactPerson}
          referenceNumber={referenceNumber}
          onClose={closeSuccessDialog}
          onReset={resetForm}
        />
      )}
    </>
  );
}
