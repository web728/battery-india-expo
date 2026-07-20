import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function EventOverview() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="About the Show"
          title="India's Premier Platform for Battery Technologies & Energy Storage"
          align="center"
        />
        <p className="mx-auto mt-6 max-w-4xl text-center text-lg leading-relaxed text-grey-medium">
          The India International Battery Expo is the country&apos;s premier platform dedicated to battery
          technologies and energy storage solutions. The exhibition brings together battery manufacturers,
          cell makers, pack integrators, component suppliers, and R&amp;D organizations to showcase
          innovations across electric mobility, renewable energy, and industrial applications. The show is
          designed to accelerate India&apos;s energy transition by promoting cutting-edge battery technologies,
          sustainable energy storage systems, and next-generation power solutions.
        </p>
      </Container>
    </section>
  );
}