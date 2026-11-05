import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { whyExhibitBenefits } from "@/lib/content/home-content";

const bookingUrl = "/exhibit/book-a-stand";

export const metadata: Metadata = {
  title: {
    absolute: "Why Exhibit | India International Battery Show 2027",
  },
  description:
    "Explore opportunities to exhibit at India International Battery Show 2027, taking place 14–16 October in Pune. Showcase battery technologies and connect with industry professionals.",
  alternates: {
    canonical: "/exhibit",
  },
  openGraph: {
    type: "website",
    title: "Why Exhibit | India International Battery Show 2027",
    description:
      "Discover exhibitor opportunities at India International Battery Show 2027 in Pune.",
    url: "/exhibit",
    images: ["/images/expo-motor-technology-booth.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ExhibitPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Exhibit", href: "/exhibit" }]} />

      <PageHero
        eyebrow="Exhibit"
        title="Exhibit at India International Battery Show"
        description="Present your products and technologies to professionals working across batteries, energy storage and related industries."
        breadcrumbs={[{ label: "Exhibit" }]}
        backgroundImage={{
          src: "/images/expo-motor-technology-booth.jpg",
          alt: "Technology demonstration at a previous exhibition",
        }}
      />

      {/* Introduction */}
      <section className="bg-white py-14 text-[#1c1c20] sm:py-18 lg:py-20">
        <Container>
          <div className="grid items-center gap-9 lg:grid-cols-[1fr_0.95fr] lg:gap-14">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-[#d52d35]">
                Why Exhibit
              </p>

              <h2 className="mt-4 max-w-xl font-heading text-[clamp(2rem,3.5vw,3rem)] font-extrabold leading-[1.15] tracking-[-0.045em]">
                A place to present what your business
                <span className="text-[#ed3138]"> does best.</span>
              </h2>

              <p className="mt-5 max-w-xl text-[15px] leading-8 text-[#66666d]">
                India International Battery Show brings manufacturers, suppliers
                and technology providers into an exhibition environment focused
                on battery manufacturing, energy storage and associated
                technologies.
              </p>

              <p className="mt-4 max-w-xl text-[15px] leading-8 text-[#66666d]">
                Exhibiting provides an opportunity to demonstrate products,
                discuss technical requirements and meet businesses exploring
                solutions for mobility, industrial and energy applications.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#ed3138] px-5 text-sm font-bold text-white transition-colors hover:bg-[#cf262e]"
                >
                  Book a Stand
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <Link
                  href="/exhibit/categories"
                  className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#dcd9d5] px-5 text-sm font-bold text-[#29292e] transition-colors hover:border-[#ed3138] hover:text-[#d52d35]"
                >
                  Exhibitor Categories
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <figure className="group overflow-hidden rounded-xl border border-[#e8e6e3]">
              <div className="relative aspect-[5/4]">
                <Image
                  src="/images/expo-motor-technology-booth.jpg"
                  alt="Exhibitor discussing technology with visitors at a previous edition"
                  fill
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transform-none"
                />
              </div>
            </figure>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section
        aria-labelledby="exhibit-benefits"
        className="bg-[#faf9f7] py-14 text-[#1c1c20] sm:py-16 lg:py-20"
      >
        <Container>
          <div className="mb-9 max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-[#d52d35]">
              Exhibitor Opportunities
            </p>

            <h2
              id="exhibit-benefits"
              className="mt-3 font-heading text-[clamp(1.7rem,3vw,2.5rem)] font-extrabold tracking-[-0.04em]"
            >
              Why take part?
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {whyExhibitBenefits.map((benefit) => (
              <article
                key={benefit.title}
                className="group flex items-start gap-4 rounded-xl border border-[#e9e7e4] bg-white p-5 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[#ed3138]/30 hover:shadow-[0_10px_24px_rgba(0,0,0,0.035)] sm:p-6"
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
                  <p className="mt-2 text-sm leading-7 text-[#6a6a70]">
                    {benefit.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Next steps */}
      <section className="bg-white py-14 text-[#1c1c20] sm:py-16">
        <Container>
          <div className="rounded-xl border border-[#e8e6e3] bg-white p-6 sm:p-9">
            <div className="grid items-center gap-7 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d52d35]">
                  Participate in 2027
                </p>
                <h2 className="mt-3 font-heading text-2xl font-bold tracking-[-0.035em] sm:text-3xl">
                  Explore your exhibiting options.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-[#696970]">
                  Review the exhibition categories or contact the team about
                  stand and sponsorship enquiries.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/exhibit/book-a-stand"
                  className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#ed3138] px-5 text-sm font-bold text-white transition-colors hover:bg-[#cf262e]"
                >
                  Stand Enquiry
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/exhibit/sponsorship"
                  className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#dedbd8] px-5 text-sm font-bold text-[#2b2b30] transition-colors hover:border-[#ed3138] hover:text-[#d52d35]"
                >
                  Sponsorship
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
