
import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  Building2,
  Factory,
  MapPin,
  Route,
  UsersRound,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { whyPunePoints } from "@/lib/content/home-content";

/* --------------------------------------------------
   INDIA BATTERY INTERNATIONAL SHOW

   Component: WhyPuneSection
   Design: Hybrid Industrial Editorial

   PURPOSE
   - Explain Pune's industrial relevance
   - Highlight automotive manufacturing
   - Showcase engineering capabilities
   - Support battery ecosystem positioning

   DESIGN
   - Warm off-white background
   - Editorial two-column layout
   - Authentic exhibition photography
   - Minimal red accents
   - Structured industry highlights
   - Small, consistent border radii

   PERFORMANCE
   - Server Component
   - Zero animation JavaScript
   - Optimized Next.js image
   - Semantic HTML
-------------------------------------------------- */

const INDUSTRY_IMAGE =
  "/images/expo-ev-powertrain-demo.jpg";

const icons = [
  Factory,
  Route,
  Building2,
  UsersRound,
] as const;

const EVENT_VENUE = {
  name: "Auto Cluster Exhibition Centre",
  city: "Pune",
  state: "Maharashtra",
  country: "India",
} as const;

const DIRECTIONS_QUERY = [
  EVENT_VENUE.name,
  EVENT_VENUE.city,
  EVENT_VENUE.state,
  EVENT_VENUE.country,
].join(", ");

const DIRECTIONS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(DIRECTIONS_QUERY);

export function WhyPuneSection() {
  return (
    <section
      id="why-pune"
      aria-labelledby="why-pune-heading"
      className={[
        "relative isolate",
        "overflow-hidden",
        "bg-background",
        "text-foreground",
        "py-16",
        "sm:py-20",
        "lg:py-24",
        "xl:py-28",
      ].join(" ")}
    >
      <Container>
        {/* -----------------------------------
            MAIN EDITORIAL CONTENT
        ----------------------------------- */}

        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-20">

          {/* LEFT: LOCATION STORY */}

          <div className="min-w-0 lg:pt-3">
            {/* Eyebrow */}

            <div className="mb-6 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-0.5 w-7 shrink-0 bg-brand-red"
              />

              <p className="font-heading text-[11px] font-bold uppercase tracking-[0.15em] text-brand-red sm:text-xs">
                Why Pune
              </p>
            </div>

            {/* Heading */}

            <h2
              id="why-pune-heading"
              className={[
                "max-w-[620px]",
                "font-heading",
                "text-[clamp(2rem,3.5vw,3rem)]",
                "font-bold",
                "leading-[1.15]",
                "tracking-[-0.04em]",
                "text-foreground",
                "[text-wrap:balance]",
              ].join(" ")}
            >
              An industrial ecosystem
              <span className="block">
                built for innovation
                <span className="text-brand-red">.</span>
              </span>
            </h2>

            {/* Description */}

            <div className="mt-7 max-w-[580px] space-y-4 font-body text-[15px] leading-[1.8] text-muted sm:text-base">
              <p>
                Pune is an established centre for
                automotive production, engineering
                and industrial manufacturing.
                Its ecosystem includes vehicle
                manufacturers, component suppliers,
                technology companies and research
                institutions.
              </p>

              <p>
                This industrial foundation makes
                Pune a relevant destination for
                companies working across battery
                manufacturing, electric mobility,
                energy storage and related
                technologies.
              </p>

              <p>
                For exhibitors and visitors,
                the city offers opportunities
                to engage with manufacturers,
                technology providers and
                professionals operating across
                interconnected industries.
              </p>
            </div>

            {/* -----------------------------------
                VENUE REFERENCE
            ----------------------------------- */}

            <div className="mt-9 max-w-[570px] border-t border-[#E4E2DE] pt-7">
              <div className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-brand-red"
                >
                  <MapPin
                    className="h-5 w-5"
                    strokeWidth={1.8}
                  />
                </span>

                <div className="min-w-0">
                  <p className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                    2027 Exhibition Venue
                  </p>

                  <h3 className="mt-2 font-heading text-base font-bold leading-[1.5] text-foreground">
                    {EVENT_VENUE.name}
                  </h3>

                  <p className="mt-1 font-body text-sm leading-[1.7] text-muted">
                    {EVENT_VENUE.city},{" "}
                    {EVENT_VENUE.state},{" "}
                    {EVENT_VENUE.country}
                  </p>

                  <a
                    href={DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-4 inline-flex items-center gap-2 font-heading text-sm font-bold text-brand-red transition-colors duration-200 hover:text-brand-red-hover focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
                  >
                    View Venue Location

                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
                      strokeWidth={1.8}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: INDUSTRY VISUAL AND POINTS */}

          <div className="min-w-0">
            {/* Industrial photography */}

            <figure className="min-w-0">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[10px] bg-[#24272D] sm:aspect-[16/9] lg:aspect-[16/10]">
                <Image
                  src={INDUSTRY_IMAGE}
                  alt="Electric vehicle powertrain and battery technology displayed at an industrial exhibition"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 50vw"
                  quality={80}
                  className="object-cover object-center"
                />

                {/* Caption contrast */}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/75 to-transparent"
                />

                <figcaption className="absolute inset-x-0 bottom-0 px-5 pb-5 sm:px-7 sm:pb-7">
                  <p className="font-heading text-sm font-bold leading-[1.5] text-white sm:text-base">
                    Manufacturing & Mobility
                  </p>

                  <p className="mt-1 font-body text-xs leading-[1.7] text-white/80">
                    Industrial technology and battery applications
                  </p>
                </figcaption>
              </div>
            </figure>

            {/* -----------------------------------
                INDUSTRY HIGHLIGHTS

                Content comes from:
                @/lib/content/home-content
            ----------------------------------- */}

            <div className="mt-5 overflow-hidden rounded-card border border-[#E4E2DE] bg-surface">
              <ul className="grid sm:grid-cols-2">
                {whyPunePoints.map((point, index) => {
                  const Icon = icons[index % icons.length];

                  return (
                    <li
                      key={`${point.title}-${index}`}
                      className={[
                        "min-w-0",
                        "border-b border-[#E4E2DE]",
                        "p-5 sm:p-6",
                        "last:border-b-0",
                        index % 2 === 0
                          ? "sm:border-r"
                          : "",
                        index >= 2
                          ? "sm:border-t"
                          : "",
                      ].join(" ")}
                    >
                      {/* Icon and index */}

                      <div className="mb-5 flex items-start justify-between gap-3">
                        <span
                          aria-hidden="true"
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-background text-brand-red"
                        >
                          <Icon
                            className="h-5 w-5"
                            strokeWidth={1.8}
                          />
                        </span>

                       
                      </div>

                      {/* Title */}

                      <h3 className="font-heading text-[15px] font-bold leading-[1.4] tracking-[-0.02em] text-foreground sm:text-base">
                        {point.title}
                      </h3>

                      {/* Description */}

                      <p className="mt-2 font-body text-[13px] leading-[1.75] text-muted sm:text-sm">
                        {point.description}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>

          

           
          </div>
        </div>
      </Container>
    </section>
  );
}
