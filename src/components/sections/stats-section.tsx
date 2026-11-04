
"use client";

import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from "framer-motion";

import { Container } from "@/components/ui/container";

const stats = [
  {
    value: "20%",
    label: "Battery & energy storage",
    detail: "Share of visitors by industry",
  },
  {
    value: "65%",
    label: "Business leadership",
    detail: "Owners, managers & senior leaders",
  },
  {
    value: "41",
    label: "Letters of intent",
    detail: "Startup engagement",
  },
] as const;

export function StatsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <section
        aria-labelledby="stats-title"
        className="relative bg-[#f7f7f6] py-12 text-[#171719] sm:py-14 lg:py-16"
      >
        <Container>
          <div className="mb-7 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div>
              <p className="mb-2 font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-[#c82e35]">
                2026 Event Highlights
              </p>

              <h2
                id="stats-title"
                className="font-heading text-[clamp(1.5rem,2.6vw,2.15rem)] font-extrabold leading-tight tracking-[-0.035em]"
              >
                Industry in numbers
                <span className="text-[#ed3138]">.</span>
              </h2>
            </div>

           
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {stats.map((stat, index) => (
              <m.div
                key={stat.label}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: reduceMotion ? 0 : index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group rounded-xl border border-[#e9e9e8] bg-white px-5 py-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[#ed3138]/25 hover:shadow-[0_10px_28px_rgba(30,30,30,0.045)] sm:px-6 sm:py-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-heading text-[clamp(2rem,3.2vw,2.6rem)] font-extrabold leading-none tracking-[-0.05em] tabular-nums text-[#171719]">
                    {stat.value}
                  </span>

                  <span
                    aria-hidden="true"
                    className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ed3138]"
                  />
                </div>

                <h3 className="mt-4 font-heading text-sm font-bold leading-5 text-[#242426] sm:text-[15px]">
                  {stat.label}
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#77777b]">
                  {stat.detail}
                </p>
              </m.div>
            ))}
          </div>
        </Container>
      </section>
    </LazyMotion>
  );
}
