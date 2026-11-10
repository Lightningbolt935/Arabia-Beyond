'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTravelStore } from '@/lib/store';
import PackageCard from '@/components/packages/PackageCard';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function FeaturedPackages() {
  const { packages, destinations } = useTravelStore();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredPackages = packages.filter((pkg) => {
    if (pkg.status !== 'live' && pkg.status !== 'demo') return false;
    if (selectedFilter === 'all') return true;
    return pkg.destinationSlug === selectedFilter;
  });

  return (
    <section className="py-24 bg-[#0B0E14] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signature Itineraries</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl text-white font-serif font-normal tracking-tight">
              Curated Package Holidays
            </h2>
            <p className="text-white/70 text-base sm:text-lg font-light leading-relaxed">
              Multi-day private journeys seamlessly combining certified local storytellers, palace sanctuaries, and sovereign VIP airside protocol across the Peninsula.
            </p>
          </div>

          <Link
            href="/packages"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#DFC9AA] hover:text-white transition-colors shrink-0"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Filter Segmented Bar */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/60 border border-white/10 w-fit max-w-full overflow-x-auto scrollbar-none mb-12 shadow-xl">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-5 py-2 rounded-full text-xs transition-all duration-200 shrink-0 ${
              selectedFilter === 'all'
                ? 'bg-[#C5A880] text-black font-semibold shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            All Realms ({packages.length})
          </button>
          {destinations.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedFilter(d.slug)}
              className={`px-5 py-2 rounded-full text-xs transition-all duration-200 shrink-0 ${
                selectedFilter === d.slug
                  ? 'bg-[#C5A880] text-black font-semibold shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {d.name}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.slice(0, 6).map((pkg) => (
            <PackageCard key={pkg.id} packageItem={pkg} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/packages"
            className="apple-btn-white inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold"
          >
            <span>Browse Full Catalog of Arabian Itineraries</span>
            <ArrowRight className="w-4 h-4 text-[#B89358]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
