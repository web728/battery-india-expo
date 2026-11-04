"use client";

import { ArrowUpRight, Handshake, Ticket } from "lucide-react";
import { LazyMotion, domAnimation, m } from "framer-motion";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative overflow-hidden bg-black py-16 sm:py-20 lg:py-24">
        {/* Animated background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <m.svg
            viewBox="0 0 1600 620"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-1/2 top-1/2 min-w-[1150px] -translate-x-1/2 -translate-y-1/2"
          >
            <defs>
              <linearGradient
                id="final-green"
                x1="0"
                y1="0"
                x2="1600"
                y2="620"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#13A853" stopOpacity="0" />
                <stop offset="0.45" stopColor="#13A853" stopOpacity="0.42" />
                <stop offset="1" stopColor="#13A853" stopOpacity="0" />
              </linearGradient>

              <linearGradient
                id="final-red"
                x1="1600"
                y1="0"
                x2="0"
                y2="620"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#ED3138" stopOpacity="0" />
                <stop offset="0.5" stopColor="#ED3138" stopOpacity="0.34" />
                <stop offset="1" stopColor="#ED3138" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* green flow */}
            <m.path
              d="M-120 430C250 210 500 205 790 305C1080 405 1320 350 1720 110"
              stroke="url(#final-green)"
              strokeWidth="1.6"
              strokeLinecap="round"
              animate={{
                x: [0, 26, 0],
                opacity: [0.45, 0.95, 0.45],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* red flow */}
            <m.path
              d="M-100 510C300 320 560 300 845 380C1130 460 1380 410 1710 230"
              stroke="url(#final-red)"
              strokeWidth="1.35"
              strokeLinecap="round"
              animate={{
                x: [0, -20, 0],
                opacity: [0.4, 0.85, 0.4],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* left floating geometry */}
            <m.g
              animate={{
                y: [-7, 7, -7],
                rotate: [-2, 2, -2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                transformOrigin: "250px 310px",
              }}
            >
              <path
                d="M250 205L350 263L350 379L250 437L150 379L150 263L250 205Z"
                stroke="#13A853"
                strokeOpacity="0.11"
              />

              <path
                d="M250 245L315 283L315 359L250 397L185 359L185 283L250 245Z"
                stroke="#ED3138"
                strokeOpacity="0.09"
              />
            </m.g>

            {/* right orbital system */}
            <m.g
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 42,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                transformOrigin: "1320px 145px",
              }}
            >
              <circle
                cx="1320"
                cy="145"
                r="116"
                stroke="#13A853"
                strokeOpacity="0.13"
                strokeDasharray="7 13"
              />

              <circle
                cx="1320"
                cy="145"
                r="72"
                stroke="#ED3138"
                strokeOpacity="0.16"
              />

              <circle cx="1320" cy="29" r="4" fill="#13A853" />

              <circle cx="1392" cy="145" r="4" fill="#ED3138" />
            </m.g>
          </m.svg>

          {/* glows */}
          <m.div
            className="absolute -left-28 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-brand-green/16 blur-[110px]"
            animate={{
              opacity: [0.4, 0.75, 0.4],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <m.div
            className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-brand-red/16 blur-[110px]"
            animate={{
              opacity: [0.35, 0.72, 0.35],
              scale: [1, 1.12, 1],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* top line */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-green/45 to-brand-red/45"
        />

        <Container className="relative z-10">
          <m.div
            initial={{
              opacity: 0,
              y: 22,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: 0.62,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto max-w-4xl text-center"
          >
            {/* badge */}
            <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-brand-red/25 bg-brand-red/10 px-4 py-2 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />

              <span className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-brand-red sm:text-xs">
                Join the Industry
              </span>
            </div>

            {/* heading */}
            <h2 className="font-heading text-3xl font-extrabold tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">
              Be Part of India&apos;s
              <span className="text-brand-green"> Battery </span>&
              <span className="text-brand-red"> Energy Storage </span>
              Ecosystem
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
              Connect with manufacturers, suppliers, technology leaders and
              decision-makers shaping the future of batteries, mobility and
              energy storage.
            </p>

            {/* CTA cluster */}
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Button
                href="/exhibit/book-a-stand"
                variant="primary"
                size="lg"
                className="group gap-2 rounded-full bg-brand-green px-7 text-white shadow-[0_12px_35px_rgba(19,168,83,0.24)] hover:bg-[#0f9148]"
              >
                Book a Stand
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Button>

              <Button
                href="/visit/register"
                size="lg"
                className="group gap-2 rounded-full bg-brand-red px-7 text-white shadow-[0_12px_35px_rgba(237,49,56,0.22)] hover:bg-[#d72930]"
              >
                <Ticket
                  className="h-4 w-4"
                  strokeWidth={1.9}
                  aria-hidden="true"
                />
                Register to Visit
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Button>

              <Button
                href="/exhibit/sponsorship"
                variant="outline-white"
                size="lg"
                className="group gap-2 rounded-full border-white/20 px-7 hover:border-brand-red/50 hover:bg-brand-red/10"
              >
                <Handshake
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                  strokeWidth={1.9}
                  aria-hidden="true"
                />
                Become a Sponsor
              </Button>
            </div>

            {/* micro brand finish */}
            <div
              aria-hidden="true"
              className="mx-auto mt-9 flex w-fit items-center gap-3"
            >
              <span className="h-px w-10 bg-brand-green/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
              <span className="h-px w-10 bg-brand-red/60" />
            </div>
          </m.div>
        </Container>
      </section>
    </LazyMotion>
  );
}
