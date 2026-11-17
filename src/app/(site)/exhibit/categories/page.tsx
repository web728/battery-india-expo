
import type { Metadata } from "next";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
} from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { SectorIcon } from "@/components/ui/sector-icon";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

import { sectors } from "@/lib/content/sectors";
import { siteConfig } from "@/lib/site-config";

/* ==================================================
   INDIA BATTERY INTERNATIONAL SHOW

   PAGE: EXHIBITOR CATEGORIES
   ROUTE: /exhibit/categories

   DESIGN SYSTEM
   Hybrid Industrial Editorial

   COLORS
   - Background: #F7F6F3
   - Surface: #FFFFFF
   - Charcoal: #191C21
   - Brand Red: #C62832
   - Muted Text: #626873

   PURPOSE
   - Present exhibition product categories
   - Explain the exhibition scope
   - Improve exhibitor discovery
   - Guide businesses to stand enquiries

   PERFORMANCE
   - Next.js Server Component
   - No Framer Motion
   - No client-side state
   - Semantic and accessible HTML

   SEO
   - Unique metadata
   - Absolute canonical
   - Open Graph / Twitter
   - CollectionPage JSON-LD
   - Breadcrumb structured data
================================================== */

/* --------------------------------------------------
   PAGE CONSTANTS
-------------------------------------------------- */

const PAGE_PATH = "/exhibit/categories";

const SITE_URL =
  siteConfig.siteUrl.replace(/\/+$/, "");

const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const BOOKING_URL = "/exhibit/book-a-stand";

const EXHIBIT_URL = "/exhibit";

const HERO_IMAGE =
  "/images/DSC01837.JPG.webp";

const SOCIAL_IMAGE =
  `${SITE_URL}${HERO_IMAGE}`;

/* --------------------------------------------------
   PAGE SEO
-------------------------------------------------- */

const PAGE_TITLE =
  `Exhibitor Categories | ${siteConfig.eventName} 2027`;

const PAGE_DESCRIPTION =
  `Explore exhibitor categories at ${siteConfig.eventName}, ` +
  `${siteConfig.dates.display} in Pune. ` +
  `Discover battery manufacturing, energy storage, ` +
  `components, testing and recycling technologies.`;

/* --------------------------------------------------
   METADATA
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
        url: SOCIAL_IMAGE,
        alt:
          "Battery manufacturing and industrial " +
          "technology exhibition",
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
   BUTTON STYLES
-------------------------------------------------- */

const primaryButtonClass = [
  "group inline-flex",
  "min-h-12",
  "items-center justify-center",
  "gap-2.5",
  "rounded-button",
  "bg-brand-red",
  "px-6 py-3",
  "font-heading",
  "text-sm font-bold",
  "text-white",
  "transition-colors",
  "duration-200",
  "hover:bg-brand-red-hover",
  "focus-visible:outline-2",
  "focus-visible:outline-offset-2",
  "focus-visible:outline-brand-red",
].join(" ");

const secondaryButtonClass = [
  "group inline-flex",
  "min-h-12",
  "items-center justify-center",
  "gap-2.5",
  "rounded-button",
  "border border-[#D9D7D3]",
  "bg-white",
  "px-6 py-3",
  "font-heading",
  "text-sm font-bold",
  "text-foreground",
  "transition-colors",
  "duration-200",
  "hover:border-brand-red",
  "hover:text-brand-red",
  "focus-visible:outline-2",
  "focus-visible:outline-offset-2",
  "focus-visible:outline-brand-red",
].join(" ");

/* --------------------------------------------------
   PAGE COMPONENT
-------------------------------------------------- */

