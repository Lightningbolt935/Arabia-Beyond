'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Package } from '@/lib/types';
import { useTravelStore } from '@/lib/store';
import { formatPrice, formatDate } from '@/lib/utils';
import {
  Calendar,
  Users,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  PhoneCall,
  MessageSquare,
  Lock,
  X,
  CheckCircle2
} from 'lucide-react';

interface BookingStickyCardProps {
  packageItem: Package;
}

export default function BookingStickyCard({ packageItem }: BookingStickyCardProps) {
  const router = useRouter();
  const { currency, settings, addEnquiry } = useTravelStore();

  const [selectedDateId, setSelectedDateId] = useState<string>(
    packageItem.departureDates[0]?.id || ''
  );
  const [adults, setAdults] = useState<number>(2);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  // Quick Enquiry Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const selectedDate = packageItem.departureDates.find((d) => d.id === selectedDateId);
  const baseRate = selectedDate ? selectedDate.pricePerPerson : packageItem.priceFrom;
  const totalPrice = baseRate * adults;
  const depositAmount = Math.round(totalPrice * 0.2); // 20% deposit standard

  // WhatsApp Pre-filled link
  const cleanPhone = settings.whatsAppNumber.replace(/[^0-9]/g, '');
  const waMsg = encodeURIComponent(
    `Hello Arab & Beyond Concierge, I am interested in reserving "${packageItem.name}" (${packageItem.destinationName}) for ${adults} guests. Could you please advise on dates and private arrangements?`
  );
  const waUrl = `https://wa.me/${cleanPhone}?text=${waMsg}`;

  const handleProceedBooking = () => {
    router.push(
      `/checkout?type=package&id=${packageItem.id}&dateId=${selectedDateId}&adults=${adults}`
    );
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    addEnquiry({
      customerName: name,
      email,
      phone: phone || '+44 000 0000',
      destinationId: packageItem.destinationId,
      destinationName: packageItem.destinationName,
      packageId: packageItem.id,
      packageName: packageItem.name,
      travelDatesType: selectedDate ? 'exact' : 'flexible',
      startDate: selectedDate?.startDate,
      endDate: selectedDate?.endDate,
      adultsCount: adults,
      childrenCount: 0,
      preferredContactMethod: 'Email',
      requirements: notes || `Direct enquiry for ${packageItem.name}`,
      sourcePage: `/packages/${packageItem.slug}`,
      enquiryChannel: 'Package Page',
      priority: 'VIP'
    });

    setEnquirySuccess(true);
    setTimeout(() => {
      setShowEnquiryModal(false);
      setEnquirySuccess(false);
    }, 2800);
  };

  return (
    <>
      {/* Desktop Sticky Card */}
      <div className="rounded-3xl bg-[#0B0D12]/95 backdrop-blur-2xl border border-white/[0.08] p-7 shadow-2xl space-y-6 sticky top-28">
        {/* Price Header */}
        <div className="pb-5 border-b border-white/[0.06] space-y-1">
          <div className="text-[10px] uppercase font-mono tracking-widest text-white/40">
            {packageItem.isPriceOnRequest ? 'Bespoke Quote' : 'From Rate (Per Person)'}
          </div>
          {packageItem.isPriceOnRequest ? (
            <div className="text-2xl font-serif text-[#E5D1B8] font-normal">
              Price on Request
            </div>
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl sm:text-4xl font-normal text-white tracking-tight">
                {formatPrice(baseRate, currency)}
              </span>
              <span className="text-xs text-white/50 font-light">/ person</span>
            </div>
          )}
          <p className="text-[11px] text-[#C8A97E] flex items-center gap-1.5 pt-1 font-light">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Includes 5-star palace stays & private chauffeur</span>
          </p>
        </div>

        {/* Departure Dates Selector */}
        {packageItem.departureDates && packageItem.departureDates.length > 0 && (
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Departure Window
              </span>
              <span className="text-white/40">or flexible</span>
            </label>
            <select
              value={selectedDateId}
              onChange={(e) => setSelectedDateId(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3 text-xs text-white focus:border-[#C8A97E] focus:outline-none cursor-pointer"
            >
              {packageItem.departureDates.map((d) => (
                <option key={d.id} value={d.id} className="bg-[#0B0D12] text-white">
                  {formatDate(d.startDate)} – {formatDate(d.endDate)} ({formatPrice(d.pricePerPerson, currency)} pp)
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Guests Count Selector */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] flex items-center gap-1">
            <Users className="w-3 h-3" />
            Number of Voyagers
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setAdults(num)}
                className={`py-2.5 rounded-xl text-xs font-medium transition-all ${
                  adults === num
                    ? 'bg-gradient-to-r from-[#C8A97E] to-[#DFC9AA] text-black font-semibold shadow-md'
                    : 'bg-white/[0.03] text-white/70 hover:text-white border border-white/10'
                }`}
              >
                {num} {num === 1 ? 'Guest' : 'Guests'}
              </button>
            ))}
          </div>
        </div>

        {/* Price Breakdown Calculation */}
        {!packageItem.isPriceOnRequest && (
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2 text-xs font-light">
            <div className="flex items-center justify-between text-white/70">
              <span>{adults} × Voyagers ({formatPrice(baseRate, currency)})</span>
              <span className="font-mono text-white">{formatPrice(totalPrice, currency)}</span>
            </div>
            <div className="flex items-center justify-between text-white/70">
              <span>Deposit Due Now (20%)</span>
              <span className="font-mono text-[#E5D1B8] font-medium">{formatPrice(depositAmount, currency)}</span>
            </div>
            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between font-normal">
              <span className="text-white">Indicative Total</span>
              <span className="text-sm text-white font-mono">{formatPrice(totalPrice, currency)}</span>
            </div>
          </div>
        )}

        {/* Primary Booking & Enquiry Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleProceedBooking}
            className="w-full py-4 rounded-full bg-gradient-to-r from-[#C8A97E] to-[#DFC9AA] hover:brightness-105 text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-[#C8A97E]/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Proceed to Reservation</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={() => setShowEnquiryModal(true)}
            className="w-full py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white font-medium text-xs uppercase tracking-[0.2em] border border-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#C8A97E]" />
            <span>Enquire / Tailor Itinerary</span>
          </button>

          {/* WhatsApp Direct Link */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-full bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-300 font-medium text-[11px] uppercase tracking-wider border border-emerald-500/20 transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>Instant WhatsApp Concierge</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="pt-3 border-t border-white/[0.06] space-y-2 text-[11px] text-white/40 font-light">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C8A97E] shrink-0" />
            <span>Statutory UK Package Travel Regulation Protection</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C8A97E] shrink-0" />
            <span>No payment capture prior to concierge supplier verification</span>
          </div>
        </div>
      </div>

      {/* Mobile Floating Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#060709]/95 backdrop-blur-2xl border-t border-white/10 p-4 flex items-center justify-between gap-3 shadow-2xl print:hidden">
        <div>
          <div className="text-[10px] text-white/50 uppercase font-mono">From</div>
          <div className="font-serif text-lg font-bold text-white">
            {formatPrice(baseRate, currency)} <span className="text-[10px] font-sans font-normal text-white/60">pp</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowEnquiryModal(true)}
            className="px-4 py-2.5 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider border border-white/20"
          >
            Enquire
          </button>
          <button
            onClick={handleProceedBooking}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C8A97E] to-[#DFC9AA] text-black text-xs font-semibold uppercase tracking-wider shadow-lg"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Quick Enquiry Modal */}
      {showEnquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4">
          <div className="bg-[#0B0D12] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 relative shadow-2xl">
            <button
              onClick={() => setShowEnquiryModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 text-white/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            {enquirySuccess ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#C8A97E] mx-auto animate-bounce" />
                <h3 className="font-serif text-2xl text-white font-normal">Enquiry Received</h3>
                <p className="text-xs text-white/60 max-w-sm mx-auto">
                  A senior Arabian Travel Designer will review your preferences and contact you within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E]">Direct Atelier Request</span>
                  <h3 className="font-serif text-2xl text-white font-normal">Tailor &quot;{packageItem.name}&quot;</h3>
                  <p className="text-xs text-white/50">Speak directly with a specialist about custom dates, private flights, or room upgrades.</p>
                </div>

                <form onSubmit={handleEnquirySubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="text-white/70 block mb-1 font-mono uppercase text-[10px]">Your Full Name *</label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Lord Harrington"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:border-[#C8A97E] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-white/70 block mb-1 font-mono uppercase text-[10px]">Email Address *</label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="client@mayfair.co.uk"
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:border-[#C8A97E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-white/70 block mb-1 font-mono uppercase text-[10px]">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+44 7700 900000"
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:border-[#C8A97E] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-white/70 block mb-1 font-mono uppercase text-[10px]">Bespoke Requests / Preferred Dates</label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Special dietary wishes, private aviation, suite category preferences..."
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:border-[#C8A97E] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#C8A97E] to-[#DFC9AA] text-black font-semibold uppercase tracking-[0.2em] text-xs hover:brightness-105 transition-all shadow-lg"
                  >
                    Submit Direct Concierge Request
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
