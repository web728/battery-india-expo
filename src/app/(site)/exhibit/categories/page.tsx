import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { SectorIcon } from "@/components/ui/sector-icon";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { sectors } from "@/lib/content/sectors";

const bookingUrl = "/exhibit/book-a-stand";

export const metadata: Metadata = {
  title: {
    absolute: "Exhibitor Categories | India International Battery Show 2027",
  },
  description:
    "Explore exhibitor categories at India International Battery Show 2027, covering battery manufacturing, energy storage and related technologies.",
  alternates: {
    canonical: "/exhibit/categories",
  },
  openGraph: {
    type: "website",
    title: "Exhibitor Categories | India International Battery Show 2027",
    description:
      "Explore the products and technologies represented at the battery exhibition in Pune.",
    url: "/exhibit/categories",
    images: ["/images/expo-motor-technology-booth.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ExhibitCategoriesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Exhibit", href: "/exhibit" },
          {
            label: "Exhibitor Categories",
            href: "/exhibit/categories",
          },
        ]}
      />

      <PageHero
        eyebrow="Exhibit"
        title="Exhibitor Categories"
        description="Explore the products, components and technologies represented across the battery and energy storage value chain."
        breadcrumbs={[
          { label: "Exhibit", href: "/exhibit" },
          { label: "Exhibitor Categories" },
        ]}
        backgroundImage={{
          src: "/images/expo-motor-technology-booth.jpg",
          alt: "Industrial technology exhibition display",
        }}
      />

      <section
        aria-labelledby="categories-heading"
        className="bg-[#faf9f7] py-14 text-[#19191c] sm:py-16 lg:py-20"
      >
        <Container>
          <div className="mb-9 max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-[#d52d35]">
              Exhibition Scope
            </p>

            <h2
              id="categories-heading"
              className="mt-3 font-heading text-[clamp(1.8rem,3vw,2.5rem)] font-extrabold leading-tight tracking-[-0.04em]"
            >
              Products and technologies
              <span className="text-[#ed3138]"> on display.</span>
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#66666d]">
              Browse the exhibition categories to understand the areas covered
              by India International Battery Show 2027.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector) => (
              <article
                key={sector.slug}
                id={sector.slug}
                className="group flex min-h-[215px] scroll-mt-28 flex-col rounded-xl border border-[#e8e6e3] bg-white p-6 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[#ed3138]/30 hover:shadow-[0_12px_28px_rgba(0,0,0,0.045)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#fceced] text-[#d52d35]">
                  <SectorIcon
                    icon={sector.icon}
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mt-5 font-heading text-lg font-bold leading-snug tracking-[-0.025em] text-[#232327]">
                  {sector.name}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#696970]">
                  {sector.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-11 flex flex-col gap-5 border-t border-[#e4e1dd] pt-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-heading text-xl font-bold text-[#232327]">
                Interested in exhibiting?
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#696970]">
                Contact the team to discuss available stand options.
              </p>
            </div>

            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-[#ed3138] px-5 text-sm font-bold text-white transition-colors hover:bg-[#cf262e]"
            >
              Book a Stand
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
