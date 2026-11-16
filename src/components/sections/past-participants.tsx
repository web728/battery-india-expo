
import Image from "next/image";

import {
  ArrowUpRight,
  Building2,
  Info,
} from "lucide-react";

import { Container } from "@/components/ui/container";

/* --------------------------------------------------
   INDIA BATTERY INTERNATIONAL SHOW

   Component: PastParticipants
   Theme: Hybrid Industrial Editorial

   PURPOSE
   - Showcase previous-edition partners
   - Present supporting associations
   - Present knowledge and media partners
   - Maintain a clear historical distinction

   DESIGN
   - Warm off-white background
   - Professional logo directory
   - Editorial section headings
   - Thin dividers
   - Restrained brand-red accents
   - Consistent 10–12px corners

   PERFORMANCE
   - Server Component
   - No Framer Motion
   - No client-side state
   - Optimized local logo images
-------------------------------------------------- */

type Logo = {
  src: string;
  name: string;
};

type LogoGroup = {
  title: string;
  logos: readonly Logo[];
};

/* --------------------------------------------------
   HISTORICAL EVENT PARTNERS

   All entries preserved from original code.

   These listings do NOT confirm
   participation in the 2027 edition.
-------------------------------------------------- */

const principalPartners: readonly LogoGroup[] = [
  {
    title: "Platinum Partner",
    logos: [
      {
        src: "/partners/eka.png",
        name: "Platinum Partner",
      },
    ],
  },
  {
    title: "MASMA Pavilion",
    logos: [
      {
        src: "/partners/masma.webp",
        name: "MASMA Pavilion",
      },
    ],
  },
  {
    title: "Co-Partner",
    logos: [
      {
        src: "/partners/youhonk.png",
        name: "YouHonk",
      },
    ],
  },
  {
    title: "E-Mobility Partner",
    logos: [
      {
        src: "/partners/garve-hyundai.png",
        name: "Garve Hyundai",
      },
    ],
  },
  {
    title: "Four Wheeler Partner",
    logos: [
      {
        src: "/partners/toyota.png",
        name: "Toyota",
      },
    ],
  },
  {
    title: "Two Wheeler Partner",
    logos: [
      {
        src: "/partners/kinet.jpeg",
        name: "Two Wheeler Partner",
      },
    ],
  },
  {
    title: "Battery Partner",
    logos: [
      {
        src: "/partners/Redon-logo-2.png",
        name: "Battery Partner",
      },
    ],
  },
  {
    title: "Institutional Partners",
    logos: [
      {
        src: "/partners/institutional.png",
        name: "Institutional Partner",
      },
      {
        src: "/partners/RVSF_logo_new.webp",
        name: "RVSF India",
      },
    ],
  },
  {
    title: "Battery Testing Partner",
    logos: [
      {
        src: "/partners/Bind.jpg",
        name: "Battery Testing Partner",
      },
    ],
  },
  {
    title: "Supporting Partners",
    logos: [
      {
        src: "/partners/supporting.png",
        name: "Supporting Partner",
      },
      {
        src: "/partners/bis-logo.png",
        name: "Supporting Partner",
      },
    ],
  },
  {
    title: "Startup Ecosystem Partner",
    logos: [
      {
        src: "/partners/hub.png",
        name: "Startup Ecosystem Partner",
      },
    ],
  },
  {
    title: "Strategy Partner",
    logos: [
      {
        src: "/partners/Theistic.png",
        name: "Theistic",
      },
    ],
  },
  {
    title: "Startup Partner",
    logos: [
      {
        src: "/partners/Wespark.png",
        name: "WeSpark",
      },
    ],
  },
];

/* --------------------------------------------------
   KNOWLEDGE PARTNERS
-------------------------------------------------- */

const knowledgePartners: readonly Logo[] = [
  {
    src: "/partners/ifeva.png",
    name: "Knowledge Partner",
  },
  {
    src: "/partners/knowledge-part.png",
    name: "Knowledge Partner",
  },
  {
    src: "/partners/fronst-sullivan-1.png",
    name: "Knowledge Partner",
  },
];

/* --------------------------------------------------
   SUPPORTING ASSOCIATIONS
-------------------------------------------------- */

