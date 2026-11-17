
import type { Metadata } from "next";
import Link from "next/link";

import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { VisitorRegistrationForm } from "@/components/forms/visitor-registration-form";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

const SITE_URL = siteConfig.siteUrl.replace(/\/+$/, "");
const PAGE_PATH = "/visit/register";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const HERO_IMAGE = "/images/DSC00808.webp.webp";

const PAGE_TITLE = `Visitor Registration | ${siteConfig.eventName} 2027`;

const PAGE_DESCRIPTION =
  `Submit your visitor registration for ${siteConfig.eventName}, ` +
  `${siteConfig.dates.display} at ${siteConfig.venue.name}, Pune. ` +
  `Find exhibition dates, visitor hours and registration information.`;

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: PAGE_URL,
    siteName: siteConfig.eventName,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}${HERO_IMAGE}`,
        alt: "Industry visitors at an exhibition",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${SITE_URL}${HERO_IMAGE}`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function VisitorRegisterPage() {
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    inLanguage: "en-IN",
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#event`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageJsonLd).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <BreadcrumbJsonLd
        items={[
          {
            label: "Visit",
            href: "/visit",
          },
          {
            label: "Visitor Registration",
            href: PAGE_PATH,
          },
        ]}
      />

      <PageHero
        eyebrow="Visit the Show"
        title="Visitor Registration"
        description={`Register your interest in attending ${siteConfig.eventName}, ${siteConfig.dates.display} in Pune.`}
        breadcrumbs={[
          {
            label: "Visit",
            href: "/visit",
          },
          {
            label: "Visitor Registration",
          },
        ]}
        backgroundImage={{
          src: HERO_IMAGE,
          alt: "Industry professionals exploring an exhibition",
        }}
      />

      <section
        id="visitor-registration"
        aria-labelledby="registration-heading"
        className="bg-background py-16 text-foreground sm:py-20 lg:py-24 xl:py-28"
      >
        <Container>
          <div className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-12">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-7 bg-brand-red"
                />
                <p className="font-heading text-xs font-bold uppercase tracking-[0.15em] text-brand-red">
                  Visitor Registration
                </p>
              </div>

              <h2
                id="registration-heading"
                className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-[-0.04em]"
              >
                Plan your visit
                <span className="block">
                  to the show
                  <span className="text-brand-red">.</span>
                </span>
              </h2>
            </div>

         
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.77fr)_minmax(0,1.23fr)] lg:gap-10 xl:gap-14">
            {/* LEFT: EVENT INFORMATION */}

            <aside className="min-w-0 lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-card border border-[#E4E2DE] bg-surface">
                <div className="border-b border-[#E4E2DE] px-6 py-6 sm:px-7">
                  <p className="font-heading text-xs font-bold uppercase tracking-[0.14em] text-brand-red">
                    Exhibition Information
                  </p>

                  <h3 className="mt-3 font-heading text-xl font-bold leading-[1.35] tracking-[-0.025em]">
                    {siteConfig.eventName}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted">
                    Battery Manufacturing, Energy Storage
                    &amp; Electric Mobility
                  </p>
                </div>

                <div className="divide-y divide-[#E4E2DE] px-6 sm:px-7">
                  <div className="flex gap-4 py-6">
                    <CalendarDays
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                      strokeWidth={1.8}
                    />

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                        Event Dates
                      </p>
                      <p className="mt-2 font-heading text-sm font-bold">
                        {siteConfig.dates.display}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 py-6">
                    <Clock3
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                      strokeWidth={1.8}
                    />

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                        Visitor Hours
                      </p>
                      <p className="mt-2 font-heading text-sm font-bold">
                        {siteConfig.visitorHours.display}{" "}
                        {siteConfig.visitorHours.timeZoneLabel}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 py-6">
                    <MapPin
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                      strokeWidth={1.8}
                    />

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                        Exhibition Venue
                      </p>
                      <p className="mt-2 font-heading text-sm font-bold leading-6">
                        {siteConfig.venue.name}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-muted">
                        {siteConfig.venue.line2},{" "}
                        {siteConfig.venue.city},{" "}
                        {siteConfig.venue.state}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              
            </aside>

            {/* RIGHT: REGISTRATION FORM */}

            <div className="min-w-0 overflow-hidden rounded-card border border-[#E4E2DE] bg-surface">
              <div className="border-b border-[#E4E2DE] px-6 py-7 sm:px-8 sm:py-8 lg:px-9">
                <div className="mb-4 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-0.5 w-7 bg-brand-red"
                  />

                  <p className="font-heading text-xs font-bold uppercase tracking-[0.13em] text-brand-red">
                    Registration Details
                  </p>
                </div>

                <h3 className="font-heading text-[clamp(1.5rem,2.5vw,2rem)] font-bold tracking-[-0.035em]">
                  Visitor Registration Form
                </h3>

                <p className="mt-3 max-w-[480px] text-sm leading-[1.8] text-muted">
                  Enter your contact and professional
                  information. Required fields are
                  marked in the form.
                </p>
              </div>

              <div className="px-6 py-7 sm:px-8 sm:py-9 lg:px-9">
                <VisitorRegistrationForm />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="visitor-next-step-heading"
        className="border-t border-[#E4E2DE] bg-surface py-14 text-foreground sm:py-16"
      >
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-[680px]">
              <div className="flex items-center gap-2 text-brand-red">
                <UsersRound
                  aria-hidden="true"
                  className="h-5 w-5"
                />
                <p className="font-heading text-xs font-bold uppercase tracking-[0.12em]">
                  Visitor Information
                </p>
              </div>

              <h2
                id="visitor-next-step-heading"
                className="mt-4 font-heading text-xl font-bold tracking-[-0.025em] sm:text-2xl"
              >
                Want to know more before registering?
              </h2>

              <p className="mt-3 text-sm leading-7 text-muted">
                Explore the visitor profile, registration
                guidance and frequently asked questions
                on our Visit page.
              </p>
            </div>

            <Link
              href="/visit#visitor-faqs"
              className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-button border border-[#D9D7D3] bg-white px-6 font-heading text-sm font-bold text-foreground transition-colors hover:border-brand-red hover:text-brand-red"
            >
              Visitor FAQs
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
              />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
