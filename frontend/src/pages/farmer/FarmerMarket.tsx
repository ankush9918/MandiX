import React, { useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import { Search, TrendingUp } from 'lucide-react';

export const FarmerMarket: React.FC = () => {
  const { marketPrices } = useMarket();
  const [search, setSearch] = useState('');

  const filtered = marketPrices.filter(p =>
    p.commodity.toLowerCase().includes(search.toLowerCase()) ||
    p.market.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
            Live APMC Mandi Benchmark Prices
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Daily spot rates from regional agriculture marketing committees
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search crop or mandi..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(p => (
          <div
            key={p.id}
            className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-xs hover:border-[#00F098] transition-all space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{p.icon}</span>
                <div>
                  <h3 className="text-base font-bold text-[#0F172A]">{p.commodity}</h3>
                  <span className="text-xs text-[#64748B]">{p.variety}</span>
                </div>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  p.change24h >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                }`}
              >
                {p.change24h >= 0 ? `+${p.change24h}%` : `${p.change24h}%`}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] space-y-1.5 text-xs">
              <div className="flex justify-between text-[#64748B]">
                <span>APMC Mandi:</span>
                <span className="font-bold text-[#0F172A]">{p.market}</span>
              </div>
              <div className="flex justify-between text-[#64748B]">
                <span>Min - Max Range:</span>
                <span className="font-medium tnum">₹{p.minPrice} - ₹{p.maxPrice}</span>
              </div>
              <div className="flex justify-between items-baseline pt-1 border-t border-[#E2E8F0]">
                <span className="font-bold text-[#006D42]">MANDI-X Net:</span>
                <span className="text-lg font-black text-[#006D42] tnum">₹{p.mandiXRate} / Qtl</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 text-right">Updated {p.updatedAt}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
