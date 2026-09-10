import React from 'react';
import { useMarket } from '../../context/MarketContext';
import { useNotifications } from '../../context/NotificationContext';
import { Badge } from '../../components/common/Badge';
import { CreditCard, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AdminPayments: React.FC = () => {
  const { orders, updateOrderStatus } = useMarket();
  const { showToast } = useNotifications();

  const handleManualRelease = (orderId: string) => {
    updateOrderStatus(orderId, 'Completed');
    showToast('Escrow Released', `Escrow payment for ${orderId} released to farmer bank.`, 'success');
  };

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          Escrow Settlements & Commission Ledger
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Audit escrow deposits, zero-commission disbursements, and bank clearing statuses
        </p>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-sm p-6 space-y-4">
        <h3 className="text-base font-black text-[#0F172A]">Platform Escrow Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0] text-[11px] font-bold uppercase text-[#64748B]">
                <th className="pb-3 px-4">Order ID</th>
                <th className="pb-3 px-4">Buyer Entity</th>
                <th className="pb-3 px-4">Beneficiary Kisan</th>
                <th className="pb-3 px-4 text-right">Escrow Sum</th>
                <th className="pb-3 px-4 text-center">Settlement State</th>
                <th className="pb-3 px-4 text-right">Manual Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-xs">
              {orders.map(o => (
                <tr key={o.id} className="hover:bg-[#F7F8FA]">
                  <td className="py-4 px-4 font-mono font-bold text-[#0F172A]">{o.id}</td>
                  <td className="py-4 px-4 font-medium">{o.buyerName}</td>
                  <td className="py-4 px-4 font-medium">{o.farmerName}</td>
                  <td className="py-4 px-4 text-right font-black text-[#006D42] tnum text-sm">
                    ₹{o.total.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Badge variant={o.paymentStatus === 'Released to Farmer' ? 'success' : 'mint'}>
                      {o.paymentStatus}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-right">
                    {o.paymentStatus === 'Escrow Secured' ? (
                      <button
                        onClick={() => handleManualRelease(o.id)}
                        className="px-3 py-1 rounded-xl bg-[#00F098] text-[#0F172A] hover:bg-[#00C97E] text-[11px] font-black transition-all shadow-xs"
                      >
                        Release to Bank
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-bold">Disbursed ✓</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
