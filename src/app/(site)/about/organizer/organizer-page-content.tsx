
import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

/**
 * Organizer Page Content
 *
 * India Battery International Show
 *
 * Server Component
 * - No Framer Motion
 * - No client-side hooks
 * - Event information from siteConfig
 * - Type-safe organizer contacts
 */

const ORGANIZER_LOGO = "/partners/futurex-logo.png";

export function OrganizerPageContent() {
  const organizerName = siteConfig.organizer.name;
  const contacts = siteConfig.contacts;

  return (
    <>
      {/* ========================================
          SECTION 1: ABOUT THE ORGANIZER
      ======================================== */}

      <section
        id="event-organizer"
        aria-labelledby="organizer-heading"
        className="bg-surface py-16 text-foreground sm:py-20 lg:py-24 xl:py-28"
      >
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 xl:gap-20">

            {/* ORGANIZER LOGO */}

            <div className="min-w-0">
              <figure className="overflow-hidden rounded-[10px] border border-[#E4E2DE] bg-background p-5 sm:p-7">
                <div className="flex min-h-[180px] items-center justify-center rounded-md border border-[#E4E2DE] bg-white px-6 py-10 sm:min-h-[220px]">
                  <Image
                    src={ORGANIZER_LOGO}
                    alt={`${organizerName} official logo`}
                    width={600}
                    height={250}
                    sizes="(min-width: 1024px) 420px, 80vw"
                    className="h-auto max-h-[110px] w-auto max-w-full object-contain"
                  />
                </div>

                <figcaption className="mt-6 border-t border-[#E4E2DE] pt-5">
                  <p className="font-heading text-[11px] font-bold uppercase tracking-[0.15em] text-brand-red">
                    Official Exhibition Organizer
                  </p>

                  <p className="mt-2 font-heading text-xl font-bold leading-snug tracking-[-0.025em] text-foreground sm:text-2xl">
                    {organizerName}
                  </p>
                </figcaption>
              </figure>
            </div>

            {/* ABOUT THE ORGANIZER */}

            <div className="min-w-0">
              <div className="mb-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-7 shrink-0 bg-brand-red"
                />

                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.15em] text-brand-red sm:text-xs">
                  About the Organizer
                </p>
              </div>

              <h2
                id="organizer-heading"
                className="max-w-[690px] font-heading text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-[-0.04em] text-foreground [text-wrap:balance]"
              >
                The team behind the{" "}
                <span className="text-brand-red">
                  show.
                </span>
              </h2>

              <div className="mt-7 max-w-[640px] space-y-4 font-body text-[15px] leading-[1.8] text-muted sm:text-base">
                <p>
                  {organizerName} organizes{" "}
                  {siteConfig.eventName}, a trade exhibition
                  focused on battery technologies,
                  manufacturing, energy storage
                  and related industrial applications.
                </p>

                <p>
                  The exhibition provides a platform
                  for battery manufacturers, technology
                  providers, component suppliers,
                  research organisations and industry
                  professionals to connect through
                  product showcases, business meetings
                  and technical discussions.
                </p>

                <p>
                  The 2027 edition takes place from{" "}
                  {siteConfig.dates.display} at{" "}
                  {siteConfig.venue.name} in{" "}
                  {siteConfig.venue.city}, bringing
                  together businesses working across
                  the battery and electric mobility
                  value chain.
                </p>
              </div>

              {/* CONTACT PAGE LINK */}

              <div className="mt-8 border-t border-[#E4E2DE] pt-6">
                <Link
                  href="/contact"
                  className="group inline-flex min-h-11 items-center gap-2 font-heading text-sm font-bold text-brand-red transition-colors duration-200 hover:text-brand-red-hover focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
                >
                  Contact the Organizing Team

                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
                    strokeWidth={1.8}
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* ====================================
              EVENT INFORMATION STRIP
          ==================================== */}

          <div className="mt-14 grid gap-6 border-y border-[#E4E2DE] py-7 sm:mt-16 sm:grid-cols-3 sm:gap-0 lg:mt-20 lg:py-9">

            {/* EVENT DATES */}

            <div className="flex items-start gap-3 sm:pr-6">
              <CalendarDays
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                strokeWidth={1.8}
              />

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                  Exhibition Dates
                </p>

                <p className="mt-2 font-heading text-sm font-bold leading-[1.5] text-foreground sm:text-base">
                  {siteConfig.dates.display}
                </p>
              </div>
            </div>

            {/* VISITOR HOURS */}

            <div className="flex items-start gap-3 sm:border-l sm:border-[#E4E2DE] sm:px-6 lg:px-10">
              <Clock3
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                strokeWidth={1.8}
              />

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                  Visitor Hours
                </p>

                <p className="mt-2 font-heading text-sm font-bold leading-[1.5] text-foreground sm:text-base">
                  {siteConfig.visitorHours.display}{" "}
                  {siteConfig.visitorHours.timeZoneLabel}
                </p>
              </div>
            </div>

            {/* VENUE */}

            <div className="flex items-start gap-3 sm:border-l sm:border-[#E4E2DE] sm:pl-6 lg:pl-10">
              <MapPin
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                strokeWidth={1.8}
              />

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                  Exhibition Venue
                </p>

                <p className="mt-2 font-heading text-sm font-bold leading-[1.5] text-foreground sm:text-base">
                  {siteConfig.venue.name}
                </p>

                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {siteConfig.venue.city},{" "}
                  {siteConfig.venue.state},{" "}
                  {siteConfig.venue.country}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================
          SECTION 2: ORGANIZER CONTACTS
      ======================================== */}

      {contacts.length > 0 && (
        <section
          id="organizer-contacts"
          aria-labelledby="organizer-contact-heading"
          className="border-t border-[#E4E2DE] bg-background py-16 text-foreground sm:py-20 lg:py-24"
        >
          <Container>
            {/* SECTION HEADING */}

            <div className="mb-10 grid gap-5 lg:mb-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-12">
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-0.5 w-7 shrink-0 bg-brand-red"
                  />

                  <p className="font-heading text-[11px] font-bold uppercase tracking-[0.15em] text-brand-red sm:text-xs">
                    Organizer Contacts
                  </p>
                </div>

                <h2
                  id="organizer-contact-heading"
                  className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-[-0.035em] text-foreground"
                >
                  Speak with our team
                  <span className="text-brand-red">
                    .
                  </span>
                </h2>
              </div>

              <p className="max-w-[430px] font-body text-sm leading-[1.75] text-muted sm:text-base">
                For exhibition participation,
                partnerships and event-related
                enquiries, reach the relevant
                organizer contact directly.
              </p>
            </div>

            {/* CONTACT CARDS */}

            <ul className="grid gap-4 md:grid-cols-2 lg:gap-5">
              {contacts.map((contact, index) => (
                <li
                  key={contact.email}
                  className="min-w-0"
                >
                  <article className="h-full rounded-card border border-[#E4E2DE] bg-surface p-6 sm:p-7">

                    {/* CONTACT NAME */}

                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-heading text-lg font-bold leading-snug tracking-[-0.02em] text-foreground">
                        {contact.name}
                      </h3>

                      <span
                        aria-hidden="true"
                        className="shrink-0 text-xs font-medium tabular-nums text-muted"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* CONTACT DETAILS */}

                    <div className="mt-6 space-y-4 border-t border-[#E4E2DE] pt-5">

                      {/* PHONE NUMBER */}

                      {contact.phone && (
                        <a
                          href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                          className="flex min-w-0 items-start gap-3 text-sm leading-[1.7] text-muted transition-colors hover:text-brand-red focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                        >
                          <Phone
                            aria-hidden="true"
                            className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-red"
                            strokeWidth={1.8}
                          />

                          <span>
                            {contact.phone}
                          </span>
                        </a>
                      )}

                      {/* EMAIL ADDRESS */}

                      {contact.email && (
                        <a
                          href={`mailto:${contact.email}`}
                          className="flex min-w-0 items-start gap-3 text-sm leading-[1.7] text-muted transition-colors hover:text-brand-red focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                        >
                          <Mail
                            aria-hidden="true"
                            className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-red"
                            strokeWidth={1.8}
                          />

                          <span className="min-w-0 break-words [overflow-wrap:anywhere]">
                            {contact.email}
                          </span>
                        </a>
                      )}
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
