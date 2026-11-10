'use client';

import React from 'react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Compass, MapPin } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-28 pb-32 bg-[#07090E] text-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'About Us' }]} />

        <div className="max-w-3xl space-y-4 my-12">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C8A97E] font-mono">
            <Compass className="w-3.5 h-3.5" />
            <span>Our Founding Philosophy</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-white font-light tracking-tight leading-[1.08]">
            Arabia In Its Most Rare & Aristocratic Light
          </h1>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed font-light">
            Arab & Beyond was created with a single, uncompromising mandate: to reveal the Arabian Peninsula not through standard tourism, but through private access, architectural grandeur, and authentic cultural stewardship.
          </p>
        </div>

        {/* Narrative Section */}
        <div className="rounded-3xl bg-[#0B0D12] border border-white/[0.06] p-8 sm:p-14 space-y-10 shadow-2xl mb-16">
          <div className="space-y-4 text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            <p>
              For decades, luxury travelers seeking world-class privacy gravitated toward the Mediterranean or the South Pacific. Today, the Arabian Peninsula has quietly emerged as home to the world’s most exciting architectural sanctuaries, regenerative marine reserves, and deeply preserved ancient civilizations.
            </p>
            <p>
              From the pristine coral barrier reefs of The Red Sea powered entirely by solar energy, to the 2,000-year-old Nabataean rock tombs at Hegra in AlUla, and the tranquil high-altitude green canyons of Oman, we provide discerning voyagers with private chartered access, expert storytellers, and 24/7 Mayfair concierge oversight.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-white/[0.04]">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E]">Integrity</span>
              <h4 className="font-serif text-xl text-white font-normal">Direct Partnerships</h4>
              <p className="text-xs text-white/50 leading-relaxed font-light">We work directly with luxury hoteliers and certified regional guides, eliminating intermediaries.</p>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E]">Discretion</span>
              <h4 className="font-serif text-xl text-white font-normal">Confidential Service</h4>
              <p className="text-xs text-white/50 leading-relaxed font-light">Discreet handling for private family offices, VIP voyagers, and high-profile guests.</p>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E]">Protection</span>
              <h4 className="font-serif text-xl text-white font-normal">UK Package Compliance</h4>
              <p className="text-xs text-white/50 leading-relaxed font-light">Compliant with the UK Package Travel Regulations, providing client fund safeguarding.</p>
            </div>
          </div>
        </div>

        {/* Offices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0B0D12] border border-white/[0.06] space-y-3">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#C8A97E] font-mono">
              <MapPin className="w-3.5 h-3.5" />
              <span>London Headquarters</span>
            </div>
            <h3 className="font-serif text-2xl text-white font-normal">Mayfair Private Client Desk</h3>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              35 Mayfair High St, London W1J 8FF, United Kingdom
            </p>
            <div className="text-xs text-[#E5D1B8] pt-2 font-mono">
              concierge@arabandbeyond.com • +44 (0) 20 7946 0888
            </div>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-[#0B0D12] border border-white/[0.06] space-y-3">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#C8A97E] font-mono">
              <MapPin className="w-3.5 h-3.5" />
              <span>Middle East Operations</span>
            </div>
            <h3 className="font-serif text-2xl text-white font-normal">Dubai Financial Center (DIFC)</h3>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              Level 42, Al Saada Tower, DIFC, Dubai, UAE
            </p>
            <div className="text-xs text-[#E5D1B8] pt-2 font-mono">
              regional@arabandbeyond.com • WhatsApp Concierge
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
