
import type { Metadata } from "next";

import { Hero } from "@/components/sections/hero";
import { StatsSection } from "@/components/sections/stats-section";
import { EventOverview } from "@/components/sections/event-overview";
import { SectorsGrid } from "@/components/sections/sectors-grid";
import { BenefitSection } from "@/components/sections/benefit-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { FinalCta } from "@/components/sections/final-cta";

import { EventJsonLd } from "@/components/seo/json-ld";

import {
  whyExhibitBenefits,
  whyVisitBenefits,
} from "@/lib/content/home-content";

import { siteConfig } from "@/lib/site-config";

/* ==================================================
   HOMEPAGE SEO
================================================== */

const SITE_URL = siteConfig.siteUrl.replace(/\/+$/, "");

const HOME_URL = `${SITE_URL}/`;

const pageTitle =
  `${siteConfig.eventName} ${siteConfig.eventYear} | ` +
  "Battery & Energy Storage Exhibition India";

const pageDescription =
  `Discover ${siteConfig.eventName} ${siteConfig.eventYear}, ` +
  `taking place ${siteConfig.dates.display} at ` +
  `${siteConfig.venue.name}, ${siteConfig.venue.city}, India. ` +
  "Explore battery manufacturing, lithium-ion technology, " +
  "energy storage systems, EV batteries, battery management " +
  "systems and recycling innovations. Connect with " +
  "manufacturers, suppliers and industry leaders.";

const socialImage = new URL(
  siteConfig.seo.socialImage,
  HOME_URL
).toString();

/* ==================================================
   HOMEPAGE METADATA
================================================== */

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },

  description: pageDescription,

  alternates: {
    canonical: HOME_URL,
  },

  openGraph: {
    type: "website",

    locale: "en_IN",

    url: HOME_URL,

    siteName: siteConfig.eventName,

    title: pageTitle,

    description: pageDescription,

    images: [
      {
        url: socialImage,
        alt: `${siteConfig.eventName} official event preview`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: pageTitle,

    description: pageDescription,

    images: [
      {
        url: socialImage,
        alt: `${siteConfig.eventName} official event preview`,
      },
    ],
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

/* ==================================================
   HOMEPAGE

   DESIGN:
   Hybrid Industrial Editorial

   PERFORMANCE:
   - Server Component
   - Reusable section components
   - No unnecessary client-side JavaScript

   SEO:
   - Unique homepage title
   - Unique meta description
   - Absolute canonical URL
   - Open Graph metadata
   - Twitter metadata

   STRUCTURED DATA:
   - Organization: Root layout
   - Website: Root layout
   - Event: Homepage only
================================================== */

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HOMEPAGE EVENT STRUCTURED DATA */}

      <EventJsonLd />

      {/* ------------------------------------------
          01 — HERO
          Event positioning and conversion
      ------------------------------------------ */}

      <Hero />

      {/* ------------------------------------------
          02 — EVENT STATISTICS
          Show only verified statistics
      ------------------------------------------ */}

      <section className="relative bg-background text-foreground">
        <StatsSection />
      </section>

      {/* ------------------------------------------
          03 — EVENT OVERVIEW
      ------------------------------------------ */}

      <section className="relative bg-surface text-foreground">
        <EventOverview />
      </section>

      {/* ------------------------------------------
          04 — INDUSTRY SECTORS
      ------------------------------------------ */}

      <section className="relative bg-background text-foreground">
        <SectorsGrid />
      </section>

      {/* ------------------------------------------
          05 — WHY EXHIBIT
      ------------------------------------------ */}

      <section className="relative bg-surface text-foreground">
        <BenefitSection
          eyebrow="Why Exhibit"
          title="Put Your Brand at the Center of India's Battery Industry"
          benefits={whyExhibitBenefits}
          ctaLabel="Explore Exhibitor Opportunities"
          ctaHref="/exhibit"
        />
      </section>

      {/* ------------------------------------------
          06 — WHY VISIT
      ------------------------------------------ */}

      <section className="relative bg-surface-dark text-white">
        <BenefitSection
          eyebrow="Why Visit"
          title="Discover the Technologies Powering the Next Generation"
          benefits={whyVisitBenefits}
          ctaLabel="Register as a Trade Visitor"
          ctaHref="/visit/register"
          tone="dark"
        />
      </section>

      {/* ------------------------------------------
          07 — EVENT GALLERY
      ------------------------------------------ */}

      <section className="relative bg-surface text-foreground">
        <GallerySection />
      </section>

      {/* ------------------------------------------
          08 — FINAL CTA
      ------------------------------------------ */}

      <section className="relative bg-background text-foreground">
        <FinalCta />
      </section>
    </div>
  );
}
