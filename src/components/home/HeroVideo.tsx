'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTravelStore } from '@/lib/store';
import { Compass, ArrowRight } from 'lucide-react';

const destinationHeroImages: Record<string, string> = {
  'bahrain': 'https://images.unsplash.com/photo-1743580839034-9d5dae99596b?auto=format&fit=crop&w=2400&q=90', // Bahrain Fort (Qal\'at al-Bahrain) UNESCO World Heritage Site
  'oman': 'https://images.unsplash.com/photo-1784400340405-e3874cdbb0e0?auto=format&fit=crop&w=2400&q=90', // Sultan Qaboos Grand Mosque in Muscat, Oman by Rafael Peier
  'saudi-arabia': 'https://images.unsplash.com/photo-1681419670203-6b081b3c9fe1?auto=format&fit=crop&w=2400&q=90', // Hegra monumental Nabataean rock-carved tomb in AlUla
  'the-red-sea': 'https://images.unsplash.com/photo-1682695797873-aa4cb6edd613?auto=format&fit=crop&w=2400&q=90', // The Red Sea pristine turquoise barrier reef lagoon & islands
  'qatar': 'https://images.unsplash.com/photo-1724614766636-3ddd7ea39804?auto=format&fit=crop&w=2400&q=90' // Doha Museum of Islamic Art & palm promenade on the Corniche
};

export default function HeroVideo() {
  const { destinations } = useTravelStore();
  const [activeDestIndex, setActiveDestIndex] = useState(1); // Default Oman

  const currentDest = destinations[activeDestIndex] || destinations[0];

  return (
    <section className="relative w-full min-h-[720px] lg:min-h-[780px] overflow-hidden bg-[#0A0D14] flex items-center pt-32 sm:pt-36 pb-20 sm:pb-24">
      {/* High-Resolution Majestic Sun-Drenched Arabian Backdrops with Butter-Smooth Cross-Fade */}
      {destinations.map((d, index) => {
        const imgUrl = destinationHeroImages[d.slug] || destinationHeroImages['oman'];
        const isActive = index === activeDestIndex;
        return (
          <div
            key={d.slug}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out ${
              isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
            style={{ backgroundImage: `url(${imgUrl})` }}
          />
        );
      })}

      {/* Luminous, Sun-Drenched Lighting: Radiant sunlight with delicate text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent pointer-events-none" />

      {/* Main Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/25 text-white shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#DFC9AA] font-sans">
              {currentDest.name} • {currentDest.tagline}
            </span>
          </div>

          {/* Majestic Editorial Serif Headline with Drop Shadow for Sunlight Contrast */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-white font-normal leading-[1.08] tracking-tight text-balance drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
            Where Ancient Arabia Meets <br />
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5E6] via-[#DFC9AA] to-[#C5A880] drop-shadow-md">
              Untouched Splendour.
            </span>
          </h1>

          {/* Luxury Travel Subheading */}
          <p className="text-white text-base sm:text-lg font-light leading-relaxed max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            Handcrafted private journeys, sovereign palace takeovers, and remote desert sanctuaries across Bahrain, Oman, Saudi Arabia, The Red Sea, and Qatar. Handcrafted by dedicated regional travel directors.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/packages"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#C5A880] hover:bg-[#DFC9AA] text-black font-semibold text-xs uppercase tracking-[0.18em] transition-all duration-300 shadow-xl shadow-black/50 hover:scale-[1.02]"
            >
              <span>Explore Curated Journeys</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/plan-your-trip"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-black/40 hover:bg-black/60 text-white font-medium text-xs uppercase tracking-[0.18em] backdrop-blur-xl border border-white/25 transition-all duration-300 hover:scale-[1.02] shadow-lg"
            >
              <Compass className="w-4 h-4 text-[#DFC9AA]" />
              <span>Tailor-Made Proposal</span>
            </Link>
          </div>

          {/* Curated Kingdoms & Sultanates - Dedicated Space, 100% visible, luminous contrast */}
          <div className="pt-8 pb-3 space-y-2.5">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#DFC9AA] font-semibold flex items-center gap-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              <span>Curated Kingdoms & Sultanates:</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
            </div>
            <div className="inline-flex p-1.5 rounded-full bg-black/50 backdrop-blur-2xl border border-white/20 max-w-full overflow-x-auto scrollbar-none shadow-2xl">
              {destinations.map((d, index) => {
                const isActive = index === activeDestIndex;
                return (
                  <button
                    key={d.id}
                    onClick={() => setActiveDestIndex(index)}
                    className={`px-4 sm:px-5 py-2 rounded-full text-xs transition-all duration-300 whitespace-nowrap ${
                      isActive
                        ? 'bg-[#C5A880] text-black font-semibold shadow-lg scale-100'
                        : 'text-white/80 hover:text-white hover:bg-white/10 font-medium'
                    }`}
                  >
                    {d.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
