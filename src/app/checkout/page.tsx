'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTravelStore } from '@/lib/store';
import { formatPrice, formatDate } from '@/lib/utils';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import {
  Lock,
  CreditCard,
  Building,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Calendar,
  Users,
  ArrowRight,
  Info
} from 'lucide-react';
import { PaymentMethod } from '@/lib/types';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { packages, hotels, currency, addBookingOrder } = useTravelStore();

  const type = (searchParams?.get('type') || 'package') as 'package' | 'hotel';
  const id = searchParams?.get('id') || '';
  const dateId = searchParams?.get('dateId') || '';
  const initialAdults = parseInt(searchParams?.get('adults') || searchParams?.get('guests') || '2');
  const initialNights = parseInt(searchParams?.get('nights') || '3');

  // Find product
  const packageItem = type === 'package' ? packages.find((p) => p.id === id) || packages[0] : null;
  const hotelItem = type === 'hotel' ? hotels.find((h) => h.id === id) || hotels[0] : null;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [adults, setAdults] = useState(initialAdults);
  const [nights, setNights] = useState(initialNights);

  // Guest Details
  const [guestDetails, setGuestDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'United Kingdom',
    specialRequests: '',
    dietaryRestrictions: ''
  });

  // Payment Options
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock Card Inputs
  const [cardData, setCardData] = useState({
    number: '•••• •••• •••• 4242',
    nameOnCard: '',
    expiry: '12/28',
    cvv: '•••'
  });

  // Calculation
  let title = '';
  let destination = '';
  let unitRate = 0;
  let totalAmount = 0;
  let optionName = '';

  if (type === 'package' && packageItem) {
    title = packageItem.name;
    destination = packageItem.destinationName;
    const depDate = packageItem.departureDates.find((d) => d.id === dateId) || packageItem.departureDates[0];
    unitRate = depDate ? depDate.pricePerPerson : packageItem.priceFrom;
    totalAmount = unitRate * adults;
    optionName = `${packageItem.durationDays}D/${packageItem.durationNights}N Package`;
  } else if (hotelItem) {
    title = hotelItem.name;
    destination = hotelItem.destinationName;
    unitRate = hotelItem.priceFromPerNight;
    totalAmount = unitRate * nights;
    optionName = `${nights} Nights (${hotelItem.roomTypes[0]?.name || 'Deluxe Room'})`;
  }

  const depositRequired = Math.round(totalAmount * 0.2); // 20%
  const balanceDue = totalAmount - depositRequired;

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert('Please review and accept the booking terms to proceed.');
      return;
    }

    setIsProcessing(true);

    const newOrder = addBookingOrder({
      type,
      productId: (packageItem?.id || hotelItem?.id) as string,
      productName: title,
      destinationName: destination,
      customerDetails: guestDetails,
      travelDates: {
        startDate: '2026-11-20',
        endDate: '2026-11-26',
        durationDays: type === 'package' ? packageItem?.durationDays : nights
      },
      travellers: {
        adults,
        children: 0
      },
      roomOrOptionSelected: optionName,
      lineItems: [
        { description: `${title} (${adults} Adults)`, amount: totalAmount }
      ],
      subtotal: totalAmount,
      taxesAndFees: 0,
      totalAmount,
      currency,
      depositRequired,
      balanceDue,
      balanceDueDate: '2026-11-15',
      paymentMethod,
      // Payment states separated from booking states (Section 18)
      paymentStatus: paymentMethod === 'bank_transfer_request' ? 'pending' : 'successful',
      orderStatus: 'booking_pending_supplier_confirmation', // NEVER falsely confirmed (Section 14 & 18)
      termsAccepted: true,
      termsAcceptedTimestamp: new Date().toISOString(),
      termsVersion: 'v2026.11',
      isDemoTransaction: false,
      auditTrail: [
        {
          timestamp: new Date().toISOString(),
          action: `Order initiated online via ${paymentMethod}`,
          performedBy: 'Client'
        }
      ]
    });

    setTimeout(() => {
      setIsProcessing(false);
      router.push(`/confirmation/${newOrder.id}`);
    }, 1200);
  };

  return (
    <div className="pt-28 pb-32 bg-[#060709] text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Checkout & Reservation' }]} />

        {/* Checkout Header & Transparent Progress Indicator (Section 14) */}
        <div className="my-10 pb-6 border-b border-white/[0.06] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E]">
                Arab & Beyond Concierge Checkout
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl text-white font-light tracking-tight mt-1">
                Complete Your Voyage Reservation
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
              <Lock className="w-4 h-4 text-[#C8A97E]" />
              <span>256-Bit Encrypted Protocol</span>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2 sm:gap-6 text-xs font-mono uppercase tracking-wider">
            <button
              onClick={() => setStep(1)}
              className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${
                step >= 1 ? 'border-[#C8A97E] text-[#E5D1B8]' : 'border-transparent text-white/40'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px]">1</span>
              <span>1. Party & Preferences</span>
            </button>
            <span className="text-white/20">→</span>
            <button
              onClick={() => setStep(2)}
              className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${
                step >= 2 ? 'border-[#C8A97E] text-[#E5D1B8]' : 'border-transparent text-white/40'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px]">2</span>
              <span>2. Guest Particulars</span>
            </button>
            <span className="text-white/20">→</span>
            <button
              onClick={() => setStep(3)}
              className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${
                step >= 3 ? 'border-[#C8A97E] text-[#E5D1B8]' : 'border-transparent text-white/40'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px]">3</span>
              <span>3. Payment & Protection</span>
            </button>
          </div>
        </div>

        {/* Two-Column Grid: Form Details + Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Form Area (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {step === 1 && (
              <div className="rounded-3xl bg-[#0B0D12] border border-white/[0.06] p-8 sm:p-10 space-y-6 shadow-2xl animate-in fade-in duration-200">
                <h3 className="font-serif text-2xl text-white font-normal">
                  Step 1: Verify Itinerary Configuration
                </h3>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-2">
                  <div className="text-[10px] text-[#C8A97E] font-mono uppercase tracking-widest">Selected Voyage</div>
                  <h4 className="font-serif text-2xl text-white">{title}</h4>
                  <p className="text-xs text-white/60 font-light">{destination} • {optionName}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block mb-2">
                      Travellers Count
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setAdults(num)}
                          className={`flex-1 py-2.5 rounded-xl font-medium transition-all ${
                            adults === num
                              ? 'bg-gradient-to-r from-[#C8A97E] to-[#DFC9AA] text-black font-semibold shadow-md'
                              : 'bg-white/[0.03] text-white/70 hover:text-white border border-white/10'
                          }`}
                        >
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {type === 'hotel' && (
                    <div>
                      <label className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block mb-2">
                        Nights
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={30}
                        value={nights}
                        onChange={(e) => setNights(parseInt(e.target.value) || 1)}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-3 text-white focus:border-[#C8A97E] focus:outline-none"
                      />
                    </div>
                  )}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C8A97E] to-[#DFC9AA] text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 shadow-lg shadow-[#C8A97E]/20"
                  >
                    Continue to Guest Particulars →
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="rounded-3xl bg-[#0B0D12] border border-white/[0.06] p-8 sm:p-10 space-y-6 animate-in fade-in duration-200">
                <h3 className="font-serif text-2xl text-white font-normal">
                  Step 2: Lead Passenger & Contact Details
                </h3>

                <div className="space-y-4 text-xs font-light">
                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block mb-1.5">
                      Lead Voyager Full Name (as on Passport) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sir Julian Montgomery"
                      value={guestDetails.fullName}
                      onChange={(e) => setGuestDetails({ ...guestDetails, fullName: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 text-white focus:border-[#C8A97E] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-mono tracking-widest text-[#C8A97E] block mb-1.5">
                        Email Address for Confirmation *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="j.montgomery@domain.co.uk"
                        value={guestDetails.email}
                        onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-[#C5A880] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest text-[#C5A880] block mb-1">
                        Telephone (with country code) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+44 7700 900555"
                        value={guestDetails.phone}
                        onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-[#C5A880] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#C5A880] block mb-1">
                      Dietary Preferences or Dietary Allergies
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Halal, Gluten-free, Pescatarian..."
                      value={guestDetails.dietaryRestrictions}
                      onChange={(e) => setGuestDetails({ ...guestDetails, dietaryRestrictions: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-[#C5A880] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#C5A880] block mb-1">
                      Special Concierge Requests
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Celebrating an anniversary; prefer high-floor room with sunset view..."
                      value={guestDetails.specialRequests}
                      onChange={(e) => setGuestDetails({ ...guestDetails, specialRequests: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-[#C5A880] focus:outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs text-white/50 hover:text-white font-mono"
                  >
                    ← Back to Step 1
                  </button>
                  <button
                    onClick={() => {
                      if (!guestDetails.fullName || !guestDetails.email) {
                        alert('Please fill in required passenger name and email.');
                        return;
                      }
                      setStep(3);
                    }}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C8A97E] to-[#DFC9AA] text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 shadow-lg shadow-[#C8A97E]/20"
                  >
                    Proceed to Payment Method →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form
                onSubmit={handleCompleteOrder}
                className="rounded-3xl bg-[#0B0D12] border border-white/[0.06] p-8 sm:p-10 space-y-6 shadow-2xl animate-in fade-in duration-200"
              >
                <h3 className="font-serif text-2xl text-white font-normal">
                  Step 3: Select Payment Method & Terms
                </h3>

                {/* Payment Methods Selection (Section 17) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Credit Card */}
                  <label
                    className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition-colors ${
                      paymentMethod === 'card'
                        ? 'bg-[#151A24] border-[#C8A97E]'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mt-1 text-[#C8A97E] focus:ring-0"
                    />
                    <div>
                      <span className="font-semibold text-white block">Credit / Debit Card</span>
                      <span className="text-[11px] text-white/50">Visa, Mastercard, Amex (Tokenised & Protected)</span>
                    </div>
                  </label>

                  {/* PayPal */}
                  <label
                    className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition-colors ${
                      paymentMethod === 'paypal'
                        ? 'bg-[#151A24] border-[#C8A97E]'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'paypal'}
                      onChange={() => setPaymentMethod('paypal')}
                      className="mt-1 text-[#C8A97E] focus:ring-0"
                    />
                    <div>
                      <span className="font-semibold text-white block">PayPal Express</span>
                      <span className="text-[11px] text-white/50">Instant buyer protection checkout</span>
                    </div>
                  </label>

                  {/* Super Payments */}
                  <label
                    className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition-colors ${
                      paymentMethod === 'super_payments'
                        ? 'bg-[#151A24] border-[#C8A97E]'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'super_payments'}
                      onChange={() => setPaymentMethod('super_payments')}
                      className="mt-1 text-[#C8A97E] focus:ring-0"
                    />
                    <div>
                      <span className="font-semibold text-white block">Super Payments</span>
                      <span className="text-[11px] text-white/50">Zero card fees with cashback rewards</span>
                    </div>
                  </label>

                  {/* Bank Transfer Request */}
                  <label
                    className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition-colors ${
                      paymentMethod === 'bank_transfer_request'
                        ? 'bg-[#151A24] border-[#C8A97E]'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'bank_transfer_request'}
                      onChange={() => setPaymentMethod('bank_transfer_request')}
                      className="mt-1 text-[#C8A97E] focus:ring-0"
                    />
                    <div>
                      <span className="font-semibold text-white block">Wire / Bank Transfer</span>
                      <span className="text-[11px] text-white/50">Receive official pro-forma invoice</span>
                    </div>
                  </label>
                </div>

                {/* Tokenized Mock Card Input */}
                {paymentMethod === 'card' && (
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 text-xs">
                    <div>
                      <label className="text-[10px] uppercase font-mono tracking-wider text-white/50 block mb-1">
                        Card Number (Tokenised)
                      </label>
                      <input
                        type="text"
                        disabled
                        value="•••• •••• •••• 8842 (Encrypted Luxury Token)"
                        className="w-full bg-black/60 border border-white/10 rounded-xl p-2.5 text-white/80 font-mono text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase font-mono tracking-wider text-white/50 block mb-1">Expiry</label>
                        <input
                          type="text"
                          disabled
                          value="12 / 28"
                          className="w-full bg-black/60 border border-white/10 rounded-xl p-2 text-white/80 font-mono text-xs text-center"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-mono tracking-wider text-white/50 block mb-1">CVV Security</label>
                        <input
                          type="text"
                          disabled
                          value="•••"
                          className="w-full bg-black/60 border border-white/10 rounded-xl p-2 text-white/80 font-mono text-xs text-center"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* BNPL Finance Disclosure (Section 17) */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-white/50 leading-relaxed font-light">
                  <strong>Notice:</strong> All payments are processed through tokenised encryption. Arab & Beyond never stores raw card or CVV details on server infrastructure.
                </div>

                {/* Terms Acceptance Checkbox (Section 14 & 32: Recorded with version & timestamp) */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-white/70 font-light">
                    <input
                      type="checkbox"
                      required
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-0.5 rounded border-white/20 bg-white/5 text-[#C8A97E] focus:ring-0"
                    />
                    <span>
                      I understand and agree to the Arab & Beyond Terms of Booking and Cancellation Policy. I acknowledge that if supplier verification is required, this booking constitutes a confirmed reservation request until supplier allocation is validated.
                    </span>
                  </label>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs text-white/50 hover:text-white font-mono"
                  >
                    ← Back to Details
                  </button>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-10 py-4 rounded-full bg-gradient-to-r from-[#C8A97E] to-[#DFC9AA] hover:brightness-105 text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-[#C8A97E]/20 disabled:opacity-50"
                  >
                    {isProcessing ? 'Authorising Payment Request...' : `Complete Booking (${formatPrice(depositRequired, currency)} Deposit)`}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Order Summary Column (5 Cols) (Section 14) */}
          <div className="lg:col-span-5 rounded-3xl bg-[#0B0D12]/95 backdrop-blur-2xl border border-white/[0.08] p-8 space-y-6 shadow-2xl sticky top-28">
            <h3 className="font-serif text-xl text-white font-medium border-b border-white/[0.08] pb-4">
              Reservation Summary
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#C5A880]">Product</span>
                <div className="font-serif text-lg text-white font-medium">{title}</div>
                <div className="text-white/60">{destination}</div>
              </div>

              <div className="flex justify-between py-2 border-y border-white/[0.06] text-white/70">
                <span>Party Size:</span>
                <span className="text-white font-medium">{adults} Adults</span>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-white/70">
                  <span>Gross Itinerary Total:</span>
                  <span className="font-mono text-white">{formatPrice(totalAmount, currency)}</span>
                </div>
                <div className="flex justify-between text-[#DFC9AA] font-semibold">
                  <span>Deposit Payable Today (20%):</span>
                  <span className="font-mono">{formatPrice(depositRequired, currency)}</span>
                </div>
                <div className="flex justify-between text-white/50">
                  <span>Remaining Balance:</span>
                  <span className="font-mono">{formatPrice(balanceDue, currency)}</span>
                </div>
                <div className="text-[11px] text-white/40 italic">
                  Balance due 30 days prior to departure.
                </div>
              </div>

              {/* Status Notice (Section 14: Never falsely state room is confirmed without supplier verification) */}
              <div className="p-3.5 rounded-xl bg-[#C5A880]/10 border border-[#C5A880]/30 text-[11px] text-[#DFC9AA] flex items-start gap-2">
                <Info className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <p>
                  <strong>Supplier Check Guarantee:</strong> Upon payment authorization, our concierge verifies room allocation with the property before issuing final travel vouchers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0D10] text-white pt-32 text-center">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

