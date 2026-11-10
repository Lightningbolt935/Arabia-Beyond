'use client';

import React, { useState } from 'react';
import { useTravelStore } from '@/lib/store';
import {
  Settings,
  MessageSquare,
  Sparkles,
  Save,
  CheckCircle2,
  Download,
  ShieldCheck,
  Globe
} from 'lucide-react';

export default function AdminSettingsPage() {
  const { settings, updateSettings, destinations, packages, hotels, enquiries, orders } = useTravelStore();

  const [formData, setFormData] = useState({ ...settings });
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  const handleExportFullBackup = () => {
    const backup = {
      exportTimestamp: new Date().toISOString(),
      version: '1.0.0',
      destinations,
      packages,
      hotels,
      enquiries,
      orders,
      settings: formData
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Arab_and_Beyond_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-[#C5A880]">
            System Parameters
          </span>
          <h1 className="font-serif text-3xl text-white font-normal">
            Website Settings & Integrations
          </h1>
          <p className="text-xs text-white/50">
            Configure WhatsApp deep links, ClickConnector live chat, office addresses, and automated backup exports.
          </p>
        </div>

        <button
          onClick={handleExportFullBackup}
          className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs border border-white/10 font-medium transition-colors flex items-center gap-2 shrink-0"
        >
          <Download className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Export System Backup (JSON)</span>
        </button>
      </div>

      {savedNotice && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>System configuration updated and persisted across public touchpoints.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 text-xs">
        {/* Contact Coordinates */}
        <div className="p-6 rounded-3xl bg-[#12161E] border border-white/10 space-y-4 shadow-xl">
          <h3 className="font-serif text-lg text-white font-medium">
            Concierge Desk & Coordinates
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-[#C5A880] block mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-[#C5A880] block mb-1">
                Contact Telephone
              </label>
              <input
                type="text"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-[#C5A880] block mb-1">
                Mayfair London Address
              </label>
              <input
                type="text"
                value={formData.londonOffice}
                onChange={(e) => setFormData({ ...formData, londonOffice: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-[#C5A880] block mb-1">
                Dubai DIFC Address
              </label>
              <input
                type="text"
                value={formData.dubaiOffice}
                onChange={(e) => setFormData({ ...formData, dubaiOffice: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white"
              />
            </div>
          </div>
        </div>

        {/* WhatsApp & ClickConnector Integrations (Section 16 & 26) */}
        <div className="p-6 rounded-3xl bg-[#12161E] border border-white/10 space-y-4 shadow-xl">
          <h3 className="font-serif text-lg text-white font-medium flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#C5A880]" />
            WhatsApp & ClickConnector Live Desk
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-[#C5A880] block mb-1">
                WhatsApp Direct Number (E.164)
              </label>
              <input
                type="text"
                value={formData.whatsAppNumber}
                onChange={(e) => setFormData({ ...formData, whatsAppNumber: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-[#C5A880] block mb-1">
                ClickConnector API Key
              </label>
              <input
                type="password"
                value={formData.clickConnectorApiKey}
                onChange={(e) => setFormData({ ...formData, clickConnectorApiKey: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-[#C5A880] block mb-1">
              WhatsApp Pre-filled Message Template
            </label>
            <textarea
              rows={2}
              value={formData.whatsAppDefaultMessage}
              onChange={(e) => setFormData({ ...formData, whatsAppDefaultMessage: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-white resize-none"
            />
            <span className="text-[10px] text-white/40 italic">
              Use {'{destination}'} as a variable placeholder to auto-inject the active page context.
            </span>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3.5 rounded-full bg-[#C5A880] hover:bg-[#DFC9AA] text-black font-semibold text-xs uppercase tracking-widest transition-all"
          >
            Save System Configurations
          </button>
        </div>
      </form>
    </div>
  );
}

