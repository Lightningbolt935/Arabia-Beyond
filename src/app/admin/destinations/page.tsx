'use client';

import React, { useState } from 'react';
import { useTravelStore } from '@/lib/store';
import { Destination } from '@/lib/types';
import {
  Compass,
  Edit,
  Eye,
  EyeOff,
  Plus,
  Save,
  X,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export default function AdminDestinationsPage() {
  const { destinations, updateDestination } = useTravelStore();

  const [editingDest, setEditingDest] = useState<Destination | null>(null);
  const [successNotice, setSuccessNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDest) return;

    updateDestination(editingDest.id, editingDest);
    setSuccessNotice(true);
    setTimeout(() => {
      setSuccessNotice(false);
      setEditingDest(null);
    }, 1500);
  };

  const toggleActive = (dest: Destination) => {
    updateDestination(dest.id, { active: !dest.active });
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-[#C5A880]">
            Content Operations
          </span>
          <h1 className="font-serif text-3xl text-white font-normal">
            Destination Management
          </h1>
          <p className="text-xs text-white/50">
            Edit hero background video loops, headline messaging, seasonal guidelines, and visibility.
          </p>
        </div>
      </div>

      {/* Destinations Table */}
      <div className="rounded-3xl bg-[#12161E] border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/10 text-white/40 font-mono">
                <th className="py-4 px-6">DESTINATION</th>
                <th className="py-4 px-6">RELATIONSHIP</th>
                <th className="py-4 px-6">HERO HEADLINE</th>
                <th className="py-4 px-6">STATUS</th>
                <th className="py-4 px-6 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {destinations.map((dest) => (
                <tr key={dest.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl bg-cover bg-center shrink-0 border border-white/10"
                        style={{ backgroundImage: `url(${dest.heroPosterUrl})` }}
                      />
                      <div>
                        <span className="font-serif text-base text-white font-medium block">
                          {dest.name}
                        </span>
                        <span className="text-[10px] text-white/40 font-mono">
                          /destinations/{dest.slug}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-white/70">
                    {dest.isRegionOf ? (
                      <span className="px-2.5 py-1 rounded-full bg-[#C5A880]/15 text-[#DFC9AA] text-[10px] font-mono">
                        Sub-region of {dest.isRegionOf}
                      </span>
                    ) : (
                      <span className="text-white/60">{dest.country}</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-white/80 max-w-xs truncate">
                    {dest.heroHeadline}
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => toggleActive(dest)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-colors ${
                        dest.active
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-white/10 text-white/40'
                      }`}
                    >
                      {dest.active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{dest.active ? 'Published' : 'Hidden'}</span>
                    </button>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => setEditingDest({ ...dest })}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs border border-white/10 transition-colors"
                    >
                      Edit Content
                    </button>
                    <a
                      href={`/destinations/${dest.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg text-white/40 hover:text-white inline-flex align-middle"
                      title="View public destination"
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

      {/* Edit Destination Modal */}
      {editingDest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-2xl max-h-[90vh] rounded-3xl bg-[#141822] border border-white/10 p-6 sm:p-8 shadow-2xl overflow-y-auto relative text-white space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="font-serif text-xl font-medium">
                Edit Destination: {editingDest.name}
              </span>
              <button
                onClick={() => setEditingDest(null)}
                className="p-1.5 rounded-lg text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {successNotice ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="font-serif text-xl text-white">Destination Changes Saved</h3>
                <p className="text-xs text-white/50">Changes are now reflected live across public destination pages.</p>
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block mb-1">
                      Destination Name
                    </label>
                    <input
                      type="text"
                      required
                      value={editingDest.name}
                      onChange={(e) => setEditingDest({ ...editingDest, name: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#C5A880] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block mb-1">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      required
                      value={editingDest.slug}
                      onChange={(e) => setEditingDest({ ...editingDest, slug: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white font-mono focus:border-[#C5A880] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={editingDest.tagline}
                    onChange={(e) => setEditingDest({ ...editingDest, tagline: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#C5A880] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block mb-1">
                    Hero Video MP4 URL
                  </label>
                  <input
                    type="url"
                    value={editingDest.heroVideoUrl}
                    onChange={(e) => setEditingDest({ ...editingDest, heroVideoUrl: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white font-mono focus:border-[#C5A880] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block mb-1">
                    Hero Poster Fallback Image URL
                  </label>
                  <input
                    type="url"
                    value={editingDest.heroPosterUrl}
                    onChange={(e) => setEditingDest({ ...editingDest, heroPosterUrl: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white font-mono focus:border-[#C5A880] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block mb-1">
                    Hero Headline
                  </label>
                  <input
                    type="text"
                    value={editingDest.heroHeadline}
                    onChange={(e) => setEditingDest({ ...editingDest, heroHeadline: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white focus:border-[#C5A880] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block mb-1">
                    Overview Copy
                  </label>
                  <textarea
                    rows={4}
                    value={editingDest.overview}
                    onChange={(e) => setEditingDest({ ...editingDest, overview: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-[#C5A880] focus:outline-none resize-none leading-relaxed"
                  />
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingDest(null)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-[#C5A880] text-black font-semibold uppercase tracking-wider"
                  >
                    Save Updates
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

