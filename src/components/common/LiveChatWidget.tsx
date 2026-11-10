'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTravelStore } from '@/lib/store';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  UserCheck,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user' | 'concierge';
  text: string;
  timestamp: string;
  actionLinks?: { label: string; href: string }[];
}

export default function LiveChatWidget() {
  const pathname = usePathname();
  const { addEnquiry } = useTravelStore();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: 'Good day. Welcome to Arab & Beyond. I am your AI Private Travel Assistant, trained on our handpicked luxury sanctuaries across Bahrain, Oman, Saudi Arabia, The Red Sea, and Qatar. How may I assist your itinerary planning today?',
      timestamp: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '' });
  const [showLeadModal, setShowLeadModal] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isAdmin = pathname.startsWith('/admin');
  if (isAdmin) return null;

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const quickPrompts = [
    'Recommend a luxury honeymoon destination',
    'Tell me about the 7-day Oman expedition',
    'How do transfers to The Red Sea island resorts work?',
    'What are the best months to visit AlUla?'
  ];

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let reply = '';
      let links: { label: string; href: string }[] | undefined;

      const lower = query.toLowerCase();

      if (lower.includes('honeymoon') || lower.includes('couple') || lower.includes('anniversary')) {
        reply =
          'For an incomparable honeymoon, we highly recommend "Red Sea Island Resort Escape" at The St. Regis Red Sea Resort on Ummahat Island. Overwater coral villas with private plunge pools, seaplane transfers, and unblemished barrier reefs. Alternatively, for mountain romance and coastal serenity, consider "Muscat, Mountains and Desert" in Oman.';
        links = [
          { label: 'View Red Sea Escape', href: '/packages/red-sea-island-resort-escape' },
          { label: 'View Oman Expedition', href: '/packages/muscat-mountains-and-desert' }
        ];
      } else if (lower.includes('oman') || lower.includes('muscat') || lower.includes('mountain')) {
        reply =
          'Our flagship "Muscat, Mountains and Desert" is an illustrative 7-day private journey covering The Chedi Muscat, the 2,000m canyon heights at Alila Jabal Akhdar, and luxury tented dunes in the Wahiba Sands. Operated with private Lexus 4WD and senior Omani guides.';
        links = [
          { label: 'Explore Oman Itinerary', href: '/packages/muscat-mountains-and-desert' },
          { label: 'View Oman Destination', href: '/destinations/oman' }
        ];
      } else if (lower.includes('red sea') || lower.includes('transfer') || lower.includes('island')) {
        reply =
          'Transfers to The Red Sea Project are seamless: fly directly into Red Sea International Airport (RSI) via Saudia or flydubai, followed by chartered seaplane or private carbon-composite hydrogen boat transfer directly to your overwater villa jetty.';
        links = [
          { label: 'Explore The Red Sea', href: '/destinations/the-red-sea' },
          { label: 'St. Regis Red Sea Resort', href: '/hotels/the-st-regis-red-sea-resort' }
        ];
      } else if (lower.includes('alula') || lower.includes('saudi') || lower.includes('hegra')) {
        reply =
          'The prime season for AlUla is November through April, when temperatures average a temperate 20°C–25°C under brilliant blue skies. We orchestrate private sunset visits to Hegra with Saudi archaeologists and accommodations at Banyan Tree AlUla Ashar Valley.';
        links = [
          { label: 'Explore AlUla & Riyadh Package', href: '/packages/kingdoms-of-sand-and-stone' },
          { label: 'Banyan Tree AlUla', href: '/hotels/banyan-tree-alula' }
        ];
      } else if (lower.includes('bahrain') || lower.includes('formula') || lower.includes('pearl')) {
        reply =
          'Bahrain offers an intimate heritage and high-octane luxury blend: traditional natural pearl diving in UNESCO waters, private F1 paddock experiences at Sakhir Circuit, and retreats at Raffles Al Areen Palace.';
        links = [
          { label: 'Explore Bahrain Itinerary', href: '/packages/bahrain-pearls-and-palaces' },
          { label: 'Raffles Al Areen Palace', href: '/hotels/raffles-al-areen-palace-bahrain' }
        ];
      } else if (lower.includes('qatar') || lower.includes('doha') || lower.includes('art')) {
        reply =
          'In Qatar, we curate private viewings at the Museum of Islamic Art, private dhow cruises across West Bay, and ultra-luxury stays at Zulal Wellness Resort or Katara Towers.';
        links = [
          { label: 'View Qatar Destination', href: '/destinations/qatar' },
          { label: 'Qatar Grand Prix & Culture', href: '/packages/qatar-grand-prix-and-cultural-avant-garde' }
        ];
      } else {
        reply =
          `Arab & Beyond curates fully bespoke, tailor-made luxury expeditions across 5 sovereign Arabian regions: Bahrain, Oman, Saudi Arabia, The Red Sea, and Qatar. Every journey is custom-crafted to your dates, preferences, and privacy requirements. Would you like to connect with a senior travel designer?`;
        links = [
          { label: 'Custom Proposal Request', href: '/plan-your-trip' },
          { label: 'Browse 5 Regions', href: '/destinations' }
        ];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `reply-${Date.now()}`,
          sender: 'ai',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionLinks: links
        }
      ]);
    }, 700);
  };

  const handleCaptureLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email) return;

    addEnquiry({
      customerName: leadForm.name,
      email: leadForm.email,
      phone: leadForm.phone || '+44 20 7946 0888',
      destinationName: 'Arabian Peninsula',
      travelDatesType: 'flexible',
      adultsCount: 2,
      childrenCount: 0,
      preferredContactMethod: 'Email',
      budgetRange: '£15,000 - £35,000+',
      requirements: `Chat history inquiry: ${messages.map((m) => `[${m.sender}]: ${m.text}`).join(' | ')}`,
      sourcePage: pathname,
      enquiryChannel: 'Live Concierge Chat',
      priority: 'VIP'
    });

    setLeadCaptured(true);
    setShowLeadModal(false);

    setMessages((prev) => [
      ...prev,
      {
        id: `sys-${Date.now()}`,
        sender: 'concierge',
        text: `Thank you, ${leadForm.name}. A senior Arabian travel designer from our Mayfair concierge desk has received your inquiry and will review your conversation notes shortly.`,
        timestamp: 'Just now'
      }
    ]);
  };

  return (
    <>
      {/* Floating Launcher Button - Dark Glass Capsule */}
      <div id="chat-widget" className="fixed bottom-6 right-6 z-40 print:hidden">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3 px-5 py-3 rounded-full bg-black/75 backdrop-blur-2xl text-white border border-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:border-[#C5A880]/50 hover:scale-105 active:scale-95 transition-all duration-300"
            aria-label="Open Concierge Live Advisory"
          >
            <div className="relative">
              <Sparkles className="w-4 h-4 text-[#C5A880] group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#C5A880] rounded-full animate-ping opacity-75" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#C5A880] leading-none">
                AI Concierge
              </span>
              <span className="text-xs font-serif font-normal text-white mt-0.5">
                Live Advisory Desk
              </span>
            </div>
          </button>
        )}
      </div>

      {/* Chat Window Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm sm:max-w-md h-[580px] rounded-3xl bg-[#0B0E14]/98 backdrop-blur-3xl border border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="p-4 bg-white/[0.04] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-serif font-normal text-white">
                    Arab & Beyond Concierge
                  </h3>
                  <span className="text-[9px] bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-full font-mono flex items-center gap-1 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    Online
                  </span>
                </div>
                <p className="text-[10px] text-white/50 font-mono">
                  London & Dubai Private Advisory Desk
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowLeadModal(true)}
                className="px-3 py-1 text-[9px] uppercase tracking-wider font-mono rounded-full bg-white/5 hover:bg-white/10 text-[#DFC9AA] border border-[#C5A880]/30 transition-colors"
                title="Request human advisor callback"
              >
                Advisor
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close live chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="bg-black/40 px-3 py-2 border-b border-white/5 flex gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap scrollbar-none">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-white/70 hover:text-white border border-white/10 transition-colors shrink-0 font-light text-[11px]"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-[#C5A880] to-[#DFC9AA] text-black font-semibold rounded-tr-none shadow-md'
                      : m.sender === 'concierge'
                      ? 'bg-emerald-950/30 border border-emerald-500/20 text-white rounded-tl-none font-light'
                      : 'bg-white/[0.05] text-white/90 border border-white/10 rounded-tl-none font-light'
                  }`}
                >
                  {m.text}

                  {m.actionLinks && m.actionLinks.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-2">
                      {m.actionLinks.map((al, idx) => (
                        <a
                          key={idx}
                          href={al.href}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#C5A880] hover:text-black transition-colors text-[10px] font-mono text-white uppercase tracking-wider"
                        >
                          <span>{al.label}</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-white/40 font-mono mt-1 px-1">{m.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white/[0.04] w-20 border border-white/10 text-white/40 text-xs">
                <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full animate-bounce delay-150" />
                <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full animate-bounce delay-300" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Human Callback Modal */}
          {showLeadModal && (
            <div className="absolute inset-x-3 bottom-16 bg-[#161B22] border border-[#C5A880]/50 rounded-2xl p-4 shadow-2xl z-20 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#DFC9AA] flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                  Connect with Senior Specialist
                </span>
                <button
                  onClick={() => setShowLeadModal(false)}
                  className="text-white/40 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleCaptureLead} className="space-y-2 text-xs">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={leadForm.name}
                  onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-white placeholder-white/40 focus:border-[#C5A880] focus:outline-none"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={leadForm.email}
                  onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-white placeholder-white/40 focus:border-[#C5A880] focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone / WhatsApp (Optional)"
                  value={leadForm.phone}
                  onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-white placeholder-white/40 focus:border-[#C5A880] focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#C5A880] hover:bg-[#DFC9AA] text-black font-semibold rounded-lg uppercase tracking-wider text-[10px] transition-colors"
                >
                  Request Dedicated Callback
                </button>
              </form>
            </div>
          )}

          {/* Input Footer */}
          <div className="p-3 bg-[#07090E] border-t border-white/10">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask anything about destinations, villas or packages..."
                className="w-full bg-white/[0.06] border border-white/15 rounded-xl pl-3.5 pr-11 py-2.5 text-xs text-white placeholder-white/40 focus:border-[#C5A880] focus:outline-none"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="absolute right-1.5 p-1.5 rounded-lg bg-[#C5A880] text-black disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#DFC9AA] transition-colors"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-white/40 px-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#C5A880]" />
                Direct verified hotel & package data
              </span>
              <span>ClickConnector Live</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
