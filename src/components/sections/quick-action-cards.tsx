import Link from "next/link";
import { ArrowRight, PackageSearch, Compass, Handshake } from "lucide-react";
import { Container } from "@/components/ui/container";

const cards = [
  {
    key: "exhibit",
    icon: PackageSearch,
    title: "Exhibit",
    description: "Launch products, meet qualified buyers and expand your business.",
    cta: "Explore Exhibiting",
    href: "/exhibit",
    accent: "border-t-red",
  },
  {
    key: "visit",
    icon: Compass,
    title: "Visit",
    description: "Discover technologies, suppliers, innovations and industry knowledge.",
    cta: "Plan Your Visit",
    href: "/visit",
    accent: "border-t-green",
  },
  {
    key: "partner",
    icon: Handshake,
    title: "Partner",
    description: "Increase your brand visibility through sponsorship and strategic collaboration.",
    cta: "View Partnerships",
    href: "/exhibit/sponsorship",
    accent: "border-t-navy",
  },
];

export function QuickActionCards() {
  return (
    <section className="relative z-20 -mt-14 sm:-mt-16">
      <Container>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.key}
              href={card.href}
              className={`group flex flex-col rounded-xl border-t-4 ${card.accent} bg-white p-7 shadow-xl transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-3 focus-visible:outline-red`}
            >
              <card.icon className="mb-4 h-9 w-9 text-red" aria-hidden="true" />
              <h3 className="font-heading text-xl font-bold text-navy-dark">{card.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-grey-medium">{card.description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-red">
                {card.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
