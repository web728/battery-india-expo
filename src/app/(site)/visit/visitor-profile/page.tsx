
import type { Metadata } from "next";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  MapPin,
  UsersRound,
} from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { visitorProfile } from "@/lib/content/exhibitor-categories";
import { siteConfig } from "@/lib/site-config";

/*
  INDIA BATTERY INTERNATIONAL SHOW
  Page: Visitor Profile
  Route: /visit/visitor-profile

  Server Component
  Hybrid Industrial Editorial
*/

const PAGE_PATH = "/visit/visitor-profile";
const VISIT_PATH = "/visit";
const REGISTRATION_PATH = "/visit/register";

const SITE_URL = siteConfig.siteUrl.replace(/\/+$/, "");
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const HERO_IMAGE = "/images/expo-floor-components-booth.jpg";
const SOCIAL_IMAGE = `${SITE_URL}${HERO_IMAGE}`;

const PAGE_TITLE = `Visitor Profile | ${siteConfig.eventName} 2027`;

const PAGE_DESCRIPTION =
  `Explore the professional visitor categories at ${siteConfig.eventName}, ` +
  `${siteConfig.dates.display} in Pune. Discover industry audiences across ` +
  `battery technology, energy storage, manufacturing and electric mobility.`;

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
        alt: "Industry professionals at a battery technology exhibition",
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

const primaryButtonClass =
  "group inline-flex min-h-12 items-center justify-center gap-2.5 " +
  "rounded-button bg-brand-red px-6 py-3 font-heading text-sm " +
  "font-bold text-white transition-colors duration-200 " +
  "hover:bg-brand-red-hover focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-brand-red";

const secondaryButtonClass =
  "inline-flex min-h-12 items-center justify-center gap-2.5 " +
  "rounded-button border border-[#D9D7D3] bg-white px-6 py-3 " +
  "font-heading text-sm font-bold text-foreground transition-colors " +
  "duration-200 hover:border-brand-red hover:text-brand-red " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-brand-red";

export default function VisitorProfilePage() {
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
      name: "Professional Visitor Categories",
      numberOfItems: visitorProfile.length,
      itemListElement: visitorProfile.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        description: item.description,
      })),
    },
  };

  return (
    <>
      {/* PAGE STRUCTURED DATA */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <BreadcrumbJsonLd
        items={[
          {
            label: "Visit",
            href: VISIT_PATH,
          },
          {
            label: "Visitor Profile",
            href: PAGE_PATH,
          },
        ]}
      />

      {/* DARK EDITORIAL PAGE HERO */}

      <PageHero
        eyebrow="Visit the Show"
        title="Visitor Profile"
        description={`Explore the industries and professional audiences relevant to ${siteConfig.eventName}, ${siteConfig.dates.display} in Pune.`}
        breadcrumbs={[
          {
            label: "Visit",
            href: VISIT_PATH,
          },
          {
            label: "Visitor Profile",
          },
        ]}
        backgroundImage={{
          src: HERO_IMAGE,
          alt: "Industry professionals visiting a technology exhibition",
        }}
      />

      {/* VISITOR AUDIENCE DIRECTORY */}

      <section
        id="visitor-audience"
        aria-labelledby="visitor-audience-heading"
        className="bg-background py-16 text-foreground sm:py-20 lg:py-24 xl:py-28"
      >
        <Container>
          {/* INTRODUCTION */}

          <div className="mb-10 grid gap-7 lg:mb-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-14">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-7 bg-brand-red"
                />
                <p className="font-heading text-xs font-bold uppercase tracking-[0.15em] text-brand-red">
                  Industry Audience
                </p>
              </div>

              <h2
                id="visitor-audience-heading"
                className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-[-0.04em]"
              >
                Who the exhibition
                <span className="block">
                  is designed for
                  <span className="text-brand-red">.</span>
                </span>
              </h2>
            </div>

            <div className="max-w-[470px] space-y-4 font-body text-[15px] leading-[1.8] text-muted sm:text-base">
              <p>
                {siteConfig.eventName} is relevant to organisations
                and professionals involved in battery technologies,
                manufacturing, energy storage, electric mobility
                and related industrial applications.
              </p>

              <p>
                Explore the professional categories below to
                understand the audiences the exhibition is
                intended to serve.
              </p>
            </div>
          </div>

          <div className="border-t border-[#E4E2DE] pt-9">
            {/* DIRECTORY HEADER */}

            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h3 className="font-heading text-xl font-bold tracking-[-0.025em] sm:text-2xl">
                  Professional Visitor Categories
                </h3>

                <p className="mt-2 text-sm leading-7 text-muted">
                  Industry professionals, buyers and organisations
                  relevant to the exhibition.
                </p>
              </div>

             
            </div>

            {/* PROFILE CARDS */}

            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {visitorProfile.map((item, index) => (
                <li key={`${item.name}-${index}`} className="min-w-0">
                  <article className="flex h-full min-h-[235px] flex-col rounded-card border border-[#E4E2DE] bg-surface p-6 transition-colors duration-200 hover:border-brand-red/35 sm:p-7 lg:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-md bg-background text-brand-red">
                        <UsersRound
                          aria-hidden="true"
                          className="h-5 w-5"
                          strokeWidth={1.8}
                        />
                      </span>

                      
                    </div>

                    <h4 className="mt-7 font-heading text-lg font-bold leading-snug tracking-[-0.025em] sm:text-xl">
                      {item.name}
                    </h4>

                    <p className="mt-3 text-sm leading-[1.8] text-muted">
                      {item.description}
                    </p>

                    <div aria-hidden="true" className="mt-auto pt-8">
                      <div className="h-px bg-[#E4E2DE]" />
                      <div className="mt-4 h-0.5 w-7 bg-brand-red" />
                    </div>
                  </article>
                </li>
              ))}
            </ul>

         
          </div>

          
        </Container>
      </section>

      {/* REGISTRATION NEXT STEPS */}

      <section
        id="visitor-profile-registration"
        aria-labelledby="registration-heading"
        className="border-t border-[#E4E2DE] bg-surface py-16 text-foreground sm:py-20 lg:py-24"
      >
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
            <div className="max-w-[720px]">
              <div className="mb-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-7 bg-brand-red"
                />

                <p className="font-heading text-xs font-bold uppercase tracking-[0.15em] text-brand-red">
                  Visit in 2027
                </p>
              </div>

              <h2
                id="registration-heading"
                className="font-heading text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.2] tracking-[-0.035em]"
              >
                Planning to attend
                <span className="text-brand-red">?</span>
              </h2>

              <p className="mt-5 max-w-[610px] text-sm leading-[1.8] text-muted sm:text-base">
                Explore visitor registration and practical information
                to prepare for {siteConfig.eventName} 2027.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={REGISTRATION_PATH}
                className={primaryButtonClass}
              >
                Register to Visit
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4"
                  strokeWidth={1.8}
                />
              </Link>

              <Link
                href={VISIT_PATH}
                className={secondaryButtonClass}
              >
                Visitor Information
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
