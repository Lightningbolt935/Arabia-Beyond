'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Compass, Plane, Shield, ArrowRight } from 'lucide-react';

export default function TailorMadeSection() {
  return (
    <section className="relative py-24 bg-[#0B0E14] overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/15 text-[#DFC9AA] text-[11px] uppercase tracking-[0.2em] font-semibold font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Bespoke Concierge Atelier</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-white font-normal tracking-tight leading-[1.08]">
            Your Vision. <br />
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#F5E6D3] via-[#DFC9AA] to-[#C5A880]">
              Our Arabian Canvas.
            </span>
          </h2>

          <p className="text-white/70 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
            No two voyagers are alike. Whether you require private helicopter transfers across the sandstone canyons of AlUla, chartered dhow expeditions through Musandam’s fjords, or sequestered palace takeovers on the Red Sea, our Mayfair and Dubai ateliers orchestrate every detail with surgical discretion.
          </p>

          {/* Three capability cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#C5A880]/50 transition-colors space-y-2">
              <Compass className="w-5 h-5 text-[#C5A880]" />
              <h4 className="text-xs uppercase tracking-wider text-white font-bold font-mono">Bespoke Routing</h4>
              <p className="text-xs text-white/60 leading-relaxed font-light">Privately mapped desert camps and uncharted wadi trails.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#C5A880]/50 transition-colors space-y-2">
              <Plane className="w-5 h-5 text-[#C5A880]" />
              <h4 className="text-xs uppercase tracking-wider text-white font-bold font-mono">Airside Protocol</h4>
              <p className="text-xs text-white/60 leading-relaxed font-light">Private lounge escort and tarmac customs expediting.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#C5A880]/50 transition-colors space-y-2">
              <Shield className="w-5 h-5 text-[#C5A880]" />
              <h4 className="text-xs uppercase tracking-wider text-white font-bold font-mono">Trip Director</h4>
              <p className="text-xs text-white/60 leading-relaxed font-light">Dedicated personal specialist on call 24/7 throughout.</p>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <Link
              href="/plan-your-trip"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#C5A880] hover:bg-[#DFC9AA] text-black font-semibold text-xs uppercase tracking-[0.18em] transition-all duration-300 shadow-xl shadow-black/50 hover:scale-[1.02]"
            >
              <span>Design Your Tailor-Made Itinerary</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/experiences"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs uppercase tracking-[0.18em] backdrop-blur-xl border border-white/20 transition-all duration-300 hover:scale-[1.02]"
            >
              <span>Explore Private Experiences</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
