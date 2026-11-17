
"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/* ==================================================
   CONSENT-AWARE ANALYTICS

   Supports:
   - Google Tag Manager
   - Google Analytics 4
   - Meta Pixel
   - LinkedIn Insight Tag

   Consent storage:
   bie-cookie-consent

   Values:
   - accepted
   - declined

   No optional trackers load before acceptance.
================================================== */

const CONSENT_KEY = "bie-cookie-consent";
const CONSENT_EVENT = "bie-consent-change";

const GA_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

const GTM_ID =
  process.env.NEXT_PUBLIC_GTM_ID ?? "";

const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

const LINKEDIN_PARTNER_ID =
  process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID ?? "";

type DataLayerEntry = Record<string, unknown> | unknown[];

type AnalyticsWindow = Window & {
  dataLayer?: DataLayerEntry[];

  gtag?: (...args: unknown[]) => void;

  fbq?: {
    (...args: unknown[]): void;
    queue?: unknown[][];
    loaded?: boolean;
    version?: string;
    callMethod?: (...args: unknown[]) => void;
  };

  _fbq?: (...args: unknown[]) => void;

  _linkedin_partner_id?: string;
  _linkedin_data_partner_ids?: string[];
};

/* --------------------------------------------------
   HELPERS
-------------------------------------------------- */

function hasConsent() {
  try {
    return (
      window.localStorage.getItem(
        CONSENT_KEY
      ) === "accepted"
    );
  } catch {
    return false;
  }
}

function appendExternalScript(
  id: string,
  src: string
) {
  if (document.getElementById(id)) {
    return;
  }

  const script = document.createElement("script");

  script.id = id;
  script.src = src;
  script.async = true;

  document.head.appendChild(script);
}

/* --------------------------------------------------
   GOOGLE TAG MANAGER
-------------------------------------------------- */

function initializeGTM(gtmId: string) {
  const analyticsWindow =
    window as AnalyticsWindow;

  analyticsWindow.dataLayer =
    analyticsWindow.dataLayer ?? [];

  analyticsWindow.dataLayer.push({
    "gtm.start": Date.now(),
    event: "gtm.js",
  });

  appendExternalScript(
    "consented-gtm-script",
    `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`
  );
}

/* --------------------------------------------------
   GOOGLE ANALYTICS 4
-------------------------------------------------- */

function initializeGA4(gaId: string) {
  const analyticsWindow =
    window as AnalyticsWindow;

  analyticsWindow.dataLayer =
    analyticsWindow.dataLayer ?? [];

  analyticsWindow.gtag = (...args: unknown[]) => {
    analyticsWindow.dataLayer?.push(args);
  };

  analyticsWindow.gtag("js", new Date());

  // Prevent automatic page_view duplication.
  analyticsWindow.gtag("config", gaId, {
    send_page_view: false,
  });

  appendExternalScript(
    "consented-ga4-script",
    `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`
  );
}

/* --------------------------------------------------
   META PIXEL
-------------------------------------------------- */

function initializeMetaPixel(pixelId: string) {
  const analyticsWindow =
    window as AnalyticsWindow;

  if (!analyticsWindow.fbq) {
    const fbq = (...args: unknown[]) => {
      const pixel = analyticsWindow.fbq;

      if (pixel?.callMethod) {
        pixel.callMethod(...args);
      } else {
        pixel?.queue?.push(args);
      }
    };

    analyticsWindow.fbq = fbq;
    analyticsWindow._fbq = fbq;

    analyticsWindow.fbq.queue = [];
    analyticsWindow.fbq.loaded = true;
    analyticsWindow.fbq.version = "2.0";
  }

  analyticsWindow.fbq("init", pixelId);

  appendExternalScript(
    "consented-meta-pixel-script",
    "https://connect.facebook.net/en_US/fbevents.js"
  );
}

/* --------------------------------------------------
   LINKEDIN INSIGHT TAG
-------------------------------------------------- */

