
import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  CalendarDays,
  ExternalLink,
  MapPin,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

/* --------------------------------------------------
   INDIA BATTERY INTERNATIONAL SHOW

   Component: CoLocatedShows
   Theme: Hybrid Industrial Editorial

   PURPOSE
   - Introduce related exhibitions
   - Present the EV and Solar shows
   - Provide external website links
   - Identify the event organizer

   DESIGN
   - Warm off-white background
   - Large editorial typography
   - White exhibition profile cards
   - Authentic show logos
   - Restrained red accents
   - Thin borders and clean spacing

   PERFORMANCE
   - Server Component
   - No Framer Motion
   - No client-side state
   - Optimized local images
-------------------------------------------------- */

type RelatedShow = {
  name: string;
  category: string;
  description: string;
  logo: string;
  href: string;
};

/* --------------------------------------------------
   CO-LOCATED EXHIBITIONS

   Existing show identities, logos,
   editions and destinations preserved.

   Confirm edition numbering and
   co-location before publication.
-------------------------------------------------- */

const shows: readonly RelatedShow[] = [
  {
    name: "9th India International EV Show 2027",

    category: "Electric Mobility",

    description:
      "An exhibition focused on electric vehicles, " +
      "e-mobility technologies, components, " +
      "charging solutions and the wider electric " +
      "transportation ecosystem.",

    logo: "/logo/ev.png",

    href: "https://iievshow.com/",
  },
  {
    name: "2nd India International Solar Show 2027",

    category: "Solar & Renewable Energy",

    description:
      "A platform covering solar energy, " +
      "renewable power technologies, " +
      "solar equipment and solutions " +
      "supporting clean energy applications.",

    logo: "/logo/solar.png",

    href: "https://indiasolarshow.com/",
  },
];

/* --------------------------------------------------
   ORGANIZER
-------------------------------------------------- */

const ORGANIZER_LOGO =
  "/partners/futurex-logo.png";

const ORGANIZER_URL =
  "https://www.futurextrade.com/";

/* --------------------------------------------------
   COMPONENT
-------------------------------------------------- */

