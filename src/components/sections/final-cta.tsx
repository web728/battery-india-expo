import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="bg-red py-16 sm:py-20">
      <Container className="text-center">
        <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
          Be Part of India&apos;s Battery and Energy Storage Business Platform
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/exhibit/book-a-stand" variant="secondary" size="lg">
            Book a Stand
          </Button>
          <Button href="/visit/register" variant="outline-white" size="lg">
            Register to Visit
          </Button>
          <Button href="/exhibit/sponsorship" variant="outline-white" size="lg">
            Become a Sponsor
          </Button>
        </div>
      </Container>
    </section>
  );
}
