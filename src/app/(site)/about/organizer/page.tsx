
import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

import { OrganizerPageContent } from "./organizer-page-content";

/* -------------------------------------------
   INDIA BATTERY INTERNATIONAL SHOW

   Page: About the Organizer
   Route: /about/organizer

   - Server Component
   - Unique SEO metadata
   - Absolute canonical URL
   - Open Graph and Twitter
   - AboutPage structured data
   - Breadcrumb structured data
   - Shared editorial PageHero
------------------------------------------- */

const pagePath = "/about/organizer";

const pageUrl =
  `${siteConfig.siteUrl}${pagePath}`;

const heroImage =
  "/images/DSC00901.JPG.webp";

const socialImage =
  `${siteConfig.siteUrl}${heroImage}`;

const pageTitle =
  `About the Organizer | ${siteConfig.eventName} 2027`;

const pageDescription =
  `Meet ${siteConfig.organizer.name}, organizer of ${siteConfig.eventName}. ` +
  `Find event details and official contacts for ${siteConfig.dates.display} ` +
  `at ${siteConfig.venue.name}, Pune, India.`;

/* -------------------------------------------
   PAGE METADATA
------------------------------------------- */

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
        alt: `${siteConfig.eventName} exhibition`,
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
  },
};

/* -------------------------------------------
   PAGE COMPONENT
------------------------------------------- */

export default function OrganizerPage() {
  const pageJsonLd = {
    "@context": "https://schema.org",

    "@type": "AboutPage",

    "@id": `${pageUrl}#webpage`,

    url: pageUrl,

    name: pageTitle,

    description: pageDescription,

    inLanguage: "en-IN",

    isPartOf: {
      "@type": "WebSite",

      "@id": `${siteConfig.siteUrl}/#website`,

      url: `${siteConfig.siteUrl}/`,

      name: siteConfig.eventName,
    },

    about: {
      "@type": "Organization",

      name: siteConfig.organizer.name,
    },
  };

  return (
    <>
      {/* ABOUT PAGE STRUCTURED DATA */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            pageJsonLd
          ).replace(/</g, "\\u003c"),
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
            label: "About the Organizer",
            href: pagePath,
          },
        ]}
      />

      {/* SHARED EDITORIAL HERO */}

      <PageHero
        eyebrow="About the Organizer"
        title="Meet the Organizer"
        description={`${siteConfig.organizer.name} organizes ${siteConfig.eventName}, taking place ${siteConfig.dates.display} at ${siteConfig.venue.name}, Pune, India.`}
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
          src: heroImage,
          alt: "Exhibition venue and industry networking at a battery trade show",
        }}
      />

      {/* ORGANIZER EDITORIAL CONTENT */}

      <OrganizerPageContent />
    </>
  );
}