const supportingAssociations: readonly Logo[] = [
  {
    src: "/partners/logo-1.jpg",
    name: "Supporting Association",
  },
  {
    src: "/partners/ace.png",
    name: "Supporting Association",
  },
  {
    src: "/partners/logo-4.jpg",
    name: "Supporting Association",
  },
  {
    src: "/partners/logo-3.jpg",
    name: "Supporting Association",
  },
  {
    src: "/partners/aisia.png",
    name: "Supporting Association",
  },
  {
    src: "/partners/rsa.png",
    name: "Supporting Association",
  },
  {
    src: "/partners/NETRA.jpeg",
    name: "Supporting Association",
  },
  {
    src: "/partners/ibsa.png",
    name: "Supporting Association",
  },
  {
    src: "/partners/logo-5.jpg",
    name: "Supporting Association",
  },
];

/* --------------------------------------------------
   OFFICIAL MEDIA PARTNERS
-------------------------------------------------- */

const officialMediaPartners: readonly Logo[] = [
  {
    src: "/partners/logo-6.jpg",
    name: "Official Media Partner",
  },
  {
    src: "/partners/logo-7.jpg",
    name: "Official Media Partner",
  },
];

/* --------------------------------------------------
   MEDIA PARTNERS
-------------------------------------------------- */

const mediaPartners: readonly Logo[] = [
  {
    src: "/partners/urja-daily.png",
    name: "Urja Daily",
  },
  {
    src: "/partners/electronics-era.png",
    name: "Electronics Era",
  },
  {
    src: "/partners/ev-mechanica.png",
    name: "EV Mechanica",
  },
  {
    src: "/partners/battery-magazine.png",
    name: "Battery Magazine",
  },
  {
    src: "/partners/cosmoworld.png",
    name: "Cosmo World",
  },
  {
    src: "/partners/engineer.png",
    name: "Engineer",
  },
  {
    src: "/partners/trade-fair-times.png",
    name: "Trade Fair Times",
  },
  {
    src: "/partners/evolution.png",
    name: "Evolution",
  },
  {
    src: "/partners/99-media-group.png",
    name: "99 Media Group",
  },
  {
    src: "/partners/ev-tech-news.png",
    name: "EV Tech News",
  },
  {
    src: "/partners/er-city.png",
    name: "ER City",
  },
  {
    src: "/partners/auto-ev-times.png",
    name: "Auto EV Times",
  },
  {
    src: "/partners/smart-energy.png",
    name: "Smart Energy",
  },
  {
    src: "/partners/teztech.jpeg",
    name: "TezTech",
  },
];

/* --------------------------------------------------
   REUSABLE LOGO TILE

   - Uses Next.js Image
   - Consistent image display
   - Contain prevents cropped logos
   - No misleading links
-------------------------------------------------- */

function LogoTile({
  logo,
  compact = false,
}: {
  logo: Logo;
  compact?: boolean;
}) {
  return (
    <div
      className={[
        "flex min-w-0 items-center justify-center",
        "overflow-hidden rounded-[10px]",
        "border border-[#E4E2DE]",
        "bg-white",
        "px-4 py-5",
        compact
          ? "min-h-[110px] sm:min-h-[125px]"
          : "min-h-[130px] sm:min-h-[145px]",
      ].join(" ")}
    >
      <Image
        src={logo.src}
        alt={logo.name}
        width={260}
        height={130}
        sizes="(max-width: 640px) 42vw, (max-width: 1024px) 28vw, 220px"
        className={[
          "h-auto w-auto max-w-full",
          "object-contain",
          compact
            ? "max-h-[75px]"
            : "max-h-[95px]",
        ].join(" ")}
      />
    </div>
  );
}

/* --------------------------------------------------
   REUSABLE CATEGORY

   Used for knowledge partners,
   supporting associations,
   and media categories.
-------------------------------------------------- */

function LogoCategory({
  title,
  logos,
  id,
}: {
  title: string;
  logos: readonly Logo[];
  id: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="border-t border-[#E4E2DE] pt-10 sm:pt-12"
    >
      <div className="mb-7 flex items-center justify-between gap-4">
        <h3
          id={`${id}-heading`}
          className="font-heading text-xl font-bold leading-[1.3] tracking-[-0.025em] text-foreground sm:text-2xl"
        >
          {title}
        </h3>

        <span
          aria-hidden="true"
          className="hidden text-xs font-medium tabular-nums text-muted sm:block"
        >
          {String(logos.length).padStart(2, "0")}
        </span>
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {logos.map((logo) => (
          <li key={logo.src} className="min-w-0">
            <LogoTile logo={logo} compact />
          </li>
        ))}
      </ul>
    </section>
  );
}

/* --------------------------------------------------
   MAIN COMPONENT
-------------------------------------------------- */

