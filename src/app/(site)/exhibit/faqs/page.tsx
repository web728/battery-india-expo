import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld";
import { exhibitorFaqs } from "@/lib/content/faqs";

export const metadata: Metadata = {
  title: "Exhibitor FAQs",
  description: "Frequently asked questions for exhibitors at India Battery International Show 2026.",
  alternates: { canonical: "/exhibit/faqs" },
};

export default function ExhibitorFaqsPage() {
  const allFaqs = exhibitorFaqs.flatMap((g) => g.items);

  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Exhibit", href: "/exhibit" }, { label: "Exhibitor FAQs", href: "/exhibit/faqs" }]} />
      <FaqJsonLd items={allFaqs} />
      <PageHero
        eyebrow="Exhibit"
        title="Exhibitor FAQs"
        description="Answers to common questions about exhibiting at India Battery International Show 2026."
        breadcrumbs={[{ label: "Exhibit", href: "/exhibit" }, { label: "Exhibitor FAQs" }]}
          backgroundImage={{
          src: "https://info.batteryindiaexpo.com/wp-content/uploads/2023/05/nepal5p-34.jpg",
          alt: "Futurex branding at a previous edition of the show",
        }}
      />

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          {exhibitorFaqs.map((group) => (
            <div key={group.group} className="mb-10">
              <h2 className="mb-4 font-heading text-lg font-bold text-navy-dark">{group.group}</h2>
              <Accordion items={group.items} />
            </div>
          ))}
          <div className="mt-4 flex justify-center">
            <Button href="/contact">Still Have Questions? Contact Us</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
