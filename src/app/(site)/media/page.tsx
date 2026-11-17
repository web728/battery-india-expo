
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Images,
  Mail,
} from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

/* ==================================================
   INDIA BATTERY INTERNATIONAL SHOW

   PAGE: MEDIA CENTRE
   ROUTE: /media

   DESIGN: Hybrid Industrial Editorial

   PAGE FLOW:
   1. Dark PageHero
   2. Media Resources Introduction
   3. Photo Gallery + Download Centre
   4. Media Enquiries

   SEO:
   - Unique metadata
   - Absolute canonical URL
   - Open Graph / Twitter
   - CollectionPage JSON-LD
   - Breadcrumb JSON-LD

   PERFORMANCE:
   - Server Component
   - No Framer Motion
   - No client-side state
   - Next.js Image optimization
================================================== */

const PAGE_PATH = "/media";
const SITE_URL = siteConfig.siteUrl.replace(/\/+$/, "");
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const HERO_IMAGE =
  "/images/DSC01783.JPG.webp";

const GALLERY_IMAGE =
  "/images/bat.webp";

const DOWNLOAD_IMAGE =
  "/images/DSC00794.JPG.webp";

const PAGE_TITLE =
  `Media Centre | ${siteConfig.eventName} 2027`;

const PAGE_DESCRIPTION =
  `Explore the media centre for ${siteConfig.eventName}, ` +
  `${siteConfig.dates.display} in Pune. ` +
  `Browse exhibition photography, media resources ` +
  `and information for journalists and media partners.`;

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
        url: `${SITE_URL}${HERO_IMAGE}`,
        alt:
          "Visitors and exhibitors at an industry technology exhibition",
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
   MEDIA RESOURCE DATA
-------------------------------------------------- */

const mediaResources = [
  {
    number: "01",
    eyebrow: "Exhibition Photography",
    title: "Photo Gallery",
    description:
      "Browse photography from previous exhibition activities, including technology displays, industry participation and event highlights.",
    href: "/media/gallery",
    image: GALLERY_IMAGE,
    imageAlt:
      "Visitors exploring electric mobility and battery technology displays",
    icon: Images,
    action: "Explore Gallery",
  },
  {
    number: "02",
    eyebrow: "Media Materials",
    title: "Download Centre",
    description:
      "Find available exhibition information, brand resources and downloadable materials for media coverage and event reference.",
    href: "/media/downloads",
    image: DOWNLOAD_IMAGE,
    imageAlt:
      "Exhibition branding and professional event environment",
    icon: Download,
    action: "View Downloads",
  },
] as const;

/* --------------------------------------------------
   REUSABLE BUTTON STYLES
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

/* ==================================================
   PAGE COMPONENT
================================================== */

