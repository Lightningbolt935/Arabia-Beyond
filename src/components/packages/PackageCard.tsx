'use client';

import React from 'react';
import Link from 'next/link';
import { Package } from '@/lib/types';
import { useTravelStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { Heart, ArrowRight, Compass } from 'lucide-react';

interface PackageCardProps {
  packageItem: Package;
}

export default function PackageCard({ packageItem }: PackageCardProps) {
  const { currency, toggleSavePackage, isPackageSaved } = useTravelStore();
  const saved = isPackageSaved(packageItem.id);

  return (
    <div className="group rounded-3xl bg-[#0E121A] border border-white/10 hover:border-[#C5A880] transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-2xl hover:-translate-y-1">
      {/* Visual Media Container */}
      <div className="relative h-64 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ backgroundImage: `url(${packageItem.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E121A] via-transparent to-black/40" />

        {/* Top Floating Row */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] uppercase tracking-wider text-[#DFC9AA] border border-white/15 font-semibold font-mono shadow-sm">
            {packageItem.destinationName} • {packageItem.travelStyle}
          </span>

          <button
            onClick={(e) => {
              e.preventDefault();
              toggleSavePackage(packageItem.id);
            }}
            className={`w-9 h-9 rounded-full backdrop-blur-md border flex items-center justify-center transition-all ${
              saved
                ? 'bg-rose-500 border-rose-400 text-white shadow-sm'
                : 'bg-black/60 border-white/15 text-white hover:bg-black/80 shadow-sm'
            }`}
            aria-label="Save Itinerary"
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Route / Duration Floating Pill */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
          <span className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 font-medium">
            {packageItem.durationDays} Days / {packageItem.durationNights} Nights
          </span>
          {packageItem.badge && (
            <span className="bg-[#C5A880] text-black px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider shadow-sm">
              {packageItem.badge}
            </span>
          )}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Route Trail */}
          <div className="flex items-center gap-1.5 text-xs text-[#DFC9AA] font-medium truncate">
            <Compass className="w-3.5 h-3.5 shrink-0 text-[#C5A880]" />
            <span className="truncate">{packageItem.cities.join(' → ')}</span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl text-white font-normal group-hover:text-[#DFC9AA] transition-colors leading-snug">
            <Link href={`/packages/${packageItem.slug}`}>
              {packageItem.name}
            </Link>
          </h3>

          <p className="text-white/70 text-sm font-light leading-relaxed line-clamp-2">
            {packageItem.shortSummary}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-4 border-t border-white/10 flex items-end justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-white/50 block font-semibold font-mono">
              From Rate
            </span>
            {packageItem.isPriceOnRequest ? (
              <span className="text-base font-semibold text-[#DFC9AA]">Price on Request</span>
            ) : (
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white tracking-tight">
                  {formatPrice(packageItem.priceFrom, currency)}
                </span>
                <span className="text-xs text-white/50">pp</span>
              </div>
            )}
          </div>

          <Link
            href={`/packages/${packageItem.slug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-[#C5A880] text-white hover:text-black text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md"
          >
            <span>View Itinerary</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
