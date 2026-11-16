
"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectorIcon } from "@/components/ui/sector-icon";
import { sectors } from "@/lib/content/sectors";

/* --------------------------------------------------
   INDIA BATTERY INTERNATIONAL SHOW

   Section: Exhibition Sectors
   Theme: Hybrid Industrial Editorial

   Design:
   - Warm off-white background
   - Premium industrial directory cards
   - Large editorial typography
   - Consistent SVG icon treatment
   - Minimal brand-red accent
   - Subtle card interactions
   - Responsive grid
   - Accessible navigation

   Performance:
   - No additional image requests
   - No animated counters
   - No expensive parallax
   - Content visible immediately
   - Lightweight Motion animation
-------------------------------------------------- */

const ease = [0.22, 1, 0.36, 1] as const;

export function SectorsGrid() {
  const reduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="exhibition-sectors"
        aria-labelledby="sectors-title"
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
              SECTION HEADING
          ----------------------------------- */}

          <div
            className={[
              "mb-10",
              "grid gap-6",
              "sm:mb-12",
              "lg:mb-14",
              "lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]",
              "lg:items-end",
              "lg:gap-12",
            ].join(" ")}
          >
            <div className="max-w-[780px]">
              {/* Eyebrow */}

              <div className="mb-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-[2px] w-7 shrink-0 bg-brand-red"
                />

                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.15em] text-brand-red sm:text-xs">
                  Exhibition Sectors
                </p>
              </div>

              {/* Main section heading */}

              <h2
                id="sectors-title"
                className={[
                  "max-w-[740px]",
                  "font-heading",
                  "text-[clamp(2rem,3.5vw,3rem)]",
                  "font-bold",
                  "leading-[1.15]",
                  "tracking-[-0.035em]",
                  "text-foreground",
                  "[text-wrap:balance]",
                ].join(" ")}
              >
                Explore the battery
                <br className="hidden sm:block" />
                {" "}value chain
                <span className="text-brand-red">.</span>
              </h2>
            </div>

            {/* Supporting description */}

            <p className="max-w-[430px] font-body text-sm leading-[1.75] text-muted sm:text-base">
              Discover the technologies, equipment and
              solutions shaping the battery industry —
              from manufacturing and components to
              energy storage, testing and recycling.
            </p>
          </div>

          {/* -----------------------------------
              EDITORIAL SECTION DIVIDER
          ----------------------------------- */}

          <div
            aria-hidden="true"
            className="mb-7 h-px w-full bg-border sm:mb-9"
          />

          {/* -----------------------------------
              SECTORS GRID

              Mobile: 1 column
              Tablet: 2 columns
              Desktop: 4 columns

              Data source is unchanged:
              @/lib/content/sectors
          ----------------------------------- */}

          <ul
            className={[
              "grid grid-cols-1",
              "gap-4",
              "sm:grid-cols-2",
              "lg:grid-cols-4",
              "lg:gap-5",
            ].join(" ")}
          >
            {sectors.map((sector, index) => (
              <li key={sector.slug} className="min-w-0">
                <Link
                  href={`/exhibit/categories#${sector.slug}`}
                  className={[
                    "group relative",
                    "flex h-full min-h-[232px]",
                    "flex-col",
                    "overflow-hidden",
                    "rounded-card",
                    "border border-border",
                    "bg-surface",
                    "p-6",
                    "transition-[border-color,box-shadow,transform]",
                    "duration-200",
                    "ease-out",
                    "hover:-translate-y-[3px]",
                    "hover:border-brand-red/35",
                    "hover:shadow-[0_12px_30px_rgba(25,28,33,0.055)]",
                    "focus-visible:outline-2",
                    "focus-visible:outline-offset-2",
                    "focus-visible:outline-brand-red",
                    "motion-reduce:transform-none",
                    "sm:min-h-[255px]",
                    "lg:p-7",
                  ].join(" ")}
                >
                  {/* Card header */}

                  <div className="flex items-start justify-between gap-4">
                    {/* Sector icon */}

                    <span
                      className={[
                        "flex h-12 w-12",
                        "shrink-0",
                        "items-center justify-center",
                        "rounded-lg",
                        "bg-background",
                        "text-brand-red",
                        "transition-[background-color,color]",
                        "duration-200",
                        "group-hover:bg-brand-red",
                        "group-hover:text-white",
                      ].join(" ")}
                    >
                      <SectorIcon
                        icon={sector.icon}
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </span>

                 
                  </div>

                  {/* Card content */}

                  <div className="mt-auto pt-8">
                    <h3
                      className={[
                        "max-w-[270px]",
                        "font-heading",
                        "text-[17px]",
                        "font-bold",
                        "leading-[1.35]",
                        "tracking-[-0.025em]",
                        "text-foreground",
                        "sm:text-lg",
                      ].join(" ")}
                    >
                      {sector.name}
                    </h3>

                    <p
                      className={[
                        "mt-3",
                        "max-w-[275px]",
                        "line-clamp-3",
                        "font-body",
                        "text-[13px]",
                        "leading-[1.7]",
                        "text-muted",
                        "sm:text-sm",
                      ].join(" ")}
                    >
                      {sector.description}
                    </p>
                  </div>

               
                </Link>
              </li>
            ))}
          </ul>

        

        
        </Container>
      </section>
    </LazyMotion>
  );
}
