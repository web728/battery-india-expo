
import { siteConfig } from "@/lib/site-config";

/* ==================================================
   STRUCTURED DATA — INDIA BATTERY SHOW 2027

   Next.js Server Component compatible

   Exports:
   - OrganizationJsonLd
   - WebsiteJsonLd
   - EventJsonLd
   - BreadcrumbJsonLd
   - FaqJsonLd

   STRUCTURED DATA STRATEGY:
   - One Organization entity
   - One WebSite entity
   - One Event entity
   - Stable entity IDs
   - No duplicate Event objects
   - Canonical absolute URLs
   - Safe JSON-LD serialization
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

type JsonLdProps = {
  data: Record<string, unknown>;
};

/* --------------------------------------------------
   CANONICAL URLS
-------------------------------------------------- */

const SITE_URL = siteConfig.siteUrl.replace(/\/+$/, "");

const HOME_URL = `${SITE_URL}/`;

const {
  organizationId: ORGANIZATION_ID,
  websiteId: WEBSITE_ID,
  eventId: EVENT_ID,
  venueId: VENUE_ID,
} = siteConfig.seo;

/* --------------------------------------------------
   HELPERS
-------------------------------------------------- */

/**
 * Converts relative URLs into absolute URLs
 * using the canonical production domain.
 */
function toAbsoluteUrl(href: string): string {
  const value = href.trim();

  if (!value) {
    return HOME_URL;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const path = value.startsWith("/")
    ? value
    : `/${value}`;

  return new URL(path, HOME_URL).toString();
}

/**
 * Safely serializes JSON-LD.
 *
 * Escapes characters that could interfere
 * with HTML script parsing.
 */
function serializeJsonLd(data: unknown): string {
  const json = JSON.stringify(data) ?? "{}";

  return json
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/**
 * Reusable JSON-LD script component.
 */
function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(data),
      }}
    />
  );
}

/* --------------------------------------------------
   ORGANIZATION JSON-LD

   Render globally in app/layout.tsx.
-------------------------------------------------- */

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",

    "@type": "Organization",

    "@id": ORGANIZATION_ID,

    name: siteConfig.organizer.name,

    description:
      `Organizer of ${siteConfig.eventName} ` +
      `${siteConfig.eventYear}.`,
  };

  return <JsonLd data={data} />;
}

/* --------------------------------------------------
   WEBSITE JSON-LD

   Render globally in app/layout.tsx.
-------------------------------------------------- */

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",

    "@type": "WebSite",

    "@id": WEBSITE_ID,

    name: siteConfig.eventName,

    alternateName: siteConfig.shortName,

    url: HOME_URL,

    inLanguage: siteConfig.seo.language,

    publisher: {
      "@id": ORGANIZATION_ID,
    },

    about: {
      "@id": EVENT_ID,
    },
  };

  return <JsonLd data={data} />;
}

/* --------------------------------------------------
   EVENT JSON-LD

   Google-supported Event type.

   IMPORTANT:
   Render ONLY ONCE on the homepage.

   Do not render this in the root layout.
-------------------------------------------------- */

export function EventJsonLd() {
  const eventName =
    `${siteConfig.eventName} ${siteConfig.eventYear}`;

  const startDate =
    `${siteConfig.dates.start}T` +
    `${siteConfig.visitorHours.opens}:00` +
    siteConfig.visitorHours.utcOffset;

  const endDate =
    `${siteConfig.dates.end}T` +
    `${siteConfig.visitorHours.closes}:00` +
    siteConfig.visitorHours.utcOffset;

  const eventImage = toAbsoluteUrl(
    siteConfig.seo.eventImage
  );

  const data = {
    "@context": "https://schema.org",

    "@type": "Event",

    "@id": EVENT_ID,

    name: eventName,

    description:
      `${eventName} brings together businesses ` +
      `in battery manufacturing, energy storage, ` +
      `battery technology, components and ` +
      `related power solutions.`,

    url: HOME_URL,

    inLanguage: siteConfig.seo.language,

    startDate,

    endDate,

    eventAttendanceMode:
      "https://schema.org/OfflineEventAttendanceMode",

    eventStatus:
      "https://schema.org/EventScheduled",

    image: [eventImage],

    location: {
      "@type": "Place",

      "@id": VENUE_ID,

      name: siteConfig.venue.name,

      address: {
        "@type": "PostalAddress",

        streetAddress:
          `${siteConfig.venue.line1}, ` +
          siteConfig.venue.line2,

        addressLocality: siteConfig.venue.city,

        addressRegion: siteConfig.venue.state,

        addressCountry: "IN",
      },
    },

    organizer: {
      "@type": "Organization",

      "@id": ORGANIZATION_ID,

      name: siteConfig.organizer.name,
    },

    mainEntityOfPage: {
      "@type": "WebPage",

      "@id": HOME_URL,
    },
  };

  return <JsonLd data={data} />;
}

/* --------------------------------------------------
   BREADCRUMB JSON-LD

   Generates canonical breadcrumb URLs.

   Example:
   Home > About > Why Pune
-------------------------------------------------- */

export function BreadcrumbJsonLd({
  items,
}: BreadcrumbJsonLdProps) {
  const allItems: BreadcrumbItem[] = [
    {
      label: "Home",
      href: "/",
    },

    ...items.filter(
      (item) => item.href.trim() !== "/"
    ),
  ];

  const seen = new Set<string>();

  const uniqueItems = allItems.filter((item) => {
    const label = item.label.trim();
    const url = toAbsoluteUrl(item.href);

    if (!label || seen.has(url)) {
      return false;
    }

    seen.add(url);

    return true;
  });

  if (uniqueItems.length === 0) {
    return null;
  }

  const data = {
    "@context": "https://schema.org",

    "@type": "BreadcrumbList",

    itemListElement: uniqueItems.map(
      (item, index) => ({
        "@type": "ListItem",

        position: index + 1,

        name: item.label.trim(),

        item: toAbsoluteUrl(item.href),
      })
    ),
  };

  return <JsonLd data={data} />;
}

/* --------------------------------------------------
   FAQ JSON-LD

   IMPORTANT:
   Questions and answers must match
   the visible content on the same page.

   Do not add hidden or invented FAQs.
-------------------------------------------------- */

export function FaqJsonLd({
  items,
}: FaqJsonLdProps) {
  const validItems = items.filter(
    (item) =>
      typeof item.question === "string" &&
      typeof item.answer === "string" &&
      item.question.trim().length > 0 &&
      item.answer.trim().length > 0
  );

  if (validItems.length === 0) {
    return null;
  }

  const data = {
    "@context": "https://schema.org",

    "@type": "FAQPage",

    mainEntity: validItems.map((item) => ({
      "@type": "Question",

      name: item.question.trim(),

      acceptedAnswer: {
        "@type": "Answer",

        text: item.answer.trim(),
      },
    })),
  };

  return <JsonLd data={data} />;
}
