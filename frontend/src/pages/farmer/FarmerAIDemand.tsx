import React from 'react';
import { mockDemandForecasts } from '../../data/mockAI';
import { TrendingUp, Cpu, CheckCircle2, AlertCircle } from 'lucide-react';

export const FarmerAIDemand: React.FC = () => {
  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          AI Crop Demand Forecast
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Predictive market demand over the next 14 days to help you plan harvest timing and pricing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockDemandForecasts.map(item => (
          <div
            key={item.crop}
            className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-xs hover:border-[#00F098] transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-black text-[#0F172A]">{item.crop}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E8FFF6] text-[#006D42]">
                  {item.confidence}% Model Confidence
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] my-3 text-xs">
                <div>
                  <span className="text-[#64748B] block mb-0.5">Current Demand:</span>
                  <span className="text-base font-black text-[#0F172A] tnum">{item.currentDemand.toLocaleString()} Qtl</span>
                </div>
                <div>
                  <span className="text-[#64748B] block mb-0.5">Predicted Demand:</span>
                  <span className="text-base font-black text-[#00C97E] tnum">{item.predictedDemand.toLocaleString()} Qtl</span>
                </div>
                <div className="col-span-2 pt-2 border-t border-[#E2E8F0]">
                  <span className="text-[#64748B] block mb-0.5">Recommended Lot Size:</span>
                  <span className="font-bold text-[#0F172A]">{item.recommendedHarvestQty}</span>
                </div>
              </div>

              <p className="text-xs text-[#64748B] leading-relaxed">
                <strong>Market Driver:</strong> {item.reason}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#E8FFF6] text-[#006D42] text-xs font-semibold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#00C97E] shrink-0" />
              <span>{item.priceImpact}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
