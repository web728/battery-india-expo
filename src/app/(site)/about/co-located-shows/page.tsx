import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { CoLocatedShows } from "@/components/sections/co-located-shows";
import { Container } from "@/components/ui/container";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Co-Located Shows",
  description:
    "India Battery International Show 2026 is co-located with India EV International Show and India Solar International Show.",
  alternates: { canonical: "/about/co-located-shows" },
};

export default function CoLocatedShowsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "About", href: "/about" }, { label: "Co-Located Shows", href: "/about/co-located-shows" }]} />
      <PageHero
        eyebrow="About"
        title="Co-Located Shows"
        description="One integrated platform spanning renewable energy, energy storage, charging infrastructure and electric mobility."
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Co-Located Shows" }]}
         backgroundImage={{
          src: "https://info.batteryindiaexpo.com/wp-content/uploads/2023/10/fittosize__752_0_3c37ed7e08e9eb16fdbfba86df57b0ab_f__acmi_bottle_conveyor_system_3c_2019_07_1000x562-mobile-1581519535.jpg",
          alt: "Futurex branding at a previous edition of the show",
        }}
      />
      <Container className="-mt-10 sm:-mt-14">
        <figure className="overflow-hidden rounded-2xl shadow-xl">
          <Image
            src="/images/expo-floor-ev-booth-visitors.jpg"
            alt="Visitors at an electric-vehicle exhibitor booth at a previous edition of the co-located India EV International Show"
            width={2000}
            height={1333}
            className="h-56 w-full object-cover sm:h-80"
            sizes="100vw"
          />
        </figure>
      </Container>
      <CoLocatedShows />
    </>
  );
}
