
import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/sections/page-hero";
import { AboutPageContent } from "./about-page-content";

import { siteConfig } from "@/lib/site-config";

/* ==================================================
   INDIA BATTERY INTERNATIONAL SHOW
   ROUTE: /about

   SEO:
   - Unique page title
   - Unique meta description
   - Self-referencing canonical
   - Open Graph metadata
   - Twitter metadata
   - AboutPage JSON-LD
   - Breadcrumb JSON-LD

   ENTITY RELATIONSHIPS:
   - References global Website entity
   - References global Organization entity
   - References homepage Event entity

   IMPORTANT:
   - Do not create another Event object here.
   - Reuse the canonical Event @id.
================================================== */

/* --------------------------------------------------
   CANONICAL URLS
-------------------------------------------------- */

const SITE_URL = siteConfig.siteUrl.replace(/\/+$/, "");

const PAGE_PATH = "/about";

const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const HOME_URL = `${SITE_URL}/`;

/* --------------------------------------------------
   SEO CONTENT
-------------------------------------------------- */

const EVENT_NAME =
  `${siteConfig.eventName} ${siteConfig.eventYear}`;

const PAGE_TITLE =
  `About ${EVENT_NAME} | Battery Exhibition Pune`;

const PAGE_DESCRIPTION =
  `Learn about ${EVENT_NAME}, taking place ` +
  `${siteConfig.dates.display} at ` +
  `${siteConfig.venue.name}, ${siteConfig.venue.city}, India. ` +
  "Discover the exhibition's focus on battery manufacturing, " +
  "energy storage, battery technology, testing, components " +
  "and recycling innovations.";

const HERO_IMAGE = "/images/DSC01297.JPG.webp";

const OG_IMAGE = `${SITE_URL}${HERO_IMAGE}`;

/* --------------------------------------------------
   STABLE STRUCTURED DATA IDS
-------------------------------------------------- */

const {
  organizationId: ORGANIZATION_ID,
  websiteId: WEBSITE_ID,
  eventId: EVENT_ID,
} = siteConfig.seo;

/* --------------------------------------------------
   SAFE JSON-LD SERIALIZER
-------------------------------------------------- */

function serializeJsonLd(data: unknown): string {
  return (JSON.stringify(data) ?? "{}")
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/* --------------------------------------------------
   PAGE METADATA
-------------------------------------------------- */

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    type: "website",

    locale: "en_IN",

    url: PAGE_URL,

    siteName: siteConfig.eventName,

    title: PAGE_TITLE,

    description: PAGE_DESCRIPTION,

    images: [
      {
        url: OG_IMAGE,

        alt: `${EVENT_NAME} exhibition in Pune, India`,

        width: 1200,

        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: PAGE_TITLE,

    description: PAGE_DESCRIPTION,

    images: [OG_IMAGE],
  },

  robots: {
    index: true,

    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

/* --------------------------------------------------
   ABOUT PAGE JSON-LD

   AboutPage references existing entities.

   Do not redefine the complete Event object.

   Event details are managed by the homepage
   EventJsonLd component.
-------------------------------------------------- */

const aboutPageJsonLd = {
  "@context": "https://schema.org",

  "@type": "AboutPage",

  "@id": `${PAGE_URL}#webpage`,

  url: PAGE_URL,

  name: PAGE_TITLE,

  description: PAGE_DESCRIPTION,

  inLanguage: "en-IN",

  isPartOf: {
    "@id": WEBSITE_ID,
  },

  publisher: {
    "@id": ORGANIZATION_ID,
  },

  about: {
    "@id": EVENT_ID,
  },

  mainEntity: {
    "@id": EVENT_ID,
  },

  primaryImageOfPage: {
    "@type": "ImageObject",

    url: OG_IMAGE,
  },
};

/* ==================================================
   ABOUT PAGE COMPONENT
================================================== */

export default function AboutPage() {
  return (
    <>
      {/* ABOUT PAGE STRUCTURED DATA */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(aboutPageJsonLd),
        }}
      />

      {/* BREADCRUMB STRUCTURED DATA */}

      <BreadcrumbJsonLd
        items={[
          {
            label: "About the Show",
            href: "/about",
          },
        ]}
      />

      {/* INNER PAGE HERO */}

      <PageHero
        eyebrow="About the Show"
        title={`About ${EVENT_NAME}`}
        description={
          "A dedicated exhibition bringing together battery " +
          "manufacturers, technology providers, energy storage " +
          "companies and industry professionals in Pune, India."
        }
        breadcrumbs={[
          {
            label: "About the Show",
          },
        ]}
        backgroundImage={{
          src: HERO_IMAGE,
          alt: "Industry professionals at a battery exhibition",
        }}
      />

      {/* MAIN EDITORIAL CONTENT */}

      <AboutPageContent />
    </>
  );
}
