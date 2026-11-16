
"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  MapPin,
} from "lucide-react";

import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from "framer-motion";

import { Container } from "@/components/ui/container";

/* --------------------------------------------------
   INDIA BATTERY INTERNATIONAL SHOW

   Component: Event Overview
   Design: Hybrid Industrial Editorial

   DESIGN
   - White editorial background
   - 52 / 48 desktop split
   - Real exhibition photography
   - Charcoal typography
   - Restrained red accents
   - Minimal green checkmarks
   - 10px image radius
   - Responsive editorial layout

   PERFORMANCE
   - Optimized Next.js Image
   - Lazy-loaded below-the-fold image
   - No continuous animations
   - No extra animation dependencies
   - Static text visible immediately

   SEO
   - Semantic section and heading
   - Descriptive internal link
   - Meaningful image alt text
   - Crawlable event information
-------------------------------------------------- */

/*
  Required image:
  public/images/about/exhibition-overview.webp

  Use an authentic, licensed exhibition photo.

  Recommended:
  - 1400 x 1100 px
  - WebP or AVIF
  - Natural lighting
  - Real exhibition participants
  - Subject centered or slightly right
*/

const OVERVIEW_IMAGE =
  "/logo/about-sec.webp";

/*
  Event details supplied for 2027.

  Keep synchronized with siteConfig
  and Event JSON-LD.
*/

const eventDetails = {
  name: "India Battery International Show",
  edition: "2nd Edition",
  dates: "14–16 October 2027",
  visitorHours: "10:00 AM – 6:00 PM IST",
  venue: "Auto Cluster Exhibition Centre",
  city: "Pune, India",
} as const;

/*
  Industry focus areas.

  These are preserved from the
  original component.
*/

const focusAreas = [
  "Battery cells & packs",
  "Manufacturing & testing",
  "Energy storage systems",
  "Recycling & second-life solutions",
] as const;

/*
  Motion configuration.

  Restrained animation for a small
  decorative element only.
*/

const EASE = [0.22, 1, 0.36, 1] as const;

