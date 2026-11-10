'use client';

import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { ArrowRight } from 'lucide-react';

export default function GuidesPage() {
  const articles = [
    {
      title: 'The Best Time to Visit Oman: From Green Mountain Harvests to Wahiba Nights',
      category: 'Seasonal Travel & Climate',
      readTime: '6 min read',
      date: '9 November 2026',
      summary: 'A detailed breakdown of when to experience the cooler breezes of Jabal Akhdar, pomegranate harvests, and calm sailing in the Gulf of Oman.',
      image: 'https://images.unsplash.com/photo-1785963643205-21923ef80f0c?auto=format&fit=crop&w=800&q=80',
      link: '/destinations/oman'
    },
    {
      title: 'The Red Sea Archipelago Guide: Arriving at Ummahat Island & Overwater Living',
      category: 'Ultra-Luxury Architecture',
      readTime: '8 min read',
      date: '5 November 2026',
      summary: 'Everything you need to know about Foster + Partners’ Red Sea International Airport, seaplane transfers, and regenerative coral protection.',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      link: '/destinations/the-red-sea'
    },
    {
      title: 'AlUla & Hegra: Cultural Etiquette and What to Pack for the Ashar Valley',
      category: 'Cultural Etiquette',
      readTime: '5 min read',
      date: '28 October 2026',
      summary: 'Practical advice for respectful, elegant luxury travel in Saudi Arabia. Evening layering for desert drop in temperatures and archaeological walking gear.',
      image: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=800&q=80',
      link: '/destinations/saudi-arabia'
    }
  ];

  return (
    <div className="pt-28 pb-32 bg-[#07090E] text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Travel Guides & Intelligence' }]} />

        <div className="max-w-2xl space-y-4 my-12">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C8A97E] font-mono">
            <span>The Arabian Dispatch</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-white font-light tracking-tight leading-[1.08]">
            Curated Travel Guides & Seasonal Intelligence
          </h1>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">
            Written by senior destination specialists. Verified advice on seasons, dress codes, private access, and flight logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
          {articles.map((art, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-[#080A0E] border border-white/[0.08] overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-[#C8A97E]/50 transition-all duration-700"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${art.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080A0E] via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-[#E5D1B8] border border-white/10">
                    {art.category}
                  </span>
                </div>
              </div>

              <div className="p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-[10px] text-white/40 flex items-center gap-2 font-mono">
                    <span>{art.date}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-white font-normal group-hover:text-[#E5D1B8] transition-colors leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed font-light">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex justify-end">
                  <Link
                    href={art.link}
                    className="inline-flex items-center gap-1.5 text-xs text-[#C8A97E] hover:text-[#E5D1B8] font-semibold uppercase tracking-wider font-mono transition-colors"
                  >
                    <span>Read Guide</span>
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
