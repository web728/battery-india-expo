
import Link from "next/link";

import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  MapPin,
  Navigation,
  ExternalLink,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

/* --------------------------------------------------
   INDIA BATTERY INTERNATIONAL SHOW

   Component: VenueSection
   Theme: Hybrid Industrial Editorial

   PURPOSE
   - Show the exhibition venue
   - Display confirmed event dates
   - Display official visitor hours
   - Provide Google Maps directions
   - Help attendees plan their visit

   DESIGN
   - White editorial background
   - Charcoal text and restrained red accents
   - Warm off-white venue information panel
   - Balanced two-column layout
   - 10–12px corner radii
   - Professional map presentation

   PERFORMANCE
   - Server Component
   - No Framer Motion
   - No client-side React state
   - Lazy-loaded Google Maps iframe
   - No additional JavaScript dependencies
-------------------------------------------------- */

/* --------------------------------------------------
   CONFIRMED EVENT INFORMATION

   Keep these synchronized with siteConfig,
   Event JSON-LD, homepage and other pages.
-------------------------------------------------- */

const EVENT = {
  name: "India Battery International Show",
  dates: "14–16 October 2027",
  visitorHours: "10:00 AM – 6:00 PM",
  timezone: "Indian Standard Time",
} as const;

/* --------------------------------------------------
   VENUE INFORMATION

   Prefer central siteConfig data.
   Fallbacks match the confirmed venue.
-------------------------------------------------- */

const venueName =
  siteConfig.venue.name ||
  "Auto Cluster Exhibition Centre";

const venueAddress =
  siteConfig.venue.full ||
  "Auto Cluster Exhibition Centre, Chinchwad, Pimpri-Chinchwad, Pune, Maharashtra, India";

const venueCity =
  siteConfig.venue.city ||
  "Pune";

const venueState =
  siteConfig.venue.state ||
  "Maharashtra";

const mapQuery =
  siteConfig.venue.mapQuery ||
  "Auto Cluster Exhibition Centre, Chinchwad, Pune, Maharashtra, India";

/* --------------------------------------------------
   GOOGLE MAPS URLS
-------------------------------------------------- */

const encodedMapQuery = encodeURIComponent(mapQuery);

const mapEmbedSrc =
  `https://www.google.com/maps?q=${encodedMapQuery}&output=embed`;

const directionsHref =
  `https://www.google.com/maps/dir/?api=1&destination=${encodedMapQuery}`;

const mapsSearchHref =
  `https://www.google.com/maps/search/?api=1&query=${encodedMapQuery}`;

/* --------------------------------------------------
   COMPONENT
-------------------------------------------------- */

