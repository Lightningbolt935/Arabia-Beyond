'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTravelStore } from '@/lib/store';
import {
  LayoutDashboard,
  Compass,
  Package,
  Building2,
  Users,
  CreditCard,
  Image as ImageIcon,
  Settings,
  ExternalLink,
  Shield,
  LogOut
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const { activeRole, setActiveRole } = useTravelStore();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Destinations', href: '/admin/destinations', icon: Compass },
    { name: 'Packages & Itineraries', href: '/admin/packages', icon: Package },
    { name: 'Hotels & Sanctuaries', href: '/admin/hotels', icon: Building2 },
    { name: 'Enquiries & CRM', href: '/admin/enquiries', icon: Users },
    { name: 'Orders & Payments', href: '/admin/bookings', icon: CreditCard },
    { name: 'Media Library', href: '/admin/media', icon: ImageIcon },
    { name: 'Settings & Integrations', href: '/admin/settings', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-[#0A0D12] border-r border-white/10 flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C5A880]/15 border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880]">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif text-sm tracking-widest text-white font-medium block">
                ARAB & BEYOND
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#C5A880] font-mono block">
                Management Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Role Selector (Section 19: Role-based access) */}
        <div className="p-4 border-b border-white/5">
          <label className="text-[10px] uppercase font-mono tracking-wider text-white/40 block mb-1">
            Active Staff Role
          </label>
          <select
            value={activeRole}
            onChange={(e) => setActiveRole(e.target.value as any)}
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-[#DFC9AA] focus:border-[#C5A880] focus:outline-none cursor-pointer font-medium"
          >
            <option value="Super Admin" className="bg-[#12161E]">Super Admin</option>
            <option value="Content Manager" className="bg-[#12161E]">Content Manager</option>
            <option value="Sales Concierge" className="bg-[#12161E]">Sales Concierge</option>
            <option value="Finance Officer" className="bg-[#12161E]">Finance Officer</option>
          </select>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#C5A880] text-black font-semibold shadow-md'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-[#C5A880]'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Shortcuts */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-white/80 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>View Live Website</span>
          </span>
          <span className="text-[10px] text-white/40 font-mono">Public</span>
        </Link>

        <div className="text-[10px] text-white/40 px-3 py-1 font-mono flex items-center justify-between">
          <span>Security: MFA Active</span>
          <span className="text-emerald-400">● Live</span>
        </div>
      </div>
    </aside>
  );
}

