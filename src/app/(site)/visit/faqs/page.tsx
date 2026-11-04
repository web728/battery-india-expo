import type { Metadata } from "next";

import { ArrowUpRight } from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Accordion } from "@/components/ui/accordion";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld";
import { visitorFaqs } from "@/lib/content/faqs";

const registrationUrl = "/visit/register";

export const metadata: Metadata = {
  title: {
    absolute: "Visitor FAQs | India Battery International Show 2027",
  },
  description:
    "Find answers to common questions about visiting India Battery International Show 2027 in Pune, including registration, venue details and planning your visit.",
  alternates: {
    canonical: "/visit/faqs",
  },
  openGraph: {
    type: "website",
    title: "Visitor FAQs | India Battery International Show 2027",
    description:
      "Visitor information and frequently asked questions for the 2027 exhibition in Pune.",
    url: "/visit/faqs",
    images: ["/images/expo-floor-components-booth.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function VisitorFaqsPage() {
  const allFaqs = visitorFaqs.flatMap((group) => group.items);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Visit", href: "/visit" },
          {
            label: "Visitor FAQs",
            href: "/visit/faqs",
          },
        ]}
      />

      <FaqJsonLd items={allFaqs} />

      <PageHero
        eyebrow="Visitor Information"
        title="Visitor FAQs"
        description="Answers to common questions about attending India Battery International Show 2027."
        breadcrumbs={[
          { label: "Visit", href: "/visit" },
          { label: "Visitor FAQs" },
        ]}
        backgroundImage={{
          src: "/images/expo-floor-components-booth.jpg",
          alt: "Exhibition visitors exploring technology displays",
        }}
      />

      <section className="bg-[#faf9f7] py-14 text-[#19191c] sm:py-16 lg:py-20">
        <Container className="max-w-4xl">
          <div className="mb-9">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d52d35]">
              Frequently Asked Questions
            </p>

            <h2 className="mt-3 font-heading text-[clamp(1.8rem,3vw,2.5rem)] font-extrabold tracking-[-0.04em]">
              Before you
              <span className="text-[#ed3138]"> visit.</span>
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#696970] sm:text-[15px]">
              Information about attending, registration and planning your visit
              to the exhibition.
            </p>
          </div>

          <div className="space-y-7">
            {visitorFaqs.map((group) => (
              <section
                key={group.group}
                aria-label={group.group}
                className="overflow-hidden rounded-xl border border-[#e8e6e3] bg-white"
              >
                <div className="border-b border-[#eeece9] px-5 py-5 sm:px-7">
                  <h3 className="font-heading text-lg font-bold text-[#252529]">
                    {group.group}
                  </h3>
                </div>

                <div className="p-4 sm:p-6">
                  <Accordion items={group.items} />
                </div>
              </section>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-5 border-t border-[#e5e2de] pt-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-heading text-xl font-bold text-[#252529]">
                Ready to attend?
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#696970]">
                Visit the registration portal to submit your details.
              </p>
            </div>

            <a
              href={registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-[#ed3138] px-5 text-sm font-bold text-white transition-colors hover:bg-[#c9272e]"
            >
              Register to Visit
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
