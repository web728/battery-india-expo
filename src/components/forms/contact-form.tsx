
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
  Check,
  CheckCircle2,
  Loader2,
  RotateCcw,
  Send,
  ShieldCheck,
  X,
} from "lucide-react";

import { contactFormSchema } from "@/lib/validations/forms";

import {
  TextField,
  SelectField,
  TextAreaField,
  CheckboxField,
} from "@/components/ui/form-fields";

import { Recaptcha } from "@/components/ui/recaptcha";
import { departmentOptions } from "@/lib/content/form-options";

/* ==================================================
   INDIA BATTERY INTERNATIONAL SHOW

   CONTACT FORM
   Hybrid Industrial Editorial

   - Existing API preserved: /api/contact
   - Existing Zod schema preserved
   - Existing reCAPTCHA preserved
   - Fast client-side validation
   - Immediate sending feedback
   - Success confirmation modal
   - Accessible errors and keyboard controls
   - No artificial submission delay
================================================== */

type Department = (typeof departmentOptions)[number];

type ContactValues = {
  name: string;
  email: string;
  phone: string;
  company: string;
  department: Department;
  message: string;
  privacyConsent: boolean;
  recaptchaToken: string;
};

type SubmissionStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";

type ContactFormProps = {
  defaultDepartment?: string;
};

type ContactApiResponse = {
  error?: string;
  referenceNumber?: string;
};

function getInitialValues(
  defaultDepartment?: string
): ContactValues {
  const validDepartment =
    defaultDepartment &&
    departmentOptions.includes(
      defaultDepartment as Department
    )
      ? (defaultDepartment as Department)
      : ("General Enquiry" as Department);

  return {
    name: "",
    email: "",
    phone: "",
    company: "",
    department: validDepartment,
    message: "",
    privacyConsent: false,
    recaptchaToken: "",
  };
}

/* ==================================================
   SUCCESS POPUP
================================================== */

