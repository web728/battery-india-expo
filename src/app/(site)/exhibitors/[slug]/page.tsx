import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { exhibitors } from "@/lib/content/exhibitors";

export function generateStaticParams() {
  return exhibitors.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exhibitor = exhibitors.find((e) => e.slug === slug);
  if (!exhibitor) return { title: "Exhibitor Profile" };
  return {
    title: exhibitor.companyName,
    description: exhibitor.shortDescription,
    alternates: { canonical: `/exhibitors/${slug}` },
  };
}

export default async function ExhibitorProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exhibitor = exhibitors.find((e) => e.slug === slug);

  if (!exhibitor) notFound();

  return (
    <>
      <PageHero
        eyebrow={exhibitor.country}
        title={exhibitor.companyName}
        description={exhibitor.shortDescription}
        breadcrumbs={[{ label: "Exhibitors", href: "/exhibitors" }, { label: exhibitor.companyName }]}
      />
      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <dl className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <dt className="font-semibold text-navy-dark">Categories</dt>
              <dd className="text-grey-medium">{exhibitor.categories.join(", ")}</dd>
            </div>
            <div>
              <dt className="font-semibold text-navy-dark">Stand Number</dt>
              <dd className="text-grey-medium">{exhibitor.standNumber ?? "To Be Announced"}</dd>
            </div>
          </dl>
        </Container>
      </section>
    </>
  );
}
