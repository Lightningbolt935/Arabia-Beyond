'use client';

import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Upload,
  Search,
  Filter,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Plus
} from 'lucide-react';

export default function AdminMediaPage() {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newAlt, setNewAlt] = useState('');
  const [newCat, setNewCat] = useState('Destinations');
  const [showAddModal, setShowAddModal] = useState(false);

  const [mediaItems, setMediaItems] = useState([
    {
      id: 'med-1',
      url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
      caption: 'Hajar Mountains rugged canyon peaks at Alila Jabal Akhdar',
      alt: 'Oman mountain peaks canyon view',
      category: 'Destinations',
      size: '1.4 MB'
    },
    {
      id: 'med-2',
      url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      caption: 'Overwater luxury villas suspended over turquoise lagoon at Ummahat Island',
      alt: 'The Red Sea overwater resort',
      category: 'Hotels',
      size: '2.1 MB'
    },
    {
      id: 'med-3',
      url: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=1200&q=80',
      caption: 'AlUla ancient sandstone canyons and monumental Hegra tombs',
      alt: 'AlUla Saudi Arabia Hegra',
      category: 'Heritage',
      size: '1.8 MB'
    },
    {
      id: 'med-4',
      url: 'https://images.unsplash.com/photo-1784400340405-e3874cdbb0e0?auto=format&fit=crop&w=1200&q=80',
      caption: 'Sultan Qaboos Grand Mosque Muscat marble courtyards',
      alt: 'Sultan Qaboos Grand Mosque',
      category: 'Destinations',
      size: '1.6 MB'
    },
    {
      id: 'med-5',
      url: 'https://images.unsplash.com/photo-1785963643205-21923ef80f0c?auto=format&fit=crop&w=1200&q=80',
      caption: 'Wahiba Sands golden rolling desert dunes at sunset',
      alt: 'Wahiba Sands dunes',
      category: 'Destinations',
      size: '2.0 MB'
    },
    {
      id: 'med-6',
      url: 'https://images.unsplash.com/photo-1792930568968-93840b84840a?auto=format&fit=crop&w=1200&q=80',
      caption: 'Doha Corniche glittering West Bay skyline and azure waters',
      alt: 'Doha skyline',
      category: 'Destinations',
      size: '1.9 MB'
    }
  ]);

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;

    setMediaItems([
      {
        id: `med-${Date.now()}`,
        url: newUrl,
        caption: newCaption || 'New Arabian luxury asset',
        alt: newAlt || 'Luxury travel image',
        category: newCat,
        size: '1.5 MB'
      },
      ...mediaItems
    ]);

    setNewUrl('');
    setNewCaption('');
    setNewAlt('');
    setShowAddModal(false);
  };

  const filtered = mediaItems.filter((m) => {
    if (category !== 'all' && m.category !== category) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!m.caption.toLowerCase().includes(q) && !m.alt.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-[#C5A880]">
            Asset Vault
          </span>
          <h1 className="font-serif text-3xl text-white font-normal">
            Media Library & Alt-Text Registry
          </h1>
          <p className="text-xs text-white/50">
            Maintain high-resolution licensed imagery, SEO alt attributes, and video poster fallbacks.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#C5A880] text-black font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Register Media Asset</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-[#12161E] border border-white/10 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2 text-xs">
          {['all', 'Destinations', 'Hotels', 'Heritage'].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-xl font-mono uppercase tracking-wider ${
                category === c ? 'bg-[#C5A880] text-black font-semibold' : 'bg-white/5 text-white/70'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search captions or alt tags..."
            className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
          />
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl bg-[#12161E] border border-white/10 overflow-hidden shadow-xl flex flex-col justify-between group"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${item.url})` }}
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[9px] font-mono text-[#DFC9AA]">
                  {item.category} • {item.size}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-2 text-xs">
              <div className="text-white font-medium line-clamp-1">{item.caption}</div>
              <div className="text-[11px] text-white/50 font-mono line-clamp-1">
                Alt: {item.alt}
              </div>
              <div className="pt-2 border-t border-white/[0.06] flex justify-between items-center text-[10px] text-white/40 font-mono truncate">
                <span className="truncate max-w-[200px]">{item.url}</span>
                <a href={item.url} target="_blank" className="hover:text-white p-1">
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl bg-[#141822] border border-white/10 p-6 space-y-4">
            <h3 className="font-serif text-xl text-white">Register New Media Asset</h3>
            <form onSubmit={handleAddMedia} className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] text-[#C5A880] block mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#C5A880] block mb-1">Caption</label>
                <input
                  type="text"
                  placeholder="e.g. Sunset view over Ummahat overwater villas"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#C5A880] block mb-1">Alt Text (Accessibility & SEO) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Overwater villa in The Red Sea Saudi Arabia"
                  value={newAlt}
                  onChange={(e) => setNewAlt(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#C5A880] block mb-1">Category</label>
                <select
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white"
                >
                  <option value="Destinations">Destinations</option>
                  <option value="Hotels">Hotels</option>
                  <option value="Heritage">Heritage</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C5A880] text-black font-semibold uppercase tracking-wider"
                >
                  Add to Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

