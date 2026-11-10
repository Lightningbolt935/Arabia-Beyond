'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('arab_and_beyond_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = (type: 'all' | 'essential') => {
    localStorage.setItem('arab_and_beyond_cookie_consent', type);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4 print:hidden animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="rounded-3xl p-6 bg-[#080A0E]/95 backdrop-blur-3xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.9)] text-white space-y-4">
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-full bg-[#C8A97E]/10 border border-[#C8A97E]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#C8A97E]">
            <Shield className="w-4 h-4" />
          </div>
          <div className="space-y-1 flex-1">
            <h4 className="text-sm font-serif font-normal text-white">
              Privacy & Discretion Protocol
            </h4>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              We employ essential security technologies and telemetry to ensure an uncompromising luxury browsing experience across our Arabian portfolio.
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <Link
            href="/legal/cookies"
            className="text-white/50 hover:text-[#C8A97E] underline underline-offset-4 font-mono text-[11px]"
          >
            Review Cookie Details
          </Link>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => handleAccept('essential')}
              className="flex-1 sm:flex-none px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white/80 transition-colors font-mono text-[11px] uppercase tracking-wider border border-white/10"
            >
              Essential Only
            </button>
            <button
              onClick={() => handleAccept('all')}
              className="flex-1 sm:flex-none px-5 py-2 rounded-full bg-gradient-to-r from-[#C8A97E] to-[#DFC9AA] hover:brightness-105 text-black font-semibold text-[11px] tracking-wider uppercase font-mono transition-all shadow-md"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
