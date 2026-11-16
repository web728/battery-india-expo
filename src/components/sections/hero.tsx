"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight, CalendarDays, Download, MapPin } from "lucide-react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";

import { TrackedLink } from "@/components/ui/tracked-link";
import { AnalyticsEvents } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Replace with a licensed, authentic photograph of your event or battery manufacturing.
 * Required file: public/images/hero/battery-manufacturing.webp
 * Suggested crop: 2000 x 1300+ px, subject on right, darker negative space on left.
 */
const HERO_IMAGE = "/images/batt.webp";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const venue = [
    siteConfig.venue.line1,
    siteConfig.venue.city,
    siteConfig.venue.state,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="home"
        aria-labelledby="home-hero-title"
        className="relative isolate flex min-h-[700px] flex-col overflow-hidden bg-surface-dark text-white max-lg:min-h-[660px] max-sm:min-h-[680px]"
      >
        {/* The fixed global header overlays this section. Keep its clearance in the layout. */}
        <div className="absolute inset-0 -z-20 bg-[#15191e]" aria-hidden="true">
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            fetchPriority="high"
            quality={82}
            sizes="100vw"
            className="object-cover object-[62%_center] max-lg:object-[65%_center]"
          />
        </div>

        {/* Restrained overlay: clear typography without neon/glow effects. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(18,21,26,0.97)_0%,rgba(18,21,26,0.90)_35%,rgba(18,21,26,0.56)_69%,rgba(18,21,26,0.38)_100%)] max-lg:bg-[linear-gradient(90deg,rgba(18,21,26,0.95)_0%,rgba(18,21,26,0.78)_65%,rgba(18,21,26,0.58)_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-surface-dark/90 to-transparent"
        />

        <div className="relative mx-auto flex w-full max-w-[1320px] flex-1 flex-col justify-center px-4 pb-14 pt-32 sm:px-6 sm:pb-16 sm:pt-36 lg:px-10 lg:pb-20 lg:pt-40 xl:px-12">
          <div className="max-w-[780px]">
            <div className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.15em] sm:text-xs">
              <span className="inline-flex items-center gap-2 text-white/75">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green" aria-hidden="true" />
                India International Battery Show
              </span>
              <span className="hidden h-3 w-px bg-white/30 sm:block" aria-hidden="true" />
              <span className="text-white/60">2027 Edition</span>
            </div>

            {/* Never hide the LCP-critical headline behind client-side animation. */}
            <h1
              id="home-hero-title"
              className="max-w-[760px] font-heading text-[clamp(2.5rem,5.15vw,4.75rem)] font-extrabold leading-[1.075] tracking-[-0.045em] text-white [text-wrap:balance]"
            >
              Built for the <span className="text-[#f36a70]">Battery</span> Industry.
            </h1>

            <p className="mt-6 max-w-[585px] font-body text-[15px] leading-[1.75] text-white/75 sm:text-[17px]">
              Production. Processing. Products. Connect with battery
              manufacturers, component suppliers and technology leaders
              shaping the future of energy storage.
            </p>

            <div className="mt-8 flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7 sm:gap-y-4">
              <span className="inline-flex items-center gap-2.5 font-semibold text-white">
                <CalendarDays className="h-[18px] w-[18px] shrink-0 text-[#f36a70]" aria-hidden="true" />
                {siteConfig.dates.display}
              </span>
              <span className="inline-flex items-start gap-2.5 text-white/80">
                <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#f36a70]" aria-hidden="true" />
                <span>{venue}</span>
              </span>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <TrackedLink
                href="/exhibit/book-a-stand"
                event={AnalyticsEvents.BOOK_STAND_CLICK}
                params={{ source: "hero" }}
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-button bg-brand-red px-6 py-3 font-heading text-sm font-bold text-white transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-brand-red-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transform-none"
              >
                Book a Stand
                <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" />
              </TrackedLink>

              <TrackedLink
                href="/visit/register"
                event={AnalyticsEvents.REGISTER_VISIT_CLICK}
                params={{ source: "hero" }}
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-button border border-white/45 bg-white/[0.04] px-6 py-3 font-heading text-sm font-bold text-white transition-[background-color,border-color] duration-200 hover:border-white/80 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Register to Visit
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </TrackedLink>

              <TrackedLink
                href="/downloads/BATTERY-BROCHURE.pdf"
                download
                event={AnalyticsEvents.BROCHURE_DOWNLOAD}
                params={{ source: "hero" }}
                className="inline-flex min-h-12 items-center justify-center gap-2 px-3 py-2 font-body text-sm font-semibold text-white/75 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:justify-start"
              >
                <Download aria-hidden="true" className="h-4 w-4" />
                Download Brochure
              </TrackedLink>
            </div>
          </div>

        
        </div>

        {/* A single understated Motion accent — no animated background. */}
        <m.div
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-[3px] w-32 origin-left bg-brand-red"
          initial={reduceMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.7, ease }}
        />
      </section>
    </LazyMotion>
  );
}
