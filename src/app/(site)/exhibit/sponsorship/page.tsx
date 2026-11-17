
import type { Metadata } from "next";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Target,
  UsersRound,
  BriefcaseBusiness,
} from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { SponsorEnquiryForm } from "@/components/forms/sponsor-enquiry-form";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

/* ==================================================
   INDIA BATTERY INTERNATIONAL SHOW
   Sponsorship Opportunities
   Route: /exhibit/sponsorship

   Hybrid Industrial Editorial
   Server Component
================================================== */

const PAGE_PATH = "/exhibit/sponsorship";
const SITE_URL = siteConfig.siteUrl.replace(/\/+$/, "");
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const HERO_IMAGE = "/images/expo-vip-lounge-branding.jpg";

const PAGE_TITLE =
  `Sponsorship Opportunities | ${siteConfig.eventName} 2027`;

const PAGE_DESCRIPTION =
  `Explore sponsorship and partnership opportunities ` +
  `at ${siteConfig.eventName}, ${siteConfig.dates.display} ` +
  `in Pune. Discuss your brand objectives and requirements ` +
  `with the exhibition organizing team.`;

/* --------------------------------------------------
   SEO
-------------------------------------------------- */

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
        alt: "Exhibition branding at a professional industry event",
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

/* --------------------------------------------------
   PARTNERSHIP OBJECTIVES

   These are potential objectives,
   not confirmed sponsorship benefits.
-------------------------------------------------- */

const partnershipObjectives = [
  {
    title: "Brand Visibility",
    description:
      "Discuss opportunities to position your brand within the exhibition environment.",
    icon: Target,
  },
  {
    title: "Industry Engagement",
    description:
      "Explore ways to connect your brand with professionals interested in battery and energy technologies.",
    icon: UsersRound,
  },
  {
    title: "Business Networking",
    description:
      "Discuss participation formats relevant to business conversations and industry relationships.",
    icon: BriefcaseBusiness,
  },
] as const;

/* --------------------------------------------------
   BUTTON STYLES
-------------------------------------------------- */

const primaryButtonClass = [
  "group inline-flex min-h-12",
  "items-center justify-center gap-2.5",
  "rounded-button bg-brand-red",
  "px-6 py-3",
  "font-heading text-sm font-bold text-white",
  "transition-colors duration-200",
  "hover:bg-brand-red-hover",
  "focus-visible:outline-2",
  "focus-visible:outline-offset-2",
  "focus-visible:outline-brand-red",
].join(" ");

const secondaryButtonClass = [
  "group inline-flex min-h-12",
  "items-center justify-center gap-2.5",
  "rounded-button border border-[#D9D7D3]",
  "bg-white px-6 py-3",
  "font-heading text-sm font-bold text-foreground",
  "transition-colors duration-200",
  "hover:border-brand-red hover:text-brand-red",
  "focus-visible:outline-2",
  "focus-visible:outline-offset-2",
  "focus-visible:outline-brand-red",
].join(" ");

/* ==================================================
   PAGE COMPONENT
================================================== */

