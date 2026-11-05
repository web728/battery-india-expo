import type { Metadata } from "next";
import Link from "next/link";

import {
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/forms/contact-form";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    absolute: "Contact Us | India International Battery Show 2027",
  },
  description:
    "Contact the India International Battery Show 2027 team for exhibiting, visiting, sponsorship, media and general enquiries. The exhibition takes place 14–16 October in Pune.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    title: "Contact Us | India International Battery Show 2027",
    description:
      "Get in touch with the India International Battery Show 2027 team for exhibition-related enquiries.",
    url: "/contact",
    images: ["/images/expo-telematics-booth-discussion.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  const whatsappNumber = siteConfig.whatsapp.number.replace(/[^\d]/g, "");

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    siteConfig.whatsapp.message,
  )}`;

  const venueName = siteConfig.venue.name || "Auto Cluster Exhibition Centre";

  const venueAddress =
    siteConfig.venue.full ||
    "Auto Cluster Exhibition Centre, Pimpri-Chinchwad, Pune, Maharashtra";

  const mapQuery =
    siteConfig.venue.mapQuery ||
    "Auto Cluster Exhibition Centre, Pimpri-Chinchwad, Pune";

  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    mapQuery,
  )}&output=embed`;

  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    mapQuery,
  )}`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {
            label: "Contact",
            href: "/contact",
          },
        ]}
      />

      <PageHero
        eyebrow="Contact"
        title="Get in Touch"
        description="Contact our team for exhibiting, visitor registration, sponsorship, media and general exhibition enquiries."
        breadcrumbs={[
          {
            label: "Contact",
          },
        ]}
        backgroundImage={{
          src: "/images/expo-telematics-booth-discussion.jpg",
          alt: "Industry representatives discussing technology at an exhibition",
        }}
      />

      {/* Main contact section */}
      <section
        aria-labelledby="contact-heading"
        className="bg-[#faf9f7] py-14 text-[#19191c] sm:py-16 lg:py-20"
      >
        <Container>
          <div className="grid items-start gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 xl:gap-16">
            {/* LEFT: Contact information */}
            <div className="min-w-0">
              <p className="font-heading text-[11px] font-bold uppercase tracking-[0.17em] text-[#d52d35]">
                Contact Information
              </p>

              <h2
                id="contact-heading"
                className="mt-4 max-w-lg font-heading text-[clamp(1.9rem,3vw,2.75rem)] font-extrabold leading-[1.15] tracking-[-0.045em]"
              >
                Speak with our
                <span className="text-[#ed3138]"> team.</span>
              </h2>

              <p className="mt-5 max-w-lg text-[15px] leading-8 text-[#696970]">
                Whether you are planning to exhibit, attend or explore a
                partnership, our team can assist with information about India
                Battery International Show 2027.
              </p>

              {/* Contact persons */}
              {siteConfig.contacts.length > 0 && (
                <div className="mt-8 divide-y divide-[#e4e1dd] border-y border-[#e4e1dd]">
                  {siteConfig.contacts.map((contact, index) => (
                    <div key={`${contact.email}-${index}`} className="py-5">
                      <h3 className="font-heading text-base font-bold text-[#252529]">
                        {contact.name}
                      </h3>

                      <div className="mt-3 space-y-2.5">
                        {contact.phone && (
                          <a
                            href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                            className="group flex w-fit items-start gap-3 text-sm leading-6 text-[#696970] transition-colors hover:text-[#d52d35]"
                          >
                            <Phone
                              className="mt-1 h-4 w-4 shrink-0 text-[#d52d35]"
                              strokeWidth={1.8}
                              aria-hidden="true"
                            />
                            <span>{contact.phone}</span>
                          </a>
                        )}

                        {contact.email && (
                          <a
                            href={`mailto:${contact.email}`}
                            className="group flex w-fit items-start gap-3 break-all text-sm leading-6 text-[#696970] transition-colors hover:text-[#d52d35]"
                          >
                            <Mail
                              className="mt-1 h-4 w-4 shrink-0 text-[#d52d35]"
                              strokeWidth={1.8}
                              aria-hidden="true"
                            />
                            <span>{contact.email}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* WhatsApp */}
              {whatsappNumber && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-6 inline-flex min-h-11 items-center gap-2.5 rounded-md border border-[#d9d7d3] bg-white px-5 py-3 font-heading text-sm font-bold text-[#29292e] transition-[border-color,color] duration-300 hover:border-[#ed3138]/50 hover:text-[#d52d35] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ed3138]"
                >
                  <MessageCircle
                    className="h-4.5 w-4.5 text-[#d52d35]"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  Chat on WhatsApp
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              )}

              {/* Venue address */}
              <div className="mt-9 border-t border-[#e4e1dd] pt-6">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="mt-1 h-5 w-5 shrink-0 text-[#d52d35]"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />

                  <div>
                    <h3 className="font-heading text-sm font-bold text-[#252529]">
                      Exhibition Venue
                    </h3>

                    <p className="mt-2 font-heading text-sm font-semibold text-[#333338]">
                      {venueName}
                    </p>

                    <address className="mt-1 max-w-sm not-italic text-sm leading-7 text-[#696970]">
                      {venueAddress}
                    </address>

                    <a
                      href={directionsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#d52d35] hover:text-[#b8232b]"
                    >
                      Get Directions
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Enquiry form */}
            <div className="min-w-0 overflow-hidden rounded-xl border border-[#e8e5e1] bg-white shadow-[0_18px_50px_rgba(0,0,0,0.045)]">
              <div className="border-b border-[#efedea] px-6 py-7 sm:px-9 sm:py-8">
                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.16em] text-[#d52d35]">
                  General Enquiry
                </p>

                <h2 className="mt-3 font-heading text-[clamp(1.55rem,2.4vw,2rem)] font-bold tracking-[-0.035em] text-[#252529]">
                  Send Us a Message
                </h2>

                <p className="mt-3 max-w-md text-sm leading-7 text-[#696970]">
                  Complete the form below with your enquiry. Our team will
                  review your message.
                </p>
              </div>

              <div className="px-5 py-7 sm:px-9 sm:py-9">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Compact location map */}
      <section
        aria-labelledby="contact-location-heading"
        className="border-t border-[#ece9e5] bg-white py-14 text-[#19191c] sm:py-16"
      >
        <Container>
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d52d35]">
                Location
              </p>

              <h2
                id="contact-location-heading"
                className="mt-3 font-heading text-2xl font-bold tracking-[-0.035em] sm:text-3xl"
              >
                Find the Exhibition Venue
              </h2>
            </div>

            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-bold text-[#d52d35] hover:text-[#b8232b]"
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              Open in Google Maps
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>

          <div className="overflow-hidden rounded-xl border border-[#e8e5e1] bg-[#f2f1ef]">
            <iframe
              title={`Map showing ${venueName} in Pune`}
              src={mapEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block h-[320px] w-full border-0 sm:h-[390px]"
            />
          </div>

          <p className="mt-4 text-xs leading-6 text-[#88888d]">
            The map shows the exhibition venue, not the organiser&apos;s office
            address.
          </p>
        </Container>
      </section>
    </>
  );
}
