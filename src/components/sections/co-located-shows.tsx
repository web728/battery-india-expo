"use client";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

type PartnerLogo = {
  src: string;
  url: string;
  name: string;
  imgClassName?: string;
};

// ============================================================
// DATA
// ============================================================

// Row 1 — 5 items
const row1: { label: string; logos: PartnerLogo[] }[] = [
  {
    label: "Platinum Partner",
    logos: [{ src: "/partners/eka.png", url: "#", name: "Platinum Partner", imgClassName: "max-h-14" }],
  },
  {
    label: "Masma Pavilion",
    logos: [{ src: "/partners/masma.webp", url: "https://www.youhonk.com/", name: "Masma Pavilion", imgClassName: "max-h-14" }],
  },
  {
    label: "Co-Sponsor",
    logos: [{ src: "/partners/youhonk.png", url: "https://www.youhonk.com/", name: "Co-Sponsor", imgClassName: "max-h-14" }],
  },
  {
    label: "E-Mobility Partner",
    logos: [{ src: "/partners/garve-hyundai.png", url: "https://garve.hyundaimotor.in/", name: "E-Mobility Partner", imgClassName: "max-h-12" }],
  },
  {
    label: "Four Wheeler Partner",
    logos: [{ src: "/partners/toyota.png", url: "https://www.toyotabharat.com/", name: "Four Wheeler Partner", imgClassName: "max-h-10" }],
  },
];

// Row 2 — 4 items
const row2: { label: string; logos: PartnerLogo[] }[] = [
  {
    label: "Two Wheeler Partner",
    logos: [{ src: "/partners/kinet.jpeg", url: "https://kineticev.in/", name: "Two Wheeler Partner", imgClassName: "max-h-10" }],
  },
  {
    label: "Battery Partner",
    logos: [{ src: "/partners/Redon-logo-2.png", url: "https://iievshow.com/", name: "Battery Partner", imgClassName: "max-h-10" }],
  },
  {
    label: "Institutional Partner",
    logos: [
      { src: "/partners/institutional.png", url: "https://www.asrtu.org/", name: "Institutional Partner 1", imgClassName: "max-h-9" },
      { src: "/partners/RVSF_logo_new.webp", url: "https://rvsfindia.in/", name: "Institutional Partner 2", imgClassName: "max-h-9" },
    ],
  },
  {
    label: "Battery Testing Partner",
    logos: [{ src: "/partners/Bind.jpg", url: "https://www.binder-world.com/int-en", name: "Battery Testing Partner", imgClassName: "max-h-10" }],
  },
];

// Row 3 — 4 items
const row3: { label: string; logos: PartnerLogo[] }[] = [
  {
    label: "Supporting Partners",
    logos: [
      { src: "/partners/supporting.png", url: "#", name: "Supporting Partner 1", imgClassName: "max-h-9" },
      { src: "/partners/bis-logo.png", url: "#", name: "Supporting Partner 2", imgClassName: "max-h-9" },
    ],
  },
  {
    label: "Startup Ecosystem Partner",
    logos: [{ src: "/partners/hub.png", url: "https://ihubgujarat.in/", name: "Startup Ecosystem Partner", imgClassName: "max-h-10" }],
  },
  {
    label: "Strategy Partner",
    logos: [{ src: "/partners/Theistic.png", url: "https://theistic.in/", name: "Strategy Partner", imgClassName: "max-h-10" }],
  },
  {
    label: "Startup Partner",
    logos: [{ src: "/partners/Wespark.png", url: "https://wespark.org.in/", name: "Startup Partner", imgClassName: "max-h-12" }],
  },
];

// Row 4 — Knowledge Partners (standalone, centered, BIGGER logos)
const knowledgePartners: PartnerLogo[] = [
  { src: "/partners/ifeva.png", url: "https://fevaev.com/", name: "Knowledge Partner 1", imgClassName: "max-h-16" },
  { src: "/partners/knowledge-part.png", url: "#", name: "Knowledge Partner 2", imgClassName: "max-h-16" },
  { src: "/partners/fronst-sullivan-1.png", url: "#", name: "Knowledge Partner 3", imgClassName: "max-h-16" },
];

