'use client';

import React from 'react';
import Link from 'next/link';
import { Hotel } from '@/lib/types';
import { useTravelStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { MapPin, ArrowRight } from 'lucide-react';

interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  const { currency } = useTravelStore();

  return (
    <div className="group rounded-3xl bg-[#0E121A] border border-white/10 hover:border-[#C5A880] transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-2xl hover:-translate-y-1">
      {/* Hero Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ backgroundImage: `url(${hotel.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E121A] via-transparent to-black/40" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] uppercase tracking-wider text-[#DFC9AA] border border-white/15 font-semibold font-mono shadow-sm">
            {hotel.destinationName}
          </span>
          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] uppercase tracking-wider text-[#DFC9AA] border border-white/15 font-semibold font-mono shadow-sm">
            {hotel.verifiedLuxuryTier}
          </span>
        </div>

        {/* Verified Tier Label */}
        <div className="absolute bottom-3 left-4 text-xs font-medium text-white bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
          5-Star Verified Sanctuary
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-[#DFC9AA] font-medium">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-[#C5A880]" />
            <span className="truncate">{hotel.city}, {hotel.destinationName}</span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl text-white font-normal group-hover:text-[#DFC9AA] transition-colors leading-snug">
            <Link href={`/hotels/${hotel.slug}`}>
              {hotel.name}
            </Link>
          </h3>

          <p className="text-white/70 text-sm font-light leading-relaxed line-clamp-2">
            {hotel.shortSummary}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-4 border-t border-white/10 flex items-end justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-white/50 block font-semibold font-mono">
              Nightly Sanctuary Rate
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-white tracking-tight">
                {formatPrice(hotel.priceFromPerNight, currency)}
              </span>
              <span className="text-xs text-white/50">/ night</span>
            </div>
          </div>

          <Link
            href={`/hotels/${hotel.slug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-[#C5A880] text-white hover:text-black text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md"
          >
            <span>Explore Suites</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
