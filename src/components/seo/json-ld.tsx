
import { siteConfig } from "@/lib/site-config";

/* ==================================================
   INDIA BATTERY INTERNATIONAL SHOW

   FILE: components/seo/json-ld.tsx

   PURPOSE
   - Organization structured data
   - Event structured data
   - Breadcrumb structured data
   - FAQ structured data

   NEXT.JS
   - App Router compatible
   - Server Components
   - No client-side JavaScript required

   SEO
   - Schema.org JSON-LD
   - Centralized event data
   - Stable entity identifiers
   - Safe JSON serialization

   IMPORTANT
   - Event facts come from siteConfig
   - Do not invent ratings or attendance
   - Only publish verified information
================================================== */

/* --------------------------------------------------
   TYPES
-------------------------------------------------- */

type BreadcrumbItem = {
  label: string;
  href: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type BreadcrumbJsonLdProps = {
  items: readonly BreadcrumbItem[];
};

type FaqJsonLdProps = {
  items: readonly FaqItem[];
};

/* --------------------------------------------------
   SITE URLS AND ENTITY IDENTIFIERS
-------------------------------------------------- */

const SITE_URL = siteConfig.siteUrl.replace(/\/+$/, "");

const HOME_URL = `${SITE_URL}/`;

const WEBSITE_ID = `${HOME_URL}#website`;

const ORGANIZATION_ID = `${HOME_URL}#organization`;

const EVENT_ID = `${HOME_URL}#event`;

const VENUE_ID = `${HOME_URL}#venue`;

/* --------------------------------------------------
   HELPERS
-------------------------------------------------- */

/**
 * Safely serialize JSON-LD for insertion into
 * an HTML script element.
 *
 * Escaping "<" prevents injected content from
 * prematurely ending the script tag.
 */

function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/**
 * Convert internal paths into absolute URLs.
 *
 * Examples:
 * "/"                 -> https://example.com/
 * "/about"            -> https://example.com/about
 * "exhibit/categories" -> https://example.com/exhibit/categories
 *
 * Already absolute URLs are preserved.
 */

function toAbsoluteUrl(href: string): string {
  const value = href.trim();

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return new URL(
    value.startsWith("/") ? value : `/${value}`,
    HOME_URL
  ).toString();
}

/* ==================================================
   1. ORGANIZATION JSON-LD
================================================== */

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",

    "@type": "Organization",

    "@id": ORGANIZATION_ID,

    name: siteConfig.organizer.name,

    description:
      `Organizer of ${siteConfig.eventName}.`,

    // Links the organizer to the event entity.
    event: {
      "@id": EVENT_ID,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(data),
      }}
    />
  );
}

/* ==================================================
   2. EVENT JSON-LD
================================================== */

export function EventJsonLd() {
  const data = {
    "@context": "https://schema.org",

    "@type": "Event",

    "@id": EVENT_ID,

    name: siteConfig.eventName,

    description: siteConfig.tagline,

    url: HOME_URL,

    /* -----------------------------------------
       EVENT DATES

       Date-only values are intentionally
       used because these are confirmed
       event dates.

       Visitor opening hours are separate
       and should not automatically be
       assumed to define the event schedule.
    ----------------------------------------- */

    startDate: siteConfig.dates.start,

    endDate: siteConfig.dates.end,

    /* -----------------------------------------
       EVENT STATUS
    ----------------------------------------- */

    eventAttendanceMode:
      "https://schema.org/OfflineEventAttendanceMode",

    eventStatus:
      "https://schema.org/EventScheduled",

    /* -----------------------------------------
       PHYSICAL VENUE
    ----------------------------------------- */

    location: {
      "@type": "Place",

      "@id": VENUE_ID,

      name: siteConfig.venue.name,

      address: {
        "@type": "PostalAddress",

        streetAddress: siteConfig.venue.line2,

        addressLocality: siteConfig.venue.city,

        addressRegion: siteConfig.venue.state,

        addressCountry: "IN",
      },
    },

    /* -----------------------------------------
       ORGANIZER ENTITY
    ----------------------------------------- */

    organizer: {
      "@type": "Organization",

      "@id": ORGANIZATION_ID,

      name: siteConfig.organizer.name,
    },

    /* -----------------------------------------
       EVENT IMAGE

       This image must exist under public/.
    ----------------------------------------- */

    image: [
      toAbsoluteUrl(
        "/images/expo-motor-technology-booth.jpg"
      ),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(data),
      }}
    />
  );
}

/* ==================================================
   3. BREADCRUMB JSON-LD
================================================== */

export function BreadcrumbJsonLd({
  items,
}: BreadcrumbJsonLdProps) {
  /*
   * All current pages pass breadcrumbs
   * excluding the homepage.
   *
   * Add Home as the first entry
   * for a complete hierarchy.
   */

  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: "Home",
      href: "/",
    },

    ...items.filter(
      (item) => item.href !== "/"
    ),
  ];

  const data = {
    "@context": "https://schema.org",

    "@type": "BreadcrumbList",

    itemListElement: breadcrumbs.map(
      (item, index) => ({
        "@type": "ListItem",

        position: index + 1,

        name: item.label,

        item: toAbsoluteUrl(item.href),
      })
    ),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(data),
      }}
    />
  );
}

/* ==================================================
   4. FAQ JSON-LD
================================================== */

export function FaqJsonLd({
  items,
}: FaqJsonLdProps) {
  if (items.length === 0) {
    return null;
  }

  const data = {
    "@context": "https://schema.org",

    "@type": "FAQPage",

    mainEntity: items.map((item) => ({
      "@type": "Question",

      name: item.question,

      acceptedAnswer: {
        "@type": "Answer",

        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(data),
      }}
    />
  );
}

/* ==================================================
   OPTIONAL: WEBSITE JSON-LD

   Add this to your root layout if no
   other WebSite JSON-LD is present.

   Do not render duplicate WebSite entities
   with conflicting IDs or properties.
================================================== */

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",

    "@type": "WebSite",

    "@id": WEBSITE_ID,

    name: siteConfig.eventName,

    alternateName: siteConfig.shortName,

    url: HOME_URL,

    inLanguage: "en-IN",

    about: {
      "@id": EVENT_ID,
    },

    publisher: {
      "@id": ORGANIZATION_ID,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(data),
      }}
    />
  );
}