export function EventOverview() {
  const reduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="about-the-show"
        aria-labelledby="event-overview-heading"
        className={[
          "relative isolate",
          "overflow-hidden",
          "bg-surface",
          "text-foreground",
          "py-16",
          "sm:py-20",
          "lg:py-24",
          "xl:py-28",
        ].join(" ")}
      >
        <Container>
          {/* ---------------------------------------
              MAIN EDITORIAL GRID

              Mobile: stacked
              Desktop: 52% / 48%
          --------------------------------------- */}

          <div
            className={[
              "grid",
              "grid-cols-1",
              "items-center",
              "gap-12",
              "lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)]",
              "lg:gap-14",
              "xl:gap-20",
            ].join(" ")}
          >
            {/* -----------------------------------
                LEFT: EDITORIAL CONTENT
            ----------------------------------- */}

            <div className="min-w-0">
              {/* Eyebrow */}

              <div className="mb-6 flex items-center gap-3">
                <m.span
                  aria-hidden="true"
                  className="h-[2px] w-7 shrink-0 origin-left bg-brand-red"
                  initial={
                    reduceMotion
                      ? false
                      : { scaleX: 0.5 }
                  }
                  whileInView={{ scaleX: 1 }}
                  viewport={{
                    once: true,
                    amount: 0.6,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.5,
                    ease: EASE,
                  }}
                />

                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.15em] text-brand-red sm:text-xs">
                  About the Show
                </p>
              </div>

              {/* Main Heading */}

              <h2
                id="event-overview-heading"
                className={[
                  "max-w-[680px]",
                  "font-heading",
                  "text-[clamp(2rem,3.5vw,3rem)]",
                  "font-bold",
                  "leading-[1.15]",
                  "tracking-[-0.04em]",
                  "text-foreground",
                  "[text-wrap:balance]",
                ].join(" ")}
              >
                Where the battery
                <span className="block">
                  industry connects
                  <span className="text-brand-red">
                    .
                  </span>
                </span>
              </h2>

              {/* Main description */}

              <div className="mt-7 max-w-[585px] space-y-4">
                <p className="font-body text-[15px] leading-[1.8] text-muted sm:text-base sm:leading-[1.8]">
                  The 2nd India Battery International
                  Show brings together battery
                  manufacturers, cell makers, pack
                  integrators, component suppliers
                  and research organisations at
                  Auto Cluster Exhibition Centre
                  in Pune, India.
                </p>

                <p className="font-body text-[15px] leading-[1.8] text-muted sm:text-base sm:leading-[1.8]">
                  The exhibition connects businesses
                  across battery technology,
                  manufacturing, energy storage
                  and recycling, supporting
                  collaboration and new opportunities
                  in electric mobility, renewable
                  energy and industrial applications.
                </p>
              </div>

              {/* -----------------------------------
                  INDUSTRY FOCUS AREAS
              ----------------------------------- */}

              <div className="mt-9 border-t border-border pt-7">
                <h3 className="font-heading text-sm font-bold tracking-[-0.01em] text-foreground">
                  Key Industry Focus Areas
                </h3>

                <ul className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                  {focusAreas.map((area) => (
                    <li
                      key={area}
                      className="flex items-start gap-3"
                    >
                      <span
                        aria-hidden="true"
                        className={[
                          "mt-0.5",
                          "flex h-5 w-5",
                          "shrink-0",
                          "items-center justify-center",
                          "rounded",
                          "bg-brand-green/10",
                          "text-brand-green",
                        ].join(" ")}
                      >
                        <Check
                          className="h-3.5 w-3.5"
                          strokeWidth={2}
                        />
                      </span>

                      <span className="font-body text-[13px] font-medium leading-[1.65] text-foreground sm:text-sm">
                        {area}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* -----------------------------------
                  PRIMARY SECTION CTA
              ----------------------------------- */}

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Link
                  href="/about"
                  className={[
                    "group inline-flex",
                    "min-h-12",
                    "items-center justify-center",
                    "gap-2.5",
                    "rounded-button",
                    "bg-surface-dark",
                    "px-6 py-3",
                    "font-heading",
                    "text-sm font-bold",
                    "text-white",
                    "transition-colors",
                    "duration-200",
                    "hover:bg-brand-red",
                    "focus-visible:outline-2",
                    "focus-visible:outline-offset-2",
                    "focus-visible:outline-brand-red",
                  ].join(" ")}
                >
                  Explore the Show

                  <ArrowUpRight
                    aria-hidden="true"
                    className={[
                      "h-4 w-4",
                      "transition-transform",
                      "duration-200",
                      "group-hover:-translate-y-0.5",
                      "group-hover:translate-x-0.5",
                      "motion-reduce:transform-none",
                    ].join(" ")}
                    strokeWidth={1.8}
                  />
                </Link>
 
              </div>
            </div>

            {/* -----------------------------------
                RIGHT: PHOTO EDITORIAL PANEL
            ----------------------------------- */}

            <div className="min-w-0">
              {/* Image frame */}

              <figure
                className={[
                  "relative",
                  "overflow-hidden",
                  "rounded-image",
                  "bg-surface-muted",
                ].join(" ")}
              >
                <div
                  className={[
                    "relative",
                    "aspect-[5/4]",
                    "w-full",
                    "overflow-hidden",
                    "sm:aspect-[4/3]",
                    "lg:aspect-[5/6]",
                    "xl:aspect-[4/5]",
                  ].join(" ")}
                >
                  <Image
                    src={OVERVIEW_IMAGE}
                    alt="Battery industry professionals and exhibitors connecting at a trade exhibition"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 45vw"
                    quality={80}
                    className="object-cover object-center"
                  />

                  {/* Minimal image gradient for caption */}

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/65 to-transparent"
                  />

                  {/* Editorial caption */}

                  <figcaption className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-5 sm:px-7 sm:pb-7">
                    <div className="flex items-end justify-between gap-4">
                      <div className="max-w-[320px]">
                        <p className="font-heading text-sm font-bold leading-[1.45] text-white sm:text-base">
                          Connecting the Battery
                          Industry
                        </p>

                        <p className="mt-1 font-body text-xs leading-[1.6] text-white/80">
                          Technology · Manufacturing ·
                          Business
                        </p>
                      </div>

                      <span
                        aria-hidden="true"
                        className="h-1 w-8 shrink-0 rounded-sm bg-brand-red"
                      />
                    </div>
                  </figcaption>
                </div>
              </figure>

              {/* -----------------------------------
                  EVENT INFORMATION STRIP
              ----------------------------------- */}

              <div className="mt-4 overflow-hidden rounded-image border border-border bg-background">
                <div className="grid gap-0 sm:grid-cols-2">
                  {/* Event Dates */}

                  <div className="flex items-start gap-3 border-b border-border px-5 py-5 sm:border-r sm:py-6">
                    <CalendarDays
                      className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-red"
                      aria-hidden="true"
                      strokeWidth={1.8}
                    />

                    <div>
                      <p className="font-body text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                        Event Dates
                      </p>

                      <p className="mt-1.5 font-heading text-[13px] font-bold leading-[1.5] text-foreground">
                        {eventDetails.dates}
                      </p>
                    </div>
                  </div>

                  {/* Visitor Hours */}

                  <div className="flex items-start gap-3 border-b border-border px-5 py-5 sm:py-6">
                    <Clock3
                      className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-red"
                      aria-hidden="true"
                      strokeWidth={1.8}
                    />

                    <div>
                      <p className="font-body text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                        Visitor Hours
                      </p>

                      <p className="mt-1.5 font-heading text-[13px] font-bold leading-[1.5] text-foreground">
                        {eventDetails.visitorHours}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Venue */}

                <div className="flex items-start gap-3 px-5 py-5 sm:px-6">
                  <MapPin
                    className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-red"
                    aria-hidden="true"
                    strokeWidth={1.8}
                  />

                  <div className="min-w-0">
                    <p className="font-body text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                      Exhibition Venue
                    </p>

                    <p className="mt-1.5 font-heading text-[13px] font-bold leading-[1.5] text-foreground sm:text-sm">
                      {eventDetails.venue}
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      {eventDetails.city}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </LazyMotion>
  );
}
