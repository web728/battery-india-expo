
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
  TextAreaField,
  CheckboxField,
} from "@/components/ui/form-fields";

import { Recaptcha } from "@/components/ui/recaptcha";

import {
  exhibitorRegistrationSchema,
  type ExhibitorRegistrationValues,
} from "@/lib/validations/registration-forms";

import { countryOptions } from "@/lib/content/form-options";

const API_ENDPOINT = "/api/exhibitor-enquiry";

const boothOptions = [
  { label: "Select booth size (optional)", value: "" },
  { label: "9 sq. m.", value: "9 sqm" },
  { label: "18 sq. m.", value: "18 sqm" },
  { label: "27 sq. m.", value: "27 sqm" },
  { label: "36 sq. m.", value: "36 sqm" },
  { label: "Free Size / Custom Area", value: "Free Size" },
];

const makeInitialValues = (): ExhibitorRegistrationValues => ({
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
});

export function ExhibitorEnquiryForm() {
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

  function update<K extends keyof ExhibitorRegistrationValues>(
    key: K,
    value: ExhibitorRegistrationValues[K]
  ) {
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
            "Unable to submit your enquiry. Please try again."
        );
      }

      setReferenceNumber(
        typeof result?.referenceNumber === "string"
          ? result.referenceNumber
          : null
      );

      setStatus("success");
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
          Enquiry Submitted
        </h3>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-[#696970]">
          Thank you for your interest in exhibiting.
          Your enquiry has been submitted.
        </p>

        {referenceNumber && (
          <p className="mt-4 text-sm text-[#47474d]">
            Reference:{" "}
            <strong>{referenceNumber}</strong>
          </p>
        )}

        <button
          type="button"
          onClick={() => {
            setValues(makeInitialValues());
            setErrors({});
            setServerError(null);
            setReferenceNumber(null);
            setStatus("idle");
          }}
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-md border border-[#d9d7d3] bg-white px-5 text-sm font-bold text-[#29292e] transition-colors hover:border-[#ed3138] hover:text-[#d52d35]"
        >
          Submit Another Enquiry
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

      <div className="border-t border-[#eceae7] pt-6">
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

        <p className="mt-2 text-xs leading-5 text-[#85858b]">
          Briefly describe your products or services.
          No minimum word count.
        </p>
      </div>

      <div className="border-t border-[#eceae7] pt-6">
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

      <div className="space-y-5 border-t border-[#eceae7] pt-6">
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
              Submit Enquiry
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
