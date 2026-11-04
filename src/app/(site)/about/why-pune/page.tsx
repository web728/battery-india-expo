
import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { WhyPuneSection } from "@/components/sections/why-pune-section";
import { VenueSection } from "@/components/sections/venue-section";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

const pageTitle =
  "Why Pune | India Battery International Show 2027";

const pageDescription =
  "Explore why Pune hosts India Battery International Show 2027. Discover its automotive manufacturing ecosystem, engineering expertise and industrial supply chain.";

const pagePath = "/about/why-pune";
const siteUrl = siteConfig.siteUrl.replace(/\/$/, "");
const pageUrl = `${siteUrl}${pagePath}`;

const heroImage =
  "/images/expo-ev-battery-showcase.jpg";

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
        url: `${siteUrl}${heroImage}`,
        alt: "Battery and electric mobility technologies at an industry exhibition",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [`${siteUrl}${heroImage}`],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function WhyPunePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {
            label: "About the Show",
            href: "/about",
          },
          {
            label: "Why Pune",
            href: "/about/why-pune",
          },
        ]}
      />

      <PageHero
        eyebrow="Why Pune"
        title="Pune. A Centre for Automotive & Battery Manufacturing."
        description="With an established automotive industry, engineering expertise and a network of component manufacturers, Pune provides a relevant setting for the battery and energy storage sectors."
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
          src: heroImage,
          alt: "Battery technology and electric mobility exhibition showcase",
        }}
      />

      <WhyPuneSection />

      <VenueSection />
    </>
  );
}
