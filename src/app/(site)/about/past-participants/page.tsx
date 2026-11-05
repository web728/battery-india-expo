import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { PastParticipants } from "@/components/sections/past-participants";

export const metadata: Metadata = {
  title: {
    absolute: "Past Participants & Partners | India International Battery Show",
  },
  description:
    "Explore partner, association and media organisations featured in previous editions of the India International Battery Show exhibition ecosystem.",
  alternates: {
    canonical: "/about/past-participants",
  },
  openGraph: {
    type: "website",
    title: "Past Participants & Partners | India International Battery Show",
    description:
      "A look at partners, industry associations and media organisations associated with earlier exhibition editions.",
    url: "/about/past-participants",
    images: ["/images/expo-floor-ev-booth-visitors.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PastParticipantsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {
            label: "About the Show",
            href: "/about",
          },
          {
            label: "Past Participants",
            href: "/about/past-participants",
          },
        ]}
      />

      <PageHero
        eyebrow="Previous Editions"
        title="Past Participants & Partners"
        description="A record of partners, associations and media organisations featured across previous exhibition activities."
        breadcrumbs={[
          {
            label: "About the Show",
            href: "/about",
          },
          {
            label: "Past Participants",
          },
        ]}
        backgroundImage={{
          src: "/images/expo-floor-ev-booth-visitors.jpg",
          alt: "Visitors at a previous industry exhibition",
        }}
      />

      <PastParticipants />
    </>
  );
}
