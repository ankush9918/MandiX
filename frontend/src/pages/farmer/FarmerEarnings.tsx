import React from 'react';
import { useMarket } from '../../context/MarketContext';
import { StatCard } from '../../components/common/StatCard';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { DollarSign, ShieldCheck, Clock, ArrowUpRight } from 'lucide-react';

export const FarmerEarnings: React.FC = () => {
  const { orders } = useMarket();

  const releasedOrders = orders.filter(o => o.paymentStatus === 'Released to Farmer');
  const escrowOrders = orders.filter(o => o.paymentStatus === 'Escrow Secured');

  const totalReleased = releasedOrders.reduce((sum, o) => sum + o.subtotal, 0) || 24500;
  const totalEscrow = escrowOrders.reduce((sum, o) => sum + o.subtotal, 0) || 16450;
  const lifetimeEarnings = totalReleased + totalEscrow;

  const monthlyData = [
    { month: 'Apr', earnings: 14200 },
    { month: 'May', earnings: 18500 },
    { month: 'Jun', earnings: 21000 },
    { month: 'Jul', earnings: 19400 },
    { month: 'Aug', earnings: 26800 },
    { month: 'Sep', earnings: 34200 }
  ];

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          My Farm Earnings & Payouts
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          100% transparent escrow settlement directly to your registered bank account
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Lifetime Trade Value"
          value={`₹${lifetimeEarnings.toLocaleString()}`}
          subtext="Direct buyer settlements"
          icon="💰"
          delta={{ value: '+35% vs APMC', isPositive: true }}
          highlight={true}
        />
        <StatCard
          label="Settled to Bank Account"
          value={`₹${totalReleased.toLocaleString()}`}
          subtext="Direct NEFT/UPI releases"
          icon="🏦"
          delta={{ value: '100% paid', isPositive: true }}
        />
        <StatCard
          label="Secured in Escrow"
          value={`₹${totalEscrow.toLocaleString()}`}
          subtext="Releases immediately on gate dispatch"
          icon="⏳"
        />
      </div>

      {/* Monthly Chart */}
      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-black text-[#0F172A]">Monthly Kisan Revenue Trend</h3>
            <p className="text-xs text-[#64748B]">Revenue growth after eliminating commission agent cuts</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#E8FFF6] text-[#006D42]">
            FY 2026 Direct Trade
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00F098" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#00F098" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip
                formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Earnings']}
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '12px'
                }}
              />
              <Area
                type="monotone"
                dataKey="earnings"
                stroke="#00C97E"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorEarnings)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payout History Ledger */}
      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-black text-[#0F172A]">Direct Payout Settlements</h3>
        <div className="divide-y divide-[#E2E8F0]">
          {orders.map(o => (
            <div key={o.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#E8FFF6] flex items-center justify-center font-bold text-[#006D42]">
                  ✓
                </span>
                <div>
                  <div className="font-bold text-[#0F172A]">{o.id} • {o.items[0]?.productName}</div>
                  <span className="text-[#64748B]">Escrow ID: {o.trackingNumber}</span>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4">
                <span className="font-black text-sm text-[#0F172A] tnum">₹{o.total.toLocaleString()}</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-bold ${
                    o.paymentStatus === 'Released to Farmer'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {o.paymentStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
