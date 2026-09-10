import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../../components/common/Badge';
import { MapPin, Phone, Mail, ShoppingBag, ShieldCheck } from 'lucide-react';

export const ConsumerProfile: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="max-w-3xl mx-auto space-y-6 font-sans">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          Consumer Profile & Address Book
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Manage your farm produce delivery preferences and verified member credentials
        </p>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-[#E2E8F0]">
          <div className="w-20 h-20 rounded-full bg-[#00F098] text-[#0F172A] text-xl font-black flex items-center justify-center shadow-md shrink-0">
            {currentUser?.name?.slice(0, 2).toUpperCase() || 'RS'}
          </div>
          <div className="text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-black text-[#0F172A]">{currentUser?.name || 'Rohit Sharma'}</h2>
              <Badge variant="verified">Verified Consumer</Badge>
            </div>
            <p className="text-xs text-[#64748B]">Direct Farm Subscriber • Member since Jun 2025</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] space-y-2">
            <span className="text-[11px] font-bold text-[#64748B] uppercase block">Saved Delivery Address</span>
            <div className="font-bold text-[#0F172A] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#00C97E]" />
              <span>{currentUser?.deliveryAddress || 'Flat 402, Green Valley Apartments, New Delhi 110049'}</span>
            </div>
            <span className="text-[11px] text-[#006D42] font-semibold">Morning Slot (07:00 - 09:30 AM) Preferred</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] space-y-2">
            <span className="text-[11px] font-bold text-[#64748B] uppercase block">Contact Information</span>
            <div className="font-medium text-[#0F172A] flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400" />
              <span>{currentUser?.mobile || '+91 98111 22334'}</span>
            </div>
            <div className="font-medium text-[#0F172A] flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400" />
              <span>{currentUser?.email || 'consumer@mandix.demo'}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#E8FFF6] border border-[#00F098] space-y-1 text-xs text-[#006D42] sm:col-span-2">
            <span className="font-bold block">100% Zero-Middleman Guarantee</span>
            <p className="text-[11px] leading-relaxed">
              Every purchase you make on MANDI-X directly funds the registered kisan's escrow bank account with zero middleman commissions deducted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
