"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "bie-cookie-consent";

// If any of your forms autosave a draft to localStorage as the visitor
// types (e.g. localStorage.setItem("bie-registration-draft", JSON.stringify(values))),
// list the keys here so accepting cookies can save that lead even if they
// never hit submit. Safe to leave as-is if no form does this yet.
const DRAFT_KEYS = ["bie-registration-draft", "bie-contact-draft", "bie-exhibitor-draft"];

function extractContact(draft: Record<string, unknown>) {
  const name =
    (draft.name as string) ||
    [draft.firstName, draft.lastName].filter(Boolean).join(" ") ||
    (draft.contactPerson as string) ||
    null;
  const email = (draft.email as string) || (draft.businessEmail as string) || null;
  const phone = (draft.phone as string) || (draft.mobileNumber as string) || null;
  return { name, email, phone };
}

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // One-time sync from localStorage (client-only) on mount to avoid SSR hydration mismatch.
    const stored = window.localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!stored) setVisible(true);
  }, []);

  const decide = (value: "accepted" | "declined") => {
    window.localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new CustomEvent("bie-consent-change", { detail: value }));
    setVisible(false);

    if (value === "accepted") {
      saveDraftContactIfAny();
    }
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[90] border-t border-grey-light bg-white px-4 py-4 shadow-[0_-4px_16px_rgba(0,0,0,0.1)] sm:px-6"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-navy-dark">
          We use cookies to improve your experience and analyze site traffic. Read our{" "}
          <Link href="/cookies" className="font-semibold text-red underline">
            Cookie Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <Button size="sm" variant="ghost" onClick={() => decide("declined")}>
            Decline Non-Essential
          </Button>
          <Button size="sm" variant="primary" onClick={() => decide("accepted")}>
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
}

// Best-effort only — never blocks the UI. Only reads data the visitor
// already typed into a form on THIS site and that form chose to autosave;
// browsers do not expose autofill/other-site data to page JavaScript, so
// nothing beyond that can be (or is) read here.
function saveDraftContactIfAny() {
  try {
    for (const key of DRAFT_KEYS) {
      const raw = window.localStorage.getItem(key);
      if (!raw) continue;

      const draft = JSON.parse(raw);
      const { name, email, phone } = extractContact(draft);
      if (!email && !phone) continue;

      fetch("/api/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, consentType: "cookies" }),
      }).catch(() => {
        // ignore — non-critical
      });
    }
  } catch {
    // ignore — non-critical
  }
}