"use client";

import Image from "next/image";

import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/container";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease,
    },
  },
};

const shows = [
  {
    name: "9th India International EV Show 2027",
    description: "Electric mobility and associated technologies.",
    logo: "/logo/ev.png",
    href: "https://iievshow.com/",
  },
  {
    name: "2nd India International Solar Show 2027",
    description: "Solar energy and renewable power technologies.",
    logo: "/logo/solar.png",
    href: "https://indiasolarshow.com/",
  },
] as const;

export function CoLocatedShows() {
  const reduceMotion = useReducedMotion();

  const motionProps = {
    initial: reduceMotion ? false : "hidden",
    whileInView: "visible",
    viewport: {
      once: true,
      amount: 0.15,
    },
  } as const;

  return (
    <LazyMotion features={domAnimation}>
      <section
        aria-labelledby="co-located-heading"
        className="bg-[#faf9f7] py-14 text-[#19191c] sm:py-16 lg:py-20"
      >
        <Container>
          {/* Section heading */}
          <m.div {...motionProps} variants={reveal} className="mb-9 max-w-2xl">
            <p className="mb-3 font-heading text-[11px] font-bold uppercase tracking-[0.17em] text-[#d52d35]">
              Co-Located With
            </p>

            <h2
              id="co-located-heading"
              className="font-heading text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-tight tracking-[-0.04em]"
            >
              Connected exhibitions.
              <span className="text-[#ed3138]"> One venue.</span>
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#626269]">
              India International Battery Show 2027 will be co-located with two
              industry exhibitions covering electric mobility and solar energy.
            </p>
          </m.div>

          {/* Co-located exhibition cards */}
          <div className="grid gap-5 md:grid-cols-2">
            {shows.map((show, index) => (
              <m.a
                key={show.name}
                href={show.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${show.name} website`}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.5,
                  delay: reduceMotion ? 0 : index * 0.08,
                  ease,
                }}
                className="group flex min-h-[250px] flex-col rounded-xl border border-[#e8e6e3] bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-[#ed3138]/30 hover:shadow-[0_12px_30px_rgba(0,0,0,0.045)] sm:p-8"
              >
                {/* Logo */}
                <div className="flex h-[125px] items-center justify-center border-b border-[#efeeec] pb-6">
                  <Image
                    src={show.logo}
                    alt={`${show.name} official logo`}
                    width={320}
                    height={140}
                    sizes="(min-width: 768px) 320px, 80vw"
                    className="max-h-[95px] h-auto w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.025] motion-reduce:transform-none"
                  />
                </div>

                {/* Show details */}
                <div className="mt-6">
                  <h3 className="font-heading text-lg font-bold tracking-[-0.025em] text-[#242428]">
                    {show.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#6b6b70]">
                    {show.description}
                  </p>
                </div>
              </m.a>
            ))}
          </div>

          {/* Organiser */}
          <m.div
            {...motionProps}
            variants={reveal}
            className="mt-10 flex flex-col gap-6 border-t border-[#e5e3df] pt-8 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d52d35]">
                Organised By
              </p>

              <h3 className="mt-2 font-heading text-xl font-bold text-[#242428]">
                Futurex Group
              </h3>

              <p className="mt-2 max-w-lg text-sm leading-6 text-[#6b6b70]">
                Organiser of India Battery International Show 2027.
              </p>
            </div>

            <a
              href="https://www.futurextrade.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Futurex Group website"
              className="group flex min-h-[120px] w-full items-center justify-center rounded-xl border border-[#e8e6e3] bg-white px-7 py-5 transition-[border-color,box-shadow] duration-300 hover:border-[#ed3138]/30 hover:shadow-[0_10px_25px_rgba(0,0,0,0.04)] sm:w-[300px]"
            >
              <Image
                src="/partners/futurex-logo.png"
                alt="Futurex Group official logo"
                width={280}
                height={110}
                sizes="280px"
                className="h-auto max-h-[85px] w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.025] motion-reduce:transform-none"
              />
            </a>
          </m.div>
        </Container>
      </section>
    </LazyMotion>
  );
}
