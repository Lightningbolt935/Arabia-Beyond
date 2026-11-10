'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { useTravelStore } from '@/lib/store';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import ItineraryAccordion from '@/components/packages/ItineraryAccordion';
import BookingStickyCard from '@/components/packages/BookingStickyCard';
import PackageCard from '@/components/packages/PackageCard';
import HotelCard from '@/components/hotels/HotelCard';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import ImageLightbox from '@/components/common/ImageLightbox';
import {
  Clock,
  MapPin,
  Compass,
  Users,
  ShieldCheck,
  Sparkles,
  Check,
  X,
  AlertCircle,
  Heart,
  Share2,
  Maximize2
} from 'lucide-react';

export default function PackageDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { packages, hotels, toggleSavePackage, isPackageSaved } = useTravelStore();

  const packageItem = packages.find((p) => p.slug === slug);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!packageItem) {
    notFound();
  }

  const saved = isPackageSaved(packageItem.id);

  // Linked hotels
  const linkedHotels = hotels.filter((h) =>
    packageItem.linkedHotelIds.includes(h.id)
  );

  // Related packages in same destination
  const relatedPackages = packages
    .filter((p) => p.destinationSlug === packageItem.destinationSlug && p.id !== packageItem.id)
    .slice(0, 2);

  // All images for lightbox
  const allImages = [
    { url: packageItem.heroImage, caption: packageItem.name },
    ...packageItem.gallery.map((g) => ({ url: g.url, caption: g.caption }))
  ];

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="bg-[#F5F5F7] text-white pt-24 pb-32 min-h-screen">
      {/* Lightbox Modal */}
      <ImageLightbox
        images={allImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIndex) => setLightboxIndex(newIndex)}
      />

      {/* Breadcrumbs Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs
          items={[
            { label: 'Packages', href: '/packages' },
            { label: packageItem.destinationName, href: `/destinations/${packageItem.destinationSlug}` },
            { label: packageItem.name }
          ]}
        />
      </div>

      {/* Main Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-white/[0.06]">
          <div className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-[#C8A97E]/10 text-[#E5D1B8] border border-[#C8A97E]/30 text-[10px] uppercase font-mono tracking-widest">
                {packageItem.destinationName} • {packageItem.travelStyle}
              </span>
              <span className="px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/70 text-[10px] uppercase font-mono tracking-widest">
                {packageItem.groupType}
              </span>
              {packageItem.badge && (
                <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-[#C8A97E] to-[#DFC9AA] text-black text-[10px] uppercase font-bold tracking-widest">
                  {packageItem.badge}
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-light leading-[1.1] tracking-tight">
              {packageItem.name}
            </h1>

            <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">
              {packageItem.shortSummary}
            </p>
          </div>

          {/* Action buttons (Save, Share) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => toggleSavePackage(packageItem.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono tracking-wider border transition-colors ${
                saved
                  ? 'bg-rose-500 border-rose-400 text-white'
                  : 'bg-white/[0.04] border-white/10 text-white/80 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
              <span>{saved ? 'Saved' : 'Save Itinerary'}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono tracking-wider bg-white/[0.04] border border-white/10 text-white/80 hover:text-white hover:bg-white/[0.08] transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs text-white/60 border-b border-white/[0.06] font-light">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-[#C8A97E]" />
            <span><strong className="font-medium text-white">Duration:</strong> {packageItem.durationDays} Days / {packageItem.durationNights} Nights</span>
          </div>
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-[#C8A97E]" />
            <span><strong className="font-medium text-white">Route:</strong> {packageItem.cities.join(' → ')}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Compass className="w-4 h-4 text-[#C8A97E]" />
            <span><strong className="font-medium text-white">Pacing:</strong> {packageItem.activityLevel}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Users className="w-4 h-4 text-[#C8A97E]" />
            <span><strong className="font-medium text-white">Departure:</strong> Fixed or Custom</span>
          </div>
        </div>
      </div>

      {/* Main Hero Photo Gallery (Section 10) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[440px] sm:h-[540px]">
          {/* Main Large Image */}
          <div
            onClick={() => handleOpenLightbox(0)}
            className="md:col-span-2 relative rounded-3xl overflow-hidden border border-white/[0.08] group cursor-pointer"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url(${packageItem.heroImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute top-5 right-5 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80 group-hover:text-white group-hover:scale-110 transition-all">
              <Maximize2 className="w-4 h-4" />
            </div>
            <div className="absolute bottom-5 left-5 text-[10px] font-mono tracking-widest uppercase text-white/80 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
              Primary View • Click to Expand
            </div>
          </div>

          {/* Secondary Gallery Images */}
          {packageItem.gallery.slice(0, 2).map((img, idx) => (
            <div
              key={idx}
              onClick={() => handleOpenLightbox(idx + 1)}
              className="relative rounded-3xl overflow-hidden border border-white/[0.08] group cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url(${img.url})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute top-5 right-5 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80 group-hover:text-white group-hover:scale-110 transition-all opacity-0 group-hover:opacity-100">
                <Maximize2 className="w-4 h-4" />
              </div>
              <div className="absolute bottom-5 left-5 right-5 text-[11px] text-white/90 font-light truncate">
                {img.caption}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Content & Sticky Card Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
          {/* Left Column (8 cols): Itinerary, Inclusions, Trip Info */}
          <div className="lg:col-span-8 space-y-20">
            {/* Full Narrative Overview */}
            <section className="space-y-4">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C8A97E] font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Experience</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-light tracking-tight">
                Voyage Narrative
              </h2>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed font-light">
                {packageItem.fullDescription}
              </p>
            </section>

            {/* Key Highlights Checklist */}
            <section className="rounded-3xl bg-[#0B0D12] border border-white/[0.06] p-8 sm:p-10 space-y-6 shadow-2xl">
              <h3 className="font-serif text-2xl text-white font-normal flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#C8A97E]" />
                <span>Signature Journey Highlights</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-light">
                {packageItem.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 text-white/80">
                    <Check className="w-4 h-4 text-[#C8A97E] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{h}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Day-by-Day Comprehensive Itinerary Accordion (Section 11) */}
            <section id="itinerary">
              <ItineraryAccordion
                itinerary={packageItem.itinerary}
                packageName={packageItem.name}
              />
            </section>

            {/* Inclusions & Exclusions (Section 10) */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Inclusions */}
              <div className="rounded-3xl bg-[#0B0D12] border border-white/[0.06] p-8 space-y-5">
                <h3 className="font-serif text-xl text-emerald-400 font-normal flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>What Is Included</span>
                </h3>
                <ul className="space-y-3 text-xs text-white/70 font-light">
                  {packageItem.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="rounded-3xl bg-[#0B0D12] border border-white/[0.06] p-8 space-y-5">
                <h3 className="font-serif text-xl text-white/70 font-normal flex items-center gap-2">
                  <X className="w-4 h-4 text-white/40" />
                  <span>Exclusions & Extras</span>
                </h3>
                <ul className="space-y-3 text-xs text-white/60 font-light">
                  {packageItem.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5 shrink-0" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Useful Trip Logistics & Disclaimers (Section 10) */}
            <section className="rounded-3xl bg-[#0B0D12] border border-white/[0.06] p-8 sm:p-10 space-y-8">
              <h3 className="font-serif text-2xl text-white font-normal flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#C8A97E]" />
                <span>Voyage Logistics & Policies</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs text-white/70 font-light">
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block">
                    Meeting Point & Arrival
                  </span>
                  <p className="leading-relaxed">{packageItem.meetingPoint}</p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block">
                    Pacing & Fitness Level
                  </span>
                  <p className="leading-relaxed">{packageItem.activityLevel} – Suitable for {packageItem.suitableFor.join(', ')}</p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block">
                    Accessibility & Terrain
                  </span>
                  <p className="leading-relaxed">{packageItem.accessibilityNotes}</p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block">
                    Cancellation & Refund Terms
                  </span>
                  <p className="leading-relaxed">{packageItem.cancellationPolicy}</p>
                </div>
              </div>

              {/* Visa Disclaimer Note */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs text-white/60 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-[#C8A97E] shrink-0 mt-0.5" />
                <p className="leading-relaxed font-light">
                  <strong className="text-white font-medium">Entry Disclosures:</strong> {packageItem.visaNotice} Arab & Beyond provides complimentary visa validation and private arrival protocol for all confirmed bookings.
                </p>
              </div>
            </section>

            {/* Linked Hotels Featured on this Journey */}
            {linkedHotels.length > 0 && (
              <section className="space-y-8">
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A97E] font-mono">
                    Accommodations
                  </span>
                  <h3 className="font-serif text-3xl text-white font-light tracking-tight">
                    Sanctuaries on This Journey
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {linkedHotels.map((hotel) => (
                    <HotelCard key={hotel.id} hotel={hotel} />
                  ))}
                </div>
              </section>
            )}

            {/* Related Packages */}
            {relatedPackages.length > 0 && (
              <section className="space-y-8 pt-10 border-t border-white/[0.06]">
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A97E] font-mono">
                    Related Itineraries
                  </span>
                  <h3 className="font-serif text-3xl text-white font-light tracking-tight">
                    Other Journeys in {packageItem.destinationName}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {relatedPackages.map((pkg) => (
                    <PackageCard key={pkg.id} packageItem={pkg} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column (4 cols): Sticky Booking / Enquiry Card */}
          <div className="lg:col-span-4">
            <BookingStickyCard packageItem={packageItem} />
          </div>
        </div>
      </div>

      <WhatsAppButton
        contextDestination={packageItem.destinationName}
        contextProduct={packageItem.name}
      />
    </div>
  );
}