export function PastParticipants() {
  return (
    <section
      id="past-participants"
      aria-labelledby="past-participants-heading"
      className={[
        "relative isolate overflow-hidden",
        "bg-background text-foreground",
        "py-16 sm:py-20",
        "lg:py-24 xl:py-28",
      ].join(" ")}
    >
      <Container>
        {/* SECTION INTRODUCTION */}

        <div className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end lg:gap-12">
          <div className="max-w-[780px]">
            <div className="mb-5 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-0.5 w-7 shrink-0 bg-brand-red"
              />

              <p className="font-heading text-[11px] font-bold uppercase tracking-[0.15em] text-brand-red sm:text-xs">
                Previous Editions
              </p>
            </div>

            <h2
              id="past-participants-heading"
              className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-[-0.035em] text-foreground [text-wrap:balance]"
            >
              Past Partners
              <span className="block">
                & Associations
                <span className="text-brand-red">.</span>
              </span>
            </h2>
          </div>

          <p className="max-w-[440px] font-body text-sm leading-[1.8] text-muted sm:text-base">
            Explore organisations featured
            in partner, association and media
            categories during previous
            exhibition activities.
          </p>
        </div>

        {/* HISTORICAL INFORMATION NOTICE */}

        <div className="mb-12 flex items-start gap-4 border-l-[3px] border-brand-red bg-white px-5 py-5 sm:mb-14 sm:px-6">
          <Info
            aria-hidden="true"
            className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
            strokeWidth={1.8}
          />

          <div>
            <p className="font-heading text-sm font-bold text-foreground">
              Previous edition listings
            </p>

            <p className="mt-1.5 max-w-[900px] font-body text-sm leading-[1.75] text-muted">
              The organisations and partner
              categories shown on this page
              relate to previous exhibition
              activities. They should not
              be interpreted as confirmed
              partners, sponsors or
              participants for the 2027 edition.
            </p>
          </div>
        </div>

        {/* EVENT PARTNERS */}

        <section
          id="previous-event-partners"
          aria-labelledby="event-partners-heading"
        >
          <div className="mb-7 flex items-center justify-between gap-4 border-b border-[#E4E2DE] pb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <Building2
                aria-hidden="true"
                className="h-5 w-5 text-brand-red"
                strokeWidth={1.8}
              />

              <h3
                id="event-partners-heading"
                className="font-heading text-xl font-bold tracking-[-0.025em] text-foreground sm:text-2xl"
              >
                Event Partners
              </h3>
            </div>
 
          </div>

          {/* PARTNER GROUPS */}

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {principalPartners.map((group, index) => (
              <li
                key={group.title}
                className="min-w-0"
              >
                <article className="flex h-full flex-col overflow-hidden rounded-card border border-[#E4E2DE] bg-white p-5 sm:p-6">
                  {/* Category heading */}

                  <div className="mb-5 flex min-h-[38px] items-start justify-between gap-3">
                    <h4 className="font-heading text-sm font-bold leading-[1.5] text-foreground sm:text-[15px]">
                      {group.title}
                    </h4>
 
                  </div>

                  {/* Logos */}

                  <div
                    className={[
                      "mt-auto grid gap-3",
                      group.logos.length > 1
                        ? "grid-cols-2"
                        : "grid-cols-1",
                    ].join(" ")}
                  >
                    {group.logos.map((logo) => (
                      <LogoTile
                        key={logo.src}
                        logo={logo}
                        compact
                      />
                    ))}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* ADDITIONAL PARTNER CATEGORIES */}

        <div className="mt-14 space-y-12 sm:mt-16 lg:space-y-14">
          <LogoCategory
            id="knowledge-partners"
            title="Knowledge Partners"
            logos={knowledgePartners}
          />

          <LogoCategory
            id="supporting-associations"
            title="Supporting Associations"
            logos={supportingAssociations}
          />

          <LogoCategory
            id="official-media-partners"
            title="Official Media Partners"
            logos={officialMediaPartners}
          />

          <LogoCategory
            id="media-partners"
            title="Media Partners"
            logos={mediaPartners}
          />
        </div>

        {/* FINAL INFORMATION STRIP */}

        <div className="mt-14 flex flex-col gap-5 border-t border-[#E4E2DE] pt-8 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[700px] font-body text-sm leading-[1.75] text-muted">
            This directory documents
            previous-edition associations
            and media participation.
            Current-edition partner
            announcements are published
            separately when confirmed.
          </p>

          <a
            href="/contact"
            className="group inline-flex min-h-11 shrink-0 items-center gap-2 font-heading text-sm font-bold text-brand-red transition-colors duration-200 hover:text-brand-red-hover focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
          >
            Partnership Enquiries

            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
              strokeWidth={1.8}
            />
          </a>
        </div>
      </Container>
    </section>
  );
}
