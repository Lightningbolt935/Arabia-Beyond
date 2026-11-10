'use client';

import React, { useState } from 'react';
import { ItineraryDay } from '@/lib/types';
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Utensils,
  Printer,
  Sparkles
} from 'lucide-react';

interface ItineraryAccordionProps {
  itinerary: ItineraryDay[];
  packageName: string;
}

export default function ItineraryAccordion({ itinerary, packageName }: ItineraryAccordionProps) {
  // Open Day 1 and Day 2 by default
  const [openDays, setOpenDays] = useState<number[]>([1, 2]);

  const toggleDay = (dayNum: number) => {
    setOpenDays((prev) =>
      prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum]
    );
  };

  const expandAll = () => {
    setOpenDays(itinerary.map((d) => d.dayNumber));
  };

  const collapseAll = () => {
    setOpenDays([]);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Expand/Print Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-white/[0.06] gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C8A97E] font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Schedule</span>
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl text-white font-light tracking-tight">
            Day-by-Day Journey
          </h3>
          <p className="text-xs text-white/50 font-light">
            {itinerary.length} choreographed days • Private guided expeditions, palace stays & seamless logistics
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={expandAll}
            className="px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-[11px] font-mono tracking-wider text-white/70 hover:text-white border border-white/10 transition-colors"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-[11px] font-mono tracking-wider text-white/70 hover:text-white border border-white/10 transition-colors"
          >
            Collapse All
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#C8A97E]/10 hover:bg-[#C8A97E]/20 text-[#E5D1B8] text-[11px] font-mono tracking-wider border border-[#C8A97E]/30 transition-colors print:hidden"
            title="Print or save as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {itinerary.map((day) => {
          const isOpen = openDays.includes(day.dayNumber);

          return (
            <div
              key={day.dayNumber}
              className={`rounded-3xl border transition-all duration-500 overflow-hidden ${
                isOpen
                  ? 'bg-[#0B0D12]/95 border-[#C8A97E]/40 shadow-2xl'
                  : 'bg-[#080A0E]/70 border-white/[0.06] hover:border-white/15'
              }`}
            >
              {/* Accordion Trigger Header */}
              <button
                onClick={() => toggleDay(day.dayNumber)}
                className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-6 focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-6">
                  {/* Sleek Minimalist Day Indicator */}
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 text-[#E5D1B8] flex flex-col items-center justify-center shrink-0">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-[#C8A97E]">Day</span>
                    <span className="font-serif text-lg font-light leading-none">{day.dayNumber < 10 ? `0${day.dayNumber}` : day.dayNumber}</span>
                  </div>

                  {/* Day Heading & Preview */}
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#C8A97E] font-mono">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {day.location}
                      </span>
                      {day.overnightLocation && (
                        <span className="text-white/40">• Overnight: {day.overnightLocation}</span>
                      )}
                    </div>
                    <h4 className="font-serif text-lg sm:text-xl text-white font-normal">
                      {day.title}
                    </h4>
                    {!isOpen && (
                      <p className="text-xs text-white/50 line-clamp-1 font-light">
                        {day.summary}
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 text-white/60 flex items-center justify-center shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Accordion Expanded Content */}
              {isOpen && (
                <div className="px-6 pb-7 sm:px-7 space-y-6 pt-2 border-t border-white/[0.04] animate-in fade-in duration-300">
                  {/* Image Gallery for Day */}
                  {day.images && day.images.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {day.images.map((img, idx) => (
                        <div key={idx} className="relative h-60 rounded-2xl overflow-hidden border border-white/10 group">
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url(${img.url})` }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          <div className="absolute bottom-3 left-4 right-4 text-[11px] text-white/90 font-light truncate">
                            {img.caption}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Multi-Paragraph Narrative Description */}
                  <div className="space-y-3 text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                    {day.description.map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Morning / Afternoon / Evening Schedule (Section 11) */}
                  {day.schedule && (
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
                      {day.schedule.morning && (
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block">
                            Morning
                          </span>
                          <p className="text-white/70 font-light leading-relaxed">{day.schedule.morning}</p>
                        </div>
                      )}
                      {day.schedule.afternoon && (
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block">
                            Afternoon
                          </span>
                          <p className="text-white/70 font-light leading-relaxed">{day.schedule.afternoon}</p>
                        </div>
                      )}
                      {day.schedule.evening && (
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block">
                            Evening
                          </span>
                          <p className="text-white/70 font-light leading-relaxed">{day.schedule.evening}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Day Logistics Chips */}
                  <div className="pt-3 border-t border-white/[0.04] flex flex-wrap gap-5 text-xs text-white/50 font-light">
                    {day.mealsIncluded && day.mealsIncluded.length > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Utensils className="w-3.5 h-3.5 text-[#C8A97E]" />
                        <span>Included Meals: {day.mealsIncluded.join(', ')}</span>
                      </div>
                    )}
                    {day.hotelName && (
                      <div className="text-white/70">
                        Stay: <strong className="font-normal text-[#E5D1B8]">{day.hotelName}</strong>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
