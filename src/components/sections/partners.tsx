'use client';

import React from 'react';
import Image from 'next/image';

interface PartnerItem {
  name: string;
  logo: string;
}

export default function Partners() {
  // Media partners list for infinite scrolling (14 logos)
  const mediaPartners: PartnerItem[] = [
    { name: 'Battery Magazine', logo: '/images/partners/battery-mag.png' },
    { name: 'Cosmo World', logo: '/images/partners/cosmo-world.png' },
    { name: 'Engineering Review', logo: '/images/partners/eng-review.png' },
    { name: 'Trade Fair Times', logo: '/images/partners/trade-fair.png' },
    { name: 'E-Volutions', logo: '/images/partners/evolutions.png' },
    { name: 'Media Partner 6', logo: '/images/partners/media-6.png' },
    { name: 'Media Partner 7', logo: '/images/partners/media-7.png' },
    { name: 'Media Partner 8', logo: '/images/partners/media-8.png' },
    { name: 'Media Partner 9', logo: '/images/partners/media-9.png' },
    { name: 'Media Partner 10', logo: '/images/partners/media-10.png' },
    { name: 'Media Partner 11', logo: '/images/partners/media-11.png' },
    { name: 'Media Partner 12', logo: '/images/partners/media-12.png' },
    { name: 'Media Partner 13', logo: '/images/partners/media-13.png' },
    { name: 'Media Partner 14', logo: '/images/partners/media-14.png' },
  ];

  return (
    <section className="w-full bg-white py-16 px-4 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* 1. ORGANISER */}
        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="text-xs md:text-sm font-semibold tracking-widest text-gray-700 uppercase mb-3">
            ORGANISER
          </h3>
          <div className="relative h-12 w-48">
            <Image 
              src="/images/partners/futurex.png" 
              alt="Futurex Organiser" 
              fill 
              className="object-contain"
            />
          </div>
        </div>

        {/* 2. SECOND ROW: 5 Partners */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 items-center text-center pt-4">
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-semibold text-gray-700 tracking-wider mb-3">CO-SPONSOR</span>
            <div className="relative h-10 w-32"><Image src="/images/partners/youhonk.png" alt="Co-Sponsor" fill className="object-contain" /></div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-semibold text-gray-700 tracking-wider mb-3">E-MOBILITY PARTNER</span>
            <div className="relative h-10 w-36"><Image src="/images/partners/garve.png" alt="E-Mobility Partner" fill className="object-contain" /></div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-semibold text-gray-700 tracking-wider mb-3">FOUR WHEELER PARTNER</span>
            <div className="relative h-10 w-28"><Image src="/images/partners/toyota.png" alt="Four Wheeler Partner" fill className="object-contain" /></div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-semibold text-gray-700 tracking-wider mb-3">TWO WHEELER PARTNER</span>
            <div className="relative h-10 w-28"><Image src="/images/partners/kinetic.png" alt="Two Wheeler Partner" fill className="object-contain" /></div>
          </div>
          <div className="flex flex-col items-center col-span-2 sm:col-span-1">
            <span className="text-[11px] font-semibold text-gray-700 tracking-wider mb-3">BATTERY PARTNER</span>
            <div className="relative h-10 w-28"><Image src="/images/partners/redon.png" alt="Battery Partner" fill className="object-contain" /></div>
          </div>
        </div>

        {/* 3. THIRD ROW: Institutional (3), Battery Testing (1), Supporting (2), Startup Ecosystem (1) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-6 border-t border-gray-100">
          <div className="flex flex-col items-center text-center">
            <span className="text-[11px] font-semibold text-gray-700 tracking-wider mb-3">INSTITUTIONAL PARTNER</span>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="relative h-10 w-16"><Image src="/images/partners/inst-1.png" alt="Inst 1" fill className="object-contain" /></div>
              <div className="relative h-10 w-16"><Image src="/images/partners/inst-2.png" alt="Inst 2" fill className="object-contain" /></div>
              <div className="relative h-10 w-16"><Image src="/images/partners/inst-3.png" alt="Inst 3" fill className="object-contain" /></div>
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="text-[11px] font-semibold text-gray-700 tracking-wider mb-3">BATTERY TESTING PARTNER</span>
            <div className="relative h-10 w-32"><Image src="/images/partners/binder.png" alt="Battery Testing Partner" fill className="object-contain" /></div>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="text-[11px] font-semibold text-gray-700 tracking-wider mb-3">SUPPORTING PARTNERS</span>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="relative h-10 w-20"><Image src="/images/partners/sup-1.png" alt="Supporting 1" fill className="object-contain" /></div>
              <div className="relative h-10 w-20"><Image src="/images/partners/sup-2.png" alt="Supporting 2" fill className="object-contain" /></div>
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="text-[11px] font-semibold text-gray-700 tracking-wider mb-3">STARTUP ECOSYSTEM PARTNER</span>
            <div className="relative h-10 w-28"><Image src="/images/partners/ihub.png" alt="Startup Ecosystem Partner" fill className="object-contain" /></div>
          </div>
        </div>

        {/* 4. FOURTH ROW: Strategy, Startup, Knowledge Partners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-gray-100">
          <div className="flex flex-col items-center text-center">
            <span className="text-[11px] font-semibold text-gray-700 tracking-wider mb-3">STRATEGY PARTNER</span>
            <div className="relative h-10 w-28"><Image src="/images/partners/theistic.png" alt="Strategy Partner" fill className="object-contain" /></div>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-[11px] font-semibold text-gray-700 tracking-wider mb-3">STARTUP PARTNER</span>
            <div className="relative h-10 w-28"><Image src="/images/partners/wespark.png" alt="Startup Partner" fill className="object-contain" /></div>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-[11px] font-semibold text-gray-700 tracking-wider mb-3">KNOWLEDGE PARTNERS</span>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="relative h-10 w-16"><Image src="/images/partners/know-1.png" alt="Knowledge 1" fill className="object-contain" /></div>
              <div className="relative h-10 w-16"><Image src="/images/partners/know-2.png" alt="Knowledge 2" fill className="object-contain" /></div>
              <div className="relative h-10 w-16"><Image src="/images/partners/know-3.png" alt="Knowledge 3" fill className="object-contain" /></div>
            </div>
          </div>
        </div>

        {/* Straight Divider Line */}
        <div className="w-full border-t border-gray-300 my-8"></div>

        {/* 5. SUPPORTING ASSOCIATIONS (9 logos: 5 in row 1, 4 in row 2) */}
        <div className="flex flex-col items-center text-center pt-2">
          <h3 className="text-xs md:text-sm font-semibold tracking-widest text-gray-700 uppercase mb-8">
            SUPPORTING ASSOCIATIONS
          </h3>
          <div className="w-full max-w-5xl space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center justify-center">
              <div className="relative h-12 w-28 mx-auto"><Image src="/images/partners/assoc-1.png" alt="Assoc 1" fill className="object-contain" /></div>
              <div className="relative h-12 w-28 mx-auto"><Image src="/images/partners/assoc-2.png" alt="Assoc 2" fill className="object-contain" /></div>
              <div className="relative h-12 w-28 mx-auto"><Image src="/images/partners/assoc-3.png" alt="Assoc 3" fill className="object-contain" /></div>
              <div className="relative h-12 w-28 mx-auto"><Image src="/images/partners/assoc-4.png" alt="Assoc 4" fill className="object-contain" /></div>
              <div className="relative h-12 w-28 mx-auto col-span-2 sm:col-span-1"><Image src="/images/partners/assoc-5.png" alt="Assoc 5" fill className="object-contain" /></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-center pt-2">
              <div className="relative h-12 w-28 mx-auto"><Image src="/images/partners/assoc-6.png" alt="Assoc 6" fill className="object-contain" /></div>
              <div className="relative h-12 w-28 mx-auto"><Image src="/images/partners/assoc-7.png" alt="Assoc 7" fill className="object-contain" /></div>
              <div className="relative h-12 w-28 mx-auto"><Image src="/images/partners/assoc-8.png" alt="Assoc 8" fill className="object-contain" /></div>
              <div className="relative h-12 w-28 mx-auto"><Image src="/images/partners/assoc-9.png" alt="Assoc 9" fill className="object-contain" /></div>
            </div>
          </div>
        </div>

        {/* Straight Divider Line */}
        <div className="w-full border-t border-gray-300 my-8"></div>

        {/* 6. OFFICIAL MEDIA PARTNERS (2 logos) */}
        <div className="flex flex-col items-center text-center pt-2">
          <h3 className="text-xs md:text-sm font-semibold tracking-widest text-gray-700 uppercase mb-6">
            OFFICIAL MEDIA PARTNERS
          </h3>
          <div className="flex flex-flex-wrap items-center justify-center gap-10">
            <div className="relative h-10 w-36"><Image src="/images/partners/off-media-1.png" alt="Official Media 1" fill className="object-contain" /></div>
            <div className="relative h-10 w-36"><Image src="/images/partners/off-media-2.png" alt="Official Media 2" fill className="object-contain" /></div>
          </div>
        </div>

        {/* Straight Divider Line */}
        <div className="w-full border-t border-gray-300 my-8"></div>

        {/* 7. MEDIA PARTNERS (Infinite Marquee) */}
        <div className="flex flex-col items-center text-center pt-2 overflow-hidden">
          <h3 className="text-xs md:text-sm font-semibold tracking-widest text-gray-700 uppercase mb-8">
            MEDIA PARTNERS
          </h3>
          
          <div className="w-full overflow-hidden relative flex items-center">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <div className="animate-marquee gap-12 items-center py-2">
              {[...mediaPartners, ...mediaPartners].map((partner, index) => (
                <div key={index} className="flex items-center justify-center min-w-[150px] h-12 relative grayscale hover:grayscale-0 transition-all">
                  <span className="text-sm font-medium text-gray-500">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}