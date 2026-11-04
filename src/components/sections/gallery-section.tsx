"use client";

import Image from "next/image";
import { ArrowUpRight, Expand } from "lucide-react";
import {
  LazyMotion,
  domAnimation,
  m,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

const galleryImages = [
  {
    image:
      "https://info.batteryindiaexpo.com/wp-content/uploads/2023/05/5p-3.jpeg",
    title: "Battery Industry Exhibition",
  },
  {
    image:
      "https://info.batteryindiaexpo.com/wp-content/uploads/2023/05/5p-1.jpeg",
    title: "Industry Networking",
  },
  {
    image:
      "https://info.batteryindiaexpo.com/wp-content/uploads/2023/05/5p-2.jpeg",
    title: "Technology Showcase",
  },
  {
    image:
      "https://info.batteryindiaexpo.com/wp-content/uploads/2026/03/SBP_3172-min-scaled-1.jpg",
    title: "Live Exhibition Experience",
  },
  {
    image:
      "https://info.batteryindiaexpo.com/wp-content/uploads/2023/03/WhatsApp-Image-2023-03-24-at-12.57.09-AM.jpeg",
    title: "Business Connections",
  },
  {
    image:
      "https://info.batteryindiaexpo.com/wp-content/uploads/2023/03/exhibiting_227681290_0-min.jpg",
    title: "Exhibitor Showcase",
  },
  {
    image:
      "https://info.batteryindiaexpo.com/wp-content/uploads/2022/09/277527150_1022182995341916_4773007713539910118_n-1.jpg",
    title: "Previous Edition",
  },
  {
    image:
      "https://info.batteryindiaexpo.com/wp-content/uploads/2022/09/277756487_1022183295341886_6728238397737750234_n.jpg",
    title: "Show Floor",
  },
] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.06,
    },
  },
};

const imageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function GallerySection() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative overflow-hidden bg-black py-20 sm:py-24 lg:py-28">
        {/* Animated background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <m.svg
            viewBox="0 0 1600 1000"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-1/2 top-1/2 min-w-[1250px] -translate-x-1/2 -translate-y-1/2"
          >
            <defs>
              <linearGradient
                id="gallery-green"
                x1="0"
                y1="0"
                x2="1600"
                y2="1000"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#13A853" stopOpacity="0" />
                <stop offset="0.45" stopColor="#13A853" stopOpacity="0.22" />
                <stop offset="1" stopColor="#13A853" stopOpacity="0" />
              </linearGradient>

              <linearGradient
                id="gallery-red"
                x1="1600"
                y1="0"
                x2="0"
                y2="1000"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#ED3138" stopOpacity="0" />
                <stop offset="0.5" stopColor="#ED3138" stopOpacity="0.16" />
                <stop offset="1" stopColor="#ED3138" stopOpacity="0" />
              </linearGradient>
            </defs>

            <m.path
              d="M-100 740C280 500 520 470 810 570C1100 670 1330 610 1700 320"
              stroke="url(#gallery-green)"
              strokeWidth="1.5"
              strokeLinecap="round"
              animate={{
                x: [0, 24, 0],
                opacity: [0.35, 0.8, 0.35],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <m.path
              d="M-100 820C310 620 570 580 850 660C1140 745 1380 690 1700 500"
              stroke="url(#gallery-red)"
              strokeWidth="1.2"
              strokeLinecap="round"
              animate={{
                x: [0, -18, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <m.g
              animate={{ rotate: 360 }}
              transition={{
                duration: 50,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                transformOrigin: "1320px 220px",
              }}
            >
              <circle
                cx="1320"
                cy="220"
                r="150"
                stroke="#13A853"
                strokeOpacity="0.08"
              />

              <circle
                cx="1320"
                cy="220"
                r="105"
                stroke="#ED3138"
                strokeOpacity="0.07"
                strokeDasharray="6 14"
              />

              <circle
                cx="1320"
                cy="70"
                r="4"
                fill="#13A853"
              />

              <circle
                cx="1425"
                cy="220"
                r="4"
                fill="#ED3138"
              />
            </m.g>

            <m.g
              animate={{
                y: [-8, 8, -8],
                rotate: [-2, 2, -2],
              }}
              transition={{
                duration: 11,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                transformOrigin: "240px 320px",
              }}
            >
              <path
                d="M240 175L365 248L365 394L240 467L115 394L115 248L240 175Z"
                stroke="#13A853"
                strokeOpacity="0.07"
              />

              <path
                d="M240 225L322 273L322 369L240 417L158 369L158 273L240 225Z"
                stroke="#ED3138"
                strokeOpacity="0.05"
              />
            </m.g>
          </m.svg>
        </div>

        {/* Ambient glows */}
        <m.div
          aria-hidden="true"
          className="absolute -left-32 top-32 h-80 w-80 rounded-full bg-brand-green/12 blur-[120px]"
          animate={{
            opacity: [0.4, 0.75, 0.4],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <m.div
          aria-hidden="true"
          className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-brand-red/10 blur-[120px]"
          animate={{
            opacity: [0.35, 0.65, 0.35],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-green/50 to-brand-red/40"
        />

        <Container className="relative z-10">
          {/* Heading */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <SectionHeading
              eyebrow="Gallery"
              title="Experience the Energy of the Show"
              align="center"
              light
            />
          </m.div>

          {/* Gallery */}
          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-14 lg:grid-cols-4"
          >
            {galleryImages.map((item, index) => {
              const featured = index === 0 || index === 3;
              const isRed = index % 4 === 1 || index % 4 === 3;

              return (
                <m.div
                  key={item.image}
                  variants={imageVariants}
                  className={
                    featured
                      ? "col-span-2 row-span-2"
                      : "col-span-1"
                  }
                >
                  <div
                    className={`group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-900 ${
                      featured
                        ? "aspect-[4/3] sm:aspect-[16/10]"
                        : "aspect-square sm:aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes={
                        featured
                          ? "(max-width: 768px) 100vw, 50vw"
                          : "(max-width: 768px) 50vw, 25vw"
                      }
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />

                    {/* dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* brand tint */}
                    <div
                      className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                        isRed
                          ? "bg-brand-red/[0.06]"
                          : "bg-brand-green/[0.06]"
                      }`}
                    />

                    {/* top rail */}
                    <div
                      aria-hidden="true"
                      className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                        isRed
                          ? "via-brand-red/80"
                          : "via-brand-green/80"
                      }`}
                    />

                    {/* expand icon */}
                    <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white opacity-0 backdrop-blur-md transition-[opacity,transform] duration-300 group-hover:scale-105 group-hover:opacity-100">
                      <Expand
                        className="h-4 w-4"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </div>

                    {/* caption */}
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isRed
                              ? "bg-brand-red"
                              : "bg-brand-green"
                          }`}
                        />

                        <span
                          className={`font-heading text-[10px] font-bold uppercase tracking-[0.16em] ${
                            isRed
                              ? "text-brand-red"
                              : "text-brand-green"
                          }`}
                        >
                          Previous Edition
                        </span>
                      </div>

                      <p className="mt-2 font-heading text-sm font-bold tracking-[-0.02em] text-white sm:text-base">
                        {item.title}
                      </p>
                    </div>

                    {/* bottom hover accent */}
                    <div
                      aria-hidden="true"
                      className={`absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 transition-all duration-500 group-hover:w-2/3 ${
                        isRed
                          ? "bg-brand-red"
                          : "bg-brand-green"
                      }`}
                    />
                  </div>
                </m.div>
              );
            })}
          </m.div>

          {/* CTA */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.55,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-10 flex justify-center"
          >
            <Button
              href="/media/gallery"
              variant="primary"
              className="group gap-2 rounded-full px-7"
            >
              View Full Gallery

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