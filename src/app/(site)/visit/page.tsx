
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

import { whyVisitBenefits } from "@/lib/content/home-content";
import { siteConfig } from "@/lib/site-config";

/* ==================================================
   INDIA BATTERY INTERNATIONAL SHOW

   PAGE: WHY VISIT
   ROUTE: /visit

   DESIGN:
   Hybrid Industrial Editorial

   PAGE FLOW:
   1. PageHero
   2. Why Visit
   3. Visitor Benefits
   4. Planning Your Visit
   5. Visitor FAQs
   6. Contact Assistance

   PERFORMANCE:
   - Server Component
   - Optimized local imagery
   - No Framer Motion
   - Accordion provides isolated interactivity

   SEO:
   - Unique metadata
   - Absolute canonical URL
   - Open Graph / Twitter
   - WebPage JSON-LD
   - Breadcrumb JSON-LD
   - FAQ JSON-LD
================================================== */

/* --------------------------------------------------
   ROUTES AND ASSETS
-------------------------------------------------- */

const PAGE_PATH = "/visit";

const SITE_URL = siteConfig.siteUrl.replace(/\/+$/, "");

const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const REGISTRATION_URL = "/visit/register";
const VISITOR_PROFILE_URL = "/visit/visitor-profile";
const TRAVEL_URL = "/venue/travel";
const CONTACT_URL = "/contact";

const HERO_IMAGE =
  "/images/DSC01444.JPG.webp";

const CONTENT_IMAGE =
  "/images/expo-ev-battery-showcase.jpg";

const SOCIAL_IMAGE = `${SITE_URL}${HERO_IMAGE}`;

/* --------------------------------------------------
   METADATA
-------------------------------------------------- */

const PAGE_TITLE =
  `Why Visit | ${siteConfig.eventName} 2027`;

const PAGE_DESCRIPTION =
  `Plan your visit to ${siteConfig.eventName}, ` +
  `${siteConfig.dates.display} in Pune. ` +
  `Explore battery technologies, visitor benefits, ` +
  `registration information and frequently asked questions.`;

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
        url: SOCIAL_IMAGE,
        alt:
          "Visitors exploring battery and industrial " +
          "technology at an exhibition",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [SOCIAL_IMAGE],
  },

  robots: {
    index: true,
    follow: true,
  },
};

/* --------------------------------------------------
   TYPES
-------------------------------------------------- */

