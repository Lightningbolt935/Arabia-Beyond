'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useTravelStore } from '@/lib/store';
import { MessageSquareText } from 'lucide-react';

interface WhatsAppButtonProps {
  contextDestination?: string;
  contextProduct?: string;
  contextDates?: string;
}

export default function WhatsAppButton({
  contextDestination,
  contextProduct,
  contextDates
}: WhatsAppButtonProps) {
  const pathname = usePathname();
  const { settings } = useTravelStore();

  const isAdmin = pathname.startsWith('/admin');
  if (isAdmin) return null;

  // Build message based on context
  let message = settings.whatsAppDefaultMessage;
  if (contextDestination) {
    message = message.replace('{destination}', contextDestination);
  } else {
    message = message.replace('{destination}', 'the Arabian Peninsula');
  }

  if (contextProduct) {
    message += ` I am specifically looking at "${contextProduct}".`;
  }
  if (contextDates) {
    message += ` My preferred travel timeframe is ${contextDates}.`;
  }

  const cleanPhone = settings.whatsAppNumber.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message);
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;

  return (
    <div id="whatsapp-pill" className="fixed bottom-6 left-6 z-40 print:hidden">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 px-4 py-2.5 rounded-full bg-black/75 backdrop-blur-2xl border border-white/15 hover:border-emerald-500/50 text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Direct WhatsApp Concierge"
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <MessageSquareText className="w-4 h-4" />
          </div>
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-75" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full" />
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-[9px] uppercase font-mono tracking-widest text-emerald-400 leading-none">
            Live Atelier
          </span>
          <span className="text-xs font-sans font-semibold text-white mt-0.5">
            WhatsApp Concierge
          </span>
        </div>
      </a>
    </div>
  );
}