export default function MediaCentrePage() {
  const pageJsonLd = {
    "@context": "https://schema.org",

    "@type": "CollectionPage",

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
      "@type": "ItemList",

      name: "Media Centre Resources",

      numberOfItems: mediaResources.length,

      itemListElement: mediaResources.map(
        (resource, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: resource.title,
          url: `${SITE_URL}${resource.href}`,
        })
      ),
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
            label: "Media",
            href: PAGE_PATH,
          },
        ]}
      />

      {/* ========================================
          DARK PAGE HERO
      ======================================== */}

      <PageHero
        eyebrow="Media & Press"
        title="Media Centre"
        description={`Explore exhibition photography, media resources and information related to ${siteConfig.eventName}, ${siteConfig.dates.display} in Pune.`}
        breadcrumbs={[
          {
            label: "Media",
          },
        ]}
        backgroundImage={{
          src: HERO_IMAGE,
          alt:
            "Industry visitors exploring an exhibition floor",
        }}
      />

      {/* ========================================
          SECTION 1: MEDIA RESOURCES
      ======================================== */}

      <section
        id="media-resources"
        aria-labelledby="media-resources-heading"
        className="bg-background py-16 text-foreground sm:py-20 lg:py-24 xl:py-28"
      >
        <Container>
          {/* SECTION INTRODUCTION */}

          <div className="mb-10 grid gap-7 lg:mb-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-14">

            <div className="max-w-[770px]">
              <div className="mb-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-7 shrink-0 bg-brand-red"
                />

                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.15em] text-brand-red sm:text-xs">
                  Media Resources
                </p>
              </div>

              <h2
                id="media-resources-heading"
                className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-[-0.04em] text-foreground [text-wrap:balance]"
              >
                Explore the exhibition
                <span className="block">
                  through our media resources
                  <span className="text-brand-red">.</span>
                </span>
              </h2>
            </div>

           
          </div>

          {/* EDITORIAL DIVIDER */}

          <div
            aria-hidden="true"
            className="mb-9 h-px w-full bg-[#E4E2DE]"
          />

          {/* ====================================
              MEDIA RESOURCE CARDS
          ==================================== */}

          <ul className="grid gap-5 lg:grid-cols-2 lg:gap-6">
            {mediaResources.map((resource) => {
              const Icon = resource.icon;

              return (
                <li
                  key={resource.href}
                  className="min-w-0"
                >
                  <article className="group flex h-full flex-col overflow-hidden rounded-card border border-[#E4E2DE] bg-surface transition-colors duration-200 hover:border-brand-red/35">

                    {/* IMAGE */}

                    <div className="relative aspect-[16/10] overflow-hidden bg-[#262A31]">
                      <Image
                        src={resource.image}
                        alt={resource.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 48vw"
                        quality={80}
                        className="object-cover object-center"
                      />
 
                     
                    </div>

                    {/* CONTENT */}

                    <div className="flex flex-1 flex-col p-6 sm:p-8">

                      {/* EYEBROW */}

                      <div className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-background text-brand-red"
                        >
                          <Icon
                            className="h-5 w-5"
                            strokeWidth={1.8}
                          />
                        </span>

                        <p className="font-heading text-[11px] font-bold uppercase tracking-[0.12em] text-brand-red">
                          {resource.eyebrow}
                        </p>
                      </div>

                      {/* TITLE */}

                      <h3 className="mt-5 font-heading text-[clamp(1.4rem,2.3vw,1.8rem)] font-bold leading-[1.25] tracking-[-0.03em] text-foreground">
                        {resource.title}
                      </h3>

                      {/* DESCRIPTION */}

                      <p className="mt-4 max-w-[540px] font-body text-sm leading-[1.8] text-muted sm:text-[15px]">
                        {resource.description}
                      </p>

                      {/* INTERNAL LINK */}

                      <div className="mt-auto pt-8">
                        <div className="border-t border-[#E4E2DE] pt-5">
                          <Link
                            href={resource.href}
                            className="group/link inline-flex min-h-11 items-center gap-2.5 font-heading text-sm font-bold text-brand-red transition-colors duration-200 hover:text-brand-red-hover focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
                          >
                            {resource.action}

                            <ArrowUpRight
                              aria-hidden="true"
                              className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transform-none"
                              strokeWidth={1.8}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>

         
        </Container>
      </section>

      {/* ========================================
          SECTION 2: MEDIA ENQUIRIES
      ======================================== */}

      <section
        id="media-enquiries"
        aria-labelledby="media-enquiries-heading"
        className="border-t border-[#E4E2DE] bg-surface py-16 text-foreground sm:py-20 lg:py-24"
      >
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">

            {/* CONTACT COPY */}

            <div className="max-w-[720px]">
              <div className="mb-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-7 shrink-0 bg-brand-red"
                />

                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.15em] text-brand-red sm:text-xs">
                  Media Enquiries
                </p>
              </div>

              <h2
                id="media-enquiries-heading"
                className="font-heading text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.2] tracking-[-0.035em] text-foreground"
              >
                Need information for coverage
                <span className="text-brand-red">?</span>
              </h2>

              <p className="mt-5 max-w-[630px] font-body text-sm leading-[1.8] text-muted sm:text-base">
                For press enquiries,
                media collaboration and
                requests for exhibition
                information, contact
                the organizing team.
              </p>
            </div>

            {/* CONTACT CTA */}

            <Link
              href="/contact"
              className={primaryButtonClass}
            >
              <Mail
                aria-hidden="true"
                className="h-4 w-4"
                strokeWidth={1.8}
              />

              Contact Media Team

              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none"
                strokeWidth={1.8}
              />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
