"use client";

import { useState, type FormEvent } from "react";
import { newsletterSchema } from "@/lib/validations/forms";
import { trackEvent, AnalyticsEvents } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const parsed = newsletterSchema.safeParse({
      name,
      businessEmail: email,
      company,
      consent,
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form and try again.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      trackEvent(AnalyticsEvents.NEWSLETTER_SUBSCRIBE, { source: compact ? "footer" : "section" });
      setName("");
      setEmail("");
      setCompany("");
      setConsent(false);
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again in a moment.");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className={cn("text-sm font-medium", compact ? "text-green" : "text-green")}>
        Thank you — you are subscribed to event updates.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2.5" noValidate>
      <input
        type="text"
        required
        placeholder="Full name"
        aria-label="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-md border border-white/20 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red"
      />
      <input
        type="email"
        required
        placeholder="Business email"
        aria-label="Business email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-md border border-white/20 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red"
      />
      {!compact && (
        <input
          type="text"
          placeholder="Company"
          aria-label="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full rounded-md border border-white/20 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red"
        />
      )}
      <label className="flex items-start gap-2 text-xs text-white/60">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-3.5 w-3.5 rounded border-white/30"
        />
        I agree to receive event updates and accept the{" "}
        <a href="/privacy-policy" className="underline hover:text-red">
          Privacy Policy
        </a>
        .
      </label>
      {error && (
        <p role="alert" className="text-xs font-medium text-red">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-red px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-dark disabled:opacity-60"
      >
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        Subscribe
      </button>
    </form>
  );
}
