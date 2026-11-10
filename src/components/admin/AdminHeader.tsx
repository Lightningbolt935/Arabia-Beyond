'use client';

import React from 'react';
import { useTravelStore } from '@/lib/store';
import { Bell, ShieldCheck, User } from 'lucide-react';

export default function AdminHeader() {
  const { activeRole, enquiries, orders } = useTravelStore();

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;

  return (
    <header className="h-16 bg-[#0E1116] border-b border-white/10 px-8 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <span className="text-xs uppercase font-mono tracking-widest text-white/50">
          Environment: Production Sandbox
        </span>
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px]">
          v1.0.0
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Enquiries alert badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs">
          <Bell className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>{newEnquiriesCount} New {newEnquiriesCount === 1 ? 'Lead' : 'Leads'}</span>
        </div>

        {/* Staff Profile Pill */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-white/10">
          <div className="w-8 h-8 rounded-full bg-[#C5A880]/20 border border-[#C5A880]/50 flex items-center justify-center text-[#DFC9AA]">
            <User className="w-4 h-4" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold text-white leading-tight">
              Concierge Staff
            </span>
            <span className="text-[10px] text-[#C5A880] font-mono leading-none">
              {activeRole}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

