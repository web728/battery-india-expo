import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ExhibitorEnquiryForm } from "@/components/forms/exhibitor-enquiry-form";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import { Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Book a Stand",
  description: "Book your stand at India Battery International Show 2026. Submit your requirements and our sales team will respond with options and rates.",
  alternates: { canonical: "/exhibit/book-a-stand" },
};

export default function BookAStandPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Exhibit", href: "/exhibit" }, { label: "Book a Stand", href: "/exhibit/book-a-stand" }]} />
      <PageHero
        eyebrow="Exhibit"
        title="Book a Stand"
        description="Submit your requirements below and our exhibitor sales team will contact you with available stand options and rates."
        breadcrumbs={[{ label: "Exhibit", href: "/exhibit" }, { label: "Book a Stand" }]}
          backgroundImage={{
          src: "https://info.batteryindiaexpo.com/wp-content/uploads/2023/05/nepal5p-34.jpg",
          alt: "Futurex branding at a previous edition of the show",
        }}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <SectionHeading eyebrow="Stand Options" title="Tell Us What You Need" />
              <p className="mt-4 text-sm leading-relaxed text-grey-medium">
                Stand sizes, formats and rates are confirmed directly with our exhibitor sales team based on
                your requirements. Fill in the form with your approximate space needs and we&apos;ll get back
                to you with options.
              </p>

              <div className="mt-8 rounded-xl bg-grey-light p-6">
                <p className="text-sm font-semibold text-navy-dark">Prefer to speak with our team directly?</p>
                {siteConfig.contacts.map((c) => (
                  <div key={c.email} className="mt-3">
                    <p className="text-sm font-medium text-navy-dark">{c.name}</p>
                    <a href={`tel:${c.phone.replace(/\s+/g, "")}`} className="mt-1 flex items-center gap-2 text-sm text-grey-medium hover:text-red">
                      <Phone className="h-3.5 w-3.5" /> {c.phone}
                    </a>
                    <a href={`mailto:${c.email}`} className="flex items-center gap-2 text-sm text-grey-medium hover:text-red">
                      <Mail className="h-3.5 w-3.5" /> {c.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-grey-light bg-white p-6 shadow-sm sm:p-10">
              <ExhibitorEnquiryForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
