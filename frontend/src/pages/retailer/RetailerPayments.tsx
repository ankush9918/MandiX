import React from 'react';
import { StatCard } from '../../components/common/StatCard';
import { CreditCard, Download, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const RetailerPayments: React.FC = () => {
  const transactions = [
    {
      id: 'TXN-8092',
      poNumber: 'ORD-8922',
      supplier: 'Ramesh Patil',
      crop: '500kg Sharbati Wheat',
      amount: 16450,
      status: 'Escrow Secured',
      date: 'Today, 11:30 AM',
      method: 'Net Banking'
    },
    {
      id: 'TXN-8088',
      poNumber: 'ORD-8925',
      supplier: 'Sukhwinder Singh',
      crop: '800kg Basmati Rice',
      amount: 55600,
      status: 'Escrow Secured',
      date: 'Yesterday',
      method: 'RTGS Transfer'
    },
    {
      id: 'TXN-8064',
      poNumber: 'ORD-8914',
      supplier: 'Ganesh Shinde',
      crop: '1200kg Red Onions',
      amount: 31200,
      status: 'Settled to Farmer',
      date: '04 Sep 2026',
      method: 'Corporate UPI'
    }
  ];

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          B2B Invoices & Escrow Balances
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          GST-compliant billing, escrow ledger audit, and corporate line of credit
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Active Escrow Balance"
          value="₹72,050"
          subtext="Held for active consignments"
          icon="⏳"
          highlight={true}
        />
        <StatCard
          label="Total Settled B2B (FY26)"
          value="₹4,86,200"
          subtext="100% Tax Invoiced"
          icon="💳"
        />
        <StatCard
          label="Pre-Approved Credit Line"
          value="₹10,00,000"
          subtext="NABARD / AgriFin Line"
          icon="🏦"
          delta={{ value: 'Interest-free 14 days', isPositive: true }}
        />
      </div>

      {/* Transactions Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-sm space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-[#0F172A]">Consignment Invoices Ledger</h3>
          <button className="px-3.5 py-1.5 rounded-xl border border-[#E2E8F0] text-xs font-bold text-[#0F172A] hover:bg-[#F7F8FA] flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" />
            <span>Download All GST Bills</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0] text-[11px] font-bold uppercase text-[#64748B]">
                <th className="pb-3 px-4">Transaction ID</th>
                <th className="pb-3 px-4">PO & Commodity</th>
                <th className="pb-3 px-4">Supplier Kisan</th>
                <th className="pb-3 px-4 text-right">Amount</th>
                <th className="pb-3 px-4 text-center">Status</th>
                <th className="pb-3 px-4 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-xs">
              {transactions.map(t => (
                <tr key={t.id} className="hover:bg-[#F7F8FA] transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-[#0F172A]">{t.id}</td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-[#0F172A]">{t.poNumber}</div>
                    <span className="text-[11px] text-[#64748B]">{t.crop}</span>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-700">{t.supplier}</td>
                  <td className="py-4 px-4 text-right font-black text-[#006D42] tnum text-sm">
                    ₹{t.amount.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        t.status === 'Settled to Farmer'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button className="text-xs font-bold text-[#006D42] hover:underline flex items-center gap-1 justify-end">
                      <Download className="w-3 h-3" />
                      <span>PDF</span>
                    </button>
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
