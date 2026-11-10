'use client';

import React from 'react';
import Link from 'next/link';
import { useTravelStore } from '@/lib/store';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { ArrowUpRight, Compass, Sparkles, MapPin, Calendar, Clock } from 'lucide-react';

export default function DestinationsOverviewPage() {
  const { destinations, packages, hotels } = useTravelStore();

  return (
    <div className="pt-28 pb-32 bg-[#07090E] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Destinations' }]} />

        {/* Page Hero */}
        <div className="max-w-3xl space-y-4 my-12">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C8A97E] font-mono">
            <Compass className="w-3.5 h-3.5" />
            <span>Launch Portfolio</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-white font-light tracking-tight leading-[1.08]">
            Five Curated Arabian Destinations
          </h1>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed font-light">
            From the untamed dramatic mountain gorges of Oman to the visionary overwater atolls of The Red Sea, explore the rich cultural tapestry, climate nuances, and exclusive retreats of each destination.
          </p>
        </div>

        {/* Five Destinations Deep Showcase Cards */}
        <div className="space-y-16">
          {destinations.map((dest, idx) => {
            const destPackages = packages.filter((p) => p.destinationSlug === dest.slug);
            const destHotels = hotels.filter((h) => h.destinationSlug === dest.slug);

            return (
              <div
                key={dest.id}
                className="rounded-3xl bg-[#0B0D12] border border-white/[0.06] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0 group hover:border-[#C8A97E]/30 transition-all duration-700"
              >
                {/* Visual Media Column */}
                <div className="lg:col-span-5 relative h-80 lg:h-auto min-h-[380px] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url(${dest.heroPosterUrl})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-transparent to-black/30" />
                  <div className="absolute top-6 left-6">
                    <span className="px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[9px] uppercase font-mono tracking-widest text-[#E5D1B8] border border-white/10">
                      Destination 0{idx + 1}
                    </span>
                  </div>
                </div>

                {/* Content Column */}
                <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest text-[#C8A97E] font-mono">
                        {dest.isRegionOf ? `Archipelago (${dest.isRegionOf})` : dest.country}
                      </span>
                      <div className="flex items-center gap-3 text-xs text-white/50 font-mono">
                        <span>{destPackages.length} Packages</span>
                        <span>•</span>
                        <span>{destHotels.length} Luxury Hotels</span>
                      </div>
                    </div>

                    <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium group-hover:text-[#DFC9AA] transition-colors">
                      {dest.name}
                    </h2>

                    <p className="text-[#DFC9AA] text-sm font-medium">
                      {dest.tagline}
                    </p>

                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-light">
                      {dest.description}
                    </p>

                    {/* Highlights Preview Pills */}
                    <div className="pt-2">
                      <div className="text-[10px] uppercase tracking-wider text-white/40 mb-2 font-mono">
                        Signature Highlights:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {dest.highlights.map((h, hIdx) => (
                          <span
                            key={hIdx}
                            className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-white/80"
                          >
                            {h.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Practical Bar & CTA */}
                  <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-xs text-white/60">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>Best: {dest.bestTimeToVisit.season}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>{dest.practicalInfo.timeZone}</span>
                      </div>
                    </div>

                    <Link
                      href={`/destinations/${dest.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C5A880] hover:bg-[#DFC9AA] text-black font-semibold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105"
                    >
                      <span>Explore {dest.name}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

