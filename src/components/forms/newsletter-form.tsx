
"use client";

import {
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
  Mail,
  RotateCcw,
} from "lucide-react";

import { newsletterSchema } from "@/lib/validations/forms";
import { trackEvent, AnalyticsEvents } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type SubmissionStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";

type NewsletterFormProps = {
  compact?: boolean;
};

type NewsletterValues = {
  name: string;
  businessEmail: string;
  company: string;
  consent: boolean;
};

type FieldErrors = Partial<
  Record<keyof NewsletterValues, string>
>;

type ApiResponse = {
  error?: string;
};

const INITIAL_VALUES: NewsletterValues = {
  name: "",
  businessEmail: "",
  company: "",
  consent: false,
};

const inputClasses = [
  "h-12 w-full rounded-md",
  "border border-white/20 bg-white/[0.06]",
  "px-4 font-body text-sm text-white",
  "placeholder:text-white/35",
  "outline-none",
  "transition-[border-color,background-color] duration-200",
  "hover:border-white/35",
  "focus:border-[#C62832]",
  "focus:bg-white/[0.09]",
  "focus:ring-2 focus:ring-[#C62832]/20",
  "disabled:cursor-not-allowed disabled:opacity-60",
].join(" ");

const labelClasses =
  "mb-2 block font-heading text-xs font-semibold text-white/85";