type PlanningDetail = {
  title: string;
  description: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type FaqGroup = {
  group: string;
  items: FaqItem[];
};

/* --------------------------------------------------
   PLANNING CONTENT

   All six original topics preserved.
   Event hours and venue updated
   from the centralized configuration.
-------------------------------------------------- */

const planningDetails: PlanningDetail[] = [
  {
    title: "When to Visit",
    description:
      `The exhibition takes place from ` +
      `${siteConfig.dates.display}. ` +
      `Visitor hours are ` +
      `${siteConfig.visitorHours.display} ` +
      `${siteConfig.visitorHours.timeZoneLabel}.`,
  },
  {
    title: "Visitor Registration",
    description:
      "Register online before travelling. Check your registration confirmation for entry instructions and any applicable conditions.",
  },
  {
    title: "Getting to the Venue",
    description:
      `The exhibition will be held at ` +
      `${siteConfig.venue.full}. ` +
      `Review travel options before your visit.`,
  },
  {
    title: "International Visitors",
    description:
      "Visitors travelling from outside India should check applicable visa, travel and entry requirements before making arrangements.",
  },
  {
    title: "What to Bring",
    description:
      "Keep your registration confirmation and a valid photo ID available. Business cards may be useful for industry meetings.",
  },
  {
    title: "Need Assistance?",
    description:
      "Contact the event team for registration questions or additional information about attending the show.",
  },
];

/* --------------------------------------------------
   VISITOR FAQS

   Merged from the former /visit/faqs page.

   Original 5 questions and their
   answer content are preserved.
-------------------------------------------------- */

const visitorFaqs: FaqGroup[] = [
  {
    group: "Registration",
    items: [
      {
        question: "How do I register to visit the show?",
        answer:
          "Use the Visitor Registration form. On submission you will receive a confirmation email with your reference number and a downloadable pass.",
      },
      {
        question: "Is visitor registration free?",
        answer:
          "Registration terms and any applicable fees will be confirmed and published here and on the Registration Terms page before the show opens.",
      },
      {
        question: "Can I register on-site?",
        answer:
          "On-site registration details will be confirmed closer to the event. Pre-registration online is recommended to avoid queues.",
      },
    ],
  },
  {
    group: "At the Show",
    items: [
      {
        question: "Who can attend as a trade visitor?",
        answer:
          "The show is designed for industry professionals — OEMs, manufacturers, energy companies, researchers, investors, regulators, consultants and media. See the Visitor Profile page for the full list.",
      },
      {
        question: "Is the show open to students?",
        answer:
          "Students and research scholars are welcome to register as trade visitors, subject to the registration terms published closer to the event.",
      },
    ],
  },
];

const allVisitorFaqs = visitorFaqs.flatMap(
  (group) => group.items
);

/* --------------------------------------------------
   SHARED BUTTON STYLES
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
  "transition-[border-color,color] duration-200",
  "hover:border-brand-red hover:text-brand-red",
  "focus-visible:outline-2",
  "focus-visible:outline-offset-2",
  "focus-visible:outline-brand-red",
].join(" ");

/* ==================================================
   PAGE COMPONENT
================================================== */

export default function VisitPage() {
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

    mainEntity: {
      "@id": `${PAGE_URL}#visitor-information`,
    },
  };

  return (
    <>
      {/* ========================================
          PAGE STRUCTURED DATA
      ======================================== */}

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
            href: PAGE_PATH,
          },
        ]}
      />

      {/* FAQ SCHEMA MATCHES VISIBLE QUESTIONS */}

      <FaqJsonLd items={allVisitorFaqs} />

      {/* ========================================
          PAGE HERO
      ======================================== */}

      <PageHero
        eyebrow="Visit the Show"
        title="Explore the Future of Battery Technology"
        description={`Discover battery manufacturing, energy storage and mobility technologies at ${siteConfig.eventName}, ${siteConfig.dates.display} in Pune.`}
        breadcrumbs={[
          {
            label: "Visit",
          },
        ]}
        backgroundImage={{
          src: HERO_IMAGE,
          alt:
            "Industry professionals exploring products " +
            "and technologies at an exhibition",
        }}
      />

      {/* ========================================
          SECTION 1 — WHY VISIT
      ======================================== */}

      <section
        id="why-visit"
        aria-labelledby="why-visit-heading"
        className="bg-surface py-16 text-foreground sm:py-20 lg:py-24 xl:py-28"
      >
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-20">

            {/* EDITORIAL INTRODUCTION */}

            <div className="min-w-0">
              <div className="mb-6 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-7 shrink-0 bg-brand-red"
                />

                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.15em] text-brand-red sm:text-xs">
                  Why Visit
                </p>
              </div>

              <h2
                id="why-visit-heading"
                className="max-w-[650px] font-heading text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-[-0.04em] text-foreground [text-wrap:balance]"
              >
                Explore the battery
                <span className="block">
                  industry in one place
                  <span className="text-brand-red">.</span>
                </span>
              </h2>

              <div className="mt-7 max-w-[590px] space-y-4 font-body text-[15px] leading-[1.8] text-muted sm:text-base">
                <p>
                  {siteConfig.eventName} offers
                  an opportunity to explore battery
                  products, manufacturing technologies,
                  energy storage systems and
                  supporting solutions.
                </p>

                <p>
                  Visitors can engage with participating
                  businesses, compare technologies
                  and discuss requirements relevant
                  to their industries and applications.
                </p>

                <p>
                  Whether you work in electric mobility,
                  battery manufacturing, industrial
                  energy systems or related fields,
                  the exhibition provides a platform
                  for industry discovery and
                  professional conversations.
                </p>
              </div>

              {/* EVENT INFORMATION */}

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
                  <Clock3
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                    strokeWidth={1.8}
                  />

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                      Visitor Hours
                    </p>

                    <p className="mt-2 font-heading text-sm font-bold leading-[1.5] text-foreground">
                      {siteConfig.visitorHours.display}{" "}
                      {siteConfig.visitorHours.timeZoneLabel}
                    </p>
                  </div>
                </div>
              </div>

              {/* PRIMARY ACTIONS */}

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href={REGISTRATION_URL}
                  className={primaryButtonClass}
                >
                  Register to Visit

                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                    strokeWidth={1.8}
                  />
                </Link>

                <Link
                  href={VISITOR_PROFILE_URL}
                  className={secondaryButtonClass}
                >
                  Visitor Profile

                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4"
                    strokeWidth={1.8}
                  />
                </Link>
              </div>
            </div>

            {/* EXHIBITION PHOTOGRAPH */}

            <figure className="min-w-0">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[10px] bg-[#262A31] sm:aspect-[4/3] lg:aspect-[4/5]">
                <Image
                  src={CONTENT_IMAGE}
                  alt="Battery and electric mobility technology displayed at an industry exhibition"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 44vw"
                  quality={80}
                  className="object-cover object-center"
                />

                <div className="absolute inset-x-0 bottom-0 bg-[#191C21]/90 px-5 py-5 text-white sm:px-7 sm:py-6">
                  <figcaption>
                    <p className="font-heading text-sm font-bold sm:text-base">
                      Explore Industry Solutions
                    </p>

                    <p className="mt-1 font-body text-xs leading-[1.7] text-white/75">
                      Battery Technology · Energy Storage · Mobility
                    </p>
                  </figcaption>
                </div>
              </div>
            </figure>
          </div>
        </Container>
      </section>

      {/* ========================================
          SECTION 2 — VISITOR BENEFITS
      ======================================== */}

      <section
        id="visitor-benefits"
        aria-labelledby="visitor-benefits-heading"
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
                  Visitor Opportunities
                </p>
              </div>

              <h2
                id="visitor-benefits-heading"
                className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-[-0.035em] text-foreground"
              >
                What you can explore
                <span className="text-brand-red">.</span>
              </h2>
            </div>

            <p className="max-w-[430px] font-body text-sm leading-[1.75] text-muted sm:text-base">
              Discover relevant products,
              learn about emerging technologies
              and connect with professionals
              across the battery value chain.
            </p>
          </div>

          <ul className="grid gap-4 md:grid-cols-2 lg:gap-5">
            {whyVisitBenefits.map((benefit, index) => (
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

      {/* ========================================
          SECTION 3 — PLANNING YOUR VISIT
      ======================================== */}

      <section
        id="plan-your-visit"
        aria-labelledby="planning-heading"
        className="scroll-mt-24 bg-surface py-16 text-foreground sm:py-20 lg:py-24 xl:py-28"
      >
        <Container>
          <div className="mb-10 grid gap-6 lg:mb-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-12">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-7 shrink-0 bg-brand-red"
                />

                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.15em] text-brand-red sm:text-xs">
                  Visitor Information
                </p>
              </div>

              <h2
                id="planning-heading"
                className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-[-0.035em] text-foreground"
              >
                Planning your visit
                <span className="text-brand-red">.</span>
              </h2>
            </div>

            <p className="max-w-[440px] font-body text-sm leading-[1.8] text-muted sm:text-base">
              Practical information about
              registration, event timings,
              travel and preparing for
              your visit to Pune.
            </p>
          </div>

          {/* SIX PLANNING TOPICS */}

          <div className="grid gap-x-12 md:grid-cols-2">
            {planningDetails.map((detail, index) => (
              <article
                key={detail.title}
                className="border-t border-[#E4E2DE] py-6 sm:py-7"
              >
                <div className="flex items-start gap-5">
                
                  <div>
                    <h3 className="font-heading text-base font-bold leading-[1.4] text-foreground sm:text-lg">
                      {detail.title}
                    </h3>

                    <p className="mt-3 max-w-[490px] font-body text-sm leading-[1.8] text-muted">
                      {detail.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* EVENT DETAILS STRIP */}

          <div className="mt-8 grid gap-6 border-y border-[#E4E2DE] py-8 sm:mt-10 sm:grid-cols-3 sm:gap-0 lg:py-9">

            {/* DATES */}

            <div className="flex items-start gap-3 sm:pr-6">
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

            {/* VISITOR HOURS */}

            <div className="flex items-start gap-3 sm:border-l sm:border-[#E4E2DE] sm:px-6 lg:px-8">
              <Clock3
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                strokeWidth={1.8}
              />

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                  Visitor Hours
                </p>

                <p className="mt-2 font-heading text-sm font-bold leading-[1.5] text-foreground">
                  {siteConfig.visitorHours.display}{" "}
                  {siteConfig.visitorHours.timeZoneLabel}
                </p>
              </div>
            </div>

            {/* VENUE */}

            <div className="flex items-start gap-3 sm:border-l sm:border-[#E4E2DE] sm:pl-6 lg:pl-8">
              <MapPin
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                strokeWidth={1.8}
              />

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                  Exhibition Venue
                </p>

                <p className="mt-2 font-heading text-sm font-bold leading-[1.5] text-foreground">
                  {siteConfig.venue.name}
                </p>

                <p className="mt-1 font-body text-xs leading-[1.7] text-muted">
                  {siteConfig.venue.line2},{" "}
                  {siteConfig.venue.city},{" "}
                  {siteConfig.venue.country}
                </p>
              </div>
            </div>
          </div>

          {/* VISITOR ACTIONS */}

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href={REGISTRATION_URL}
              className={primaryButtonClass}
            >
              Register to Visit

              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                strokeWidth={1.8}
              />
            </Link>

            <Link
              href={TRAVEL_URL}
              className={secondaryButtonClass}
            >
              Travel Information

              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4"
                strokeWidth={1.8}
              />
            </Link>
          </div>
        </Container>
      </section>

      {/* ========================================
          SECTION 4 — VISITOR FAQS

          Merged from /visit/faqs.

          This is the final main section.
      ======================================== */}

      <section
        id="visitor-faqs"
        aria-labelledby="visitor-faqs-heading"
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
                  Visitor Support
                </p>
              </div>

              <h2
                id="visitor-faqs-heading"
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
              Find answers about registration,
              trade visitor eligibility and
              attending {siteConfig.eventName} 2027.
            </p>
          </div>

          {/* FAQ GROUPS */}

          <div className="mx-auto max-w-[1040px] space-y-5">
            {visitorFaqs.map((group, index) => {
              const groupId =
                `visitor-faq-group-${index + 1}`;

              return (
                <section
                  key={group.group}
                  id={groupId}
                  aria-labelledby={`${groupId}-heading`}
                  className="scroll-mt-28 overflow-hidden rounded-card border border-[#E4E2DE] bg-surface"
                >
                  {/* TOPIC HEADER */}

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
                     

                      <h3
                        id={`${groupId}-heading`}
                        className="mt-1 font-heading text-lg font-bold leading-[1.4] tracking-[-0.025em] text-foreground sm:text-xl"
                      >
                        {group.group}
                      </h3>
                    </div>

                    
                  </div>

                  {/* REUSABLE FAQ ACCORDION */}

                  <div className="px-5 py-2 sm:px-7">
                    <Accordion items={group.items} />
                  </div>
                </section>
              );
            })}
          </div>

          {/* FINAL CONTACT ASSISTANCE */}

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
                  Contact our organizing team
                  for visitor registration,
                  event information and
                  assistance with planning
                  your visit.
                </p>
              </div>

              <Link
                href={CONTACT_URL}
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
