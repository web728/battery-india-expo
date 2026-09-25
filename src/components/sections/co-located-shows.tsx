import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

// 1. Masma Pavilion & Category Partners (Top Row: Exactly 5 items)
const topRowPartners = {
  masmaPavilion: [{ src: "/partners/masma.webp", url: "https://www.youhonk.com/", name: "MASMA Pavilion", imgClassName: "max-h-13" }],
  coSponsor: [{ src: "/partners/youhonk.png", url: "https://www.youhonk.com/", name: "Co-Sponsor", imgClassName: "max-h-13" }],
  eMobility: [{ src: "/partners/garve-hyundai.png", url: "https://garve.hyundaimotor.in/", name: "E-Mobility Partner", imgClassName: "max-h-12" }],
  fourWheeler: [{ src: "/partners/toyota.png", url: "https://www.toyotabharat.com/", name: "Four Wheeler Partner", imgClassName: "max-h-10" }],
  twoWheeler: [{ src: "/partners/kinet.jpeg", url: "https://kineticev.in/", name: "Two Wheeler Partner", imgClassName: "max-h-10" }],
};

// 2. Remaining Category Partners (Second Row onwards)
const remainingCategoryPartners = {
  battery: [{ src: "/partners/Redon-logo-2.png", url: "https://iievshow.com/", name: "Battery Partner", imgClassName: "max-h-10" }],
};

// 3. Institutional, Testing, Supporting, Startup Ecosystem Data
const secondaryPartners = {
  institutional: [
    { src: "/partners/institutional.png", url: "https://www.asrtu.org/", name: "Institutional Partner 1", imgClassName: "max-h-10" },
    { src: "/partners/RVSF_logo_new.webp", url: "https://rvsfindia.in/", name: "Institutional Partner 2", imgClassName: "max-h-10" },
  ],
  batteryTesting: [
    { src: "/partners/Bind.jpg", url: "https://www.binder-world.com/int-en", name: "Battery Testing Partner", imgClassName: "max-h-10" },
  ],
  supporting: [
    { src: "/partners/supporting.png", url: "#", name: "Supporting Partner 1", imgClassName: "max-h-10" },
    { src: "/partners/bis-logo.png", url: "#", name: "Supporting Partner 2", imgClassName: "max-h-10" },
  ],
  startupEcosystem: [
    { src: "/partners/hub.png", url: "https://ihubgujarat.in/", name: "Startup Ecosystem Partner", imgClassName: "max-h-10" },
  ],
};

// 4. Strategy, Startup, Knowledge Partners
const tierThreePartners = {
  strategy: [{ src: "/partners/Theistic.png", url: "https://theistic.in/", name: "Strategy Partner", imgClassName: "max-h-10" }],
  startup: [{ src: "/partners/Wespark.png", url: "https://wespark.org.in/", name: "Startup Partner", imgClassName: "max-h-12" }],
  knowledge: [
    { src: "/partners/ifeva.png", url: "https://fevaev.com/", name: "Knowledge Partner 1", imgClassName: "max-h-12" },
    { src: "/partners/knowledge-part.png", url: "#", name: "Knowledge Partner 2", imgClassName: "max-h-12" },
    { src: "/partners/fronst-sullivan-1.png", url: "#", name: "Knowledge Partner 3", imgClassName: "max-h-12" },
  ],
};

// 5. Supporting Associations
const supportingAssociations = [
  { src: "/partners/logo-1.jpg", url: "https://www.araiindia.com/", name: "Association 1", imgClassName: "max-h-11" },
  { src: "/partners/ace.png", url: "https://iievshow.com/#", name: "Association 2", imgClassName: "max-h-11" },
  { src: "/partners/logo-4.jpg", url: "https://indiaesa.info/", name: "Association 3", imgClassName: "max-h-11" },
  { src: "/partners/logo-3.jpg", url: "https://smartemobility.org/", name: "Association 4", imgClassName: "max-h-15" },
  { src: "/partners/aisia.png", url: "https://aisia.org.in/", name: "Association 5", imgClassName: "max-h-11" },
  { src: "/partners/rsa.png", url: "#", name: "Association 6", imgClassName: "max-h-13" },
  { src: "/partners/NETRA.jpeg", url: "https://netraglobal.org/", name: "Association 7", imgClassName: "max-h-11" },
  { src: "/partners/ibsa.png", url: "https://ibsa.org.in/", name: "Association 8", imgClassName: "max-h-11" },
  { src: "/partners/logo-5.jpg", url: "#", name: "Association 9", imgClassName: "max-h-11" },
];

