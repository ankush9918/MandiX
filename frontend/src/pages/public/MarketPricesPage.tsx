import React, { useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Search, ArrowUpDown, TrendingUp, Sparkles, Filter } from 'lucide-react';

export const MarketPricesPage: React.FC = () => {
  const { marketPrices } = useMarket();
  const { demoLogin } = useAuth();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('All');
  const [selectedState, setSelectedState] = useState('All');
  const [sortField, setSortField] = useState<'rate' | 'change' | 'commodity'>('rate');
  const [sortAsc, setSortAsc] = useState(false);

  const commodities = ['All', 'Wheat', 'Onion', 'Tomato', 'Rice', 'Potato', 'Mustard', 'Gram', 'Soybean'];
  const states = ['All', 'Punjab', 'Maharashtra', 'Delhi', 'Haryana', 'Uttar Pradesh', 'Rajasthan', 'Madhya Pradesh'];

  const filtered = marketPrices
    .filter(item => {
      const matchQuery =
        item.commodity.toLowerCase().includes(query.toLowerCase()) ||
        item.market.toLowerCase().includes(query.toLowerCase()) ||
        item.variety.toLowerCase().includes(query.toLowerCase());
      const matchCrop = selectedCrop === 'All' || item.commodity.toLowerCase().includes(selectedCrop.toLowerCase());
      const matchState = selectedState === 'All' || item.state === selectedState;
      return matchQuery && matchCrop && matchState;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortField === 'rate') comparison = a.mandiXRate - b.mandiXRate;
      else if (sortField === 'change') comparison = a.change24h - b.change24h;
      else comparison = a.commodity.localeCompare(b.commodity);
      return sortAsc ? comparison : -comparison;
    });

  const handleTrade = (commodity: string) => {
    demoLogin('Farmer');
    navigate('/farmer/products/add');
  };

  return (
    <div className="w-full min-h-screen bg-[#0F172A] text-white py-12 sm:py-16 font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F098]/10 text-[#00F098] border border-[#00F098]/30 text-xs font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-[#00F098] animate-pulse" />
              <span>LIVE APMC BENCHMARK TICKER</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Daily Mandi Market Rates
            </h1>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
              Real-time daily spot trading benchmark rates aggregated from 42+ official APMC mandis across India with 0% middleman commission.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-2.5 rounded-2xl border border-white/10 text-xs text-slate-400">
            <span className="text-[#00F098] font-bold">ℹ️ Note:</span>
            <span>Live Mock / Demonstration APMC Telemetry</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-900/90 p-4 rounded-3xl border border-white/10">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search crop, variety or mandi..."
              className="w-full bg-slate-800 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#00F098]"
            />
          </div>

          {/* Crop Filter */}
          <select
            value={selectedCrop}
            onChange={e => setSelectedCrop(e.target.value)}
            className="h-10 px-3 rounded-xl bg-slate-800 border border-white/10 text-xs sm:text-sm text-white font-medium outline-none"
          >
            {commodities.map(c => (
              <option key={c} value={c}>
                {c === 'All' ? 'All Commodities' : c}
              </option>
            ))}
          </select>

          {/* State Filter */}
          <select
            value={selectedState}
            onChange={e => setSelectedState(e.target.value)}
            className="h-10 px-3 rounded-xl bg-slate-800 border border-white/10 text-xs sm:text-sm text-white font-medium outline-none"
          >
            {states.map(s => (
              <option key={s} value={s}>
                {s === 'All' ? 'All States' : s}
              </option>
            ))}
          </select>

          {/* Sort Selector */}
          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="h-10 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-xs sm:text-sm text-slate-200 font-bold flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#00F098]" />
              <span>Sort: {sortField.toUpperCase()} ({sortAsc ? 'Asc' : 'Desc'})</span>
            </div>
          </button>
        </div>

        {/* Live Dark Rates Matrix Table */}
        <div className="rounded-3xl bg-slate-900/60 border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-950/80 border-b border-white/10 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-4 px-6">Commodity & Variety</th>
                  <th className="py-4 px-6">APMC Mandi Hub</th>
                  <th className="py-4 px-6 text-right">Min APMC Price</th>
                  <th className="py-4 px-6 text-right">Max APMC Price</th>
                  <th className="py-4 px-6 text-right bg-[#00F098]/10 text-[#00F098]">
                    MANDI-X Net Rate
                  </th>
                  <th className="py-4 px-6 text-center">24h Shift</th>
                  <th className="py-4 px-6 text-right">Instant Trade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400 text-xs">
                      No live mandi rates found matching your search.
                    </td>
                  </tr>
                ) : (
                  filtered.map(item => (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 font-bold text-white">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <div className="text-base">{item.commodity}</div>
                            <span className="text-xs text-slate-400 font-normal">{item.variety}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-300 font-medium">
                        <div>{item.market}</div>
                        <span className="text-xs text-slate-500">{item.state}</span>
                      </td>
                      <td className="py-4 px-6 text-right font-medium text-slate-400 tnum">
                        ₹{item.minPrice} / Qtl
                      </td>
                      <td className="py-4 px-6 text-right font-medium text-slate-400 tnum">
                        ₹{item.maxPrice} / Qtl
                      </td>
                      <td className="py-4 px-6 text-right bg-[#00F098]/5">
                        <span className="inline-block px-3 py-1 rounded-lg bg-[#00F098] text-[#0F172A] font-black text-sm tnum">
                          ₹{item.mandiXRate} / Qtl
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            item.change24h >= 0
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {item.change24h >= 0 ? `+${item.change24h}%` : `${item.change24h}%`}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleTrade(item.commodity)}
                          className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-[#00F098] hover:text-[#0F172A] text-white text-xs font-bold transition-all shadow-sm"
                        >
                          Trade Lot
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
