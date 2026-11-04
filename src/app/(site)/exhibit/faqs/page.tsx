import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld";
import { exhibitorFaqs } from "@/lib/content/faqs";
import { ArrowUpRight, HelpCircle, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Exhibitor FAQs",
  description:
    "Frequently asked questions for exhibitors at India Battery International Show 2026.",
  alternates: { canonical: "/exhibit/faqs" },
};

export default function ExhibitorFaqsPage() {
  const allFaqs = exhibitorFaqs.flatMap((group) => group.items);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Exhibit", href: "/exhibit" },
          { label: "Exhibitor FAQs", href: "/exhibit/faqs" },
        ]}
      />
      <FaqJsonLd items={allFaqs} />

      <PageHero
        eyebrow="Exhibit"
        title="Exhibitor FAQs"
        description="Everything you need to know about exhibiting at India Battery International Show 2026."
        breadcrumbs={[
          { label: "Exhibit", href: "/exhibit" },
          { label: "Exhibitor FAQs" },
        ]}
        backgroundImage={{
          src: "https://info.batteryindiaexpo.com/wp-content/uploads/2023/05/nepal5p-34.jpg",
          alt: "Industry exhibition at a previous edition of the show",
        }}
      />

      <section className="relative isolate overflow-hidden bg-[#FAFBFA] py-16 text-zinc-900 sm:py-20 lg:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-[#13A853]/[0.045] blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-[#ED3138]/[0.04] blur-3xl" />

        <Container className="relative z-10 max-w-5xl">
          <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#13A853]/15 bg-[#13A853]/[0.055] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#13A853]">
              <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
              Exhibitor Support
            </div>
            <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-[-0.04em] text-zinc-950 sm:text-4xl">
              Your questions, <span className="text-[#13A853]">answered.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-600 sm:text-base">
              Browse the topics below for clear information on exhibiting, planning your participation and preparing for the show.
            </p>
            <div aria-hidden="true" className="mx-auto mt-6 flex items-center justify-center gap-2">
              <span className="h-1 w-9 rounded-full bg-[#13A853]" />
              <span className="h-1 w-3 rounded-full bg-[#ED3138]" />
            </div>
          </div>

          <div className="space-y-5">
            {exhibitorFaqs.map((group, index) => {
              const redAccent = index % 3 === 1;
              return (
                <section
                  key={group.group}
                  className="group relative scroll-mt-28 overflow-hidden rounded-[1.5rem] border border-zinc-200/80 bg-white p-5 shadow-[0_10px_35px_rgba(18,35,23,0.035)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-[0_18px_45px_rgba(18,35,23,0.07)] sm:p-7 lg:p-8 faq-reveal"
                  style={{ animationDelay: `${Math.min(index * 90, 450)}ms` }}
                >
                  <div aria-hidden="true" className={`absolute inset-y-6 left-0 w-[3px] rounded-r-full ${redAccent ? "bg-[#ED3138]/75" : "bg-[#13A853]/75"}`} />
                  <header className="mb-5 flex items-center gap-4 border-b border-zinc-100 pb-5 sm:mb-6">
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${redAccent ? "bg-[#ED3138]/[0.07] text-[#ED3138]" : "bg-[#13A853]/[0.07] text-[#13A853]"}`}>
                      <MessageCircle className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={`text-[10px] font-bold uppercase tracking-[0.17em] ${redAccent ? "text-[#ED3138]" : "text-[#13A853]"}`}>
                        Topic {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-1 font-heading text-lg font-bold tracking-[-0.025em] text-zinc-950 sm:text-xl">
                        {group.group}
                      </h3>
                    </div>
                    <span className="hidden rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-500 sm:inline-flex">
                      {group.items.length} {group.items.length === 1 ? "question" : "questions"}
                    </span>
                  </header>
                  <Accordion items={group.items} />
                </section>
              );
            })}
          </div>

          <div className="relative mt-12 overflow-hidden rounded-[1.75rem] bg-[#141917] p-7 text-center text-white shadow-[0_22px_60px_rgba(0,0,0,0.12)] sm:p-10">
            <div aria-hidden="true" className="absolute -left-20 -top-24 h-52 w-52 rounded-full bg-[#13A853]/15 blur-3xl" />
            <div aria-hidden="true" className="absolute -right-20 -bottom-24 h-52 w-52 rounded-full bg-[#ED3138]/10 blur-3xl" />
            <div className="relative z-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#68D69A]">Personal Assistance</p>
              <h2 className="mt-3 font-heading text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
                Still have <span className="text-[#68D69A]">questions?</span>
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-white/65">
                Our team can help you with exhibitor participation, stand enquiries and event information.
              </p>
              <div className="mt-6 flex justify-center">
                <Button href="/contact" size="lg" className="group gap-2 rounded-full bg-[#13A853] px-7 text-white hover:bg-[#108747]">
                  Contact Our Team
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <style>{`@keyframes fadeInUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } } .faq-reveal { animation: fadeInUp .65s ease-out both; } @media (prefers-reduced-motion: reduce) { .faq-reveal { animation: none; } }`}</style>
    </>
  );
}
