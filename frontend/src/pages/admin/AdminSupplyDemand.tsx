import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';

export const AdminSupplyDemand: React.FC = () => {
  const [selectedState, setSelectedState] = useState('All');

  const data = [
    { commodity: 'Wheat', supply: 14000, demand: 21000, deficit: 7000 },
    { commodity: 'Onion', supply: 22000, demand: 28000, deficit: 6000 },
    { commodity: 'Tomato', supply: 8500, demand: 8100, deficit: -400 },
    { commodity: 'Potato', supply: 16000, demand: 20500, deficit: 4500 },
    { commodity: 'Rice', supply: 9500, demand: 13000, deficit: 3500 },
    { commodity: 'Mustard', supply: 7200, demand: 6800, deficit: -400 }
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
            Supply vs. Demand Gap Analytics
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Inter-state deficit matching to prevent localized food shortages and price surges
          </p>
        </div>

        <select
          value={selectedState}
          onChange={e => setSelectedState(e.target.value)}
          className="h-10 px-3.5 rounded-xl bg-white border border-[#E2E8F0] text-xs font-bold outline-none"
        >
          <option value="All">All Agricultural Regions</option>
          <option value="North">Northern Zone (Punjab, Haryana, UP)</option>
          <option value="West">Western Zone (Maharashtra, Gujarat)</option>
          <option value="Central">Central Zone (MP, Rajasthan)</option>
        </select>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="commodity" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '12px', fontSize: '12px' }}
              />
              <Legend />
              <Bar dataKey="supply" fill="#94A3B8" name="Market Supply (Qtl)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="demand" fill="#00F098" name="Procurement Demand (Qtl)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E2E8F0] text-xs">
          <div className="p-3.5 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0]">
            <span className="text-[#64748B] block">Highest Regional Shortfall:</span>
            <span className="font-bold text-[#0F172A] text-sm">Wheat (7,000 Qtl Gap)</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0]">
            <span className="text-[#64748B] block">Supply Surplus:</span>
            <span className="font-bold text-[#006D42] text-sm">Tomato (+400 Qtl Stable)</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#E8FFF6] border border-[#00F098] text-[#006D42]">
            <span className="block font-bold">Inter-Mandi Redistribution:</span>
            <span>Allocating transport trucks from Punjab to Delhi NCR.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
