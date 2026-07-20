import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StickyMobileBar } from "@/components/layout/sticky-mobile-bar";
import { ConsentBanner } from "@/components/layout/consent-banner";
import { ToastProvider } from "@/components/ui/toast";
import { OrganizationJsonLd, EventJsonLd } from "@/components/seo/json-ld";
import { AnalyticsScripts } from "@/components/seo/analytics-scripts";
import { siteConfig } from "@/lib/site-config";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.eventName} | ${siteConfig.shortName}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.tagline,
  keywords: [
    "battery expo India",
    "battery exhibition Pune",
    "battery technology exhibition 2026",
    "energy storage expo India",
    "EV battery exhibition",
    "lithium-ion battery expo",
    "battery recycling exhibition",
    "battery manufacturing exhibition",
    "BMS exhibition India",
    "energy storage conference India",
    "battery show Pune",
    "battery suppliers India",
  ],
  authors: [{ name: siteConfig.organizer.name }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.siteUrl,
    siteName: siteConfig.eventName,
    title: siteConfig.eventName,
    description: siteConfig.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.eventName,
    description: siteConfig.tagline,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-navy-dark">
        <AnalyticsScripts />
        <OrganizationJsonLd />
        <EventJsonLd />
        <ToastProvider>
          {/* <SkipLink /> */}
          <Header />
          <main id="main-content" className="flex-1 pb-16 lg:pb-0">
            {children}
          </main>
          <Footer />
          <StickyMobileBar />
          <ConsentBanner />
        </ToastProvider>
      </body>
    </html>
  );
}
