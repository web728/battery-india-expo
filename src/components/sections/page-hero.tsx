"use client";


import Image from "next/image";

import type { ReactNode } from "react";

import {

  LazyMotion,

  domAnimation,

  m,

} from "framer-motion";


import { Container } from "@/components/ui/container";

import {

  Breadcrumbs,

  type Crumb,

} from "@/components/ui/breadcrumbs";


export function PageHero({

  eyebrow,

  title,

  description,

  breadcrumbs,

  actions,

  image,

  backgroundImage,

}: {

  eyebrow?: string;

  title: string;

  description?: string;

  breadcrumbs: Crumb[];

  actions?: ReactNode;

  image?: {

    src: string;

    alt: string;

  };

  backgroundImage?: {

    src: string;

    alt: string;

  };

}) {

  const titleWords = title.trim().split(/\s+/).filter(Boolean);


  return (

    <LazyMotion features={domAnimation}>

      <>

        <section className="relative overflow-hidden bg-black pb-14 pt-28 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-36">

          {/* Background image */}

          {backgroundImage && (

            <>

              <Image

                src={backgroundImage.src}

                alt={backgroundImage.alt}

                fill

                priority

                sizes="100vw"

                className="object-cover opacity-35"

              />


              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/88 to-black/60" />


              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />

            </>

          )}


          {/* Premium animated SVG background */}

          <div

            aria-hidden="true"

            className="pointer-events-none absolute inset-0 overflow-hidden"

          >

            <m.svg

              viewBox="0 0 1600 720"

              fill="none"

              xmlns="http://www.w3.org/2000/svg"

              className="absolute left-1/2 top-1/2 min-w-[1200px] -translate-x-1/2 -translate-y-1/2"

            >

              <defs>

                <linearGradient

                  id="hero-green-line"

                  x1="0"

                  y1="0"

                  x2="1600"

                  y2="720"

                  gradientUnits="userSpaceOnUse"

                >

                  <stop stopColor="#13A853" stopOpacity="0" />

                  <stop offset="0.45" stopColor="#13A853" stopOpacity="0.42" />

                  <stop offset="1" stopColor="#13A853" stopOpacity="0" />

                </linearGradient>


                <linearGradient

                  id="hero-red-line"

                  x1="1600"

                  y1="0"

                  x2="0"

                  y2="720"

                  gradientUnits="userSpaceOnUse"

                >

                  <stop stopColor="#13A853" stopOpacity="0" />

                  <stop offset="0.5" stopColor="#13A853" stopOpacity="0.3" />

                  <stop offset="1" stopColor="#13A853" stopOpacity="0" />

                </linearGradient>


                <radialGradient

                  id="hero-center-glow"

                  cx="0"

                  cy="0"

                  r="1"

                  gradientUnits="userSpaceOnUse"

                  gradientTransform="translate(800 360) rotate(90) scale(270 520)"

                >

                  <stop stopColor="#13A853" stopOpacity="0.11" />

                  <stop offset="1" stopColor="#13A853" stopOpacity="0" />

                </radialGradient>

              </defs>


              {/* center glow */}

              <m.ellipse

                cx="800"

                cy="360"

                rx="520"

                ry="270"

                fill="url(#hero-center-glow)"

                animate={{

                  opacity: [0.45, 0.9, 0.45],

                  scale: [1, 1.04, 1],

                }}

                transition={{

                  duration: 8,

                  repeat: Infinity,

                  ease: "easeInOut",

                }}

                style={{

                  transformOrigin: "800px 360px",

                }}

              />


              {/* green energy line */}

              <m.path

                d="M-120 500C250 275 500 255 790 350C1080 445 1320 390 1720 150"

                stroke="url(#hero-green-line)"

                strokeWidth="1.6"

                strokeLinecap="round"

                animate={{

                  x: [0, 28, 0],

                  opacity: [0.4, 0.95, 0.4],

                }}

                transition={{

                  duration: 10,

                  repeat: Infinity,

                  ease: "easeInOut",

                }}

              />


              {/* red energy line */}

              <m.path

                d="M-100 590C300 400 560 380 845 460C1130 540 1380 490 1710 310"

                stroke="url(#hero-red-line)"

                strokeWidth="1.3"

                strokeLinecap="round"

                animate={{

                  x: [0, -22, 0],

                  opacity: [0.35, 0.8, 0.35],

                }}

                transition={{

                  duration: 12,

                  repeat: Infinity,

                  ease: "easeInOut",

                }}

              />


              {/* left floating hexagon */}

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

                  transformOrigin: "245px 320px",

                }}

              >

                <path

                  d="M245 185L355 250L355 380L245 445L135 380L135 250L245 185Z"

                  stroke="#13A853"

                  strokeOpacity="0.14"

                />


                <path

                  d="M245 230L315 271L315 351L245 392L175 351L175 271L245 230Z"

                  stroke="#13A853"

                  strokeOpacity="0.1"

                />

              </m.g>


              {/* right orbit */}

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

                  transformOrigin: "1320px 170px",

                }}

              >

                <circle

                  cx="1320"

                  cy="170"

                  r="122"

                  stroke="#13A853"

                  strokeOpacity="0.14"

                />


                <circle

                  cx="1320"

                  cy="170"

                  r="78"

                  stroke="#13A853"

                  strokeOpacity="0.16"

                  strokeDasharray="6 14"

                />


                <circle

                  cx="1320"

                  cy="48"

                  r="4"

                  fill="#13A853"

                />


                <circle

                  cx="1398"

                  cy="170"

                  r="4"

                  fill="#13A853"

                />

              </m.g>


              {/* floating nodes */}

              {[

                [470, 170],

                [620, 560],

                [900, 150],

                [1090, 525],

              ].map(([cx, cy], index) => (

                <m.circle

                  key={`${cx}-${cy}`}

                  cx={cx}

                  cy={cy}

                  r={index % 2 === 0 ? 3 : 2}

                  fill={index % 2 === 0 ? "#13A853" : "#13A853"}

                  animate={{

                    opacity: [0.2, 0.8, 0.2],

                    scale: [1, 1.5, 1],

                  }}

                  transition={{

                    duration: 3.5 + index * 0.5,

                    repeat: Infinity,

                    ease: "easeInOut",

                    delay: index * 0.3,

                  }}

                  style={{

                    transformOrigin: `${cx}px ${cy}px`,

                  }}

                />

              ))}

            </m.svg>


            {/* ambient green glow */}

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


            {/* ambient red glow */}

            <m.div

              className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-brand-green/14 blur-[110px]"

              animate={{

                opacity: [0.35, 0.7, 0.35],

                scale: [1, 1.1, 1],

              }}

              transition={{

                duration: 9,

                repeat: Infinity,

                ease: "easeInOut",

              }}

            />

          </div>


          {/* top brand line */}

          <div

            aria-hidden="true"

            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-green/60 to-brand-green/55"

          />


          <Container className="relative z-10">

            <div

              className={

                image

                  ? "grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"

                  : ""

              }

            >

              {/* Content */}

              <m.div

                initial={{

                  opacity: 0,

                  y: 20,

                }}

                animate={{

                  opacity: 1,

                  y: 0,

                }}

                transition={{

                  duration: 0.65,

                  ease: [0.22, 1, 0.36, 1],

                }}

              >

                {eyebrow && (

                  <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-brand-green/25 bg-brand-green/10 px-4 py-2 backdrop-blur-sm">

                    <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />


                    <p className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-brand-green sm:text-xs">

                      {eyebrow}

                    </p>

                  </div>

                )}


                {/* White heading with only the last two words in green. */}
                  <h1 className="max-w-4xl font-heading text-3xl font-extrabold leading-[1.08] tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl xl:text-[3.5rem]">
                    {titleWords.map((word, index) => (
                      <span
                        key={`${word}-${index}`}
                        className={
                          index >= Math.max(1, titleWords.length - 2)
                            ? "text-brand-green"
                            : "text-white"
                        }
                      >
                        {word}{index < titleWords.length - 1 ? " " : ""}
                      </span>
                    ))}
                  </h1>

                {description && (

                  <p className="mt-5 max-w-2xl text-base leading-8 text-white/65 sm:text-lg sm:leading-9">

                    {description}

                  </p>

                )}


                {actions && (

                  <div className="mt-7 flex flex-wrap gap-3">

                    {actions}

                  </div>

                )}


                <div

                  aria-hidden="true"

                  className="mt-8 flex items-center gap-3"

                >

                  <span className="h-px w-12 bg-brand-green/80" />

                  <span className="h-1.5 w-1.5 rounded-full bg-white/25" />

                  <span className="h-px w-8 bg-brand-green/80" />

                </div>

              </m.div>


              {/* Optional image */}

              {image && (

                <m.div

                  initial={{

                    opacity: 0,

                    x: 24,

                    scale: 0.985,

                  }}

                  animate={{

                    opacity: 1,

                    x: 0,

                    scale: 1,

                  }}

                  transition={{

                    duration: 0.72,

                    delay: 0.08,

                    ease: [0.22, 1, 0.36, 1],

                  }}

                  className="relative"

                >

                  <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900 shadow-[0_28px_80px_rgba(0,0,0,0.32)]">

                    <div className="relative aspect-[4/3]">

                      <Image

                        src={image.src}

                        alt={image.alt}

                        fill

                        priority

                        sizes="(min-width: 1024px) 42vw, 100vw"

                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"

                      />

                    </div>


                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />


                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-green/70 to-brand-green/60" />

                  </div>

                </m.div>

              )}

            </div>

          </Container>

        </section>


        <div className="relative border-b border-black/[0.06] bg-white">

          <Breadcrumbs items={breadcrumbs} />

        </div>

      </>

    </LazyMotion>

  );

}