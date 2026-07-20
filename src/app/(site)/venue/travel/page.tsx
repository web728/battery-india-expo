import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { Plane, Train, Car } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Travel Information",
  description: `Air, rail and road travel guidance for reaching the ${siteConfig.venue.name}, ${siteConfig.venue.city}.`,
  alternates: { canonical: "/venue/travel" },
};

const options = [
  { icon: Plane, title: "By Air", description: "Pune International Airport is the nearest airport, connected to major Indian cities. Onward travel to the venue is available by taxi or ride-hailing services." },
  { icon: Train, title: "By Rail", description: "Pune Junction railway station is well connected to major Indian cities and is a convenient starting point for onward travel to Chinchwad." },
  { icon: Car, title: "By Road", description: "The Auto Cluster Exhibition Center in Chinchwad is accessible via Pune's road network, with parking availability to be confirmed closer to the show." },
];

export default function TravelInformationPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Venue & Travel", href: "/venue" }, { label: "Travel Information", href: "/venue/travel" }]} />
      <PageHero
        eyebrow="Venue & Travel"
        title="Travel Information"
        description="Guidance for reaching the Auto Cluster Exhibition Center, Chinchwad, Pimpri-Chinchwad, Pune."
        breadcrumbs={[{ label: "Venue & Travel", href: "/venue" }, { label: "Travel Information" }]}
      />

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <SectionHeading title="Getting to the Venue" />
          <div className="mt-8 flex flex-col gap-6">
            {options.map((opt) => (
              <div key={opt.title} className="flex gap-4 rounded-xl border border-grey-light bg-white p-6">
                <opt.icon className="h-7 w-7 shrink-0 text-red" aria-hidden="true" />
                <div>
                  <h3 className="font-heading text-base font-bold text-navy-dark">{opt.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-grey-medium">{opt.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