export function CoLocatedShows() {
  return (
    <>
      {/* MAIN EXHIBITION SECTION */}

      <section
        id="co-located-exhibitions"
        aria-labelledby="co-located-heading"
        className={[
          "relative isolate",
          "overflow-hidden",
          "bg-background",
          "py-16 sm:py-20",
          "lg:py-24 xl:py-28",
          "text-foreground",
        ].join(" ")}
      >
        <Container>
          {/* SECTION INTRODUCTION */}

          <div className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end lg:gap-12">
            <div className="max-w-[760px]">
              <div className="mb-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-7 shrink-0 bg-brand-red"
                />

                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.15em] text-brand-red sm:text-xs">
                  Connected Exhibitions
                </p>
              </div>

              <h2
                id="co-located-heading"
                className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-[-0.035em] text-foreground [text-wrap:balance]"
              >
                Three industries.
                <span className="block">
                  One platform
                  <span className="text-brand-red">.</span>
                </span>
              </h2>
            </div>

            <p className="max-w-[440px] font-body text-sm leading-[1.75] text-muted sm:text-base">
              Battery technology, electric mobility
              and solar energy are closely connected.
              Explore the related exhibitions
              scheduled alongside{" "}
              {siteConfig.eventName}.
            </p>
          </div>

          {/* EDITORIAL DIVIDER */}

          <div
            aria-hidden="true"
            className="mb-8 h-px w-full bg-[#E4E2DE] sm:mb-10"
          />

          {/* CO-LOCATED SHOW PROFILES */}

          <ul className="grid gap-5 lg:grid-cols-2 lg:gap-6">
            {shows.map((show, index) => (
              <li
                key={show.href}
                className="min-w-0"
              >
                <article className="group flex h-full flex-col overflow-hidden rounded-card border border-[#E4E2DE] bg-surface transition-colors duration-200 hover:border-brand-red/35">
                  {/* SHOW IDENTITY */}

                  <div className="relative flex min-h-[190px] items-center justify-center border-b border-[#E4E2DE] px-8 py-10 sm:min-h-[230px] sm:px-12">
                    <Image
                      src={show.logo}
                      alt={`${show.name} logo`}
                      width={440}
                      height={180}
                      sizes="(max-width: 1024px) 80vw, 40vw"
                      className="h-auto max-h-[120px] w-auto max-w-full object-contain"
                    />
                  </div>

                  {/* SHOW INFORMATION */}

                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-heading text-[11px] font-bold uppercase tracking-[0.12em] text-brand-red">
                        {show.category}
                      </p>

                     
                    </div>

                    <h3 className="mt-5 max-w-[480px] font-heading text-[clamp(1.25rem,2vw,1.6rem)] font-bold leading-[1.3] tracking-[-0.025em] text-foreground">
                      {show.name}
                    </h3>

                    <p className="mt-4 max-w-[480px] font-body text-sm leading-[1.8] text-muted sm:text-[15px]">
                      {show.description}
                    </p>

                    {/* EXTERNAL WEBSITE LINK */}

                    <div className="mt-auto pt-8">
                      <div className="border-t border-[#E4E2DE] pt-5">
                        <a
                          href={show.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${show.name} website (opens in a new tab)`}
                          className="group/link inline-flex min-h-11 items-center gap-2.5 font-heading text-sm font-bold text-brand-red transition-colors duration-200 hover:text-brand-red-hover focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
                        >
                          Visit Show Website

                          <ArrowUpRight
                            aria-hidden="true"
                            className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transform-none"
                            strokeWidth={1.8}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          {/* EVENT INFORMATION STRIP */}

          <div className="mt-10 grid gap-6 border-y border-[#E4E2DE] py-7 sm:mt-12 sm:grid-cols-2 sm:gap-0 lg:mt-14 lg:py-9">
            {/* EVENT DATES */}

            <div className="flex items-start gap-3 sm:pr-8">
              <CalendarDays
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                strokeWidth={1.8}
              />

              <div>
                <p className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                  Exhibition Dates
                </p>

                <p className="mt-2 font-heading text-sm font-bold leading-[1.5] text-foreground sm:text-base">
                  {siteConfig.dates.display}
                </p>
              </div>
            </div>

            {/* SHARED VENUE */}

            <div className="flex items-start gap-3 sm:border-l sm:border-[#E4E2DE] sm:pl-8 lg:pl-10">
              <MapPin
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                strokeWidth={1.8}
              />

              <div>
                <p className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                  Exhibition Venue
                </p>

                <p className="mt-2 font-heading text-sm font-bold leading-[1.5] text-foreground sm:text-base">
                  {siteConfig.venue.name}
                </p>

                <p className="mt-1 font-body text-xs leading-[1.7] text-muted">
                  {siteConfig.venue.city},{" "}
                  {siteConfig.venue.state},{" "}
                  {siteConfig.venue.country}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* -----------------------------------
          ORGANIZER IDENTITY
      ----------------------------------- */}

      <section
        id="co-located-organizer"
        aria-labelledby="co-located-organizer-heading"
        className="border-t border-[#E4E2DE] bg-surface py-14 text-foreground sm:py-16 lg:py-20"
      >
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)] lg:gap-14">
            {/* ORGANIZER DETAILS */}

            <div className="min-w-0">
              <div className="mb-5 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-7 shrink-0 bg-brand-red"
                />

                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.15em] text-brand-red sm:text-xs">
                  Exhibition Organizer
                </p>
              </div>

              <h2
                id="co-located-organizer-heading"
                className="max-w-[650px] font-heading text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.2] tracking-[-0.035em] text-foreground"
              >
                Organized by{" "}
                <span className="text-brand-red">
                  Futurex.
                </span>
              </h2>

              <p className="mt-5 max-w-[530px] font-body text-sm leading-[1.8] text-muted sm:text-base">
                {siteConfig.organizer.name} is
                the organizer of{" "}
                {siteConfig.eventName}.
                Learn more about the organizing
                team and official event contacts.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-5">
                <Link
                  href="/about/organizer"
                  className="group inline-flex min-h-11 items-center gap-2 font-heading text-sm font-bold text-brand-red transition-colors duration-200 hover:text-brand-red-hover focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
                >
                  About the Organizer

                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                    strokeWidth={1.8}
                  />
                </Link>

                <a
                  href={ORGANIZER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Futurex website (opens in a new tab)"
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted transition-colors duration-200 hover:text-brand-red focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
                >
                  Official Website

                  <ExternalLink
                    aria-hidden="true"
                    className="h-4 w-4"
                    strokeWidth={1.8}
                  />
                </a>
              </div>
            </div>

            {/* ORGANIZER LOGO */}

            <div className="flex min-h-[190px] items-center justify-center rounded-card border border-[#E4E2DE] bg-background px-8 py-10 sm:min-h-[220px]">
              <Image
                src={ORGANIZER_LOGO}
                alt={`${siteConfig.organizer.name} logo`}
                width={440}
                height={180}
                sizes="(max-width: 1024px) 80vw, 40vw"
                className="h-auto max-h-[110px] w-auto max-w-full object-contain"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
