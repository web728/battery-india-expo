
import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { CoLocatedShows } from "@/components/sections/co-located-shows";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

/* --------------------------------------------------
   INDIA BATTERY INTERNATIONAL SHOW

   Route: /about/co-located-shows

   SEO
   - Unique metadata
   - Absolute canonical URL
   - Open Graph and Twitter
   - CollectionPage JSON-LD
   - Breadcrumb structured data

   DESIGN
   - Shared charcoal PageHero
   - Editorial co-located show profiles
   - Organizer identity section
-------------------------------------------------- */

const PAGE_PATH = "/about/co-located-shows";

const SITE_URL = siteConfig.siteUrl.replace(/\/+$/, "");

const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const HERO_IMAGE =
  "/images/expo-floor-ev-booth-visitors.jpg";

const SOCIAL_IMAGE = `${SITE_URL}${HERO_IMAGE}`;

const PAGE_TITLE =
  `Co-Located Shows | ${siteConfig.eventName} 2027`;

const PAGE_DESCRIPTION =
  `Explore the electric mobility and solar energy exhibitions ` +
  `alongside ${siteConfig.eventName}, taking place ` +
  `${siteConfig.dates.display} at ` +
  `${siteConfig.venue.name}, Pune, India.`;

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
        alt: "Visitors at an electric mobility and battery industry exhibition",
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

export default function CoLocatedShowsPage() {
  const pageJsonLd = {
    "@context": "https://schema.org",

    "@type": "CollectionPage",

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
      name: "Co-located battery, electric mobility and solar exhibitions",
    },
  };

  return (
    <>
      {/* PAGE-SPECIFIC STRUCTURED DATA */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageJsonLd).replace(
            /</g,
            "\\u003c"
          ),
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
            label: "Co-Located Shows",
            href: PAGE_PATH,
          },
        ]}
      />

      {/* REUSABLE INNER PAGE HERO */}

      <PageHero
        eyebrow="About the Show"
        title="Co-Located Shows"
        description={`Explore the connections between battery technology, electric mobility and solar energy at ${siteConfig.venue.name}, Pune, ${siteConfig.dates.display}.`}
        breadcrumbs={[
          {
            label: "About the Show",
            href: "/about",
          },
          {
            label: "Co-Located Shows",
          },
        ]}
        backgroundImage={{
          src: HERO_IMAGE,
          alt: "Visitors and exhibitors at an industrial technology exhibition",
        }}
      />

      {/* MAIN EDITORIAL CONTENT */}

      <CoLocatedShows />
    </>
  );
}
