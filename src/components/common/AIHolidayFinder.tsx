'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTravelStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import {
  Sparkles,
  Compass,
  Calendar,
  Users,
  CheckCircle2,
  X,
  ArrowRight,
  RotateCcw,
  Heart,
  Clock,
  MapPin
} from 'lucide-react';

interface AIHolidayFinderProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIHolidayFinder({ isOpen, onClose }: AIHolidayFinderProps) {
  const { packages, destinations, currency } = useTravelStore();

  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState({
    partyType: '', // 'couples', 'solo', 'family', 'group'
    vibe: '', // 'marine', 'desert', 'culture', 'mountain'
    duration: '', // 'short', 'medium', 'grand'
    pace: '' // 'relaxed', 'balanced', 'active'
  });

  const [matches, setMatches] = useState<any[]>([]);

  if (!isOpen) return null;

  const handleComputeMatches = () => {
    // Grounded ranking algorithm across genuine catalog products (Section 27)
    const scored = packages.map((pkg) => {
      let score = 50; // base score

      // Vibe matching
      if (answers.vibe === 'marine' && (pkg.travelStyle === 'Wellness & Marine' || pkg.destinationSlug === 'the-red-sea' || pkg.destinationSlug === 'bahrain')) {
        score += 35;
      }
      if (answers.vibe === 'desert' && (pkg.travelStyle === 'Desert Expedition' || pkg.destinationSlug === 'oman' || pkg.destinationSlug === 'saudi-arabia')) {
        score += 35;
      }
      if (answers.vibe === 'culture' && (pkg.travelStyle === 'Cultural Discovery' || pkg.destinationSlug === 'qatar' || pkg.destinationSlug === 'saudi-arabia' || pkg.destinationSlug === 'bahrain')) {
        score += 35;
      }
      if (answers.vibe === 'mountain' && (pkg.destinationSlug === 'oman')) {
        score += 40;
      }

      // Duration matching
      if (answers.duration === 'short' && pkg.durationDays <= 4) score += 25;
      if (answers.duration === 'medium' && pkg.durationDays >= 5 && pkg.durationDays <= 6) score += 25;
      if (answers.duration === 'grand' && pkg.durationDays >= 7) score += 25;

      // Party matching
      if (answers.partyType === 'couples' && (pkg.suitableFor.includes('Couples') || pkg.suitableFor.includes('Honeymooners'))) {
        score += 15;
      }
      if (answers.partyType === 'family' && pkg.suitableFor.includes('Families')) {
        score += 20;
      }

      // Normalized match percentage
      const matchPct = Math.min(99, Math.round(score));
      return { pkg, matchPct };
    });

    scored.sort((a, b) => b.matchPct - a.matchPct);
    setMatches(scored.slice(0, 3));
    setStep(5);
  };

