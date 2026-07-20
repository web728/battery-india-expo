import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectorIcon } from "@/components/ui/sector-icon";
import { sectors } from "@/lib/content/sectors";

export function SectorsGrid() {
  return (
    <section className="bg-grey-light py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Exhibition Sectors" title="What You Will Find on the Show Floor" align="center" />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((sector) => (
            <Link
              key={sector.slug}
              href={`/exhibit/categories#${sector.slug}`}
              className="group flex flex-col rounded-xl border border-transparent bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-red/30 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-red"
            >
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-red/10 text-red">
                <SectorIcon icon={sector.icon} className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="font-heading text-base font-bold text-navy-dark">{sector.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-grey-medium">{sector.description}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
