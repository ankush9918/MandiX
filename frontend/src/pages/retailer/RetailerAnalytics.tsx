import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend
} from 'recharts';

export const RetailerAnalytics: React.FC = () => {
  const marginData = [
    { month: 'Apr', mandiCost: 26, retailSell: 36, margin: 10 },
    { month: 'May', mandiCost: 28, retailSell: 39, margin: 11 },
    { month: 'Jun', mandiCost: 25, retailSell: 37, margin: 12 },
    { month: 'Jul', mandiCost: 30, retailSell: 44, margin: 14 },
    { month: 'Aug', mandiCost: 29, retailSell: 43, margin: 14 },
    { month: 'Sep', mandiCost: 28, retailSell: 42, margin: 14 }
  ];

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          Procurement & Profit Margin Analytics
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Cost per quintal savings, margin realization, and wholesale turnaround telemetry
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Margin Line Chart */}
        <div className="lg:col-span-8 bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-[#0F172A]">Unit Procurement Cost vs. Retail Selling (₹/kg)</h3>
            <span className="text-xs font-bold text-[#006D42] bg-[#E8FFF6] px-2.5 py-1 rounded-full">
              Avg Margin: 33.3%
            </span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={marginData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend />
                <Line type="monotone" dataKey="retailSell" stroke="#00F098" strokeWidth={3} name="Retail Sale Price (₹/kg)" />
                <Line type="monotone" dataKey="mandiCost" stroke="#0F172A" strokeWidth={2} name="Mandi Direct Cost (₹/kg)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Profit metrics */}
        <div className="lg:col-span-4 bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <h3 className="text-base font-black text-[#0F172A]">Wholesale Advantages</h3>
          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] space-y-1">
              <span className="text-[#64748B] block">Direct Sourcing Savings:</span>
              <span className="text-xl font-black text-[#006D42] tnum">₹1,44,200</span>
              <p className="text-[11px] text-slate-500">Savings compared to Azadpur physical commission agents</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] space-y-1">
              <span className="text-[#64748B] block">Transit Spoilage Rate:</span>
              <span className="text-xl font-black text-[#0F172A] tnum">1.4% (Ultra Low)</span>
              <p className="text-[11px] text-slate-500">Industry baseline is 18-22%</p>
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#E8FFF6] border border-[#00F098] text-xs text-[#006D42] font-semibold">
            🚀 100% Tax Input Credit Verified on all consignment receipts.
          </div>
        </div>
      </div>
    </div>
  );
};
