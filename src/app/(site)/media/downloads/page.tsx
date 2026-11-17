
import type { Metadata } from "next";
import Link from "next/link";

import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  FileText,
  LockKeyhole,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { BrochureDownloadForm } from "@/components/forms/brochure-download-form";

import { siteConfig } from "@/lib/site-config";

/* ==================================================
   DOWNLOAD CENTRE
   /media/downloads

   Premium gated brochure lead form
================================================== */

const PAGE_PATH = "/media/downloads";

const SITE_URL = siteConfig.siteUrl.replace(
  /\/+$/,
  ""
);

const PAGE_TITLE =
  `Download Brochure | ${siteConfig.eventName} 2027`;

const PAGE_DESCRIPTION =
  `Request the official brochure for ` +
  `${siteConfig.eventName}, taking place ` +
  `${siteConfig.dates.display} in Pune. ` +
  `Complete the form to download the brochure.`;

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: `${SITE_URL}${PAGE_PATH}`,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}${PAGE_PATH}`,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    siteName: siteConfig.eventName,
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function DownloadCentrePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {
            label: "Media",
            href: "/media",
          },
          {
            label: "Download Centre",
            href: PAGE_PATH,
          },
        ]}
      />

      <PageHero
        eyebrow="Media Resources"
        title="Download Centre"
        description={`Request the official event brochure for ${siteConfig.eventName} 2027.`}
        breadcrumbs={[
          {
            label: "Media",
            href: "/media",
          },
          {
            label: "Download Centre",
          },
        ]}
        backgroundImage={{
          src: "/images/expo-floor-components-booth.jpg",
          alt: "Battery industry exhibition",
        }}
      />

      <section className="bg-background py-16 text-foreground sm:py-20 lg:py-24">
        <Container>
          <div className="mb-11 grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-7 bg-brand-red"
                />

                <p className="font-heading text-xs font-bold uppercase tracking-[0.15em] text-brand-red">
                  Official Event Resources
                </p>
              </div>

              <h2 className="max-w-[660px] font-heading text-[clamp(2rem,3.4vw,3rem)] font-bold leading-[1.15] tracking-[-0.04em]">
                Get the exhibition
                <span className="block">
                  brochure
                  <span className="text-brand-red">.</span>
                </span>
              </h2>
            </div>

            <p className="max-w-[470px] text-[15px] leading-[1.8] text-muted">
              Interested in participating
              in the exhibition? Submit your
              professional details to access
              the event brochure.
            </p>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
            {/* LEFT: BROCHURE DETAILS */}

            <aside className="min-w-0 lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-card border border-[#E4E2DE] bg-surface">
                <div className="border-b border-[#E4E2DE] p-6 sm:p-7">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#FFF2F3] text-brand-red">
                      <FileText
                        className="h-7 w-7"
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-red">
                        PDF Download
                      </p>

                      <h3 className="mt-2 font-heading text-lg font-bold">
                        Event Brochure 2027
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 p-6 sm:p-7">
                  <div className="flex items-start gap-3">
                    <CalendarDays
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                      aria-hidden="true"
                    />

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                        Event Dates
                      </p>

                      <p className="mt-2 text-sm font-semibold">
                        {siteConfig.dates.display}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                      aria-hidden="true"
                    />

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                        Venue
                      </p>

                      <p className="mt-2 text-sm font-semibold leading-6">
                        {siteConfig.venue.name}
                      </p>

                      <p className="mt-1 text-sm leading-7 text-muted">
                        {siteConfig.venue.city},{" "}
                        {siteConfig.venue.state}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-[#E4E2DE] pt-6">
                    <h4 className="font-heading text-sm font-bold">
                      How to access
                    </h4>

                    <div className="mt-4 space-y-4">
                      {[
                        "Complete the request form.",
                        "Verify your details and submit.",
                        "Receive the PDF download.",
                      ].map((step) => (
                        <div
                          key={step}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0 text-brand-red"
                            aria-hidden="true"
                          />

                          <p className="text-sm leading-6 text-muted">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

          
              <Link
                href="/contact"
                className="group mt-6 inline-flex min-h-10 items-center gap-2 font-heading text-sm font-bold text-brand-red hover:underline"
              >
                Need assistance?

                <ArrowUpRight
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              </Link>
            </aside>

            {/* RIGHT: DOWNLOAD FORM */}

            <div
              id="brochure-form"
              className="min-w-0 scroll-mt-28 overflow-hidden rounded-card border border-[#E4E2DE] bg-surface"
            >
              <div className="border-b border-[#E4E2DE] px-6 py-7 sm:px-8 sm:py-8 lg:px-9">
                <div className="mb-4 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-0.5 w-7 bg-brand-red"
                  />

                  <p className="font-heading text-xs font-bold uppercase tracking-[0.13em] text-brand-red">
                    Brochure Request Form
                  </p>
                </div>

                <h3 className="font-heading text-2xl font-bold tracking-[-0.035em]">
                  Download the Brochure
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted">
                  Fill in the required details
                  below. Your PDF will be prepared
                  after successful submission.
                </p>
              </div>

              <div className="px-6 py-7 sm:px-8 sm:py-9 lg:px-9">
                <BrochureDownloadForm />
              </div>

              <div className="flex items-start gap-3 border-t border-[#E4E2DE] bg-background px-6 py-5 sm:px-8 lg:px-9">
                <LockKeyhole
                  className="mt-0.5 h-4 w-4 shrink-0 text-muted"
                  aria-hidden="true"
                />

                <p className="text-xs leading-6 text-muted">
                  Brochure access is processed
                  through a verified form submission.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
