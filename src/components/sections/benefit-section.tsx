"use client";

import { ArrowUpRight, Check } from "lucide-react";
import {
  LazyMotion,
  domAnimation,
  m,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

type Benefit = {
  title: string;
  description: string;
};

type BenefitSectionProps = {
  eyebrow: string;
  title: string;
  benefits: Benefit[];
  ctaLabel: string;
  ctaHref: string;
  tone?: "light" | "dark";
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function BenefitSection({
  eyebrow,
  title,
  benefits,
  ctaLabel,
  ctaHref,
  tone = "light",
}: BenefitSectionProps) {
  const isDark = tone === "dark";

  return (
    <LazyMotion features={domAnimation}>
      <section
        className={`relative overflow-hidden py-20 sm:py-24 lg:py-28 ${
          isDark ? "bg-black" : "bg-white"
        }`}
      >
        {/* Animated background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <m.svg
            viewBox="0 0 1600 950"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-1/2 top-1/2 min-w-[1250px] -translate-x-1/2 -translate-y-1/2"
          >
            <defs>
              <linearGradient
                id={`benefit-green-${tone}`}
                x1="0"
                y1="0"
                x2="1600"
                y2="950"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#13A853" stopOpacity="0" />
                <stop
                  offset="0.45"
                  stopColor="#13A853"
                  stopOpacity={isDark ? "0.24" : "0.13"}
                />
                <stop offset="1" stopColor="#13A853" stopOpacity="0" />
              </linearGradient>

              <linearGradient
                id={`benefit-red-${tone}`}
                x1="1600"
                y1="0"
                x2="0"
                y2="950"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#ED3138" stopOpacity="0" />
                <stop
                  offset="0.5"
                  stopColor="#ED3138"
                  stopOpacity={isDark ? "0.18" : "0.09"}
                />
                <stop offset="1" stopColor="#ED3138" stopOpacity="0" />
              </linearGradient>

              <radialGradient
                id={`benefit-glow-${tone}`}
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(800 470) rotate(90) scale(360 580)"
              >
                <stop
                  stopColor="#13A853"
                  stopOpacity={isDark ? "0.08" : "0.04"}
                />
                <stop offset="1" stopColor="#13A853" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* center ambient */}
            <m.ellipse
              cx="800"
              cy="470"
              rx="580"
              ry="360"
              fill={`url(#benefit-glow-${tone})`}
              animate={{
                opacity: [0.5, 0.9, 0.5],
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                transformOrigin: "800px 470px",
              }}
            />

            {/* green flow */}
            <m.path
              d="M-120 680C250 445 485 420 765 515C1045 610 1280 555 1720 235"
              stroke={`url(#benefit-green-${tone})`}
              strokeWidth="1.5"
              strokeLinecap="round"
              animate={{
                x: [0, 24, 0],
                opacity: [0.35, 0.8, 0.35],
              }}
              transition={{
                duration: 11,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* red flow */}
            <m.path
              d="M-100 760C300 550 545 525 805 610C1085 700 1320 635 1700 410"
              stroke={`url(#benefit-red-${tone})`}
              strokeWidth="1.2"
              strokeLinecap="round"
              animate={{
                x: [0, -18, 0],
                opacity: [0.3, 0.65, 0.3],
              }}
              transition={{
                duration: 13,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* left geometry */}
            <m.g
              animate={{
                y: [-8, 8, -8],
                rotate: [-2, 2, -2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                transformOrigin: "245px 340px",
              }}
            >
              <path
                d="M245 180L365 250L365 390L245 460L125 390L125 250L245 180Z"
                stroke="#13A853"
                strokeOpacity={isDark ? "0.09" : "0.06"}
              />

              <path
                d="M245 225L325 272L325 368L245 415L165 368L165 272L245 225Z"
                stroke="#ED3138"
                strokeOpacity={isDark ? "0.07" : "0.04"}
              />
            </m.g>

            {/* right orbit */}
            <m.g
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 46,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                transformOrigin: "1330px 240px",
              }}
            >
              <circle
                cx="1330"
                cy="240"
                r="132"
                stroke="#13A853"
                strokeOpacity={isDark ? "0.09" : "0.05"}
              />

              <circle
                cx="1330"
                cy="240"
                r="88"
                stroke="#ED3138"
                strokeOpacity={isDark ? "0.09" : "0.05"}
                strokeDasharray="5 13"
              />

              <circle
                cx="1330"
                cy="108"
                r="4"
                fill="#13A853"
                fillOpacity="0.8"
              />

              <circle
                cx="1418"
                cy="240"
                r="4"
                fill="#ED3138"
                fillOpacity="0.8"
              />
            </m.g>
          </m.svg>
        </div>

        {/* ambient glows */}
        <m.div
          aria-hidden="true"
          className={`absolute -left-32 top-28 h-72 w-72 rounded-full blur-[110px] ${
            isDark ? "bg-brand-green/12" : "bg-brand-green/[0.045]"
          }`}
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.07, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <m.div
          aria-hidden="true"
          className={`absolute -right-32 bottom-16 h-64 w-64 rounded-full blur-[110px] ${
            isDark ? "bg-brand-red/10" : "bg-brand-red/[0.04]"
          }`}
          animate={{
            opacity: [0.35, 0.65, 0.35],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* top accent */}
        <div
          aria-hidden="true"
          className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${
            isDark ? "via-white/10" : "via-black/[0.05]"
          } to-transparent`}
        />

        <Container className="relative z-10">
          {/* Header */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <SectionHeading
              eyebrow={eyebrow}
              title={title}
              align="center"
              light={isDark}
            />
          </m.div>

          {/* Benefits */}
          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5"
          >
            {benefits.map((benefit, index) => {
              const isRed = index % 3 === 1;

              return (
                <m.div
                  key={benefit.title}
                  variants={cardVariants}
                  className={`
                    group relative min-h-[235px] overflow-hidden rounded-[1.75rem]
                    border p-6
                    transition-[transform,border-color,box-shadow,background-color]
                    duration-500
                    hover:-translate-y-1
                    sm:p-7
                    ${
                      isDark
                        ? isRed
                          ? "border-white/10 bg-white/[0.045] hover:border-brand-red/30 hover:bg-white/[0.065]"
                          : "border-white/10 bg-white/[0.045] hover:border-brand-green/30 hover:bg-white/[0.065]"
                        : isRed
                          ? "border-black/[0.07] bg-zinc-50/75 hover:border-brand-red/25 hover:bg-white hover:shadow-[0_20px_60px_rgba(237,49,56,0.07)]"
                          : "border-black/[0.07] bg-zinc-50/75 hover:border-brand-green/25 hover:bg-white hover:shadow-[0_20px_60px_rgba(19,168,83,0.07)]"
                    }
                  `}
                >
                  {/* top rail */}
                  <div
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                      isRed
                        ? "via-brand-red/80"
                        : "via-brand-green/80"
                    }`}
                  />

                  {/* corner glow */}
                  <div
                    aria-hidden="true"
                    className={`absolute -right-14 -top-14 h-36 w-36 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-125 ${
                      isRed
                        ? "bg-brand-red/[0.07]"
                        : "bg-brand-green/[0.07]"
                    }`}
                  />

                  {/* number */}
                  <div className="absolute right-6 top-6 flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isRed ? "bg-brand-red" : "bg-brand-green"
                      }`}
                    />

                    <span
                      className={`font-heading text-[10px] font-bold tracking-[0.18em] ${
                        isDark ? "text-white/20" : "text-black/20"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* icon */}
                  <div
                    className={`
                      mb-7 flex h-11 w-11 items-center justify-center rounded-2xl
                      transition-[transform,background-color,color,box-shadow]
                      duration-300
                      group-hover:-translate-y-0.5
                      ${
                        isRed
                          ? "bg-brand-red/10 text-brand-red group-hover:bg-brand-red group-hover:text-white group-hover:shadow-[0_12px_30px_rgba(237,49,56,0.2)]"
                          : "bg-brand-green/10 text-brand-green group-hover:bg-brand-green group-hover:text-white group-hover:shadow-[0_12px_30px_rgba(19,168,83,0.2)]"
                      }
                    `}
                  >
                    <Check
                      className="h-5 w-5"
                      strokeWidth={2.2}
                      aria-hidden="true"
                    />
                  </div>

                  {/* content */}
                  <h3
                    className={`max-w-[280px] font-heading text-lg font-bold tracking-[-0.025em] ${
                      isDark ? "text-white" : "text-black"
                    }`}
                  >
                    {benefit.title}
                  </h3>

                  <p
                    className={`mt-3 text-sm leading-6 ${
                      isDark ? "text-white/58" : "text-zinc-600"
                    }`}
                  >
                    {benefit.description}
                  </p>

                  {/* bottom hover line */}
                  <div
                    aria-hidden="true"
                    className={`absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 transition-all duration-500 group-hover:w-2/3 ${
                      isRed ? "bg-brand-red" : "bg-brand-green"
                    }`}
                  />
                </m.div>
              );
            })}
          </m.div>

          {/* CTA */}
          <m.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.55,
              delay: 0.14,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-10 flex justify-center"
          >
            <Button
              href={ctaHref}
              variant={isDark ? "primary" : "secondary"}
              size="lg"
              className={`group gap-2 rounded-full px-7 ${
                !isDark
                  ? "bg-black text-white hover:bg-brand-green"
                  : ""
              }`}
            >
              {ctaLabel}

              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden="true"
              />
            </Button>
          </m.div>
        </Container>
      </section>
    </LazyMotion>
  );
}