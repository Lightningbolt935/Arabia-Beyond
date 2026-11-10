'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useTravelStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import {
  CheckCircle2,
  Clock,
  Printer,
  PhoneCall
} from 'lucide-react';

export default function ConfirmationPage() {
  const params = useParams();
  const orderId = params?.orderId as string;
  const { orders, settings } = useTravelStore();

  const order = orders.find((o) => o.id === orderId) || orders[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-28 pb-32 bg-[#060709] text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Printable/Display Container */}
        <div className="rounded-3xl bg-[#0B0D12] border border-white/[0.06] p-8 sm:p-14 shadow-2xl space-y-10 my-8">
          {/* Top Header Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/[0.06]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E]">
                  Booking Received & Authenticated
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl text-white font-light tracking-tight mt-0.5">
                  Reservation Reference: {order.orderReference}
                </h1>
              </div>
            </div>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono tracking-wider text-white/80 border border-white/10 transition-colors print:hidden shrink-0"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Order Receipt</span>
            </button>
          </div>

          {/* Status Alert Banner (Section 18 & 14) */}
          <div className="p-5 rounded-2xl bg-[#C8A97E]/10 border border-[#C8A97E]/30 space-y-1.5 text-xs text-[#E5D1B8]">
            <div className="flex items-center gap-2 font-medium">
              <Clock className="w-4 h-4 text-[#C8A97E]" />
              <span>
                Booking Status:{' '}
                {order.orderStatus === 'booking_pending_supplier_confirmation'
                  ? 'Request Awaiting Supplier Allocation Check'
                  : 'Confirmed'}
              </span>
            </div>
            <p className="text-white/70 text-[11px] leading-relaxed font-light">
              In accordance with our luxury quality guarantees, Arab & Beyond verifies direct room and villa allocation with our resort partner before final vouchers are stamped. Your deposit of {formatPrice(order.depositRequired, order.currency)} has been pre-authorised.
            </p>
          </div>

          {/* Itinerary & Guest Particulars Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs font-light">
            <div className="space-y-3">
              <h3 className="font-serif text-base text-white uppercase tracking-wider font-normal">
                Itinerary Particulars
              </h3>
              <div className="space-y-2 text-white/70">
                <div><strong className="text-white font-medium">Product:</strong> {order.productName}</div>
                <div><strong className="text-white font-medium">Destination:</strong> {order.destinationName}</div>
                <div><strong className="text-white font-medium">Selected Option:</strong> {order.roomOrOptionSelected}</div>
                <div><strong className="text-white font-medium">Party:</strong> {order.travellers.adults} Adults</div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-base text-white uppercase tracking-wider font-normal">
                Lead Passenger & Financials
              </h3>
              <div className="space-y-2 text-white/70">
                <div><strong className="text-white font-medium">Guest Name:</strong> {order.customerDetails.fullName}</div>
                <div><strong className="text-white font-medium">Email:</strong> {order.customerDetails.email}</div>
                <div><strong className="text-white font-medium">Payment Method:</strong> {order.paymentMethod.toUpperCase()}</div>
                <div><strong className="text-white font-medium">Deposit Paid:</strong> {formatPrice(order.depositRequired, order.currency)}</div>
                <div><strong className="text-white font-medium">Balance Remaining:</strong> {formatPrice(order.balanceDue, order.currency)}</div>
              </div>
            </div>
          </div>

          {/* Step-by-Step Next Steps Timeline (Section 14) */}
          <div className="pt-8 border-t border-white/[0.04] space-y-5">
            <h3 className="font-serif text-xl text-white font-light tracking-tight">
              What Happens Next
            </h3>
            <div className="space-y-4 text-xs text-white/70 font-light">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#C8A97E] to-[#DFC9AA] text-black font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                <div className="pt-0.5">
                  <strong className="text-white font-medium">Concierge Review:</strong> Your designated Arabian travel manager reviews all special dining and flight preferences.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-white/[0.06] text-white/80 font-bold flex items-center justify-center shrink-0 text-[10px] border border-white/10">2</span>
                <div className="pt-0.5">
                  <strong className="text-white font-medium">Supplier Allocation:</strong> Room allocation and private VIP chauffeur vehicles are locked with our regional team.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-white/[0.06] text-white/80 font-bold flex items-center justify-center shrink-0 text-[10px] border border-white/10">3</span>
                <div className="pt-0.5">
                  <strong className="text-white font-medium">Final Documentation:</strong> Your personalized digital itinerary dossier, visa entry instructions, and 24/7 emergency concierge WhatsApp direct desk are provided.
                </div>
              </div>
            </div>
          </div>

          {/* Concierge Contact Footer */}
          <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-white/50 print:hidden font-light">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#C8A97E]" />
              <span>Questions? Call Mayfair Desk: {settings.contactPhone}</span>
            </div>

            <Link
              href="/"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#C8A97E] to-[#DFC9AA] text-black font-semibold uppercase tracking-[0.2em] text-xs hover:brightness-105 transition-all shadow-md"
            >
              Return to Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
