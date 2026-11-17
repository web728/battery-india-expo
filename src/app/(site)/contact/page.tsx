
import type { Metadata } from "next";

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

/* ==================================================
   INDIA BATTERY INTERNATIONAL SHOW

   CONTACT PAGE
   Route: /contact

   Design: Hybrid Industrial Editorial

   Page Flow:
   1. PageHero
   2. Contact Details + Enquiry Form
   3. Exhibition Venue Map

   SEO:
   - Unique page metadata
   - Absolute canonical
   - Open Graph / Twitter
   - ContactPage structured data
   - Breadcrumb structured data

   Performance:
   - Server Component
   - Lazy-loaded map
   - No animation library

   Existing ContactForm submission
   behavior remains unchanged.
================================================== */

const PAGE_PATH = "/contact";

const SITE_URL = siteConfig.siteUrl.replace(/\/+$/, "");

const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const HERO_IMAGE =
  "/images/expo-telematics-booth-discussion.jpg";

const PAGE_TITLE =
  `Contact Us | ${siteConfig.eventName} 2027`;

const PAGE_DESCRIPTION =
  `Contact the ${siteConfig.eventName} 2027 team ` +
  `for exhibitor participation, visitor registration, ` +
  `sponsorship, media and general enquiries. ` +
  `The exhibition takes place ${siteConfig.dates.display} in Pune.`;

/* --------------------------------------------------
   SEO METADATA
-------------------------------------------------- */

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: PAGE_URL,
    siteName: siteConfig.eventName,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}${HERO_IMAGE}`,
        alt:
          "Industry representatives discussing technology at an exhibition",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${SITE_URL}${HERO_IMAGE}`],
  },

  robots: {
    index: true,
    follow: true,
  },
};

/* --------------------------------------------------
   EXTERNAL LINKS
-------------------------------------------------- */

const whatsappNumber =
  siteConfig.whatsapp.number.replace(/\D/g, "");

const whatsappUrl =
  `https://wa.me/${whatsappNumber}?text=` +
  encodeURIComponent(siteConfig.whatsapp.message);

const mapQuery = siteConfig.venue.mapQuery;

const mapEmbedUrl =
  `https://www.google.com/maps?q=` +
  `${encodeURIComponent(mapQuery)}&output=embed`;

const directionsUrl =
  `https://www.google.com/maps/dir/?api=1&destination=` +
  encodeURIComponent(mapQuery);

/* --------------------------------------------------
   SHARED STYLES
-------------------------------------------------- */

const outlinedActionClass = [
  "group inline-flex min-h-12",
  "items-center justify-center gap-2.5",
  "rounded-button",
  "border border-[#D9D7D3]",
  "bg-white px-5 py-3",
  "font-heading text-sm font-bold text-foreground",
  "transition-[border-color,color] duration-200",
  "hover:border-brand-red hover:text-brand-red",
  "focus-visible:outline-2",
  "focus-visible:outline-offset-2",
  "focus-visible:outline-brand-red",
].join(" ");

/* ==================================================
   PAGE COMPONENT
================================================== */

