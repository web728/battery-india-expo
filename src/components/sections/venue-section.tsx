import Image from "next/image";
import { MapPin, Navigation, Car, Accessibility } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function VenueSection() {
  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.venue.mapQuery)}&output=embed`;

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Venue" title={siteConfig.venue.name} align="center" />
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-xl border border-grey-light">
              <iframe
                title="Map showing the Auto Cluster Exhibition Center, Pune"
                src={mapEmbedSrc}
                className="h-56 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="overflow-hidden rounded-xl">
              <Image
                src="/images/expo-charging-station-crowd.jpg"
                alt="Visitors gathered around an EV charging station display at a previous edition"
                width={2000}
                height={1333}
                className="h-40 w-full object-cover sm:h-48"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-5">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-red" aria-hidden="true" />
              <p className="text-sm text-grey-medium">{siteConfig.venue.full}</p>
            </div>
            <div className="flex items-start gap-3">
              <Car className="mt-0.5 h-5 w-5 shrink-0 text-red" aria-hidden="true" />
              <p className="text-sm text-grey-medium">Parking Information — Subject to Confirmation</p>
            </div>
            <div className="flex items-start gap-3">
              <Accessibility className="mt-0.5 h-5 w-5 shrink-0 text-red" aria-hidden="true" />
              <p className="text-sm text-grey-medium">Accessibility Information — Subject to Confirmation</p>
            </div>
            <div className="mt-2 flex flex-wrap gap-4">
              <Button
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteConfig.venue.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                <Navigation className="h-4 w-4" aria-hidden="true" /> Get Directions
              </Button>
              <Button href="/visit/register" variant="outline">
                Plan Your Visit
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
