import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { visitorProfile } from "@/lib/content/exhibitor-categories";

export const metadata: Metadata = {
  title: "Visitor Profile",
  description: "Who attends India Battery International Show 2026 — automotive OEMs, energy companies, researchers, investors, regulators and more.",
  alternates: { canonical: "/visit/visitor-profile" },
};

export default function VisitorProfilePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Visit", href: "/visit" }, { label: "Visitor Profile", href: "/visit/visitor-profile" }]} />
      <PageHero
        eyebrow="Visit"
        title="Visitor Profile"
        description="India Battery International Show 2026 is designed for a focused industry audience across the battery, energy-storage and e-mobility value chain."
        breadcrumbs={[{ label: "Visit", href: "/visit" }, { label: "Visitor Profile" }]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visitorProfile.map((item) => (
              <div key={item.name} className="rounded-xl border border-grey-light bg-white p-6 shadow-sm">
                <h3 className="font-heading text-sm font-bold text-navy-dark">{item.name}</h3>
                <p className="mt-2 text-sm text-grey-medium">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Button href="/visit/register" size="lg">Register to Visit</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
