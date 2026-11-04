import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StickyMobileBar } from "@/components/layout/sticky-mobile-bar";
import { ConsentBanner } from "@/components/layout/consent-banner";
import { ToastProvider } from "@/components/ui/toast";
import { OrganizationJsonLd, EventJsonLd } from "@/components/seo/json-ld";
import { AnalyticsScripts } from "@/components/seo/analytics-scripts";
import { siteConfig } from "@/lib/site-config";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.eventName} | ${siteConfig.shortName}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: `${siteConfig.tagline} | 14–16 October 2027`,
  keywords: [
    "battery expo India 2027", "battery exhibition Pune 2027",
    "battery technology exhibition 2027", "energy storage expo India",
    "EV battery exhibition", "lithium-ion battery expo",
    "battery recycling exhibition", "battery manufacturing exhibition",
    "BMS exhibition India", "energy storage conference India",
    "battery show Pune", "battery suppliers India",
  ],
  authors: [{ name: siteConfig.organizer.name }],
  openGraph: {
    type: "website", locale: "en_IN", url: siteConfig.siteUrl,
    siteName: siteConfig.eventName,
    title: `${siteConfig.eventName} — 14–16 October 2027`,
    description: siteConfig.tagline,
    images: [{ url: "/logo/battery.png", width: 2048, height: 830 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.eventName} — 14–16 October 2027`,
    description: siteConfig.tagline,
    images: ["/logo/battery.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width", initialScale: 1, themeColor: "#09090b",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background font-body text-foreground antialiased">
        <AnalyticsScripts />
        <OrganizationJsonLd />
        <EventJsonLd />
        <ToastProvider>
          <div className="flex min-h-screen min-w-0 flex-col">
            <Header />
            <main id="main-content" className="min-w-0 flex-1 pb-16 lg:pb-0">{children}</main>
            <Footer />
          </div>
          <StickyMobileBar />
          <ConsentBanner />
        </ToastProvider>
      </body>
    </html>
  );
}
