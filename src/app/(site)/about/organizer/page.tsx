import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

import { OrganizerPageContent } from "./organizer-page-content";

const pageTitle = "About the Organizer | India International Battery Show 2027";

const pageDescription = `Learn about ${siteConfig.organizer.name}, the organizer of India International Battery Show 2027, taking place 14–16 October at Auto Cluster Exhibition Centre, Pune.`;

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },
  description: pageDescription,
  alternates: {
    canonical: "/about/organizer",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: pageTitle,
    description: pageDescription,
    url: "/about/organizer",
    images: [
      {
        url: "/images/expo-vip-lounge-branding.jpg",
        alt: "India International Battery Show exhibition branding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/images/expo-vip-lounge-branding.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function OrganizerPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {
            label: "About the Show",
            href: "/about",
          },
          {
            label: "About the Organizer",
            href: "/about/organizer",
          },
        ]}
      />

      <PageHero
        eyebrow="About the Organizer"
        title="Meet the Organizer"
        description={`${siteConfig.organizer.name}, organizer of India International Battery Show 2027 in Pune.`}
        breadcrumbs={[
          {
            label: "About the Show",
            href: "/about",
          },
          {
            label: "About the Organizer",
          },
        ]}
        backgroundImage={{
          src: "/images/expo-vip-lounge-branding.jpg",
          alt: "Exhibition branding from a previous edition of India International Battery Show",
        }}
      />

      <OrganizerPageContent />
    </>
  );
}
