import React, { useState } from 'react';
import { mockPricePredictions } from '../../data/mockAI';
import { Sparkles, RefreshCw, CheckCircle2, TrendingUp, Cpu } from 'lucide-react';

export const FarmerAIPrice: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [processingState, setProcessingState] = useState<'idle' | 'loading' | 'processing' | 'done'>('idle');

  const currentResult = mockPricePredictions[selectedCrop] || mockPricePredictions['Wheat'];

  const handleGenerate = () => {
    setProcessingState('loading');
    setTimeout(() => {
      setProcessingState('processing');
      setTimeout(() => {
        setProcessingState('done');
      }, 1000);
    }, 700);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          AI Price Recommendation Engine
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Predictive algorithm that analyzes real-time mandi prices to recommend the highest profitable reserve rate
        </p>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
        {/* Step 1: Select Crop */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-[#64748B] block">
            Select Your Harvest Crop
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {['Wheat', 'Onion', 'Tomato', 'Potato'].map(crop => (
              <button
                key={crop}
                onClick={() => {
                  setSelectedCrop(crop);
                  setProcessingState('idle');
                }}
                className={`py-3 px-4 rounded-2xl border text-sm font-bold transition-all ${
                  selectedCrop === crop
                    ? 'border-[#00F098] bg-[#E8FFF6] text-[#006D42] shadow-xs ring-2 ring-[#00F098]/30'
                    : 'border-[#E2E8F0] bg-[#F7F8FA] hover:bg-white'
                }`}
              >
                {crop}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={handleGenerate}
            disabled={processingState === 'loading' || processingState === 'processing'}
            className="h-12 px-8 rounded-full bg-[#00F098] text-[#0F172A] font-extrabold text-sm hover:bg-[#00C97E] hover:text-white transition-all shadow-[0_4px_14px_rgba(0,240,152,0.4)] flex items-center gap-2 disabled:opacity-60 active:scale-95"
          >
            {processingState === 'loading' || processingState === 'processing' ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>
              {processingState === 'loading'
                ? 'Ingesting APMC Telemetry...'
                : processingState === 'processing'
                ? 'Running Neural Price Analysis...'
                : 'Generate AI Price Recommendation'}
            </span>
          </button>
        </div>

        {/* Dynamic Processing States */}
        {processingState === 'loading' && (
          <div className="py-12 text-center text-xs text-[#64748B] animate-pulse">
            Connecting to 18 Mandi APMC Spot Gateways...
          </div>
        )}

        {processingState === 'processing' && (
          <div className="py-12 text-center text-xs text-[#006D42] font-bold animate-bounce">
            Calculating supply shortfall and retail buyer demand premium...
          </div>
        )}

        {/* Recommendation Result */}
        {(processingState === 'done' || processingState === 'idle') && (
          <div className="pt-6 border-t border-[#E2E8F0] space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0]">
                <span className="text-[11px] font-bold uppercase text-[#64748B] block mb-1">
                  Current Local Mandi Trader Rate
                </span>
                <div className="text-2xl sm:text-3xl font-black text-[#0F172A] tnum">
                  ₹{currentResult.currentMandiRate} / kg
                </div>
                <span className="text-xs text-slate-500 mt-1 block">Baseline APMC auction</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#E8FFF6] border border-[#00F098]">
                <span className="text-[11px] font-bold uppercase text-[#006D42] block mb-1">
                  MANDI-X Suggested Price
                </span>
                <div className="text-2xl sm:text-3xl font-black text-[#006D42] tnum">
                  ₹{currentResult.mandixSuggestedRate} / kg
                </div>
                <span className="text-xs font-bold text-[#008753] mt-1 block">
                  {currentResult.expectedRevenueBoost} Revenue Increase
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0]">
                <span className="text-[11px] font-bold uppercase text-[#64748B] block mb-1">
                  Market Trend & Confidence
                </span>
                <div className="text-2xl sm:text-3xl font-black text-[#0F172A] tnum">
                  {currentResult.aiConfidence}%
                </div>
                <span className="text-xs text-emerald-700 font-bold mt-1 block">
                  {currentResult.marketTrend} Trend
                </span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                AI Strategic Production Recommendation
              </h4>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                {currentResult.advice}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
