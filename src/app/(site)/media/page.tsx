import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { Images, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Media Centre",
  description: "Photo gallery and downloads for India Battery International Show 2026.",
  alternates: { canonical: "/media" },
};

const links = [
  { icon: Images, title: "Photo Gallery", href: "/media/gallery" },
  { icon: Download, title: "Download Centre", href: "/media/downloads" },
];

export default function MediaCentrePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Media", href: "/media" }]} />
      <PageHero
        eyebrow="Media"
        title="Media Centre"
        description="Photo gallery and downloads for journalists and media partners."
        breadcrumbs={[{ label: "Media" }]}
        
      />
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="flex flex-col items-start rounded-xl border border-grey-light bg-white p-7 shadow-sm hover:shadow-md">
                <link.icon className="mb-4 h-8 w-8 text-red" aria-hidden="true" />
                <h3 className="font-heading text-base font-bold text-navy-dark">{link.title}</h3>
              </a>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button href="/contact">Contact Media Team</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
