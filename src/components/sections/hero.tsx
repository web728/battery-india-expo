"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, CalendarDays, Download, MapPin } from "lucide-react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { TrackedLink } from "@/components/ui/tracked-link";
import { siteConfig } from "@/lib/site-config";
import { AnalyticsEvents } from "@/lib/analytics";

const EVENT_START = new Date("2027-10-14T00:00:00+05:30").getTime();
const ease = [0.22, 1, 0.36, 1] as const;

type TimeLeft = { days: number; hours: number; mins: number; secs: number };

function getTimeLeft(): TimeLeft {
  const total = Math.max(0, Math.floor((EVENT_START - Date.now()) / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    mins: Math.floor((total % 3600) / 60),
    secs: total % 60,
  };
}

function Countdown() {
  const [time, setTime] = useState<TimeLeft | null>(null);
  useEffect(() => {
    const update = () => setTime(getTimeLeft());
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  const items = [
    { label: "DAYS", value: time?.days },
    { label: "HOURS", value: time?.hours },
    { label: "MINS", value: time?.mins },
    { label: "SECS", value: time?.secs },
  ];

  return (
    <div
      className="flex items-center gap-4 sm:gap-7"
      aria-label="Countdown to 14 October 2027"
    >
      {items.map(({ label, value }) => (
        <div key={label} className="min-w-[38px] text-center sm:min-w-[48px]">
          <div className="font-heading text-xl font-extrabold tabular-nums leading-none text-white sm:text-2xl">
            {value === undefined ? "--" : String(value).padStart(2, "0")}
          </div>
          <div className="mt-1.5 text-[9px] font-bold tracking-[0.16em] text-white/45">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Header in normal flow (including sticky): its height is already outside the hero.
 * Fixed/absolute header: hero needs top clearance inside itself.
 * This is measured on resize only, not scroll, so it cannot cause a scroll jump.
 */
function useHeaderSpacing() {
  const [spacing, setSpacing] = useState({ flow: 0, overlay: 0 });

  useEffect(() => {
    const header = document.querySelector<HTMLElement>("body header");
    if (!header) return;

    const update = () => {
      const position = window.getComputedStyle(header).position;
      const height = Math.ceil(header.getBoundingClientRect().height);
      const overlay = position === "fixed" || position === "absolute";
      setSpacing((previous) => {
        const next = {
          flow: overlay ? 0 : height,
          overlay: overlay ? height : 0,
        };
        return previous.flow === next.flow && previous.overlay === next.overlay
          ? previous
          : next;
      });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(header);
    window.addEventListener("resize", update, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return spacing;
}

/** Original inline SVG. No external file and no generated/stock hero illustration. */
function BatteryTechnicalArt() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 700 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="cell-face" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#292a2e" />
          <stop offset="1" stopColor="#101114" />
        </linearGradient>
        <linearGradient id="red-line" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#ED3138" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ED3138" stopOpacity="0.85" />
          <stop offset="1" stopColor="#ED3138" stopOpacity="0.05" />
        </linearGradient>
        <pattern
          id="tech-grid"
          width="36"
          height="36"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M36 0H0V36"
            stroke="#fff"
            strokeOpacity="0.055"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="700" height="600" fill="url(#tech-grid)" />
      <circle cx="352" cy="300" r="247" stroke="#fff" strokeOpacity="0.06" />
      <circle
        cx="352"
        cy="300"
        r="214"
        stroke="#ED3138"
        strokeOpacity="0.14"
        strokeDasharray="4 12"
      />
      <circle cx="352" cy="300" r="175" stroke="#fff" strokeOpacity="0.07" />
      <g stroke="url(#red-line)" strokeWidth="2">
        <path d="M0 182H118L162 226H258" />
        <path d="M700 416H573L532 375H449" />
        <path d="M26 474H165L204 435H278" />
        <path d="M686 128H560L520 168H450" />
      </g>
      <g fill="#ED3138">
        <circle cx="118" cy="182" r="4" />
        <circle cx="573" cy="416" r="4" />
        <circle cx="165" cy="474" r="4" />
        <circle cx="560" cy="128" r="4" />
      </g>
      <g transform="translate(174 165)">
        <rect
          x="10"
          y="24"
          width="340"
          height="252"
          rx="16"
          fill="#050506"
          stroke="#ED3138"
          strokeOpacity="0.5"
          strokeWidth="2"
        />
        <rect
          x="27"
          y="41"
          width="306"
          height="218"
          rx="9"
          fill="#141518"
          stroke="#55565c"
          strokeOpacity="0.6"
        />
        {Array.from({ length: 4 }, (_, row) =>
          Array.from({ length: 5 }, (_, col) => (
            <g
              key={`${row}-${col}`}
              transform={`translate(${40 + col * 57} ${54 + row * 48})`}
            >
              <rect
                width="48"
                height="39"
                rx="4"
                fill="url(#cell-face)"
                stroke="#77777d"
                strokeOpacity="0.35"
              />
              <rect
                x="7"
                y="7"
                width="34"
                height="3"
                rx="1.5"
                fill="#ED3138"
                opacity={row === 1 && col === 2 ? 0.9 : 0.35}
              />
              <path d="M8 26H40" stroke="#fff" strokeOpacity="0.1" />
            </g>
          )),
        )}
        <path
          d="M48 278H313"
          stroke="#ED3138"
          strokeOpacity="0.65"
          strokeWidth="3"
        />
        <path
          d="M62 16H146M214 16H300"
          stroke="#ED3138"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M178 8V24M170 16H186"
          stroke="#ED3138"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <text
        x="350"
        y="502"
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        letterSpacing="4"
        fill="#fff"
        opacity="0.35"
      >
        BATTERY TECHNOLOGY
      </text>
    </svg>
  );
}

export function Hero() {
  const reducedMotion = useReducedMotion();
  const { flow, overlay } = useHeaderSpacing();
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
        aria-labelledby="battery-hero-title"
        className="relative isolate flex w-full flex-col overflow-hidden bg-[#09090b] text-white"
        style={{
          // Extra 72px avoids the next section appearing prematurely on desktop.
          minHeight: `calc(100svh - ${flow}px + 72px)`,
          paddingTop: overlay ? `${overlay}px` : undefined,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_45%,rgba(237,49,56,0.095),transparent_47%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:72px_72px]"
          aria-hidden="true"
        />
        <m.div
          aria-hidden="true"
          initial={reducedMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease }}
          className="absolute left-0 top-0 z-10 h-[3px] w-[210px] origin-left bg-[#ED3138]"
        />

        <Container className="relative z-10 flex w-full flex-1 items-center py-14 sm:py-16 lg:py-[76px]">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] lg:gap-4">
            <m.div
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease }}
              className="relative z-10 max-w-[710px]"
            >
              <div className="mb-6 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em] sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-[#13A853]" />
                <span className="text-white/65">
                  India International Battery Show
                </span>
                <span className="h-3 w-px bg-white/25" />
                <span className="text-[#ED3138]">2nd Edition · 2027</span>
              </div>

              <h1
                id="battery-hero-title"
                className="max-w-[710px] font-heading text-[clamp(2.65rem,5.15vw,5.35rem)] font-extrabold leading-[1.04] tracking-[-0.055em]"
              >
                Built for the <span className="text-[#ED3138]">Battery</span>{" "}
                Industry.
              </h1>

              <p className="mt-6 max-w-[560px] text-sm leading-7 text-white/65 sm:text-base sm:leading-7">
                Production. Processing. Products. Connect with battery
                manufacturers, suppliers and technology leaders shaping the
                industry.
              </p>

              <div className="mt-7 flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3">
                <span className="inline-flex items-center gap-2.5 font-bold text-white">
                  <CalendarDays
                    className="h-[18px] w-[18px] shrink-0 text-[#ED3138]"
                    aria-hidden="true"
                  />
                  14–16 October 2027
                </span>
                <span className="inline-flex items-start gap-2.5 text-white/75">
                  <MapPin
                    className="mt-[2px] h-[18px] w-[18px] shrink-0 text-[#ED3138]"
                    aria-hidden="true"
                  />
                  {venue}
                </span>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <TrackedLink
                  event={AnalyticsEvents.BOOK_STAND_CLICK}
                  params={{ source: "hero" }}
                  href="/exhibit/book-a-stand"
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#ED3138] px-6 font-heading text-xs font-extrabold uppercase tracking-[0.04em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#d92930] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-sm"
                >
                  Book a Stand
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </TrackedLink>
                <TrackedLink
                  event={AnalyticsEvents.REGISTER_VISIT_CLICK}
                  params={{ source: "hero" }}
                  href="/visit/register"
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/35 bg-white/[0.04] px-6 font-heading text-xs font-extrabold uppercase tracking-[0.04em] text-white transition-all duration-200 hover:border-white/70 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-sm"
                >
                  Register to Visit
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </TrackedLink>
                <TrackedLink
                  event={AnalyticsEvents.BROCHURE_DOWNLOAD}
                  params={{ source: "hero" }}
                  href="/downloads/BATTERY-BROCHURE.pdf"
                  download
                  className="inline-flex min-h-12 items-center gap-2 px-2 text-xs font-bold text-white/60 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Download className="h-4 w-4" aria-hidden="true" /> Brochure
                </TrackedLink>
              </div>
            </m.div>

            <m.div
              initial={reducedMotion ? false : { opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="pointer-events-none relative mx-auto hidden w-full max-w-[590px] lg:block"
              aria-hidden="true"
            >
              <BatteryTechnicalArt />
            </m.div>
          </div>
        </Container>

        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 z-20 h-[2px] w-full bg-gradient-to-r from-[#ED3138] via-[#ED3138]/30 to-transparent"
        />
      </section>
    </LazyMotion>
  );
}