// Supporting Associations — 9 logos: row of 5 + row of 4, centered
const supportingAssociations: PartnerLogo[] = [
  { src: "/partners/logo-1.jpg", url: "https://www.araiindia.com/", name: "Association 1", imgClassName: "max-h-11" },
  { src: "/partners/ace.png", url: "https://iievshow.com/#", name: "Association 2", imgClassName: "max-h-11" },
  { src: "/partners/logo-4.jpg", url: "https://indiaesa.info/", name: "Association 3", imgClassName: "max-h-11" },
  { src: "/partners/logo-3.jpg", url: "https://smartemobility.org/", name: "Association 4", imgClassName: "max-h-15" },
  { src: "/partners/aisia.png", url: "https://aisia.org.in/", name: "Association 5", imgClassName: "max-h-11" },
  { src: "/partners/rsa.png", url: "#", name: "Association 6", imgClassName: "max-h-13" },
  { src: "/partners/NETRA.jpeg", url: "https://netraglobal.org/", name: "Association 7", imgClassName: "max-h-11" },
  { src: "/partners/ibsa.png", url: "https://ibsa.org.in/", name: "Association 8", imgClassName: "max-h-11" },
  { src: "/partners/logo-5.jpg", url: "#", name: "Association 9", imgClassName: "max-h-11" },
];
const associationsRow1 = supportingAssociations.slice(0, 5);
const associationsRow2 = supportingAssociations.slice(5, 9);

// Official Media Partners
const officialMediaLogos: PartnerLogo[] = [
  { src: "/partners/logo-6.jpg", url: "https://www.auto-innovations.net/", name: "Official Media Partner 1", imgClassName: "max-h-12" },
  { src: "/partners/logo-7.jpg", url: "https://induportals-media-publishing.com/", name: "Official Media Partner 2", imgClassName: "max-h-12" },
];

// Media Partners (infinite scroll)
const infiniteMediaLogos: PartnerLogo[] = [
  { src: "/partners/urja-daily.png", url: "#", name: "Media 1", imgClassName: "max-h-12" },
  { src: "/partners/electronics-era.png", url: "#", name: "Media 2", imgClassName: "max-h-12" },
  { src: "/partners/ev-mechanica.png", url: "#", name: "Media 3", imgClassName: "max-h-12" },
  { src: "/partners/battery-magazine.png", url: "#", name: "Media 4", imgClassName: "max-h-12" },
  { src: "/partners/cosmoworld.png", url: "#", name: "Media 5", imgClassName: "max-h-12" },
  { src: "/partners/engineer.png", url: "#", name: "Media 6", imgClassName: "max-h-8" },
  { src: "/partners/trade-fair-times.png", url: "#", name: "Media 7", imgClassName: "max-h-12" },
  { src: "/partners/evolution.png", url: "#", name: "Media 8", imgClassName: "max-h-12" },
  { src: "/partners/99-media-group.png", url: "#", name: "Media 9", imgClassName: "max-h-12" },
  { src: "/partners/ev-tech-news.png", url: "#", name: "Media 10", imgClassName: "max-h-12" },
  { src: "/partners/er-city.png", url: "#", name: "Media 11", imgClassName: "max-h-12" },
  { src: "/partners/auto-ev-times.png", url: "#", name: "Media 12", imgClassName: "max-h-12" },
  { src: "/partners/smart-energy.png", url: "#", name: "Media 13", imgClassName: "max-h-12" },
];

// ============================================================
// REUSABLE CARD (title centered on top, logo box below)
// ============================================================

