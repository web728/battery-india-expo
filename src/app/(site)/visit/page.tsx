import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { SectorIcon } from "@/components/ui/sector-icon";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { whyVisitBenefits } from "@/lib/content/home-content";
import { sectors } from "@/lib/content/sectors";
import { visitorProfile } from "@/lib/content/exhibitor-categories";
import { visitorFaqs } from "@/lib/content/faqs";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Why Visit",
  description: "Discover technologies, suppliers and industry opportunities at India Battery International Show 2026. Register as a trade visitor.",
  alternates: { canonical: "/visit" },
};

export default function VisitPage() {
  const allFaqs = visitorFaqs.flatMap((g) => g.items);

  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Visit", href: "/visit" }]} />
      <PageHero
        eyebrow="Visit"
        title="Discover Technologies, Suppliers and Industry Opportunities"
        description="Explore the complete battery and energy-storage value chain, attend technical sessions and connect with manufacturers, experts and industry peers."
        breadcrumbs={[{ label: "Visit" }]}
        actions={<Button href="/visit/register" size="lg">Register to Visit</Button>}
      />

      <Container className="-mt-10 sm:-mt-14">
        <figure className="overflow-hidden rounded-2xl shadow-xl">
          <Image
            src="/images/expo-floor-components-booth.jpg"
            alt="Visitors engaging with an exhibitor at a components booth at a previous edition"
            width={1800}
            height={1200}
            className="h-56 w-full object-cover sm:h-80"
            sizes="100vw"
          />
        </figure>
      </Container>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Why Visit" title="Why Visit India Battery International Show 2026" align="center" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyVisitBenefits.map((benefit) => (
              <div key={benefit.title} className="flex gap-3.5">
                <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-green" aria-hidden="true" />
                <div>
                  <h3 className="font-heading text-base font-bold text-navy-dark">{benefit.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-grey-medium">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-grey-light py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Product Categories" title="What You Will See on the Show Floor" align="center" />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {sectors.map((sector) => (
              <div key={sector.slug} className="flex flex-col items-center rounded-lg bg-white p-5 text-center shadow-sm">
                <SectorIcon icon={sector.icon} className="mb-2 h-6 w-6 text-red" aria-hidden="true" />
                <p className="text-xs font-semibold text-navy-dark">{sector.name}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Who You Will Meet" title="A Focused Industry Audience" align="center" />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visitorProfile.map((item) => (
              <div key={item.name} className="rounded-xl border border-grey-light p-6">
                <h3 className="font-heading text-sm font-bold text-navy-dark">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-grey-medium">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Entry Policy" title="Who Can Attend" align="center" />
          <p className="mt-5 text-center text-grey-medium">
            India Battery International Show 2026 is a trade-only event designed for industry professionals.
            Full entry policy and registration terms are published on the{" "}
            <a href="/registration-terms" className="font-semibold text-red underline">Registration Terms</a> page
            and confirmed prior to the show opening.
          </p>
        </Container>
      </section>

      <section className="bg-grey-light py-16 sm:py-20">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQs" title="Visitor FAQs" align="center" />
          <div className="mt-8">
            <Accordion items={allFaqs} />
          </div>
          <div className="mt-10 flex justify-center gap-4">
            <Button href="/visit/register" size="lg">Register to Visit</Button>
            <Button href="/visit/faqs" variant="ghost">All Visitor FAQs</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
