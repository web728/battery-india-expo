import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SponsorEnquiryForm } from "@/components/forms/sponsor-enquiry-form";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Sponsorship Opportunities",
  description: "Sponsorship and partnership opportunities at India Battery International Show 2026.",
  alternates: { canonical: "/exhibit/sponsorship" },
};

export default function SponsorshipPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Exhibit", href: "/exhibit" }, { label: "Sponsorship Opportunities", href: "/exhibit/sponsorship" }]} />
      <PageHero
        eyebrow="Partner"
        title="Sponsorship Opportunities"
        description="Increase your brand visibility through sponsorship and strategic collaboration at India Battery International Show 2026."
        breadcrumbs={[{ label: "Exhibit", href: "/exhibit" }, { label: "Sponsorship Opportunities" }]}
          backgroundImage={{
          src: "https://info.batteryindiaexpo.com/wp-content/uploads/2023/05/nepal5p-34.jpg",
          alt: "Futurex branding at a previous edition of the show",
        }}
      />

      <section className="py-16 sm:py-20" id="enquiry">
        <Container className="max-w-2xl">
          <SectionHeading eyebrow="Partner With Us" title="Tell Us About Your Goals" align="center" />
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-grey-medium">
            Sponsorship packages are put together based on your brand objectives — reach{" "}
            {siteConfig.contacts[0].name} and our team at {siteConfig.contacts[0].email} or submit the form
            below and we&apos;ll get back to you with options.
          </p>
          <div className="mt-10 rounded-xl border border-grey-light bg-white p-6 shadow-sm sm:p-10">
            <SponsorEnquiryForm />
          </div>
        </Container>
      </section>
    </>
  );
}