export default function ContactPage() {
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",

    "@id": `${PAGE_URL}#webpage`,

    url: PAGE_URL,
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    inLanguage: "en-IN",

    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },

    about: {
      "@id": `${SITE_URL}/#event`,
    },

    mainEntity: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: siteConfig.organizer.name,

      contactPoint: siteConfig.contacts.map(
        (contact) => ({
          "@type": "ContactPoint",
          contactType: "event enquiries",
          name: contact.name,
          telephone: contact.phone,
          email: contact.email,
          availableLanguage: ["English", "Hindi"],
        })
      ),
    },
  };

  return (
    <>
      {/* ========================================
          CONTACT PAGE SCHEMA
      ======================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageJsonLd).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <BreadcrumbJsonLd
        items={[
          {
            label: "Contact",
            href: PAGE_PATH,
          },
        ]}
      />

      {/* ========================================
          SHARED PAGE HERO
      ======================================== */}

      <PageHero
        eyebrow="Contact the Organizing Team"
        title="Get in Touch"
        description={`Contact our team for exhibiting, visitor registration, sponsorship, media and general enquiries related to ${siteConfig.eventName} 2027.`}
        breadcrumbs={[
          {
            label: "Contact",
          },
        ]}
        backgroundImage={{
          src: HERO_IMAGE,
          alt:
            "Industry representatives discussing technologies at an exhibition",
        }}
      />

      {/* ========================================
          SECTION 1 — CONTACT + FORM
      ======================================== */}

      <section
        id="contact-enquiries"
        aria-labelledby="contact-heading"
        className="bg-background py-16 text-foreground sm:py-20 lg:py-24 xl:py-28"
      >
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.87fr)_minmax(0,1.13fr)] lg:gap-14 xl:gap-20">

            {/* ----------------------------------
                LEFT: CONTACT INFORMATION
            ---------------------------------- */}

            <div className="min-w-0">
              <div className="mb-6 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-7 shrink-0 bg-brand-red"
                />

                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.15em] text-brand-red sm:text-xs">
                  Contact Information
                </p>
              </div>

              <h2
                id="contact-heading"
                className="max-w-[600px] font-heading text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-[-0.04em] text-foreground [text-wrap:balance]"
              >
                Speak with
                <span className="block">
                  our team
                  <span className="text-brand-red">.</span>
                </span>
              </h2>

              <p className="mt-6 max-w-[550px] font-body text-[15px] leading-[1.8] text-muted sm:text-base">
                Whether you are planning to
                exhibit, visit or explore a
                partnership, our organizing
                team can assist with information
                about {siteConfig.eventName} 2027.
              </p>

              {/* CONTACT PERSONS */}

              <div className="mt-9 border-t border-[#E4E2DE]">
                {siteConfig.contacts.map((contact) => (
                  <div
                    key={contact.email}
                    className="border-b border-[#E4E2DE] py-6"
                  >
                    <h3 className="font-heading text-lg font-bold leading-[1.4] text-foreground">
                      {contact.name}
                    </h3>

                    <div className="mt-4 space-y-3">
                      <a
                        href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                        className="group flex w-fit items-start gap-3 font-body text-sm leading-7 text-muted transition-colors duration-200 hover:text-brand-red"
                      >
                        <Phone
                          aria-hidden="true"
                          className="mt-1 h-4 w-4 shrink-0 text-brand-red"
                          strokeWidth={1.8}
                        />

                        <span>{contact.phone}</span>
                      </a>

                      <a
                        href={`mailto:${contact.email}`}
                        className="group flex w-fit items-start gap-3 break-all font-body text-sm leading-7 text-muted transition-colors duration-200 hover:text-brand-red"
                      >
                        <Mail
                          aria-hidden="true"
                          className="mt-1 h-4 w-4 shrink-0 text-brand-red"
                          strokeWidth={1.8}
                        />

                        <span>{contact.email}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* WHATSAPP CONTACT */}

              {whatsappNumber && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${outlinedActionClass} mt-7`}
                >
                  <MessageCircle
                    aria-hidden="true"
                    className="h-4 w-4 text-brand-red"
                    strokeWidth={1.8}
                  />

                  Chat on WhatsApp

                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                    strokeWidth={1.8}
                  />
                </a>
              )}

              {/* EXHIBITION VENUE */}

              <div className="mt-10 border-t border-[#E4E2DE] pt-7">
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-surface text-brand-red"
                  >
                    <MapPin
                      className="h-5 w-5"
                      strokeWidth={1.8}
                    />
                  </span>

                  <div className="min-w-0">
                    <h3 className="font-heading text-base font-bold text-foreground">
                      Exhibition Venue
                    </h3>

                    <p className="mt-3 font-heading text-sm font-bold leading-[1.5] text-foreground">
                      {siteConfig.venue.name}
                    </p>

                    <address className="mt-2 max-w-[370px] not-italic font-body text-sm leading-[1.8] text-muted">
                      {siteConfig.venue.full}
                    </address>

                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-4 inline-flex min-h-10 items-center gap-2 font-heading text-sm font-bold text-brand-red transition-colors duration-200 hover:text-brand-red-hover"
                    >
                      Get Directions

                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                        strokeWidth={1.8}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* ----------------------------------
                RIGHT: ENQUIRY FORM
            ---------------------------------- */}

            <div
              id="contact-form"
              className="min-w-0 scroll-mt-28"
            >
              <div className="overflow-hidden rounded-card border border-[#E4E2DE] bg-surface">

                {/* FORM HEADER */}

                <div className="border-b border-[#E4E2DE] px-6 py-7 sm:px-8 sm:py-8 lg:px-9">
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="h-0.5 w-7 bg-brand-red"
                    />

                    <p className="font-heading text-[11px] font-bold uppercase tracking-[0.15em] text-brand-red sm:text-xs">
                      General Enquiry
                    </p>
                  </div>

                  <h2 className="font-heading text-[clamp(1.5rem,2.4vw,2rem)] font-bold leading-[1.25] tracking-[-0.035em] text-foreground">
                    Send Us a Message
                  </h2>

                  <p className="mt-4 max-w-[490px] font-body text-sm leading-[1.8] text-muted">
                    Share your enquiry using
                    the form below. Our team
                    will review your message
                    and respond through
                    the contact details provided.
                  </p>
                </div>

                {/* EXISTING FORM COMPONENT */}

                <div className="px-6 py-7 sm:px-8 sm:py-8 lg:px-9 lg:py-9">
                  <ContactForm />
                </div>
              </div>

             
            </div>
          </div>
        </Container>
      </section>

    </>
  );
}
