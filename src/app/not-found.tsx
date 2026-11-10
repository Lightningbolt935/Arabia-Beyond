'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B0D10] text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/40 flex items-center justify-center mx-auto text-[#C5A880]">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A880]">
            Voyage Coordinates Not Found
          </span>
          <h1 className="font-serif text-4xl text-white font-normal">
            Page Not Discovered
          </h1>
          <p className="text-xs text-white/60 leading-relaxed">
            The destination or itinerary path you requested is unavailable. Perhaps you would like to explore our curated launch sanctuaries?
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#C5A880] text-black text-xs uppercase font-semibold tracking-wider hover:bg-[#DFC9AA] transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/packages"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/10 text-white text-xs uppercase font-medium tracking-wider hover:bg-white/20 border border-white/20 transition-colors flex items-center justify-center gap-2"
          >
            <span>Explore Packages</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

