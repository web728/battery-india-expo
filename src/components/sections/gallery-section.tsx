
"use client";

import {
  useRef,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  Images,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from "framer-motion";

import { Container } from "@/components/ui/container";

/* ---------------------------------------------
   INDIA BATTERY INTERNATIONAL SHOW

   Homepage: Event Highlights & Testimonials

   Theme: Hybrid Industrial Editorial

   - White editorial background
   - Real exhibition photography
   - Optional video testimonials
   - Native accessible photo dialog
   - No autoplay background videos
   - Optimized Next.js images
   - Minimal Framer Motion
--------------------------------------------- */

type GalleryImage = {
  src: string;
  title: string;
  alt: string;
};

type VideoItem = {
  id: string;
  src: string;
  poster: string;
  title: string;
  category: string;
  speaker?: string;
  designation?: string;
};

/*
  Existing photographs preserved.

  Homepage displays four curated images.
  Full gallery remains at /media/gallery.

  Confirm ownership and licensing before
  publishing third-party hosted photographs.
*/


const galleryImages: GalleryImage[] = [
  {
    src: "/images/batt.webp",
    title: "Battery Industry Exhibition",
    alt: "Exhibitors at India Battery International Show",
  },
  {
    src: "/images/DSC01619.JPG.webp",
    title: "Industry Networking",
    alt: "Industry professionals networking at the battery exhibition",
  },
  {
    src: "/images/DSC01761.JPG.webp",
    title: "Technology Showcase",
    alt: "Battery manufacturing and technology exhibits",
  },
  {
    src: "/images/DSC02372.JPG.webp",
    title: "Exhibition Highlights",
    alt: "Visitors exploring the battery exhibition floor",
  },
];


/*
  VIDEO TESTIMONIALS

  Add only genuine, published video assets.

  Videos will appear automatically when
  this array contains valid entries.

  Example:

  {
    id: "exhibitor-interview-01",
    src: "/videos/exhibitor-interview-01.mp4",
    poster: "/images/videos/exhibitor-01.webp",
    title: "Exhibitor Experience",
    category: "Exhibitor Testimonial",
    speaker: "Actual speaker name",
    designation: "Actual designation and company",
  }

  Recommended:
  - MP4 H.264
  - Poster WebP/AVIF
  - Captions for spoken content
  - Short clips for the homepage

  No placeholder videos are rendered.
*/

const featuredVideos: VideoItem[] = [
  {
    id: "exhibitor-01",
    src: "/videos/exhibitor-1.mp4",
    poster: "/images/testimonials/exhibitor-1.webp",
    title: "Exhibitor Experience",
    category: "Exhibitor Testimonial",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function GallerySection() {
  const reduceMotion = useReducedMotion();

  const dialogRef = useRef<HTMLDialogElement>(null);

  const [selectedImage, setSelectedImage] =
    useState<number>(0);

  const [activeVideo, setActiveVideo] =
    useState<string | null>(null);

  const hasVideos = featuredVideos.length > 0;

  function openImage(index: number) {
    setSelectedImage(index);
    dialogRef.current?.showModal();
  }

  function closeImage() {
    dialogRef.current?.close();
  }

  function changeImage(direction: number) {
    setSelectedImage((current) => {
      return (
        current +
        direction +
        galleryImages.length
      ) % galleryImages.length;
    });
  }

  const currentImage = galleryImages[selectedImage];

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="event-highlights"
        aria-labelledby="event-highlights-title"
        className="relative isolate overflow-hidden bg-surface py-16 text-foreground sm:py-20 lg:py-24 xl:py-28"
      >
        <Container>
          {/* SECTION HEADING */}

          <div className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end lg:gap-12">
            <div className="max-w-[760px]">
              <div className="mb-5 flex items-center gap-3">
                <m.span
                  aria-hidden="true"
                  className="h-0.5 w-7 shrink-0 origin-left bg-brand-red"
                  initial={
                    reduceMotion
                      ? false
                      : { scaleX: 0.55 }
                  }
                  whileInView={{ scaleX: 1 }}
                  viewport={{
                    once: true,
                    amount: 0.5,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.5,
                    ease: EASE,
                  }}
                />

                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.15em] text-brand-red sm:text-xs">
                  Event Highlights
                </p>
              </div>

              <h2
                id="event-highlights-title"
                className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-[-0.035em] text-foreground [text-wrap:balance]"
              >
                Experience the Show.
                <span className="block">
                  See the Industry in Action
                  <span className="text-brand-red">.</span>
                </span>
              </h2>
            </div>

            <p className="max-w-[430px] font-body text-sm leading-[1.75] text-muted sm:text-base">
              Explore moments from previous
              exhibitions, discover industry
              connections and experience the
              technologies shaping the battery
              ecosystem.
            </p>
          </div>

          {/* EDITORIAL TOP DIVIDER */}

          <div
            aria-hidden="true"
            className="mb-7 h-px w-full bg-border sm:mb-9"
          />

          {/* PHOTO GALLERY */}

          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:gap-5">
            {/* FEATURED PHOTOGRAPH */}

            <button
              type="button"
              onClick={() => openImage(0)}
              aria-label={`View photo: ${galleryImages[0].title}`}
              className="group relative block min-w-0 overflow-hidden rounded-image bg-surface-muted text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
            >
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[470px]">
                <Image
                  src={galleryImages[0].src}
                  alt={galleryImages[0].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.035] motion-reduce:transform-none"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
                  <div>
                    <p className="font-body text-[11px] font-semibold uppercase tracking-[0.13em] text-white/75">
                      Exhibition Highlights
                    </p>

                    <h3 className="mt-2 font-heading text-lg font-bold tracking-[-0.025em] text-white sm:text-xl">
                      {galleryImages[0].title}
                    </h3>
                  </div>

                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/40 bg-black/20 text-white"
                  >
                    <Images className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </button>

            {/* SUPPORTING PHOTOGRAPHS */}

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {galleryImages.slice(1).map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => openImage(index + 1)}
                  aria-label={`View photo: ${image.title}`}
                  className={[
                    "group relative min-w-0",
                    "overflow-hidden rounded-image",
                    "bg-surface-muted text-left",
                    "focus-visible:outline-2",
                    "focus-visible:outline-offset-2",
                    "focus-visible:outline-brand-red",
                    index === 2 ? "col-span-2" : "",
                  ].join(" ")}
                >
                  <div
                    className={
                      index === 2
                        ? "relative aspect-[16/7] w-full lg:aspect-auto lg:h-full"
                        : "relative aspect-square w-full lg:aspect-auto lg:h-full"
                    }
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes={
                        index === 2
                          ? "(max-width: 1024px) 100vw, 40vw"
                          : "(max-width: 1024px) 50vw, 20vw"
                      }
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.035] motion-reduce:transform-none"
                    />

                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent"
                    />

                    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                      <p className="font-heading text-xs font-bold leading-[1.4] text-white sm:text-sm">
                        {image.title}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* OPTIONAL VIDEO & TESTIMONIAL SECTION */}

          {/* {hasVideos && (
            <div className="mt-14 border-t border-border pt-10 sm:mt-16 sm:pt-12">
              <div className="mb-7 flex flex-col gap-3 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-brand-red">
                    Industry Voices
                  </p>

                  <h3 className="mt-3 font-heading text-[clamp(1.5rem,2.6vw,2rem)] font-bold leading-[1.2] tracking-[-0.03em] text-foreground">
                    Hear from the Industry
                  </h3>
                </div>

                <p className="max-w-[360px] text-sm leading-[1.7] text-muted">
                  First-hand experiences from
                  exhibition participants and
                  industry professionals.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {featuredVideos.map((video) => {
                  const playing = activeVideo === video.id;

                  return (
                    <article
                      key={video.id}
                      className="min-w-0 overflow-hidden rounded-card border border-border bg-background"
                    >
                      <div className="relative aspect-video overflow-hidden bg-surface-dark">
                        {playing ? (
                          <video
                            key={video.id}
                            controls
                            playsInline
                            autoPlay
                            preload="none"
                            poster={video.poster}
                            className="h-full w-full object-contain"
                            aria-label={video.title}
                          >
                            <source
                              src={video.src}
                              type="video/mp4"
                            />
                            Your browser does not
                            support HTML video.
                          </video>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              setActiveVideo(video.id)
                            }
                            aria-label={`Play ${video.title}`}
                            className="group absolute inset-0 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
                          >
                            <Image
                              src={video.poster}
                              alt=""
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transform-none"
                            />

                            <span className="absolute inset-0 bg-black/25" />

                            <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/80 bg-black/55 text-white transition-transform duration-200 group-hover:scale-105 motion-reduce:transform-none">
                              <Play
                                className="ml-0.5 h-5 w-5 fill-current"
                                aria-hidden="true"
                              />
                            </span>
                          </button>
                        )}
                      </div>

                      <div className="p-5 sm:p-6">
                        <p className="font-body text-[11px] font-bold uppercase tracking-[0.12em] text-brand-red">
                          {video.category}
                        </p>

                        <h4 className="mt-2 font-heading text-lg font-bold leading-[1.35] tracking-[-0.02em] text-foreground">
                          {video.title}
                        </h4>

                        {video.speaker && (
                          <p className="mt-3 font-body text-sm font-semibold text-foreground">
                            {video.speaker}
                          </p>
                        )}

                        {video.designation && (
                          <p className="mt-1 font-body text-xs leading-relaxed text-muted">
                            {video.designation}
                          </p>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )} */}

          
        </Container>
      </section>

      {/* ACCESSIBLE PHOTO LIGHTBOX */}

      <dialog
        ref={dialogRef}
        aria-label="Event photograph viewer"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeImage();
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            changeImage(-1);
          }

          if (event.key === "ArrowRight") {
            event.preventDefault();
            changeImage(1);
          }
        }}
        className="fixed inset-0 m-auto max-h-[95dvh] w-[min(96vw,1100px)] max-w-none overflow-hidden rounded-card border border-white/15 bg-surface-dark p-0 text-white shadow-2xl backdrop:bg-black/85"
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/15 px-4 py-3 sm:px-6">
          <p className="min-w-0 truncate font-heading text-sm font-semibold text-white">
            {currentImage.title}
          </p>

          <button
            type="button"
            onClick={closeImage}
            aria-label="Close image viewer"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-button text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative h-[min(70dvh,680px)] w-full">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            sizes="96vw"
            className="object-contain"
          />
        </div>

        <div className="flex items-center justify-between border-t border-white/15 px-4 py-3 sm:px-6">
          <span className="font-body text-xs tabular-nums text-white/65">
            {selectedImage + 1}  
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => changeImage(-1)}
              aria-label="Previous photograph"
              className="flex h-10 w-10 items-center justify-center rounded-button border border-white/20 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => changeImage(1)}
              aria-label="Next photograph"
              className="flex h-10 w-10 items-center justify-center rounded-button border border-white/20 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </dialog>
    </LazyMotion>
  );
}
