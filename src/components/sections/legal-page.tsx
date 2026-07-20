import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import type { ReactNode } from "react";

export function LegalPage({
  title,
  breadcrumbLabel,
  href,
  lastUpdated,
  children,
}: {
  title: string;
  breadcrumbLabel: string;
  href: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        breadcrumbs={[{ label: breadcrumbLabel, href }]}
        actions={<Badge tone="neutral">Draft for Legal Review</Badge>}
      />
      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <p className="mb-8 text-xs font-medium uppercase tracking-wide text-grey-medium">Last Updated: {lastUpdated}</p>
          <div className="flex flex-col gap-6 text-sm leading-relaxed text-grey-medium [&_h2]:mt-4 [&_h2]:font-heading [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-navy-dark [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5">
            {children}
          </div>
        </Container>
      </section>
    </>
  );
}
