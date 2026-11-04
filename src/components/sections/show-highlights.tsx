"use client";

import {
  BatteryCharging,
  Warehouse,
  PlayCircle,
  Presentation,
  Wrench,
  Users,
  Landmark,
  Trophy,
} from "lucide-react";
import {
  LazyMotion,
  domAnimation,
  m,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const highlights = [
  {
    title: "Comprehensive Battery Exhibition",
    icon: BatteryCharging,
  },
  {
    title: "Energy Storage Systems Showcase",
    icon: Warehouse,
  },
  {
    title: "Live Demonstrations",
    icon: PlayCircle,
  },
  {
    title: "Technical Conferences",
    icon: Presentation,
  },
  {
    title: "Workshops",
    icon: Wrench,
  },
  {
    title: "B2B Matchmaking",
    icon: Users,
  },
  {
    title: "Government & Policy Discussions",
    icon: Landmark,
  },
  {
    title: "Innovation & Technology Awards",
    icon: Trophy,
  },
] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
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

export function ShowHighlights() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
        {/* Animated SVG background */}
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
                id="highlights-green"
                x1="0"
                y1="0"
                x2="1600"
                y2="950"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#13A853" stopOpacity="0" />
                <stop offset="0.45" stopColor="#13A853" stopOpacity="0.14" />
                <stop offset="1" stopColor="#13A853" stopOpacity="0" />
              </linearGradient>

              <linearGradient
                id="highlights-red"
                x1="1600"
                y1="0"
                x2="0"
                y2="950"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#ED3138" stopOpacity="0" />
                <stop offset="0.5" stopColor="#ED3138" stopOpacity="0.1" />
                <stop offset="1" stopColor="#ED3138" stopOpacity="0" />
              </linearGradient>

              <radialGradient
                id="highlights-glow"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(800 470) rotate(90) scale(350 560)"
              >
                <stop stopColor="#13A853" stopOpacity="0.045" />
                <stop offset="1" stopColor="#13A853" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* center ambient glow */}
            <m.ellipse
              cx="800"
              cy="470"
              rx="560"
              ry="350"
              fill="url(#highlights-glow)"
              animate={{
                opacity: [0.5, 0.85, 0.5],
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

            {/* green energy flow */}
            <m.path
              d="M-100 650C275 430 500 415 775 510C1050 605 1280 555 1700 250"
              stroke="url(#highlights-green)"
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

            {/* red energy flow */}
            <m.path
              d="M-120 745C300 545 555 525 815 610C1100 700 1340 640 1690 420"
              stroke="url(#highlights-red)"
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

            {/* left orbit */}
            <m.g
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 44,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                transformOrigin: "270px 220px",
              }}
            >
              <circle
                cx="270"
                cy="220"
                r="128"
                stroke="#13A853"
                strokeOpacity="0.065"
              />

              <circle
                cx="270"
                cy="220"
                r="86"
                stroke="#ED3138"
                strokeOpacity="0.055"
                strokeDasharray="5 13"
              />

              <circle
                cx="270"
                cy="92"
                r="4"
                fill="#13A853"
                fillOpacity="0.75"
              />

              <circle
                cx="356"
                cy="220"
                r="4"
                fill="#ED3138"
                fillOpacity="0.7"
              />
            </m.g>

            {/* right hexagon */}
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
                transformOrigin: "1330px 335px",
              }}
            >
              <path
                d="M1330 185L1450 255L1450 395L1330 465L1210 395L1210 255L1330 185Z"
                stroke="#ED3138"
                strokeOpacity="0.06"
              />

              <path
                d="M1330 230L1410 277L1410 373L1330 420L1250 373L1250 277L1330 230Z"
                stroke="#13A853"
                strokeOpacity="0.05"
              />
            </m.g>

            {/* floating nodes */}
            {[
              [470, 170],
              [610, 760],
              [890, 160],
              [1090, 710],
              [1490, 545],
            ].map(([cx, cy], index) => (
              <m.circle
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                r={index % 2 === 0 ? 3 : 2}
                fill={index % 2 === 0 ? "#13A853" : "#ED3138"}
                animate={{
                  opacity: [0.12, 0.7, 0.12],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3.8 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.35,
                }}
                style={{
                  transformOrigin: `${cx}px ${cy}px`,
                }}
              />
            ))}
          </m.svg>
        </div>

        {/* Ambient glow */}
        <m.div
          aria-hidden="true"
          className="absolute -left-28 top-28 h-64 w-64 rounded-full bg-brand-green/[0.045] blur-3xl"
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
          className="absolute -right-28 bottom-20 h-64 w-64 rounded-full bg-brand-red/[0.04] blur-3xl"
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

        <Container className="relative z-10">
          {/* Heading */}
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
              eyebrow="Show Highlights"
              title="A Complete Business and Technology Experience"
              align="center"
            />
          </m.div>

          {/* Highlights */}
          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-5"
          >
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              const isRed = index % 4 === 1 || index % 4 === 3;

              return (
                <m.div
                  key={highlight.title}
                  variants={itemVariants}
                  className={`
                    group relative min-h-[215px] overflow-hidden
                    rounded-[1.75rem] border border-black/[0.07]
                    bg-zinc-50/80 p-6
                    transition-[transform,border-color,box-shadow,background-color]
                    duration-500
                    hover:-translate-y-1.5
                    hover:bg-white
                    sm:p-7
                    ${
                      isRed
                        ? "hover:border-brand-red/25 hover:shadow-[0_22px_65px_rgba(237,49,56,0.07)]"
                        : "hover:border-brand-green/25 hover:shadow-[0_22px_65px_rgba(19,168,83,0.07)]"
                    }
                  `}
                >
                  {/* top accent */}
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

                  {/* index */}
                  <div className="absolute right-6 top-6 flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isRed ? "bg-brand-red" : "bg-brand-green"
                      }`}
                    />

                    <span className="font-heading text-[10px] font-bold tracking-[0.18em] text-black/20">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* icon */}
                  <div
                    className={`
                      flex h-12 w-12 items-center justify-center rounded-2xl
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
                    <Icon
                      className="h-5.5 w-5.5"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </div>

                  {/* title */}
                  <div className="mt-8">
                    <p className="max-w-[220px] font-heading text-base font-bold leading-6 tracking-[-0.02em] text-black sm:text-lg">
                      {highlight.title}
                    </p>
                  </div>

                  {/* bottom rail */}
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
        </Container>
      </section>
    </LazyMotion>
  );
}