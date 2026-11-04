"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectorIcon } from "@/components/ui/sector-icon";
import { sectors } from "@/lib/content/sectors";

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.055, delayChildren: 0.04 },
  },
};

const reveal: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function SectorsGrid() {
  const reduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="exhibition-sectors"
        aria-labelledby="sectors-title"
        className="relative bg-[#f7f7f6] py-14 text-[#171719] sm:py-16 lg:py-20"
      >
        <Container>
          <m.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 flex flex-col gap-4 sm:mb-10 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-2xl">
              <p className="mb-2 font-heading text-[11px] font-bold uppercase tracking-[0.16em] text-[#d52d35]">
                Exhibition sectors
              </p>
              <h2
                id="sectors-title"
                className="font-heading text-[clamp(1.85rem,3vw,2.75rem)] font-extrabold leading-[1.15] tracking-[-0.045em]"
              >
                Explore the battery value chain<span className="text-[#ed3138]">.</span>
              </h2>
            </div>
            <p className="max-w-[370px] text-sm leading-6 text-[#68686d]">
              From battery manufacturing and components to energy storage,
              testing and recycling.
            </p>
          </m.div>

          <m.div
            variants={stagger}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4"
          >
            {sectors.map((sector) => (
              <m.div
                key={sector.slug}
                variants={reduceMotion ? undefined : reveal}
                className="min-w-0"
              >
                <Link
                  href={`/exhibit/categories#${sector.slug}`}
                  className="group flex h-full min-h-[225px] flex-col rounded-xl border border-[#e7e7e6] bg-white p-5 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#ed3138]/35 hover:shadow-[0_12px_32px_rgba(20,20,20,0.06)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ed3138] sm:min-h-[240px] sm:p-6"
                  aria-label={`Explore ${sector.name}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#fff0f0] text-[#db3037] transition-colors duration-300 group-hover:bg-[#ed3138] group-hover:text-white">
                      <SectorIcon
                        icon={sector.icon}
                        className="h-[21px] w-[21px]"
                        aria-hidden="true"
                      />
                    </span>
                   
                  </div>

                  <h3 className="mt-6 font-heading text-[17px] font-bold leading-snug tracking-[-0.025em] text-[#19191c] sm:text-lg">
                    {sector.name}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-[13px] leading-[1.65] text-[#69696f]">
                    {sector.description}
                  </p>
                 
                </Link>
              </m.div>
            ))}
          </m.div>

          <div className="mt-7 flex justify-center sm:mt-9">
            <Link
              href="/exhibit/categories"
              className="group inline-flex min-h-11 items-center gap-2 rounded-md border border-[#202024] bg-[#202024] px-5 font-heading text-[13px] font-bold text-white transition-colors duration-300 hover:border-[#ed3138] hover:bg-[#ed3138] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ed3138]"
            >
              View all categories
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Container>
      </section>
    </LazyMotion>
  );
}
