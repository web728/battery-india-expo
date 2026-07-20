import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld";
import { visitorFaqs } from "@/lib/content/faqs";

export const metadata: Metadata = {
  title: "Visitor FAQs",
  description: "Frequently asked questions for visitors to India Battery International Show 2026.",
  alternates: { canonical: "/visit/faqs" },
};

export default function VisitorFaqsPage() {
  const allFaqs = visitorFaqs.flatMap((g) => g.items);

  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Visit", href: "/visit" }, { label: "Visitor FAQs", href: "/visit/faqs" }]} />
      <FaqJsonLd items={allFaqs} />
      <PageHero
        eyebrow="Visit"
        title="Visitor FAQs"
        description="Answers to common questions about visiting India Battery International Show 2026."
        breadcrumbs={[{ label: "Visit", href: "/visit" }, { label: "Visitor FAQs" }]}
      />

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          {visitorFaqs.map((group) => (
            <div key={group.group} className="mb-10">
              <h2 className="mb-4 font-heading text-lg font-bold text-navy-dark">{group.group}</h2>
              <Accordion items={group.items} />
            </div>
          ))}
          <div className="mt-4 flex justify-center">
            <Button href="/visit/register">Register to Visit</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
