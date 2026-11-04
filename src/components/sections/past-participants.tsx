
"use client";

import Image from "next/image";

import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from "framer-motion";

import { Container } from "@/components/ui/container";

type Logo = {
  src: string;
  name: string;
};

type LogoGroup = {
  title: string;
  logos: Logo[];
};

const principalPartners: LogoGroup[] = [
  {
    title: "Platinum Partner",
    logos: [
      { src: "/partners/eka.png", name: "Platinum Partner" },
    ],
  },
  {
    title: "MASMA Pavilion",
    logos: [
      { src: "/partners/masma.webp", name: "MASMA Pavilion" },
    ],
  },
  {
    title: "Co-Partner",
    logos: [
      { src: "/partners/youhonk.png", name: "YouHonk" },
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
      { src: "/partners/toyota.png", name: "Toyota" },
    ],
  },
  {
    title: "Two Wheeler Partner",
    logos: [
      { src: "/partners/kinet.jpeg", name: "Two Wheeler Partner" },
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

const knowledgePartners: Logo[] = [
  { src: "/partners/ifeva.png", name: "Knowledge Partner" },
  {
    src: "/partners/knowledge-part.png",
    name: "Knowledge Partner",
  },
  {
    src: "/partners/fronst-sullivan-1.png",
    name: "Knowledge Partner",
  },
];

const supportingAssociations: Logo[] = [
  { src: "/partners/logo-1.jpg", name: "Supporting Association" },
  { src: "/partners/ace.png", name: "Supporting Association" },
  { src: "/partners/logo-4.jpg", name: "Supporting Association" },
  { src: "/partners/logo-3.jpg", name: "Supporting Association" },
  { src: "/partners/aisia.png", name: "Supporting Association" },
  { src: "/partners/rsa.png", name: "Supporting Association" },
  { src: "/partners/NETRA.jpeg", name: "Supporting Association" },
  { src: "/partners/ibsa.png", name: "Supporting Association" },
  { src: "/partners/logo-5.jpg", name: "Supporting Association" },
];

const officialMediaPartners: Logo[] = [
  { src: "/partners/logo-6.jpg", name: "Official Media Partner" },
  { src: "/partners/logo-7.jpg", name: "Official Media Partner" },
];

const mediaPartners: Logo[] = [
  { src: "/partners/urja-daily.png", name: "Urja Daily" },
  {
    src: "/partners/electronics-era.png",
    name: "Electronics Era",
  },
  { src: "/partners/ev-mechanica.png", name: "EV Mechanica" },
  {
    src: "/partners/battery-magazine.png",
    name: "Battery Magazine",
  },
  { src: "/partners/cosmoworld.png", name: "Cosmo World" },
  { src: "/partners/engineer.png", name: "Engineer" },
  {
    src: "/partners/trade-fair-times.png",
    name: "Trade Fair Times",
  },
  { src: "/partners/evolution.png", name: "Evolution" },
  { src: "/partners/99-media-group.png", name: "99 Media Group" },
  { src: "/partners/ev-tech-news.png", name: "EV Tech News" },
  { src: "/partners/er-city.png", name: "ER City" },
  { src: "/partners/auto-ev-times.png", name: "Auto EV Times" },
  { src: "/partners/smart-energy.png", name: "Smart Energy" },
  { src: "/partners/teztech.jpeg", name: "TezTech" },
];

function LogoTile({ logo }: { logo: Logo }) {
  return (
    <div className="flex h-[105px] min-w-0 items-center justify-center rounded-lg border border-[#eceae7] bg-white px-5 py-4 transition-[border-color,box-shadow] duration-300 hover:border-[#ed3138]/30 hover:shadow-[0_8px_22px_rgba(0,0,0,0.035)]">
      <Image
        src={logo.src}
        alt={logo.name}
        width={220}
        height={100}
        sizes="(min-width: 1024px) 200px, 45vw"
        className="max-h-[72px] w-auto max-w-full object-contain"
      />
    </div>
  );
}

function LogoCategory({
  title,
  logos,
}: {
  title: string;
  logos: Logo[];
}) {
  return (
    <div className="border-t border-[#e6e4e1] pt-7">
      <h3 className="mb-5 font-heading text-lg font-bold tracking-[-0.025em] text-[#202024]">
        {title}
      </h3>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {logos.map((logo) => (
          <LogoTile key={logo.src} logo={logo} />
        ))}
      </div>
    </div>
  );
}

export function PastParticipants() {
  const reduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <section
        aria-labelledby="past-participants-heading"
        className="bg-[#faf9f7] py-14 text-[#19191c] sm:py-16 lg:py-20"
      >
        <Container>
          <m.div
            initial={
              reduceMotion ? false : { opacity: 0, y: 16 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="mb-3 font-heading text-[11px] font-bold uppercase tracking-[0.17em] text-[#d52d35]">
              Previous Editions
            </p>

            <h2
              id="past-participants-heading"
              className="font-heading text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-tight tracking-[-0.04em]"
            >
              Past Partners & Associations
              <span className="text-[#ed3138]">.</span>
            </h2>

            <p className="mt-4 max-w-3xl text-[15px] leading-7 text-[#626269]">
              A record of organisations featured in the
              partner, association and media categories of
              previous exhibition activities. These listings
              do not represent confirmed partnerships for
              the 2027 edition.
            </p>
          </m.div>

          <div className="mt-11 space-y-11">
            <div>
              <h3 className="mb-5 font-heading text-xl font-bold tracking-[-0.025em]">
                Event Partners
              </h3>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {principalPartners.map((group) => (
                  <div
                    key={group.title}
                    className="rounded-xl border border-[#e9e7e4] bg-white p-5"
                  >
                    <h4 className="mb-4 min-h-[30px] text-[12px] font-bold text-[#4c4c51]">
                      {group.title}
                    </h4>

                    <div
                      className={
                        group.logos.length > 1
                          ? "grid grid-cols-2 gap-2"
                          : "grid grid-cols-1"
                      }
                    >
                      {group.logos.map((logo) => (
                        <LogoTile
                          key={logo.src}
                          logo={logo}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <LogoCategory
              title="Knowledge Partners"
              logos={knowledgePartners}
            />

            <LogoCategory
              title="Supporting Associations"
              logos={supportingAssociations}
            />

            <LogoCategory
              title="Official Media Partners"
              logos={officialMediaPartners}
            />

            <LogoCategory
              title="Media Partners"
              logos={mediaPartners}
            />
          </div>
        </Container>
      </section>
    </LazyMotion>
  );
}
