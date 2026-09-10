import React from 'react';
import { useMarket } from '../../context/MarketContext';
import { StatCard } from '../../components/common/StatCard';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { ShieldCheck, AlertTriangle, Users, TrendingUp, Package, Truck } from 'lucide-react';

export const AdminOverview: React.FC = () => {
  const { products, orders, complaints } = useMarket();

  const activeOrdersCount = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
  const totalVolume = orders.reduce((sum, o) => sum + o.total, 0) || 72600;
  const platformRevenue = Math.round(totalVolume * 0.015); // 1.5% platform tech fee

  const growthData = [
    { month: 'Apr', farmers: 1200, buyers: 3400, volume: 180000 },
    { month: 'May', farmers: 2100, buyers: 5800, volume: 320000 },
    { month: 'Jun', farmers: 3900, buyers: 9200, volume: 540000 },
    { month: 'Jul', farmers: 5200, buyers: 14000, volume: 760000 },
    { month: 'Aug', farmers: 6800, buyers: 19500, volume: 1100000 },
    { month: 'Sep', farmers: 8420, buyers: 26000, volume: 1650000 }
  ];

  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
            Marketplace Command Center
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Platform-wide agricultural transaction volume, logistics tracking, and escrow integrity
          </p>
        </div>
        <span className="px-3.5 py-1.5 rounded-full bg-[#E8FFF6] text-[#006D42] text-xs font-bold border border-[#00F098]/40 self-start sm:self-auto">
          ● Platform Systems Healthy • SIH26033
        </span>
      </div>

      {/* 8 Metric KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total Farmers" value="8,420" subtext="KYC Verified" icon="🌾" />
        <StatCard label="Total Consumers" value="26,140" subtext="Urban households" icon="🛒" />
        <StatCard label="Total Retailers" value="1,490" subtext="B2B Commercial" icon="🏪" />
        <StatCard label="Active Listings" value={products.length} subtext="Mandi-grade lots" icon="📦" />
        <StatCard label="Active Orders" value={activeOrdersCount} subtext="In transit" icon="🚚" />
        <StatCard label="Gross GMV (Month)" value="₹1.65 Cr" subtext="+42% MoM" icon="💰" highlight={true} />
        <StatCard label="Platform Revenue" value={`₹${(platformRevenue * 10).toLocaleString()}`} subtext="1.5% Tech Margin" icon="📈" />
        <StatCard label="Open Disputes" value={complaints.filter(c => c.status === 'Open').length} subtext="Requires action" icon="⚠️" />
      </div>

      {/* Growth & Volume Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-[#0F172A]">Platform Transaction Volume (₹)</h3>
              <p className="text-xs text-[#64748B]">Direct farm-to-buyer gross merchandise value</p>
            </div>
            <span className="text-xs font-bold text-[#006D42] bg-[#E8FFF6] px-2.5 py-1 rounded-full">
              FY 2026 Expansion
            </span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F098" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00F098" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip
                  formatter={(val: number) => [`₹${val.toLocaleString()}`, 'Gross Volume']}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="volume" stroke="#00C97E" strokeWidth={3} fill="url(#colorVol)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-black text-[#0F172A]">User Base Trajectory</h3>
            <p className="text-xs text-[#64748B] mt-0.5">Farmer and commercial buyer expansion</p>
            <div className="h-52 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={growthData.slice(-4)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
                  <YAxis stroke="#64748B" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '10px', fontSize: '11px' }}
                  />
                  <Bar dataKey="farmers" fill="#00C97E" name="Farmers" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="buyers" fill="#0F172A" name="Buyers" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] text-xs text-[#64748B]">
            ⚡ 99.8% On-time farm-gate dispatch fulfillment across Punjab, UP & Maharashtra belts.
          </div>
        </div>
      </div>
    </div>
  );
};