function initializeLinkedIn(partnerId: string) {
  const analyticsWindow =
    window as AnalyticsWindow;

  analyticsWindow._linkedin_partner_id =
    partnerId;

  analyticsWindow._linkedin_data_partner_ids =
    analyticsWindow._linkedin_data_partner_ids ?? [];

  if (
    !analyticsWindow._linkedin_data_partner_ids.includes(
      partnerId
    )
  ) {
    analyticsWindow._linkedin_data_partner_ids.push(
      partnerId
    );
  }

  appendExternalScript(
    "consented-linkedin-script",
    "https://snap.licdn.com/li.lms-analytics/insight.min.js"
  );
}

/* ==================================================
   COMPONENT
================================================== */

export function AnalyticsScripts() {
  const pathname = usePathname();

  const initializedRef = useRef(false);

  const lastPathRef = useRef<string | null>(
    null
  );

  /* ------------------------------------------------
     INITIALIZE ONLY AFTER CONSENT
  ------------------------------------------------ */

  useEffect(() => {
    function initialize() {
      if (
        initializedRef.current ||
        !hasConsent()
      ) {
        return;
      }

      initializedRef.current = true;

      // GTM takes precedence over standalone GA4.
      // Configure GA4 inside GTM if both IDs exist.
      if (/^GTM-[A-Z0-9]+$/i.test(GTM_ID)) {
        initializeGTM(GTM_ID);
      } else if (/^G-[A-Z0-9]+$/i.test(GA_ID)) {
        initializeGA4(GA_ID);

        const analyticsWindow =
          window as AnalyticsWindow;

        analyticsWindow.gtag?.(
          "event",
          "page_view",
          {
            page_path:
              window.location.pathname +
              window.location.search,
          }
        );
      }

      if (/^\d+$/.test(META_PIXEL_ID)) {
        initializeMetaPixel(META_PIXEL_ID);

        const analyticsWindow =
          window as AnalyticsWindow;

        analyticsWindow.fbq?.(
          "track",
          "PageView"
        );
      }

      if (/^\d+$/.test(LINKEDIN_PARTNER_ID)) {
        initializeLinkedIn(
          LINKEDIN_PARTNER_ID
        );
      }
    }

    function handleConsentChange(
      event: Event
    ) {
      const customEvent =
        event as CustomEvent<
          "accepted" | "declined"
        >;

      if (
        customEvent.detail === "accepted"
      ) {
        initialize();
      }

      if (
        customEvent.detail === "declined" &&
        initializedRef.current
      ) {
        // Remove active tracker execution by
        // reloading with declined consent.
        window.location.reload();
      }
    }

    function handleStorageChange(
      event: StorageEvent
    ) {
      if (event.key !== CONSENT_KEY) {
        return;
      }

      if (event.newValue === "accepted") {
        initialize();
      } else if (initializedRef.current) {
        window.location.reload();
      }
    }

    initialize();

    window.addEventListener(
      CONSENT_EVENT,
      handleConsentChange
    );

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    return () => {
      window.removeEventListener(
        CONSENT_EVENT,
        handleConsentChange
      );

      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, []);

  /* ------------------------------------------------
     CLIENT-SIDE ROUTE CHANGES

     GA4 standalone: manual page views.
     Meta Pixel: manual PageView.

     GTM: configure a History Change trigger
     in the GTM workspace.
  ------------------------------------------------ */

  useEffect(() => {
    if (lastPathRef.current === null) {
      lastPathRef.current = pathname;
      return;
    }

    if (lastPathRef.current === pathname) {
      return;
    }

    lastPathRef.current = pathname;

    if (
      !initializedRef.current ||
      !hasConsent()
    ) {
      return;
    }

    const analyticsWindow =
      window as AnalyticsWindow;

    if (
      !GTM_ID &&
      /^G-[A-Z0-9]+$/i.test(GA_ID)
    ) {
      analyticsWindow.gtag?.(
        "event",
        "page_view",
        {
          page_path:
            window.location.pathname +
            window.location.search,
        }
      );
    }

    if (/^\d+$/.test(META_PIXEL_ID)) {
      analyticsWindow.fbq?.(
        "track",
        "PageView"
      );
    }
  }, [pathname]);

  return null;
}