function PartnerCard({ label, logos }: { label: string; logos: PartnerLogo[] }) {
  return (
    <div className="flex flex-col items-center">
      <h3 className="mb-4 min-h-[2rem] flex items-center justify-center text-center font-heading text-xs font-bold uppercase tracking-wider text-grey-medium">
        {label}
      </h3>
      {logos.length === 1 ? (
        <a
          href={logos[0].url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-24 w-full items-center justify-center rounded-xl border border-grey-light/60 bg-white p-4 mix-blend-multiply transition-all hover:-translate-y-1 hover:shadow-md"
        >
          <img
            src={logos[0].src}
            alt={logos[0].name}
            className={`${logos[0].imgClassName || "max-h-10"} max-w-full object-contain`}
          />
        </a>
      ) : (
        <div className="grid w-full h-24 gap-2" style={{ gridTemplateColumns: `repeat(${logos.length}, minmax(0, 1fr))` }}>
          {logos.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full items-center justify-center rounded-xl border border-grey-light/60 bg-white p-2 mix-blend-multiply transition-all hover:shadow-sm"
            >
              <img
                src={item.src}
                alt={item.name}
                className={`${item.imgClassName || "max-h-10"} max-w-full object-contain`}
              />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// Simple centered logo tile used in Associations rows
function AssociationTile({ item }: { item: PartnerLogo }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-24 w-40 items-center justify-center rounded-xl border border-grey-light/60 bg-white p-4 transition-all duration-300 hover:border-navy/30 hover:shadow-md hover:-translate-y-1"
    >
      <img
        src={item.src}
        alt={item.name}
        className={`${item.imgClassName || "max-h-10"} max-w-full object-contain opacity-80 hover:opacity-100`}
      />
    </a>
  );
}

// ============================================================
// COMPONENT
// ============================================================

export function CoLocatedShows() {
  return (
    <section className="bg-grey-light py-20 sm:py-24 overflow-hidden">
      <Container>
        <SectionHeading eyebrow="Event Partners & Associations" title="Our Powerful Ecosystem" align="center" />

        <div className="mt-16 flex flex-col gap-16">
          {/* =========================================================
              CO-LOCATED WITH & ORGANISED BY
              ========================================================= */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="flex flex-col items-center rounded-2xl border border-navy/5 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md">
              <h3 className="mb-6 font-heading text-xs font-bold uppercase tracking-wider text-grey-medium">
                Co-Located With
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-8 mix-blend-multiply">
                <a
                  href="https://iievshow.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex h-20 w-44 items-center justify-center p-2 transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src="https://iievshow.com/wp-content/uploads/2022/06/India-EV-Logo.png"
                    alt="India International EV Logo"
                    className="max-h-15 max-w-full object-contain"
                  />
                </a>
                <a
                  href="https://indiasolarshow.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex h-20 w-44 items-center justify-center p-2 transition-transform duration-300 hover:scale-105"
                >
                  <img src="/partners/solar-expo-logo.jpg" alt="Solar Expo Logo" className="max-h-12 max-w-full object-contain" />
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center rounded-2xl border border-navy/5 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md">
              <h3 className="mb-6 font-heading text-xs font-bold uppercase tracking-wider text-grey-medium">
                Organised By
              </h3>
              <div className="flex items-center justify-center mix-blend-multiply">
                <a
                  href="https://www.futurextrade.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex h-20 w-56 items-center justify-center p-2 transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src="https://iievshow.com/wp-content/uploads/2025/11/Futurex-Logo-copy-1536x320-1.png"
                    alt="Futurex Logo"
                    className="max-h-12 max-w-full object-contain"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* =========================================================
              ROW 1 — Platinum, Masma, Co-Sponsor, E-Mobility, 4-Wheeler
              ========================================================= */}
          <div className="rounded-2xl border border-navy/5 bg-white p-8 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {row1.map((item) => (
                <PartnerCard key={item.label} label={item.label} logos={item.logos} />
              ))}
            </div>
          </div>

          {/* =========================================================
              ROW 2 — 2-Wheeler, Battery, Institutional, Battery Testing
              ========================================================= */}
          <div className="rounded-2xl border border-navy/5 bg-white p-8 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {row2.map((item) => (
                <PartnerCard key={item.label} label={item.label} logos={item.logos} />
              ))}
            </div>
          </div>

          {/* =========================================================
              ROW 3 — Supporting, Startup Ecosystem, Strategy, Startup
              ========================================================= */}
          <div className="rounded-2xl border border-navy/5 bg-white p-8 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {row3.map((item) => (
                <PartnerCard key={item.label} label={item.label} logos={item.logos} />
              ))}
            </div>
          </div>

          {/* =========================================================
              ROW 4 — Knowledge Partners (standalone, centered, bigger logos)
              ========================================================= */}
          <div className="flex flex-col items-center rounded-2xl border border-navy/5 bg-white p-8 sm:p-10 shadow-sm">
            <h3 className="mb-6 font-heading text-xs font-bold uppercase tracking-wider text-grey-medium">
              Knowledge Partners
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-6 mix-blend-multiply">
              {knowledgePartners.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-28 w-52 items-center justify-center rounded-xl border border-grey-light/60 bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <img src={item.src} alt={item.name} className={`${item.imgClassName || "max-h-16"} max-w-full object-contain`} />
                </a>
              ))}
            </div>
          </div>

          <hr className="border-t border-navy/10 my-2" />

          {/* =========================================================
              SUPPORTING ASSOCIATIONS — Row of 5 + Row of 4, both centered
              ========================================================= */}
          <div className="flex flex-col items-center rounded-2xl border border-navy/5 bg-white p-8 sm:p-10 shadow-sm">
            <h3 className="mb-8 font-heading text-xs font-bold uppercase tracking-wider text-grey-medium">
              Supporting Associations
            </h3>
            <div className="w-full flex flex-col items-center gap-6 mix-blend-multiply">
              <div className="flex flex-wrap items-center justify-center gap-6">
                {associationsRow1.map((item, index) => (
                  <AssociationTile key={`assoc-row1-${index}`} item={item} />
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6">
                {associationsRow2.map((item, index) => (
                  <AssociationTile key={`assoc-row2-${index}`} item={item} />
                ))}
              </div>
            </div>
          </div>

          <hr className="border-t border-navy/10 my-2" />

          {/* =========================================================
              OFFICIAL MEDIA PARTNERS
              ========================================================= */}
          <div className="flex flex-col items-center rounded-2xl border border-navy/5 bg-white p-8 shadow-sm">
            <h3 className="mb-6 font-heading text-xs font-bold uppercase tracking-wider text-grey-medium">
              Official Media Partners
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-8 mix-blend-multiply">
              {officialMediaLogos.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-24 w-52 items-center justify-center rounded-xl border border-grey-light/60 bg-white p-5 transition-all duration-300 hover:border-navy/30 hover:shadow-md hover:-translate-y-1"
                >
                  <img
                    src={item.src}
                    alt={item.name}
                    className={`${item.imgClassName || "max-h-10"} max-w-full object-contain opacity-85 hover:opacity-100`}
                  />
                </a>
              ))}
            </div>
          </div>

          <hr className="border-t border-navy/10 my-2" />

          {/* =========================================================
              MEDIA PARTNERS (Infinite Scroll Marquee — uses globals.css)
              ========================================================= */}
          <div className="flex flex-col items-center rounded-2xl border border-navy/5 bg-white py-8 shadow-sm overflow-hidden">
            <h3 className="mb-8 font-heading text-xs font-bold uppercase tracking-wider text-grey-medium text-center">
              Media Partners
            </h3>
            <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
              <div className="animate-infinite-scroll gap-6 items-center mix-blend-multiply py-2">
                {[...infiniteMediaLogos, ...infiniteMediaLogos].map((item, index) => (
                  <a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-24 w-48 flex-shrink-0 items-center justify-center rounded-xl border border-grey-light/60 bg-white p-4 transition-all duration-300 hover:border-navy/30 hover:shadow-sm"
                  >
                    <img
                      src={item.src}
                      alt={item.name}
                      className={`${item.imgClassName || "max-h-10"} max-w-full object-contain opacity-85 hover:opacity-100`}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}