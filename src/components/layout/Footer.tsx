'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTravelStore } from '@/lib/store';
import { Compass, Mail, Phone, MapPin, ArrowRight, CheckCircle2, Shield } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  const { destinations, settings } = useTravelStore();
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const isAdmin = pathname.startsWith('/admin');
  if (isAdmin) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !consent) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#07090E] border-t border-white/10 text-white pt-20 pb-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-14 border-b border-white/10">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full border border-[#C5A880]/50 flex items-center justify-center bg-[#C5A880]/15 text-[#DFC9AA]">
                <Compass className="w-5 h-5 text-[#C5A880]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl tracking-[0.2em] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#F5E6D3] via-[#DFC9AA] to-[#C5A880]">
                  ARAB & BEYOND
                </span>
                <span className="text-[9px] uppercase tracking-[0.35em] text-[#C5A880] -mt-0.5 font-sans font-semibold">
                  The Apogee of Arabian Luxury
                </span>
              </div>
            </Link>

            <p className="text-white/60 text-sm leading-relaxed max-w-sm font-light">
              Dedicated exclusively to ultra-luxury escapes, private island sanctuaries, and bespoke expeditions across Bahrain, Oman, Saudi Arabia, The Red Sea, and Qatar. Handcrafted with uncompromising standards of discretion and elegance.
            </p>

            <div className="space-y-2 text-xs text-white/60 pt-2 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span><strong className="text-white font-medium">Mayfair Desk:</strong> {settings.londonOffice}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span><strong className="text-white font-medium">DIFC Desk:</strong> {settings.dubaiOffice}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>{settings.contactPhone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>{settings.contactEmail}</span>
              </div>
            </div>
          </div>

          {/* Destinations Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#C5A880] font-semibold">
              Sovereign Realms
            </h4>
            <ul className="space-y-2 text-sm text-white/70 font-light">
              {destinations.map((d) => (
                <li key={d.id}>
                  <Link
                    href={`/destinations/${d.slug}`}
                    className="hover:text-[#DFC9AA] transition-colors"
                  >
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#C5A880] font-semibold">
              Private Atelier
            </h4>
            <ul className="space-y-2 text-sm text-white/70 font-light">
              <li>
                <Link href="/packages" className="hover:text-[#DFC9AA] transition-colors">
                  Curated Packages
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="hover:text-[#DFC9AA] transition-colors">
                  Palaces & Sanctuaries
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="hover:text-[#DFC9AA] transition-colors">
                  Private Experiences
                </Link>
              </li>
              <li>
                <Link href="/plan-your-trip" className="hover:text-[#DFC9AA] transition-colors">
                  Tailor-Made Proposal
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#DFC9AA] transition-colors">
                  About Arab & Beyond
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#DFC9AA] transition-colors">
                  Direct Concierge
                </Link>
              </li>
            </ul>
          </div>

          {/* Private Newsletter Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#C5A880] font-semibold">
              The Private Dispatch
            </h4>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              Receive private invitations to seasonal sovereign openings, unlisted private island buyouts, and archaeological retrospectives.
            </p>

            {subscribed ? (
              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You have been added to our private dispatch list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full bg-white/[0.06] border border-white/15 rounded-full px-4 py-2.5 text-xs text-white placeholder-white/40 focus:border-[#C5A880] focus:outline-none transition-colors pr-12 shadow-sm"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 rounded-full bg-[#C5A880] text-black hover:bg-[#DFC9AA] transition-colors flex items-center justify-center font-semibold"
                    aria-label="Submit newsletter subscription"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <label className="flex items-start gap-2 cursor-pointer text-[11px] text-white/50 leading-tight">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 rounded border-white/20 text-[#C5A880] focus:ring-0"
                  />
                  <span>
                    I consent to receive luxury travel invitations in accordance with the Privacy Policy.
                  </span>
                </label>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal & Regulatory Row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50 font-light">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>&copy; {new Date().getFullYear()} Arab & Beyond Ltd. All rights reserved.</span>
            <Link href="/legal/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/legal/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/legal/cookies" className="hover:text-white transition-colors">
              Cookie Preferences
            </Link>
            <Link href="/legal/cancellation" className="hover:text-white transition-colors">
              Cancellation & Refunds
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-white/50 hover:text-[#DFC9AA] transition-colors font-mono text-[11px]"
            >
              <Shield className="w-3 h-3" />
              <span>Management Portal</span>
            </Link>
            <span className="text-[11px] text-white/50 font-mono">
              UK Package Travel Regulations Compliant
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
