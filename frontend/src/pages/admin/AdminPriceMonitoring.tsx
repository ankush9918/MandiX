import React from 'react';
import { useMarket } from '../../context/MarketContext';
import { AlertTriangle, TrendingUp, TrendingDown, Bell } from 'lucide-react';

export const AdminPriceMonitoring: React.FC = () => {
  const { marketPrices } = useMarket();

  const alerts = [
    { crop: 'Nashik Red Onion', mandi: 'Lasalgaon APMC', message: '+3.1% daily spike due to southern procurement demand', type: 'warning' },
    { crop: 'Fresh Hybrid Tomato', mandi: 'Azadpur Mandi', message: '-1.2% stabilization as Himachal arrivals enter market', type: 'info' }
  ];

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          APMC Price Volatility & Ceiling Monitoring
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Automated alerts triggered when physical mandi rates fluctuate beyond normal bounds
        </p>
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {alerts.map((a, i) => (
          <div key={i} className="p-4 rounded-3xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold block text-sm">{a.crop} • {a.mandi}</span>
              <p className="mt-0.5 leading-relaxed">{a.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Monitor Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-[#F7F8FA] border-b border-[#E2E8F0] text-[11px] font-bold uppercase text-[#64748B]">
                <th className="py-4 px-6">Commodity & Variety</th>
                <th className="py-4 px-6">APMC Market</th>
                <th className="py-4 px-6 text-right">APMC Modal</th>
                <th className="py-4 px-6 text-right">MANDI-X Rate</th>
                <th className="py-4 px-6 text-center">24h Shift</th>
                <th className="py-4 px-6 text-center">Trigger Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-xs">
              {marketPrices.map(p => (
                <tr key={p.id} className="hover:bg-[#F7F8FA]">
                  <td className="py-4 px-6 font-bold text-[#0F172A]">
                    {p.commodity} ({p.variety})
                  </td>
                  <td className="py-4 px-6 text-slate-500">{p.market}</td>
                  <td className="py-4 px-6 text-right font-medium tnum">₹{p.modalPrice}</td>
                  <td className="py-4 px-6 text-right font-black text-[#006D42] tnum text-sm">
                    ₹{p.mandiXRate}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        p.change24h >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {p.change24h >= 0 ? `+${p.change24h}%` : `${p.change24h}%`}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E8FFF6] text-[#006D42] font-bold text-[10px]">
                      Normal Bounds
                    </span>
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
