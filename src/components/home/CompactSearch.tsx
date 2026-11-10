'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTravelStore } from '@/lib/store';
import { Search, MapPin, Calendar, Users, Compass, Building2, Sparkles } from 'lucide-react';

export default function CompactSearch() {
  const router = useRouter();
  const { destinations } = useTravelStore();

  const [mode, setMode] = useState<'packages' | 'hotels'>('packages');
  const [destination, setDestination] = useState<string>('all');
  const [season, setSeason] = useState<string>('any');
  const [style, setStyle] = useState<string>('all');
  const [guests, setGuests] = useState<string>('2');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const basePath = mode === 'packages' ? '/packages' : '/hotels';
    const params = new URLSearchParams();

    if (destination !== 'all') params.set('destination', destination);
    if (season !== 'any') params.set('month', season);
    if (style !== 'all') params.set('style', style);
    if (guests) params.set('party', guests);

    const qs = params.toString();
    router.push(qs ? `${basePath}?${qs}` : basePath);
  };

  return (
    <div className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 mt-6 sm:mt-8 mb-16">
      <div className="bg-[#0E121A]/95 backdrop-blur-3xl border border-white/15 rounded-3xl p-5 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] text-white">
        {/* Mode Switcher Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-white/10">
          <div className="inline-flex p-1 rounded-2xl bg-black/50 border border-white/10">
            <button
              type="button"
              onClick={() => setMode('packages')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                mode === 'packages'
                  ? 'bg-[#C5A880] text-black shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Curated Packages</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('hotels')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                mode === 'hotels'
                  ? 'bg-[#C5A880] text-black shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Palaces & Sanctuaries</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-[#DFC9AA]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="font-light">Direct Concierge Advisory • Guaranteed Best Rates</span>
          </div>
        </div>

        {/* Search Inputs Grid */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Destination */}
          <div className="flex flex-col justify-center px-4 py-2.5 rounded-2xl bg-white/[0.05] border border-white/10 hover:border-[#C5A880]/50 transition-colors">
            <label className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold flex items-center gap-1.5 font-mono">
              <MapPin className="w-3 h-3 text-[#C5A880]" />
              <span>Destination</span>
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="mt-1 bg-transparent text-white text-xs sm:text-sm font-medium focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#0E121A] text-white">All 5 Arabian Regions</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.slug} className="bg-[#0E121A] text-white">
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Travel Season */}
          <div className="flex flex-col justify-center px-4 py-2.5 rounded-2xl bg-white/[0.05] border border-white/10 hover:border-[#C5A880]/50 transition-colors">
            <label className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold flex items-center gap-1.5 font-mono">
              <Calendar className="w-3 h-3 text-[#C5A880]" />
              <span>Travel Window</span>
            </label>
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="mt-1 bg-transparent text-white text-xs sm:text-sm font-medium focus:outline-none cursor-pointer"
            >
              <option value="any" className="bg-[#0E121A] text-white">Any Month / Flexible</option>
              <option value="winter" className="bg-[#0E121A] text-white">Winter Peak (Nov–Feb)</option>
              <option value="spring" className="bg-[#0E121A] text-white">Spring (Mar–May)</option>
              <option value="autumn" className="bg-[#0E121A] text-white">Autumn (Sep–Oct)</option>
            </select>
          </div>

          {/* Experience Style */}
          <div className="flex flex-col justify-center px-4 py-2.5 rounded-2xl bg-white/[0.05] border border-white/10 hover:border-[#C5A880]/50 transition-colors">
            <label className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold flex items-center gap-1.5 font-mono">
              <Compass className="w-3 h-3 text-[#C5A880]" />
              <span>Experience</span>
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="mt-1 bg-transparent text-white text-xs sm:text-sm font-medium focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#0E121A] text-white">All Travel Styles</option>
              <option value="Desert Expedition" className="bg-[#0E121A] text-white">Desert Expeditions</option>
              <option value="Cultural Discovery" className="bg-[#0E121A] text-white">Archaeology & Antiquity</option>
              <option value="Island & Marine" className="bg-[#0E121A] text-white">Red Sea Reefs & Marine</option>
              <option value="Wellness & Spa" className="bg-[#0E121A] text-white">Canyon Wellness & Spa</option>
            </select>
          </div>

          {/* Voyagers */}
          <div className="flex flex-col justify-center px-4 py-2.5 rounded-2xl bg-white/[0.05] border border-white/10 hover:border-[#C5A880]/50 transition-colors">
            <label className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold flex items-center gap-1.5 font-mono">
              <Users className="w-3 h-3 text-[#C5A880]" />
              <span>Party</span>
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="mt-1 bg-transparent text-white text-xs sm:text-sm font-medium focus:outline-none cursor-pointer"
            >
              <option value="2" className="bg-[#0E121A] text-white">2 Adults (Double)</option>
              <option value="1" className="bg-[#0E121A] text-white">1 Adult (Solo Explorer)</option>
              <option value="3" className="bg-[#0E121A] text-white">Family Suite (3-4)</option>
              <option value="5" className="bg-[#0E121A] text-white">Private Delegation (5+)</option>
            </select>
          </div>

          {/* Search Action Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-[#C5A880] to-[#DFC9AA] hover:from-[#DFC9AA] hover:to-[#C5A880] text-black font-semibold rounded-2xl py-3 px-6 flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-xl transition-all duration-300 hover:scale-[1.02] sm:col-span-2 lg:col-span-1"
          >
            <Search className="w-4 h-4" />
            <span>Find Journeys</span>
          </button>
        </form>
      </div>
    </div>
  );
}
