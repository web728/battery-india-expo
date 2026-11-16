
"use client";

import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from "framer-motion";

import { Container } from "@/components/ui/container";

/* --------------------------------------------------
   INDIA BATTERY SHOW
   Section: Event Statistics

   Design: Hybrid Industrial Editorial

   - Warm off-white background
   - Editorial statistics layout
   - Minimal brand-red accents
   - No excessive shadows or gradients
   - Accessible typography
   - Restrained Framer Motion
   - Responsive 1 / 3 column grid
-------------------------------------------------- */

/*
  IMPORTANT:
  These figures are preserved from your
  existing component.

  Verify them against your official 2026
  post-event report before publishing.
*/

const stats = [
  {
    value: "20%",
    label: "Battery & Energy Storage",
    detail: "Share of visitors by industry",
  },
  {
    value: "65%",
    label: "Business Leadership",
    detail: "Owners, managers & senior leaders",
  },
  {
    value: "41",
    label: "Letters of Intent",
    detail: "Startup engagement",
  },
] as const;

/* --------------------------------------------------
   ANIMATION CONFIGURATION
-------------------------------------------------- */

const ease = [0.22, 1, 0.36, 1] as const;

export function StatsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="event-statistics"
        aria-labelledby="stats-title"
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
              SECTION INTRODUCTION
          ----------------------------------- */}

          <div
            className={[
              "mb-10",
              "flex flex-col",
              "gap-5",
              "sm:mb-12",
              "lg:mb-14",
              "lg:flex-row",
              "lg:items-end",
              "lg:justify-between",
              "lg:gap-10",
            ].join(" ")}
          >
            {/* Heading group */}
            <div className="max-w-[740px]">
              {/* Eyebrow */}
              <div className="mb-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-[2px] w-7 shrink-0 bg-brand-red"
                />

                <p
                  className={[
                    "font-heading",
                    "text-[11px]",
                    "font-bold",
                    "uppercase",
                    "tracking-[0.15em]",
                    "text-brand-red",
                    "sm:text-xs",
                  ].join(" ")}
                >
                  2026 Event Highlights
                </p>
              </div>

              {/* Main heading */}
              <h2
                id="stats-title"
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
                Industry in numbers
                <span className="text-brand-red">.</span>
              </h2>
            </div>

            {/* Supporting copy */}
            <p
              className={[
                "max-w-[420px]",
                "font-body",
                "text-sm",
                "leading-[1.75]",
                "text-muted",
                "sm:text-base",
                "lg:pb-1",
              ].join(" ")}
            >
              A snapshot of industry participation,
              leadership and business engagement
              from the previous edition.
            </p>
          </div>

          {/* -----------------------------------
              EDITORIAL DIVIDER
          ----------------------------------- */}

          <div
            aria-hidden="true"
            className="h-px w-full bg-border"
          />

          {/* -----------------------------------
              STATISTICS GRID
          ----------------------------------- */}

          <div
            className={[
              "grid",
              "grid-cols-1",
              "sm:grid-cols-3",
            ].join(" ")}
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={[
                  "group",
                  "relative",
                  "border-b",
                  "border-border",
                  "py-8",
                  "sm:border-b-0",
                  "sm:py-10",
                  "lg:py-12",

                  index === 0
                    ? "sm:pr-6 lg:pr-10"
                    : "",

                  index > 0
                    ? [
                        "sm:border-l",
                        "sm:border-border",
                        "sm:pl-6",
                        "lg:pl-10",
                      ].join(" ")
                    : "",
                ].join(" ")}
              >
                {/* Large statistic number */}
                <p
                  className={[
                    "font-heading",
                    "text-[clamp(3rem,5vw,4.75rem)]",
                    "font-extrabold",
                    "leading-none",
                    "tracking-[-0.06em]",
                    "tabular-nums",
                    "text-foreground",
                  ].join(" ")}
                >
                  {stat.value}
                </p>

                {/* Controlled brand-red detail */}
                <m.div
                  aria-hidden="true"
                  className={[
                    "mt-7",
                    "h-[3px]",
                    "w-9",
                    "origin-left",
                    "bg-brand-red",
                  ].join(" ")}
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
                    duration: reduceMotion ? 0 : 0.55,
                    delay: reduceMotion
                      ? 0
                      : index * 0.08,
                    ease,
                  }}
                />

                {/* Statistic label */}
                <h3
                  className={[
                    "mt-6",
                    "max-w-[270px]",
                    "font-heading",
                    "text-[17px]",
                    "font-bold",
                    "leading-[1.4]",
                    "tracking-[-0.02em]",
                    "text-foreground",
                    "sm:text-lg",
                    "lg:text-xl",
                  ].join(" ")}
                >
                  {stat.label}
                </h3>

                {/* Supporting context */}
                <p
                  className={[
                    "mt-2",
                    "max-w-[260px]",
                    "font-body",
                    "text-sm",
                    "leading-[1.7]",
                    "text-muted",
                  ].join(" ")}
                >
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>

          {/* -----------------------------------
              SECTION BOTTOM
          ----------------------------------- */}

          <div className="border-t border-border pt-5">
            
          </div>
        </Container>
      </section>
    </LazyMotion>
  );
}
