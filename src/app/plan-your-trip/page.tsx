'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTravelStore } from '@/lib/store';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import {
  Sparkles,
  Compass,
  Calendar,
  Users,
  CheckCircle2,
  ShieldCheck,
  Send
} from 'lucide-react';

function PlanYourTripContent() {
  const searchParams = useSearchParams();
  const prefillDest = searchParams?.get('destination') || '';
  const { destinations, addEnquiry } = useTravelStore();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successReference, setSuccessReference] = useState<string | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: prefillDest || 'all-flexible',
    travelDatesType: 'flexible' as 'exact' | 'approximate' | 'flexible',
    startDate: '',
    endDate: '',
    adultsCount: 2,
    childrenCount: 0,
    childrenAges: '',
    roomsCount: 1,
    budgetRange: '£7,000 - £12,000',
    preferredContactMethod: 'Email' as 'Email' | 'Phone' | 'WhatsApp',
    holidayVibe: 'Romantic Luxury & Marine Island',
    requirements: '',
    consent: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate submission (Section 15)
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);

    const destObj = destinations.find((d) => d.slug === formData.destination);
    const destinationName = destObj ? destObj.name : 'Multiple / Flexible Arabia';

    const newEnquiry = addEnquiry({
      customerName: formData.name,
      email: formData.email,
      phone: formData.phone || '+44 (0) 20 7000 0000',
      destinationId: destObj?.id,
      destinationName,
      travelDatesType: formData.travelDatesType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      adultsCount: formData.adultsCount,
      childrenCount: formData.childrenCount,
      childrenAges: formData.childrenAges,
      roomsCount: formData.roomsCount,
      budgetRange: formData.budgetRange,
      preferredContactMethod: formData.preferredContactMethod,
      requirements: `[Style: ${formData.holidayVibe}] ${formData.requirements}`,
      sourcePage: '/plan-your-trip',
      enquiryChannel: 'Tailor-Made Planner',
      priority: 'VIP'
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessReference(newEnquiry.referenceId);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }, 800);
  };

  return (
    <div className="pt-28 pb-28 bg-[#F5F5F7] text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Plan Your Journey' }]} />

        {successReference ? (
          /* Success Confirmation Page (Section 15) */
          <div className="rounded-3xl bg-[#0B0D12] border border-[#C8A97E]/40 p-8 sm:p-14 text-center my-10 space-y-6 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-emerald-500/15 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-3 max-w-lg mx-auto">
              <span className="text-[10px] uppercase tracking-widest text-[#C8A97E] font-mono">
                Enquiry Successfully Registered
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-light tracking-tight">
                Your Bespoke Request Is In Progress
              </h2>
              <div className="inline-block px-5 py-2 rounded-full bg-black/60 border border-white/10 text-xs font-mono text-[#E5D1B8] my-3">
                Reference ID: <strong className="font-semibold text-white">{successReference}</strong>
              </div>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">
                Thank you, {formData.name}. A senior Arabian travel designer from our Mayfair desk has received your exact specifications. We will curate a tailored proposal with transparent line-item pricing and private flight/resort options within 24 hours.
              </p>
            </div>

            <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/packages"
                className="px-8 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-medium uppercase tracking-[0.2em] border border-white/10 transition-colors"
              >
                Browse Inspiring Packages
              </a>
              <a
                href="/"
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C8A97E] to-[#DFC9AA] text-black text-xs font-semibold uppercase tracking-[0.2em] transition-all hover:scale-105"
              >
                Return to Home
              </a>
            </div>
          </div>
        ) : (
          /* Multi-Step Interactive Luxury Planner */
          <div className="my-10 space-y-10">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C8A97E] font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bespoke Arabian Atelier</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight leading-[1.1]">
                Plan Your Private Voyage
              </h1>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">
                Entrust us with your party desires, tempo, and timeframe. Our specialists craft private luxury packages, chartered transfers, and exclusive villa takeovers.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-3xl bg-[#0B0D12] border border-white/[0.06] p-8 sm:p-14 shadow-2xl space-y-10"
            >
              {/* Destination & Vibe */}
              <div className="space-y-5">
                <h3 className="font-serif text-2xl text-white font-normal flex items-center gap-2.5">
                  <Compass className="w-4 h-4 text-[#C8A97E]" />
                  <span>1. Destination & Ambition</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block mb-2">
                      Destination Focus
                    </label>
                    <select
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 text-white focus:border-[#C8A97E] focus:outline-none cursor-pointer"
                    >
                      <option value="all-flexible">Grand Arabian Multi-Destination</option>
                      {destinations.map((d) => (
                        <option key={d.id} value={d.slug}>{d.name} ({d.country})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block mb-2">
                      Travel Style
                    </label>
                    <select
                      value={formData.holidayVibe}
                      onChange={(e) => setFormData({ ...formData, holidayVibe: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 text-white focus:border-[#C8A97E] focus:outline-none cursor-pointer"
                    >
                      <option value="Romantic Luxury & Marine Island">Romantic Luxury & Marine Island</option>
                      <option value="Ancient Culture & Archaeological Tombs">Ancient Culture & Archaeological Tombs</option>
                      <option value="Desert Lodge & High Mountain Trekking">Desert Lodge & High Mountain Trekking</option>
                      <option value="Family Private Villa Sanctuary">Family Private Villa Sanctuary</option>
                      <option value="Wellness & Frankincense Thalasso Retreat">Wellness & Frankincense Thalasso Retreat</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Timing & Party Size */}
              <div className="space-y-5 pt-8 border-t border-white/[0.04]">
                <h3 className="font-serif text-2xl text-white font-normal flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#C8A97E]" />
                  <span>2. Travel Timeframe & Party Size</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block mb-2">
                      Date Preference
                    </label>
                    <select
                      value={formData.travelDatesType}
                      onChange={(e) => setFormData({ ...formData, travelDatesType: e.target.value as any })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 text-white focus:border-[#C8A97E] focus:outline-none cursor-pointer"
                    >
                      <option value="flexible">Flexible Window (Optimal Weather)</option>
                      <option value="approximate">Approximate Month</option>
                      <option value="exact">Specific Fixed Dates</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block mb-2">
                      Number of Adults
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={formData.adultsCount}
                      onChange={(e) => setFormData({ ...formData, adultsCount: parseInt(e.target.value) || 1 })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 text-white focus:border-[#C8A97E] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block mb-2">
                      Children (under 12)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={10}
                      value={formData.childrenCount}
                      onChange={(e) => setFormData({ ...formData, childrenCount: parseInt(e.target.value) || 0 })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 text-white focus:border-[#C8A97E] focus:outline-none"
                    />
                  </div>
                </div>

                {formData.travelDatesType === 'exact' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs pt-2">
                    <div>
                      <label className="text-[10px] text-white/50 block mb-1.5 font-mono uppercase">Departure Date</label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-3 text-white focus:border-[#C8A97E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-white/50 block mb-1.5 font-mono uppercase">Return Date</label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-3 text-white focus:border-[#C8A97E] focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Guest Details & Contact */}
              <div className="space-y-5 pt-8 border-t border-white/[0.04]">
                <h3 className="font-serif text-2xl text-white font-normal flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-[#C8A97E]" />
                  <span>3. Contact & Bespoke Desires</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lord Charles Harrington"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 text-white focus:border-[#C8A97E] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="c.harrington@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 text-white focus:border-[#C8A97E] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+44 7700 900123"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 text-white focus:border-[#C8A97E] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs pt-2">
                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block mb-2">
                      Indicative Budget (Per Person)
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 text-white focus:border-[#C8A97E] focus:outline-none cursor-pointer"
                    >
                      <option value="£4,000 - £7,000">£4,000 - £7,000 per person</option>
                      <option value="£7,000 - £12,000">£7,000 - £12,000 per person</option>
                      <option value="£12,000+ (Ultra Luxury / Private Jet)">£12,000+ per person (Palace / Private Jet)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block mb-2">
                      Preferred Communication Channel
                    </label>
                    <div className="flex gap-2">
                      {['Email', 'Phone', 'WhatsApp'].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setFormData({ ...formData, preferredContactMethod: m as any })}
                          className={`flex-1 py-3.5 rounded-2xl font-medium text-xs transition-all ${
                            formData.preferredContactMethod === m
                              ? 'bg-gradient-to-r from-[#C8A97E] to-[#DFC9AA] text-black font-semibold shadow-md'
                              : 'bg-white/[0.03] text-white/70 hover:text-white border border-white/10'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block mb-2">
                    Specific Aspirations, Celebrations or Logistics Wishes
                  </label>
                  <textarea
                    rows={4}
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    placeholder="E.g. We are celebrating an anniversary. We would love a private catamaran day in Oman, followed by 3 nights in an overwater villa at The Red Sea with seaplane transfers..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-xs text-white placeholder-white/40 focus:border-[#C8A97E] focus:outline-none resize-none leading-relaxed font-light"
                  />
                </div>

                <label className="flex items-start gap-3 cursor-pointer text-xs text-white/50 pt-2 font-light">
                  <input
                    type="checkbox"
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 rounded border-white/20 bg-white/5 text-[#C8A97E] focus:ring-0"
                  />
                  <span>
                    I agree to the processing of my travel details in accordance with Arab & Beyond’s Privacy Policy. We never share client records with third parties.
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-xs text-white/40 flex items-center gap-2 font-light">
                  <ShieldCheck className="w-4 h-4 text-[#C8A97E]" />
                  <span>Complimentary consultation with zero obligation</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-[#C8A97E] to-[#DFC9AA] hover:brightness-105 text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-xl shadow-[#C8A97E]/20 flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-105"
                >
                  {isSubmitting ? (
                    <span>Registering Itinerary Request...</span>
                  ) : (
                    <>
                      <span>Submit Bespoke Request</span>
                      <Send className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PlanYourTripPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F5F7] text-white pt-32 text-center">Loading travel planner...</div>}>
      <PlanYourTripContent />
    </Suspense>
  );
}
