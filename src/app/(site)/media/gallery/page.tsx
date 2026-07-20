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
    src: "https://info.batteryindiaexpo.com/wp-content/uploads/2022/09/277672849_1022808071946075_340558403948023620_n.jpg",
    alt: "Gallery photo from a previous edition",
  },
  {
    src: "https://info.batteryindiaexpo.com/wp-content/uploads/2022/09/80977122_477937706433117_8911482764633571328_n.jpg",
    alt: "Gallery photo from a previous edition",
  },
  {
    src: "https://info.batteryindiaexpo.com/wp-content/uploads/2022/09/277756487_1022183295341886_6728238397737750234_n.jpg",
    alt: "Gallery photo from a previous edition",
  },
  {
    src: "https://info.batteryindiaexpo.com/wp-content/uploads/2022/09/81142496_477954383098116_3263101403136000000_n.jpg",
    alt: "Gallery photo from a previous edition",
  },
  {
    src: "https://info.batteryindiaexpo.com/wp-content/uploads/2022/09/1-scaled-1.jpg",
    alt: "Gallery photo from a previous edition",
  },
  {
    src: "https://info.batteryindiaexpo.com/wp-content/uploads/2022/09/277756487_1022183295341886_6728238397737750234_n-1.jpg",
    alt: "Gallery photo from a previous edition",
  },
  {
    src: "https://info.batteryindiaexpo.com/wp-content/uploads/2022/09/277672849_1022808071946075_340558403948023620_n-1.jpg",
    alt: "Gallery photo from a previous edition",
  },
  {
    src: "https://info.batteryindiaexpo.com/wp-content/uploads/2022/09/277578914_1022808421946040_8419848406877055246_n.jpg",
    alt: "Gallery photo from a previous edition",
  },
   {
    src: "https://info.batteryindiaexpo.com/wp-content/uploads/2022/09/277572120_1022808208612728_970823388728567591_n.jpg",
    alt: "Gallery photo from a previous edition",
  },
  {
    src: "https://info.batteryindiaexpo.com/wp-content/uploads/2022/09/277563238_1022182605341955_631630248140110136_n.jpg",
    alt: "Gallery photo from a previous edition",
  },
   {
    src: "https://info.batteryindiaexpo.com/wp-content/uploads/2022/09/277566730_1022808141946068_2536311605985154267_n.jpg",
    alt: "Gallery photo from a previous edition",
  },
  {
    src: "https://info.batteryindiaexpo.com/wp-content/uploads/2022/09/277533584_1022807858612763_821064321156367470_n.jpg",
    alt: "Gallery photo from a previous edition",
  },
   {
    src: "https://info.batteryindiaexpo.com/wp-content/uploads/2022/09/277558079_1022807441946138_1194801752750068336_n.jpg",
    alt: "Gallery photo from a previous edition",
  },
   {
    src: "https://info.batteryindiaexpo.com/wp-content/uploads/2022/09/277527150_1022182995341916_4773007713539910118_n.jpg",
    alt: "Gallery photo from a previous edition",
  },
    {
    src: "https://info.batteryindiaexpo.com/wp-content/uploads/2022/09/277513767_1022807351946147_3136467498949117086_n-1.jpg",
    alt: "Gallery photo from a previous edition",
  },
     {
    src: "https://info.batteryindiaexpo.com/wp-content/uploads/2022/09/277486484_1022182625341953_4309320621740266656_n.jpg",
    alt: "Gallery photo from a previous edition",
  },
       {
    src: "https://info.batteryindiaexpo.com/wp-content/uploads/2022/09/276316761_1022183005341915_8135599262387679972_n-1.jpg",
    alt: "Gallery photo from a previous edition",
  },
         {
    src: "https://info.batteryindiaexpo.com/wp-content/uploads/2022/09/81130928_477933963100158_2707887467498831872_n.jpg",
    alt: "Gallery photo from a previous edition",
  },
           {
    src: "https://info.batteryindiaexpo.com/wp-content/uploads/2022/09/82166943_477954493098105_1264107861324070912_n-1.jpg",
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