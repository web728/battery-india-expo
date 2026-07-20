import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { VenueSection } from "@/components/sections/venue-section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Venue Overview",
  description: `India Battery International Show 2026 takes place at the ${siteConfig.venue.name}, ${siteConfig.venue.city}.`,
  alternates: { canonical: "/venue" },
};

export default function VenuePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Venue & Travel", href: "/venue" }]} />
      <PageHero
        eyebrow="Venue & Travel"
        title="Venue Overview"
        description={siteConfig.venue.full}
        breadcrumbs={[{ label: "Venue & Travel" }]}
      />
      <VenueSection />
      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex justify-center">
            <a href="/venue/travel" className="max-w-sm rounded-xl border border-grey-light bg-white p-6 shadow-sm hover:shadow-md">
              <h3 className="font-heading text-base font-bold text-navy-dark">Travel Information</h3>
              <p className="mt-2 text-sm text-grey-medium">Air, rail and road access to Pune and the venue.</p>
            </a>
          </div>
          <div className="mt-10 flex justify-center">
            <Button href="/visit/register">Register to Visit</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
