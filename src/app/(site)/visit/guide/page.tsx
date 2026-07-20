import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { CalendarDays, Ticket, MapPin, Plane, Shirt, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Visitor Guide",
  description: "Practical guidance for planning your visit to India Battery International Show 2026 — dates, registration, venue and travel.",
  alternates: { canonical: "/visit/guide" },
};

const guideItems = [
  { icon: CalendarDays, title: "When to Visit", description: "The show runs 2–4 October 2026. Full daily timings will be confirmed closer to the event." },
  { icon: Ticket, title: "Registration", description: "Pre-register online to receive your digital pass and avoid queues at the venue." },
  { icon: MapPin, title: "Getting to the Venue", description: "The Auto Cluster Exhibition Center is located in Chinchwad, Pimpri-Chinchwad, Pune. See Travel Information for directions." },
  { icon: Plane, title: "International Visitors", description: "Visa, travel and logistics guidance for international visitors is available on the International Visitor Information page." },
  { icon: Shirt, title: "What to Bring", description: "Business attire is recommended. Bring your registration confirmation or digital pass for quick entry." },
  { icon: HelpCircle, title: "Need Help?", description: "Contact our visitor team through the Contact page for any questions before or during the show." },
];

export default function VisitorGuidePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Visit", href: "/visit" }, { label: "Visitor Guide", href: "/visit/guide" }]} />
      <PageHero
        eyebrow="Visit"
        title="Visitor Guide"
        description="Everything you need to plan your visit to India Battery International Show 2026."
        breadcrumbs={[{ label: "Visit", href: "/visit" }, { label: "Visitor Guide" }]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading title="Planning Your Visit" align="center" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guideItems.map((item) => (
              <div key={item.title} className="rounded-xl border border-grey-light bg-white p-6 shadow-sm">
                <item.icon className="mb-3 h-7 w-7 text-red" aria-hidden="true" />
                <h3 className="font-heading text-base font-bold text-navy-dark">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-grey-medium">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button href="/visit/register" size="lg">Register to Visit</Button>
            <Button href="/venue/travel" variant="outline" size="lg">Travel Information</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
