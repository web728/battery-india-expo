import Image from "next/image";
import { MapPinned } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { whyPunePoints } from "@/lib/content/home-content";

export function WhyPuneSection() {
  return (
    <section className="relative overflow-hidden bg-navy-dark py-20 sm:py-28">
      {/* ambient accent glow */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-green/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-green/5 blur-3xl" />

      <Container className="relative">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          {/* Left column: heading + image composition */}
          <div>
            <SectionHeading
              eyebrow="Why Pune"
              title="A Strategic Host City for the Battery Industry"
              light
            />

            <div className="mt-6 flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green/15">
                <MapPinned className="h-5 w-5 text-green" aria-hidden="true" />
              </span>
              <p className="text-sm leading-snug text-white/70">
                Auto Cluster Exhibition Center, Chinchwad,
                <br className="hidden sm:block" /> Pimpri-Chinchwad, Pune, Maharashtra
              </p>
            </div>

            {/* Image composition — main + accent, offset for a layered premium feel */}
            <div className="relative mt-10 pb-8 pr-8 sm:pb-10 sm:pr-10">
              <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10">
                <Image
                  src="/images/expo-ev-powertrain-demo.jpg"
                  alt="An exhibitor demonstrating an EV powertrain to visitors at a previous edition"
                  width={2000}
                  height={1333}
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 35vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-transparent" />
              </div>

              {/* accent image, offset bottom-right for depth */}
              <div className="absolute bottom-0 right-0 h-28 w-40 overflow-hidden rounded-xl ring-4 ring-navy-dark sm:h-36 sm:w-52">
                <Image
                  src="https://info.batteryindiaexpo.com/wp-content/uploads/2023/05/nepal5p-10.jpg"
                  alt="Aerial view of the exhibition hall floor"
                  width={800}
                  height={533}
                  className="h-full w-full object-cover"
                  sizes="220px"
                />
              </div>
            </div>
          </div>

          {/* Right column: sequenced reason cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {whyPunePoints.map((point, index) => (
              <div
                key={point.title}
                className="group relative rounded-xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-green/30 hover:bg-white/[0.06]"
              >
                <span className="font-mono text-xs tracking-widest text-green/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-sm font-bold text-white">{point.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/60">
                  {point.description}
                </p>
                <div className="mt-4 h-px w-8 bg-green/40 transition-all duration-300 group-hover:w-14" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}