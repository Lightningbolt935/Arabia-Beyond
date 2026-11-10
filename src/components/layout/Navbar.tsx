'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTravelStore } from '@/lib/store';
import {
  Menu,
  X,
  ChevronDown,
  Compass,
  Heart,
  Globe,
  ArrowRight
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { destinations, savedPackageIds, currency, setCurrency } = useTravelStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destinationsDropdown, setDestinationsDropdown] = useState(false);
  const [currencyDropdown, setCurrencyDropdown] = useState(false);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDestinationsDropdown(false);
    setCurrencyDropdown(false);
  }, [pathname]);

  const isAdmin = pathname.startsWith('/admin');
  if (isAdmin) {
    return null;
  }

  const navLinks = [
    { name: 'Destinations', href: '/destinations', hasDropdown: true },
    { name: 'Packages', href: '/packages' },
    { name: 'Sanctuaries', href: '/hotels' },
    { name: 'Experiences', href: '/experiences' }
  ];

  return (
    <>
      {/* Luxury Floating Dark Glass Capsule Navbar */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
        <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
          <div className="w-full flex items-center justify-between px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-black/50 backdrop-blur-2xl border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.5)] text-white transition-all duration-300">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-full border border-[#C5A880]/50 flex items-center justify-center bg-[#C5A880]/15 text-[#DFC9AA] transition-all duration-500 group-hover:scale-105 group-hover:bg-[#C5A880]/25 shadow-sm">
                <Compass className="w-4.5 h-4.5 transition-transform duration-700 group-hover:rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl tracking-[0.22em] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#F5E6D3] via-[#DFC9AA] to-[#C5A880] leading-none">
                  ARAB & BEYOND
                </span>
                <span className="text-[8px] uppercase tracking-[0.35em] font-sans text-[#C5A880] mt-1 font-semibold leading-none">
                  Luxury Arabian Escapes
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={() => setDestinationsDropdown(true)}
                      onMouseLeave={() => setDestinationsDropdown(false)}
                    >
                      <Link
                        href="/destinations"
                        className={`text-xs uppercase tracking-[0.16em] flex items-center gap-1 font-medium transition-colors py-2 ${
                          pathname.startsWith('/destinations')
                            ? 'text-[#DFC9AA]'
                            : 'text-white/80 hover:text-[#DFC9AA]'
                        }`}
                      >
                        {link.name}
                        <ChevronDown className="w-3.5 h-3.5 text-[#C5A880]" />
                      </Link>

                      {/* Dropdown Menu */}
                      {destinationsDropdown && (
                        <div className="absolute top-full left-0 mt-1 w-80 rounded-2xl p-3 bg-[#0E121A]/98 backdrop-blur-3xl border border-white/15 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 text-white">
                          <div className="text-[10px] uppercase tracking-widest text-[#C5A880] px-3 py-1.5 font-semibold font-mono">
                            Curated Arabian Regions
                          </div>
                          <div className="space-y-1">
                            {destinations.map((dest) => (
                              <Link
                                key={dest.id}
                                href={`/destinations/${dest.slug}`}
                                className="flex flex-col px-3 py-2 rounded-xl hover:bg-white/[0.06] transition-all group"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-white group-hover:text-[#DFC9AA] transition-colors">
                                    {dest.name}
                                  </span>
                                  {dest.slug === 'the-red-sea' && (
                                    <span className="text-[9px] bg-[#C5A880]/20 text-[#DFC9AA] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider font-semibold border border-[#C5A880]/30">
                                      Sanctuary
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px] text-white/60 truncate font-light mt-0.5">
                                  {dest.tagline}
                                </span>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-2 pt-2 border-t border-white/10 px-3">
                            <Link
                              href="/destinations"
                              className="text-xs text-[#DFC9AA] hover:text-white flex items-center justify-between py-1 transition-colors font-medium"
                            >
                              <span>Explore All 5 Destinations</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-xs uppercase tracking-[0.16em] font-medium transition-colors ${
                      pathname === link.href
                        ? 'text-[#DFC9AA]'
                        : 'text-white/80 hover:text-[#DFC9AA]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Utilities */}
            <div className="hidden lg:flex items-center gap-3.5">
              {/* Currency Selector */}
              <div className="relative">
                <button
                  onClick={() => setCurrencyDropdown(!currencyDropdown)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-colors border border-white/15 hover:border-[#C5A880] bg-white/[0.06] text-white"
                  aria-label="Change currency"
                >
                  <Globe className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{currency}</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>
                {currencyDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-28 rounded-xl p-1 bg-[#0E121A] border border-white/15 shadow-2xl z-50 text-white">
                    {['GBP', 'USD', 'EUR', 'AED', 'SAR'].map((curr) => (
                      <button
                        key={curr}
                        onClick={() => {
                          setCurrency(curr);
                          setCurrencyDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs rounded-lg transition-colors font-mono ${
                          currency === curr
                            ? 'bg-[#C5A880] text-black font-semibold'
                            : 'text-white hover:bg-white/[0.08]'
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Saved Packages Indicator */}
              <Link
                href="/packages?saved=true"
                className="relative p-2 rounded-full text-white/80 hover:text-[#DFC9AA] hover:bg-white/10 transition-colors"
                title="Saved Itineraries"
              >
                <Heart className="w-4 h-4" />
                {savedPackageIds.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#C5A880] text-black text-[9px] font-bold rounded-full flex items-center justify-center">
                    {savedPackageIds.length}
                  </span>
                )}
              </Link>

              {/* Primary Call to Action */}
              <Link
                href="/plan-your-trip"
                className="inline-flex items-center justify-center px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#C5A880] hover:bg-[#DFC9AA] text-black shadow-lg transition-all duration-300 hover:scale-105"
              >
                <span>Plan Your Journey</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full border border-white/15 text-white bg-white/10 focus:outline-none"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-5/6 max-w-sm bg-[#0E121A] border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto z-50 text-white">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <span className="font-serif text-lg tracking-[0.2em] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#F5E6D3] via-[#DFC9AA] to-[#C5A880]">
                  ARAB & BEYOND
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-white/60 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="py-6 space-y-4">
                <Link
                  href="/"
                  className="block text-sm uppercase tracking-wider text-white hover:text-[#DFC9AA] font-medium"
                >
                  Home
                </Link>

                <div className="py-2 border-y border-white/10 space-y-2">
                  <div className="text-[11px] uppercase tracking-widest text-[#C5A880] font-semibold font-mono">
                    Destinations
                  </div>
                  {destinations.map((d) => (
                    <Link
                      key={d.id}
                      href={`/destinations/${d.slug}`}
                      className="block text-xs text-white/80 hover:text-white pl-2 py-1"
                    >
                      {d.name}
                    </Link>
                  ))}
                </div>

                <Link
                  href="/packages"
                  className="block text-sm uppercase tracking-wider text-white hover:text-[#DFC9AA] font-medium"
                >
                  Packages & Journeys
                </Link>
                <Link
                  href="/hotels"
                  className="block text-sm uppercase tracking-wider text-white hover:text-[#DFC9AA] font-medium"
                >
                  Hotels & Sanctuaries
                </Link>
                <Link
                  href="/experiences"
                  className="block text-sm uppercase tracking-wider text-white hover:text-[#DFC9AA] font-medium"
                >
                  Experiences
                </Link>
                <Link
                  href="/about"
                  className="block text-sm uppercase tracking-wider text-white hover:text-[#DFC9AA] font-medium"
                >
                  About Arab & Beyond
                </Link>
                <Link
                  href="/contact"
                  className="block text-sm uppercase tracking-wider text-white hover:text-[#DFC9AA] font-medium"
                >
                  Contact & Concierge
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <Link
                href="/plan-your-trip"
                className="w-full py-3 bg-[#C5A880] hover:bg-[#DFC9AA] text-black font-semibold rounded-full text-xs uppercase tracking-wider flex items-center justify-center transition-colors"
              >
                Plan Your Journey
              </Link>
              <div className="flex items-center justify-between text-xs text-white/50 pt-2 font-mono">
                <span>Mayfair & Dubai Private Desks</span>
                <span>+44 20 7946 0888</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
