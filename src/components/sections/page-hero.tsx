"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { Breadcrumbs, type Crumb } from "@/components/ui/breadcrumbs";

type HeroImage = {
  src: string;
  alt: string;
};

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs: Crumb[];
  actions?: ReactNode;
  /** Optional editorial image alongside the title. */
  image?: HeroImage;
  /** Optional full-bleed photograph behind the title. */
  backgroundImage?: HeroImage;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Shared inner-page hero for About / Exhibit / Visit / Conference / Media.
 * Keep the content visible at first paint; Motion only animates the accent rule.
 *
 * The global Header is fixed. Hero top padding accounts for that header.
 * The parent page owns metadata, JSON-LD and its unique H1 copy.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  actions,
  image,
  backgroundImage,
}: PageHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <LazyMotion features={domAnimation}>
        <section
          aria-labelledby="page-hero-title"
          className="relative isolate overflow-hidden bg-surface-dark text-white"
        >
          {backgroundImage && (
            <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
              <Image
                src={backgroundImage.src}
                alt=""
                fill
                priority
                fetchPriority="high"
                quality={80}
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(25,28,33,0.97)_0%,rgba(25,28,33,0.88)_48%,rgba(25,28,33,0.63)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface-dark/70 to-transparent" />
            </div>
          )}

          <Container className="relative z-10">
            <div
              className={[
                "grid items-center gap-9",
                "pt-32 pb-14 sm:pt-36 sm:pb-16 lg:pt-40 lg:pb-20",
                image ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14" : "",
              ].join(" ")}
            >
              <div className="min-w-0 max-w-[850px]">
                {eyebrow && (
                  <div className="mb-5 flex items-center gap-3 sm:mb-6">
                    <m.span
                      aria-hidden="true"
                      className="h-0.5 w-7 shrink-0 origin-left bg-brand-red"
                      initial={reduceMotion ? false : { scaleX: 0.55 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE }}
                    />
                    <p className="font-heading text-[11px] font-bold uppercase tracking-[0.15em] text-[#F2A4A9] sm:text-xs">
                      {eyebrow}
                    </p>
                  </div>
                )}

                <h1
                  id="page-hero-title"
                  className="max-w-[850px] font-heading text-[clamp(2.25rem,4.3vw,3.75rem)] font-extrabold leading-[1.12] tracking-[-0.04em] text-white [text-wrap:balance]"
                >
                  {title}
                </h1>

                {description && (
                  <p className="mt-5 max-w-[690px] font-body text-[15px] leading-[1.75] text-white/75 sm:mt-6 sm:text-[17px]">
                    {description}
                  </p>
                )}

                {actions && (
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    {actions}
                  </div>
                )}
              </div>

              {image && (
                <figure className="min-w-0">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-image border border-white/15 bg-surface-dark-elevated sm:aspect-[4/3] lg:aspect-[5/4]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      priority={!backgroundImage}
                      quality={80}
                      sizes="(max-width: 1023px) 100vw, 40vw"
                      className="object-cover object-center"
                    />
                  </div>
                </figure>
              )}
            </div>
          </Container>
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-white/15" />
        </section>
      </LazyMotion>

      <div className="border-b border-border bg-surface text-foreground">
        <Breadcrumbs items={breadcrumbs} />
      </div>
    </>
  );
}
