import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

export function BenefitSection({
  eyebrow,
  title,
  benefits,
  ctaLabel,
  ctaHref,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  benefits: { title: string; description: string }[];
  ctaLabel: string;
  ctaHref: string;
  tone?: "light" | "dark";
}) {
  return (
    <section className={tone === "dark" ? "bg-navy-dark py-20 sm:py-24" : "bg-white py-20 sm:py-24"}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} align="center" light={tone === "dark"} />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex gap-3.5">
              <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-green" aria-hidden="true" />
              <div>
                <h3 className={`font-heading text-base font-bold ${tone === "dark" ? "text-white" : "text-navy-dark"}`}>
                  {benefit.title}
                </h3>
                <p className={`mt-1.5 text-sm leading-relaxed ${tone === "dark" ? "text-white/70" : "text-grey-medium"}`}>
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Button href={ctaHref} variant={tone === "dark" ? "primary" : "secondary"} size="lg">
            {ctaLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
