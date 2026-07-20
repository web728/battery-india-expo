"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        params: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
        }
      ) => number;
      reset: (widgetId?: number) => void;
    };
    onRecaptchaScriptLoad?: () => void;
  }
}

// Drop this into any form. It renders Google's "I'm not a robot" checkbox
// and calls onChange with the token (or null when it expires/resets).
// Server side, verify the token with lib/recaptcha.ts's verifyRecaptcha().
export function Recaptcha({ onChange, error }: { onChange: (token: string | null) => void; error?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    function renderWidget() {
      if (containerRef.current && window.grecaptcha && widgetId.current === null && siteKey) {
        widgetId.current = window.grecaptcha.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => onChange(token),
          "expired-callback": () => onChange(null),
        });
      }
    }

    if (window.grecaptcha) {
      renderWidget();
    } else {
      window.onRecaptchaScriptLoad = renderWidget;
    }
  }, [siteKey, onChange]);

  if (!siteKey) {
    // Not configured yet — don't block the form, just skip rendering.
    return null;
  }

  return (
    <div>
      <Script
        src="https://www.google.com/recaptcha/api.js?onload=onRecaptchaScriptLoad&render=explicit"
        strategy="afterInteractive"
      />
      <div ref={containerRef} />
      {error && (
        <p role="alert" className="mt-2 text-sm font-medium text-red">
          {error}
        </p>
      )}
    </div>
  );
}