// 6. Official Media Partners
const officialMediaLogos = [
  { src: "/partners/logo-6.jpg", url: "https://www.auto-innovations.net/", name: "Official Media Partner 1", imgClassName: "max-h-12" },
  { src: "/partners/logo-7.jpg", url: "https://induportals-media-publishing.com/", name: "Official Media Partner 2", imgClassName: "max-h-12" },
];

// 7. Media Partners (Infinite Scroll)
const infiniteMediaLogos = [
  { src: "/partners/urja-daily.png", url: "#", name: "Media 1", imgClassName: "max-h-12" },
  { src: "/partners/electronics-era.png", url: "#", name: "Media 2", imgClassName: "max-h-12" },
  { src: "/partners/ev-mechanica.png", url: "#", name: "Media 3", imgClassName: "max-h-12" },
  { src: "/partners/battery-magazine.png", url: "#", name: "Media 4", imgClassName: "max-h-12" },
  { src: "/partners/cosmoworld.png", url: "#", name: "Media 5", imgClassName: "max-h-12" },
  { src: "/partners/engineer.png", url: "#", name: "Media 6", imgClassName: "max-h-8" },
  { src: "/partners/trade-fair-times.png", url: "#", name: "Media 7", imgClassName: "max-h-12" },
  { src: "/partners/evolution.png", url: "#", name: "Media 8", imgClassName: "max-h-12" },
  { src: "/partners/99-media-group.png", url: "#", name: "Media 9", imgClassName: "max-h-12" },
  { src: "/partners/ev-tech-news.png", url: "#", name: "Media 10", imgClassName: "max-h-12" },
  { src: "/partners/er-city.png", url: "#", name: "Media 11", imgClassName: "max-h-12" },
  { src: "/partners/auto-ev-times.png", url: "#", name: "Media 12", imgClassName: "max-h-12" },
  { src: "/partners/smart-energy.png", url: "#", name: "Media 13", imgClassName: "max-h-12" },
];

