
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import Image from "next/image";

import {
  ChevronLeft,
  ChevronRight,
  Expand,
  LoaderCircle,
  X,
} from "lucide-react";

import type { GalleryPhoto } from "@/lib/photo-catalog";

export type Photo = GalleryPhoto;

type PhotoGalleryProps = {
  initialPhotos: readonly GalleryPhoto[];
  initialHasMore: boolean;
  initialNextOffset: number;
};

type GalleryResponse = {
  photos: GalleryPhoto[];
  nextOffset: number;
  hasMore: boolean;
};

export function PhotoGallery({
  initialPhotos,
  initialHasMore,
  initialNextOffset,
}: PhotoGalleryProps) {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(
    () => [...initialPhotos]
  );

  const [hasMore, setHasMore] =
    useState(initialHasMore);

  const [nextOffset, setNextOffset] =
    useState(initialNextOffset);

  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const [activeIndex, setActiveIndex] =
    useState<number | null>(null);

  const closeButtonRef =
    useRef<HTMLButtonElement>(null);

  const previousTriggerRef =
    useRef<HTMLButtonElement | null>(null);

  const loadingRef = useRef(false);

  const activePhoto =
    activeIndex === null
      ? null
      : photos[activeIndex] ?? null;

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);

    requestAnimationFrame(() => {
      previousTriggerRef.current?.focus();
    });
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || photos.length === 0) {
        return current;
      }

      return (
        current - 1 + photos.length
      ) % photos.length;
    });
  }, [photos.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || photos.length === 0) {
        return current;
      }

      return (current + 1) % photos.length;
    });
  }, [photos.length]);

  /* -----------------------------------------
     LOAD MORE

     Only the next small image batch is fetched.
     Previously loaded photographs stay visible.
  ----------------------------------------- */

  async function loadMorePhotos() {
    if (
      loadingRef.current ||
      loading ||
      !hasMore
    ) {
      return;
    }

    loadingRef.current = true;
    setLoading(true);
    setLoadError(false);

    try {
      const response = await fetch(
        `/api/gallery?offset=${nextOffset}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Gallery request failed");
      }

      const result =
        (await response.json()) as GalleryResponse;

      if (
        !Array.isArray(result.photos) ||
        typeof result.nextOffset !== "number" ||
        typeof result.hasMore !== "boolean"
      ) {
        throw new Error("Invalid gallery response");
      }

      setPhotos((current) => [
        ...current,
        ...result.photos,
      ]);

      setNextOffset(result.nextOffset);
      setHasMore(result.hasMore);
    } catch {
      setLoadError(true);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }

  /* -----------------------------------------
     LIGHTBOX KEYBOARD SUPPORT
     - Escape closes
     - Left/right arrows navigate
     - Tab stays within the dialog
     - Body scrolling is locked while open
  ----------------------------------------- */

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }

      if (event.key === "Tab") {
        const dialog = document.getElementById(
          "photo-gallery-lightbox"
        );

        if (!dialog) {
          return;
        }

        const buttons = Array.from(
          dialog.querySelectorAll<HTMLButtonElement>(
            "button:not([disabled])"
          )
        );

        if (buttons.length === 0) {
          return;
        }

        const first = buttons[0];
        const last = buttons[buttons.length - 1];

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        originalOverflow;

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    activeIndex,
    closeLightbox,
    showNext,
    showPrevious,
  ]);

  /* -----------------------------------------
     EMPTY GALLERY
  ----------------------------------------- */

  if (photos.length === 0) {
    return (
      <p className="border-t border-[#E4E2DE] py-10 text-sm leading-7 text-muted">
        Gallery photographs will appear here
        once images are available.
      </p>
    );
  }

  return (
    <>
      {/* -------------------------------------
          IMAGE GRID
      ------------------------------------- */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            aria-label={`Open ${photo.alt}`}
            onClick={(event) => {
              previousTriggerRef.current =
                event.currentTarget;

              setActiveIndex(index);
            }}
            className={[
              "group relative block w-full",
              "overflow-hidden rounded-[10px]",
              "border border-[#E4E2DE]",
              "bg-[#EAE8E4]",
              "text-left",
              "transition-colors duration-200",
              "hover:border-brand-red/35",
              "focus-visible:outline-2",
              "focus-visible:outline-offset-2",
              "focus-visible:outline-brand-red",
            ].join(" ")}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                loading="lazy"
                quality={70}
                sizes="(min-width: 1280px) 390px, (min-width: 1024px) 31vw, (min-width: 640px) 47vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.025] motion-reduce:transform-none"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/10"
              />

              <span
                aria-hidden="true"
                className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-md bg-white/95 text-[#191C21] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                <Expand
                  className="h-4 w-4"
                  strokeWidth={1.8}
                />
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* -------------------------------------
          LOAD MORE BUTTON
      ------------------------------------- */}

      {hasMore && (
        <div className="mt-10 flex flex-col items-center gap-4 sm:mt-12">
          <button
            type="button"
            onClick={loadMorePhotos}
            disabled={loading}
            aria-busy={loading}
            className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-button border border-[#D9D7D3] bg-white px-7 py-3 font-heading text-sm font-bold text-foreground transition-colors duration-200 hover:border-brand-red hover:text-brand-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red disabled:cursor-wait disabled:opacity-60"
          >
            {loading ? (
              <>
                <LoaderCircle
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin"
                />
                Loading Photos
              </>
            ) : (
              "Load More Photos"
            )}
          </button>

          {loadError && (
            <p role="alert" className="text-sm text-brand-red">
              Photos could not be loaded.
              Please try again.
            </p>
          )}
        </div>
      )}

      {/* -------------------------------------
          FULL SCREEN LIGHTBOX
      ------------------------------------- */}

      {activePhoto && (
        <div
          id="photo-gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery viewer"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#101115]/95 px-4 py-16 sm:px-16"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeLightbox();
            }
          }}
        >
          {/* CLOSE */}

          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeLightbox}
            aria-label="Close photo viewer"
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-md border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6 sm:top-6"
          >
            <X
              className="h-5 w-5"
              strokeWidth={1.8}
            />
          </button>

          {/* PREVIOUS */}

          {photos.length > 1 && (
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md border border-white/20 bg-[#191C21]/75 text-white transition-colors hover:bg-[#30343B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-6"
            >
              <ChevronLeft
                className="h-6 w-6"
                strokeWidth={1.8}
              />
            </button>
          )}

          {/* ACTIVE IMAGE */}

          <div className="relative h-full w-full max-w-[1200px]">
            <Image
              key={activePhoto.src}
              src={activePhoto.src}
              alt={activePhoto.alt}
              fill
              quality={85}
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-contain"
            />
          </div>

          {/* NEXT */}

          {photos.length > 1 && (
            <button
              type="button"
              onClick={showNext}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md border border-white/20 bg-[#191C21]/75 text-white transition-colors hover:bg-[#30343B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6"
            >
              <ChevronRight
                className="h-6 w-6"
                strokeWidth={1.8}
              />
            </button>
          )}
        </div>
      )}
    </>
  );
}
