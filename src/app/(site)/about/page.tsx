
import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/sections/page-hero";
import { AboutPageContent } from "./about-page-content";

import { siteConfig } from "@/lib/site-config";

/* --------------------------------------------------
   INDIA BATTERY INTERNATIONAL SHOW
   Route: /about

   SEO:
   - Unique title and description
   - Self-referencing canonical
   - Open Graph / Twitter metadata
   - AboutPage structured data
   - Breadcrumb structured data

   DESIGN:
   - Premium charcoal inner-page hero
   - Editorial light content
   - Existing PageHero component
-------------------------------------------------- */

const SITE_URL = siteConfig.siteUrl.replace(/\/+$/, "");

const PAGE_PATH = "/about";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const EVENT_NAME = "2nd India Battery International Show";

const PAGE_TITLE =
  "About 2nd India Battery International Show 2027 | Pune";

const PAGE_DESCRIPTION =
  "Discover 2nd India Battery International Show, 14–16 October " +
  "2027 at Auto Cluster Exhibition Centre, Pune. " +
  "Explore battery manufacturing, energy storage, " +
  "testing, components and recycling technologies.";

const HERO_IMAGE =
  "/images/expo-vip-lounge-branding.jpg";

const OG_IMAGE = `${SITE_URL}${HERO_IMAGE}`;

/* --------------------------------------------------
   PAGE-SPECIFIC METADATA
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
    siteName: EVENT_NAME,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        alt: "2nd India Battery International Show exhibition",
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
   STRUCTURED DATA

   AboutPage schema references the event entity.

   The detailed Event JSON-LD already exists
   in the site's root layout.

   Avoid creating another competing, detailed
   Event object on every page.
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
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: EVENT_NAME,
  },

  about: {
    "@type": "Event",
    name: EVENT_NAME,

    startDate: "2027-10-14T10:00:00+05:30",
    endDate: "2027-10-16T18:00:00+05:30",

    location: {
      "@type": "Place",
      name: "Auto Cluster Exhibition Centre",

      address: {
        "@type": "PostalAddress",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
    },
  },
};

/* --------------------------------------------------
   PAGE COMPONENT
-------------------------------------------------- */

export default function AboutPage() {
  return (
    <>
      {/* AboutPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            aboutPageJsonLd
          ).replace(/</g, "\\u003c"),
        }}
      />

      {/* Breadcrumb structured data */}
      <BreadcrumbJsonLd
        items={[
          {
            label: "About the Show",
            href: "/about",
          },
        ]}
      />

      {/* Inner-page hero */}
      <PageHero
        eyebrow="About the Show"
        title="About 2nd India Battery International Show 2027"
        description="A dedicated exhibition bringing together battery manufacturers, technology providers, energy storage companies and industry professionals in Pune, India."
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

      {/* Main editorial content */}
      <AboutPageContent />
    </>
  );
}
