"use client";

import Image from "next/image";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";

const ease = [0.22, 1, 0.36, 1] as const;

export function AboutPageContent() {
  const reduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <section
        aria-labelledby="about-show-heading"
        className="relative overflow-hidden bg-[#faf9f7] py-14 text-[#1b1b1d] sm:py-20 lg:py-24"
      >
        <Container>
          <div className="grid items-center gap-9 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:gap-14 xl:gap-20">
            <m.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, ease }}
              className="max-w-[620px]"
            >
              <p className="mb-4 font-heading text-[11px] font-bold uppercase tracking-[0.17em] text-[#d62e36]">
                India International Battery Show
              </p>

              <h2
                id="about-show-heading"
                className="font-heading text-[clamp(2rem,3.8vw,3.35rem)] font-extrabold leading-[1.1] tracking-[-0.045em]"
              >
                About the <span className="text-[#ed3138]">Show</span>
              </h2>

              <div className="mt-6 space-y-4 text-[15px] leading-[1.85] text-[#56565b] sm:text-base">
                <p>
                  India International Battery Show is a trade exhibition
                  dedicated to battery technologies, manufacturing and energy
                  storage. The show brings together battery manufacturers, cell
                  makers, pack integrators, component suppliers and research
                  organisations.
                </p>
                <p>
                  The exhibition covers battery cells and packs, battery
                  management systems, production equipment, testing, recycling
                  and energy storage solutions for electric mobility, renewable
                  energy and industrial applications.
                </p>
                <p>
                  Alongside product displays, the programme includes technical
                  discussions and opportunities for industry networking.
                </p>
              </div>
            </m.div>

            <m.figure
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: reduceMotion ? 0 : 0.1,
                ease,
              }}
              className="min-w-0"
            >
              <div className="group relative aspect-[5/4] overflow-hidden rounded-lg bg-[#202024] sm:aspect-[6/4] lg:aspect-[5/4]">
                <Image
                  src="/images/expo-vip-lounge-branding.jpg"
                  alt="Industry representatives at a previous exhibition"
                  fill
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transform-none"
                />
              </div>
            </m.figure>
          </div>
        </Container>
      </section>
    </LazyMotion>
  );
}
