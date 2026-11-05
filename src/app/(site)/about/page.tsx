import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/sections/page-hero";
import { siteConfig } from "@/lib/site-config";
import { AboutPageContent } from "./about-page-content";

const pageTitle = "About the Show | Battery Exhibition Pune 2027";
const pageDescription =
  "Learn about India International Battery Show, taking place 14–16 October 2027 in Pune. Explore battery manufacturing, energy storage, testing and recycling.";

const siteUrl = siteConfig.siteUrl.replace(/\/$/, "");
const pageUrl = `${siteUrl}/about`;
const imageUrl = `${siteUrl}/images/expo-vip-lounge-branding.jpg`;

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: pageUrl,
    siteName: siteConfig.eventName,
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: imageUrl,
        alt: "India International Battery Show exhibition and industry networking",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [imageUrl],
  },
  robots: { index: true, follow: true },
};

export default function AboutPage() {
  const webpageJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: pageTitle,
    description: pageDescription,
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteConfig.eventName,
    },
    about: {
      "@type": "Event",
      name: siteConfig.eventName,
      startDate: "2027-10-14",
      endDate: "2027-10-16",
      location: {
        "@type": "Place",
        name: "Auto Cluster Exhibition Centre",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Pimpri-Chinchwad",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webpageJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <BreadcrumbJsonLd items={[{ label: "About the Show", href: "/about" }]} />

      <PageHero
        eyebrow="About the Show"
        title="About India International Battery Show 2027"
        description="A dedicated exhibition for battery technologies, manufacturing, energy storage and recycling, taking place 14–16 October 2027 in Pune."
        breadcrumbs={[{ label: "About the Show" }]}
        backgroundImage={{
          src: "/images/expo-vip-lounge-branding.jpg",
          alt: "Industry networking at India International Battery Show",
        }}
      />

      <AboutPageContent />
    </>
  );
}
