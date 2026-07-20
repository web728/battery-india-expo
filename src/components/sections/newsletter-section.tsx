import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { NewsletterForm } from "@/components/forms/newsletter-form";

export function NewsletterSection() {
  return (
    <section className="bg-navy-dark py-20 sm:py-24">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <SectionHeading
            eyebrow="Newsletter"
            title="Stay Informed"
            description="Receive exhibitor announcements, conference updates and registration information."
            align="center"
            light
          />
          <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6 text-left sm:p-8">
            <NewsletterForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
