import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../../components/common/Badge';
import { CheckCircle2, ShieldCheck, MapPin, Phone, Mail, Award } from 'lucide-react';

export const FarmerProfile: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="max-w-3xl mx-auto space-y-6 font-sans">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          Kisan Profile & Land Registry
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Verified credentials and APMC state portal registration
        </p>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
        {/* Profile Card Top */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-[#E2E8F0]">
          <div className="w-24 h-24 rounded-full bg-[#00F098] text-[#0F172A] text-2xl font-black flex items-center justify-center shadow-md ring-4 ring-[#00F098]/20 shrink-0">
            {currentUser?.name?.slice(0, 2).toUpperCase() || 'RP'}
          </div>
          <div className="text-center sm:text-left space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-black text-[#0F172A]">{currentUser?.name || 'Ramesh Patil'}</h2>
              <Badge variant="verified" icon={<CheckCircle2 className="w-3.5 h-3.5 text-[#00C97E]" />}>
                Government KYC Verified
              </Badge>
            </div>
            <p className="text-xs text-[#64748B]">Kisan Credit Card ID: UP-KPK-4892 • Member since Apr 2025</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] space-y-2">
            <span className="text-[11px] font-bold text-[#64748B] uppercase block">Farm Location</span>
            <div className="font-bold text-[#0F172A] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#00C97E]" />
              <span>{currentUser?.location || 'Kanpur Rural, Uttar Pradesh'}</span>
            </div>
            <span className="text-[11px] text-slate-500">APMC Linked: Kanpur Central Mandi Hub</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] space-y-2">
            <span className="text-[11px] font-bold text-[#64748B] uppercase block">Land Holding & Soil</span>
            <div className="font-bold text-[#0F172A] flex items-center gap-2">
              <Award className="w-4 h-4 text-[#00C97E]" />
              <span>12.5 Acres (Alluvial Fertile Soil)</span>
            </div>
            <span className="text-[11px] text-slate-500">Soil Health Card: Certified Grade-A (2026)</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] space-y-2">
            <span className="text-[11px] font-bold text-[#64748B] uppercase block">Contact Details</span>
            <div className="font-medium text-[#0F172A] flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400" />
              <span>{currentUser?.mobile || '+91 98765 43210'}</span>
            </div>
            <div className="font-medium text-[#0F172A] flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400" />
              <span>{currentUser?.email || 'farmer@mandix.demo'}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] space-y-2">
            <span className="text-[11px] font-bold text-[#64748B] uppercase block">Escrow Settlement Bank</span>
            <div className="font-bold text-[#0F172A]">State Bank of India (SBI)</div>
            <span className="text-[11px] text-[#006D42] font-semibold">Direct NEFT/RTGS Verified • A/C ending in 8841</span>
          </div>
        </div>
      </div>
    </div>
  );
};
