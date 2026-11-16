
import type { Metadata } from "next";

import { Hero } from "@/components/sections/hero";
import { StatsSection } from "@/components/sections/stats-section";
import { EventOverview } from "@/components/sections/event-overview";
import { SectorsGrid } from "@/components/sections/sectors-grid";
import { BenefitSection } from "@/components/sections/benefit-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { FinalCta } from "@/components/sections/final-cta";

import {
  whyExhibitBenefits,
  whyVisitBenefits,
} from "@/lib/content/home-content";

import { siteConfig } from "@/lib/site-config";

/* --------------------------------------------------
   HOMEPAGE SEO

   Homepage metadata is intentionally specific.

   Root layout handles:
   - Global font loading
   - Site-wide schema components
   - Header and footer
   - Analytics and consent
   - Default SEO configuration

   This page handles:
   - Homepage-specific title
   - Homepage description
   - Homepage canonical
   - Social preview metadata

   Individual inner pages should have their
   own unique metadata and canonical URLs.
-------------------------------------------------- */

const pageTitle =
  `${siteConfig.eventName} 2027 | Battery & Energy Storage Expo India`;

const pageDescription =
  `Discover ${siteConfig.eventName}, ` +
  `${siteConfig.dates.display} in ` +
  `${siteConfig.venue.city}, India. ` +
  `Explore battery manufacturing, lithium-ion technology, ` +
  `energy storage, EV batteries, battery management ` +
  `systems and recycling innovations. ` +
  `Connect with manufacturers, suppliers and industry leaders.`;

const pageUrl = "/";

const socialImage = "/logo/battery.png";

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },

  description: pageDescription,

  alternates: {
    canonical: pageUrl,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: pageUrl,

    siteName: siteConfig.eventName,

    title: pageTitle,

    description: pageDescription,

    images: [
      {
        url: socialImage,
        width: 2048,
        height: 830,
        alt: `${siteConfig.eventName} official event logo`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [socialImage],
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
   HOMEPAGE

   DESIGN: HYBRID INDUSTRIAL EDITORIAL

   Visual principles:
   - Strong charcoal hero
   - Light-dominant content
   - Controlled brand-red accents
   - Minimal green
   - Authentic industrial imagery
   - Generous whitespace
   - Editorial typography
   - Consistent card geometry

   PERFORMANCE:
   - Server Component
   - No client-side state
   - No page-level animation runtime
   - No unnecessary imports
   - Reuse existing section components

   MOTION:
   Implement Motion for React inside
   individual interactive components.
-------------------------------------------------- */

export default function HomePage() {
  return (
    <>
      {/* ------------------------------------------
          01 — HERO

          Theme: Charcoal
          Purpose: Event positioning + conversion

          Component should implement:
          - Large headline
          - Event date and location
          - Authentic event/industry photography
          - Book a Stand CTA
          - Register to Visit CTA
          - Responsive dark overlay
      ------------------------------------------ */}

      <Hero />

      {/* ------------------------------------------
          02 — EVENT STATISTICS

          Theme: Warm off-white
          Purpose: Credibility and social proof

          Show only verified figures.

          Recommended:
          - Large statistical typography
          - Thin neutral dividers
          - No excessive count animations
      ------------------------------------------ */}

      <div className="relative bg-background text-foreground">
        <StatsSection />
      </div>

      {/* ------------------------------------------
          03 — EVENT OVERVIEW

          Theme: White
          Purpose: Introduce the exhibition

          Recommended:
          - Editorial 2-column layout
          - Strong heading hierarchy
          - Real exhibition photography
          - Clear supporting CTA
      ------------------------------------------ */}

      <div className="relative bg-surface text-foreground">
        <EventOverview />
      </div>

     

      {/* ------------------------------------------
          05 — WHY EXHIBIT

          Theme: Light
          Purpose: Convert potential exhibitors

          Recommended:
          - Business-focused benefits
          - Strong photography
          - Clear booth enquiry CTA
          - Minimal visual decoration
      ------------------------------------------ */}

      <div className="relative bg-surface text-foreground">
        <BenefitSection
          eyebrow="Why Exhibit"
          title="Put Your Brand at the Center of India's Battery Industry"
          benefits={whyExhibitBenefits}
          ctaLabel="Explore Exhibitor Opportunities"
          ctaHref="/exhibit"
        />
      </div>

      {/* ------------------------------------------
          06 — WHY VISIT

          Theme: Charcoal
          Purpose: Convert trade visitors

          Recommended:
          - Strong contrast section
          - Relevant visitor benefits
          - Real event photography
          - Clear registration CTA
      ------------------------------------------ */}

      <div className="relative bg-surface-dark text-white">
        <BenefitSection
          eyebrow="Why Visit"
          title="Discover the Technologies Powering the Next Generation"
          benefits={whyVisitBenefits}
          ctaLabel="Register as a Trade Visitor"
          ctaHref="/visit/register"
          tone="dark"
        />
      </div>

      {/* ------------------------------------------
          07 — EVENT GALLERY

          Theme: White
          Purpose: Real-world event credibility

          Recommended:
          - Actual previous-edition photographs
          - Editorial gallery composition
          - Next/Image optimization
          - Lazy-load below-the-fold images
      ------------------------------------------ */}

      <div className="relative bg-surface text-foreground">
        <GallerySection />
      </div>

    
    </>
  );
}