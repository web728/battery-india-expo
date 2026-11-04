
import type { Metadata } from "next";
import Link from "next/link";

import {
  ArrowUpRight,
  Mail,
} from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { SponsorEnquiryForm } from "@/components/forms/sponsor-enquiry-form";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    absolute:
      "Sponsorship Opportunities | India Battery International Show 2027",
  },
  description:
    "Explore sponsorship and partnership opportunities at India Battery International Show 2027 in Pune. Contact the organising team to discuss your objectives.",
  alternates: {
    canonical: "/exhibit/sponsorship",
  },
  openGraph: {
    type: "website",
    title:
      "Sponsorship Opportunities | India Battery International Show 2027",
    description:
      "Discuss sponsorship and partnership opportunities for the 2027 exhibition in Pune.",
    url: "/exhibit/sponsorship",
    images: ["/images/expo-vip-lounge-branding.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SponsorshipPage() {
  const primaryContact = siteConfig.contacts[0];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Exhibit", href: "/exhibit" },
          {
            label: "Sponsorship Opportunities",
            href: "/exhibit/sponsorship",
          },
        ]}
      />

      <PageHero
        eyebrow="Partner With Us"
        title="Sponsorship Opportunities"
        description="Explore sponsorship and partnership options for India Battery International Show 2027."
        breadcrumbs={[
          { label: "Exhibit", href: "/exhibit" },
          { label: "Sponsorship Opportunities" },
        ]}
        backgroundImage={{
          src: "/images/expo-vip-lounge-branding.jpg",
          alt: "Exhibition branding and networking at a previous edition",
        }}
      />

      <section
        id="enquiry"
        className="bg-[#faf9f7] py-14 text-[#19191c] sm:py-16 lg:py-20"
      >
        <Container>
          <div className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 xl:gap-16">
            {/* Sponsorship information */}
            <div className="lg:sticky lg:top-28">
              <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-[#d52d35]">
                Sponsorship & Partnerships
              </p>

              <h2 className="mt-4 max-w-lg font-heading text-[clamp(1.9rem,3vw,2.75rem)] font-extrabold leading-[1.15] tracking-[-0.045em]">
                Explore partnership
                <span className="text-[#ed3138]"> opportunities.</span>
              </h2>

              <p className="mt-5 max-w-lg text-[15px] leading-8 text-[#67676e]">
                India Battery International Show brings
                businesses together around battery
                technologies, manufacturing and energy
                storage. Sponsorship offers an opportunity
                to present your brand within this
                industry-focused exhibition.
              </p>

              <p className="mt-4 max-w-lg text-[15px] leading-8 text-[#67676e]">
                Share your organisation&apos;s objectives,
                preferred type of involvement and
                requirements. Our team can discuss
                relevant opportunities and available options.
              </p>

              {primaryContact && (
                <div className="mt-8 border-t border-[#e6e3df] pt-6">
                  <h3 className="font-heading text-sm font-bold text-[#252529]">
                    Partnership Enquiries
                  </h3>

                  <p className="mt-3 text-sm font-semibold text-[#333338]">
                    {primaryContact.name}
                  </p>

                  {primaryContact.email && (
                    <a
                      href={`mailto:${primaryContact.email}`}
                      className="mt-2 flex w-fit items-center gap-2 break-all text-sm text-[#696970] transition-colors hover:text-[#d52d35]"
                    >
                      <Mail
                        className="h-4 w-4 shrink-0 text-[#d52d35]"
                        aria-hidden="true"
                      />
                      {primaryContact.email}
                    </a>
                  )}

                  <Link
                    href="/contact"
                    className="group mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#d52d35] hover:text-[#b9232b]"
                  >
                    Contact the Team
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              )}
            </div>

            {/* Sponsorship form */}
            <div className="min-w-0 overflow-hidden rounded-xl border border-[#e7e4e0] bg-white shadow-[0_16px_45px_rgba(0,0,0,0.04)]">
              <div className="border-b border-[#eeece9] px-6 py-7 sm:px-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d52d35]">
                  Partnership Enquiry
                </p>

                <h2 className="mt-3 font-heading text-2xl font-bold tracking-[-0.035em] text-[#252529]">
                  Tell Us About Your Requirements
                </h2>

                <p className="mt-2 text-sm leading-7 text-[#696970]">
                  Submit your details and partnership
                  interests using the form below.
                </p>
              </div>

              <div className="px-5 py-7 sm:px-8 sm:py-8">
                <SponsorEnquiryForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
