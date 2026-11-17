
import type { Metadata } from "next";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { ExhibitorEnquiryForm } from "@/components/forms/exhibitor-enquiry-form";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

/* ==================================================
   INDIA BATTERY INTERNATIONAL SHOW
   Book a Stand — /exhibit/book-a-stand
   Hybrid Industrial Editorial
================================================== */

const PAGE_PATH = "/exhibit/book-a-stand";
const SITE_URL = siteConfig.siteUrl.replace(/\/+$/, "");
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const HERO_IMAGE = "/images/DSC00727.JPG.webp";

const PAGE_TITLE = `Book a Stand | ${siteConfig.eventName} 2027`;

const PAGE_DESCRIPTION =
  `Submit a stand enquiry for ${siteConfig.eventName}, ` +
  `${siteConfig.dates.display} in Pune. Discuss exhibition ` +
  `space, stand requirements and participation options with the organizer.`;

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
        alt: "Exhibition branding and professional networking",
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

export default function BookAStandPage() {
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
            label: "Exhibit",
            href: "/exhibit",
          },
          {
            label: "Book a Stand",
            href: PAGE_PATH,
          },
        ]}
      />

      <PageHero
        eyebrow="Exhibit at the Show"
        title="Book a Stand"
        description={`Discuss your exhibition space requirements for ${siteConfig.eventName}, ${siteConfig.dates.display} in Pune.`}
        breadcrumbs={[
          {
            label: "Exhibit",
            href: "/exhibit",
          },
          {
            label: "Book a Stand",
          },
        ]}
        backgroundImage={{
          src: HERO_IMAGE,
          alt: "Exhibition and industry networking at a previous edition",
        }}
      />

      {/* MAIN ENQUIRY SECTION */}

      <section
        id="stand-enquiry"
        aria-labelledby="stand-enquiry-heading"
        className="bg-background py-16 text-foreground sm:py-20 lg:py-24 xl:py-28"
      >
        <Container>
          {/* EDITORIAL INTRO */}

          <div className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-12">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-7 bg-brand-red"
                />

                <p className="font-heading text-xs font-bold uppercase tracking-[0.15em] text-brand-red">
                  Exhibitor Enquiry
                </p>
              </div>

              <h2
                id="stand-enquiry-heading"
                className="max-w-[740px] font-heading text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-[-0.04em]"
              >
                Discuss your stand
                <span className="block">
                  requirements
                  <span className="text-brand-red">.</span>
                </span>
              </h2>
            </div>

         
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-10 xl:gap-14">
            {/* LEFT: EXHIBITION DETAILS */}

            <aside className="min-w-0 lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-card border border-[#E4E2DE] bg-surface">
                <div className="border-b border-[#E4E2DE] px-6 py-7 sm:px-7">
                  <p className="font-heading text-xs font-bold uppercase tracking-[0.13em] text-brand-red">
                    Exhibition Information
                  </p>

                  <h3 className="mt-3 font-heading text-xl font-bold leading-[1.4] tracking-[-0.03em]">
                    {siteConfig.eventName}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted">
                    Battery Manufacturing · Energy Storage ·
                    Electric Mobility
                  </p>
                </div>

                <div className="divide-y divide-[#E4E2DE] px-6 sm:px-7">
                  <div className="flex items-start gap-4 py-6">
                    <CalendarDays
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                      strokeWidth={1.8}
                    />

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                        Exhibition Dates
                      </p>

                      <p className="mt-2 font-heading text-sm font-bold">
                        {siteConfig.dates.display}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 py-6">
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

                  <div className="flex items-start gap-4 py-6">
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

          

              {/* DIRECT CONTACTS */}

              <div className="mt-9 border-t border-[#E4E2DE] pt-7">
                <h3 className="font-heading text-lg font-bold tracking-[-0.025em]">
                  Exhibitor Enquiries
                </h3>

                <p className="mt-2 text-sm leading-7 text-muted">
                  Prefer to discuss your requirements
                  directly? Contact our team.
                </p>

                <div className="mt-5 space-y-6">
                  {siteConfig.contacts.map((contact) => (
                    <div
                      key={contact.email}
                      className="border-b border-[#E4E2DE] pb-5 last:border-b-0"
                    >
                      <p className="font-heading text-sm font-bold">
                        {contact.name}
                      </p>

                      <a
                        href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                        className="mt-3 flex w-fit items-center gap-3 text-sm text-muted transition-colors hover:text-brand-red"
                      >
                        <Phone
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 text-brand-red"
                          strokeWidth={1.8}
                        />
                        {contact.phone}
                      </a>

                      <a
                        href={`mailto:${contact.email}`}
                        className="mt-3 flex w-fit items-center gap-3 break-all text-sm text-muted transition-colors hover:text-brand-red"
                      >
                        <Mail
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 text-brand-red"
                          strokeWidth={1.8}
                        />
                        {contact.email}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* RIGHT: STAND ENQUIRY FORM */}

            <div
              id="exhibitor-enquiry-form"
              className="min-w-0 scroll-mt-28 overflow-hidden rounded-card border border-[#E4E2DE] bg-surface"
            >
              <div className="border-b border-[#E4E2DE] px-6 py-7 sm:px-8 sm:py-8 lg:px-9">
                <div className="mb-4 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-0.5 w-7 bg-brand-red"
                  />

                  <p className="font-heading text-xs font-bold uppercase tracking-[0.13em] text-brand-red">
                    Stand Booking Request
                  </p>
                </div>

                <h3 className="font-heading text-[clamp(1.5rem,2.5vw,2rem)] font-bold leading-[1.3] tracking-[-0.035em]">
                  Exhibitor Enquiry Form
                </h3>

                <p className="mt-3 max-w-[500px] text-sm leading-[1.8] text-muted">
                  Provide your company and stand
                  requirements below. The organizing
                  team will review your enquiry.
                </p>
              </div>

              <div className="px-6 py-7 sm:px-8 sm:py-9 lg:px-9">
                <ExhibitorEnquiryForm />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* NEXT STEPS */}

      <section
        aria-labelledby="exhibitor-next-steps-heading"
        className="border-t border-[#E4E2DE] bg-surface py-14 text-foreground sm:py-16"
      >
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-[700px]">
              <p className="font-heading text-xs font-bold uppercase tracking-[0.13em] text-brand-red">
                Exhibitor Information
              </p>

              <h2
                id="exhibitor-next-steps-heading"
                className="mt-4 font-heading text-xl font-bold tracking-[-0.025em] sm:text-2xl"
              >
                Explore participation details
              </h2>

              <p className="mt-3 text-sm leading-7 text-muted">
                Find answers about stand formats,
                booking and exhibitor arrangements
                on our Exhibit page.
              </p>
            </div>

            <Link
              href="/exhibit#exhibitor-faqs"
              className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-button border border-[#D9D7D3] bg-white px-6 font-heading text-sm font-bold text-foreground transition-colors hover:border-brand-red hover:text-brand-red"
            >
              Exhibitor FAQs

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
