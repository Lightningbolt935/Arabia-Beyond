'use client';

import React, { useState } from 'react';
import { useTravelStore } from '@/lib/store';
import { Hotel, RoomType } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import {
  Building2,
  Plus,
  Edit,
  Star,
  ExternalLink,
  X,
  CheckCircle2,
  MapPin
} from 'lucide-react';

export default function AdminHotelsPage() {
  const { hotels, destinations, currency, updateHotel, addHotel } = useTravelStore();

  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  const [successNotice, setSuccessNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHotel) return;

    updateHotel(editingHotel.id, editingHotel);
    setSuccessNotice(true);
    setTimeout(() => {
      setSuccessNotice(false);
      setEditingHotel(null);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-[#C5A880]">
            Resort Portfolio
          </span>
          <h1 className="font-serif text-3xl text-white font-normal">
            Hotel & Sanctuary Management
          </h1>
          <p className="text-xs text-white/50">
            Manage 5-star properties, room categories, verified amenities, and check-in policies.
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-3xl bg-[#12161E] border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/10 text-white/40 font-mono">
                <th className="py-4 px-6">PROPERTY</th>
                <th className="py-4 px-6">DESTINATION / CITY</th>
                <th className="py-4 px-6">LUXURY TIER</th>
                <th className="py-4 px-6">ROOMS</th>
                <th className="py-4 px-6">NIGHTLY FROM</th>
                <th className="py-4 px-6 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {hotels.map((hotel) => (
                <tr key={hotel.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl bg-cover bg-center shrink-0 border border-white/10"
                        style={{ backgroundImage: `url(${hotel.heroImage})` }}
                      />
                      <div>
                        <span className="font-serif text-base text-white font-medium block">
                          {hotel.name}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] text-[#C5A880]">
                          {[...Array(hotel.starRating)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-white/80">
                    <div>{hotel.destinationName}</div>
                    <div className="text-[10px] text-white/40">{hotel.city}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-full bg-[#C5A880]/15 text-[#DFC9AA] text-[10px] font-mono">
                      {hotel.verifiedLuxuryTier}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-white/70 font-mono">
                    {hotel.roomTypes.length} Categories
                  </td>
                  <td className="py-4 px-6 font-mono text-white font-semibold">
                    {formatPrice(hotel.priceFromPerNight, currency)}
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => setEditingHotel({ ...hotel })}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs border border-white/10 transition-colors"
                    >
                      Edit
                    </button>
                    <a
                      href={`/hotels/${hotel.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg text-white/40 hover:text-white inline-flex align-middle"
                      title="View live hotel page"
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

      {/* Edit Hotel Modal */}
      {editingHotel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-3xl max-h-[92vh] rounded-3xl bg-[#141822] border border-white/10 p-6 sm:p-8 shadow-2xl overflow-y-auto relative text-white space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="font-serif text-2xl font-medium text-white">
                Edit Hotel: {editingHotel.name}
              </span>
              <button
                onClick={() => setEditingHotel(null)}
                className="p-1.5 rounded-lg text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {successNotice ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="font-serif text-xl text-white">Hotel Changes Saved</h3>
                <p className="text-xs text-white/50">Property details are updated immediately.</p>
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block mb-1">
                      Property Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingHotel.name}
                      onChange={(e) => setEditingHotel({ ...editingHotel, name: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#C5A880] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block mb-1">
                      Luxury Tier
                    </label>
                    <select
                      value={editingHotel.verifiedLuxuryTier}
                      onChange={(e) => setEditingHotel({ ...editingHotel, verifiedLuxuryTier: e.target.value as any })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#C5A880] focus:outline-none"
                    >
                      <option value="Ultra Luxury">Ultra Luxury</option>
                      <option value="Private Island Sanctuary">Private Island Sanctuary</option>
                      <option value="Desert Oasis">Desert Oasis</option>
                      <option value="Heritage Boutique">Heritage Boutique</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block mb-1">
                      Address / Location
                    </label>
                    <input
                      type="text"
                      value={editingHotel.address}
                      onChange={(e) => setEditingHotel({ ...editingHotel, address: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#C5A880] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block mb-1">
                      Nightly Rate From ({currency})
                    </label>
                    <input
                      type="number"
                      value={editingHotel.priceFromPerNight}
                      onChange={(e) => setEditingHotel({ ...editingHotel, priceFromPerNight: parseInt(e.target.value) || 0 })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#C5A880] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block mb-1">
                    Hero Photo URL
                  </label>
                  <input
                    type="url"
                    value={editingHotel.heroImage}
                    onChange={(e) => setEditingHotel({ ...editingHotel, heroImage: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white font-mono focus:border-[#C5A880] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block mb-1">
                    Short Summary
                  </label>
                  <textarea
                    rows={2}
                    value={editingHotel.shortSummary}
                    onChange={(e) => setEditingHotel({ ...editingHotel, shortSummary: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#C5A880] focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block mb-1">
                    Full Property Overview
                  </label>
                  <textarea
                    rows={4}
                    value={editingHotel.fullOverview}
                    onChange={(e) => setEditingHotel({ ...editingHotel, fullOverview: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#C5A880] focus:outline-none resize-none leading-relaxed"
                  />
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingHotel(null)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-[#C5A880] text-black font-semibold uppercase tracking-wider"
                  >
                    Save Property Updates
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

