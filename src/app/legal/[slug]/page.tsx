'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { ShieldCheck, Lock, FileText, Scale } from 'lucide-react';

export default function LegalPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const legalContent: Record<string, { title: string; subtitle: string; content: string[] }> = {
    terms: {
      title: 'Terms & Conditions of Luxury Booking',
      subtitle: 'Version 2026.11 • Effective 9 November 2026',
      content: [
        '1. Introduction: These terms govern all package holidays, accommodation bookings, private vehicle charters, and bespoke travel services provided by Arab & Beyond Ltd ("we", "us", or "our").',
        '2. Booking Requests & Supplier Confirmation: When booking via our online platform, transactions undergo an authenticated authorization check. Because our itineraries involve bespoke villa allocations and private guides, a booking remains an active request until verified and stamped by our supplier allocation desk.',
        '3. Payment Schedule: For package holidays, a non-refundable deposit of 20% is payable at the time of reservation. The remaining balance of 80% is due 30 days prior to departure. Bookings made within 30 days of departure require full payment at authorization.',
        '4. UK Package Travel Regulations: All packages sold within the United Kingdom comply strictly with the Package Travel and Linked Travel Arrangements Regulations 2018, providing full insolvency fund protection for consumer payments.',
        '5. Amendments & Force Majeure: While we make every endeavor to operate itineraries exactly as published, regional weather conditions (such as sandstorms or maritime sea swell) may necessitate rerouting or flight rescheduling in the paramount interest of passenger safety.'
      ]
    },
    privacy: {
      title: 'Privacy Policy & Data Discretion',
      subtitle: 'UK GDPR Compliant • Updated November 2026',
      content: [
        '1. Commitment to Discretion: Arab & Beyond upholds the highest standards of confidentiality. We collect personal data solely to facilitate luxury travel bookings, visa procurement, and personalized dining and accessibility arrangements.',
        '2. Data Collected: Name, passport information, contact telephone, email, dietary preferences, and travel party counts. We never sell, rent, or trade client information.',
        '3. Payment Data Tokenisation: We do not store raw credit card numbers or CVV codes on our servers. All transactions are securely routed through tokenised payment providers adhering to Level 1 PCI DSS standards.',
        '4. Client Rights: Under the UK Data Protection Act and UK GDPR, you have the right to request access to, rectification of, or deletion of your personal records at any time by contacting our Data Protection Officer at privacy@arabandbeyond.com.'
      ]
    },
    cookies: {
      title: 'Cookie & Tracking Technology Policy',
      subtitle: 'Consent-First Protocol • Updated November 2026',
      content: [
        '1. What Are Cookies: Cookies are small text files placed on your device to ensure smooth website navigation, save itinerary preferences (such as your currency choice and saved wishlists), and measure performance.',
        '2. Essential Cookies: Strictly necessary for security, CSRF protection, and shopping cart persistence. These cannot be disabled.',
        '3. Analytics & Performance: With your consent, we use privacy-friendly analytics to monitor page performance, Core Web Vitals, and ensure effortless browsing on desktop and mobile devices.',
        '4. Managing Preferences: You can update or revoke your cookie choices at any time via the cookie banner or by clearing browser local storage.'
      ]
    },
    cancellation: {
      title: 'Cancellation & Refund Information',
      subtitle: 'Transparent Cancellation Terms • Updated November 2026',
      content: [
        '1. Cancellation by Client: Cancellations must be delivered in writing to concierge@arabandbeyond.com. Cancellation fees depend on the timeframe before scheduled departure.',
        '2. Standard Package Cancellation: Up to 35 days prior to arrival: Full refund of monies paid less the initial deposit. Between 34 and 15 days prior: 50% refund. Within 14 days of departure: Non-refundable.',
        '3. Hotel Only Bookings: Individual hotel bookings are governed by property-specific policies clearly displayed on each hotel detail page. Most flexible rates permit complimentary cancellation up to 48–72 hours prior to check-in.',
        '4. Supplier Unavailability: In the rare event that a confirmed villa or package is rendered unavailable by a supplier prior to travel, Arab & Beyond will provide an upgraded equivalent luxury property or a prompt 100% refund of all monies paid.'
      ]
    }
  };

  const doc = legalContent[slug] || legalContent['terms'];

  return (
    <div className="pt-28 pb-24 bg-[#0B0D10] text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Legal & Regulatory', href: '#' }, { label: doc.title }]} />

        <div className="rounded-3xl bg-[#12161E] border border-white/10 p-8 sm:p-14 shadow-2xl my-8 space-y-8">
          <div className="space-y-2 pb-6 border-b border-white/10">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A880]">
              Regulatory Disclosure
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal">
              {doc.title}
            </h1>
            <p className="text-xs text-white/50">{doc.subtitle}</p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-white/80 leading-relaxed font-light">
            {doc.content.map((paragraph, idx) => (
              <p key={idx} className="pb-3 border-b border-white/[0.04] last:border-0">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 text-xs text-white/40 flex items-center justify-between">
            <span>Arab & Beyond Ltd • Registered in England & Wales</span>
            <span>Concierge Legal Desk: legal@arabandbeyond.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}

