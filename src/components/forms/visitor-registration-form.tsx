
"use client";

import {
  useCallback,
  useState,
  type FormEvent,
} from "react";

import {
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import {
  TextField,
  SelectField,
  CheckboxField,
} from "@/components/ui/form-fields";

import { Recaptcha } from "@/components/ui/recaptcha";

import {
  visitorRegistrationSchema,
  type VisitorRegistrationValues,
} from "@/lib/validations/registration-forms";

import { countryOptions } from "@/lib/content/form-options";

import {
  trackEvent,
  AnalyticsEvents,
} from "@/lib/analytics";

const API_ENDPOINT = "/api/visitor-registration";

const makeInitialValues = (): VisitorRegistrationValues => ({
  name: "",
  companyName: "",
  designation: "",
  mobileNumber: "",
  businessEmail: "",
  businessCategory: "",
  country: "India",
  privacyConsent: false,
  recaptchaToken: "",
});

export function VisitorRegistrationForm() {
  const [values, setValues] = useState(
    makeInitialValues
  );

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [serverError, setServerError] = useState<
    string | null
  >(null);

  const [referenceNumber, setReferenceNumber] =
    useState<string | null>(null);

  const [started, setStarted] = useState(false);

  function update<K extends keyof VisitorRegistrationValues>(
    key: K,
    value: VisitorRegistrationValues[K]
  ) {
    if (!started) {
      setStarted(true);
      trackEvent(AnalyticsEvents.VISITOR_REG_START);
    }

    setValues((previous) => ({
      ...previous,
      [key]: value,
    }));

    setErrors((previous) => {
      if (!previous[key]) return previous;

      const next = { ...previous };
      delete next[key];
      return next;
    });
  }

  const onRecaptchaChange = useCallback(
    (token: string | null) => {
      setValues((previous) => ({
        ...previous,
        recaptchaToken: token ?? "",
      }));
    },
    []
  );

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (status === "loading") return;

    setServerError(null);

    const parsed =
      visitorRegistrationSchema.safeParse(values);

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
      return;
    }

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

      const result = await response
        .json()
        .catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.error ||
            "Registration could not be submitted. Please try again."
        );
      }

      setReferenceNumber(
        typeof result?.referenceNumber === "string"
          ? result.referenceNumber
          : null
      );

      setStatus("success");

      trackEvent(
        AnalyticsEvents.VISITOR_REG_COMPLETE
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

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-xl border border-[#e4e7e3] bg-[#fafbf9] px-6 py-10 text-center sm:px-9"
      >
        <CheckCircle2
          className="mx-auto h-11 w-11 text-[#13a853]"
          strokeWidth={1.7}
          aria-hidden="true"
        />

        <h3 className="mt-5 font-heading text-2xl font-bold tracking-[-0.035em] text-[#202024]">
          Registration Submitted
        </h3>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-[#696970]">
          Thank you, {values.name}. Your visitor
          registration details have been submitted.
        </p>

        {referenceNumber && (
          <p className="mt-4 text-sm text-[#47474d]">
            Reference:{" "}
            <strong>{referenceNumber}</strong>
          </p>
        )}

        <p className="mt-3 text-xs leading-6 text-[#85858b]">
          Please follow any further instructions
          provided by the registration team.
        </p>

        <button
          type="button"
          onClick={() => {
            setValues(makeInitialValues());
            setErrors({});
            setServerError(null);
            setReferenceNumber(null);
            setStarted(false);
            setStatus("idle");
          }}
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-md border border-[#d9d7d3] bg-white px-5 text-sm font-bold text-[#29292e] transition-colors hover:border-[#ed3138] hover:text-[#d52d35]"
        >
          Submit Another Registration
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={status === "loading"}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
        <TextField
          id="visitor-name"
          label="Full Name"
          required
          value={values.name}
          onChange={(event) =>
            update("name", event.target.value)
          }
          error={errors.name}
        />

        <TextField
          id="visitor-company"
          label="Company / Organisation"
          required
          value={values.companyName}
          onChange={(event) =>
            update("companyName", event.target.value)
          }
          error={errors.companyName}
        />

        <TextField
          id="visitor-designation"
          label="Designation"
          required
          value={values.designation}
          onChange={(event) =>
            update("designation", event.target.value)
          }
          error={errors.designation}
        />

        <TextField
          id="visitor-mobile"
          label="Mobile / WhatsApp Number"
          type="tel"
          required
          value={values.mobileNumber}
          onChange={(event) =>
            update("mobileNumber", event.target.value)
          }
          error={errors.mobileNumber}
        />

        <TextField
          id="visitor-email"
          label="Email Address"
          type="email"
          required
          value={values.businessEmail}
          onChange={(event) =>
            update("businessEmail", event.target.value)
          }
          error={errors.businessEmail}
        />

        <TextField
          id="visitor-category"
          label="Business / Category"
          hint="Optional"
          value={values.businessCategory ?? ""}
          onChange={(event) =>
            update(
              "businessCategory",
              event.target.value
            )
          }
          error={errors.businessCategory}
        />

        <div className="sm:col-span-2">
          <SelectField
            id="visitor-country"
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

      <div className="space-y-5 border-t border-[#eceae7] pt-6">
        <CheckboxField
          id="visitor-privacy"
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

        <Recaptcha
          onChange={onRecaptchaChange}
          error={errors.recaptchaToken}
        />

        {serverError && (
          <p
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#ed3138] px-6 font-heading text-sm font-bold text-white transition-colors hover:bg-[#cc252d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ed3138] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
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
              Complete Registration
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
