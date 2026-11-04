"use client";

import Link from "next/link";
import { ArrowUpRight, Compass, Handshake, PackageSearch } from "lucide-react";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/container";

const cards = [
  {
    key: "exhibit",
    number: "01",
    icon: PackageSearch,
    eyebrow: "FOR EXHIBITORS",
    title: "Exhibit",
    description:
      "Showcase your solutions, meet qualified buyers and grow your business across the battery value chain.",
    cta: "Explore Exhibiting",
    href: "/exhibit",
    accent: "red",
  },
  {
    key: "visit",
    number: "02",
    icon: Compass,
    eyebrow: "FOR VISITORS",
    title: "Visit",
    description:
      "Explore new technologies, discover reliable suppliers and connect with industry specialists.",
    cta: "Plan Your Visit",
    href: "/visit",
    accent: "green",
  },
  {
    key: "partner",
    number: "03",
    icon: Handshake,
    eyebrow: "FOR PARTNERS",
    title: "Partner",
    description:
      "Build a stronger brand presence through sponsorship and strategic industry collaborations.",
    cta: "View Partnerships",
    href: "/exhibit/sponsorship",
    accent: "dark",
  },
] as const;

const accents = {
  red: {
    icon: "bg-[#ED3138]/[0.09] text-[#ED3138]",
    hover: "group-hover:bg-[#ED3138] group-hover:text-white",
  },
  green: {
    icon: "bg-[#13A853]/[0.09] text-[#13A853]",
    hover: "group-hover:bg-[#13A853] group-hover:text-white",
  },
  dark: {
    icon: "bg-zinc-100 text-zinc-900",
    hover: "group-hover:bg-zinc-900 group-hover:text-white",
  },
} as const;

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.04 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
  },
};

export function QuickActionCards() {
  const reducedMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <section
        aria-labelledby="quick-actions-title"
        className="relative isolate bg-[#F7F7F7] py-16 sm:py-20 lg:py-24"
      >
        <Container>
          <m.div
            initial={reducedMotion ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 flex flex-col gap-4 sm:mb-10 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#ED3138]">
                GET INVOLVED
              </p>
              <h2
                id="quick-actions-title"
                className="max-w-2xl font-heading text-[clamp(1.85rem,3.5vw,3rem)] font-extrabold leading-[1.12] tracking-[-0.045em] text-[#111113]"
              >
                Be part of what&apos;s next.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-zinc-600 sm:text-[15px]">
              Three ways to connect with the people and technologies moving the
              battery industry forward.
            </p>
          </m.div>

          <m.div
            variants={gridVariants}
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5"
          >
            {cards.map((card) => {
              const Icon = card.icon;
              const accent = accents[card.accent];

              return (
                <m.div
                  key={card.key}
                  variants={reducedMotion ? undefined : cardVariants}
                  className="min-w-0"
                >
                  <Link
                    href={card.href}
                    className="group relative flex h-full min-h-[270px] flex-col rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.035)] outline-none transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_18px_40px_rgba(0,0,0,0.09)] focus-visible:ring-2 focus-visible:ring-[#ED3138] focus-visible:ring-offset-4 sm:p-7 lg:min-h-[290px] lg:p-8 motion-reduce:transform-none"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-[background-color,color,transform] duration-300 group-hover:-translate-y-0.5 ${accent.icon} ${accent.hover} motion-reduce:transform-none`}
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <span className="font-heading text-xs font-extrabold tracking-[0.12em] text-zinc-300">
                        {card.number}
                      </span>
                    </div>

                    <div className="mt-7">
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                        {card.eyebrow}
                      </p>
                      <h3 className="mt-2 font-heading text-[1.65rem] font-extrabold tracking-[-0.035em] text-[#111113]">
                        {card.title}
                      </h3>
                      <p className="mt-2.5 max-w-sm text-[13px] leading-[1.8] text-zinc-600 sm:text-sm">
                        {card.description}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-7">
                      <span className="font-heading text-[13px] font-bold text-[#111113] transition-colors duration-300 group-hover:text-[#ED3138] sm:text-sm">
                        {card.cta}
                      </span>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#111113] text-white transition-[background-color,transform] duration-300 group-hover:scale-105 group-hover:bg-[#ED3138] motion-reduce:transform-none">
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </Link>
                </m.div>
              );
            })}
          </m.div>
        </Container>
      </section>
    </LazyMotion>
  );
}
