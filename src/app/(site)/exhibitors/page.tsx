import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { exhibitors } from "@/lib/content/exhibitors";
import { Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Exhibitor Directory",
  description: "Search the exhibitor directory for India Battery International Show 2026 by company, country, product category and more.",
  alternates: { canonical: "/exhibitors" },
};

const filterLabels = ["Company Name", "Country", "Product Category", "Battery Chemistry", "Application", "Hall", "Stand Number", "Startup", "New Product", "International Exhibitor"];

export default function ExhibitorsDirectoryPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Exhibitors", href: "/exhibitors" }]} />
      <PageHero
        eyebrow="Exhibitors"
        title="Exhibitor Directory"
        description="Search and filter confirmed exhibitors once bookings are announced."
        breadcrumbs={[{ label: "Exhibitors" }]}
          backgroundImage={{
          src: "https://batteryindiaexpo.com/wp-content/uploads/2023/05/nepal5p-34.jpg",
          alt: "Futurex branding at a previous edition of the show",
        }}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mb-10 rounded-xl border border-grey-light bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3 rounded-md border border-silver px-4 py-2.5 text-grey-medium">
              <Search className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm">Search will be available once exhibitors are confirmed</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {filterLabels.map((label) => (
                <span key={label} className="rounded-full bg-grey-light px-3 py-1.5 text-xs font-medium text-grey-medium">
                  {label}
                </span>
              ))}
            </div>
          </div>

          {exhibitors.length === 0 ? (
            <EmptyState
              title="Confirmed Exhibitor Directory Coming Soon"
              description="Exhibitor listings will appear here as bookings are confirmed and approved by the organizer."
              action={<Button href="/exhibit/book-a-stand">Book a Stand</Button>}
            />
          ) : null}
        </Container>
      </section>
    </>
  );
}
