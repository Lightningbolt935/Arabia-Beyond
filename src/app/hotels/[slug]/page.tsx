'use client';

import React, { useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useTravelStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import PackageCard from '@/components/packages/PackageCard';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import ImageLightbox from '@/components/common/ImageLightbox';
import {
  MapPin,
  Check,
  Sparkles,
  Clock,
  ArrowRight,
  Maximize2
} from 'lucide-react';

export default function HotelDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const { hotels, packages, currency } = useTravelStore();

  const hotel = hotels.find((h) => h.slug === slug);
  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    hotel?.roomTypes[0]?.id || ''
  );
  const [nights, setNights] = useState<number>(3);
  const [guests, setGuests] = useState<number>(2);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!hotel) {
    notFound();
  }

  const selectedRoom = hotel.roomTypes.find((r) => r.id === selectedRoomId) || hotel.roomTypes[0];
  const nightlyRate = selectedRoom ? selectedRoom.pricePerNightFrom : hotel.priceFromPerNight;
  const totalStayPrice = nightlyRate * nights;

  // Relevant packages linking this hotel
  const relevantPackages = packages.filter((p) =>
    hotel.linkedPackageIds.includes(p.id)
  );

  const allImages = [
    { url: hotel.heroImage, caption: hotel.name },
    ...hotel.gallery.map((g) => ({ url: g.url, caption: g.caption }))
  ];

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleRequestBooking = () => {
    router.push(
      `/checkout?type=hotel&id=${hotel.id}&roomId=${selectedRoom.id}&nights=${nights}&guests=${guests}`
    );
  };

  return (
    <div className="bg-[#07090E] text-white pt-24 pb-32 min-h-screen">
      {/* Lightbox Modal */}
      <ImageLightbox
        images={allImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIndex) => setLightboxIndex(newIndex)}
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs
          items={[
            { label: 'Hotels', href: '/hotels' },
            { label: hotel.destinationName, href: `/destinations/${hotel.destinationSlug}` },
            { label: hotel.name }
          ]}
        />
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-white/[0.06]">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-[#C8A97E]/10 text-[#E5D1B8] border border-[#C8A97E]/30 text-[10px] uppercase font-mono tracking-widest">
                {hotel.destinationName} • {hotel.verifiedLuxuryTier}
              </span>
              <span className="px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/70 text-[10px] uppercase font-mono tracking-widest">
                5-Star Verified Sanctuary
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-light leading-[1.1] tracking-tight">
              {hotel.name}
            </h1>

            <div className="flex items-center gap-2 text-xs text-white/60 font-light">
              <MapPin className="w-4 h-4 text-[#C8A97E]" />
              <span>{hotel.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[440px] sm:h-[520px]">
          <div
            onClick={() => handleOpenLightbox(0)}
            className="md:col-span-2 relative rounded-3xl overflow-hidden border border-white/[0.08] group cursor-pointer"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url(${hotel.heroImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute top-5 right-5 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80 group-hover:text-white group-hover:scale-110 transition-all">
              <Maximize2 className="w-4 h-4" />
            </div>
            <div className="absolute bottom-5 left-5 text-[10px] font-mono tracking-widest uppercase text-white/80 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
              Sanctuary Overview • Click to Expand
            </div>
          </div>

          {hotel.gallery.slice(0, 1).map((img, idx) => (
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

      {/* Content & Booking Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
          {/* Left Column (8 cols): Overview, Rooms, Verified Amenities, Policies */}
          <div className="lg:col-span-8 space-y-20">
            {/* Overview */}
            <section className="space-y-4">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C8A97E] font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Property</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-light tracking-tight">
                Architectural Splendour & Heritage
              </h2>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed font-light">
                {hotel.fullOverview}
              </p>
            </section>

            {/* Room Types Showcase (Section 12) */}
            <section className="space-y-8">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A97E] font-mono">
                  Suites & Private Villas
                </span>
                <h3 className="font-serif text-3xl text-white font-light tracking-tight">
                  Select Room Category
                </h3>
              </div>

              <div className="space-y-5">
                {hotel.roomTypes.map((room) => {
                  const isSelected = selectedRoomId === room.id;
                  return (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoomId(room.id)}
                      className={`p-7 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col md:flex-row gap-7 items-center ${
                        isSelected
                          ? 'bg-[#0B0D12] border-[#C8A97E] shadow-2xl'
                          : 'bg-[#080A0E]/80 border-white/[0.06] hover:border-white/15'
                      }`}
                    >
                      <div className="w-full md:w-56 h-44 rounded-2xl overflow-hidden relative shrink-0">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                          style={{ backgroundImage: `url(${room.imageUrl})` }}
                        />
                      </div>

                      <div className="flex-1 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif text-xl sm:text-2xl text-white font-normal">
                            {room.name}
                          </h4>
                          <span className="text-[10px] font-mono text-[#E5D1B8] bg-[#C8A97E]/10 border border-[#C8A97E]/30 px-3 py-1 rounded-full uppercase tracking-wider">
                            {room.boardBasis}
                          </span>
                        </div>

                        <p className="text-xs text-white/60 leading-relaxed font-light">
                          {room.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-white/50 pt-1 font-light">
                          <span>{room.sizeSqM} m²</span>
                          <span>•</span>
                          <span>{room.bedSetup}</span>
                          <span>•</span>
                          <span>Max {room.maxGuests} Guests</span>
                          <span>•</span>
                          <span className="text-[#C8A97E]">{room.view}</span>
                        </div>

                        <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between">
                          <div className="flex items-baseline gap-1">
                            <span className="font-serif text-2xl font-bold text-white tracking-tight">
                              {formatPrice(room.pricePerNightFrom, currency)}
                            </span>
                            <span className="text-[10px] text-white/40 font-mono">/ night</span>
                          </div>

                          <div
                            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#C8A97E] to-[#DFC9AA] text-black shadow-lg shadow-[#C8A97E]/20'
                                : 'bg-white/[0.04] text-white/70 hover:text-white border border-white/10'
                            }`}
                          >
                            {isSelected ? 'Selected Category' : 'Select'}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Verified Amenities */}
            <section className="rounded-3xl bg-[#0B0D12] border border-white/[0.06] p-8 sm:p-10 space-y-6 shadow-2xl">
              <h3 className="font-serif text-2xl text-white font-normal flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#C8A97E]" />
                <span>Verified Resort Amenities</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-light">
                {hotel.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/80">
                    <Check className="w-4 h-4 text-[#C8A97E] shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Policies & Booking Disclaimers */}
            <section className="rounded-3xl bg-[#0B0D12] border border-white/[0.06] p-8 sm:p-10 space-y-6">
              <h3 className="font-serif text-2xl text-white font-normal flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C8A97E]" />
                <span>Check-in & Property Policies</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-white/70 font-light">
                <div className="space-y-1">
                  <strong className="text-white block font-medium">Check-in / Check-out:</strong>
                  <p>{hotel.policies.checkInTime} / {hotel.policies.checkOutTime}</p>
                </div>
                <div className="space-y-1">
                  <strong className="text-white block font-medium">Cancellation Terms:</strong>
                  <p>{hotel.policies.cancellationPolicy}</p>
                </div>
                <div className="space-y-1">
                  <strong className="text-white block font-medium">Child Policy:</strong>
                  <p>{hotel.policies.childPolicy}</p>
                </div>
                <div className="space-y-1">
                  <strong className="text-white block font-medium">Taxes & Levies:</strong>
                  <p>{hotel.policies.taxesAndFees}</p>
                </div>
              </div>
            </section>

            {/* Relevant Packages using this hotel */}
            {relevantPackages.length > 0 && (
              <section className="space-y-8 pt-10 border-t border-white/[0.06]">
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A97E] font-mono">
                    Integrated Journeys
                  </span>
                  <h3 className="font-serif text-3xl text-white font-light tracking-tight">
                    Packages Featuring {hotel.name}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {relevantPackages.map((pkg) => (
                    <PackageCard key={pkg.id} packageItem={pkg} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column (4 cols): Sticky Availability Request Card */}
          <div className="lg:col-span-4">
            <div className="rounded-3xl bg-[#0B0D12]/95 backdrop-blur-2xl border border-white/[0.08] p-7 shadow-2xl space-y-6 sticky top-28">
              <div className="pb-5 border-b border-white/[0.06] space-y-1">
                <div className="text-[10px] uppercase font-mono tracking-widest text-white/40">
                  Nightly Indicative Rate
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl sm:text-4xl font-normal text-white tracking-tight">
                    {formatPrice(nightlyRate, currency)}
                  </span>
                  <span className="text-xs text-white/50 font-light">/ night ({selectedRoom.name})</span>
                </div>
              </div>

              {/* Nights selector */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block">
                  Length of Stay
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[2, 3, 5, 7].map((n) => (
                    <button
                      key={n}
                      onClick={() => setNights(n)}
                      className={`py-2.5 rounded-xl text-xs font-medium transition-all ${
                        nights === n
                          ? 'bg-gradient-to-r from-[#C8A97E] to-[#DFC9AA] text-black font-semibold shadow-md'
                          : 'bg-white/[0.03] text-white/70 hover:text-white border border-white/10'
                      }`}
                    >
                      {n} Nights
                    </button>
                  ))}
                </div>
              </div>

              {/* Total estimation */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2 text-xs font-light">
                <div className="flex justify-between text-white/70">
                  <span>{nights} nights × {formatPrice(nightlyRate, currency)}</span>
                  <span className="font-mono text-white">{formatPrice(totalStayPrice, currency)}</span>
                </div>
                <div className="pt-2 border-t border-white/[0.06] flex justify-between font-normal">
                  <span className="text-white">Estimated Total</span>
                  <span className="text-sm font-bold text-white font-mono">{formatPrice(totalStayPrice, currency)}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={handleRequestBooking}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#C8A97E] to-[#DFC9AA] hover:brightness-105 text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-xl shadow-[#C8A97E]/20 flex items-center justify-center gap-2 hover:scale-[1.02]"
                >
                  <span>Request Sanctuary Reservation</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <p className="text-[11px] text-white/40 text-center leading-relaxed font-light">
                  Direct concierge confirmation • Private arrival arrangements included
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppButton
        contextDestination={hotel.destinationName}
        contextProduct={hotel.name}
      />
    </div>
  );
}