export default function SponsorshipPage() {
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
      {/* STRUCTURED DATA */}

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
            label: "Sponsorship Opportunities",
            href: PAGE_PATH,
          },
        ]}
      />

      {/* PAGE HERO */}

      <PageHero
        eyebrow="Partner With Us"
        title="Sponsorship Opportunities"
        description={`Explore sponsorship and partnership opportunities at ${siteConfig.eventName}, ${siteConfig.dates.display} in Pune.`}
        breadcrumbs={[
          {
            label: "Exhibit",
            href: "/exhibit",
          },
          {
            label: "Sponsorship Opportunities",
          },
        ]}
        backgroundImage={{
          src: HERO_IMAGE,
          alt: "Professional exhibition branding and networking area",
        }}
      />

      {/* ========================================
          SECTION 1: SPONSORSHIP INTRO
      ======================================== */}

      <section
        aria-labelledby="sponsorship-intro-heading"
        className="bg-background py-16 text-foreground sm:py-20 lg:py-24 xl:py-28"
      >
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-7 bg-brand-red"
                />

                <p className="font-heading text-xs font-bold uppercase tracking-[0.15em] text-brand-red">
                  Sponsorship &amp; Partnerships
                </p>
              </div>

              <h2
                id="sponsorship-intro-heading"
                className="max-w-[750px] font-heading text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-[-0.04em]"
              >
                Connect your brand with
                <span className="block">
                  the industry conversation
                  <span className="text-brand-red">.</span>
                </span>
              </h2>
            </div>

            <div className="max-w-[480px] space-y-4">
              <p className="font-body text-[15px] leading-[1.8] text-muted sm:text-base">
                {siteConfig.eventName} brings
                together an exhibition environment
                focused on battery manufacturing,
                technology, energy storage and
                electric mobility.
              </p>

              <p className="font-body text-[15px] leading-[1.8] text-muted sm:text-base">
                Sponsorship discussions can be
                tailored to your organisation&apos;s
                objectives, preferred involvement
                and available partnership options.
              </p>
            </div>
          </div>

          {/* PARTNERSHIP OBJECTIVES */}

          <div className="mt-12 border-t border-[#E4E2DE] pt-9 sm:mt-16">
            <div className="mb-8">
              <h3 className="font-heading text-xl font-bold tracking-[-0.025em] sm:text-2xl">
                Explore partnership objectives
              </h3>

              <p className="mt-3 max-w-[690px] text-sm leading-[1.8] text-muted">
                Share what matters to your business.
                Our team can discuss relevant opportunities.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3 lg:gap-5">
              {partnershipObjectives.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="rounded-card border border-[#E4E2DE] bg-surface p-6 transition-colors duration-200 hover:border-brand-red/35 sm:p-7"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-md bg-background text-brand-red">
                      <Icon
                        aria-hidden="true"
                        className="h-5 w-5"
                        strokeWidth={1.8}
                      />
                    </div>

                    <h4 className="mt-6 font-heading text-lg font-bold tracking-[-0.025em]">
                      {item.title}
                    </h4>

                    <p className="mt-3 text-sm leading-[1.8] text-muted">
                      {item.description}
                    </p>
                  </article>
                );
              })}
            </div>

         
          </div>
        </Container>
      </section>

      {/* ========================================
          SECTION 2: SPONSORSHIP ENQUIRY
      ======================================== */}

      <section
        id="enquiry"
        aria-labelledby="sponsorship-enquiry-heading"
        className="scroll-mt-24 border-t border-[#E4E2DE] bg-surface py-16 text-foreground sm:py-20 lg:py-24"
      >
        <Container>
          <div className="mb-10 grid gap-6 lg:mb-12 lg:grid-cols-2 lg:items-end lg:gap-12">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-7 bg-brand-red"
                />

                <p className="font-heading text-xs font-bold uppercase tracking-[0.15em] text-brand-red">
                  Partnership Enquiry
                </p>
              </div>

              <h2
                id="sponsorship-enquiry-heading"
                className="font-heading text-[clamp(1.9rem,3vw,2.6rem)] font-bold leading-[1.2] tracking-[-0.035em]"
              >
                Let&apos;s discuss your
                <span className="block">
                  sponsorship goals
                  <span className="text-brand-red">.</span>
                </span>
              </h2>
            </div>

            <p className="max-w-[470px] text-[15px] leading-[1.8] text-muted">
              Tell us about your organisation,
              the sponsorship opportunity you
              are interested in and any specific
              requirements you would like to discuss.
            </p>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-10 xl:gap-14">

            {/* LEFT: PARTNERSHIP DETAILS */}

            <aside className="min-w-0">
              <div className="overflow-hidden rounded-card border border-[#E4E2DE] bg-background">
                <div className="border-b border-[#E4E2DE] px-6 py-7 sm:px-7">
                  <p className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-brand-red">
                    Exhibition Information
                  </p>

                  <h3 className="mt-3 font-heading text-xl font-bold leading-[1.4] tracking-[-0.025em]">
                    {siteConfig.eventName}
                  </h3>
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

              {/* WHAT HAPPENS NEXT */}

              <div className="mt-9 border-t border-[#E4E2DE] pt-7">
                <h3 className="font-heading text-lg font-bold tracking-[-0.025em]">
                  What happens after your enquiry?
                </h3>

                <div className="mt-5 space-y-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                      strokeWidth={1.8}
                    />

                    <p className="text-sm leading-7 text-muted">
                      Your sponsorship requirements
                      are submitted for review.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                      strokeWidth={1.8}
                    />

                    <p className="text-sm leading-7 text-muted">
                      The team can discuss
                      suitable opportunities,
                      subject to availability.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                      strokeWidth={1.8}
                    />

                    <p className="text-sm leading-7 text-muted">
                      Any commercial terms and
                      confirmed deliverables
                      are communicated separately.
                    </p>
                  </div>
                </div>
              </div>

              {/* DIRECT CONTACT */}

              {siteConfig.contacts.length > 0 && (
                <div className="mt-9 border-t border-[#E4E2DE] pt-7">
                  <h3 className="font-heading text-lg font-bold tracking-[-0.025em]">
                    Partnership Enquiries
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted">
                    Prefer to contact the
                    organizing team directly?
                  </p>

                  <div className="mt-5 space-y-6">
                    {siteConfig.contacts.map((contact) => (
                      <div
                        key={contact.email}
                        className="space-y-3"
                      >
                        <p className="font-heading text-sm font-bold">
                          {contact.name}
                        </p>

                        <a
                          href={`mailto:${contact.email}`}
                          className="flex w-fit items-start gap-3 break-all text-sm leading-6 text-muted transition-colors hover:text-brand-red"
                        >
                          <Mail
                            aria-hidden="true"
                            className="mt-1 h-4 w-4 shrink-0 text-brand-red"
                            strokeWidth={1.8}
                          />

                          {contact.email}
                        </a>

                        <a
                          href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                          className="flex w-fit items-center gap-3 text-sm text-muted transition-colors hover:text-brand-red"
                        >
                          <Phone
                            aria-hidden="true"
                            className="h-4 w-4 shrink-0 text-brand-red"
                            strokeWidth={1.8}
                          />

                          {contact.phone}
                        </a>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/contact"
                    className="group mt-6 inline-flex min-h-10 items-center gap-2 font-heading text-sm font-bold text-brand-red hover:text-brand-red-hover"
                  >
                    Contact the Team

                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                      strokeWidth={1.8}
                    />
                  </Link>
                </div>
              )}
            </aside>

            {/* RIGHT: SPONSORSHIP FORM */}

            <div className="min-w-0 overflow-hidden rounded-card border border-[#E4E2DE] bg-white">
              <div className="border-b border-[#E4E2DE] px-6 py-7 sm:px-8 sm:py-8 lg:px-9">
                <div className="mb-4 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-0.5 w-7 bg-brand-red"
                  />

                  <p className="font-heading text-xs font-bold uppercase tracking-[0.13em] text-brand-red">
                    Sponsorship Request
                  </p>
                </div>

                <h3 className="font-heading text-[clamp(1.5rem,2.5vw,2rem)] font-bold leading-[1.3] tracking-[-0.035em]">
                  Tell Us About Your Requirements
                </h3>

                <p className="mt-3 max-w-[500px] text-sm leading-[1.8] text-muted">
                  Complete the form below.
                  Include your preferred
                  sponsorship format and any
                  specific partnership goals.
                </p>
              </div>

              <div className="px-6 py-7 sm:px-8 sm:py-9 lg:px-9">
                <SponsorEnquiryForm />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================
          SECTION 3: FINAL CTA
      ======================================== */}

      <section
        aria-labelledby="sponsorship-next-heading"
        className="border-t border-[#E4E2DE] bg-background py-16 text-foreground sm:py-20"
      >
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
            <div className="max-w-[750px]">
              <p className="font-heading text-xs font-bold uppercase tracking-[0.15em] text-brand-red">
                Exhibit &amp; Partner
              </p>

              <h2
                id="sponsorship-next-heading"
                className="mt-4 font-heading text-[clamp(1.75rem,3vw,2.4rem)] font-bold leading-[1.2] tracking-[-0.035em]"
              >
                Looking for exhibition space instead
                <span className="text-brand-red">?</span>
              </h2>

              <p className="mt-4 text-sm leading-[1.8] text-muted sm:text-base">
                If your primary objective is to
                showcase products and services
                through an exhibition stand,
                explore exhibitor participation
                and stand enquiry options.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/exhibit/book-a-stand"
                className={primaryButtonClass}
              >
                Book a Stand

                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4"
                  strokeWidth={1.8}
                />
              </Link>

              <Link
                href="/exhibit"
                className={secondaryButtonClass}
              >
                Explore Exhibiting

                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4"
                  strokeWidth={1.8}
                />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
