import type { Metadata } from "next";
import Link from "next/link";

import { ArrowUpRight, Mail, Phone } from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { ExhibitorEnquiryForm } from "@/components/forms/exhibitor-enquiry-form";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

const bookingUrl = "/exhibit/book-a-stand";

export const metadata: Metadata = {
  title: {
    absolute: "Book a Stand | India Battery International Show 2027",
  },
  description:
    "Enquire about exhibition stands at India Battery International Show 2027, taking place 14–16 October in Pune. Contact the team about stand requirements and availability.",
  alternates: {
    canonical: "/exhibit/book-a-stand",
  },
  openGraph: {
    type: "website",
    title: "Book a Stand | India Battery International Show 2027",
    description:
      "Send your stand enquiry for India Battery International Show 2027 in Pune.",
    url: "/exhibit/book-a-stand",
    images: ["/images/expo-vip-lounge-branding.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BookAStandPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Exhibit", href: "/exhibit" },
          {
            label: "Book a Stand",
            href: "/exhibit/book-a-stand",
          },
        ]}
      />

      <PageHero
        eyebrow="Exhibit"
        title="Book a Stand"
        description="Send your exhibiting requirements to the India Battery International Show 2027 team."
        breadcrumbs={[
          { label: "Exhibit", href: "/exhibit" },
          { label: "Book a Stand" },
        ]}
        backgroundImage={{
          src: "/images/expo-vip-lounge-branding.jpg",
          alt: "Exhibition and industry networking at a previous edition",
        }}
      />

      <section className="bg-[#faf9f7] py-14 text-[#19191c] sm:py-16 lg:py-20">
        <Container>
          <div className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 xl:gap-16">
            {/* Introduction */}
            <div className="lg:sticky lg:top-28">
              <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-[#d52d35]">
                Exhibitor Enquiry
              </p>

              <h2 className="mt-4 max-w-lg font-heading text-[clamp(1.9rem,3vw,2.75rem)] font-extrabold leading-[1.15] tracking-[-0.04em]">
                Discuss your
                <span className="text-[#ed3138]"> stand requirements.</span>
              </h2>

              <p className="mt-5 max-w-lg text-[15px] leading-8 text-[#67676e]">
                Share your company details and preferred stand requirements. The
                exhibition team can provide information about available options,
                pricing and the booking process.
              </p>

              <div className="mt-8 border-t border-[#e6e3df] pt-6">
                <p className="font-heading text-sm font-bold text-[#252529]">
                  Existing booking form
                </p>

                <p className="mt-2 text-sm leading-7 text-[#696970]">
                  You can also open the exhibition booking form directly.
                </p>

                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-md border border-[#dcd9d5] bg-white px-5 text-sm font-bold text-[#29292e] transition-colors hover:border-[#ed3138] hover:text-[#d52d35]"
                >
                  Open Booking Form
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              {siteConfig.contacts.length > 0 && (
                <div className="mt-8 border-t border-[#e6e3df] pt-6">
                  <h3 className="font-heading text-sm font-bold text-[#252529]">
                    Exhibitor Enquiries
                  </h3>

                  <div className="mt-5 space-y-5">
                    {siteConfig.contacts.map((contact) => (
                      <div key={contact.email}>
                        <p className="text-sm font-semibold text-[#333338]">
                          {contact.name}
                        </p>

                        {contact.phone && (
                          <a
                            href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                            className="mt-2 flex w-fit items-center gap-2 text-sm text-[#696970] hover:text-[#d52d35]"
                          >
                            <Phone
                              className="h-4 w-4 text-[#d52d35]"
                              aria-hidden="true"
                            />
                            {contact.phone}
                          </a>
                        )}

                        {contact.email && (
                          <a
                            href={`mailto:${contact.email}`}
                            className="mt-2 flex w-fit items-center gap-2 break-all text-sm text-[#696970] hover:text-[#d52d35]"
                          >
                            <Mail
                              className="h-4 w-4 shrink-0 text-[#d52d35]"
                              aria-hidden="true"
                            />
                            {contact.email}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Enquiry form */}
            <div className="min-w-0 overflow-hidden rounded-xl border border-[#e7e4e0] bg-white shadow-[0_16px_45px_rgba(0,0,0,0.04)]">
              <div className="border-b border-[#eeece9] px-6 py-7 sm:px-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d52d35]">
                  India Battery International Show 2027
                </p>

                <h2 className="mt-3 font-heading text-2xl font-bold tracking-[-0.035em] text-[#252529]">
                  Exhibitor Enquiry Form
                </h2>

                <p className="mt-2 text-sm leading-7 text-[#696970]">
                  Complete the details below to submit your enquiry.
                </p>
              </div>

              <div className="px-5 py-7 sm:px-8 sm:py-8">
                <ExhibitorEnquiryForm />
              </div>
            </div>
          </div>

          <p className="mt-7 text-center text-xs text-[#85858a]">
            For general event enquiries, visit{" "}
            <Link
              href="/contact"
              className="font-semibold text-[#d52d35] hover:underline"
            >
              Contact Us
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
