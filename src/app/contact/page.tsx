'use client';

import React, { useState } from 'react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { useTravelStore } from '@/lib/store';
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Clock,
  Send,
  CheckCircle2
} from 'lucide-react';

export default function ContactPage() {
  const { settings, addEnquiry } = useTravelStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState('all');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    addEnquiry({
      customerName: name,
      email,
      phone: phone || '+44 000 0000',
      destinationName: destination === 'all' ? 'General Enquiry' : destination,
      travelDatesType: 'flexible',
      adultsCount: 2,
      childrenCount: 0,
      preferredContactMethod: 'Email',
      requirements: message || 'General contact desk enquiry.',
      sourcePage: '/contact',
      enquiryChannel: 'Website Form',
      priority: 'Medium'
    });

    setSubmitted(true);
  };

  const cleanPhone = settings.whatsAppNumber.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    'Hello Arab & Beyond Concierge, I would like to speak with a travel designer regarding private journeys.'
  )}`;

  return (
    <div className="pt-28 pb-32 bg-[#07090E] text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Contact Concierge' }]} />

        <div className="max-w-2xl space-y-4 my-12">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#C8A97E] font-mono">
            <span>Mayfair & Dubai Concierge</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-white font-light tracking-tight leading-[1.08]">
            Connect with Our Arabian Travel Designers
          </h1>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">
            Direct communication with senior travel planners in London and Dubai. All enquiries receive a personal response within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start my-8">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 rounded-3xl bg-[#080A0E] border border-white/[0.08] p-8 sm:p-10 space-y-8 shadow-2xl">
            <h3 className="font-serif text-2xl text-white font-normal">
              Concierge Coordinates
            </h3>

            <div className="space-y-5 text-xs text-white/70 font-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C8A97E] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">London Mayfair Desk:</strong>
                  <span>{settings.londonOffice}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C8A97E] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Dubai DIFC Desk:</strong>
                  <span>{settings.dubaiOffice}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C8A97E] shrink-0" />
                <div>
                  <strong className="text-white block font-medium">Direct Telephone:</strong>
                  <span>{settings.contactPhone}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C8A97E] shrink-0" />
                <div>
                  <strong className="text-white block font-medium">Email:</strong>
                  <span>{settings.contactEmail}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#C8A97E] shrink-0" />
                <div>
                  <strong className="text-white block font-medium">Concierge Hours:</strong>
                  <span>Mon–Sat: 08:00 – 20:00 (GMT / GST)</span>
                </div>
              </div>
            </div>

            {/* WhatsApp Quick Link */}
            <div className="pt-6 border-t border-white/[0.06]">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-full bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-300 font-semibold text-xs uppercase tracking-[0.2em] border border-emerald-500/25 flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 rounded-3xl bg-[#080A0E] border border-white/[0.08] p-8 sm:p-12 shadow-2xl">
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/25">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-3xl text-white font-normal">Message Dispatched</h3>
                <p className="text-xs text-white/60 max-w-sm mx-auto font-light">
                  Thank you, {name}. A member of our Mayfair concierge desk will review your requirements and respond to {email} shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-xs">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                    Send a Direct Message
                  </h3>
                  <p className="text-white/50 font-light">
                    We invite you to outline your dates, group size, or questions.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 text-white focus:border-[#C8A97E] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="eleanor@domain.com"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 text-white focus:border-[#C8A97E] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block mb-2">
                      Telephone
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+44 7700 900888"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 text-white focus:border-[#C8A97E] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block mb-2">
                      Destination Interest
                    </label>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 text-white focus:border-[#C8A97E] focus:outline-none cursor-pointer"
                    >
                      <option value="all" className="bg-[#0B0D12]">General Arabian Travel</option>
                      <option value="Bahrain" className="bg-[#0B0D12]">Bahrain</option>
                      <option value="Oman" className="bg-[#0B0D12]">Oman</option>
                      <option value="Saudi Arabia" className="bg-[#0B0D12]">Saudi Arabia</option>
                      <option value="The Red Sea" className="bg-[#0B0D12]">The Red Sea</option>
                      <option value="Qatar" className="bg-[#0B0D12]">Qatar</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block mb-2">
                    Your Message or Travel Enquiry
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your upcoming journey..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-xs text-white placeholder-white/40 focus:border-[#C8A97E] focus:outline-none resize-none font-light leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#C8A97E] to-[#DFC9AA] hover:brightness-105 text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-[#C8A97E]/20 flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Concierge Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
