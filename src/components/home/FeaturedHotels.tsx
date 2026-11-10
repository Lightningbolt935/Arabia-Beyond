'use client';

import React from 'react';
import Link from 'next/link';
import { useTravelStore } from '@/lib/store';
import HotelCard from '@/components/hotels/HotelCard';
import { Building2, ArrowRight } from 'lucide-react';

export default function FeaturedHotels() {
  const { hotels } = useTravelStore();
  const featuredHotels = hotels.filter((h) => h.isFeatured).slice(0, 3);

  return (
    <section className="py-24 bg-[#07090E] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold">
              <Building2 className="w-3.5 h-3.5" />
              <span>Sanctuaries & Overwater Retreats</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl text-white font-serif font-normal tracking-tight">
              Architectural Sanctuaries
            </h2>
            <p className="text-white/70 text-base sm:text-lg font-light leading-relaxed">
              Curated luxury properties selected for profound architectural reverence, Michelin-caliber dining, and seamless Arabian hospitality.
            </p>
          </div>

          <Link
            href="/hotels"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#DFC9AA] hover:text-white transition-colors shrink-0"
          >
            <span>View All Sanctuaries</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>
    </section>
  );
}
