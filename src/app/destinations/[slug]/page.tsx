'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { useTravelStore } from '@/lib/store';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import PackageCard from '@/components/packages/PackageCard';
import HotelCard from '@/components/hotels/HotelCard';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import {
  Compass,
  CloudSun,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function DestinationDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { destinations, packages, hotels } = useTravelStore();

  const destination = destinations.find((d) => d.slug === slug);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!destination) {
    notFound();
  }

  const destPackages = packages.filter(
    (p) => p.destinationSlug === destination.slug && p.status !== 'archived'
  );
  const destHotels = hotels.filter(
    (h) => h.destinationSlug === destination.slug && h.active
  );

  return (
    <div className="bg-[#F5F5F7] text-white min-h-screen">
      {/* Destination Hero Video Section (Section 6 & 8) */}
      <section className="relative w-full h-[80vh] min-h-[560px] max-h-[800px] overflow-hidden bg-black flex items-center justify-center">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={destination.heroPosterUrl}
          className="absolute inset-0 w-full h-full object-cover scale-105"
        >
          <source src={destination.heroVideoUrl} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-black/40 to-black/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/30 to-black/60 pointer-events-none" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
          <Breadcrumbs items={[{ label: 'Destinations', href: '/destinations' }, { label: destination.name }]} />

          <div className="max-w-3xl space-y-6 mt-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/10 text-[#E5D1B8] text-[11px] uppercase tracking-[0.25em] font-mono">
              <span>{destination.isRegionOf ? `Archipelago of ${destination.isRegionOf}` : destination.country}</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-white font-light leading-[1.08] tracking-tight">
              {destination.heroHeadline}
            </h1>

            <p className="text-white/70 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
              {destination.heroSubheadline}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="#packages"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#C8A97E] to-[#DFC9AA] hover:brightness-105 text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 shadow-xl shadow-[#C8A97E]/20"
              >
                Curated Packages ({destPackages.length})
              </a>
              <a
                href="#hotels"
                className="px-8 py-4 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white font-medium text-xs uppercase tracking-[0.2em] backdrop-blur-xl border border-white/10 transition-all duration-300"
              >
                Palaces & Retreats ({destHotels.length})
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 space-y-32">
        {/* Destination Overview & Climate Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C8A97E] font-mono">
              <Compass className="w-3.5 h-3.5" />
              <span>Destination Essence</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-light tracking-tight leading-[1.15]">
              {destination.tagline}
            </h2>
            <p className="text-white/70 text-base leading-relaxed font-light">
              {destination.overview}
            </p>
          </div>

          {/* Practical Info Card */}
          <div className="lg:col-span-5 rounded-3xl bg-[#0B0D12] border border-white/[0.06] p-8 sm:p-10 space-y-6 shadow-2xl">
            <h3 className="font-serif text-2xl text-white font-normal flex items-center gap-2.5">
              <CloudSun className="w-5 h-5 text-[#C8A97E]" />
              <span>Voyage Intelligence</span>
            </h3>

            <div className="space-y-4 text-xs font-light">
              <div className="flex items-start justify-between pb-3.5 border-b border-white/[0.04]">
                <span className="text-white/40">Optimal Season</span>
                <span className="font-medium text-white text-right">{destination.bestTimeToVisit.season}</span>
              </div>
              <div className="flex items-start justify-between pb-3.5 border-b border-white/[0.04]">
                <span className="text-white/40">Average Temperature</span>
                <span className="font-mono text-[#E5D1B8] text-right">{destination.bestTimeToVisit.temperature}</span>
              </div>
              <div className="flex items-start justify-between pb-3.5 border-b border-white/[0.04]">
                <span className="text-white/40">Flight Time (from London)</span>
                <span className="font-medium text-white text-right">{destination.practicalInfo.flightDuration}</span>
              </div>
              <div className="flex items-start justify-between pb-3.5 border-b border-white/[0.04]">
                <span className="text-white/40">Currency</span>
                <span className="font-mono text-white text-right">{destination.practicalInfo.currency}</span>
              </div>
              <div className="flex items-start justify-between pb-3.5 border-b border-white/[0.04]">
                <span className="text-white/40">Time Zone</span>
                <span className="font-mono text-white text-right">{destination.practicalInfo.timeZone}</span>
              </div>
              <div className="pt-2 text-[11px] text-white/50 bg-white/[0.02] p-4 rounded-2xl border border-white/[0.04] leading-relaxed">
                <strong className="text-white font-medium">Visa & Entry:</strong> {destination.practicalInfo.visaNotice}
              </div>
            </div>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="space-y-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C8A97E] font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Encounters</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-light tracking-tight">
              Why Travel to {destination.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destination.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-[#0B0D12] border border-white/[0.06] overflow-hidden shadow-2xl flex flex-col group hover:border-[#C8A97E]/30 transition-all duration-700"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url(${highlight.imageUrl})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-transparent to-transparent" />
                </div>
                <div className="p-7 flex-1 flex flex-col justify-between space-y-3">
                  <h3 className="font-serif text-2xl text-white font-normal group-hover:text-[#E5D1B8] transition-colors">
                    {highlight.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                    {highlight.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Destination Packages (Section 8) */}
        <section id="packages" className="space-y-12 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.06]">
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A97E] font-mono">
                Bespoke Itineraries
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-white font-light tracking-tight">
                Luxury Packages in {destination.name}
              </h2>
            </div>
            <p className="text-xs text-white/40 font-mono">
              {destPackages.length} Curated Itineraries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destPackages.map((pkg) => (
              <PackageCard key={pkg.id} packageItem={pkg} />
            ))}
          </div>
        </section>

        {/* Destination Hotels & Resorts (Section 8) */}
        <section id="hotels" className="space-y-12 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.06]">
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A97E] font-mono">
                Sanctuaries & Palaces
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-white font-light tracking-tight">
                Verified Hotels & Retreats in {destination.name}
              </h2>
            </div>
            <p className="text-xs text-white/40 font-mono">
              {destHotels.length} Luxury Properties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </section>

        {/* Destination FAQs */}
        {destination.faqs && destination.faqs.length > 0 && (
          <section className="space-y-8 max-w-3xl">
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A97E] font-mono">
                Travel Intelligence
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-light tracking-tight">
                Frequently Asked Questions about {destination.name}
              </h2>
            </div>

            <div className="space-y-3 pt-2">
              {destination.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-[#0B0D12] border border-white/[0.06] overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <span className="text-sm font-medium text-white font-serif">
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#C8A97E] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-white/40 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-white/60 leading-relaxed border-t border-white/[0.04] font-light animate-in fade-in duration-200">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Destination Tailor-Made Banner */}
        <section className="rounded-3xl p-10 sm:p-14 bg-gradient-to-r from-[#0E1118] to-[#0B0D12] border border-white/[0.08] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-3 max-w-xl">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A97E] font-mono">
              Bespoke {destination.name} Atelier
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-white font-light tracking-tight">
              Design a Custom Voyage to {destination.name}
            </h3>
            <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
              Combine private island retreats with desert camps or yacht charters. Our senior Mayfair designers prepare bespoke proposals with guaranteed line-item transparency.
            </p>
          </div>

          <Link
            href={`/plan-your-trip?destination=${destination.slug}`}
            className="px-9 py-4 rounded-full bg-gradient-to-r from-[#C8A97E] to-[#DFC9AA] hover:brightness-105 text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 shrink-0 shadow-xl shadow-[#C8A97E]/20 flex items-center gap-2"
          >
            <span>Plan Your {destination.name} Journey</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>

      <WhatsAppButton contextDestination={destination.name} />
    </div>
  );
}
