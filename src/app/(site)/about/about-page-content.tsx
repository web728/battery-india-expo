
"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  MapPin,
  Check,
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

   Component: AboutPageContent
   Theme: Hybrid Industrial Editorial

   DESIGN:
   - White editorial layout
   - Premium two-column composition
   - Manrope headings + Inter body
   - Restrained red accents
   - Minimal green in focus-area indicators
   - Authentic exhibition photography
   - Structured event information

   PERFORMANCE:
   - Optimized Next.js Image
   - No heavy decorative backgrounds
   - No continuous animations
   - Content visible immediately
   - No additional component library
-------------------------------------------------- */

const EASE = [0.22, 1, 0.36, 1] as const;

const ABOUT_IMAGE =
  "/images/expo-vip-lounge-branding.jpg";

const focusAreas = [
  "Battery cells, modules and packs",
  "Battery manufacturing equipment",
  "Battery management systems",
  "Testing and quality assurance",
  "Energy storage technologies",
  "Battery recycling and second-life solutions",
] as const;

const eventDetails = {
  name: "2nd India Battery International Show",
  date: "14–16 October 2027",
  hours: "10:00 AM – 6:00 PM",
  timezone: "IST",
  venue: "Auto Cluster Exhibition Centre",
  city: "Pune, India",
} as const;

export function AboutPageContent() {
  const reduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="about-show"
        aria-labelledby="about-show-heading"
        className="relative isolate overflow-hidden bg-surface py-16 text-foreground sm:py-20 lg:py-24 xl:py-28"
      >
        <Container>
          {/* ---------------------------------------
              MAIN EDITORIAL GRID
          --------------------------------------- */}

          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-14 xl:gap-20">

            {/* LEFT: MAIN CONTENT */}

            <div className="min-w-0">
              {/* Section eyebrow */}

              <div className="mb-6 flex items-center gap-3">
                <m.span
                  aria-hidden="true"
                  className="h-0.5 w-7 shrink-0 origin-left bg-brand-red"
                  initial={
                    reduceMotion
                      ? false
                      : { scaleX: 0.55 }
                  }
                  whileInView={{ scaleX: 1 }}
                  viewport={{
                    once: true,
                    amount: 0.5,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.5,
                    ease: EASE,
                  }}
                />

                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.15em] text-brand-red sm:text-xs">
                  The Exhibition
                </p>
              </div>

              {/* Main heading */}

              <h2
                id="about-show-heading"
                className="max-w-[650px] font-heading text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-[-0.04em] text-foreground [text-wrap:balance]"
              >
                Connecting the
                <span className="block">
                  battery value chain
                  <span className="text-brand-red">.</span>
                </span>
              </h2>

              {/* Editorial description */}

              <div className="mt-7 max-w-[590px] space-y-4 font-body text-[15px] leading-[1.8] text-muted sm:text-base">
                <p>
                 2nd India Battery International Show is
                  a trade exhibition dedicated to
                  battery technology, manufacturing
                  and energy storage. It brings
                  together battery manufacturers,
                  cell producers, pack integrators,
                  component suppliers and research
                  organisations.
                </p>

                <p>
                  The exhibition covers the
                  technologies, equipment and
                  solutions supporting the battery
                  value chain, including production,
                  battery management systems,
                  testing, recycling and energy
                  storage applications.
                </p>

                <p>
                  Through product showcases,
                  technical discussions and
                  industry networking, the show
                  provides opportunities to
                  exchange knowledge, explore
                  technology and build business
                  relationships across electric
                  mobility, renewable energy
                  and industrial markets.
                </p>
              </div>

              {/* -----------------------------------
                  INDUSTRY FOCUS AREAS
              ----------------------------------- */}

              <div className="mt-9 border-t border-border pt-7">
                <h3 className="font-heading text-lg font-bold tracking-[-0.02em] text-foreground">
                  Industry Focus Areas
                </h3>

                <ul className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                  {focusAreas.map((area) => (
                    <li
                      key={area}
                      className="flex items-start gap-3"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-brand-green/10 text-brand-green"
                      >
                        <Check
                          className="h-3.5 w-3.5"
                          strokeWidth={2}
                        />
                      </span>

                      <span className="font-body text-sm font-medium leading-[1.6] text-foreground">
                        {area}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contextual navigation */}

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Link
                  href="/exhibit/categories"
                  className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-button bg-surface-dark px-6 py-3 font-heading text-sm font-bold text-white transition-colors duration-200 hover:bg-brand-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                >
                  Explore Exhibition Categories

                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
                    strokeWidth={1.8}
                  />
                </Link>
              </div>
            </div>

            {/* -----------------------------------
                RIGHT: REAL EXHIBITION IMAGE
            ----------------------------------- */}

            <figure className="min-w-0">
              <div className="relative aspect-[5/4] overflow-hidden rounded-image bg-surface-muted sm:aspect-[4/3] lg:aspect-[4/5]">
                <Image
                  src={ABOUT_IMAGE}
                  alt="Industry professionals and exhibition participants at a battery industry trade show"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 44vw"
                  quality={80}
                  className="object-cover object-center"
                />

                {/* Subtle caption gradient */}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent"
                />

                {/* Editorial photo caption */}

                <figcaption className="absolute inset-x-0 bottom-0 px-5 pb-5 sm:px-7 sm:pb-7">
                  <p className="font-heading text-sm font-bold leading-[1.5] text-white sm:text-base">
                    Connecting Industry.
                    Advancing Technology.
                  </p>

                  <p className="mt-1 font-body text-xs leading-relaxed text-white/80">
                    Battery manufacturing · Technology · Business
                  </p>
                </figcaption>
              </div>

            
            </figure>
          </div>

          {/* ---------------------------------------
              EVENT INFORMATION

              Clean and integrated editorial strip.
              No excessive cards or gradients.
          --------------------------------------- */}

          <div className="mt-16 border-y border-border py-8 sm:mt-20 sm:py-10 lg:mt-24">
            <div className="grid gap-8 sm:grid-cols-3 sm:gap-0">

              {/* Date */}

              <div className="flex items-start gap-3 sm:pr-6">
                <CalendarDays
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                  strokeWidth={1.8}
                />

                <div>
                  <p className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                    Event Dates
                  </p>

                  <p className="mt-2 font-heading text-sm font-bold leading-[1.5] text-foreground sm:text-base">
                    {eventDetails.date}
                  </p>
                </div>
              </div>

              {/* Visitor Hours */}

              <div className="flex items-start gap-3 sm:border-l sm:border-border sm:px-6 lg:px-10">
                <Clock3
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                  strokeWidth={1.8}
                />

                <div>
                  <p className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                    Visitor Hours
                  </p>

                  <p className="mt-2 font-heading text-sm font-bold leading-[1.5] text-foreground sm:text-base">
                    {eventDetails.hours}
                  </p>

                  <p className="mt-1 text-xs text-muted">
                    Indian Standard Time
                  </p>
                </div>
              </div>

              {/* Venue */}

              <div className="flex items-start gap-3 sm:border-l sm:border-border sm:pl-6 lg:pl-10">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                  strokeWidth={1.8}
                />

                <div>
                  <p className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                    Exhibition Venue
                  </p>

                  <p className="mt-2 font-heading text-sm font-bold leading-[1.5] text-foreground sm:text-base">
                    {eventDetails.venue}
                  </p>

                  <p className="mt-1 font-body text-xs text-muted">
                    {eventDetails.city}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </LazyMotion>
  );
}