export function CoLocatedShows() {
  return (
    <section className="bg-grey-light py-20 sm:py-24 overflow-hidden">
      <Container>
        {/* Main Heading */}
        <SectionHeading 
          eyebrow="Event Partners & Associations" 
          title="Our Powerful Ecosystem" 
          align="center" 
        />

        <div className="mt-16 flex flex-col gap-16">
          
          {/* =========================================================================
              1. FIRST ROW: CO-LOCATED WITH & ORGANISED BY
              ========================================================================= */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            
            {/* Co-Located With Section */}
            <div className="flex flex-col items-center rounded-2xl border border-navy/5 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md">
              <h3 className="mb-6 font-heading text-xs font-bold uppercase tracking-wider text-grey-medium">
                Co-Located With
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-8 mix-blend-multiply">
                <a 
                  href="https://iievshow.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative flex h-20 w-44 items-center justify-center p-2 transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src="https://iievshow.com/wp-content/uploads/2022/06/India-EV-Logo.png"
                    alt="India International EV Logo"
                    className="max-h-15 max-w-full object-contain"
                  />
                </a>
                <a 
                  href="https://indiasolarshow.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative flex h-20 w-44 items-center justify-center p-2 transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src="/partners/solar-expo-logo.jpg" 
                    alt="Solar Expo Logo"
                    className="max-h-12 max-w-full object-contain"
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
                <a 
                  href="https://www.futurextrade.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative flex h-20 w-56 items-center justify-center p-2 transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src="https://iievshow.com/wp-content/uploads/2025/11/Futurex-Logo-copy-1536x320-1.png"
                    alt="Futurex Logo"
                    className="max-h-12 max-w-full object-contain"
                  />
                </a>
              </div>
            </div>

          </div>

          {/* =========================================================================
              2. SECOND ROW: MASMA Pavilion + Top 5 Category Partners
              ========================================================================= */}
          <div className="rounded-2xl border border-navy/5 bg-white p-8 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mix-blend-multiply">
              {Object.entries(topRowPartners).map(([key, partners], index) => (
                <div key={index} className="flex flex-col items-center">
                  <h3 className="mb-4 font-heading text-xs font-bold uppercase tracking-wider text-grey-medium text-center">
                    {partners[0].name}
                  </h3>
                  {partners.map((item, idx) => (
                    <a key={idx} href={item.url} className="flex h-24 w-full items-center justify-center rounded-xl border border-grey-light/60 p-4 transition-all hover:shadow-md hover:-translate-y-1 bg-white">
                      <img src={item.src} alt={item.name} className={`${item.imgClassName || "max-h-10"} max-w-full object-contain`} />
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* =========================================================================
              3. THIRD ROW: Institutional, Battery Testing, Supporting, Startup Ecosystem, Battery Partner
              ========================================================================= */}
          <div className="rounded-2xl border border-navy/5 bg-white p-8 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mix-blend-multiply">

           


              
              {/* Battery Partner */}
              <div className="flex flex-col items-center">
                <h3 className="mb-4 font-heading text-xs font-bold uppercase tracking-wider text-grey-medium text-center">
                  Battery Partner
                </h3>
                {remainingCategoryPartners.battery.map((item, idx) => (
                  <a key={idx} href={item.url} className="flex h-24 w-full items-center justify-center rounded-xl border border-grey-light/60 p-4 transition-all hover:shadow-md hover:-translate-y-1 bg-white">
                    <img src={item.src} alt={item.name} className={`${item.imgClassName || "max-h-10"} max-w-full object-contain`} />
                  </a>
                ))}
              </div>

                  {/* Institutional Partner (2 Logos Row) */}
              <div className="flex flex-col items-center">
                <h3 className="mb-4 font-heading text-xs font-bold uppercase tracking-wider text-grey-medium text-center">
                  Institutional Partners
                </h3>
                <div className="flex flex-row gap-2 w-full justify-center">
                  {secondaryPartners.institutional.map((item, idx) => (
                    <a key={idx} href={item.url} className="flex h-24 flex-1 items-center justify-center rounded-xl border border-grey-light/60 p-2 transition-all hover:shadow-sm bg-white">
                      <img src={item.src} alt={item.name} className={`${item.imgClassName || "max-h-10"} max-w-full object-contain`} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Battery Testing Partner */}
              <div className="flex flex-col items-center">
                <h3 className="mb-4 font-heading text-xs font-bold uppercase tracking-wider text-grey-medium text-center">
                  Battery Testing Partner
                </h3>
                {secondaryPartners.batteryTesting.map((item, idx) => (
                  <a key={idx} href={item.url} className="flex h-24 w-full items-center justify-center rounded-xl border border-grey-light/60 p-4 transition-all hover:shadow-md hover:-translate-y-1 bg-white">
                    <img src={item.src} alt={item.name} className={`${item.imgClassName || "max-h-10"} max-w-full object-contain`} />
                  </a>
                ))}
              </div>


             

              {/* Supporting Partners (2 Logos Row) */}
              <div className="flex flex-col items-center">
                <h3 className="mb-4 font-heading text-xs font-bold uppercase tracking-wider text-grey-medium text-center">
                  Supporting Partners
                </h3>
                <div className="flex flex-row gap-3 w-full justify-center">
                  {secondaryPartners.supporting.map((item, idx) => (
                    <a key={idx} href={item.url} className="flex h-24 flex-1 items-center justify-center rounded-xl border border-grey-light/60 p-3 transition-all hover:shadow-sm bg-white">
                      <img src={item.src} alt={item.name} className={`${item.imgClassName || "max-h-10"} max-w-full object-contain`} />
                    </a>
                  ))}
                </div>
              </div>

              
              {/* Startup Ecosystem Partner */}
              <div className="flex flex-col items-center">
                <h3 className="mb-4 font-heading text-xs font-bold uppercase tracking-wider text-grey-medium text-center">
                  Startup Ecosystem Partner
                </h3>
                {secondaryPartners.startupEcosystem.map((item, idx) => (
                  <a key={idx} href={item.url} className="flex h-24 w-full items-center justify-center rounded-xl border border-grey-light/60 p-4 transition-all hover:shadow-md hover:-translate-y-1 bg-white">
                    <img src={item.src} alt={item.name} className={`${item.imgClassName || "max-h-10"} max-w-full object-contain`} />
                  </a>
                ))}
              </div>

            </div>
          </div>

          {/* =========================================================================
              4. FOURTH ROW: Strategy, Startup, Knowledge Partners
              ========================================================================= */}
          <div className="rounded-2xl border border-navy/5 bg-white p-8 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mix-blend-multiply">
              
              {/* Strategy Partner */}
              <div className="flex flex-col items-center">
                <h3 className="mb-4 font-heading text-xs font-bold uppercase tracking-wider text-grey-medium text-center">
                  Strategy Partner
                </h3>
                {tierThreePartners.strategy.map((item, idx) => (
                  <a key={idx} href={item.url} className="flex h-24 w-full items-center justify-center rounded-xl border border-grey-light/60 p-4 transition-all hover:shadow-md hover:-translate-y-1 bg-white">
                    <img src={item.src} alt={item.name} className={`${item.imgClassName || "max-h-10"} max-w-full object-contain`} />
                  </a>
                ))}
              </div>

              {/* Startup Partner */}
              <div className="flex flex-col items-center">
                <h3 className="mb-4 font-heading text-xs font-bold uppercase tracking-wider text-grey-medium text-center">
                  Startup Partner
                </h3>
                {tierThreePartners.startup.map((item, idx) => (
                  <a key={idx} href={item.url} className="flex h-24 w-full items-center justify-center rounded-xl border border-grey-light/60 p-4 transition-all hover:shadow-md hover:-translate-y-1 bg-white">
                    <img src={item.src} alt={item.name} className={`${item.imgClassName || "max-h-10"} max-w-full object-contain`} />
                  </a>
                ))}
              </div>

              {/* Knowledge Partners (Spans 2 columns) */}
              <div className="flex flex-col items-center sm:col-span-2 lg:col-span-2">
                <h3 className="mb-4 font-heading text-xs font-bold uppercase tracking-wider text-grey-medium text-center">
                  Knowledge Partners
                </h3>
                <div className="grid grid-cols-3 gap-3 w-full">
                  {tierThreePartners.knowledge.map((item, idx) => (
                    <a key={idx} href={item.url} className="flex h-24 w-full items-center justify-center rounded-xl border border-grey-light/60 p-2 transition-all hover:shadow-sm bg-white">
                      <img src={item.src} alt={item.name} className={`${item.imgClassName || "max-h-10"} max-w-full object-contain`} />
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>

          <hr className="border-t border-navy/10 my-2" />

          {/* =========================================================================
              5. SUPPORTING ASSOCIATIONS
              ========================================================================= */}
          <div className="flex flex-col items-center rounded-2xl border border-navy/5 bg-white p-8 sm:p-10 shadow-sm">
            <h3 className="mb-8 font-heading text-xs font-bold uppercase tracking-wider text-grey-medium">
              Supporting Associations
            </h3>
            
            <div className="w-full flex flex-col gap-6 mix-blend-multiply">
              {/* Top Row (5 Logos) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                {supportingAssociations.slice(0, 5).map((item, index) => (
                  <a 
                    key={index} 
                    href={item.url}
                    className="flex h-24 items-center justify-center rounded-xl border border-grey-light/60 bg-white p-4 transition-all duration-300 hover:border-navy/30 hover:shadow-md hover:-translate-y-1"
                  >
                    <img src={item.src} alt={item.name} className={`${item.imgClassName || "max-h-10"} max-w-full object-contain opacity-80 hover:opacity-100`} />
                  </a>
                ))}
              </div>

              {/* Bottom Row (4 Logos) */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto w-full">
                {supportingAssociations.slice(5, 9).map((item, index) => (
                  <a 
                    key={index} 
                    href={item.url}
                    className="flex h-24 items-center justify-center rounded-xl border border-grey-light/60 bg-white p-4 transition-all duration-300 hover:border-navy/30 hover:shadow-md hover:-translate-y-1"
                  >
                    <img src={item.src} alt={item.name} className={`${item.imgClassName || "max-h-10"} max-w-full object-contain opacity-80 hover:opacity-100`} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <hr className="border-t border-navy/10 my-2" />

          {/* =========================================================================
              6. OFFICIAL MEDIA PARTNERS
              ========================================================================= */}
          <div className="flex flex-col items-center rounded-2xl border border-navy/5 bg-white p-8 shadow-sm">
            <h3 className="mb-6 font-heading text-xs font-bold uppercase tracking-wider text-grey-medium">
              Official Media Partners
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-8 mix-blend-multiply">
              {officialMediaLogos.map((item, index) => (
                <a 
                  key={index} 
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-24 w-52 items-center justify-center rounded-xl border border-grey-light/60 bg-white p-5 transition-all duration-300 hover:border-navy/30 hover:shadow-md hover:-translate-y-1"
                >
                  <img src={item.src} alt={item.name} className={`${item.imgClassName || "max-h-10"} max-w-full object-contain opacity-85 hover:opacity-100`} />
                </a>
              ))}
            </div>
          </div>

          <hr className="border-t border-navy/10 my-2" />

          {/* =========================================================================
              7. MEDIA PARTNERS (Infinite Scroll)
              ========================================================================= */}
          <div className="flex flex-col items-center rounded-2xl border border-navy/5 bg-white py-8 shadow-sm overflow-hidden">
            <h3 className="mb-8 font-heading text-xs font-bold uppercase tracking-wider text-grey-medium text-center">
              Media Partners
            </h3>
            
            <div className="relative w-full overflow-hidden whitespace-nowrap">
              <div className="inline-flex animate-infinite-scroll gap-6 items-center mix-blend-multiply py-2">
                {[...infiniteMediaLogos, ...infiniteMediaLogos].map((item, index) => (
                  <a 
                    key={index} 
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-24 w-48 flex-shrink-0 items-center justify-center rounded-xl border border-grey-light/60 bg-white p-4 transition-all duration-300 hover:border-navy/30 hover:shadow-sm"
                  >
                    <img src={item.src} alt={item.name} className={`${item.imgClassName || "max-h-10"} max-w-full object-contain opacity-85 hover:opacity-100`} />
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}