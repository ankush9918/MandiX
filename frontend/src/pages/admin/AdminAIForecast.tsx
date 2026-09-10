import React, { useState } from 'react';
import { mockDemandForecasts } from '../../data/mockAI';
import { Cpu, RefreshCw, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';

export const AdminAIForecast: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [forecasts, setForecasts] = useState(mockDemandForecasts);
  const [lastRan, setLastRan] = useState('Today at 08:30 AM');

  const handleRunForecast = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setLastRan('Just now');
      // Subtle update to simulation
      setForecasts(prev =>
        prev.map(f => ({
          ...f,
          predictedDemand: Math.round(f.predictedDemand * (1 + (Math.random() * 0.04 - 0.02)))
        }))
      );
    }, 1200);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
            AI Demand Prediction Engine
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Deep learning neural networks forecasting agricultural supply requirements across 18 trading mandis
          </p>
        </div>

        <button
          onClick={handleRunForecast}
          disabled={isRunning}
          className="h-11 px-6 rounded-2xl bg-[#00F098] text-[#0F172A] font-extrabold text-xs hover:bg-[#00C97E] hover:text-white transition-all shadow-sm flex items-center gap-2 disabled:opacity-60 self-start sm:self-auto active:scale-95"
        >
          {isRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          <span>{isRunning ? 'Processing Neural Matrices...' : 'Run Demand Forecast Engine'}</span>
        </button>
      </div>

      <div className="text-xs text-[#64748B] flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#00C97E]" />
        <span>Model Version: <strong>AgriForecast-v3.2 (SIH26033)</strong> • Last computed: {lastRan}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forecasts.map(fc => (
          <div
            key={fc.crop}
            className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-xs hover:border-[#00F098] transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-base font-black text-[#0F172A]">{fc.crop}</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8FFF6] text-[#006D42]">
                  {fc.confidence}% Confidence
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] text-xs my-3">
                <div>
                  <span className="text-[#64748B] block">Current Demand:</span>
                  <span className="font-bold text-[#0F172A] text-sm tnum">{fc.currentDemand.toLocaleString()} Qtl</span>
                </div>
                <div>
                  <span className="text-[#64748B] block">Predicted (14d):</span>
                  <span className="font-black text-[#00C97E] text-sm tnum">{fc.predictedDemand.toLocaleString()} Qtl</span>
                </div>
              </div>

              <p className="text-xs text-[#64748B] leading-relaxed">
                <strong>Algorithmic Reason:</strong> {fc.reason}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#E8FFF6] text-[#006D42] text-xs font-bold flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#00C97E] shrink-0" />
              <span>{fc.priceImpact}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
