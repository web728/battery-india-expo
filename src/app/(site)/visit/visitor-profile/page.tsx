import type { Metadata } from "next";
import Link from "next/link";

import { ArrowUpRight, UsersRound } from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { visitorProfile } from "@/lib/content/exhibitor-categories";

const registrationUrl = "/visit/register";

export const metadata: Metadata = {
  title: {
    absolute: "Visitor Profile | India International Battery Show 2027",
  },
  description:
    "Explore the professional visitor categories relevant to India International Battery Show 2027, from automotive and energy companies to technology buyers and researchers.",
  alternates: {
    canonical: "/visit/visitor-profile",
  },
  openGraph: {
    type: "website",
    title: "Visitor Profile | India International Battery Show 2027",
    description:
      "Discover the industry professionals and organisations the battery exhibition is designed for.",
    url: "/visit/visitor-profile",
    images: ["/images/expo-floor-components-booth.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function VisitorProfilePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {
            label: "Visit",
            href: "/visit",
          },
          {
            label: "Visitor Profile",
            href: "/visit/visitor-profile",
          },
        ]}
      />

      <PageHero
        eyebrow="Visit"
        title="Visitor Profile"
        description="An industry-focused exhibition for professionals working with batteries, energy storage, electric mobility and related technologies."
        breadcrumbs={[
          { label: "Visit", href: "/visit" },
          { label: "Visitor Profile" },
        ]}
        backgroundImage={{
          src: "/images/expo-floor-components-booth.jpg",
          alt: "Industry visitors at an exhibition booth",
        }}
      />

      <section className="bg-[#faf9f7] py-14 text-[#19191c] sm:py-16 lg:py-20">
        <Container>
          <div className="mb-9 max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d52d35]">
              Industry Audience
            </p>

            <h2 className="mt-3 font-heading text-[clamp(1.7rem,3vw,2.5rem)] font-extrabold leading-tight tracking-[-0.04em]">
              Who the exhibition
              <span className="text-[#ed3138]"> is for.</span>
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#696970]">
              The show is relevant to organisations and professionals involved
              in technology sourcing, product development, manufacturing and
              industrial applications.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visitorProfile.map((item) => (
              <article
                key={item.name}
                className="group rounded-xl border border-[#e8e6e3] bg-white p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[#ed3138]/30 hover:shadow-[0_10px_24px_rgba(0,0,0,0.035)]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fceced] text-[#d52d35]">
                  <UsersRound
                    className="h-5 w-5"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </span>

                <h3 className="mt-5 font-heading text-base font-bold text-[#252529]">
                  {item.name}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#696970]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-5 border-t border-[#e5e2de] pt-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-heading text-xl font-bold text-[#252529]">
                Planning to attend?
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#696970]">
                Register online for the 2027 exhibition.
              </p>
            </div>

            <a
              href={registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-[#ed3138] px-5 text-sm font-bold text-white transition-colors hover:bg-[#c9272e]"
            >
              Register to Visit
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-5">
            <Link
              href="/visit"
              className="text-sm font-semibold text-[#d52d35] hover:underline"
            >
              View visitor information
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
