"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Sparkles,
} from "lucide-react";
import {
  LazyMotion,
  domAnimation,
  m,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { exhibitors } from "@/lib/content/exhibitors";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function ConfirmedExhibitorsStrip() {
  const hasExhibitors = exhibitors.length > 0;

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-32">
        {/* Background accents */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <svg
            viewBox="0 0 1600 900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-1/2 top-1/2 min-w-[1200px] -translate-x-1/2 -translate-y-1/2"
          >
            <defs>
              <linearGradient
                id="exhibitor-green"
                x1="100"
                y1="100"
                x2="1500"
                y2="800"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#13A853" stopOpacity="0.08" />
                <stop offset="1" stopColor="#13A853" stopOpacity="0" />
              </linearGradient>

              <linearGradient
                id="exhibitor-red"
                x1="1500"
                y1="100"
                x2="200"
                y2="800"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#ED3138" stopOpacity="0.05" />
                <stop offset="1" stopColor="#ED3138" stopOpacity="0" />
              </linearGradient>
            </defs>

            <path
              d="M-100 670C260 450 500 420 790 520C1070 615 1310 550 1690 280"
              stroke="url(#exhibitor-green)"
              strokeWidth="1.4"
            />

            <path
              d="M-100 760C300 560 550 530 830 610C1110 690 1370 630 1700 430"
              stroke="url(#exhibitor-red)"
            />

            <g opacity="0.035">
              <circle cx="1320" cy="210" r="130" stroke="#13A853" />
              <circle cx="1320" cy="210" r="85" stroke="#13A853" />
            </g>
          </svg>
        </div>

        <div
          aria-hidden="true"
          className="absolute -left-32 top-32 h-64 w-64 rounded-full bg-brand-green/[0.05] blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute -right-28 bottom-24 h-64 w-64 rounded-full bg-brand-red/[0.035] blur-3xl"
        />

        <Container className="relative z-10">
          <m.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <SectionHeading
              eyebrow="Exhibitors"
              title="Meet the Companies Driving Battery Innovation"
              align="center"
            />
          </m.div>

          {hasExhibitors ? (
            <m.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
            >
              {exhibitors.slice(0, 10).map((exhibitor, index) => (
                <m.div
                  key={
                    "slug" in exhibitor
                      ? String(exhibitor.slug)
                      : `exhibitor-${index}`
                  }
                  variants={itemVariants}
                  className="
                    group flex min-h-36 items-center justify-center
                    rounded-3xl border border-black/[0.07]
                    bg-zinc-50 p-5
                    transition-[transform,border-color,box-shadow,background-color]
                    duration-500
                    hover:-translate-y-1
                    hover:border-brand-green/25
                    hover:bg-white
                    hover:shadow-[0_18px_50px_rgba(0,0,0,0.07)]
                  "
                >
                  <Building2
                    className="h-7 w-7 text-brand-green"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </m.div>
              ))}
            </m.div>
          ) : (
            <m.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative mx-auto mt-14 max-w-5xl overflow-hidden rounded-[2rem] border border-black/[0.07] bg-zinc-50 px-6 py-14 text-center sm:px-10 sm:py-16 lg:py-20"
            >
              {/* Top accent */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-green/70 to-transparent"
              />

              {/* Glow */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-brand-green/[0.07] blur-3xl"
              />

              <div className="relative z-10">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-green/10 text-brand-green">
                  <Sparkles
                    className="h-6 w-6"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </div>

                <p className="mt-6 font-heading text-2xl font-bold tracking-[-0.03em] text-black sm:text-3xl">
                  Exhibitor Line-up Coming Soon
                </p>

                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base">
                  Leading battery manufacturers, technology providers,
                  component suppliers, energy storage companies and mobility
                  innovators will be announced here.
                </p>

                <div className="mt-7 flex flex-wrap justify-center gap-2.5">
                  {[
                    "Battery Manufacturers",
                    "Energy Storage",
                    "EV Technology",
                    "Components",
                    "Manufacturing",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-black/[0.07] bg-white px-3.5 py-2 text-xs font-semibold text-zinc-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </m.div>
          )}

          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-10 flex justify-center"
          >
            <Button
              href="/exhibitors"
              variant="secondary"
              className="group gap-2 rounded-full"
            >
              View Exhibitor Directory

              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Button>
          </m.div>
        </Container>
      </section>
    </LazyMotion>
  );
}