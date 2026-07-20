import { siteConfig } from "@/lib/site-config";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.organizer.name,
    url: siteConfig.siteUrl,
    event: siteConfig.eventName,
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function EventJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: siteConfig.eventName,
    startDate: siteConfig.dates.start,
    endDate: siteConfig.dates.end,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: siteConfig.venue.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.venue.city,
        addressRegion: siteConfig.venue.state,
        addressCountry: "IN",
        streetAddress: `${siteConfig.venue.line1}, ${siteConfig.venue.line2}`,
      },
    },
    organizer: {
      "@type": "Organization",
      name: siteConfig.organizer.name,
      url: siteConfig.siteUrl,
    },
    description: siteConfig.tagline,
    url: siteConfig.siteUrl,
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { label: string; href: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${siteConfig.siteUrl}${item.href}`,
    })),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function FaqJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
