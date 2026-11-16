
import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { WhyPuneSection } from "@/components/sections/why-pune-section";
import { VenueSection } from "@/components/sections/venue-section";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

/* --------------------------------------------------
   INDIA BATTERY INTERNATIONAL SHOW

   Route: /about/why-pune

   SEO:
   - Unique metadata
   - Self-referencing canonical
   - Open Graph / Twitter
   - WebPage JSON-LD
   - Breadcrumb JSON-LD

   DESIGN:
   - Shared PageHero
   - Industrial editorial content
   - Dedicated venue section
-------------------------------------------------- */

const SITE_URL = siteConfig.siteUrl.replace(/\/+$/, "");

const PAGE_PATH = "/about/why-pune";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const EVENT_NAME = "2nd India Battery International Show";

const PAGE_TITLE =
  "Why Pune? | 2nd India Battery International Show 2027";

const PAGE_DESCRIPTION =
  "Discover why Pune is the host city for India Battery " +
  "International Show, 14–16 October 2027. Explore its " +
  "automotive ecosystem, engineering capabilities, " +
  "manufacturing industries and exhibition venue.";

const HERO_IMAGE =
  "/images/expo-ev-battery-showcase.jpg";

const SOCIAL_IMAGE = `${SITE_URL}${HERO_IMAGE}`;

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
    siteName: EVENT_NAME,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: SOCIAL_IMAGE,
        alt: "Battery technology exhibition and electric mobility showcase",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [SOCIAL_IMAGE],
  },

  robots: {
    index: true,
    follow: true,
  },
};

/* --------------------------------------------------
   WHY PUNE PAGE SCHEMA

   The global Event JSON-LD is handled
   separately by the existing SEO components.

   This object describes the page itself.
-------------------------------------------------- */

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
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

  about: [
    {
      "@type": "City",
      name: "Pune",
      containedInPlace: {
        "@type": "State",
        name: "Maharashtra",
      },
    },
    {
      "@type": "Event",
      name: EVENT_NAME,
      startDate: "2027-10-14",
      endDate: "2027-10-16",
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
  ],
};

/* --------------------------------------------------
   PAGE COMPONENT
-------------------------------------------------- */

export default function WhyPunePage() {
  return (
    <>
      {/* PAGE STRUCTURED DATA */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageJsonLd
          ).replace(/</g, "\\u003c"),
        }}
      />

      {/* BREADCRUMB STRUCTURED DATA */}

      <BreadcrumbJsonLd
        items={[
          {
            label: "About the Show",
            href: "/about",
          },
          {
            label: "Why Pune",
            href: PAGE_PATH,
          },
        ]}
      />

      {/* SHARED INNER PAGE HERO */}

      <PageHero
        eyebrow="Why Pune"
        title="Pune. Built on Engineering and Manufacturing."
        description="Discover why Pune's automotive ecosystem, industrial expertise and manufacturing network make it a relevant destination for the battery and energy storage industry."
        breadcrumbs={[
          {
            label: "About the Show",
            href: "/about",
          },
          {
            label: "Why Pune",
          },
        ]}
        backgroundImage={{
          src: HERO_IMAGE,
          alt: "Battery technology and electric mobility display at an industrial exhibition",
        }}
      />

      {/* WHY PUNE EDITORIAL CONTENT */}

      <WhyPuneSection />

      {/* DEDICATED VENUE INFORMATION */}

      <VenueSection />
    </>
  );
}
