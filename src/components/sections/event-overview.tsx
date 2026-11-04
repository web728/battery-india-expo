"use client";

import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/container";

const EASE = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

const focusAreas = [
  "Battery cells & packs",
  "Manufacturing & testing",
  "Energy storage systems",
  "Recycling & second-life solutions",
] as const;

/** An original vector illustration built into the component (no asset dependency). */
function BatteryArtwork({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <svg
      viewBox="0 0 620 590"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      aria-hidden="true"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="ev-cell-body" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#34383D" />
          <stop offset="0.45" stopColor="#17191D" />
          <stop offset="1" stopColor="#090A0D" />
        </linearGradient>
        <linearGradient id="ev-cell-edge" x1="0" x2="1">
          <stop stopColor="#ED3138" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ED3138" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="ev-circuit" x1="0" x2="1">
          <stop stopColor="#ED3138" stopOpacity="0.02" />
          <stop offset="0.65" stopColor="#ED3138" stopOpacity="0.7" />
          <stop offset="1" stopColor="#ED3138" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {/* Subtle engineering circuit paths */}
      <g stroke="url(#ev-circuit)" strokeWidth="1.5" strokeLinecap="round" opacity="0.75">
        <path d="M22 112H170L216 158H267" />
        <path d="M8 169H112L171 228H267" />
        <path d="M25 468H166L220 412H267" />
        <path d="M352 157H431L475 112H606" />
        <path d="M352 413H449L508 466H606" />
        <path d="M381 300H476L519 256H607" />
      </g>
      <g fill="#ED3138" opacity="0.78">
        <circle cx="22" cy="112" r="3" />
        <circle cx="8" cy="169" r="3" />
        <circle cx="25" cy="468" r="3" />
        <circle cx="606" cy="112" r="3" />
        <circle cx="606" cy="466" r="3" />
        <circle cx="607" cy="256" r="3" />
      </g>

      {/* Battery cell — restrained industrial diagram, not a stock graphic */}
      <g transform="translate(196 102)">
        <rect x="39" y="30" width="181" height="347" rx="27" fill="#060608" stroke="#555962" strokeOpacity="0.35" strokeWidth="2" />
        <rect x="47" y="38" width="165" height="331" rx="22" fill="url(#ev-cell-body)" stroke="url(#ev-cell-edge)" strokeWidth="2.5" />
        <path d="M75 51V357" stroke="#FFFFFF" strokeOpacity="0.12" strokeWidth="3" />
        <path d="M194 56V351" stroke="#FFFFFF" strokeOpacity="0.07" strokeWidth="2" />
        <rect x="99" y="15" width="65" height="26" rx="9" fill="#34363C" stroke="#686A72" strokeOpacity="0.8" />
        <rect x="116" y="0" width="31" height="20" rx="6" fill="#777A82" />
        <rect x="118" y="3" width="27" height="9" rx="4" fill="#B9BBC1" opacity="0.5" />
        <path d="M154 116L111 212H157L128 290L190 191H146L181 116H154Z" fill="#ED3138" />
        <path d="M155 125L122 207H166" stroke="#FF9C9E" strokeWidth="3" strokeOpacity="0.55" strokeLinecap="round" />
        <rect x="78" y="315" width="103" height="1.5" rx="0.75" fill="#FFFFFF" opacity="0.12" />
        <text x="129" y="340" fontSize="11" fontWeight="700" textAnchor="middle" fill="#B5B7BC" letterSpacing="3">BATTERY</text>
      </g>

      {/* One restrained moving scan line; disabled for reduced-motion users */}
      {!reduceMotion && (
        <m.path
          d="M229 221H443"
          stroke="#ED3138"
          strokeOpacity="0.7"
          strokeWidth="1"
          strokeDasharray="7 8"
          initial={{ opacity: 0.15, y: -58 }}
          animate={{ opacity: [0.15, 0.6, 0.15], y: [-58, 155, -58] }}
          transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
        />
      )}
      <text x="38" y="548" fontSize="11" letterSpacing="3" fill="#FFFFFF" opacity="0.35">PRODUCTION  /  PROCESSING  /  PRODUCTS</text>
    </svg>
  );
}

export function EventOverview() {
  const reduceMotion = Boolean(useReducedMotion());
  const enter = reduceMotion
    ? { initial: false as const }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.16 },
      };

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="about-the-show"
        aria-labelledby="event-overview-heading"
        className="relative isolate overflow-hidden bg-[#F5F5F4] py-16 text-[#18181B] sm:py-20 lg:py-24"
      >
        <Container>
          <div className="grid overflow-hidden rounded-[12px] bg-white shadow-[0_18px_65px_rgba(15,15,18,0.055)] lg:grid-cols-[1.05fr_0.95fr]">
            {/* Copy */}
            <m.div
              {...enter}
              variants={reveal}
              className="flex flex-col px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14 xl:px-16"
            >
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#13A853]" aria-hidden="true" />
                <span className="font-heading text-[11px] font-extrabold uppercase tracking-[0.17em] text-[#C52A31]">
                  About the show
                </span>
              </div>

              <h2
                id="event-overview-heading"
                className="mt-5 max-w-[580px] font-heading text-[clamp(2rem,3.5vw,3.65rem)] font-extrabold leading-[1.12] tracking-[-0.05em]"
              >
                Where the battery
                <span className="block text-[#ED3138]">industry connects.</span>
              </h2>

              <p className="mt-6 max-w-[535px] text-[15px] leading-[1.85] text-[#55565C] sm:text-base">
                The 2nd India Battery International Show brings together battery
                manufacturers, cell makers, pack integrators, component suppliers
                and R&amp;D organisations in Pune.
              </p>
              <p className="mt-3 max-w-[535px] text-[15px] leading-[1.85] text-[#55565C] sm:text-base">
                The exhibition covers battery technologies and energy storage
                solutions for electric mobility, renewable energy and industrial
                applications.
              </p>

              <div className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {focusAreas.map((area) => (
                  <div key={area} className="flex items-start gap-2.5 text-[13px] font-semibold leading-5 text-[#29292E]">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#ED3138]" aria-hidden="true" />
                    {area}
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="group mt-8 inline-flex min-h-11 w-fit items-center gap-3 rounded-[5px] bg-[#18181B] px-5 text-sm font-bold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#ED3138] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED3138]"
              >
                Explore the show
                <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </m.div>

            {/* Dark graphic panel */}
            <div className="relative flex min-h-[410px] flex-col overflow-hidden bg-[#101114] text-white sm:min-h-[480px] lg:min-h-0">
              <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:44px_44px]" aria-hidden="true" />
              <m.div
                initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.85, ease: EASE }}
                className="relative flex min-h-[320px] flex-1 items-center justify-center px-4 pt-4 sm:min-h-[370px]"
              >
                <div className="w-full max-w-[580px]">
                  <BatteryArtwork reduceMotion={reduceMotion} />
                </div>
              </m.div>
              <div className="relative z-10 grid gap-3 border-t border-white/10 bg-[#141519] px-6 py-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-1 xl:grid-cols-2">
                <div className="flex items-start gap-2.5">
                  <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-[#ED3138]" aria-hidden="true" />
                  <span className="text-[13px] font-bold text-white">14–16 October 2027</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#ED3138]" aria-hidden="true" />
                  <span className="text-[12px] leading-5 text-white/75">
                    Auto Cluster Exhibition Centre, Pimpri-Chinchwad, Pune
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </LazyMotion>
  );
}
