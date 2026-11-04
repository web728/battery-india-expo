import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Mail,
  MapPin,
} from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { whyVisitBenefits } from "@/lib/content/home-content";

const registrationUrl = "/visit/register";

const planningDetails = [
  {
    title: "When to Visit",
    description:
      "The exhibition takes place from 14–16 October 2027. Daily opening hours will be announced by the organiser.",
  },
  {
    title: "Visitor Registration",
    description:
      "Register online before travelling. Check your registration confirmation for entry instructions and any applicable conditions.",
  },
  {
    title: "Getting to the Venue",
    description:
      "The event will be held at Auto Cluster Exhibition Centre, Pimpri-Chinchwad, Pune, Maharashtra.",
  },
  {
    title: "International Visitors",
    description:
      "Visitors travelling from outside India should check applicable visa, travel and entry requirements before making arrangements.",
  },
  {
    title: "What to Bring",
    description:
      "Keep your registration confirmation and a valid photo ID available. Business cards may be useful for industry meetings.",
  },
  {
    title: "Need Assistance?",
    description:
      "Contact the event team for registration questions or information about attending the show.",
  },
];

export const metadata: Metadata = {
  title: {
    absolute: "Why Visit | India Battery International Show 2027",
  },
  description:
    "Discover why to visit India Battery International Show 2027 in Pune, 14–16 October. Explore battery technologies, industry meetings and practical visitor information.",
  alternates: {
    canonical: "/visit",
  },
  openGraph: {
    type: "website",
    title: "Why Visit | India Battery International Show 2027",
    description:
      "Explore the battery and energy storage exhibition in Pune and plan your visit for 14–16 October 2027.",
    url: "/visit",
    images: ["/images/expo-floor-components-booth.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function VisitPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {
            label: "Visit",
            href: "/visit",
          },
        ]}
      />

      <PageHero
        eyebrow="Visit the Show"
        title="Why Visit India Battery International Show?"
        description="Explore battery technologies, meet industry suppliers and learn about solutions for energy storage, electric mobility and industrial applications."
        breadcrumbs={[{ label: "Visit" }]}
        backgroundImage={{
          src: "/images/expo-floor-components-booth.jpg",
          alt: "Visitors exploring an industry exhibition",
        }}
      />

      {/* Intro */}
      <section className="bg-white py-14 text-[#19191c] sm:py-16 lg:py-20">
        <Container>
          <div className="grid items-center gap-9 lg:grid-cols-[1fr_0.95fr] lg:gap-14">
            <div>
              <p className="font-heading text-[11px] font-bold uppercase tracking-[0.16em] text-[#d52d35]">
                Why Visit
              </p>

              <h2 className="mt-4 max-w-xl font-heading text-[clamp(1.9rem,3.5vw,3rem)] font-extrabold leading-[1.14] tracking-[-0.045em]">
                Explore the battery industry
                <span className="text-[#ed3138]"> in one place.</span>
              </h2>

              <p className="mt-5 max-w-xl text-[15px] leading-8 text-[#68686e]">
                India Battery International Show offers a place to explore
                battery products, manufacturing technologies, energy storage
                systems and supporting solutions.
              </p>

              <p className="mt-4 max-w-xl text-[15px] leading-8 text-[#68686e]">
                Visitors can speak with participating companies, compare
                technologies and discuss requirements relevant to their
                businesses and applications.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#ed3138] px-5 text-sm font-bold text-white transition-colors hover:bg-[#c9272e]"
                >
                  Register to Visit
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <Link
                  href="/visit/visitor-profile"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[#ddd9d5] px-5 text-sm font-bold text-[#29292e] transition-colors hover:border-[#ed3138] hover:text-[#d52d35]"
                >
                  Visitor Profile
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <figure className="group overflow-hidden rounded-xl border border-[#e8e6e3]">
              <div className="relative aspect-[5/4]">
                <Image
                  src="/images/expo-floor-components-booth.jpg"
                  alt="Industry professionals visiting an exhibition booth"
                  fill
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.035] motion-reduce:transform-none"
                />
              </div>
            </figure>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section
        aria-labelledby="visit-benefits-heading"
        className="bg-[#faf9f7] py-14 text-[#19191c] sm:py-16 lg:py-20"
      >
        <Container>
          <div className="mb-9 max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d52d35]">
              Visitor Opportunities
            </p>

            <h2
              id="visit-benefits-heading"
              className="mt-3 font-heading text-[clamp(1.7rem,3vw,2.5rem)] font-extrabold tracking-[-0.04em]"
            >
              What you can explore
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {whyVisitBenefits.map((benefit) => (
              <article
                key={benefit.title}
                className="group flex items-start gap-4 rounded-xl border border-[#e8e6e3] bg-white p-5 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[#ed3138]/30 hover:shadow-[0_10px_24px_rgba(0,0,0,0.035)] sm:p-6"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#fceced] text-[#d52d35]">
                  <Check
                    className="h-[18px] w-[18px]"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </span>

                <div>
                  <h3 className="font-heading text-base font-bold text-[#252529]">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#6b6b71]">
                    {benefit.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Planning Your Visit — integrated here */}
      <section
        id="plan-your-visit"
        aria-labelledby="planning-heading"
        className="bg-white py-14 text-[#19191c] sm:py-16 lg:py-20"
      >
        <Container>
          <div className="mb-9 max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d52d35]">
              Visitor Information
            </p>

            <h2
              id="planning-heading"
              className="mt-3 font-heading text-[clamp(1.8rem,3vw,2.5rem)] font-extrabold tracking-[-0.04em]"
            >
              Planning Your
              <span className="text-[#ed3138]"> Visit.</span>
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#696970]">
              Essential information to help you prepare for India Battery
              International Show 2027.
            </p>
          </div>

          <div className="grid gap-x-12 md:grid-cols-2">
            {planningDetails.map((detail) => (
              <article
                key={detail.title}
                className="border-t border-[#e7e5e1] py-5"
              >
                <h3 className="font-heading text-base font-bold text-[#252529]">
                  {detail.title}
                </h3>

                <p className="mt-2 text-sm leading-7 text-[#696970]">
                  {detail.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-7 grid gap-4 rounded-xl border border-[#e8e6e3] bg-[#faf9f7] p-5 sm:grid-cols-2 sm:p-6">
            <div className="flex items-start gap-3">
              <CalendarDays
                className="mt-0.5 h-5 w-5 shrink-0 text-[#d52d35]"
                aria-hidden="true"
              />
              <div>
                <p className="text-xs font-bold text-[#252529]">
                  Exhibition Dates
                </p>
                <p className="mt-1 text-sm text-[#68686e]">
                  14–16 October 2027
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin
                className="mt-0.5 h-5 w-5 shrink-0 text-[#d52d35]"
                aria-hidden="true"
              />
              <div>
                <p className="text-xs font-bold text-[#252529]">
                  Exhibition Venue
                </p>
                <p className="mt-1 text-sm leading-6 text-[#68686e]">
                  Auto Cluster Exhibition Centre, Pimpri-Chinchwad, Pune
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#ed3138] px-5 text-sm font-bold text-white transition-colors hover:bg-[#c9272e]"
            >
              Register to Visit
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <Link
              href="/venue/travel"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[#ddd9d5] px-5 text-sm font-bold text-[#29292e] transition-colors hover:border-[#ed3138] hover:text-[#d52d35]"
            >
              Travel Information
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Simple footer CTA */}
      <section className="bg-[#18181b] py-12 text-white sm:py-14">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-heading text-xl font-bold sm:text-2xl">
                Have a question about visiting?
              </h2>

              <p className="mt-2 text-sm leading-7 text-white/65">
                Check visitor FAQs or contact the exhibition team.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/visit/faqs"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/25 px-5 text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                Visitor FAQs
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#ed3138] px-5 text-sm font-bold text-white transition-colors hover:bg-[#c9272e]"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Contact the Team
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