export function VenueSection() {
  return (
    <section
      id="exhibition-venue"
      aria-labelledby="venue-heading"
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
        {/* -----------------------------------
            SECTION INTRODUCTION
        ----------------------------------- */}

        <div className="mb-10 grid gap-5 lg:mb-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end lg:gap-12">
          {/* Left heading */}

          <div className="max-w-[740px]">
            <div className="mb-5 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-0.5 w-7 shrink-0 bg-brand-red"
              />

              <p className="font-heading text-[11px] font-bold uppercase tracking-[0.15em] text-brand-red sm:text-xs">
                Exhibition Venue
              </p>
            </div>

            <h2
              id="venue-heading"
              className={[
                "font-heading",
                "text-[clamp(2rem,3.5vw,3rem)]",
                "font-bold",
                "leading-[1.15]",
                "tracking-[-0.035em]",
                "text-foreground",
                "[text-wrap:balance]",
              ].join(" ")}
            >
              Find us in{" "}
              <span className="text-brand-red">
                Pune.
              </span>
            </h2>
          </div>

          {/* Supporting description */}

          <p className="max-w-[430px] font-body text-sm leading-[1.75] text-muted sm:text-base">
            Plan your visit to the{" "}
            {EVENT.name} at Auto Cluster
            Exhibition Centre, Pune.
            Find the venue, exhibition dates
            and visitor information below.
          </p>
        </div>

        {/* -----------------------------------
            SECTION DIVIDER
        ----------------------------------- */}

        <div
          aria-hidden="true"
          className="mb-8 h-px w-full bg-[#E4E2DE] sm:mb-10"
        />

        {/* -----------------------------------
            INFORMATION AND MAP GRID
        ----------------------------------- */}

        <div
          className={[
            "grid",
            "items-stretch",
            "gap-5",
            "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]",
            "lg:gap-6",
          ].join(" ")}
        >
          {/* -----------------------------------
              LEFT: VENUE INFORMATION
          ----------------------------------- */}

          <div
            className={[
              "flex min-w-0 flex-col",
              "justify-between",
              "rounded-card",
              "border border-[#E4E2DE]",
              "bg-background",
              "p-6",
              "sm:p-8",
              "lg:p-9",
            ].join(" ")}
          >
            <div>
              {/* Location icon */}

              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-brand-red"
              >
                <MapPin
                  className="h-6 w-6"
                  strokeWidth={1.8}
                />
              </span>

              {/* Venue name */}

              <div className="mt-7">
                <p className="font-body text-[11px] font-bold uppercase tracking-[0.12em] text-brand-red">
                  Official Exhibition Location
                </p>

                <h3
                  className={[
                    "mt-3",
                    "max-w-[400px]",
                    "font-heading",
                    "text-[clamp(1.5rem,2.5vw,2rem)]",
                    "font-bold",
                    "leading-[1.3]",
                    "tracking-[-0.03em]",
                    "text-foreground",
                  ].join(" ")}
                >
                  {venueName}
                </h3>

                <address className="mt-4 max-w-[390px] font-body text-sm not-italic leading-[1.8] text-muted sm:text-[15px]">
                  {venueAddress}
                </address>
              </div>

              {/* -----------------------------------
                  EVENT DATE AND HOURS
              ----------------------------------- */}

              <div className="mt-9 space-y-6 border-t border-[#E4E2DE] pt-7">
                {/* Date */}

                <div className="flex items-start gap-3.5">
                  <CalendarDays
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                    strokeWidth={1.8}
                  />

                  <div>
                    <p className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                      Exhibition Dates
                    </p>

                    <p className="mt-1.5 font-heading text-sm font-bold leading-[1.5] text-foreground sm:text-base">
                      {EVENT.dates}
                    </p>
                  </div>
                </div>

                {/* Visitor hours */}

                <div className="flex items-start gap-3.5">
                  <Clock3
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                    strokeWidth={1.8}
                  />

                  <div>
                    <p className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                      Visitor Hours
                    </p>

                    <p className="mt-1.5 font-heading text-sm font-bold leading-[1.5] text-foreground sm:text-base">
                      {EVENT.visitorHours}
                    </p>

                    <p className="mt-1 font-body text-xs leading-[1.6] text-muted">
                      {EVENT.timezone}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* -----------------------------------
                VENUE ACTIONS
            ----------------------------------- */}

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {/* Google Maps directions */}

              <a
                href={directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "group inline-flex",
                  "min-h-12",
                  "items-center justify-center",
                  "gap-2.5",
                  "rounded-button",
                  "bg-brand-red",
                  "px-6 py-3",
                  "font-heading text-sm font-bold",
                  "text-white",
                  "transition-colors duration-200",
                  "hover:bg-brand-red-hover",
                  "focus-visible:outline-2",
                  "focus-visible:outline-offset-2",
                  "focus-visible:outline-brand-red",
                ].join(" ")}
              >
                <Navigation
                  aria-hidden="true"
                  className="h-4 w-4"
                  strokeWidth={1.8}
                />

                Get Directions

                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
                  strokeWidth={1.8}
                />
              </a>

              {/* Visit planning page */}

              <Link
                href="/visit"
                className={[
                  "group inline-flex",
                  "min-h-12",
                  "items-center justify-center",
                  "gap-2.5",
                  "rounded-button",
                  "border border-[#D9D7D3]",
                  "bg-white",
                  "px-6 py-3",
                  "font-heading text-sm font-bold",
                  "text-foreground",
                  "transition-[border-color,color]",
                  "duration-200",
                  "hover:border-brand-red",
                  "hover:text-brand-red",
                  "focus-visible:outline-2",
                  "focus-visible:outline-offset-2",
                  "focus-visible:outline-brand-red",
                ].join(" ")}
              >
                Plan Your Visit

                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
                  strokeWidth={1.8}
                />
              </Link>
            </div>
          </div>

          {/* -----------------------------------
              RIGHT: GOOGLE MAPS
          ----------------------------------- */}

          <div
            className={[
              "relative",
              "flex min-w-0 flex-col",
              "overflow-hidden",
              "rounded-card",
              "border border-[#E4E2DE]",
              "bg-background",
            ].join(" ")}
          >
            {/* Map iframe */}

            <div className="relative min-h-[340px] flex-1 bg-[#E9E8E5] sm:min-h-[430px] lg:min-h-[520px]">
              <iframe
                title={`Google Maps location of ${venueName}, ${venueCity}`}
                src={mapEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 block h-full w-full border-0"
              />
            </div>

            {/* Map footer */}

            <div className="flex flex-col gap-3 border-t border-[#E4E2DE] bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-6">
              <div className="flex items-start gap-2.5">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-red"
                  strokeWidth={1.8}
                />

                <p className="font-body text-xs leading-[1.7] text-muted">
                  {venueName},{" "}
                  {venueCity},{" "}
                  {venueState}
                </p>
              </div>

              <a
                href={mapsSearchHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex shrink-0 items-center gap-2 font-heading text-xs font-bold text-brand-red transition-colors duration-200 hover:text-brand-red-hover focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
              >
                Open in Google Maps

                <ExternalLink
                  aria-hidden="true"
                  className="h-3.5 w-3.5"
                  strokeWidth={1.8}
                />
              </a>
            </div>
          </div>
        </div>

     
      </Container>
    </section>
  );
}