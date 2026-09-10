import React, { useState } from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { ShieldCheck, Save, RefreshCw } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { showToast } = useNotifications();

  const [platformFee, setPlatformFee] = useState('0.0% (Zero Kisan Commission)');
  const [apmcSyncInterval, setApmcSyncInterval] = useState('15 Minutes');
  const [escrowWindow, setEscrowWindow] = useState('Instant upon verified gate scan');
  const [autoApproveKYC, setAutoApproveKYC] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Settings Saved', 'Platform configuration successfully persisted.', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 font-sans">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          System Configuration & APMC Sync
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Global platform parameters, commission rate caps, and automated compliance rules
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1">
              Farmer Commission Policy
            </label>
            <input
              type="text"
              disabled
              value={platformFee}
              className="w-full h-11 px-4 rounded-xl bg-[#E8FFF6] border border-[#00F098] text-xs font-bold text-[#006D42] cursor-not-allowed"
            />
            <span className="text-[11px] text-[#64748B] mt-1 block">
              Core SIH26033 Mandate: 0% fee deducted from registered Indian kisans.
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1">
              National APMC Spot Price Sync Interval
            </label>
            <select
              value={apmcSyncInterval}
              onChange={e => setApmcSyncInterval(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-xs font-bold outline-none"
            >
              <option>5 Minutes (High-Frequency)</option>
              <option>15 Minutes</option>
              <option>1 Hour</option>
              <option>Daily at 07:00 AM</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1">
              Escrow Settlement Auto-Disbursement Trigger
            </label>
            <input
              type="text"
              value={escrowWindow}
              onChange={e => setEscrowWindow(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-xs font-medium focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0]">
            <div>
              <span className="text-xs font-bold text-[#0F172A] block">Auto-Verify Aadhaar / Kisan Credit Cards</span>
              <span className="text-[11px] text-[#64748B]">Verify land holding records against state registry APIs</span>
            </div>
            <input
              type="checkbox"
              checked={autoApproveKYC}
              onChange={e => setAutoApproveKYC(e.target.checked)}
              className="w-5 h-5 accent-[#0F172A] cursor-pointer"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-3 rounded-2xl bg-[#00F098] text-[#0F172A] font-extrabold text-xs hover:bg-[#00C97E] hover:text-white transition-all shadow-sm flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save System Parameters</span>
        </button>
      </form>
    </div>
  );
};
