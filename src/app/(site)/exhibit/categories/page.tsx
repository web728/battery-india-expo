import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { SectorIcon } from "@/components/ui/sector-icon";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { sectors } from "@/lib/content/sectors";

export const metadata: Metadata = {
  title: "Exhibitor Categories",
  description: "Explore the 16 exhibition sectors at India Battery International Show 2026, from battery cells to renewable energy integration.",
  alternates: { canonical: "/exhibit/categories" },
};

export default function ExhibitCategoriesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Exhibit", href: "/exhibit" }, { label: "Exhibitor Categories", href: "/exhibit/categories" }]} />
      <PageHero
        eyebrow="Exhibit"
        title="Exhibitor Categories"
        description="India Battery International Show 2026 spans 16 sectors across the battery and energy-storage value chain."
        breadcrumbs={[{ label: "Exhibit", href: "/exhibit" }, { label: "Exhibitor Categories" }]}
          backgroundImage={{
          src: "https://batteryindiaexpo.com/wp-content/uploads/2023/05/nepal5p-34.jpg",
          alt: "Futurex branding at a previous edition of the show",
        }}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector) => (
              <div key={sector.slug} id={sector.slug} className="scroll-mt-28 rounded-xl border border-grey-light bg-white p-7 shadow-sm">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red/10 text-red">
                  <SectorIcon icon={sector.icon} className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="font-heading text-lg font-bold text-navy-dark">{sector.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-grey-medium">{sector.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap justify-center gap-4">
            <Button href="/exhibit/book-a-stand" size="lg">Book a Stand</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
