'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTravelStore } from '@/lib/store';
import PackageCard from '@/components/packages/PackageCard';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import {
  Filter,
  X,
  Search,
  SlidersHorizontal,
  Compass,
  ArrowUpDown,
  RotateCcw,
  Sparkles,
  Heart
} from 'lucide-react';

function PackagesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { packages, destinations, savedPackageIds } = useTravelStore();

  // URL state
  const initialDestination = searchParams?.get('destination') || 'all';
  const initialStyle = searchParams?.get('style') || 'all';
  const initialDuration = searchParams?.get('duration') || 'all';
  const initialSort = searchParams?.get('sort') || 'featured';
  const initialSearch = searchParams?.get('q') || '';
  const initialSavedOnly = searchParams?.get('saved') === 'true';

  const [destinationFilter, setDestinationFilter] = useState(initialDestination);
  const [styleFilter, setStyleFilter] = useState(initialStyle);
  const [durationFilter, setDurationFilter] = useState(initialDuration);
  const [sortBy, setSortBy] = useState(initialSort);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [savedOnly, setSavedOnly] = useState(initialSavedOnly);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync to URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (destinationFilter !== 'all') params.set('destination', destinationFilter);
    if (styleFilter !== 'all') params.set('style', styleFilter);
    if (durationFilter !== 'all') params.set('duration', durationFilter);
    if (sortBy !== 'featured') params.set('sort', sortBy);
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    if (savedOnly) params.set('saved', 'true');

    const str = params.toString();
    const targetUrl = str ? `/packages?${str}` : '/packages';
    router.replace(targetUrl, { scroll: false });
  }, [destinationFilter, styleFilter, durationFilter, sortBy, searchQuery, savedOnly, router]);

  // Styles list
  const styles = [
    'all',
    'Luxury Escapes',
    'Private Tour',
    'Cultural Discovery',
    'Wellness & Marine',
    'Desert Expedition'
  ];

  // Durations
  const durations = [
    { value: 'all', label: 'All Durations' },
    { value: 'short', label: 'Short Breaks (3–4 Days)' },
    { value: 'medium', label: 'Week Escapes (5–6 Days)' },
    { value: 'long', label: 'Grand Expeditions (7+ Days)' }
  ];

  const clearAllFilters = () => {
    setDestinationFilter('all');
    setStyleFilter('all');
    setDurationFilter('all');
    setSortBy('featured');
    setSearchQuery('');
    setSavedOnly(false);
  };

  const activeFilterCount =
    (destinationFilter !== 'all' ? 1 : 0) +
    (styleFilter !== 'all' ? 1 : 0) +
    (durationFilter !== 'all' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0) +
    (savedOnly ? 1 : 0);

  // Filtered & Sorted Packages
  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      if (pkg.status !== 'live' && pkg.status !== 'demo') return false;

      // Saved only
      if (savedOnly && !savedPackageIds.includes(pkg.id)) return false;

      // Destination
      if (destinationFilter !== 'all' && pkg.destinationSlug !== destinationFilter) {
        return false;
      }

      // Style
      if (styleFilter !== 'all' && pkg.travelStyle !== styleFilter) {
        return false;
      }

      // Duration
      if (durationFilter === 'short' && pkg.durationDays > 4) return false;
      if (durationFilter === 'medium' && (pkg.durationDays < 5 || pkg.durationDays > 6)) return false;
      if (durationFilter === 'long' && pkg.durationDays < 7) return false;

      // Search text
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = pkg.name.toLowerCase().includes(q);
        const matchDest = pkg.destinationName.toLowerCase().includes(q);
        const matchCities = pkg.cities.some((c) => c.toLowerCase().includes(q));
        const matchSummary = pkg.shortSummary.toLowerCase().includes(q);
        if (!matchName && !matchDest && !matchCities && !matchSummary) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceFrom - b.priceFrom;
      if (sortBy === 'price-desc') return b.priceFrom - a.priceFrom;
      if (sortBy === 'duration-asc') return a.durationDays - b.durationDays;
      if (sortBy === 'duration-desc') return b.durationDays - a.durationDays;
      // Default: featured first
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
  }, [packages, destinationFilter, styleFilter, durationFilter, sortBy, searchQuery, savedOnly, savedPackageIds]);

  return (
    <div className="pt-28 pb-32 bg-[#F5F5F7] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Luxury Packages' }]} />

        {/* Page Title & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between my-10 gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C8A97E] font-mono">
              <Compass className="w-3.5 h-3.5" />
              <span>Curated Portfolio</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight leading-[1.1]">
              Luxury Packages & Private Tours
            </h1>
            <p className="text-white/60 text-sm sm:text-base font-light leading-relaxed">
              Explore choreographed multi-day itineraries across Bahrain, Oman, Saudi Arabia, The Red Sea, and Qatar. Every journey is fully customisable through our Mayfair concierge.
            </p>
          </div>

          {/* Search input field */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, beach, desert..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-full pl-11 pr-4 py-3.5 text-xs text-white placeholder-white/40 focus:border-[#C8A97E] focus:outline-none backdrop-blur-md"
            />
            <Search className="w-4 h-4 text-white/40 absolute left-4 top-4" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 text-white/40 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Desktop Filter Bar (Section 9) */}
        <div className="hidden lg:block bg-[#0B0D12] border border-white/[0.06] rounded-3xl p-6 mb-12 space-y-4 shadow-2xl">
          <div className="grid grid-cols-4 gap-4">
            {/* Destination Selector */}
            <div>
              <label className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block mb-2">
                Destination
              </label>
              <select
                value={destinationFilter}
                onChange={(e) => setDestinationFilter(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:border-[#C8A97E] focus:outline-none cursor-pointer"
              >
                <option value="all">All Destinations</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.slug} className="bg-[#0B0D12]">
                    {d.name} {d.isRegionOf ? `(${d.isRegionOf})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Travel Style Selector */}
            <div>
              <label className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block mb-2">
                Experience Style
              </label>
              <select
                value={styleFilter}
                onChange={(e) => setStyleFilter(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:border-[#C8A97E] focus:outline-none cursor-pointer capitalize"
              >
                {styles.map((s) => (
                  <option key={s} value={s} className="bg-[#0B0D12]">
                    {s === 'all' ? 'All Styles' : s}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration Selector */}
            <div>
              <label className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block mb-2">
                Duration
              </label>
              <select
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:border-[#C8A97E] focus:outline-none cursor-pointer"
              >
                {durations.map((d) => (
                  <option key={d.value} value={d.value} className="bg-[#0B0D12]">
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Selector */}
            <div>
              <label className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block mb-2">
                Sort Order
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:border-[#C8A97E] focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-[#0B0D12]">Featured / Recommended</option>
                <option value="price-asc" className="bg-[#0B0D12]">Price: Low to High</option>
                <option value="price-desc" className="bg-[#0B0D12]">Price: High to Low</option>
                <option value="duration-asc" className="bg-[#0B0D12]">Duration: Shortest First</option>
                <option value="duration-desc" className="bg-[#0B0D12]">Duration: Longest First</option>
              </select>
            </div>
          </div>

          {/* Active Filter Badges & Reset Row */}
          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="text-white/50">
                Found <strong>{filteredPackages.length}</strong> available {filteredPackages.length === 1 ? 'package' : 'packages'}
              </span>
              <button
                onClick={() => setSavedOnly(!savedOnly)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-colors ${
                  savedOnly
                    ? 'bg-rose-500 text-white font-semibold'
                    : 'bg-white/5 text-white/70 hover:text-white border border-white/10'
                }`}
              >
                <Heart className={`w-3 h-3 ${savedOnly ? 'fill-current' : ''}`} />
                <span>Saved ({savedPackageIds.length})</span>
              </button>
            </div>

            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-[#C5A880] hover:text-[#DFC9AA] flex items-center gap-1.5 font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset all filters ({activeFilterCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Filter Trigger Button */}
        <div className="lg:hidden flex items-center justify-between mb-6">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#12161E] border border-white/10 text-xs font-medium text-white"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          </button>

          <span className="text-xs text-white/50">
            {filteredPackages.length} Results
          </span>
        </div>

        {/* Packages Grid or Empty State */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg.id} packageItem={pkg} />
            ))}
          </div>
        ) : (
          /* Empty State (Section 9 & 13) */
          <div className="rounded-3xl bg-[#12161E] border border-white/10 p-12 text-center max-w-xl mx-auto space-y-5 my-12">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-[#C5A880]">
              <Compass className="w-8 h-8 animate-spin-slow" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-2xl text-white font-medium">
                No Packages Match Your Exact Filter Criteria
              </h3>
              <p className="text-xs text-white/60 leading-relaxed">
                We did not find standard packages matching this exact combination. However, our Mayfair travel concierges can tailor a bespoke package according to your specific dates, party size, and private preferences.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={clearAllFilters}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-wider font-semibold"
              >
                Reset Filter Selections
              </button>
              <a
                href="/plan-your-trip"
                className="px-6 py-3 rounded-full bg-[#C5A880] hover:bg-[#DFC9AA] text-black text-xs uppercase tracking-wider font-semibold"
              >
                Send Tailor-Made Request
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative w-5/6 max-w-sm bg-[#0E1116] border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto z-10 text-white">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="font-serif text-lg font-medium text-white flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#C5A880]" />
                  Filter Packages
                </span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-white/60 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Destination Filter */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-[#C5A880] block">
                  Destination
                </label>
                <select
                  value={destinationFilter}
                  onChange={(e) => setDestinationFilter(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                >
                  <option value="all">All Destinations</option>
                  {destinations.map((d) => (
                    <option key={d.id} value={d.slug}>{d.name}</option>
                  ))}
                </select>
              </div>

              {/* Travel Style */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-[#C5A880] block">
                  Holiday Style
                </label>
                <select
                  value={styleFilter}
                  onChange={(e) => setStyleFilter(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                >
                  {styles.map((s) => (
                    <option key={s} value={s}>{s === 'all' ? 'All Styles' : s}</option>
                  ))}
                </select>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-[#C5A880] block">
                  Duration
                </label>
                <select
                  value={durationFilter}
                  onChange={(e) => setDurationFilter(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                >
                  {durations.map((d) => (
                    <option key={d.value} value={d.value}>{d.label}</option>
                  ))}
                </select>
              </div>

              {/* Sort Order */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-[#C5A880] block">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                >
                  <option value="featured">Featured / Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="duration-asc">Duration: Shortest First</option>
                  <option value="duration-desc">Duration: Longest First</option>
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-2">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3.5 rounded-xl bg-[#C5A880] text-black font-semibold text-xs uppercase tracking-wider"
              >
                Apply Filters ({filteredPackages.length} Results)
              </button>
              <button
                onClick={clearAllFilters}
                className="w-full py-2.5 text-center text-xs text-white/50 hover:text-white"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PackagesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F5F7] text-white pt-32 text-center">Loading luxury packages...</div>}>
      <PackagesContent />
    </Suspense>
  );
}