export function NewsletterForm({
  compact = false,
}: NewsletterFormProps) {
  const formId = useId();

  const [values, setValues] =
    useState<NewsletterValues>({ ...INITIAL_VALUES });

  const [fieldErrors, setFieldErrors] =
    useState<FieldErrors>({});

  const [status, setStatus] =
    useState<SubmissionStatus>("idle");

  const [serverError, setServerError] =
    useState<string | null>(null);

  const submittingRef = useRef(false);

  const isLoading = status === "loading";

  function update<K extends keyof NewsletterValues>(
    field: K,
    value: NewsletterValues[K]
  ) {
    setValues((previous) => ({
      ...previous,
      [field]: value,
    }));

    setFieldErrors((previous) => {
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

  function resetForm() {
    if (submittingRef.current) return;

    setValues({ ...INITIAL_VALUES });
    setFieldErrors({});
    setServerError(null);
    setStatus("idle");
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (submittingRef.current || status === "success") {
      return;
    }

    setServerError(null);

    const parsed = newsletterSchema.safeParse(values);

    if (!parsed.success) {
      const nextErrors: FieldErrors = {};

      for (const issue of parsed.error.issues) {
        const field = String(
          issue.path[0] ?? ""
        ) as keyof NewsletterValues;

        if (
          field in INITIAL_VALUES &&
          !nextErrors[field]
        ) {
          nextErrors[field] = issue.message;
        }
      }

      setFieldErrors(nextErrors);
      setStatus("idle");
      return;
    }

    submittingRef.current = true;

    setFieldErrors({});
    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
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
            : "Unable to subscribe. Please try again."
        );
      }

      setStatus("success");

      try {
        trackEvent(
          AnalyticsEvents.NEWSLETTER_SUBSCRIBE,
          {
            source: compact ? "footer" : "section",
          }
        );
      } catch {
        // Analytics must never interrupt a
        // successfully completed subscription.
      }
    } catch (error) {
      setStatus("error");

      setServerError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      submittingRef.current = false;
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-lg border border-white/20 bg-white/[0.07] px-5 py-6 sm:px-6"
      >
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-white/15 bg-white/10">
            <CheckCircle2
              aria-hidden="true"
              className="h-6 w-6 text-white"
              strokeWidth={1.8}
            />
          </span>

          <div className="min-w-0">
            <p className="font-heading text-base font-bold text-white">
              Subscription Received
            </p>

            <p className="mt-2 font-body text-sm leading-7 text-white/65">
              Thank you for subscribing.
              Your request for exhibition
              updates has been received.
            </p>

            <button
              type="button"
              onClick={resetForm}
              className="mt-5 inline-flex min-h-10 items-center gap-2 font-heading text-xs font-bold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <RotateCcw
                aria-hidden="true"
                className="h-4 w-4"
              />
              Subscribe Another Email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isLoading}
      aria-label="Newsletter subscription form"
      className={cn(
        "flex flex-col",
        compact ? "gap-4" : "gap-5"
      )}
    >
      {/* NAME */}

      <div>
        <label
          htmlFor={`${formId}-name`}
          className={labelClasses}
        >
          Full Name
          <span className="ml-1 text-[#FF969D]">
            *
          </span>
        </label>

        <input
          id={`${formId}-name`}
          type="text"
          name="name"
          autoComplete="name"
          required
          maxLength={120}
          placeholder="Enter your full name"
          value={values.name}
          disabled={isLoading}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={
            fieldErrors.name
              ? `${formId}-name-error`
              : undefined
          }
          onChange={(event) =>
            update("name", event.target.value)
          }
          className={inputClasses}
        />

        {fieldErrors.name && (
          <p
            id={`${formId}-name-error`}
            className="mt-2 text-xs leading-5 text-[#FFB8BD]"
          >
            {fieldErrors.name}
          </p>
        )}
      </div>

      {/* BUSINESS EMAIL */}

      <div>
        <label
          htmlFor={`${formId}-email`}
          className={labelClasses}
        >
          Business Email
          <span className="ml-1 text-[#FF969D]">
            *
          </span>
        </label>

        <div className="relative">
          <Mail
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45"
            strokeWidth={1.8}
          />

          <input
            id={`${formId}-email`}
            type="email"
            name="businessEmail"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={254}
            placeholder="name@company.com"
            value={values.businessEmail}
            disabled={isLoading}
            aria-invalid={Boolean(
              fieldErrors.businessEmail
            )}
            aria-describedby={
              fieldErrors.businessEmail
                ? `${formId}-email-error`
                : undefined
            }
            onChange={(event) =>
              update(
                "businessEmail",
                event.target.value
              )
            }
            className={cn(inputClasses, "pl-11")}
          />
        </div>

        {fieldErrors.businessEmail && (
          <p
            id={`${formId}-email-error`}
            className="mt-2 text-xs leading-5 text-[#FFB8BD]"
          >
            {fieldErrors.businessEmail}
          </p>
        )}
      </div>

      {/* COMPANY - FULL VERSION ONLY */}

      {!compact && (
        <div>
          <label
            htmlFor={`${formId}-company`}
            className={labelClasses}
          >
            Company / Organisation
            <span className="ml-2 font-normal text-white/45">
              Optional
            </span>
          </label>

          <input
            id={`${formId}-company`}
            type="text"
            name="company"
            autoComplete="organization"
            maxLength={160}
            placeholder="Your company name"
            value={values.company}
            disabled={isLoading}
            aria-invalid={Boolean(fieldErrors.company)}
            aria-describedby={
              fieldErrors.company
                ? `${formId}-company-error`
                : undefined
            }
            onChange={(event) =>
              update("company", event.target.value)
            }
            className={inputClasses}
          />

          {fieldErrors.company && (
            <p
              id={`${formId}-company-error`}
              className="mt-2 text-xs leading-5 text-[#FFB8BD]"
            >
              {fieldErrors.company}
            </p>
          )}
        </div>
      )}

      {/* PRIVACY CONSENT */}

      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="consent"
            required
            disabled={isLoading}
            checked={values.consent}
            aria-invalid={Boolean(fieldErrors.consent)}
            aria-describedby={
              fieldErrors.consent
                ? `${formId}-consent-error`
                : undefined
            }
            onChange={(event) =>
              update(
                "consent",
                event.target.checked
              )
            }
            className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-white/30 accent-[#C62832] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          />

          <span className="font-body text-xs leading-[1.8] text-white/65">
            I agree to receive exhibition
            updates and accept the{" "}
            <Link
              href="/privacy-policy"
              className="font-semibold text-white underline decoration-white/40 underline-offset-2 transition-colors hover:decoration-white"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        {fieldErrors.consent && (
          <p
            id={`${formId}-consent-error`}
            className="mt-2 text-xs leading-5 text-[#FFB8BD]"
          >
            {fieldErrors.consent}
          </p>
        )}
      </div>

      {/* SERVER ERROR */}

      {serverError && (
        <p
          role="alert"
          className="rounded-md border border-[#FF969D]/30 bg-[#C62832]/15 px-4 py-3 text-xs leading-6 text-[#FFB8BD]"
        >
          {serverError}
        </p>
      )}

      {/* SUBMIT */}

      <div className="pt-1">
        <button
          type="submit"
          disabled={isLoading}
          className="group inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-button bg-brand-red px-6 py-3 font-heading text-sm font-bold text-white transition-colors duration-200 hover:bg-brand-red-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <Loader2
                aria-hidden="true"
                className="h-4 w-4 animate-spin"
              />
              Subscribing...
            </>
          ) : (
            <>
              Subscribe for Updates

              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none"
                strokeWidth={1.8}
              />
            </>
          )}
        </button>

      
      </div>
    </form>
  );
}
