
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
  RotateCcw,
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

export function ContactForm({
  defaultDepartment,
}: {
  defaultDepartment?: string;
}) {
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

  function update<K extends keyof ContactValues>(
    field: K,
    value: ContactValues[K]
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

  const onRecaptchaChange = useCallback(
    (token: string | null) => {
      setValues((previous) => ({
        ...previous,
        recaptchaToken: token ?? "",
      }));

      setErrors((previous) => {
        if (!previous.recaptchaToken) return previous;
        const next = { ...previous };
        delete next.recaptchaToken;
        return next;
      });
    },
    []
  );

  async function onSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (status === "loading") return;

    setServerError(null);

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
      return;
    }

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

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          typeof data?.error === "string"
            ? data.error
            : "Unable to send your message. Please try again."
        );
      }

      setReferenceNumber(
        typeof data?.referenceNumber === "string"
          ? data.referenceNumber
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

  function resetForm() {
    setValues(getInitialValues(defaultDepartment));
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
          Message Sent
        </h3>

        <p className="mt-3 max-w-sm text-sm leading-7 text-[#68686e]">
          Thank you for contacting us. Your enquiry
          has been submitted to our team.
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
          Send Another Message
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

      <div className="border-t border-[#efedea] pt-6">
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
          options={departmentOptions.map((item) => ({
            label: item,
            value: item,
          }))}
        />
      </div>

      <div>
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

      <div className="space-y-5 border-t border-[#efedea] pt-6">
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
              Sending...
            </>
          ) : (
            <>
              Send Message
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
