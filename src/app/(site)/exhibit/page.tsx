
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  HelpCircle,
  Mail,
  MapPin,
} from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Accordion } from "@/components/ui/accordion";
import {
  BreadcrumbJsonLd,
  FaqJsonLd,
} from "@/components/seo/json-ld";

import { whyExhibitBenefits } from "@/lib/content/home-content";
import { siteConfig } from "@/lib/site-config";

/* ==================================================
   INDIA BATTERY INTERNATIONAL SHOW

   EXHIBIT LANDING PAGE
   Route: /exhibit

   Sections:
   1. PageHero
   2. Why Exhibit
   3. Exhibitor Benefits
   4. Participation Options
   5. Exhibitor FAQs + Contact Assistance

   Design: Hybrid Industrial Editorial
   Rendering: Server Component
================================================== */

const SITE_URL = siteConfig.siteUrl.replace(/\/+$/, "");
const PAGE_PATH = "/exhibit";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const BOOKING_URL = "/exhibit/book-a-stand";
const CATEGORIES_URL = "/exhibit/categories";
const SPONSORSHIP_URL = "/exhibit/sponsorship";

const HERO_IMAGE =
  "/images/DSC01328.JPG.webp";

const CONTENT_IMAGE =
  "/images/DSC01808.JPG.webp";

const PAGE_TITLE =
  `Why Exhibit | ${siteConfig.eventName} 2027`;

const PAGE_DESCRIPTION =
  `Exhibit at ${siteConfig.eventName}, ` +
  `${siteConfig.dates.display} in Pune. ` +
  `Discover exhibitor benefits, stand booking, ` +
  `sponsorship opportunities and frequently asked questions.`;

/* ==================================================
   EXHIBITOR FAQ CONTENT

   Merged from former /exhibit/faqs page.

   All original exhibitor questions preserved.
   Outdated event references updated to 2027.

   Visitor FAQs are NOT included here.
================================================== */

type FaqItem = {
  question: string;
  answer: string;
};

type FaqGroup = {
  group: string;
  items: FaqItem[];
};

const exhibitorFaqs: FaqGroup[] = [
  {
    group: "Booking & Stands",
    items: [
      {
        question:
          `How do I book a stand at ${siteConfig.eventName} 2027?`,
        answer:
          "Submit an enquiry through the Book a Stand page or the Exhibitor Enquiry form. Our sales team will contact you with available stand options, rates and next steps.",
      },
      {
        question: "What stand formats are available?",
        answer:
          "Stand sizes, formats and rates are confirmed directly with our exhibitor sales team based on your requirements — share what you need through the Book a Stand form.",
      },
      {
        question: "Is there a deadline to book a stand?",
        answer:
          "Booking deadlines will be confirmed by our sales team based on availability. Contact us for the current status.",
      },
    ],
  },
  {
    group: "Participation & Logistics",
    items: [
      {
        question: "What is included in exhibitor passes?",
        answer:
          "Pass allocation is confirmed at the time of booking. Details are available on request from our sales team.",
      },
      {
        question: "Can international companies exhibit?",
        answer:
          "Yes. International exhibitors are welcome. Contact our team for guidance on customs, logistics and travel.",
      },
      {
        question:
          "Where can I find move-in and move-out schedules?",
        answer:
          "Move-in and move-out timings are shared directly with confirmed exhibitors closer to the show dates.",
      },
    ],
  },
];

const allExhibitorFaqs = exhibitorFaqs.flatMap(
  (group) => group.items
);

/* ==================================================
   SEO METADATA
================================================== */

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
        alt:
          "Industrial technology and battery exhibition",
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

/* ==================================================
   REUSABLE BUTTON STYLES
================================================== */

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
  "rounded-button",
  "border border-[#D9D7D3]",
  "bg-white px-6 py-3",
  "font-heading text-sm font-bold text-foreground",
  "transition-[border-color,color] duration-200",
  "hover:border-brand-red",
  "hover:text-brand-red",
  "focus-visible:outline-2",
  "focus-visible:outline-offset-2",
  "focus-visible:outline-brand-red",
].join(" ");

/* ==================================================
   PAGE
================================================== */

