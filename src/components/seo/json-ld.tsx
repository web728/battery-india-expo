
import { siteConfig } from "@/lib/site-config";

/* ==================================================
   STRUCTURED DATA — INDIA BATTERY SHOW 2027

   Server Component compatible
   No client-side JavaScript required

   Exports:
   - OrganizationJsonLd
   - WebsiteJsonLd
   - EventJsonLd
   - BreadcrumbJsonLd
   - FaqJsonLd
================================================== */

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

const SITE_URL = siteConfig.siteUrl.replace(
  /\/+$/,
  ""
);

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

function toAbsoluteUrl(href: string): string {
  const value = href.trim();

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const path = value.startsWith("/")
    ? value
    : `/${value}`;

  return new URL(path, HOME_URL).toString();
}

function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

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
-------------------------------------------------- */

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",

    "@id": ORGANIZATION_ID,

    name: siteConfig.organizer.name,

    url: HOME_URL,

    description:
      `Organizer of ${siteConfig.eventName} ` +
      `${siteConfig.eventYear}.`,
  };

  return <JsonLd data={data} />;
}

/* --------------------------------------------------
   WEBSITE JSON-LD
-------------------------------------------------- */

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",

    "@id": WEBSITE_ID,

    name: siteConfig.eventName,

    alternateName: siteConfig.shortName,

    url: HOME_URL,

    inLanguage: "en-IN",

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

   Render once on the main event landing page.

   Do not insert another partial Event schema
   elsewhere on the same page.
-------------------------------------------------- */

export function EventJsonLd() {
  const eventName =
    `${siteConfig.eventName} ` +
    `${siteConfig.eventYear}`;

  const startDate =
    `${siteConfig.dates.start}T` +
    `${siteConfig.visitorHours.opens}:00` +
    siteConfig.visitorHours.utcOffset;

  const endDate =
    `${siteConfig.dates.end}T` +
    `${siteConfig.visitorHours.closes}:00` +
    siteConfig.visitorHours.utcOffset;

  const data = {
    "@context": "https://schema.org",
    "@type": "ExhibitionEvent",

    "@id": EVENT_ID,

    name: eventName,

    description:
      `${eventName} brings together businesses ` +
      `in battery manufacturing, energy storage, ` +
      `battery technology, components and ` +
      `related power solutions.`,

    url: HOME_URL,

    inLanguage: "en-IN",

    startDate,
    endDate,

    eventAttendanceMode:
      "https://schema.org/OfflineEventAttendanceMode",

    eventStatus:
      "https://schema.org/EventScheduled",

    image: [
      toAbsoluteUrl(siteConfig.seo.eventImage),
    ],

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

      url: HOME_URL,
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
-------------------------------------------------- */

export function BreadcrumbJsonLd({
  items,
}: BreadcrumbJsonLdProps) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: "Home",
      href: "/",
    },

    ...items.filter(
      (item) => item.href !== "/"
    ),
  ];

  const uniqueItems = breadcrumbs.filter(
    (item, index, array) =>
      array.findIndex(
        (candidate) =>
          candidate.href === item.href
      ) === index
  );

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: uniqueItems.map(
      (item, index) => ({
        "@type": "ListItem",

        position: index + 1,

        name: item.label,

        item: toAbsoluteUrl(item.href),
      })
    ),
  };

  return <JsonLd data={data} />;
}

/* --------------------------------------------------
   FAQ JSON-LD

   Questions and answers must match
   visible content on the same page.
-------------------------------------------------- */

export function FaqJsonLd({
  items,
}: FaqJsonLdProps) {
  const validItems = items.filter(
    (item) =>
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
