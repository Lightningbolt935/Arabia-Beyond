'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTravelStore } from '@/lib/store';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import HotelCard from '@/components/hotels/HotelCard';
import { Building2, Search, X, Compass, RotateCcw } from 'lucide-react';

function HotelsContent() {
  const searchParams = useSearchParams();
  const { hotels, destinations } = useTravelStore();

  const initialDestination = searchParams?.get('destination') || 'all';
  const initialSearch = searchParams?.get('q') || '';

  const [destinationFilter, setDestinationFilter] = useState(initialDestination);
  const [tierFilter, setTierFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const tiers = ['all', 'Ultra Luxury', 'Private Island Sanctuary', 'Desert Oasis', 'Heritage Boutique'];

  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      if (!hotel.active) return false;

      if (destinationFilter !== 'all' && hotel.destinationSlug !== destinationFilter) {
        return false;
      }

      if (tierFilter !== 'all' && hotel.verifiedLuxuryTier !== tierFilter) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = hotel.name.toLowerCase().includes(q);
        const matchCity = hotel.city.toLowerCase().includes(q);
        const matchDest = hotel.destinationName.toLowerCase().includes(q);
        if (!matchName && !matchCity && !matchDest) return false;
      }

      return true;
    });
  }, [hotels, destinationFilter, tierFilter, searchQuery]);

  return (
    <div className="pt-28 pb-32 bg-[#07090E] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Hotels & Sanctuaries' }]} />

        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between my-10 gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C8A97E] font-mono">
              <Building2 className="w-3.5 h-3.5" />
              <span>Verified 5-Star Sanctuaries</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight leading-[1.1]">
              Luxury Hotels & Private Islands
            </h1>
            <p className="text-white/60 text-sm sm:text-base font-light leading-relaxed">
              From overwater coral villas at The St. Regis Red Sea to cliffside green mountain suites at Alila Jabal Akhdar and private desert tented retreats.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hotel by name or city..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-full pl-11 pr-4 py-3.5 text-xs text-white placeholder-white/40 focus:border-[#C8A97E] focus:outline-none backdrop-blur-md"
            />
            <Search className="w-4 h-4 text-white/40 absolute left-4 top-4" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 text-white/40 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[#0B0D12] border border-white/[0.06] rounded-3xl p-5 mb-12 shadow-2xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <select
                value={destinationFilter}
                onChange={(e) => setDestinationFilter(e.target.value)}
                className="bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:border-[#C8A97E] focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-[#0B0D12]">All Destinations</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.slug} className="bg-[#0B0D12]">{d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className="bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:border-[#C8A97E] focus:outline-none cursor-pointer"
              >
                {tiers.map((t) => (
                  <option key={t} value={t} className="bg-[#0B0D12]">{t === 'all' ? 'All Luxury Tiers' : t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-white/50">
            <span>Showing <strong>{filteredHotels.length}</strong> luxury properties</span>
            {(destinationFilter !== 'all' || tierFilter !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setDestinationFilter('all');
                  setTierFilter('all');
                  setSearchQuery('');
                }}
                className="text-[#C5A880] hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HotelsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#07090E] text-white pt-32 text-center">Loading hotels...</div>}>
      <HotelsContent />
    </Suspense>
  );
}

