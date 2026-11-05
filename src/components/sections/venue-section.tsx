"use client";

import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Navigation } from "lucide-react";

import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease,
    },
  },
};

export function VenueSection() {
  const reduceMotion = useReducedMotion();

  const venueName = siteConfig.venue.name || "Auto Cluster Exhibition Centre";

  const venueAddress =
    siteConfig.venue.full ||
    "Auto Cluster Exhibition Centre, Chinchwad, Pimpri-Chinchwad, Pune, Maharashtra";

  const mapQuery =
    siteConfig.venue.mapQuery ||
    "Auto Cluster Exhibition Centre, Chinchwad, Pune, Maharashtra";

  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    mapQuery,
  )}&output=embed`;

  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    mapQuery,
  )}`;

  const motionProps = {
    initial: reduceMotion ? false : "hidden",
    whileInView: "visible",
    viewport: {
      once: true,
      amount: 0.15,
    },
  } as const;

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="exhibition-venue"
        aria-labelledby="venue-heading"
        className="relative bg-white py-14 text-[#19191c] sm:py-16 lg:py-20"
      >
        <Container>
          {/* Section heading */}
          <m.div
            {...motionProps}
            variants={reveal}
            className="mb-8 max-w-2xl sm:mb-10"
          >
            <div className="mb-4 flex items-center gap-3">
              <span aria-hidden="true" className="h-[2px] w-7 bg-[#ed3138]" />

              <span className="font-heading text-[11px] font-bold uppercase tracking-[0.17em] text-[#d52d35]">
                Exhibition Venue
              </span>
            </div>

            <h2
              id="venue-heading"
              className="font-heading text-[clamp(1.8rem,3.3vw,2.85rem)] font-extrabold leading-tight tracking-[-0.045em] text-[#19191c]"
            >
              Find us in <span className="text-[#ed3138]">Pune.</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-[#6b6b70] sm:text-[15px]">
              India International Battery Show 2027 will take place at Auto
              Cluster Exhibition Centre in Pimpri-Chinchwad, Pune.
            </p>
          </m.div>

          {/* Venue information and map */}
          <div className="grid items-stretch gap-5 lg:grid-cols-[0.83fr_1.17fr] lg:gap-7">
            {/* Left information panel */}
            <m.div
              {...motionProps}
              variants={reveal}
              className="flex min-w-0 flex-col justify-between rounded-xl border border-[#e9e8e5] bg-[#faf9f7] p-6 sm:p-8 lg:p-9"
            >
              <div>
                <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-lg bg-[#fcebec] text-[#d52d35]">
                  <MapPin
                    className="h-5 w-5"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </div>

                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-[#a15358]">
                  Location
                </p>

                <h3 className="mt-3 max-w-sm font-heading text-[clamp(1.4rem,2vw,1.85rem)] font-bold leading-snug tracking-[-0.035em] text-[#202024]">
                  {venueName}
                </h3>

                <address className="mt-3 max-w-sm not-italic text-[14px] leading-7 text-[#66666b] sm:text-[15px]">
                  {venueAddress}
                </address>

                <div className="mt-7 border-t border-[#e5e2de] pt-6">
                  <div className="flex items-start gap-3">
                    <CalendarDays
                      className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#d52d35]"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />

                    <div>
                      <p className="font-heading text-[12px] font-bold text-[#29292d]">
                        Exhibition Dates
                      </p>

                      <p className="mt-1 text-sm text-[#66666b]">
                        14–16 October 2027
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#ed3138] px-5 py-3 font-heading text-[13px] font-bold text-white transition-colors duration-300 hover:bg-[#cb252d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ed3138]"
                >
                  <Navigation
                    className="h-4 w-4"
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                  Get Directions
                </a>

                <Link
                  href="/visit"
                  className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[#d9d7d3] bg-white px-5 py-3 font-heading text-[13px] font-bold text-[#29292d] transition-[border-color,color] duration-300 hover:border-[#ed3138] hover:text-[#d52d35] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ed3138]"
                >
                  Plan Your Visit
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </m.div>

            {/* Google Maps */}
            <m.div
              {...motionProps}
              variants={reveal}
              className="relative min-w-0 overflow-hidden rounded-xl border border-[#e9e8e5] bg-[#f1f0ed]"
            >
              <iframe
                title={`Google Map - ${venueName}, Pune`}
                src={mapEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[340px] w-full border-0 sm:h-[430px] lg:h-full lg:min-h-[450px]"
                allowFullScreen
              />
            </m.div>
          </div>

          {/* Simple location note */}
          <m.p
            {...motionProps}
            variants={reveal}
            className="mt-5 text-xs leading-6 text-[#85858a]"
          >
            Use the map above to view the venue location and directions. Travel
            and arrival arrangements should be checked before your visit.
          </m.p>
        </Container>
      </section>
    </LazyMotion>
  );
}
