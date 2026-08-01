import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

// Array with image paths and website URLs
const supportedLogos = [
  { src: "/logo/logo-1.jpg", url: "https://www.araiindia.com/", name: "Partner 1" },
  { src: "/logo/logo-2.jpg", url: "https://fevaev.com/", name: "Partner 2" },
  { src: "/logo/logo-3.jpg", url: "https://smartemobility.org/", name: "Partner 3" },
  { src: "/logo/logo-4.jpg", url: "https://indiaesa.info/", name: "Partner 4" },
  { src: "/logo/logo-5.jpg",  name: "Partner 5" },
  { src: "/logo/logo-8.jpeg", url: "https://netraglobal.org/", name: "Partner 8" },
];

const mediaLogos = [
  { src: "/logo/logo-6.jpg", url: "https://www.auto-innovations.net/", name: "Media Partner 1" },
  { src: "/logo/logo-7.jpg", url: "https://induportals-media-publishing.com/", name: "Media Partner 2" },
];

export function CoLocatedShows() {
  return (
    <section className="bg-grey-light py-20 sm:py-24">
      <Container>
        {/* Main Heading */}
        <SectionHeading 
          eyebrow="Event Partners & Associations" 
          title="Our Powerful Ecosystem" 
          align="center" 
        />

        <div className="mt-16 flex flex-col gap-16">
          
          {/* =========================================================================
              1. CO-LOCATED WITH & ORGANISED BY
              ========================================================================= */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            
            {/* Co-Located With Section */}
            <div className="flex flex-col items-center rounded-2xl border border-navy/5 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md">
              <h3 className="mb-6 font-heading text-xs font-bold uppercase tracking-wider text-grey-medium">
                Co-Located With
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-8 mix-blend-multiply">
                {/* Logo 1: India EV */}
                <a 
                  href="https://iievshow.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative h-16 w-40 transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src="https://iievshow.com/wp-content/uploads/2022/06/India-EV-Logo.png"
                    alt="India EV Logo"
                    className="h-full w-full object-contain"
                  />
                </a>

                {/* Logo 2: Solar Expo */}
                <a 
                  href="https://indiasolarshow.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative h-16 w-40 transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src="/logo/solar-expo-logo.jpg" 
                    alt="Solar Expo Logo"
                    className="h-full w-full object-contain"
                  />
                </a>
              </div>
            </div>

            {/* Organised By Section */}
            <div className="flex flex-col items-center rounded-2xl border border-navy/5 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md">
              <h3 className="mb-6 font-heading text-xs font-bold uppercase tracking-wider text-grey-medium">
                Organised By
              </h3>
              <div className="flex items-center justify-center mix-blend-multiply">
                {/* Futurex Logo */}
                <a 
                  href="https://www.futurextrade.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative h-16 w-56 transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src="https://iievshow.com/wp-content/uploads/2025/11/Futurex-Logo-copy-1536x320-1.png"
                    alt="Futurex Logo"
                    className="h-full w-full object-contain"
                  />
                </a>
              </div>
            </div>

          </div>

          {/* =========================================================================
              2. SUPPORTED BY SECTION (6 Logos Premium Grid)
              ========================================================================= */}
          <div className="flex flex-col items-center rounded-2xl border border-navy/5 bg-white p-8 sm:p-10 shadow-sm">
            <h3 className="mb-8 font-heading text-xs font-bold uppercase tracking-wider text-grey-medium">
              Supported By
            </h3>
            
            <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6 mix-blend-multiply">
              {supportedLogos.map((item, index) => (
                <a 
                  key={index} 
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-24 items-center justify-center rounded-xl border border-grey-light/60 bg-white p-4 transition-all duration-300 hover:border-navy/30 hover:shadow-md hover:-translate-y-1"
                >
                  <img
                    src={item.src}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* =========================================================================
              3. OFFICIAL MEDIA PARTNERS SECTION (2 Logos Grid)
              ========================================================================= */}
          <div className="flex flex-col items-center rounded-2xl border border-navy/5 bg-white p-8 shadow-sm">
            <h3 className="mb-6 font-heading text-xs font-bold uppercase tracking-wider text-grey-medium">
              Official Media Partners
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-8 mix-blend-multiply">
              {mediaLogos.map((item, index) => (
                <a 
                  key={index} 
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-24 w-52 items-center justify-center rounded-xl border border-grey-light/60 bg-white p-5 transition-all duration-300 hover:border-navy/30 hover:shadow-md hover:-translate-y-1"
                >
                  <img
                    src={item.src}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain opacity-85 transition-opacity duration-300 hover:opacity-100"
                  />
                </a>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}