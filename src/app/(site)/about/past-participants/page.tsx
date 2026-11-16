
import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { PastParticipants } from "@/components/sections/past-participants";
import { siteConfig } from "@/lib/site-config";

/* --------------------------------------------------
   INDIA BATTERY INTERNATIONAL SHOW

   Route: /about/past-participants

   SEO
   - Unique title and description
   - Absolute canonical URL
   - Open Graph and Twitter
   - AboutPage structured data
   - Breadcrumb structured data

   CONTENT POLICY
   - Previous-edition information only
   - No implied 2027 endorsements
-------------------------------------------------- */

const PAGE_PATH = "/about/past-participants";

const SITE_URL = siteConfig.siteUrl.replace(/\/+$/, "");

const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const HERO_IMAGE =
  "/images/expo-floor-ev-booth-visitors.jpg";

const SOCIAL_IMAGE = `${SITE_URL}${HERO_IMAGE}`;

const PAGE_TITLE =
  `Past Participants & Partners | ${siteConfig.eventName}`;

const PAGE_DESCRIPTION =
  `Explore past event partners, supporting associations, ` +
  `knowledge partners and media organisations featured ` +
  `in previous exhibition activities associated with ` +
  `${siteConfig.eventName}.`;

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
        url: SOCIAL_IMAGE,
        alt: "Visitors and exhibitors at a previous battery industry exhibition",
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
   PAGE COMPONENT
-------------------------------------------------- */

export default function PastParticipantsPage() {
  const pageJsonLd = {
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

      name: siteConfig.eventName,
    },

    about: {
      "@type": "Thing",
      name:
        "Previous-edition exhibition partners, associations and media organisations",
    },
  };

  return (
    <>
      {/* PAGE STRUCTURED DATA */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            pageJsonLd
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
            label: "Past Participants",
            href: PAGE_PATH,
          },
        ]}
      />

      {/* SHARED INNER PAGE HERO */}

      <PageHero
        eyebrow="Previous Editions"
        title="Past Participants & Partners"
        description={`Explore partner organisations, industry associations and media representatives featured in previous exhibition activities associated with ${siteConfig.eventName}.`}
        breadcrumbs={[
          {
            label: "About the Show",
            href: "/about",
          },
          {
            label: "Past Participants",
          },
        ]}
        backgroundImage={{
          src: HERO_IMAGE,
          alt: "Previous exhibition visitors and industry participants",
        }}
      />

      {/* HISTORICAL PARTNER DIRECTORY */}

      <PastParticipants />
    </>
  );
}
