import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Breadcrumbs, type Crumb } from "@/components/ui/breadcrumbs";
import type { ReactNode } from "react";

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
  return (
    <>
      <div className="relative overflow-hidden bg-navy-dark pt-28 pb-14 sm:pb-16">
        {backgroundImage && (
          <>
            <Image
              src={backgroundImage.src}
              alt={backgroundImage.alt}
              fill
              priority
              className="object-cover opacity-40"
              sizes="100vw"
            />
            {/* extra gradient so text stays fully readable regardless of image content */}
            <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/80 via-navy-dark/70 to-navy-dark" />
          </>
        )}

        <Container className="relative">
          <div
            className={
              image
                ? "grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16"
                : ""
            }
          >
            <div>
              {eyebrow && (
                <p className="mb-3 text-sm font-bold uppercase tracking-widest text-green">{eyebrow}</p>
              )}
              <h1 className="max-w-3xl font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                {title}
              </h1>
              {description && (
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
                  {description}
                </p>
              )}
              {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
            </div>

            {image && (
              <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 lg:aspect-[4/3]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1600}
                  height={1200}
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/50 via-transparent to-transparent" />
              </div>
            )}
          </div>
        </Container>
      </div>
      <Breadcrumbs items={breadcrumbs} />
    </>
  );
}