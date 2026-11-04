import type { Metadata } from "next";

import { Hero } from "@/components/sections/hero";
import { QuickActionCards } from "@/components/sections/quick-action-cards";
import { EventOverview } from "@/components/sections/event-overview";
import { StatsSection } from "@/components/sections/stats-section";
import { SectorsGrid } from "@/components/sections/sectors-grid";
import { BenefitSection } from "@/components/sections/benefit-section";
import { ShowHighlights } from "@/components/sections/show-highlights";
import Partners from "@/components/sections/partners";
import { CoLocatedShows } from "@/components/sections/co-located-shows";
import { ConfirmedExhibitorsStrip } from "@/components/sections/confirmed-exhibitors";
import { GallerySection } from "@/components/sections/gallery-section";
import { WhyPuneSection } from "@/components/sections/why-pune-section";
import { VenueSection } from "@/components/sections/venue-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { FinalCta } from "@/components/sections/final-cta";

import {
  whyExhibitBenefits,
  whyVisitBenefits,
} from "@/lib/content/home-content";

import { siteConfig } from "@/lib/site-config";
import { Stats } from "@/components/sections/stats";

export const metadata: Metadata = {
  title: `${siteConfig.eventName} | ${siteConfig.dates.display}, ${siteConfig.venue.city}`,
  description: siteConfig.tagline,
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* <QuickActionCards /> */}

      {/* <Stats/> */}
      <StatsSection />

      <EventOverview />

      <SectorsGrid />

      {/* <BenefitSection
        eyebrow="Why Exhibit"
        title="Put Your Brand at the Center of India's Battery Industry"
        benefits={whyExhibitBenefits}
        ctaLabel="Explore Exhibitor Opportunities"
        ctaHref="/exhibit"
      />

      <BenefitSection
        eyebrow="Why Visit"
        title="Discover the Technologies Powering the Next Generation"
        benefits={whyVisitBenefits}
        ctaLabel="Register as a Trade Visitor"
        ctaHref="/visit/register"
        tone="dark"
      />

      <ShowHighlights /> */}

      {/* <Partners /> */}

      {/* <CoLocatedShows /> */}

      {/* <ConfirmedExhibitorsStrip /> */}

      <GallerySection />

      {/* <WhyPuneSection /> */}

      {/* <VenueSection /> */}

      {/* <NewsletterSection /> */}

      {/* <FinalCta /> */}
    </>
  );
}
