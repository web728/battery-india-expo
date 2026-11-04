
"use client";

import {
  useState,
  type FormEvent,
} from "react";

import {
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { newsletterSchema } from "@/lib/validations/forms";

import {
  trackEvent,
  AnalyticsEvents,
} from "@/lib/analytics";

import { cn } from "@/lib/utils";

type SubmissionStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";

const inputClasses =
  "h-11 w-full rounded-md border border-white/20 bg-white/[0.07] px-3.5 text-sm text-white placeholder:text-white/40 transition-[border-color,background-color] duration-200 outline-none focus:border-[#ed3138] focus:bg-white/[0.10] focus:ring-2 focus:ring-[#ed3138]/20";

export function NewsletterForm({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [consent, setConsent] = useState(false);

  const [status, setStatus] =
    useState<SubmissionStatus>("idle");

  const [error, setError] =
    useState<string | null>(null);

  async function onSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (status === "loading") return;

    setError(null);

    const parsed = newsletterSchema.safeParse({
      name,
      businessEmail: email,
      company,
      consent,
    });

    if (!parsed.success) {
      setError(
        parsed.error.issues[0]?.message ??
          "Please check your details and try again."
      );
      setStatus("idle");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
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
          typeof result?.error === "string"
            ? result.error
            : "Unable to subscribe. Please try again."
        );
      }

      setStatus("success");

      trackEvent(
        AnalyticsEvents.NEWSLETTER_SUBSCRIBE,
        {
          source: compact ? "footer" : "section",
        }
      );

      setName("");
      setEmail("");
      setCompany("");
      setConsent(false);
    } catch (err) {
      setStatus("error");

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-lg border border-white/15 bg-white/[0.07] p-4"
      >
        <CheckCircle2
          className="mt-0.5 h-5 w-5 shrink-0 text-[#65d991]"
          strokeWidth={1.8}
          aria-hidden="true"
        />

        <div>
          <p className="text-sm font-semibold text-white">
            Subscription Received
          </p>

          <p className="mt-1 text-xs leading-6 text-white/65">
            Thank you for subscribing to event updates.
          </p>

          <button
            type="button"
            onClick={() => {
              setError(null);
              setStatus("idle");
            }}
            className="mt-3 text-xs font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
          >
            Subscribe another email
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-busy={status === "loading"}
      className={cn(
        "flex flex-col",
        compact ? "gap-3" : "gap-4"
      )}
    >
      <div>
        <label
          htmlFor={
            compact
              ? "newsletter-footer-name"
              : "newsletter-name"
          }
          className="mb-1.5 block text-xs font-medium text-white/80"
        >
          Full Name
          <span className="ml-1 text-[#ff858a]">*</span>
        </label>

        <input
          id={
            compact
              ? "newsletter-footer-name"
              : "newsletter-name"
          }
          type="text"
          name="name"
          autoComplete="name"
          required
          placeholder="Your full name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            if (error) setError(null);
          }}
          className={inputClasses}
        />
      </div>

      <div>
        <label
          htmlFor={
            compact
              ? "newsletter-footer-email"
              : "newsletter-email"
          }
          className="mb-1.5 block text-xs font-medium text-white/80"
        >
          Business Email
          <span className="ml-1 text-[#ff858a]">*</span>
        </label>

        <input
          id={
            compact
              ? "newsletter-footer-email"
              : "newsletter-email"
          }
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder="name@company.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) setError(null);
          }}
          className={inputClasses}
        />
      </div>

      {!compact && (
        <div>
          <label
            htmlFor="newsletter-company"
            className="mb-1.5 block text-xs font-medium text-white/80"
          >
            Company
            <span className="ml-2 font-normal text-white/45">
              Optional
            </span>
          </label>

          <input
            id="newsletter-company"
            type="text"
            name="company"
            autoComplete="organization"
            placeholder="Company / Organisation"
            value={company}
            onChange={(event) => {
              setCompany(event.target.value);
              if (error) setError(null);
            }}
            className={inputClasses}
          />
        </div>
      )}

      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(event) => {
            setConsent(event.target.checked);
            if (error) setError(null);
          }}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-white/30 accent-[#ed3138]"
        />

        <span className="text-xs leading-5 text-white/65">
          I agree to receive exhibition updates and accept
          the{" "}
          <a
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white underline decoration-white/40 underline-offset-2 transition-colors hover:text-[#ff858a]"
          >
            Privacy Policy
          </a>
          .
        </span>
      </label>

      {error && (
        <p
          role="alert"
          className="rounded-md border border-red-400/25 bg-red-400/10 px-3 py-2.5 text-xs leading-5 text-[#ffb8ba]"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[#ed3138] px-5 font-heading text-sm font-bold text-white transition-colors duration-300 hover:bg-[#c9272e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2
              className="h-4 w-4 animate-spin"
              aria-hidden="true"
            />
            Subscribing...
          </>
        ) : (
          <>
            Subscribe
            <ArrowRight
              className="h-4 w-4"
              aria-hidden="true"
            />
          </>
        )}
      </button>
    </form>
  );
}
