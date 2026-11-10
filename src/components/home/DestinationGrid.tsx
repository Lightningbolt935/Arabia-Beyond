'use client';

import React from 'react';
import Link from 'next/link';
import { useTravelStore } from '@/lib/store';
import { ArrowUpRight, Compass } from 'lucide-react';

export default function DestinationGrid() {
  const { destinations } = useTravelStore();

  const bentoMeta: Record<string, { span: string; height: string; num: string; badge: string; highlights: string[] }> = {
    'oman': {
      span: 'lg:col-span-7',
      height: 'h-[500px]',
      num: '01',
      badge: 'Sultanate of Ancient Canyons',
      highlights: ['2,000m Jabal Akhdar', 'Wahiba Sands Desert Camps', 'Musandam Fjords']
    },
    'the-red-sea': {
      span: 'lg:col-span-5',
      height: 'h-[500px]',
      num: '02',
      badge: 'Pristine Coral Archipelago',
      highlights: ['Overwater Villas', 'Private Seaplane Charters', 'Barrier Reef Diving']
    },
    'saudi-arabia': {
      span: 'lg:col-span-4',
      height: 'h-[460px]',
      num: '03',
      badge: 'Nabataean Antiquity',
      highlights: ['Hegra Tombs (AlUla)', 'Diriyah Mudbrick Palaces', 'Riyadh Modernity']
    },
    'bahrain': {
      span: 'lg:col-span-4',
      height: 'h-[460px]',
      num: '04',
      badge: 'Natural Pearling Kingdom',
      highlights: ['UNESCO Pearling Path', 'Jarada Sandbank Charters', 'Island Sanctuaries']
    },
    'qatar': {
      span: 'lg:col-span-4',
      height: 'h-[460px]',
      num: '05',
      badge: 'Islamic Arts & Inland Sea',
      highlights: ['Museum of Islamic Art', 'Khor Al Adaid Inland Sea', 'Katara Cultural Village']
    }
  };

  return (
    <section className="py-24 bg-[#07090E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>Five Sovereign Realms</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl text-white font-serif font-normal tracking-tight">
              Kingdoms of Ancient Grace
            </h2>
            <p className="text-white/70 text-base sm:text-lg font-light leading-relaxed">
              Every destination in our private portfolio is chosen for its untouched heritage, architectural splendor, and exclusive royal permissions.
            </p>
          </div>

          <Link
            href="/destinations"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#DFC9AA] hover:text-white transition-colors shrink-0"
          >
            <span>Explore All 5 Destinations</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {destinations.map((dest) => {
            const meta = bentoMeta[dest.slug] || {
              span: 'lg:col-span-4',
              height: 'h-[460px]',
              num: '00',
              badge: dest.country,
              highlights: [dest.tagline]
            };

            return (
              <Link
                key={dest.id}
                href={`/destinations/${dest.slug}`}
                className={`${meta.span} ${meta.height} group relative rounded-3xl overflow-hidden border border-black/[0.08] hover:border-[#B89358] transition-all duration-300 flex flex-col justify-between p-6 sm:p-9 shadow-sm hover:shadow-xl hover:-translate-y-1`}
              >
                {/* Full-bleed authentic photography */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${dest.heroPosterUrl})` }}
                />

                {/* Light Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 group-hover:from-black/85 transition-colors" />

                {/* Top Header Row */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#DFC9AA] drop-shadow-sm font-mono">
                      {meta.num}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.16em] px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/10 text-[#1D1D1F] font-semibold shadow-sm">
                      {meta.badge}
                    </span>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-black/10 flex items-center justify-center text-[#1D1D1F] group-hover:bg-[#B89358] group-hover:text-white transition-all duration-300 shadow-sm">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Bottom Content Area */}
                <div className="relative z-10 space-y-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase tracking-widest text-[#DFC9AA] font-semibold">
                      {dest.isRegionOf ? `Archipelago of ${dest.isRegionOf}` : dest.country}
                    </span>
                    <h3 className="text-2xl sm:text-4xl text-white font-bold tracking-[-0.025em] leading-[1.1] drop-shadow-sm">
                      {dest.name}
                    </h3>
                  </div>

                  <p className="text-white/90 text-xs sm:text-sm font-normal leading-relaxed line-clamp-2 max-w-lg drop-shadow-sm">
                    {dest.description}
                  </p>

                  {/* Highlights Pills */}
                  <div className="flex flex-wrap gap-2 pt-1.5">
                    {meta.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] text-white font-medium"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
