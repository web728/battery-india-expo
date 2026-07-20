import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { ExhibitorEnquiryForm } from "@/components/forms/exhibitor-enquiry-form";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { whyExhibitBenefits } from "@/lib/content/home-content";
import { sectors } from "@/lib/content/sectors";
import { visitorProfile } from "@/lib/content/exhibitor-categories";
import { exhibitorFaqs } from "@/lib/content/faqs";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Why Exhibit",
  description:
    "Exhibit at India Battery International Show 2026 to showcase your technology, meet qualified buyers and build partnerships across the battery and energy-storage value chain.",
  alternates: { canonical: "/exhibit" },
};

export default function ExhibitPage() {
  const allFaqs = exhibitorFaqs.flatMap((group) => group.items);

  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Exhibit", href: "/exhibit" }]} />
      <PageHero
        eyebrow="Exhibit"
        title="Showcase Your Technology. Meet Buyers. Build Partnerships."
        description="Join India Battery International Show 2026 and connect with automotive OEMs, energy companies, investors and industrial buyers across the battery and energy-storage value chain."
        breadcrumbs={[{ label: "Exhibit" }]}
        actions={
          <>
            <Button href="/exhibit/book-a-stand" variant="primary" size="lg">Book a Stand</Button>
            <Button href="/media/downloads" variant="outline-white" size="lg">Download Brochure</Button>
          </>
        }
         backgroundImage={{
          src: "https://batteryindiaexpo.com/wp-content/uploads/2023/05/nepal5p-34.jpg",
          alt: "Futurex branding at a previous edition of the show",
        }}
      />

      <Container className="-mt-10 sm:-mt-14">
        <figure className="overflow-hidden rounded-2xl shadow-xl">
          <Image
            src="/images/expo-motor-technology-booth.jpg"
            alt="An exhibitor demonstrating rare-earth-free motor technology to visitors at a previous edition"
            width={2000}
            height={1333}
            className="h-56 w-full object-cover sm:h-80"
            sizes="100vw"
          />
        </figure>
      </Container>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Why Exhibit" title="Why Exhibit at India Battery International Show 2026" align="center" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyExhibitBenefits.map((benefit) => (
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
          <SectionHeading eyebrow="Who Should Exhibit" title="Industries Represented" align="center" />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector) => (
              <div key={sector.slug} className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="font-heading text-sm font-bold text-navy-dark">{sector.name}</h3>
                <p className="mt-2 text-sm text-grey-medium">{sector.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button href="/exhibit/categories" variant="secondary">View Exhibitor Categories</Button>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Expected Buyer Types" title="Who You Will Meet" align="center" />
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

      <section className="bg-navy-dark py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Button href="/exhibit/book-a-stand" variant="outline-white" className="justify-center">Book a Stand</Button>
            <Button href="/exhibit/sponsorship" variant="outline-white" className="justify-center">Sponsorship</Button>
          </div>
          <p className="mt-8 text-center text-sm text-white/60">
            Every stand booking includes a listing in the exhibitor directory to help you generate qualified
            leads before, during and after the show.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-20" id="enquiry">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Get Started" title="Exhibitor Enquiry Form" align="center" />
          <p className="mt-4 text-center text-grey-medium">
            Tell us about your company and requirements — our sales team will respond with stand options and rates.
          </p>
          <div className="mt-10 rounded-xl border border-grey-light bg-white p-6 shadow-sm sm:p-10">
            <ExhibitorEnquiryForm />
          </div>
        </Container>
      </section>

      <section className="bg-grey-light py-16 sm:py-20">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQs" title="Exhibitor FAQs" align="center" />
          <div className="mt-8">
            <Accordion items={allFaqs} />
          </div>
          <div className="mt-8 flex justify-center">
            <Button href="/exhibit/faqs" variant="ghost">View All Exhibitor FAQs</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
