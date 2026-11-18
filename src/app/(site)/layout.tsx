
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { Inter, Manrope } from "next/font/google";

import "./globals.css";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StickyMobileBar } from "@/components/layout/sticky-mobile-bar";
import { ConsentBanner } from "@/components/layout/consent-banner";

import { ToastProvider } from "@/components/ui/toast";

import {
  OrganizationJsonLd,
  WebsiteJsonLd,
} from "@/components/seo/json-ld";

import { AnalyticsScripts } from "@/components/seo/analytics-scripts";

import { siteConfig } from "@/lib/site-config";

/* ==================================================
   FONTS
================================================== */

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
  preload: true,
  fallback: ["Arial", "sans-serif"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
  fallback: ["Arial", "sans-serif"],
});

/* ==================================================
   SEO CONSTANTS
================================================== */

const SITE_URL = siteConfig.siteUrl.replace(/\/+$/, "");

const HOME_URL = `${SITE_URL}/`;

const SEO_TITLE =
  `${siteConfig.eventName} ${siteConfig.eventYear} | ` +
  "Battery & Energy Storage Exhibition India";

const SEO_DESCRIPTION =
  `Explore ${siteConfig.eventName} ${siteConfig.eventYear}, ` +
  `taking place ${siteConfig.dates.display} at ` +
  `${siteConfig.venue.name}, ${siteConfig.venue.city}, India. ` +
  "Discover battery manufacturing, lithium-ion technology, " +
  "energy storage systems, EV batteries, battery management " +
  "systems and recycling innovations. Connect with leading " +
  "manufacturers, suppliers and industry professionals.";

const DEFAULT_OG_IMAGE = new URL(
  siteConfig.seo.socialImage,
  HOME_URL
).toString();

/* ==================================================
   ROOT METADATA

   Global default metadata.
   Individual pages should define their own:
   - Title
   - Description
   - Canonical URL
   - Open Graph URL
   - Page-specific social metadata
================================================== */

export const metadata: Metadata = {
  metadataBase: new URL(HOME_URL),

  verification: {
    google:
      "8yJ4SGop6bGVPTCqTHPyjH6D4u__duHIEeLew9lNHBU",
  },

  applicationName: siteConfig.eventName,

  title: {
    default: SEO_TITLE,
    template: `%s | ${siteConfig.shortName}`,
  },

  description: SEO_DESCRIPTION,

  keywords: [
    "India Battery Show 2027",
    "battery exhibition India",
    "battery expo Pune 2027",
    "energy storage exhibition India",
    "battery manufacturing expo",
    "EV battery exhibition",
    "lithium ion battery exhibition",
    "battery recycling expo",
    "battery management systems",
    "battery industry exhibition",
  ],

  authors: [
    {
      name: siteConfig.organizer.name,
    },
  ],

  creator: siteConfig.organizer.name,

  publisher: siteConfig.organizer.name,

  category: "Business and Industrial Exhibition",

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

  openGraph: {
    type: "website",

    locale: "en_IN",

    siteName: siteConfig.eventName,

    title: SEO_TITLE,

    description: SEO_DESCRIPTION,

    images: [
      {
        url: DEFAULT_OG_IMAGE,
        alt: `${siteConfig.eventName} official event preview`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: SEO_TITLE,

    description: SEO_DESCRIPTION,

    images: [
      {
        url: DEFAULT_OG_IMAGE,
        alt: `${siteConfig.eventName} official event preview`,
      },
    ],
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

/* ==================================================
   VIEWPORT
================================================== */

export const viewport: Viewport = {
  width: "device-width",

  initialScale: 1,

  viewportFit: "cover",

  themeColor: "#191c21",

  colorScheme: "light",
};

/* ==================================================
   ROOT LAYOUT
================================================== */

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html
      lang="en-IN"
      className={`${manrope.variable} ${inter.variable}`}
    >
      <body
        className={[
          "min-h-screen",
          "min-w-0",
          "overflow-x-clip",
          "bg-background",
          "font-body",
          "text-foreground",
          "antialiased",
        ].join(" ")}
      >
        {/* GLOBAL STRUCTURED DATA */}

        <OrganizationJsonLd />
        <WebsiteJsonLd />

        {/* ANALYTICS */}

        <AnalyticsScripts />

        {/* ACCESSIBILITY */}

        <a
          href="#main-content"
          className={[
            "sr-only",
            "fixed left-4 top-4 z-[100]",
            "rounded-button",
            "bg-brand-red px-5 py-3",
            "font-body text-sm font-semibold",
            "text-white",
            "focus:not-sr-only",
            "focus:outline-none",
            "focus:ring-2",
            "focus:ring-white",
            "focus:ring-offset-2",
            "focus:ring-offset-surface-dark",
          ].join(" ")}
        >
          Skip to main content
        </a>

        <ToastProvider>
          <div className="flex min-h-screen min-w-0 flex-col">
            {/* HEADER */}

            <Header />

            {/* PAGE CONTENT */}

            <main
              id="main-content"
              tabIndex={-1}
              className={[
                "min-w-0",
                "flex-1",
                "bg-background",
                "outline-none",
                "pb-16",
                "lg:pb-0",
              ].join(" ")}
            >
              {children}
            </main>

            {/* FOOTER */}

            <Footer />
          </div>

          {/* MOBILE CONVERSION BAR */}

          <StickyMobileBar />

          {/* COOKIE CONSENT */}

          <ConsentBanner />
        </ToastProvider>
      </body>
    </html>
  );
}
