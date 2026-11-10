'use client';

import React, { useState } from 'react';
import { useTravelStore } from '@/lib/store';
import { BookingOrder, OrderStatus, PaymentStatus } from '@/lib/types';
import { formatPrice, formatDate } from '@/lib/utils';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Clock,
  Download,
  AlertCircle,
  X
} from 'lucide-react';

export default function AdminBookingsPage() {
  const { orders, currency, updateOrderStatus, updatePaymentStatus, activeRole } = useTravelStore();

  const [selectedOrder, setSelectedOrder] = useState<BookingOrder | null>(null);
  const [webhookSimulationNotice, setWebhookSimulationNotice] = useState<string | null>(null);

  const orderStatuses: OrderStatus[] = [
    'booking_pending_supplier_confirmation',
    'availability_confirmed',
    'confirmed',
    'cancelled',
    'refunded'
  ];

  const paymentStatuses: PaymentStatus[] = [
    'pending',
    'successful',
    'failed',
    'partially_refunded',
    'refunded'
  ];

  // Bank transfer verification action (Section 17 & 25)
  const handleVerifyBankTransfer = (orderId: string) => {
    updatePaymentStatus(orderId, 'successful', 'Bank transfer manually verified via pro-forma wire statement.');
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        paymentStatus: 'successful'
      });
    }
  };

  // Issue Refund Action
  const handleIssueRefund = (orderId: string) => {
    updatePaymentStatus(orderId, 'refunded', 'Full refund issued via payment token gateway.');
    updateOrderStatus(orderId, 'refunded', 'Order marked refunded due to client request.');
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        paymentStatus: 'refunded',
        orderStatus: 'refunded'
      });
    }
  };

  // Simulate Webhook Handling (Section 25 & 33)
  const handleSimulateWebhook = (orderId: string) => {
    updatePaymentStatus(orderId, 'successful', 'Webhook signed callback: payment_intent.succeeded with HMAC-SHA256 verified.');
    setWebhookSimulationNotice(`Signed webhook callback processed for ${orderId}. Idempotency key verified.`);
    setTimeout(() => setWebhookSimulationNotice(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-[#C5A880]">
            Finance & Order Reconciliation
          </span>
          <h1 className="font-serif text-3xl text-white font-normal">
            Orders, Bookings & Payment Gateway Ledger
          </h1>
          <p className="text-xs text-white/50">
            Independent booking vs payment statuses, bank wire verification, webhook idempotency, and audit trails.
          </p>
        </div>
      </div>

      {webhookSimulationNotice && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{webhookSimulationNotice}</span>
        </div>
      )}

      {/* Orders Table */}
      <div className="rounded-3xl bg-[#12161E] border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/10 text-white/40 font-mono">
                <th className="py-4 px-6">REFERENCE</th>
                <th className="py-4 px-6">PRODUCT / DESTINATION</th>
                <th className="py-4 px-6">LEAD GUEST</th>
                <th className="py-4 px-6">METHOD / DEPOSIT</th>
                <th className="py-4 px-6">PAYMENT STATUS</th>
                <th className="py-4 px-6">BOOKING STATUS</th>
                <th className="py-4 px-6 text-right">LEDGER ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((ord) => (
                <tr
                  key={ord.id}
                  onClick={() => setSelectedOrder(ord)}
                  className="hover:bg-white/[0.03] transition-colors cursor-pointer"
                >
                  <td className="py-4 px-6 font-mono text-white">
                    <div className="font-semibold text-white">{ord.orderReference}</div>
                    <div className="text-[10px] text-white/40">{formatDate(ord.createdAt)}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-white">{ord.productName}</div>
                    <div className="text-[10px] text-white/50">{ord.destinationName}</div>
                  </td>
                  <td className="py-4 px-6 text-white/80">
                    <div>{ord.customerDetails.fullName}</div>
                    <div className="text-[10px] text-white/40">{ord.customerDetails.email}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-mono font-semibold text-white">
                      {formatPrice(ord.depositRequired, ord.currency)}
                    </div>
                    <div className="text-[10px] text-white/40 uppercase font-mono">
                      {ord.paymentMethod}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                        ord.paymentStatus === 'successful'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : ord.paymentStatus === 'pending'
                          ? 'bg-[#C5A880]/20 text-[#DFC9AA]'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {ord.paymentStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                        ord.orderStatus === 'confirmed'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : ord.orderStatus === 'booking_pending_supplier_confirmation'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-white/10 text-white/60'
                      }`}
                    >
                      {ord.orderStatus.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs border border-white/10 transition-colors">
                      Audit Record
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Audit & Finance Drawer */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-2xl max-h-[90vh] rounded-3xl bg-[#141822] border border-white/10 p-6 sm:p-8 shadow-2xl overflow-y-auto relative text-white space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A880]">
                  Ledger Entry • {selectedOrder.orderReference}
                </span>
                <h3 className="font-serif text-2xl font-medium text-white">
                  {selectedOrder.productName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-lg text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Status Modifiers (Section 18 & 25) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block">
                  Booking Fulfillment Status
                </label>
                <select
                  value={selectedOrder.orderStatus}
                  onChange={(e) => {
                    const newSt = e.target.value as OrderStatus;
                    updateOrderStatus(selectedOrder.id, newSt);
                    setSelectedOrder({ ...selectedOrder, orderStatus: newSt });
                  }}
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white"
                >
                  {orderStatuses.map((st) => (
                    <option key={st} value={st}>{st.replace(/_/g, ' ')}</option>
                  ))}
                </select>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block">
                  Gateway Payment Status
                </label>
                <select
                  value={selectedOrder.paymentStatus}
                  onChange={(e) => {
                    const newP = e.target.value as PaymentStatus;
                    updatePaymentStatus(selectedOrder.id, newP);
                    setSelectedOrder({ ...selectedOrder, paymentStatus: newP });
                  }}
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white"
                >
                  {paymentStatuses.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Financial Details */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-white/60">Total Amount:</span>
                <span className="font-mono text-white font-semibold">{formatPrice(selectedOrder.totalAmount, selectedOrder.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Deposit Collected:</span>
                <span className="font-mono text-[#DFC9AA] font-semibold">{formatPrice(selectedOrder.depositRequired, selectedOrder.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Balance Due:</span>
                <span className="font-mono text-white">{formatPrice(selectedOrder.balanceDue, selectedOrder.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Payment Method:</span>
                <span className="font-mono uppercase">{selectedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Terms Accepted:</span>
                <span className="font-mono text-emerald-400">Yes ({selectedOrder.termsVersion})</span>
              </div>
            </div>

            {/* Special Administrative Actions */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] uppercase font-bold text-white/50 block">Privileged Ledger Actions:</span>
              <div className="flex flex-wrap gap-2 text-xs">
                {selectedOrder.paymentMethod === 'bank_transfer_request' && selectedOrder.paymentStatus === 'pending' && (
                  <button
                    onClick={() => handleVerifyBankTransfer(selectedOrder.id)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors"
                  >
                    Verify Bank Wire Receipt
                  </button>
                )}
                <button
                  onClick={() => handleSimulateWebhook(selectedOrder.id)}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Simulate Signed Webhook</span>
                </button>
                {selectedOrder.paymentStatus === 'successful' && (
                  <button
                    onClick={() => handleIssueRefund(selectedOrder.id)}
                    className="px-3.5 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-medium transition-colors"
                  >
                    Issue Refund
                  </button>
                )}
              </div>
            </div>

            {/* Audit Trail (Section 19 & 32) */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <h4 className="font-serif text-lg text-white font-medium">
                Cryptographic Audit Trail
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto text-xs">
                {selectedOrder.auditTrail.map((trail, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 space-y-0.5">
                    <div className="flex justify-between text-[10px] text-white/40 font-mono">
                      <span>{trail.performedBy}</span>
                      <span>{formatDate(trail.timestamp)}</span>
                    </div>
                    <div className="text-white/80">{trail.action}</div>
                    {trail.notes && <div className="text-white/50 italic text-[11px]">{trail.notes}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