export default function ExhibitCategoriesPage() {
  /* ------------------------------------------------
     PAGE STRUCTURED DATA

     This describes the category directory.
     It does not claim every listed sector
     has confirmed exhibitors for 2027.
  ------------------------------------------------ */

  const pageJsonLd = {
    "@context": "https://schema.org",

    "@type": "CollectionPage",

    "@id": `${PAGE_URL}#webpage`,

    url: PAGE_URL,

    name: PAGE_TITLE,

    description: PAGE_DESCRIPTION,

    inLanguage: "en-IN",

    isPartOf: {
      "@type": "WebSite",

      "@id": `${SITE_URL}/#website`,

      url: `${SITE_URL}/`,

      name: siteConfig.eventName,
    },

    about: {
      "@type": "Thing",
      name:
        "Battery manufacturing, energy storage " +
        "and related industrial technologies",
    },

    mainEntity: {
      "@type": "ItemList",

      name: "Exhibitor Categories",

      numberOfItems: sectors.length,

      itemListElement: sectors.map(
        (sector, index) => ({
          "@type": "ListItem",

          position: index + 1,

          name: sector.name,

          url: `${PAGE_URL}#${sector.slug}`,
        })
      ),
    },
  };

  return (
    <>
      {/* ==========================================
          PAGE STRUCTURED DATA
      ========================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            pageJsonLd
          ).replace(/</g, "\\u003c"),
        }}
      />

      {/* ==========================================
          BREADCRUMB STRUCTURED DATA
      ========================================== */}

      <BreadcrumbJsonLd
        items={[
          {
            label: "Exhibit",
            href: EXHIBIT_URL,
          },
          {
            label: "Exhibitor Categories",
            href: PAGE_PATH,
          },
        ]}
      />

      {/* ==========================================
          SHARED INNER PAGE HERO
      ========================================== */}

      <PageHero
        eyebrow="Exhibit"
        title="Exhibitor Categories"
        description={
          `Explore the products, components, ` +
          `equipment and technologies across ` +
          `the battery manufacturing and ` +
          `energy storage value chain.`
        }
        breadcrumbs={[
          {
            label: "Exhibit",
            href: EXHIBIT_URL,
          },
          {
            label: "Exhibitor Categories",
          },
        ]}
        backgroundImage={{
          src: HERO_IMAGE,
          alt:
            "Industrial technology display " +
            "at a previous exhibition",
        }}
      />

      {/* ==========================================
          SECTION 1: EXHIBITION SCOPE
      ========================================== */}

      <section
        id="exhibition-categories"
        aria-labelledby="categories-heading"
        className={[
          "relative isolate",
          "overflow-hidden",
          "bg-background",
          "py-16",
          "text-foreground",
          "sm:py-20",
          "lg:py-24",
          "xl:py-28",
        ].join(" ")}
      >
        <Container>
          {/* --------------------------------------
              SECTION INTRODUCTION
          -------------------------------------- */}

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-14">

            {/* LEFT: HEADING */}

            <div className="max-w-[780px]">
              <div className="mb-6 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-7 shrink-0 bg-brand-red"
                />

                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.15em] text-brand-red sm:text-xs">
                  Exhibition Scope
                </p>
              </div>

              <h2
                id="categories-heading"
                className={[
                  "font-heading",
                  "text-[clamp(2rem,3.5vw,3rem)]",
                  "font-bold",
                  "leading-[1.15]",
                  "tracking-[-0.04em]",
                  "text-foreground",
                  "[text-wrap:balance]",
                ].join(" ")}
              >
                Across the battery
                <span className="block">
                  value chain
                  <span className="text-brand-red">
                    .
                  </span>
                </span>
              </h2>
            </div>

            {/* RIGHT: EXPLANATORY COPY */}

            <div className="max-w-[460px]">
              <p className="font-body text-[15px] leading-[1.8] text-muted sm:text-base">
                {siteConfig.eventName} covers
                technologies and solutions
                relevant to battery production,
                components, energy storage,
                testing and related industries.
              </p>

              <p className="mt-4 font-body text-[15px] leading-[1.8] text-muted sm:text-base">
                Browse the categories below
                to understand the exhibition
                scope and identify relevant
                areas for your business.
              </p>
            </div>
          </div>

          {/* --------------------------------------
              EDITORIAL DIVIDER
          -------------------------------------- */}

          <div
            aria-hidden="true"
            className="mt-10 h-px w-full bg-[#E4E2DE] sm:mt-12"
          />

          {/* --------------------------------------
              CATEGORY DIRECTORY HEADER
          -------------------------------------- */}

          <div className="mb-7 mt-9 flex flex-wrap items-end justify-between gap-4 sm:mb-9 sm:mt-11">

            <div>
              <h3 className="font-heading text-xl font-bold leading-[1.35] tracking-[-0.025em] text-foreground sm:text-2xl">
                Explore the Categories
              </h3>

              <p className="mt-2 max-w-[550px] font-body text-sm leading-[1.75] text-muted">
                Product and technology areas
                relevant to exhibition participation.
              </p>
            </div>

         
          </div>

          {/* ======================================
              SECTION 2: CATEGORY GRID

              Original data source:
              @/lib/content/sectors

              Existing:
              - sector.slug
              - sector.icon
              - sector.name
              - sector.description
          ====================================== */}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {sectors.map((sector, index) => (
              <article
                key={sector.slug}
                id={sector.slug}
                aria-labelledby={
                  `category-${sector.slug}-heading`
                }
                className={[
                  "group relative",
                  "flex min-h-[245px] min-w-0",
                  "scroll-mt-28 flex-col",
                  "overflow-hidden",
                  "rounded-card",
                  "border border-[#E4E2DE]",
                  "bg-surface",
                  "p-6",
                  "sm:p-7",
                  "lg:p-8",
                  "transition-colors duration-200",
                  "hover:border-[#C62832]/40",
                ].join(" ")}
              >
                {/* ICON AND CATEGORY NUMBER */}

                <div className="flex items-start justify-between gap-4">

                  {/* SECTOR ICON */}

                  <span
                    aria-hidden="true"
                    className={[
                      "flex h-11 w-11",
                      "shrink-0",
                      "items-center justify-center",
                      "rounded-md",
                      "bg-background",
                      "text-brand-red",
                    ].join(" ")}
                  >
                    <SectorIcon
                      icon={sector.icon}
                      className="h-6 w-6"
                    />
                  </span>
 
                
                </div>

                {/* CATEGORY TITLE */}

                <h4
                  id={`category-${sector.slug}-heading`}
                  className={[
                    "mt-7",
                    "font-heading",
                    "text-lg font-bold",
                    "leading-[1.35]",
                    "tracking-[-0.025em]",
                    "text-foreground",
                    "sm:text-xl",
                  ].join(" ")}
                >
                  {sector.name}
                </h4>

                {/* DESCRIPTION */}

                <p className="mt-3 max-w-[360px] font-body text-sm leading-[1.8] text-muted">
                  {sector.description}
                </p>

                {/* BOTTOM DECORATIVE RULE */}

                <div
                  aria-hidden="true"
                  className="mt-auto pt-8"
                >
                  <span className="block h-px w-full bg-[#E4E2DE]" />

                  <span className="mt-4 block h-0.5 w-6 bg-brand-red" />
                </div>
              </article>
            ))}
          </div>

       
        </Container>
      </section>

      {/* ==========================================
          SECTION 3: EXHIBITOR NEXT STEPS

          Compact conversion section.
          No unnecessary large CTA banner.
      ========================================== */}

      <section
        id="category-enquiry"
        aria-labelledby="category-enquiry-heading"
        className="border-t border-[#E4E2DE] bg-surface py-16 text-foreground sm:py-20 lg:py-24"
      >
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">

            {/* LEFT CONTENT */}

            <div className="max-w-[730px]">
              <div className="mb-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-7 shrink-0 bg-brand-red"
                />

                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.15em] text-brand-red sm:text-xs">
                  Participate in 2027
                </p>
              </div>

              <h2
                id="category-enquiry-heading"
                className={[
                  "font-heading",
                  "text-[clamp(1.75rem,3vw,2.5rem)]",
                  "font-bold",
                  "leading-[1.2]",
                  "tracking-[-0.035em]",
                  "text-foreground",
                  "[text-wrap:balance]",
                ].join(" ")}
              >
                Is your business part
                of the battery industry
                <span className="text-brand-red">
                  ?
                </span>
              </h2>

              <p className="mt-5 max-w-[630px] font-body text-sm leading-[1.8] text-muted sm:text-base">
                Explore exhibition participation
                opportunities and speak with
                the organizing team about
                stand enquiries and relevant
                product categories.
              </p>
            </div>

            {/* RIGHT ACTIONS */}

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">

              {/* PRIMARY CTA */}

              <Link
                href={BOOKING_URL}
                className={primaryButtonClass}
              >
                Book a Stand

                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
                  strokeWidth={1.8}
                />
              </Link>

              {/* SECONDARY CTA */}

              <Link
                href={EXHIBIT_URL}
                className={secondaryButtonClass}
              >
                Why Exhibit

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
