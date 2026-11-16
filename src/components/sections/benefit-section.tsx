
"use client";

import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from "framer-motion";

import { Container } from "@/components/ui/container";

type Benefit = {
  title: string;
  description: string;
};

type BenefitSectionProps = {
  eyebrow: string;
  title: string;
  benefits: readonly Benefit[];
  ctaLabel: string;
  ctaHref: string;
  tone?: "light" | "dark";
};

const EASE = [0.22, 1, 0.36, 1] as const;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function BenefitSection({
  eyebrow,
  title,
  benefits,
  ctaLabel,
  ctaHref,
  tone = "light",
}: BenefitSectionProps) {
  const reduceMotion = useReducedMotion();
  const dark = tone === "dark";
  const headingId = `benefits-${slugify(eyebrow)}`;

  return (
    <LazyMotion features={domAnimation}>
      <section
        id={slugify(eyebrow)}
        aria-labelledby={headingId}
        className={[
          "relative isolate overflow-hidden",
          "py-16 sm:py-20 lg:py-24 xl:py-28",
          dark
            ? "bg-surface-dark text-white"
            : "bg-surface text-foreground",
        ].join(" ")}
      >
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14 xl:gap-20">

            {/* LEFT: EDITORIAL INTRODUCTION */}
            <div className="min-w-0 lg:sticky lg:top-28">
              <div className="mb-6 flex items-center gap-3">
                <m.span
                  aria-hidden="true"
                  className="h-0.5 w-7 shrink-0 origin-left bg-brand-red"
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
                    duration: reduceMotion ? 0 : 0.5,
                    ease: EASE,
                  }}
                />

                <p
                  className={[
                    "font-heading text-[11px] font-bold",
                    "uppercase tracking-[0.15em]",
                    "sm:text-xs",
                    dark
                      ? "text-[#F2A4A9]"
                      : "text-brand-red",
                  ].join(" ")}
                >
                  {eyebrow}
                </p>
              </div>

              <h2
                id={headingId}
                className="max-w-[580px] font-heading text-[clamp(2rem,3.4vw,3rem)] font-bold leading-[1.15] tracking-[-0.035em] [text-wrap:balance]"
              >
                {title}
                <span
                  className={
                    dark
                      ? "text-[#F2A4A9]"
                      : "text-brand-red"
                  }
                >
                  .
                </span>
              </h2>

              <p
                className={[
                  "mt-6 max-w-[460px] font-body",
                  "text-[15px] leading-[1.8] sm:text-base",
                  dark
                    ? "text-white/70"
                    : "text-muted",
                ].join(" ")}
              >
                {dark
                  ? "Explore new battery technologies, connect with manufacturers and suppliers, and discover opportunities across the industry."
                  : "Showcase your capabilities, meet relevant industry professionals and build meaningful connections across the battery value chain."}
              </p>

              {/* PRIMARY CTA */}
              <Link
                href={ctaHref}
                className={[
                  "group mt-9 inline-flex min-h-12",
                  "items-center justify-center gap-2.5",
                  "rounded-button px-6 py-3",
                  "font-heading text-sm font-bold",
                  "transition-colors duration-200",
                  "focus-visible:outline-2",
                  "focus-visible:outline-offset-2",
                  "focus-visible:outline-brand-red",
                  dark
                    ? "bg-brand-red text-white hover:bg-brand-red-hover"
                    : "bg-surface-dark text-white hover:bg-brand-red",
                ].join(" ")}
              >
                {ctaLabel}

                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
                  strokeWidth={1.8}
                />
              </Link>
            </div>

            {/* RIGHT: BENEFITS GRID */}
            <ul className="grid min-w-0 gap-4 sm:grid-cols-2 lg:gap-5">
              {benefits.map((benefit, index) => (
                <li
                  key={`${benefit.title}-${index}`}
                  className={[
                    "group relative flex min-h-[218px]",
                    "flex-col rounded-card border p-6",
                    "sm:min-h-[245px] sm:p-7",
                    "transition-[border-color,background-color,transform]",
                    "duration-200",
                    "hover:-translate-y-[3px]",
                    "motion-reduce:transform-none",
                    dark
                      ? "border-white/15 bg-surface-dark-elevated hover:border-white/30"
                      : "border-border bg-background hover:border-brand-red/35",
                  ].join(" ")}
                >
                  {/* CARD ICON AND INDEX */}
                  <div className="flex items-start justify-between gap-4">
                    <span
                      aria-hidden="true"
                      className={[
                        "flex h-10 w-10 items-center",
                        "justify-center rounded-md",
                        dark
                          ? "bg-white/10 text-white"
                          : "bg-surface text-brand-red",
                      ].join(" ")}
                    >
                      <Check
                        className="h-5 w-5"
                        strokeWidth={1.9}
                      />
                    </span>

                 
                  </div>

                  {/* BENEFIT CONTENT */}
                  <div className="mt-auto pt-8">
                    <h3 className="font-heading text-[17px] font-bold leading-[1.4] tracking-[-0.02em] sm:text-lg">
                      {benefit.title}
                    </h3>

                    <p
                      className={[
                        "mt-3 font-body text-sm leading-[1.75]",
                        dark
                          ? "text-white/70"
                          : "text-muted",
                      ].join(" ")}
                    >
                      {benefit.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </LazyMotion>
  );
}
