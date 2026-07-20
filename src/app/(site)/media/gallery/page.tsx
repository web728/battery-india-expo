import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { PhotoGallery, type Photo } from "@/components/sections/photo-gallery";

export const metadata: Metadata = {
  description: "Photo gallery for India Battery International Show 2026 and previous editions.",
  alternates: { canonical: "/media/gallery" },
};

const photos: Photo[] = [
  {
    src: "/images/expo-battery-products-display.jpg",
    alt: "Battery products on display at an exhibitor booth at a previous edition",
  },
  {
    src: "/images/expo-telematics-meeting.jpg",
    alt: "Exhibitors and visitors in a business discussion at a previous edition",
  },

  // TODO: replace these 7 filenames with the actual files in public/images/
  { src: "/images/2.jpg.jpeg", alt: "Photo from a previous edition of the show" },
  { src: "/images/3.jpg.jpeg", alt: "Photo from a previous edition of the show" },
  { src: "/images/4.jpg.jpeg", alt: "Photo from a previous edition of the show" },
  { src: "/images/5.jpg.jpeg", alt: "Photo from a previous edition of the show" },
  { src: "/images/6.jpg.jpeg", alt: "Photo from a previous edition of the show" },
  { src: "/images/7.jpg.jpeg", alt: "Photo from a previous edition of the show" },
  { src: "/images/Untitled-2.jpg.jpeg", alt: "Photo from a previous edition of the show" },

  {
    src: "https://batteryindiaexpo.com/wp-content/uploads/2023/05/nepal5p-36.jpg",
    alt: "Gallery photo from a previous edition",
  },
  {
    src: "https://batteryindiaexpo.com/wp-content/uploads/2023/05/nepal5p-35.jpg",
    alt: "Gallery photo from a previous edition",
  },
  {
    src: "https://batteryindiaexpo.com/wp-content/uploads/2023/05/nepal5p-34.jpg",
    alt: "Gallery photo from a previous edition",
  },
  {
    src: "https://batteryindiaexpo.com/wp-content/uploads/2023/05/nepal5p-33.jpg",
    alt: "Gallery photo from a previous edition",
  },
  {
    src: "https://batteryindiaexpo.com/wp-content/uploads/2023/05/nepal5p-45.jpg",
    alt: "Gallery photo from a previous edition",
  },
  {
    src: "https://batteryindiaexpo.com/wp-content/uploads/2023/05/nepal5p-44.jpg",
    alt: "Gallery photo from a previous edition",
  },
  {
    src: "https://batteryindiaexpo.com/wp-content/uploads/2023/05/nepal5p-39.jpg",
    alt: "Gallery photo from a previous edition",
  },
  {
    src: "https://batteryindiaexpo.com/wp-content/uploads/2023/05/nepal5p-4.jpg",
    alt: "Gallery photo from a previous edition",
  },
];

export default function PhotoGalleryPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Media", href: "/media" }, { label: "Photo Gallery", href: "/media/gallery" }]} />
      <PageHero
        eyebrow="Media"
        title="Photo Gallery"
        description="Photographs from previous editions. More will be added as the 2026 show approaches."
        breadcrumbs={[{ label: "Media", href: "/media" }, { label: "Photo Gallery" }]}
      />
      <section className="py-16 sm:py-20">
        <Container>
          <PhotoGallery photos={photos} />
        </Container>
      </section>
    </>
  );
}