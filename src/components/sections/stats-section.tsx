import { Container } from "@/components/ui/container";
import { statCards } from "@/lib/content/stats";

export function StatsSection() {
  return (
    <section className="bg-navy-dark py-16">
      <Container>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {statCards.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-xl font-bold text-green sm:text-2xl">{stat.value}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-white/60 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
