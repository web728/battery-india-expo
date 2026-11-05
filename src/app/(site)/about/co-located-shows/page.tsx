import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { CoLocatedShows } from "@/components/sections/co-located-shows";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: {
    absolute: "Co-Located Shows | India International Battery Show 2027",
  },
  description:
    "India International Battery Show 2027 takes place alongside 9th India International EV Show and 2nd India International Solar Show in Pune, 14–16 October 2027.",
  alternates: {
    canonical: "/about/co-located-shows",
  },
  openGraph: {
    title: "Co-Located Shows | India International Battery Show 2027",
    description:
      "Explore the EV and solar exhibitions taking place alongside India International Battery Show 2027 in Pune.",
    url: "/about/co-located-shows",
    type: "website",
    images: ["/images/expo-floor-ev-booth-visitors.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CoLocatedShowsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {
            label: "About the Show",
            href: "/about",
          },
          {
            label: "Co-Located Shows",
            href: "/about/co-located-shows",
          },
        ]}
      />

      <PageHero
        eyebrow="About the Show"
        title="Co-Located Shows"
        description="Battery technologies, electric mobility and solar energy exhibitions taking place at the same venue in Pune."
        breadcrumbs={[
          {
            label: "About the Show",
            href: "/about",
          },
          {
            label: "Co-Located Shows",
          },
        ]}
        backgroundImage={{
          src: "/images/expo-floor-ev-booth-visitors.jpg",
          alt: "Visitors and exhibitors at a previous industry exhibition",
        }}
      />

      <CoLocatedShows />
    </>
  );
}
