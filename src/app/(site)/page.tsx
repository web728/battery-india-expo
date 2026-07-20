import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { QuickActionCards } from "@/components/sections/quick-action-cards";
import { EventOverview } from "@/components/sections/event-overview";
import { StatsSection } from "@/components/sections/stats-section";
import { SectorsGrid } from "@/components/sections/sectors-grid";
import { BenefitSection } from "@/components/sections/benefit-section";
import { ShowHighlights } from "@/components/sections/show-highlights";
import { CoLocatedShows } from "@/components/sections/co-located-shows";
import { ConfirmedExhibitorsStrip } from "@/components/sections/confirmed-exhibitors";
import { GallerySection } from "@/components/sections/gallery-section";
import { WhyPuneSection } from "@/components/sections/why-pune-section";
import { VenueSection } from "@/components/sections/venue-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { FinalCta } from "@/components/sections/final-cta";
import { whyExhibitBenefits, whyVisitBenefits } from "@/lib/content/home-content";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `${siteConfig.eventName} | ${siteConfig.dates.display}, ${siteConfig.venue.city}`,
  description: siteConfig.tagline,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickActionCards />
      <EventOverview />
      <StatsSection />
      {/* <SectorsGrid /> */}
      {/* <BenefitSection
        eyebrow="Why Exhibit"
        title="Why Exhibit at India Battery International Show 2026"
        benefits={whyExhibitBenefits}
        ctaLabel="View Exhibitor Opportunities"
        ctaHref="/exhibit"
      />
      <BenefitSection
        eyebrow="Why Visit"
        title="Why Visit India Battery International Show 2026"
        benefits={whyVisitBenefits}
        ctaLabel="Register as a Trade Visitor"
        ctaHref="/visit/register"
        tone="dark"
      /> */}
      {/* <ShowHighlights /> */}
      <CoLocatedShows />
      {/* <ConfirmedExhibitorsStrip /> */}
      <GallerySection />
      <WhyPuneSection />
      <VenueSection />
      <NewsletterSection />
      <FinalCta />
    </>
  );
}
