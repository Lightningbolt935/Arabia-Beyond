'use client';

import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function ExperiencesPage() {
  const experiences = [
    {
      title: 'Private Desert Expeditions & Stargazing',
      destinations: 'Oman (Wahiba Sands) • Saudi Arabia (AlUla)',
      description: 'Exclusive luxury desert camps set in deep copper dunes. Private astronomer-led celestial telescope sessions, dune navigation in modern luxury 4WD, and traditional Bedouin sunset feasts under the Milky Way.',
      image: 'https://images.unsplash.com/photo-1785963643205-21923ef80f0c?auto=format&fit=crop&w=1000&q=80',
      badge: 'Signature Arabian',
      link: '/packages?style=Desert+Expedition'
    },
    {
      title: 'Untouched Marine & Red Sea Barrier Reef Diving',
      destinations: 'The Red Sea • Qatar (Banana Island)',
      description: 'Private catamaran yacht charters, crystal barrier reef diving with marine biologists, zero-emission electric hydrofoils, and overwater villa sanctuaries.',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
      badge: 'Regenerative Luxury',
      link: '/destinations/the-red-sea'
    },
    {
      title: 'UNESCO Archaeological Antiquity & Royal Heritage',
      destinations: 'Bahrain (Pearling Path) • Saudi Arabia (Hegra & Diriyah)',
      description: 'Private archaeologist-led after-hours walkthroughs of 2,000-year-old Nabataean rock tombs at Hegra, mud-brick palaces of At-Turaif, and Dilmun pearling alleys.',
      image: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=1000&q=80',
      badge: 'Living History',
      link: '/packages?style=Cultural+Discovery'
    },
    {
      title: 'High-Altitude Mountain & Canyon Sanctuaries',
      destinations: 'Oman (Jabal Akhdar 2,000m Gorge)',
      description: 'Suspended 2,000 meters above sea level in the Western Hajar Mountains. Clifftop infinity pools, indigenous frankincense & juniper therapies, and private terraced orchard walks.',
      image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1000&q=80',
      badge: 'Mountain Solitude',
      link: '/packages/muscat-mountains-and-desert'
    }
  ];

  return (
    <div className="pt-28 pb-32 bg-[#07090E] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Curated Experiences' }]} />

        <div className="max-w-3xl space-y-4 my-12">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C8A97E] font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Collections</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-white font-light tracking-tight leading-[1.08]">
            Curated Arabian Experiences
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed font-light">
            Beyond standard travel. Every experience is arranged through direct aristocratic access and private conservation partnerships across the Arabian peninsula.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-14">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-[#080A0E] border border-white/[0.08] overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-[#C8A97E]/50 transition-all duration-700"
            >
              <div className="relative h-72 w-full overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${exp.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080A0E] via-transparent to-transparent" />
                <div className="absolute top-5 left-5">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-[#E5D1B8] border border-white/10">
                    {exp.badge}
                  </span>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E]">
                    {exp.destinations}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal group-hover:text-[#E5D1B8] transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                    {exp.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex justify-end">
                  <Link
                    href={exp.link}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C8A97E] hover:text-[#E5D1B8] font-semibold transition-colors"
                  >
                    <span>Explore Itineraries</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
