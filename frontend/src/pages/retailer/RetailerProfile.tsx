import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../../components/common/Badge';
import { Building, MapPin, Phone, Mail, FileText, CheckCircle2 } from 'lucide-react';

export const RetailerProfile: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="max-w-3xl mx-auto space-y-6 font-sans">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          Commercial Retailer & Warehouse Profile
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Verified business registration, GST compliance, and central warehouse dock details
        </p>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-[#E2E8F0]">
          <div className="w-20 h-20 rounded-full bg-[#0F172A] text-[#00F098] text-xl font-black flex items-center justify-center shadow-md shrink-0">
            VK
          </div>
          <div className="text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-black text-[#0F172A]">
                {currentUser?.businessName || 'Khanna Agro Superstore Pvt Ltd'}
              </h2>
              <Badge variant="verified" icon={<CheckCircle2 className="w-3.5 h-3.5 text-[#00C97E]" />}>
                GSTIN Verified
              </Badge>
            </div>
            <p className="text-xs text-[#64748B]">
              Managing Partner: {currentUser?.name || 'Vikas Khanna'} • B2B Procurement Member
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] space-y-2">
            <span className="text-[11px] font-bold text-[#64748B] uppercase block">GSTIN & Tax Registration</span>
            <div className="font-mono font-bold text-base text-[#0F172A]">
              {currentUser?.gstin || '07AAACK1234F1Z8'}
            </div>
            <span className="text-[11px] text-[#006D42] font-semibold">State Jurisdiction: Delhi North Commercial</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] space-y-2">
            <span className="text-[11px] font-bold text-[#64748B] uppercase block">Central Warehouse Dock</span>
            <div className="font-bold text-[#0F172A] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#00C97E]" />
              <span>Shed 14, Azadpur Wholesale Terminal, Delhi</span>
            </div>
            <span className="text-[11px] text-slate-500">Forklift unloading bays 1 to 4</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] space-y-2">
            <span className="text-[11px] font-bold text-[#64748B] uppercase block">Contact Point</span>
            <div className="font-medium text-[#0F172A] flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400" />
              <span>{currentUser?.mobile || '+91 99222 33445'}</span>
            </div>
            <div className="font-medium text-[#0F172A] flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400" />
              <span>{currentUser?.email || 'retailer@mandix.demo'}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] space-y-2">
            <span className="text-[11px] font-bold text-[#64748B] uppercase block">Escrow Settlement Facility</span>
            <div className="font-bold text-[#0F172A]">HDFC Corporate Banking</div>
            <span className="text-[11px] text-[#006D42] font-semibold">Pre-authorized auto-debit on consignment dispatch</span>
          </div>
        </div>
      </div>
    </div>
  );
};
