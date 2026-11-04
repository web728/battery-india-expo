"use client";

import {
  LazyMotion,
  domAnimation,
  m,
} from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { NewsletterForm } from "@/components/forms/newsletter-form";

export function NewsletterSection() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative overflow-hidden bg-brand-green py-14 sm:py-16 lg:py-20">
        {/* Animated background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <m.svg
            viewBox="0 0 1600 520"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-1/2 top-1/2 min-w-[1100px] -translate-x-1/2 -translate-y-1/2"
          >
            <defs>
              <linearGradient
                id="newsletter-white-line"
                x1="0"
                y1="0"
                x2="1600"
                y2="520"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FFFFFF" stopOpacity="0" />
                <stop offset="0.45" stopColor="#FFFFFF" stopOpacity="0.22" />
                <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>

              <linearGradient
                id="newsletter-red-line"
                x1="1600"
                y1="0"
                x2="0"
                y2="520"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#ED3138" stopOpacity="0" />
                <stop offset="0.5" stopColor="#ED3138" stopOpacity="0.28" />
                <stop offset="1" stopColor="#ED3138" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Main white energy curve */}
            <m.path
              d="M-120 365C260 170 510 165 800 255C1090 345 1320 300 1720 80"
              stroke="url(#newsletter-white-line)"
              strokeWidth="1.4"
              strokeLinecap="round"
              animate={{
                x: [0, 22, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Red secondary curve */}
            <m.path
              d="M-100 430C330 255 580 245 850 320C1130 400 1370 350 1710 190"
              stroke="url(#newsletter-red-line)"
              strokeWidth="1.15"
              strokeLinecap="round"
              animate={{
                x: [0, -16, 0],
                opacity: [0.3, 0.65, 0.3],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Right orbit */}
            <m.g
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 38,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                transformOrigin: "1320px 125px",
              }}
            >
              <circle
                cx="1320"
                cy="125"
                r="100"
                stroke="#FFFFFF"
                strokeOpacity="0.12"
              />

              <circle
                cx="1320"
                cy="125"
                r="58"
                stroke="#ED3138"
                strokeOpacity="0.2"
                strokeDasharray="5 12"
              />

              <circle
                cx="1320"
                cy="25"
                r="4"
                fill="#FFFFFF"
                fillOpacity="0.8"
              />

              <circle
                cx="1378"
                cy="125"
                r="4"
                fill="#ED3138"
              />
            </m.g>

            {/* Left subtle geometry */}
            <m.g
              animate={{
                y: [-6, 6, -6],
                rotate: [-2, 2, -2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                transformOrigin: "220px 260px",
              }}
            >
              <path
                d="M220 175L305 225L305 325L220 375L135 325L135 225L220 175Z"
                stroke="#FFFFFF"
                strokeOpacity="0.09"
              />

              <path
                d="M220 210L275 242L275 308L220 340L165 308L165 242L220 210Z"
                stroke="#ED3138"
                strokeOpacity="0.13"
              />
            </m.g>
          </m.svg>

          {/* black ambient depth */}
          <m.div
            className="absolute -left-24 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full bg-black/15 blur-3xl"
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* red ambient glow */}
          <m.div
            className="absolute -right-20 bottom-0 h-52 w-52 rounded-full bg-brand-red/20 blur-3xl"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Top hairline */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-brand-red/45"
        />

        <Container className="relative z-10">
          <div className="mx-auto max-w-2xl">
            {/* Heading */}
            <m.div
              initial={{
                opacity: 0,
                y: 16,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.5,
              }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <SectionHeading
                eyebrow="Newsletter"
                title="Stay Informed"
                description="Get exhibitor announcements, conference updates and registration news."
                align="center"
                light
              />
            </m.div>

            {/* Form shell */}
            <m.div
              initial={{
                opacity: 0,
                y: 18,
                scale: 0.99,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.55,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative mt-7 overflow-hidden rounded-[1.5rem] border border-white/20 bg-black/12 p-4 shadow-[0_20px_55px_rgba(0,0,0,0.16)] backdrop-blur-md sm:p-6"
            >
              {/* top highlight */}
              <div
                aria-hidden="true"
                className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/65 to-transparent"
              />

              {/* subtle inner glow */}
              <div
                aria-hidden="true"
                className="absolute -right-14 -top-14 h-32 w-32 rounded-full bg-white/[0.06] blur-3xl"
              />

              {/* red micro accent */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-0 h-0.5 w-10 -translate-x-1/2 rounded-full bg-brand-red"
              />

              <div className="relative z-10">
                <NewsletterForm />
              </div>
            </m.div>
          </div>
        </Container>
      </section>
    </LazyMotion>
  );
}