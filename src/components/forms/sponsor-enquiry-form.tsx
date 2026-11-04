
"use client";

import {
  useState,
  type FormEvent,
} from "react";

import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  RotateCcw,
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

const makeInitialValues = (): SponsorValues => ({
  companyName: "",
  contactPerson: "",
  businessEmail: "",
  phone: "",
  packageInterest: "",
  message: "",
  privacyConsent: false,
});

export function SponsorEnquiryForm() {
  const [values, setValues] = useState<SponsorValues>(
    makeInitialValues
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

    if (serverError) setServerError(null);
  }

  async function onSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (status === "loading") return;

    setServerError(null);

    const parsed =
      sponsorEnquirySchema.safeParse(values);

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
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      const response = await fetch(
        "/api/sponsor-enquiry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parsed.data),
        }
      );

      const result = await response
        .json()
        .catch(() => null);

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

      trackEvent(
        AnalyticsEvents.SPONSOR_ENQUIRY,
        {
          packageInterest: values.packageInterest,
        }
      );
    } catch (error) {
      setStatus("error");

      setServerError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  }

  function resetForm() {
    setValues(makeInitialValues());
    setErrors({});
    setReferenceNumber(null);
    setServerError(null);
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center rounded-xl border border-[#e2e8e2] bg-[#fafbf9] px-6 py-11 text-center sm:px-9"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#13a853]/10">
          <CheckCircle2
            className="h-8 w-8 text-[#13a853]"
            strokeWidth={1.7}
            aria-hidden="true"
          />
        </div>

        <h3 className="mt-5 font-heading text-2xl font-bold tracking-[-0.035em] text-[#202024]">
          Enquiry Received
        </h3>

        <p className="mt-3 max-w-sm text-sm leading-7 text-[#68686e]">
          Thank you for your interest in partnering
          with India Battery International Show.
          Your enquiry has been submitted.
        </p>

        {referenceNumber && (
          <div className="mt-5 rounded-md border border-[#e3e3e0] bg-white px-4 py-3 text-sm text-[#525258]">
            Reference Number:{" "}
            <strong className="text-[#242428]">
              {referenceNumber}
            </strong>
          </div>
        )}

        <button
          type="button"
          onClick={resetForm}
          className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[#d8d7d4] bg-white px-5 text-sm font-bold text-[#29292e] transition-colors hover:border-[#ed3138] hover:text-[#d52d35]"
        >
          <RotateCcw
            className="h-4 w-4"
            aria-hidden="true"
          />
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-busy={status === "loading"}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
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

      <div className="border-t border-[#efedea] pt-6">
        <TextField
          id="sponsor-interest"
          label="Sponsorship Interest"
          required
          placeholder="Describe the area or type of sponsorship"
          value={values.packageInterest}
          onChange={(event) =>
            update(
              "packageInterest",
              event.target.value
            )
          }
          error={errors.packageInterest}
        />

        <p className="mt-2 text-xs leading-5 text-[#85858b]">
          Share the sponsorship opportunity you would
          like to discuss.
        </p>
      </div>

      <div>
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

      <div className="space-y-5 border-t border-[#efedea] pt-6">
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
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#d52d35] underline underline-offset-2"
              >
                Privacy Policy
              </a>
              .
            </>
          }
        />

        {serverError && (
          <p
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
          >
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#ed3138] px-6 font-heading text-sm font-bold text-white transition-colors duration-300 hover:bg-[#cc252d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ed3138] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "loading" ? (
            <>
              <Loader2
                className="h-4 w-4 animate-spin"
                aria-hidden="true"
              />
              Submitting...
            </>
          ) : (
            <>
              Submit Sponsorship Enquiry
              <ArrowRight
                className="h-4 w-4"
                aria-hidden="true"
              />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
