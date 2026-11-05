"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  Handshake,
  Layers3,
} from "lucide-react";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/container";

/**
 * 2026 figures refer to the combined India EV, Battery & Solar exhibition
 * visitor platform, not exclusively to India International Battery Show.
 * 65% = 25% business owners/founders + 23% management/team leads
 *       + 17% senior leadership (recorded visitor designations).
 * 41 letters of intent = i-Hub-supported startup engagement in 2026.
 * 2027 three-show format = Battery, EV and Solar concurrently.
 */
const stats = [
  {
    value: 20,
    suffix: "%",
    title: "Battery & energy storage",
    description:
      "Share of the visitor industry mix across the 2026 co-located exhibitions.",
    icon: Layers3,
  },
  {
    value: 65,
    suffix: "%",
    title: "Business decision-makers",
    description:
      "Owners, management and senior leadership among recorded 2026 visitor designations.",
    icon: BriefcaseBusiness,
  },
  {
    value: 41,
    suffix: "",
    title: "Letters of intent",
    description:
      "Reported through i-Hub-supported startup engagement at the 2026 platform.",
    icon: Handshake,
  },
  {
    value: 3,
    suffix: "",
    title: "Concurrent industry shows",
    description:
      "Battery, electric mobility and solar industries connect in Pune in 2027.",
    icon: BadgeCheck,
  },
] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function AnimatedValue({
  value,
  suffix,
  active,
}: {
  value: number;
  suffix: string;
  active: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState<number>(0);

  useEffect(() => {
    if (!active) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    let animation = 0;
    const duration = 1100;
    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) start = now;
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) animation = requestAnimationFrame(tick);
    };
    animation = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animation);
  }, [active, reduceMotion, value]);

  return (
    <span className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={sectionRef}
        id="show-highlights"
        aria-labelledby="stats-heading"
        className="relative bg-[#f7f7f7] py-16 sm:py-20 lg:py-24"
      >
        <Container>
          <div className="mb-9 flex flex-col gap-5 md:mb-11 md:flex-row md:items-end md:justify-between">
            <m.div
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={reveal}
              className="max-w-2xl"
            >
              <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#ed3138]">
                The Industry at a Glance
              </p>
              <h2
                id="stats-heading"
                className="font-heading text-[clamp(2rem,3.8vw,3.4rem)] font-extrabold leading-[1.13] tracking-[-0.045em] text-[#111114]"
              >
                Real connections.
                <br />
                <span className="text-[#ed3138]">Real industry impact.</span>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#626269] sm:text-base">
                A focused meeting point for battery technology, energy storage,
                electric mobility and the people driving progress.
              </p>
            </m.div>
            <Link
              href="/about"
              className="group inline-flex w-fit shrink-0 items-center gap-2 text-sm font-bold text-[#161619] transition-colors hover:text-[#ed3138] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ed3138]"
            >
              Explore the Show{" "}
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <m.div
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4"
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: 0.08 }}
          >
            {stats.map((item, index) => {
              const Icon = item.icon;
              return (
                <m.article
                  key={item.title}
                  variants={reveal}
                  className="group relative flex min-h-[245px] flex-col rounded-2xl border border-[#e7e7e9] bg-white p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#ed3138]/25 hover:shadow-[0_18px_50px_rgba(20,20,25,0.07)] sm:p-7"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eeee] text-[#ed3138] transition-colors duration-300 group-hover:bg-[#ed3138] group-hover:text-white">
                      <Icon
                        className="h-5 w-5"
                        aria-hidden="true"
                        strokeWidth={1.8}
                      />
                    </span>
                    {/* <span className="text-xs font-semibold tabular-nums text-[#a1a1aa]">0{index + 1}</span> */}
                  </div>
                  <div
                    className="font-heading text-[clamp(2.9rem,4vw,4rem)] font-extrabold leading-none tracking-[-0.065em] text-[#17171a]"
                    aria-label={`${item.value}${item.suffix}`}
                  >
                    <AnimatedValue
                      value={item.value}
                      suffix={item.suffix}
                      active={visible}
                    />
                  </div>
                  <h3 className="mt-4 font-heading text-[15px] font-extrabold text-[#1b1b1e]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.65] text-[#707078]">
                    {item.description}
                  </p>
                </m.article>
              );
            })}
          </m.div>
        </Container>
      </section>
    </LazyMotion>
  );
}
