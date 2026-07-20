import Image from "next/image";
import { Download, CalendarCheck, Ticket } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Countdown } from "@/components/sections/countdown";
import { siteConfig } from "@/lib/site-config";
import { TrackedLink } from "@/components/ui/tracked-link";
import { AnalyticsEvents } from "@/lib/analytics";

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-navy-dark pt-28 pb-16">
      <Image
        src="/images/expo-ev-battery-showcase.jpg"
        alt="Visitors examining an electric vehicle's battery compartment at a previous Battery India Expo edition"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[65%_center]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(100deg,#031224_20%,rgba(3,18,36,0.92)_42%,rgba(3,18,36,0.55)_65%,rgba(3,18,36,0.75)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(54,201,107,0.15),transparent_45%)]"
      />
      <Container className="relative z-10">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex items-center rounded-full border border-green/30 bg-green/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-green">
            {siteConfig.dates.display} · {siteConfig.venue.city}, {siteConfig.venue.state}
          </p>
          <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {siteConfig.eventName}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-white/85 sm:text-xl">
            {siteConfig.marketingLine}
          </p>
          <p className="mt-3 text-sm text-white/60">
            {siteConfig.venue.line1}, {siteConfig.venue.line2}, {siteConfig.venue.city}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <TrackedLink
              event={AnalyticsEvents.BOOK_STAND_CLICK}
              params={{ source: "hero" }}
              href="/exhibit/book-a-stand"
              className="inline-flex items-center gap-2 rounded-md bg-red px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-red-dark focus-visible:outline focus-visible:outline-3 focus-visible:outline-white"
            >
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              Book a Stand
            </TrackedLink>
            <TrackedLink
              event={AnalyticsEvents.REGISTER_VISIT_CLICK}
              params={{ source: "hero" }}
              href="/visit/register"
              className="inline-flex items-center gap-2 rounded-md border-2 border-white px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white hover:text-navy-dark focus-visible:outline focus-visible:outline-3 focus-visible:outline-white"
            >
              <Ticket className="h-5 w-5" aria-hidden="true" />
              Register to Visit
            </TrackedLink>
            <TrackedLink
              event={AnalyticsEvents.BROCHURE_DOWNLOAD}
              params={{ source: "hero" }}
              href="/downloads/BATTERY-BROCHURE.pdf"
              download
              className="inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-base font-semibold text-white/90 underline decoration-white/40 underline-offset-4 hover:text-white"
            >
              <Download className="h-5 w-5" aria-hidden="true" />
              Download Brochure
            </TrackedLink>
          </div>

          <div className="mt-10">
            <Countdown />
          </div>

          <p className="mt-8 text-sm text-white/60">
            Co-located with{" "}
            {siteConfig.coLocatedShows.map((show, i) => (
              <span key={show.slug}>
                <span className="font-medium text-white/80">{show.name}</span>
                {i < siteConfig.coLocatedShows.length - 1 ? " and " : ""}
              </span>
            ))}
          </p>
        </div>
      </Container>
    </section>
  );
}
