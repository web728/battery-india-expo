import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { visitorProfile } from "@/lib/content/exhibitor-categories";
import { sectors } from "@/lib/content/sectors";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About the Show",
  description:
    "India Battery International Show 2026 connects the complete battery and energy-storage value chain — manufacturers, technology providers, buyers, researchers and investors.",
  alternates: { canonical: "/about" },
};

const objectives = [
  "Provide a focused business platform for the battery and energy-storage value chain",
  "Connect manufacturers, technology providers and buyers for direct business discovery",
  "Support technical exchange through conferences and workshops",
  "Enable networking and B2B matchmaking between exhibitors and buyers",
  "Recognise innovation across the industry through the Innovation & Technology Awards",
];

const exploreLinks = [
  {
    href: "/about/why-pune",
    title: "Why Pune",
    description: "Learn why Pune is a strategic host city for the battery industry.",
  },
  {
    href: "/about/co-located-shows",
    title: "Co-Located Shows",
    description: "Explore India EV International Show and India Solar International Show.",
  },
  {
    href: "/about/organizer",
    title: "About the Organizer",
    description: `Learn more about ${siteConfig.organizer.name}, the show organizer.`,
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "About", href: "/about" }]} />
    <PageHero
  eyebrow="About the Show"
  title="Connecting the Complete Battery and Energy Storage Value Chain"
  description={siteConfig.tagline}
  breadcrumbs={[{ label: "About" }]}
   backgroundImage={{
          src: "https://info.batteryindiaexpo.com/wp-content/uploads/2022/09/81142496_477954383098116_3263101403136000000_n-1.jpg",
          alt: "EV powertrain demonstration at a previous edition of the show",
        }}
/>

      {/* Overview */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading eyebrow="Overview" title="About the Show" />
              <p className="mt-5 text-lg leading-relaxed text-grey-medium">
                India Battery International Show is a focused business and technology exhibition for advanced
                batteries, battery manufacturing, energy storage, charging infrastructure, power electronics,
                recycling and next-generation power solutions.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-grey-medium">
                The event is designed to connect manufacturers, technology providers, buyers, researchers,
                investors, utilities, fleet operators, automotive OEMs and policy stakeholders across{" "}
                {siteConfig.dates.display} at the {siteConfig.venue.name}, {siteConfig.venue.city}.
              </p>
            </div>
            <figure className="group relative overflow-hidden rounded-2xl shadow-xl shadow-navy-dark/10 ring-1 ring-black/5">
              <Image
                src="/images/expo-vip-lounge-branding.jpg"
                alt="Battery India Expo and India EV International Show branding at a previous edition, organised by Futurex"
                width={2400}
                height={1600}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <figcaption className="bg-navy-dark px-4 py-2.5 text-xs text-white/60">
                Previous edition — organised by {siteConfig.organizer.name}
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      {/* Objectives — now with a right-side image */}
      <section className="bg-grey-light py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <SectionHeading eyebrow="Objectives" title="Event Objectives" />
              <ul className="mt-6 flex flex-col gap-4">
                {objectives.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-lg bg-white p-4 text-base leading-relaxed text-grey-medium shadow-sm ring-1 ring-black/[0.03] transition-shadow duration-300 hover:shadow-md"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-red" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <figure className="relative overflow-hidden rounded-2xl shadow-xl shadow-navy-dark/10 ring-1 ring-black/5 lg:aspect-[4/5]">
              <Image
                src="https://info.batteryindiaexpo.com/wp-content/uploads/2026/03/SBP_3172-min-scaled-1.jpg"
                alt="A technical conference session held alongside a previous edition of the show"
                width={1600}
                height={2000}
                className="h-full w-full object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 via-navy-dark/0 to-transparent" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-5 text-sm font-medium text-white">
                Conferences and workshops driving technical exchange
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      {/* Who Participates */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Industry Ecosystem" title="Who Participates" align="center" />
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/[0.03] sm:p-8">
              <h3 className="mb-4 font-heading text-lg font-bold text-navy-dark">Exhibitor Ecosystem</h3>
              <div className="flex flex-col gap-3">
                {sectors.map((sector) => (
                  <p key={sector.slug} className="text-sm leading-relaxed text-grey-medium">
                    <span className="font-semibold text-navy-dark">{sector.name}</span> — {sector.description}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/[0.03] sm:p-8">
              <h3 className="mb-4 font-heading text-lg font-bold text-navy-dark">Visitor Ecosystem</h3>
              <div className="flex flex-col gap-3">
                {visitorProfile.map((item) => (
                  <p key={item.name} className="text-sm leading-relaxed text-grey-medium">
                    <span className="font-semibold text-navy-dark">{item.name}</span> — {item.description}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Explore more */}
      <section className="bg-navy-dark py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {exploreLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative flex flex-col justify-between rounded-xl border border-white/10 bg-white/5 p-6 transition-colors duration-300 hover:border-red/40 hover:bg-white/[0.08]"
              >
                <div>
                  <h3 className="font-heading text-lg font-bold text-white">{link.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{link.description}</p>
                </div>
                <ArrowUpRight
                  className="mt-5 h-5 w-5 text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-red"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 text-center sm:py-20">
        <Container>
          <SectionHeading title="Have Questions About the Show?" align="center" />
          <div className="mt-6 flex justify-center">
            <Button href="/contact" size="lg">
              Contact Our Team
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}