export default function ExhibitPage() {
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
      {/* PAGE STRUCTURED DATA */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageJsonLd).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      {/* BREADCRUMB SCHEMA */}

      <BreadcrumbJsonLd
        items={[
          {
            label: "Exhibit",
            href: "/exhibit",
          },
        ]}
      />

      {/* FAQ SCHEMA: SAME QUESTIONS AS VISIBLE CONTENT */}

      <FaqJsonLd items={allExhibitorFaqs} />

      {/* ==================================================
          HERO
      ================================================== */}

      <PageHero
        eyebrow="Exhibit at the Show"
        title="Put Your Business at the Centre of the Battery Industry"
        description={`Showcase battery technologies, manufacturing capabilities and energy storage solutions at ${siteConfig.eventName}, ${siteConfig.dates.display} in Pune.`}
        breadcrumbs={[
          {
            label: "Exhibit",
          },
        ]}
        backgroundImage={{
          src: HERO_IMAGE,
          alt:
            "Battery and industrial technology exhibition display",
        }}
      />

      {/* ==================================================
          SECTION 1 — WHY EXHIBIT
      ================================================== */}

      <section
        id="why-exhibit"
        aria-labelledby="why-exhibit-heading"
        className="bg-surface py-16 text-foreground sm:py-20 lg:py-24 xl:py-28"
      >
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-20">

            {/* INTRODUCTION */}

            <div className="min-w-0">
              <div className="mb-6 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-7 shrink-0 bg-brand-red"
                />

                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.15em] text-brand-red sm:text-xs">
                  Why Exhibit
                </p>
              </div>

              <h2
                id="why-exhibit-heading"
                className="max-w-[650px] font-heading text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-[-0.04em] text-foreground [text-wrap:balance]"
              >
                Bring your technology
                <span className="block">
                  to the right audience
                  <span className="text-brand-red">
                    .
                  </span>
                </span>
              </h2>

              <div className="mt-7 max-w-[590px] space-y-4 font-body text-[15px] leading-[1.8] text-muted sm:text-base">
                <p>
                  {siteConfig.eventName} provides
                  an exhibition platform for battery
                  manufacturers, cell producers,
                  pack integrators, component
                  suppliers and technology companies.
                </p>

                <p>
                  The event brings together
                  businesses working across
                  battery manufacturing, energy
                  storage, electric mobility
                  and related industrial applications.
                </p>

                <p>
                  Exhibitors can demonstrate
                  products, discuss technical
                  requirements, introduce new
                  solutions and connect with
                  professionals exploring
                  relevant technologies.
                </p>
              </div>

              {/* EVENT DETAILS */}

              <div className="mt-9 grid gap-5 border-t border-[#E4E2DE] pt-7 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <CalendarDays
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                    strokeWidth={1.8}
                  />

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                      Exhibition Dates
                    </p>

                    <p className="mt-2 font-heading text-sm font-bold leading-[1.5] text-foreground">
                      {siteConfig.dates.display}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                    strokeWidth={1.8}
                  />

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                      Venue
                    </p>

                    <p className="mt-2 font-heading text-sm font-bold leading-[1.5] text-foreground">
                      {siteConfig.venue.name}
                    </p>

                    <p className="mt-1 text-xs text-muted">
                      {siteConfig.venue.city},{" "}
                      {siteConfig.venue.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* PRIMARY ACTIONS */}

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href={BOOKING_URL}
                  className={primaryButtonClass}
                >
                  Book a Stand

                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                    strokeWidth={1.8}
                  />
                </Link>

                <Link
                  href={CATEGORIES_URL}
                  className={secondaryButtonClass}
                >
                  Exhibition Categories

                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4"
                    strokeWidth={1.8}
                  />
                </Link>
              </div>
            </div>

            {/* EXHIBITION IMAGE */}

            <figure className="min-w-0">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[10px] bg-[#262A31] sm:aspect-[4/3] lg:aspect-[4/5]">
                <Image
                  src={CONTENT_IMAGE}
                  alt="Electric mobility and battery-related technology displayed at an industry exhibition"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 44vw"
                  quality={80}
                  className="object-cover object-center"
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/75 to-transparent"
                />

                <figcaption className="absolute inset-x-0 bottom-0 px-5 pb-5 sm:px-7 sm:pb-7">
                  <p className="font-heading text-sm font-bold text-white sm:text-base">
                    Technology on Display
                  </p>

                  <p className="mt-1 font-body text-xs leading-[1.7] text-white/80">
                    Manufacturing · Energy Storage · Mobility
                  </p>
                </figcaption>
              </div>
            </figure>
          </div>
        </Container>
      </section>

      {/* ==================================================
          SECTION 2 — EXHIBITOR BENEFITS
      ================================================== */}

      <section
        id="exhibitor-benefits"
        aria-labelledby="exhibitor-benefits-heading"
        className="bg-background py-16 text-foreground sm:py-20 lg:py-24 xl:py-28"
      >
        <Container>
          <div className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-12">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-7 shrink-0 bg-brand-red"
                />

                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.15em] text-brand-red sm:text-xs">
                  Exhibitor Opportunities
                </p>
              </div>

              <h2
                id="exhibitor-benefits-heading"
                className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-[-0.035em] text-foreground"
              >
                Why take part
                <span className="text-brand-red">?</span>
              </h2>
            </div>

            <p className="max-w-[430px] font-body text-sm leading-[1.75] text-muted sm:text-base">
              Explore how exhibiting can support
              product visibility, industry engagement
              and new business conversations.
            </p>
          </div>

          {/* BENEFITS */}

          <ul className="grid gap-4 md:grid-cols-2 lg:gap-5">
            {whyExhibitBenefits.map((benefit, index) => (
              <li
                key={benefit.title}
                className="min-w-0"
              >
                <article className="flex h-full flex-col rounded-card border border-[#E4E2DE] bg-surface p-6 sm:p-7 lg:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-background text-brand-red"
                    >
                      <Check
                        className="h-5 w-5"
                        strokeWidth={1.8}
                      />
                    </span>

                   
                  </div>

                  <h3 className="mt-7 font-heading text-lg font-bold leading-[1.35] tracking-[-0.025em] text-foreground sm:text-xl">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 font-body text-sm leading-[1.8] text-muted sm:text-[15px]">
                    {benefit.description}
                  </p>
                </article>
              </li>
            ))}
          </ul>

         
        </Container>
      </section>

     
      {/* ==================================================
          SECTION 4 — EXHIBITOR FAQS

          Former separate FAQ page merged here.
          This is the LAST main page section.
      ================================================== */}

      <section
        id="exhibitor-faqs"
        aria-labelledby="exhibitor-faqs-heading"
        className="scroll-mt-24 bg-background py-16 text-foreground sm:py-20 lg:py-24 xl:py-28"
      >
        <Container>
          {/* FAQ SECTION INTRO */}

          <div className="mb-10 grid gap-6 lg:mb-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-12">
            <div className="max-w-[740px]">
              <div className="mb-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-7 shrink-0 bg-brand-red"
                />

                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.15em] text-brand-red sm:text-xs">
                  Exhibitor Support
                </p>
              </div>

              <h2
                id="exhibitor-faqs-heading"
                className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-[-0.04em] text-foreground [text-wrap:balance]"
              >
                Frequently asked
                <span className="block">
                  questions
                  <span className="text-brand-red">.</span>
                </span>
              </h2>
            </div>

            <p className="max-w-[440px] font-body text-sm leading-[1.8] text-muted sm:text-base">
              Find answers about stand booking,
              participation, exhibitor passes
              and logistics for{" "}
              {siteConfig.eventName} 2027.
            </p>
          </div>

          {/* FAQ GROUPS */}

          <div className="mx-auto max-w-[1040px] space-y-5">
            {exhibitorFaqs.map((group, index) => {
              const groupId = `exhibitor-faq-group-${index + 1}`;

              return (
                <section
                  key={group.group}
                  id={groupId}
                  aria-labelledby={`${groupId}-heading`}
                  className="scroll-mt-28 overflow-hidden rounded-card border border-[#E4E2DE] bg-surface"
                >
                  {/* GROUP HEADER */}

                  <div className="flex items-start gap-4 border-b border-[#E4E2DE] px-5 py-6 sm:px-7">
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-background text-brand-red"
                    >
                      <HelpCircle
                        className="h-5 w-5"
                        strokeWidth={1.8}
                      />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-red">
                        Topic {String(index + 1).padStart(2, "0")}
                      </p>

                      <h3
                        id={`${groupId}-heading`}
                        className="mt-1 font-heading text-lg font-bold leading-[1.4] tracking-[-0.025em] text-foreground sm:text-xl"
                      >
                        {group.group}
                      </h3>
                    </div>

                  
                  </div>

                  {/* EXISTING ACCORDION */}

                  <div className="px-5 py-2 sm:px-7">
                    <Accordion items={group.items} />
                  </div>
                </section>
              );
            })}
          </div>

          {/* CONTACT ASSISTANCE — END OF PAGE */}

          <div className="mx-auto mt-10 max-w-[1040px] border-t border-[#E4E2DE] pt-9 sm:mt-12 sm:pt-10">
            <div className="grid items-center gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-10">
              <div>
                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.15em] text-brand-red">
                  Need More Information?
                </p>

                <h3 className="mt-3 font-heading text-xl font-bold leading-[1.3] tracking-[-0.03em] text-foreground sm:text-2xl">
                  Still have a question?
                </h3>

                <p className="mt-3 max-w-[540px] font-body text-sm leading-[1.8] text-muted">
                  Contact the organizing team
                  for details about exhibitor
                  participation, stand enquiries
                  and event arrangements.
                </p>
              </div>

              <Link
                href="/contact"
                className={primaryButtonClass}
              >
                <Mail
                  aria-hidden="true"
                  className="h-4 w-4"
                  strokeWidth={1.8}
                />

                Contact Our Team

                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
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
