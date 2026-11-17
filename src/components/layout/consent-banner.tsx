
"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  ArrowUpRight,
  Check,
  Cookie,
  ShieldCheck,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

/* ==================================================
   INDIA BATTERY INTERNATIONAL SHOW

   PREMIUM COOKIE CONSENT BANNER
   Hybrid Industrial Editorial

   Features:
   - Premium floating white panel
   - Clear consent choices
   - Responsive mobile layout
   - LocalStorage persistence
   - Existing consent event preserved
   - No automatic lead submission
   - No third-party animation dependency

   Consent values:
   - accepted
   - declined
================================================== */

const STORAGE_KEY = "bie-cookie-consent";

type ConsentValue = "accepted" | "declined";

const buttonBaseClasses = [
  "inline-flex min-h-11",
  "items-center justify-center gap-2",
  "rounded-button px-5 py-3",
  "font-heading text-[13px] font-bold",
  "transition-[background-color,border-color,color]",
  "duration-200",
  "focus-visible:outline-2",
  "focus-visible:outline-offset-2",
  "focus-visible:outline-brand-red",
  "disabled:cursor-not-allowed",
  "disabled:opacity-60",
].join(" ");

/* ==================================================
   CONSENT BANNER
================================================== */

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  /* ------------------------------------------------
     READ SAVED CONSENT
  ------------------------------------------------ */

  useEffect(() => {
    try {
      const saved =
        window.localStorage.getItem(STORAGE_KEY);

      if (
        saved !== "accepted" &&
        saved !== "declined"
      ) {
        setVisible(true);
      }
    } catch {
      // If storage is unavailable, allow
      // the visitor to see the consent options.
      setVisible(true);
    }
  }, []);

  /* ------------------------------------------------
     SAVE CONSENT

     Preserve event for analytics/cookie
     integrations listening for changes.
  ------------------------------------------------ */

  const decide = useCallback(
    (value: ConsentValue) => {
      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          value
        );
      } catch {
        // Browsers may block localStorage.
        // The current decision still applies
        // to listeners in this page session.
      }

      window.dispatchEvent(
        new CustomEvent<ConsentValue>(
          "bie-consent-change",
          {
            detail: value,
          }
        )
      );

      setVisible(false);
    },
    []
  );

  if (!visible) {
    return null;
  }

  return (
    <aside
      aria-labelledby="cookie-consent-heading"
      aria-describedby="cookie-consent-description"
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[90]",
        "pointer-events-none",
        "px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]",
        "sm:px-5 sm:pb-5",
        "lg:px-8 lg:pb-7"
      )}
    >
      <div
        className={cn(
          "pointer-events-auto",
          "mx-auto w-full max-w-[1040px]",
          "overflow-hidden rounded-[12px]",
          "border border-[#E4E2DE]",
          "bg-white text-[#191C21]",
          "shadow-[0_16px_50px_rgba(25,28,33,0.16)]"
        )}
      >
        {/* TOP ACCENT */}

        <div
          aria-hidden="true"
          className="h-[3px] w-full bg-[#C62832]"
        />

        <div className="relative p-5 sm:p-6 lg:px-8 lg:py-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            {/* ---------------------------------
                LEFT: COOKIE INFORMATION
            --------------------------------- */}

            <div className="min-w-0 flex-1">
              <div className="flex items-start gap-4">
                {/* ICON */}

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#E4E2DE] bg-[#F7F6F3] text-[#C62832]">
                  <Cookie
                    aria-hidden="true"
                    className="h-6 w-6"
                    strokeWidth={1.7}
                  />
                </div>

                {/* CONTENT */}

                <div className="min-w-0">
                  <p className="font-heading text-[10px] font-bold uppercase tracking-[0.15em] text-[#C62832] sm:text-[11px]">
                    Your Privacy Matters
                  </p>

                  <h2
                    id="cookie-consent-heading"
                    className="mt-1.5 font-heading text-lg font-bold leading-[1.35] tracking-[-0.025em] text-[#191C21] sm:text-xl"
                  >
                    We Value Your Privacy
                  </h2>

                  <p
                    id="cookie-consent-description"
                    className="mt-2 max-w-[620px] font-body text-[13px] leading-[1.8] text-[#686B72] sm:text-sm"
                  >
                    We use essential storage to
                    support the website. With your
                    permission, we also use optional
                    analytics cookies to understand
                    site usage and improve the
                    browsing experience.
                  </p>

                  <Link
                    href="/cookies"
                    className="group mt-3 inline-flex min-h-9 items-center gap-1.5 font-heading text-xs font-bold text-[#C62832] transition-colors hover:text-[#A82029] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C62832]"
                  >
                    Read Cookie Policy

                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                      strokeWidth={1.8}
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* ---------------------------------
                RIGHT: CONSENT ACTIONS
            --------------------------------- */}

            <div className="w-full shrink-0 lg:w-auto">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:items-center">
                <button
                  type="button"
                  onClick={() => decide("declined")}
                  className={cn(
                    buttonBaseClasses,
                    "border border-[#D9D7D3]",
                    "bg-white text-[#191C21]",
                    "hover:border-[#C62832]",
                    "hover:text-[#C62832]",
                    "sm:min-w-[150px]"
                  )}
                >
                  <X
                    aria-hidden="true"
                    className="h-4 w-4"
                    strokeWidth={1.8}
                  />

                  Reject Optional
                </button>

                <button
                  type="button"
                  onClick={() => decide("accepted")}
                  className={cn(
                    buttonBaseClasses,
                    "border border-[#C62832]",
                    "bg-[#C62832] text-white",
                    "hover:border-[#A82029]",
                    "hover:bg-[#A82029]",
                    "sm:min-w-[150px]"
                  )}
                >
                  <Check
                    aria-hidden="true"
                    className="h-4 w-4"
                    strokeWidth={2}
                  />

                  Accept All
                </button>
              </div>

              <div className="mt-3 flex items-center justify-center gap-2 lg:justify-end">
                <ShieldCheck
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-[#777A80]"
                  strokeWidth={1.7}
                />

                <p className="font-body text-[11px] leading-5 text-[#777A80]">
                  Your choice is saved on this device.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
