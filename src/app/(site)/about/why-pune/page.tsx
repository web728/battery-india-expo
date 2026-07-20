import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { WhyPuneSection } from "@/components/sections/why-pune-section";
import { VenueSection } from "@/components/sections/venue-section";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Why Pune",
  description:
    "Pune is a major automotive and industrial hub with a growing battery component supply chain — a strategic host city for India Battery International Show 2026.",
  alternates: { canonical: "/about/why-pune" },
};

export default function WhyPunePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "About", href: "/about" }, { label: "Why Pune", href: "/about/why-pune" }]} />
      <PageHero
        eyebrow="About"
        title="Why Pune"
        description="A strategic host city at the heart of India's automotive and industrial manufacturing ecosystem."
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Why Pune" }]}
        backgroundImage={{
          src: "https://info.batteryindiaexpo.com/wp-content/uploads/2024/05/electronic-engineering-1.jpg",
          alt: "EV powertrain demonstration at a previous edition of the show",
        }}
      />
      <WhyPuneSection />
      <VenueSection />
    </>
  );
}