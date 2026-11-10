'use client';

import React from 'react';
import Link from 'next/link';
import { useTravelStore } from '@/lib/store';
import { formatPrice, formatDate } from '@/lib/utils';
import {
  TrendingUp,
  CreditCard,
  Users,
  Compass,
  Building,
  Package,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { enquiries, orders, packages, hotels, destinations, currency } = useTravelStore();

  // Metrics computation (Section 25: Avoid treating requests or failed payments as completed sales)
  const paidOrders = orders.filter((o) => o.paymentStatus === 'successful');
  const grossSales = paidOrders.reduce((acc, curr) => acc + curr.depositRequired, 0);
  const totalBalanceDue = paidOrders.reduce((acc, curr) => acc + curr.balanceDue, 0);
  const totalEnquiries = enquiries.length;
  const conversionRate = totalEnquiries > 0 ? ((orders.length / totalEnquiries) * 100).toFixed(1) : '0';

  // Enquiries by destination
  const destCounts: Record<string, number> = {};
  enquiries.forEach((e) => {
    const dest = e.destinationName || 'General';
    destCounts[dest] = (destCounts[dest] || 0) + 1;
  });

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Top Welcome & KPI row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-[#C5A880]">
            Executive Dashboard
          </span>
          <h1 className="font-serif text-3xl text-white font-normal">
            Arab & Beyond Operations & Sales Pipeline
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/packages"
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-white border border-white/10 font-medium transition-colors"
          >
            + Add Package
          </Link>
          <Link
            href="/admin/enquiries"
            className="px-4 py-2 rounded-xl bg-[#C5A880] hover:bg-[#DFC9AA] text-black text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Manage CRM Leads
          </Link>
        </div>
      </div>

      {/* KPI Cards (Section 25) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Gross Collected */}
        <div className="p-6 rounded-3xl bg-[#12161E] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase font-mono tracking-wider text-white/50">
              Collected Deposits
            </span>
            <div className="w-8 h-8 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-white tracking-tight">
            {formatPrice(grossSales, currency)}
          </div>
          <div className="text-[11px] text-white/40 flex items-center gap-1">
            <span className="text-emerald-400 font-medium">Verified Payments</span>
            <span>across {paidOrders.length} bookings</span>
          </div>
        </div>

        {/* Unpaid Balances */}
        <div className="p-6 rounded-3xl bg-[#12161E] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase font-mono tracking-wider text-white/50">
              Pending Balance Due
            </span>
            <div className="w-8 h-8 rounded-full bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-[#DFC9AA] tracking-tight">
            {formatPrice(totalBalanceDue, currency)}
          </div>
          <div className="text-[11px] text-white/40">
            Due 30 days prior to departure
          </div>
        </div>

        {/* Total Enquiries */}
        <div className="p-6 rounded-3xl bg-[#12161E] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase font-mono tracking-wider text-white/50">
              Total Enquiries
            </span>
            <div className="w-8 h-8 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-white tracking-tight">
            {totalEnquiries}
          </div>
          <div className="text-[11px] text-white/40">
            Lead conversion rate: <strong className="text-white">{conversionRate}%</strong>
          </div>
        </div>

        {/* Product Catalog Size */}
        <div className="p-6 rounded-3xl bg-[#12161E] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase font-mono tracking-wider text-white/50">
              Active Inventory
            </span>
            <div className="w-8 h-8 rounded-full bg-purple-500/15 text-purple-400 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-white tracking-tight">
            {packages.length} <span className="text-base text-white/40 font-normal">Pkgs</span> / {hotels.length} <span className="text-base text-white/40 font-normal">Hotels</span>
          </div>
          <div className="text-[11px] text-white/40">
            Across 5 launch destinations
          </div>
        </div>
      </div>

      {/* Grid: Recent Enquiries Pipeline + Destination Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left (8 Cols): Recent Enquiries Table */}
        <div className="lg:col-span-8 rounded-3xl bg-[#12161E] border border-white/10 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div>
              <h3 className="font-serif text-xl text-white font-medium">
                Recent Concierge Enquiries
              </h3>
              <p className="text-xs text-white/50">
                Actionable leads awaiting staff follow-up
              </p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs text-[#C5A880] hover:underline flex items-center gap-1"
            >
              <span>View CRM Pipeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-white/40 border-b border-white/5 font-mono">
                  <th className="pb-3 font-normal">REF / DATE</th>
                  <th className="pb-3 font-normal">CLIENT NAME</th>
                  <th className="pb-3 font-normal">DESTINATION</th>
                  <th className="pb-3 font-normal">CHANNEL</th>
                  <th className="pb-3 font-normal">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {enquiries.slice(0, 5).map((enq) => (
                  <tr key={enq.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 font-mono text-white/80">
                      <div>{enq.referenceId}</div>
                      <div className="text-[10px] text-white/40">{formatDate(enq.createdAt)}</div>
                    </td>
                    <td className="py-3 text-white font-medium">
                      {enq.customerName}
                    </td>
                    <td className="py-3 text-white/70">
                      {enq.destinationName || 'General'}
                    </td>
                    <td className="py-3 text-white/50 text-[11px]">
                      {enq.enquiryChannel}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                          enq.status === 'New'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : enq.status === 'Quoted'
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-white/10 text-white/70'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right (4 Cols): Destination Enquiries Share */}
        <div className="lg:col-span-4 rounded-3xl bg-[#12161E] border border-white/10 p-6 space-y-4">
          <div className="pb-3 border-b border-white/[0.08]">
            <h3 className="font-serif text-xl text-white font-medium">
              Destination Interest
            </h3>
            <p className="text-xs text-white/50">
              Lead allocation across launch destinations
            </p>
          </div>

          <div className="space-y-3 text-xs">
            {destinations.map((dest) => {
              const count = destCounts[dest.name] || 0;
              const pct = totalEnquiries > 0 ? Math.round((count / totalEnquiries) * 100) : 0;
              return (
                <div key={dest.id} className="space-y-1">
                  <div className="flex justify-between text-white/80">
                    <span>{dest.name}</span>
                    <span className="font-mono text-white/50">{count} ({pct}%)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full bg-[#C5A880] rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