function SuccessDialog({
  referenceNumber,
  onClose,
  onReset,
}: {
  referenceNumber: string | null;
  onClose: () => void;
  onReset: () => void;
}) {
  const titleId = useId();
  const descriptionId = useId();

  const closeButtonRef =
    useRef<HTMLButtonElement>(null);

  const dialogRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const buttons = Array.from(
        dialogRef.current?.querySelectorAll<
          HTMLButtonElement
        >("button:not([disabled])") ?? []
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

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        "keydown",
        onKeyDown
      );

      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#191C21]/75 px-4 py-8"
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
        className="relative w-full max-w-[470px] overflow-hidden rounded-[12px] border border-[#E4E2DE] bg-white shadow-2xl"
      >
        {/* BRAND ACCENT */}

        <div
          aria-hidden="true"
          className="h-1 w-full bg-brand-red"
        />

        {/* CLOSE BUTTON */}

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close confirmation"
          className="absolute right-4 top-5 flex h-10 w-10 items-center justify-center rounded-md text-muted transition-colors hover:bg-[#F7F6F3] hover:text-foreground focus-visible:outline-2 focus-visible:outline-brand-red"
        >
          <X
            aria-hidden="true"
            className="h-5 w-5"
            strokeWidth={1.8}
          />
        </button>

        <div className="px-7 pb-8 pt-10 text-center sm:px-10 sm:pb-10">
          {/* SUCCESS ICON */}

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#DDE8E0] bg-[#F1F7F3]">
            <CheckCircle2
              aria-hidden="true"
              className="h-9 w-9 text-[#287A4B]"
              strokeWidth={1.7}
            />
          </div>

          <p className="mt-6 font-heading text-[11px] font-bold uppercase tracking-[0.15em] text-brand-red">
            Enquiry Submitted
          </p>

          <h2
            id={titleId}
            className="mt-3 font-heading text-[clamp(1.65rem,3vw,2rem)] font-bold tracking-[-0.04em] text-foreground"
          >
            Message Sent Successfully
          </h2>

          <p
            id={descriptionId}
            className="mx-auto mt-4 max-w-[350px] font-body text-sm leading-[1.8] text-muted"
          >
            Thank you for contacting us. Your
            enquiry has been received and the
            organizing team can now review it.
          </p>

          {/* REFERENCE */}

          {referenceNumber && (
            <div className="mt-6 rounded-md border border-[#E4E2DE] bg-[#F7F6F3] px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                Your Reference Number
              </p>

              <p className="mt-2 break-all font-heading text-base font-bold tracking-[0.025em] text-foreground">
                {referenceNumber}
              </p>
            </div>
          )}

          {/* ACTIONS */}

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
   CONTACT FORM
================================================== */

export function ContactForm({
  defaultDepartment,
}: ContactFormProps) {
  const [values, setValues] = useState<ContactValues>(
    () => getInitialValues(defaultDepartment)
  );

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  const [status, setStatus] =
    useState<SubmissionStatus>("idle");

  const [referenceNumber, setReferenceNumber] =
    useState<string | null>(null);

  const [serverError, setServerError] =
    useState<string | null>(null);

  const [showSuccessDialog, setShowSuccessDialog] =
    useState(false);

  const isSubmittingRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const errorSummaryRef =
    useRef<HTMLParagraphElement>(null);

  /* ------------------------------------------------
     FIELD UPDATE
  ------------------------------------------------ */

  function update<K extends keyof ContactValues>(
    field: K,
    value: ContactValues[K]
  ) {
    setValues((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => {
      if (!previous[field]) {
        return previous;
      }

      const next = { ...previous };
      delete next[field];

      return next;
    });

    if (serverError) {
      setServerError(null);
    }

    if (status === "error") {
      setStatus("idle");
    }
  }

  /* ------------------------------------------------
     RECAPTCHA CALLBACK
  ------------------------------------------------ */

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

  /* ------------------------------------------------
     SUBMIT HANDLER

     No timers.
     No artificial loading duration.
     Popup opens only after API success.
  ------------------------------------------------ */

  async function onSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (isSubmittingRef.current) {
      return;
    }

    setServerError(null);

    // Local validation before network request.
    const parsed = contactFormSchema.safeParse(values);

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};

      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "");

        if (key && !fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }

      setErrors(fieldErrors);
      setStatus("idle");

      requestAnimationFrame(() => {
        const firstInvalidField =
          formRef.current?.querySelector<
            HTMLElement
          >(
            '[aria-invalid="true"], input:invalid, textarea:invalid, select:invalid'
          );

        firstInvalidField?.focus();
      });

      return;
    }

    isSubmittingRef.current = true;

    setErrors({});
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });

      const data =
        (await response.json().catch(() => null)) as
          | ContactApiResponse
          | null;

      if (!response.ok) {
        throw new Error(
          typeof data?.error === "string"
            ? data.error
            : "Unable to send your message. Please try again."
        );
      }

      const reference =
        typeof data?.referenceNumber === "string"
          ? data.referenceNumber
          : null;

      setReferenceNumber(reference);
      setStatus("success");

      // Display confirmation immediately
      // after verified server success.
      setShowSuccessDialog(true);
    } catch (error) {
      setStatus("error");

      setServerError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );

      requestAnimationFrame(() => {
        errorSummaryRef.current?.focus();
      });
    } finally {
      isSubmittingRef.current = false;
    }
  }

  /* ------------------------------------------------
     CLOSE POPUP

     Keep form in success state to prevent
     accidental duplicate submission.
  ------------------------------------------------ */

  const closeSuccessDialog = useCallback(() => {
    setShowSuccessDialog(false);
  }, []);

  /* ------------------------------------------------
     RESET FORM

     The reCAPTCHA component may retain its
     own widget state. Re-mount it on reset.
  ------------------------------------------------ */

  const [recaptchaVersion, setRecaptchaVersion] =
    useState(0);

  const resetForm = useCallback(() => {
    setValues(getInitialValues(defaultDepartment));
    setErrors({});
    setReferenceNumber(null);
    setServerError(null);
    setStatus("idle");
    setShowSuccessDialog(false);

    setRecaptchaVersion((previous) => previous + 1);
  }, [defaultDepartment]);

  return (
    <>
      <form
        ref={formRef}
        onSubmit={onSubmit}
        noValidate
        aria-busy={status === "loading"}
        aria-label="Contact enquiry form"
        className="space-y-7"
      >
        {/* ======================================
            CONTACT DETAILS
        ====================================== */}

        <div>
          <div className="mb-5 flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F7F6F3] text-brand-red"
            >
              <Check
                className="h-3.5 w-3.5"
                strokeWidth={2}
              />
            </span>

            <p className="font-heading text-xs font-bold uppercase tracking-[0.11em] text-foreground">
              Your Details
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
            <TextField
              id="contact-name"
              label="Full Name"
              required
              value={values.name}
              onChange={(event) =>
                update("name", event.target.value)
              }
              error={errors.name}
            />

            <TextField
              id="contact-email"
              label="Email Address"
              type="email"
              required
              value={values.email}
              onChange={(event) =>
                update("email", event.target.value)
              }
              error={errors.email}
            />

            <TextField
              id="contact-phone"
              label="Mobile / WhatsApp Number"
              type="tel"
              hint="Optional"
              value={values.phone}
              onChange={(event) =>
                update("phone", event.target.value)
              }
              error={errors.phone}
            />

            <TextField
              id="contact-company"
              label="Company / Organisation"
              hint="Optional"
              value={values.company}
              onChange={(event) =>
                update("company", event.target.value)
              }
              error={errors.company}
            />
          </div>
        </div>

        {/* ======================================
            ENQUIRY DETAILS
        ====================================== */}

        <div className="border-t border-[#E4E2DE] pt-7">
          <div className="mb-5 flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F7F6F3] text-brand-red"
            >
              <Check
                className="h-3.5 w-3.5"
                strokeWidth={2}
              />
            </span>

            <p className="font-heading text-xs font-bold uppercase tracking-[0.11em] text-foreground">
              Enquiry Details
            </p>
          </div>

          <div className="space-y-5">
            <SelectField
              id="contact-department"
              label="Enquiry Type"
              required
              value={values.department}
              onChange={(event) =>
                update(
                  "department",
                  event.target.value as Department
                )
              }
              error={errors.department}
              options={departmentOptions.map((option) => ({
                label: option,
                value: option,
              }))}
            />

            <TextAreaField
              id="contact-message"
              label="Your Message"
              required
              value={values.message}
              onChange={(event) =>
                update("message", event.target.value)
              }
              error={errors.message}
            />
          </div>
        </div>

        {/* ======================================
            PRIVACY AND VERIFICATION
        ====================================== */}

        <div className="space-y-5 border-t border-[#E4E2DE] pt-7">
          <CheckboxField
            id="contact-consent"
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

          {/* SECURITY NOTE */}

          <div className="flex items-start gap-2.5">
            <ShieldCheck
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-muted"
              strokeWidth={1.8}
            />

            <p className="text-xs leading-[1.7] text-muted">
              Your information will be used to
              respond to your enquiry in accordance
              with our Privacy Policy.
            </p>
          </div>
        </div>

        {/* ======================================
            SUBMISSION ERROR
        ====================================== */}

        {serverError && (
          <p
            ref={errorSummaryRef}
            role="alert"
            tabIndex={-1}
            className="rounded-md border border-[#EBC9CD] bg-[#FFF4F5] px-4 py-3 text-sm leading-6 text-[#A91E29]"
          >
            {serverError}
          </p>
        )}

        {/* ======================================
            SUBMIT ACTION
        ====================================== */}

        <div className="border-t border-[#E4E2DE] pt-6">
          <button
            type="submit"
            disabled={
              status === "loading" ||
              status === "success"
            }
            className={[
              "group inline-flex min-h-12 w-full",
              "items-center justify-center gap-3",
              "rounded-button bg-brand-red",
              "px-7 py-3.5",
              "font-heading text-sm font-bold text-white",
              "transition-colors duration-200",
              "hover:bg-brand-red-hover",
              "focus-visible:outline-2",
              "focus-visible:outline-offset-2",
              "focus-visible:outline-brand-red",
              "disabled:cursor-not-allowed",
              "disabled:opacity-65",
              "sm:w-auto sm:min-w-[200px]",
            ].join(" ")}
          >
            {status === "loading" ? (
              <>
                <Loader2
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin"
                />
                Sending Message...
              </>
            ) : status === "success" ? (
              <>
                <CheckCircle2
                  aria-hidden="true"
                  className="h-4 w-4"
                />
                Message Sent
              </>
            ) : (
              <>
                <Send
                  aria-hidden="true"
                  className="h-4 w-4"
                  strokeWidth={1.8}
                />

                Send Message

                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none"
                  strokeWidth={1.8}
                />
              </>
            )}
          </button>

          <div
            aria-live="polite"
            className="mt-3 text-xs leading-6 text-muted"
          >
            {status === "loading" &&
              "Your enquiry is being submitted securely."}

            {status === "success" &&
              "Your message has been submitted successfully."}

            {status === "idle" &&
              "Fields marked as required must be completed."}

            {status === "error" &&
              "Submission failed. Review the message above and retry."}
          </div>

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
              Send Another Message
            </button>
          )}
        </div>
      </form>

      {/* ========================================
          CONFIRMATION POPUP
      ======================================== */}

      {showSuccessDialog && (
        <SuccessDialog
          referenceNumber={referenceNumber}
          onClose={closeSuccessDialog}
          onReset={resetForm}
        />
      )}
    </>
  );
}
