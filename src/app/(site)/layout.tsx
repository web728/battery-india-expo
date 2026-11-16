
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
  EventJsonLd,
} from "@/components/seo/json-ld";

import { AnalyticsScripts } from "@/components/seo/analytics-scripts";

import { siteConfig } from "@/lib/site-config";

/* ---------------------------------------------
   FONTS
   Self-hosted through Next.js font optimization.
--------------------------------------------- */

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

/* ---------------------------------------------
   SEO CONSTANTS
--------------------------------------------- */

const siteUrl = siteConfig.siteUrl.replace(/\/+$/, "");

const seoTitle =
  `${siteConfig.eventName} 2027 | Battery & Energy Storage Expo`;

const seoDescription =
  `Explore ${siteConfig.eventName}, 14–16 October 2027 ` +
  `in Pune, India. Connect with battery manufacturers, ` +
  `energy storage companies, component suppliers, ` +
  `technology innovators and industry professionals.`;

const defaultOgImage = "/logo/battery.png";

/* ---------------------------------------------
   ROOT SEO METADATA

   Page-specific titles, descriptions,
   canonical URLs and OG metadata should
   be defined in individual page files.
--------------------------------------------- */

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  applicationName: siteConfig.eventName,

  title: {
    default: seoTitle,
    template: `%s | ${siteConfig.shortName}`,
  },

  description: seoDescription,

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
    "battery industry conference",
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

    url: siteUrl,

    siteName: siteConfig.eventName,

    title: seoTitle,

    description: seoDescription,

    images: [
      {
        url: defaultOgImage,
        width: 2048,
        height: 830,
        alt: `${siteConfig.eventName} official logo`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: seoTitle,

    description: seoDescription,

    images: [defaultOgImage],
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

/* ---------------------------------------------
   VIEWPORT
--------------------------------------------- */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",

  themeColor: "#191c21",

  colorScheme: "light",
};

/* ---------------------------------------------
   ROOT LAYOUT

   Keep as a Server Component.
   Do not add "use client".

   Motion animations belong to individual
   client components, not the root layout.
--------------------------------------------- */

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html
      lang="en"
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
        {/* Global structured data */}
        <OrganizationJsonLd />
        <EventJsonLd />

        {/* Analytics implementation must
            respect consent preferences */}
        <AnalyticsScripts />

        {/* Keyboard accessibility */}
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
            <Header />

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

            <Footer />
          </div>

          {/* Mobile conversion action bar */}
          <StickyMobileBar />

          {/* Privacy / cookie consent */}
          <ConsentBanner />
        </ToastProvider>
      </body>
    </html>
  );
}
