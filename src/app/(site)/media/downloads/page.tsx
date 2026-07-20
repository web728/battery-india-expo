import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { downloadCategories } from "@/lib/content/home-content";
import { Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Download Centre",
  description: "Download the event brochure for India Battery International Show 2026.",
  alternates: { canonical: "/media/downloads" },
};

export default function DownloadCentrePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Media", href: "/media" }, { label: "Download Centre", href: "/media/downloads" }]} />
      <PageHero
        eyebrow="Media"
        title="Download Centre"
        description="Event brochure and downloadable assets."
        breadcrumbs={[{ label: "Media", href: "/media" }, { label: "Download Centre" }]}
      />
      <section className="py-16 sm:py-20">
        <Container className="max-w-2xl">
          <div className="flex flex-col gap-5">
            {downloadCategories.map((item) => (
              <a
                key={item.title}
                href={item.href}
                download
                className="flex items-start gap-4 rounded-xl border border-grey-light bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <Download className="mt-0.5 h-6 w-6 shrink-0 text-red" aria-hidden="true" />
                <div>
                  <h3 className="font-heading text-sm font-bold text-navy-dark">{item.title}</h3>
                  <p className="mt-1 text-xs text-grey-medium">{item.description}</p>
                  <Badge tone="green" className="mt-2">{item.status}</Badge>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
