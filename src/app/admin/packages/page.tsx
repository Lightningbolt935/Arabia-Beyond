'use client';

import React, { useState } from 'react';
import { useTravelStore } from '@/lib/store';
import { Package, ItineraryDay } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import {
  Package as PackageIcon,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Clock,
  Sparkles,
  ExternalLink,
  X,
  CheckCircle2,
  MoveUp,
  MoveDown
} from 'lucide-react';

export default function AdminPackagesPage() {
  const { packages, destinations, hotels, currency, addPackage, updatePackage, deletePackage } = useTravelStore();

  const [editingPkg, setEditingPkg] = useState<Package | null>(null);
  const [successNotice, setSuccessNotice] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'itinerary' | 'pricing'>('details');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPkg) return;

    updatePackage(editingPkg.id, editingPkg);
    setSuccessNotice(true);
    setTimeout(() => {
      setSuccessNotice(false);
      setEditingPkg(null);
    }, 1200);
  };

  const handleAddNewDay = () => {
    if (!editingPkg) return;
    const newDayNum = editingPkg.itinerary.length + 1;
    const newDay: ItineraryDay = {
      dayNumber: newDayNum,
      title: `Day ${newDayNum} - Explore New Horizons`,
      location: editingPkg.destinationName,
      overnightLocation: editingPkg.destinationName,
      summary: 'Explore local sights with private guide and transport.',
      description: ['A wonderful day exploring highlights, local gastronomy, and private scenery.'],
      includedActivities: ['Private guided tour'],
      mealsIncluded: ['Breakfast'],
      transfers: 'Chauffeured vehicle',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1785963643205-21923ef80f0c?auto=format&fit=crop&w=800&q=80',
          caption: 'Day highlights view',
          alt: 'Itinerary day scenery'
        }
      ]
    };

    setEditingPkg({
      ...editingPkg,
      itinerary: [...editingPkg.itinerary, newDay],
      durationDays: editingPkg.durationDays + 1,
      durationNights: editingPkg.durationNights + 1
    });
  };

  const handleDeleteDay = (index: number) => {
    if (!editingPkg) return;
    const updated = editingPkg.itinerary.filter((_, i) => i !== index);
    const renumbered = updated.map((d, i) => ({ ...d, dayNumber: i + 1 }));
    setEditingPkg({
      ...editingPkg,
      itinerary: renumbered,
      durationDays: Math.max(1, renumbered.length),
      durationNights: Math.max(0, renumbered.length - 1)
    });
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-[#C5A880]">
            Itinerary Atelier
          </span>
          <h1 className="font-serif text-3xl text-white font-normal">
            Package & Itinerary Management
          </h1>
          <p className="text-xs text-white/50">
            Publish, edit day-by-day narratives, reorder schedule days, and configure departure rates.
          </p>
        </div>

        <button
          onClick={() => {
            const newPkg: Package = {
              id: `pkg-${Date.now()}`,
              name: 'New Bespoke Arabian Journey',
              slug: `new-journey-${Date.now()}`,
              destinationId: destinations[0].id,
              destinationSlug: destinations[0].slug,
              destinationName: destinations[0].name,
              cities: [destinations[0].name],
              durationDays: 5,
              durationNights: 4,
              travelStyle: 'Luxury Escapes',
              groupType: 'Private Only',
              priceFrom: 2500,
              currency: 'GBP',
              isPriceOnRequest: false,
              status: 'draft',
              isFeatured: false,
              shortSummary: 'An unforgettable private voyage tailored for discerning travelers.',
              fullDescription: 'Experience the finest Arabian luxury with private guides and 5-star sanctuaries.',
              heroImage: 'https://images.unsplash.com/photo-1785963643205-21923ef80f0c?auto=format&fit=crop&w=1200&q=80',
              gallery: [],
              highlights: ['VIP Airport Protocol', '5-Star Luxury Stays'],
              inclusions: ['Luxury accommodation', 'Daily breakfast', 'Private chauffeur'],
              exclusions: ['International flights', 'Gratuities'],
              accommodationsSummary: 'Handpicked 5-star sanctuaries',
              linkedHotelIds: [],
              itinerary: [
                {
                  dayNumber: 1,
                  title: 'Day 1 - Arrival and Luxury Welcome',
                  location: destinations[0].name,
                  overnightLocation: destinations[0].name,
                  summary: 'VIP airport transfer and welcome dinner.',
                  description: ['Arrive and relax in ultimate comfort.'],
                  includedActivities: ['VIP airport escort'],
                  mealsIncluded: ['Dinner'],
                  transfers: 'Mercedes-Benz S-Class',
                  images: []
                }
              ],
              departureDates: [],
              meetingPoint: 'International Airport Arrivals Lounge',
              suitableFor: ['Discerning Travelers', 'Couples'],
              activityLevel: 'Gentle',
              accessibilityNotes: 'Step-free hotel access throughout.',
              visaNotice: 'eVisa applicable.',
              cancellationPolicy: 'Refundable up to 30 days prior.',
              primaryCtaType: 'book_now',
              metaTitle: 'New Luxury Arabian Journey | Arab & Beyond',
              metaDescription: 'Explore our latest private luxury itinerary.'
            };
            addPackage(newPkg);
            setEditingPkg(newPkg);
          }}
          className="px-5 py-2.5 rounded-xl bg-[#C5A880] hover:bg-[#DFC9AA] text-black text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Package</span>
        </button>
      </div>

      {/* Packages Table (Section 21) */}
      <div className="rounded-3xl bg-[#12161E] border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/10 text-white/40 font-mono">
                <th className="py-4 px-6">PACKAGE</th>
                <th className="py-4 px-6">DESTINATION</th>
                <th className="py-4 px-6">DURATION</th>
                <th className="py-4 px-6">RATE (FROM)</th>
                <th className="py-4 px-6">STATUS</th>
                <th className="py-4 px-6 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl bg-cover bg-center shrink-0 border border-white/10"
                        style={{ backgroundImage: `url(${pkg.heroImage})` }}
                      />
                      <div>
                        <span className="font-serif text-base text-white font-medium block">
                          {pkg.name}
                        </span>
                        <span className="text-[10px] text-white/40 font-mono">
                          {pkg.travelStyle} • {pkg.itinerary.length} Itinerary Days
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-white/80">
                    {pkg.destinationName}
                  </td>
                  <td className="py-4 px-6 text-white/70 font-mono">
                    {pkg.durationDays}D / {pkg.durationNights}N
                  </td>
                  <td className="py-4 px-6 font-mono text-white font-semibold">
                    {pkg.isPriceOnRequest ? 'On Request' : formatPrice(pkg.priceFrom, currency)}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                        pkg.status === 'live'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : pkg.status === 'demo'
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-white/10 text-white/50'
                      }`}
                    >
                      {pkg.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => setEditingPkg({ ...pkg })}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs border border-white/10 transition-colors"
                    >
                      Edit
                    </button>
                    <a
                      href={`/packages/${pkg.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg text-white/40 hover:text-white inline-flex align-middle"
                      title="View public page"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Package Modal with Multi-Day Itinerary Editor (Section 21) */}
      {editingPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-4xl max-h-[92vh] rounded-3xl bg-[#141822] border border-white/10 p-6 sm:p-8 shadow-2xl overflow-y-auto relative text-white space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A880]">
                  Package Atelier
                </span>
                <h3 className="font-serif text-2xl font-medium text-white">
                  {editingPkg.name}
                </h3>
              </div>
              <button
                onClick={() => setEditingPkg(null)}
                className="p-1.5 rounded-lg text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-tabs */}
            <div className="flex gap-2 border-b border-white/10 pb-3 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('details')}
                className={`px-4 py-1.5 rounded-lg font-medium transition-colors ${
                  activeTab === 'details' ? 'bg-[#C5A880] text-black font-semibold' : 'text-white/60 hover:text-white'
                }`}
              >
                General Details & Pricing
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('itinerary')}
                className={`px-4 py-1.5 rounded-lg font-medium transition-colors ${
                  activeTab === 'itinerary' ? 'bg-[#C5A880] text-black font-semibold' : 'text-white/60 hover:text-white'
                }`}
              >
                Day-by-Day Itinerary ({editingPkg.itinerary.length} Days)
              </button>
            </div>

            {successNotice ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="font-serif text-xl text-white">Package Updates Saved</h3>
                <p className="text-xs text-white/50">Your changes are now synchronized with catalog and search filters.</p>
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-6 text-xs">
                {activeTab === 'details' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block mb-1">
                          Package Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingPkg.name}
                          onChange={(e) => setEditingPkg({ ...editingPkg, name: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#C5A880] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block mb-1">
                          Status
                        </label>
                        <select
                          value={editingPkg.status}
                          onChange={(e) => setEditingPkg({ ...editingPkg, status: e.target.value as any })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#C5A880] focus:outline-none"
                        >
                          <option value="live">Live / Public</option>
                          <option value="demo">Demo Testing</option>
                          <option value="draft">Draft (Hidden)</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block mb-1">
                          Destination
                        </label>
                        <select
                          value={editingPkg.destinationSlug}
                          onChange={(e) => {
                            const d = destinations.find((dest) => dest.slug === e.target.value);
                            setEditingPkg({
                              ...editingPkg,
                              destinationSlug: e.target.value,
                              destinationName: d ? d.name : editingPkg.destinationName,
                              destinationId: d ? d.id : editingPkg.destinationId
                            });
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#C5A880] focus:outline-none"
                        >
                          {destinations.map((d) => (
                            <option key={d.id} value={d.slug}>{d.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block mb-1">
                          Price From ({currency})
                        </label>
                        <input
                          type="number"
                          value={editingPkg.priceFrom}
                          onChange={(e) => setEditingPkg({ ...editingPkg, priceFrom: parseInt(e.target.value) || 0 })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#C5A880] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block mb-1">
                          Holiday Style
                        </label>
                        <select
                          value={editingPkg.travelStyle}
                          onChange={(e) => setEditingPkg({ ...editingPkg, travelStyle: e.target.value as any })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#C5A880] focus:outline-none"
                        >
                          <option value="Luxury Escapes">Luxury Escapes</option>
                          <option value="Private Tour">Private Tour</option>
                          <option value="Cultural Discovery">Cultural Discovery</option>
                          <option value="Wellness & Marine">Wellness & Marine</option>
                          <option value="Desert Expedition">Desert Expedition</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block mb-1">
                        Hero Photo URL
                      </label>
                      <input
                        type="url"
                        value={editingPkg.heroImage}
                        onChange={(e) => setEditingPkg({ ...editingPkg, heroImage: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white font-mono focus:border-[#C5A880] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block mb-1">
                        Card Summary (Short)
                      </label>
                      <textarea
                        rows={2}
                        value={editingPkg.shortSummary}
                        onChange={(e) => setEditingPkg({ ...editingPkg, shortSummary: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#C5A880] focus:outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block mb-1">
                        Full Detailed Description
                      </label>
                      <textarea
                        rows={4}
                        value={editingPkg.fullDescription}
                        onChange={(e) => setEditingPkg({ ...editingPkg, fullDescription: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#C5A880] focus:outline-none resize-none leading-relaxed"
                      />
                    </div>
                  </div>
                )}

                {/* Day-by-Day Itinerary Editor (Section 21 & 11) */}
                {activeTab === 'itinerary' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">
                        Total {editingPkg.itinerary.length} Days configured
                      </span>
                      <button
                        type="button"
                        onClick={handleAddNewDay}
                        className="px-3.5 py-1.5 rounded-lg bg-[#C5A880]/20 hover:bg-[#C5A880]/30 text-[#DFC9AA] text-xs font-semibold flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Day {editingPkg.itinerary.length + 1}</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {editingPkg.itinerary.map((day, idx) => (
                        <div
                          key={day.dayNumber}
                          className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3"
                        >
                          <div className="flex items-center justify-between pb-2 border-b border-white/5">
                            <span className="font-serif text-sm font-semibold text-[#DFC9AA]">
                              Day {day.dayNumber}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleDeleteDay(idx)}
                              className="text-rose-400 hover:text-rose-300 p-1 text-xs"
                              title="Delete Day"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="text-[9px] uppercase text-white/50 block mb-1">Title</label>
                              <input
                                type="text"
                                value={day.title}
                                onChange={(e) => {
                                  const updated = [...editingPkg.itinerary];
                                  updated[idx].title = e.target.value;
                                  setEditingPkg({ ...editingPkg, itinerary: updated });
                                }}
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] uppercase text-white/50 block mb-1">Location / Overnight</label>
                              <input
                                type="text"
                                value={day.overnightLocation}
                                onChange={(e) => {
                                  const updated = [...editingPkg.itinerary];
                                  updated[idx].overnightLocation = e.target.value;
                                  setEditingPkg({ ...editingPkg, itinerary: updated });
                                }}
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[9px] uppercase text-white/50 block mb-1">Day Narrative</label>
                            <textarea
                              rows={2}
                              value={day.description.join('\n')}
                              onChange={(e) => {
                                const updated = [...editingPkg.itinerary];
                                updated[idx].description = [e.target.value];
                                setEditingPkg({ ...editingPkg, itinerary: updated });
                              }}
                              className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white resize-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingPkg(null)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-[#C5A880] text-black font-semibold uppercase tracking-wider"
                  >
                    Save All Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

