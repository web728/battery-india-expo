import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/forms/contact-form";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import { Phone, Mail, MessageCircle, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the India Battery International Show 2026 team for exhibiting, visiting, sponsorship, media or general enquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const waLink = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(siteConfig.whatsapp.message)}`;
  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.venue.mapQuery)}&output=embed`;

  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Contact", href: "/contact" }]} />
      <PageHero
        eyebrow="Contact"
        title="Get in Touch"
        description="Reach our team for exhibiting, visiting, sponsorship, media or general enquiries."
        breadcrumbs={[{ label: "Contact" }]}
          backgroundImage={{
          src: "https://info.batteryindiaexpo.com/wp-content/uploads/2023/05/nepal5p-34.jpg",
          alt: "Futurex branding at a previous edition of the show",
        }}
      />

      <Container className="-mt-10 sm:-mt-14">
        <figure className="overflow-hidden rounded-2xl shadow-xl">
          <Image
            src="/images/expo-telematics-booth-discussion.jpg"
            alt="Exhibitors and visitors in discussion at a technology booth at a previous edition"
            width={1800}
            height={1200}
            className="h-56 w-full object-cover sm:h-72"
            sizes="100vw"
          />
        </figure>
      </Container>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <SectionHeading eyebrow="Exhibitor & Partnership Enquiries" title="Our Team" />
              <div className="mt-6 flex flex-col gap-5">
                {siteConfig.contacts.map((contact) => (
                  <div key={contact.email} className="rounded-xl border border-grey-light bg-white p-5 shadow-sm">
                    <p className="font-heading text-base font-bold text-navy-dark">{contact.name}</p>
                    <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="mt-2 flex items-center gap-2 text-sm text-navy-dark hover:text-red">
                      <Phone className="h-4 w-4" aria-hidden="true" /> {contact.phone}
                    </a>
                    <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-sm text-navy-dark hover:text-red">
                      <Mail className="h-4 w-4" aria-hidden="true" /> {contact.email}
                    </a>
                  </div>
                ))}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-green/30 bg-green/5 p-4 text-sm font-semibold text-green"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" /> Chat with us on WhatsApp
                </a>
              </div>

              <div className="mt-8 flex items-start gap-3 text-sm text-grey-medium">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-red" aria-hidden="true" />
                <p>{siteConfig.venue.full}</p>
              </div>
              <div className="mt-3 flex items-start gap-3 text-sm text-grey-medium">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-red" aria-hidden="true" />
                <p>Working Hours: Monday–Friday, 9:30 AM–6:30 PM IST (Subject to Confirmation)</p>
              </div>

              <div className="mt-8 overflow-hidden rounded-xl border border-grey-light">
                <iframe
                  title="Map showing the Auto Cluster Exhibition Center, Pune"
                  src={mapEmbedSrc}
                  className="h-56 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="rounded-xl border border-grey-light bg-white p-6 shadow-sm sm:p-10">
              <SectionHeading eyebrow="General Enquiry" title="Send Us a Message" />
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
