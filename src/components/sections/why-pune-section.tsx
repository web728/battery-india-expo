
"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  MapPin,
  Factory,
  Building2,
  Route,
  UsersRound,
} from "lucide-react";

import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/container";
import { whyPunePoints } from "@/lib/content/home-content";
import { siteConfig } from "@/lib/site-config";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease,
    },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const icons = [
  Factory,
  Route,
  Building2,
  UsersRound,
] as const;

export function WhyPuneSection() {
  const reducedMotion = useReducedMotion();

  const venueName =
    siteConfig.venue.name ||
    siteConfig.venue.line1 ||
    "Auto Cluster Exhibition Centre";

  const venueLocation = [
    siteConfig.venue.city,
    siteConfig.venue.state,
  ]
    .filter(Boolean)
    .join(", ");

  const directionsUrl =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      siteConfig.venue.mapQuery ||
        "Auto Cluster Exhibition Centre, Chinchwad, Pune"
    );

  const motionProps = {
    initial: reducedMotion ? false : "hidden",
    whileInView: "visible",
    viewport: {
      once: true,
      amount: 0.12,
    },
  } as const;

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="why-pune"
        aria-labelledby="why-pune-heading"
        className="relative overflow-hidden bg-[#faf9f7] py-16 text-[#19191b] sm:py-20 lg:py-24"
      >
        <Container>
          <m.div
            {...motionProps}
            variants={stagger}
            className="grid items-start gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 xl:gap-20"
          >
            {/* LEFT: EDITORIAL CONTENT */}
            <m.div
              variants={fadeUp}
              className="min-w-0 lg:pt-3"
            >
              <div className="mb-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-[2px] w-8 bg-[#ed3138]"
                />

                <span className="font-heading text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#c82d34]">
                  Why Pune
                </span>
              </div>

              <h2
                id="why-pune-heading"
                className="max-w-[590px] font-heading text-[clamp(2rem,3.7vw,3.35rem)] font-extrabold leading-[1.12] tracking-[-0.05em] text-[#19191b]"
              >
                A strong industrial base for the{" "}
                <span className="text-[#ed3138]">
                  battery industry.
                </span>
              </h2>

              <p className="mt-6 max-w-[550px] text-[15px] leading-[1.85] text-[#606067] sm:text-base">
                Pune is an established automotive and
                manufacturing centre, with access to vehicle
                manufacturers, engineering companies, component
                suppliers and research institutions.
              </p>

              <p className="mt-4 max-w-[550px] text-[15px] leading-[1.85] text-[#606067] sm:text-base">
                Its industrial network makes it a relevant
                location for battery technologies, energy
                storage solutions and businesses serving
                electric mobility and industrial applications.
              </p>

              {/* VENUE INFORMATION */}
              <div className="mt-8 max-w-[560px] border-t border-[#e2e1de] pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#fcebec] text-[#d52d35]">
                    <MapPin
                      className="h-5 w-5"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="font-heading text-[10px] font-bold uppercase tracking-[0.15em] text-[#9a4b4f]">
                      Exhibition Venue
                    </p>

                    <h3 className="mt-1 font-heading text-base font-bold leading-6 text-[#202024]">
                      {venueName}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-[#68686d]">
                      {venueLocation}
                    </p>

                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-4 inline-flex items-center gap-2 font-heading text-[13px] font-bold text-[#d52d35] transition-colors hover:text-[#a82027] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ed3138]"
                    >
                      View location
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </m.div>

            {/* RIGHT: PHOTO + INDUSTRY DETAILS */}
            <m.div
              variants={fadeUp}
              className="min-w-0"
            >
              <figure className="group relative overflow-hidden rounded-xl bg-[#242428]">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10]">
                  <Image
                    src="/images/expo-ev-powertrain-demo.jpg"
                    alt="Electric vehicle technology demonstration at an industry exhibition"
                    fill
                    sizes="(min-width: 1024px) 52vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transform-none"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent"
                  />

                  <figcaption className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-14 sm:px-7 sm:pb-6">
                    <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.13em] text-white/85">
                      Automotive & Manufacturing
                    </span>

                    <p className="mt-1 font-heading text-base font-bold text-white sm:text-lg">
                      Pune, Maharashtra
                    </p>
                  </figcaption>
                </div>
              </figure>

              {/* INDUSTRY HIGHLIGHTS */}
              <div className="mt-5 overflow-hidden rounded-xl border border-[#e8e6e3] bg-white">
                <div className="grid grid-cols-1 divide-y divide-[#eeece9] sm:grid-cols-2 sm:divide-y-0">
                  {whyPunePoints.map((point, index) => {
                    const Icon = icons[index % icons.length];

                    return (
                      <m.div
                        key={`${point.title}-${index}`}
                        initial={
                          reducedMotion
                            ? false
                            : { opacity: 0, y: 12 }
                        }
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{
                          once: true,
                          amount: 0.2,
                        }}
                        transition={{
                          duration: 0.48,
                          delay: reducedMotion
                            ? 0
                            : index * 0.07,
                          ease,
                        }}
                        className={[
                          "group flex min-w-0 items-start gap-3.5 p-5 transition-colors duration-300 hover:bg-[#fbf8f7] sm:p-6",
                          index % 2 === 0
                            ? "sm:border-r sm:border-[#eeece9]"
                            : "",
                          index >= 2
                            ? "sm:border-t sm:border-[#eeece9]"
                            : "",
                        ].join(" ")}
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f9eded] text-[#d52d35] transition-colors duration-300 group-hover:bg-[#ed3138] group-hover:text-white">
                          <Icon
                            className="h-[18px] w-[18px]"
                            strokeWidth={1.8}
                            aria-hidden="true"
                          />
                        </span>

                        <div className="min-w-0">
                          <h3 className="font-heading text-[14px] font-bold leading-5 tracking-[-0.015em] text-[#242428]">
                            {point.title}
                          </h3>

                          <p className="mt-2 text-[13px] leading-[1.7] text-[#6c6b70]">
                            {point.description}
                          </p>
                        </div>
                      </m.div>
                    );
                  })}
                </div>
              </div>
            </m.div>
          </m.div>
        </Container>
      </section>
    </LazyMotion>
  );
}
