import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import { Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "About the Organizer",
  description: `India Battery International Show 2026 is organised by ${siteConfig.organizer.name}.`,
  alternates: { canonical: "/about/organizer" },
};

export default function OrganizerPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "About", href: "/about" }, { label: "About the Organizer", href: "/about/organizer" }]} />
      <PageHero
        eyebrow="About"
        title="About the Organizer"
        description={`India Battery International Show 2026 is organised by ${siteConfig.organizer.name}.`}
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "About the Organizer" }]}
        backgroundImage={{
          src: "/images/expo-vip-lounge-branding.jpg",
          alt: "Futurex branding at a previous edition of the show",
        }}
      />

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-grey-light bg-white p-3 shadow-sm">
              <Image
                src="https://info.batteryindiaexpo.com/wp-content/uploads/2023/04/Futurex-Logo-copy.png"
                alt={`${siteConfig.organizer.name} logo`}
                width={900}
                height={400}
                className="h-full w-full object-contain"
              />
            </div>
            <SectionHeading eyebrow="Organizer" title={siteConfig.organizer.name} />
          </div>

          <p className="mt-5 text-lg leading-relaxed text-grey-medium">
            {siteConfig.organizer.name} organises India Battery International Show 2026, alongside the
            co-located India EV International Show and India Solar International Show, bringing together the
            battery, energy-storage, electric-mobility, charging, recycling and renewable-energy value chains
            for business, technology exchange and collaboration.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {siteConfig.contacts.map((contact) => (
              <div key={contact.email} className="rounded-xl border border-grey-light bg-white p-6 shadow-sm">
                <p className="font-heading text-base font-bold text-navy-dark">{contact.name}</p>
                <p className="text-sm text-grey-medium">{contact.role}</p>
                <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="mt-3 flex items-center gap-2 text-sm text-navy-dark hover:text-red">
                  <Phone className="h-4 w-4" aria-hidden="true" /> {contact.phone}
                </a>
                <a href={`mailto:${contact.email}`} className="mt-1 flex items-center gap-2 text-sm text-navy-dark hover:text-red">
                  <Mail className="h-4 w-4" aria-hidden="true" /> {contact.email}
                </a>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Button href="/contact">Contact Our Team</Button>
          </div>
        </Container>
      </section>
    </>
  );
}