  const handleReset = () => {
    setAnswers({
      partyType: '',
      vibe: '',
      duration: '',
      pace: ''
    });
    setStep(1);
    setMatches([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="w-full max-w-2xl rounded-3xl bg-[#0B0D12]/95 border border-white/[0.08] p-7 sm:p-10 shadow-2xl relative text-white space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#C8A97E]/10 border border-[#C8A97E]/30 flex items-center justify-center text-[#C8A97E]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block">
                Intelligent Concierge
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
                AI Holiday Matchmaker
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-white/40 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator (Steps 1 to 4) */}
        {step <= 4 && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider text-white/40">
              <span>Step {step} of 4</span>
              <span>Grounded in Real Inventory</span>
            </div>
            <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#C8A97E] to-[#DFC9AA] transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Step 1: Party Type */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <h4 className="font-serif text-xl text-white">
              Who will be travelling on this journey?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                { id: 'couples', label: 'Couples / Honeymoon', desc: 'Secluded villas, romantic dining & private sunset sailing' },
                { id: 'solo', label: 'Solo Discerning Voyager', desc: 'Tailored cultural immersion, luxury spas & private guides' },
                { id: 'family', label: 'Family with Children', desc: 'Spacious interconnected suites, shallow lagoons & wildlife' },
                { id: 'group', label: 'Small Private Group', desc: 'Multi-room villa takeovers & private chartered 4WD convoy' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setAnswers({ ...answers, partyType: opt.id });
                    setStep(2);
                  }}
                  className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#C5A880]/50 text-left transition-all space-y-1 group"
                >
                  <span className="font-semibold text-white group-hover:text-[#DFC9AA] block">
                    {opt.label}
                  </span>
                  <span className="text-white/50 text-[11px] block leading-relaxed">
                    {opt.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Ambiance & Vibe */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <h4 className="font-serif text-xl text-white">
              What primary natural setting calls to you?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                { id: 'marine', label: 'Overwater Sanctuary & Reefs', desc: 'Turquoise lagoons, overwater coral villas & seaplanes (The Red Sea)' },
                { id: 'mountain', label: 'Grand Mountain Canyons', desc: 'Crisp high-altitude air, clifftop infinity pools & wadis (Oman)' },
                { id: 'desert', label: 'Golden Dunes & Stargazing', desc: 'Endless red sands, luxury Bedouin camps & fire pits (Wahiba / AlUla)' },
                { id: 'culture', label: 'Ancient Archaeology & Art', desc: 'Nabataean Hegra tombs, UNESCO pearling alleys & museums' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setAnswers({ ...answers, vibe: opt.id });
                    setStep(3);
                  }}
                  className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#C5A880]/50 text-left transition-all space-y-1 group"
                >
                  <span className="font-semibold text-white group-hover:text-[#DFC9AA] block">
                    {opt.label}
                  </span>
                  <span className="text-white/50 text-[11px] block leading-relaxed">
                    {opt.desc}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(1)}
              className="text-xs text-white/40 hover:text-white pt-2"
            >
              ← Back
            </button>
          </div>
        )}

        {/* Step 3: Duration */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <h4 className="font-serif text-xl text-white">
              How much time do you wish to dedicate?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {[
                { id: 'short', label: 'Short Break (3–4 Days)', desc: 'Ideal for weekend relaxation in Manama or Doha' },
                { id: 'medium', label: 'Week Escape (5–6 Days)', desc: 'Perfect for AlUla & Riyadh or Red Sea retreats' },
                { id: 'grand', label: 'Grand Expedition (7+ Days)', desc: 'The definitive 7-day Muscat, Mountains & Desert odyssey' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setAnswers({ ...answers, duration: opt.id });
                    setStep(4);
                  }}
                  className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#C5A880]/50 text-left transition-all space-y-1 group"
                >
                  <span className="font-semibold text-white group-hover:text-[#DFC9AA] block">
                    {opt.label}
                  </span>
                  <span className="text-white/50 text-[11px] block leading-relaxed">
                    {opt.desc}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              className="text-xs text-white/40 hover:text-white pt-2"
            >
              ← Back
            </button>
          </div>
        )}

        {/* Step 4: Travel Pace */}
        {step === 4 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <h4 className="font-serif text-xl text-white">
              What is your desired rhythm of travel?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {[
                { id: 'relaxed', label: 'Pure Leisure & Spa', desc: 'Minimal transfers, maximum beach and restorative wellness time' },
                { id: 'balanced', label: 'Balanced Discovery', desc: 'Morning private tours, afternoon poolside leisure, evening fine dining' },
                { id: 'active', label: 'Active Exploration', desc: 'Canyon hiking, dune bashing, diving, and daily monument exploration' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setAnswers({ ...answers, pace: opt.id });
                    handleComputeMatches();
                  }}
                  className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#C5A880]/50 text-left transition-all space-y-1 group"
                >
                  <span className="font-semibold text-white group-hover:text-[#DFC9AA] block">
                    {opt.label}
                  </span>
                  <span className="text-white/50 text-[11px] block leading-relaxed">
                    {opt.desc}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(3)}
              className="text-xs text-white/40 hover:text-white pt-2"
            >
              ← Back
            </button>
          </div>
        )}

        {/* Step 5: Matches Results Screen (Section 27) */}
        {step === 5 && (
          <div className="space-y-6 animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E]">
                  Grounded Recommendation
                </span>
                <h4 className="font-serif text-2xl text-white font-normal">
                  Your Top Arabian Matches
                </h4>
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white font-mono"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Start Over</span>
              </button>
            </div>

            <div className="space-y-3">
              {matches.map(({ pkg, matchPct }, idx) => (
                <div
                  key={pkg.id}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#C8A97E]/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-16 h-16 rounded-xl bg-cover bg-center shrink-0 border border-white/10"
                      style={{ backgroundImage: `url(${pkg.heroImage})` }}
                    />
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white">{pkg.name}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-mono text-[10px] border border-emerald-500/20">
                          {matchPct}% Match
                        </span>
                      </div>
                      <div className="text-[11px] text-[#E5D1B8] font-mono">
                        {pkg.destinationName} • {pkg.durationDays}D / {pkg.durationNights}N
                      </div>
                      <div className="text-[11px] text-white/50 line-clamp-1 font-light">
                        {pkg.shortSummary}
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto shrink-0 gap-2">
                    <div className="font-serif text-base font-bold text-white">
                      From {formatPrice(pkg.priceFrom, currency)}
                    </div>
                    <Link
                      href={`/packages/${pkg.slug}`}
                      onClick={onClose}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-gradient-to-r from-[#C8A97E] to-[#DFC9AA] text-black font-semibold text-xs uppercase tracking-wider hover:brightness-105 transition-all shadow-md"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-white/40 text-center font-light">
              All prices and dates reflect verified published records. No synthetic prices generated.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
