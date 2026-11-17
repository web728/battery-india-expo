
import type { Metadata } from "next";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { PhotoGallery } from "@/components/sections/photo-gallery";

import {
  GALLERY_BATCH_SIZE,
  getGalleryBatch,
} from "@/lib/photo-catalog";

import { siteConfig } from "@/lib/site-config";

/*
  INDIA BATTERY INTERNATIONAL SHOW
  Media Photo Gallery

  Images are discovered automatically
  from public/images on the server.

  Only the initial batch is sent with
  the first page render.
*/

export const runtime = "nodejs";
export const revalidate = 60;

const PAGE_PATH = "/media/gallery";

const SITE_URL = siteConfig.siteUrl.replace(/\/+$/, "");
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const HERO_IMAGE =
  "/images/DSC01808.JPG.webp";

const PAGE_TITLE =
  `Photo Gallery | ${siteConfig.eventName} 2027`;

const PAGE_DESCRIPTION =
  `Explore exhibition photography and previous-edition ` +
  `highlights associated with ${siteConfig.eventName}. ` +
  `Browse battery technologies, exhibition displays ` +
  `and industry networking photographs.`;

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: PAGE_URL,
    siteName: siteConfig.eventName,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}${HERO_IMAGE}`,
        alt: "Exhibition photo gallery",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${SITE_URL}${HERO_IMAGE}`],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function PhotoGalleryPage() {
  const gallery = await getGalleryBatch(
    0,
    GALLERY_BATCH_SIZE
  );

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    inLanguage: "en-IN",
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#event`,
    },
  };

  return (
    <>
      {/* STRUCTURED DATA */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageJsonLd).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <BreadcrumbJsonLd
        items={[
          {
            label: "Media",
            href: "/media",
          },
          {
            label: "Photo Gallery",
            href: PAGE_PATH,
          },
        ]}
      />

      {/* SHARED HERO */}

      <PageHero
        eyebrow="Media"
        title="Photo Gallery"
        description={`Explore exhibition moments, technology showcases and industry interactions from previous exhibition activities associated with ${siteConfig.eventName}.`}
        breadcrumbs={[
          {
            label: "Media",
            href: "/media",
          },
          {
            label: "Photo Gallery",
          },
        ]}
        backgroundImage={{
          src: HERO_IMAGE,
          alt: "Industry visitors exploring exhibition displays",
        }}
      />

      {/* GALLERY */}

      <section
        id="exhibition-photo-gallery"
        aria-labelledby="gallery-heading"
        className="bg-background py-16 text-foreground sm:py-20 lg:py-24 xl:py-28"
      >
        <Container>
          <div className="mb-10 grid gap-6 lg:mb-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-12">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-7 bg-brand-red"
                />

                <p className="font-heading text-xs font-bold uppercase tracking-[0.15em] text-brand-red">
                  Exhibition Photography
                </p>
              </div>

              <h2
                id="gallery-heading"
                className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-[-0.04em]"
              >
                Moments from
                <span className="block">
                  the exhibition
                  <span className="text-brand-red">.</span>
                </span>
              </h2>
            </div>
 
          </div>

          <div className="border-t border-[#E4E2DE] pt-9">
            <PhotoGallery
              initialPhotos={gallery.photos}
              initialHasMore={gallery.hasMore}
              initialNextOffset={gallery.nextOffset}
            />
          </div>

         
        </Container>
      </section>
 
    </>
  );
}
