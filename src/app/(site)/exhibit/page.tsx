
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  MapPin,
} from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

import { whyExhibitBenefits } from "@/lib/content/home-content";
import { siteConfig } from "@/lib/site-config";

/* --------------------------------------------------
   INDIA BATTERY INTERNATIONAL SHOW

   Route: /exhibit
   Page: Why Exhibit

   DESIGN
   - Hybrid Industrial Editorial
   - Dark shared PageHero
   - White editorial introduction
   - Warm off-white benefit section
   - Compact conversion section
   - Manrope headings / Inter body
   - Restrained red accents

   PERFORMANCE
   - Server Component
   - No Framer Motion or client-side state
   - Optimized Next.js images
   - Semantic, crawlable HTML

   SEO
   - Unique metadata
   - Absolute canonical
   - Open Graph / Twitter
   - WebPage JSON-LD
   - Breadcrumb JSON-LD
-------------------------------------------------- */

const PAGE_PATH = "/exhibit";

const SITE_URL = siteConfig.siteUrl.replace(/\/+$/, "");

const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const BOOKING_URL = "/exhibit/book-a-stand";
const CATEGORIES_URL = "/exhibit/categories";
const SPONSORSHIP_URL = "/exhibit/sponsorship";

/*
  Use two different existing local images
  to avoid repeating the same photograph
  in the hero and content.
*/

const HERO_IMAGE =
  "/images/expo-motor-technology-booth.jpg";

const CONTENT_IMAGE =
  "/images/expo-ev-powertrain-demo.jpg";

const SOCIAL_IMAGE = `${SITE_URL}${HERO_IMAGE}`;

/* --------------------------------------------------
   PAGE METADATA
-------------------------------------------------- */

const PAGE_TITLE =
  `Why Exhibit | ${siteConfig.eventName} 2027`;

const PAGE_DESCRIPTION =
  `Discover why to exhibit at ${siteConfig.eventName}, ` +
  `${siteConfig.dates.display} in Pune. ` +
  `Showcase battery technologies, connect with ` +
  `industry professionals and explore exhibitor opportunities.`;

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
        alt: "Battery technology on display at an industry exhibition",
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
   REUSABLE STYLES
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

/* --------------------------------------------------
   PAGE COMPONENT
-------------------------------------------------- */

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
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: siteConfig.eventName,
    },

    about: {
      "@type": "Event",
      name: siteConfig.eventName,
      startDate: siteConfig.dates.start,
      endDate: siteConfig.dates.end,

      location: {
        "@type": "Place",
        name: siteConfig.venue.name,

        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.venue.city,
          addressRegion: siteConfig.venue.state,
          addressCountry: "IN",
        },
      },
    },
  };

  return (
    <>
      {/* -----------------------------------
          PAGE JSON-LD
      ----------------------------------- */}

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
            href: PAGE_PATH,
          },
        ]}
      />

      {/* -----------------------------------
          SHARED INNER-PAGE HERO
      ----------------------------------- */}

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
          alt: "Battery and industrial technology exhibition display",
        }}
      />

      {/* ===================================
          SECTION 1: WHY EXHIBIT
      =================================== */}

      <section
        id="why-exhibit"
        aria-labelledby="why-exhibit-heading"
        className="bg-surface py-16 text-foreground sm:py-20 lg:py-24 xl:py-28"
      >
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-20">

            {/* LEFT: EDITORIAL CONTENT */}

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
                  <span className="text-brand-red">.</span>
                </span>
              </h2>

              <div className="mt-7 max-w-[590px] space-y-4 font-body text-[15px] leading-[1.8] text-muted sm:text-base">
                <p>
                  {siteConfig.eventName} provides
                  an exhibition platform for
                  battery manufacturers, cell
                  producers, pack integrators,
                  component suppliers and
                  technology companies.
                </p>

                <p>
                  The event brings together
                  businesses working across
                  battery manufacturing,
                  energy storage, electric
                  mobility and related
                  industrial applications.
                </p>

                <p>
                  Exhibitors can demonstrate
                  products, discuss technical
                  requirements, introduce
                  new solutions and connect
                  with professionals exploring
                  relevant technologies.
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

                    <p className="mt-2 font-heading text-sm font-bold leading-[1.5]">
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

                    <p className="mt-2 font-heading text-sm font-bold leading-[1.5]">
                      {siteConfig.venue.name}
                    </p>

                    <p className="mt-1 text-xs text-muted">
                      {siteConfig.venue.city}, India
                    </p>
                  </div>
                </div>
              </div>

              {/* MAIN ACTIONS */}

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

            {/* RIGHT: EXHIBITION PHOTOGRAPH */}

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

      {/* ===================================
          SECTION 2: EXHIBITOR BENEFITS
      =================================== */}

      <section
        id="exhibitor-benefits"
        aria-labelledby="exhibitor-benefits-heading"
        className="bg-background py-16 text-foreground sm:py-20 lg:py-24 xl:py-28"
      >
        <Container>
          {/* HEADING */}

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
                className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-[-0.035em] [text-wrap:balance]"
              >
                Why take part
                <span className="text-brand-red">?</span>
              </h2>
            </div>

            <p className="max-w-[430px] font-body text-sm leading-[1.75] text-muted sm:text-base">
              Explore how exhibiting can
              support product visibility,
              industry engagement and
              new business conversations.
            </p>
          </div>

          {/* BENEFITS GRID */}

          <ul className="grid gap-4 md:grid-cols-2 lg:gap-5">
            {whyExhibitBenefits.map((benefit, index) => (
              <li
                key={`${benefit.title}-${index}`}
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

                  <p className="mt-3 max-w-[490px] font-body text-sm leading-[1.8] text-muted sm:text-[15px]">
                    {benefit.description}
                  </p>
                </article>
              </li>
            ))}
          </ul>

       
        </Container>
      </section>

    
    </>
  );
}
