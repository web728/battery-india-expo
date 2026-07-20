"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";

export type Photo = {
  src: string;
  alt: string;
};

const SHIMMER = `
<svg xmlns="http://www.w3.org/2000/svg" width="700" height="475" viewBox="0 0 700 475">
  <rect width="700" height="475" fill="#e5e7eb"/>
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str);

const BATCH_SIZE = 6;

export function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visiblePhotos = photos.slice(0, visibleCount);
  const hasMore = visibleCount < photos.length;

  const closeLightbox = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, closeLightbox, showPrev, showNext]);

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePhotos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:shadow-xl hover:ring-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                loading={index < 2 ? "eager" : "lazy"}
                priority={index === 0}
                quality={70}
                placeholder={`data:image/svg+xml;base64,${toBase64(SHIMMER)}`}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100">
                <Expand className="h-4 w-4 text-foreground" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + BATCH_SIZE)}
            className="rounded-full border border-input bg-background px-6 py-2.5 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Load more photos
          </button>
        </div>
      )}

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div
            className="relative h-[80vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[activeIndex].src}
              alt={photos[activeIndex].alt}
              fill
              quality={85}
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
            aria-label="Next photo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  );
}