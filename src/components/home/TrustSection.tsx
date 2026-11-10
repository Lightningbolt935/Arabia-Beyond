'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function TrustSection() {
  const trustPoints = [
    {
      num: '01',
      title: 'Statutory Protection',
      description: 'Fully compliant with UK Package Travel Regulations, ensuring statutory client fund safeguarding with complete financial security and ATOL-grade protocol.'
    },
    {
      num: '02',
      title: 'Direct Sovereign Contracts',
      description: 'Zero third-party markups or synthetic booking inflations. Direct property agreements with sovereign retreats, private islands, and luxury hotel groups.'
    },
    {
      num: '03',
      title: 'Absolute Discretion',
      description: 'Uncompromising privacy for discerning voyagers and family offices. Bespoke non-disclosure agreements available for private aviation and exclusive buyouts.'
    },
    {
      num: '04',
      title: '24/7 Dedicated Trip Director',
      description: 'A dedicated senior Arabian travel specialist assigned to monitor every airside transfer, private guide, and bespoke request from inception to return.'
    }
  ];

  return (
    <section className="py-24 bg-[#07090E] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>The Arab & Beyond Standard</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl text-white font-serif font-normal tracking-tight">
            Architects of Unrivalled Arabian Experiences
          </h2>
          <p className="text-white/70 text-base sm:text-lg font-light leading-relaxed">
            Founded on direct regional relationships, rigorous regulatory compliance, and an uncompromising commitment to privacy.
          </p>
        </div>

        {/* 4-column feature breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((point, idx) => (
            <div key={idx} className="p-7 rounded-3xl bg-[#0E121A] border border-white/10 hover:border-[#C5A880] transition-colors space-y-3 shadow-xl group">
              <div className="text-xs font-mono text-[#C5A880] tracking-widest font-bold pb-2 border-b border-white/10">
                {point.num}
              </div>
              <h3 className="font-serif text-lg text-white font-normal group-hover:text-[#DFC9AA] transition-colors">
                {point.title}
              </h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
