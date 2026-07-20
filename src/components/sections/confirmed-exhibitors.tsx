import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { exhibitors } from "@/lib/content/exhibitors";

export function ConfirmedExhibitorsStrip() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Exhibitors" title="Confirmed Exhibitors" align="center" />
        <div className="mt-10 rounded-xl border border-dashed border-silver bg-grey-light py-14 text-center">
          {exhibitors.length === 0 ? (
            <p className="text-lg font-semibold text-grey-medium">Confirmed Exhibitors Will Be Announced Soon</p>
          ) : null}
        </div>
        <div className="mt-8 flex justify-center">
          <Button href="/exhibitors" variant="secondary">
            View Exhibitor Directory
          </Button>
        </div>
      </Container>
    </section>
  );
}
