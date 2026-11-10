'use client';

import React, { useState, useMemo } from 'react';
import { useTravelStore } from '@/lib/store';
import { Enquiry, EnquiryStatus } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import {
  Users,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  Calendar,
  Sparkles,
  MessageSquare,
  X,
  Plus,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function AdminEnquiriesPage() {
  const { enquiries, updateEnquiryStatus, assignEnquiryAgent, activeRole } = useTravelStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [newNote, setNewNote] = useState('');

  const statuses: (EnquiryStatus | 'all')[] = [
    'all',
    'New',
    'Contacted',
    'Quoted',
    'Follow-up',
    'Won',
    'Lost',
    'Spam'
  ];

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((e) => {
      if (statusFilter !== 'all' && e.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = e.customerName.toLowerCase().includes(q);
        const matchEmail = e.email.toLowerCase().includes(q);
        const matchRef = e.referenceId.toLowerCase().includes(q);
        const matchDest = (e.destinationName || '').toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchRef && !matchDest) return false;
      }
      return true;
    });
  }, [enquiries, statusFilter, searchQuery]);

  const handleExportCsv = () => {
    const headers = [
      'Reference ID',
      'Created At',
      'Client Name',
      'Email',
      'Phone',
      'Destination',
      'Package/Hotel',
      'Status',
      'Channel',
      'Assigned Staff'
    ];
    const rows = filteredEnquiries.map((e) => [
      e.referenceId,
      e.createdAt,
      `"${e.customerName}"`,
      e.email,
      e.phone,
      `"${e.destinationName || ''}"`,
      `"${e.packageName || e.hotelName || ''}"`,
      e.status,
      e.enquiryChannel,
      `"${e.assignedAgent || 'Unassigned'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Arab_and_Beyond_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedEnquiry) return;

    updateEnquiryStatus(selectedEnquiry.id, selectedEnquiry.status, newNote.trim());
    setNewNote('');

    // Update local selected copy
    const updated = {
      ...selectedEnquiry,
      internalNotes: [
        ...(selectedEnquiry.internalNotes || []),
        {
          id: `note-${Date.now()}`,
          author: activeRole,
          timestamp: new Date().toISOString(),
          content: newNote.trim()
        }
      ]
    };
    setSelectedEnquiry(updated);
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-[#C5A880]">
            Concierge CRM
          </span>
          <h1 className="font-serif text-3xl text-white font-normal">
            Sales & Enquiries Pipeline
          </h1>
          <p className="text-xs text-white/50">
            Track inquiries from packages, hotels, live chat, and WhatsApp touchpoints.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs border border-white/10 font-medium transition-colors flex items-center gap-2 shrink-0"
        >
          <Download className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Export Filtered CSV</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-[#12161E] border border-white/10 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex flex-wrap items-center gap-2">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors ${
                statusFilter === st
                  ? 'bg-[#C5A880] text-black font-semibold'
                  : 'bg-white/5 text-white/60 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by name, email, ref..."
            className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-white/40 focus:border-[#C5A880] focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-3xl bg-[#12161E] border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/10 text-white/40 font-mono">
                <th className="py-4 px-6">REF / TIMESTAMP</th>
                <th className="py-4 px-6">CUSTOMER DETAILS</th>
                <th className="py-4 px-6">DESTINATION / PRODUCT</th>
                <th className="py-4 px-6">CHANNEL</th>
                <th className="py-4 px-6">ASSIGNED AGENT</th>
                <th className="py-4 px-6">STATUS</th>
                <th className="py-4 px-6 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredEnquiries.map((enq) => (
                <tr
                  key={enq.id}
                  onClick={() => setSelectedEnquiry(enq)}
                  className="hover:bg-white/[0.03] transition-colors cursor-pointer"
                >
                  <td className="py-4 px-6 font-mono text-white/90">
                    <div className="font-semibold text-white">{enq.referenceId}</div>
                    <div className="text-[10px] text-white/40">{formatDate(enq.createdAt)}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-white">{enq.customerName}</div>
                    <div className="text-[11px] text-white/50">{enq.email}</div>
                  </td>
                  <td className="py-4 px-6 text-white/80">
                    <div className="font-medium">{enq.destinationName || 'General'}</div>
                    <div className="text-[10px] text-white/50 truncate max-w-xs">
                      {enq.packageName || enq.hotelName || enq.requirements}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-white/60">
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono">
                      {enq.enquiryChannel}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-white/70">
                    {enq.assignedAgent || (
                      <span className="text-white/30 italic">Unassigned</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                        enq.status === 'New'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : enq.status === 'Quoted'
                          ? 'bg-blue-500/20 text-blue-300'
                          : enq.status === 'Won'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-white/10 text-white/60'
                      }`}
                    >
                      {enq.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="px-3 py-1.5 rounded-lg bg-[#C5A880]/15 hover:bg-[#C5A880]/30 text-[#DFC9AA] text-xs font-medium border border-[#C5A880]/30 transition-colors">
                      Open Record
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enquiry Detail Drawer / Modal (Section 24) */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-2xl max-h-[90vh] rounded-3xl bg-[#141822] border border-white/10 p-6 sm:p-8 shadow-2xl overflow-y-auto relative text-white space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A880]">
                  Lead Dossier • {selectedEnquiry.referenceId}
                </span>
                <h3 className="font-serif text-2xl font-medium text-white">
                  {selectedEnquiry.customerName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 rounded-lg text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions (Status & Agent Assignment) */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block mb-1">
                  Update Lead Status
                </label>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) => {
                    const newSt = e.target.value as EnquiryStatus;
                    updateEnquiryStatus(selectedEnquiry.id, newSt);
                    setSelectedEnquiry({ ...selectedEnquiry, status: newSt });
                  }}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-white"
                >
                  {statuses.filter((s) => s !== 'all').map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#C5A880] block mb-1">
                  Assign Staff Concierge
                </label>
                <select
                  value={selectedEnquiry.assignedAgent || ''}
                  onChange={(e) => {
                    assignEnquiryAgent(selectedEnquiry.id, e.target.value);
                    setSelectedEnquiry({ ...selectedEnquiry, assignedAgent: e.target.value });
                  }}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-white"
                >
                  <option value="">Unassigned</option>
                  <option value="Eleanor Vance (Senior Arabian Concierge)">Eleanor Vance (Senior Arabian Concierge)</option>
                  <option value="Tariq Al-Mansoor (Red Sea Specialist)">Tariq Al-Mansoor (Red Sea Specialist)</option>
                  <option value="Julian Sterling (Mayfair Desk)">Julian Sterling (Mayfair Desk)</option>
                </select>
              </div>
            </div>

            {/* Core Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-white/70">
              <div>
                <strong>Email:</strong> {selectedEnquiry.email}
              </div>
              <div>
                <strong>Phone:</strong> {selectedEnquiry.phone}
              </div>
              <div>
                <strong>Destination:</strong> {selectedEnquiry.destinationName || 'N/A'}
              </div>
              <div>
                <strong>Budget Guidance:</strong> {selectedEnquiry.budgetRange || 'Not specified'}
              </div>
              <div>
                <strong>Party:</strong> {selectedEnquiry.adultsCount} Adults, {selectedEnquiry.childrenCount} Children
              </div>
              <div>
                <strong>Source:</strong> {selectedEnquiry.sourcePage} ({selectedEnquiry.enquiryChannel})
              </div>
            </div>

            {/* Customer Message / Requirements */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-[10px] uppercase font-bold text-white/50 block">Customer Requirements / Narrative:</span>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                {selectedEnquiry.requirements}
              </p>
            </div>

            {/* Internal Staff Activity Log & Notes (Section 24) */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <h4 className="font-serif text-lg text-white font-medium">
                Internal Concierge Activity Log & Notes
              </h4>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selectedEnquiry.internalNotes && selectedEnquiry.internalNotes.length > 0 ? (
                  selectedEnquiry.internalNotes.map((note) => (
                    <div
                      key={note.id}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs space-y-1"
                    >
                      <div className="flex justify-between text-[10px] text-white/40 font-mono">
                        <span className="text-[#DFC9AA]">{note.author}</span>
                        <span>{formatDate(note.timestamp)}</span>
                      </div>
                      <p className="text-white/80">{note.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-white/40 italic">No internal staff notes recorded yet.</p>
                )}
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Add internal staff note or call outcome..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-[#C5A880] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!newNote.trim()}
                  className="px-4 py-2 rounded-xl bg-[#C5A880] text-black font-semibold text-xs disabled:opacity-40"
                >
                  Post Note
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

