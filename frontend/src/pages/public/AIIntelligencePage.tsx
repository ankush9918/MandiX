import React, { useState } from 'react';
import { mockDemandForecasts, mockPricePredictions } from '../../data/mockAI';
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
import { Sparkles, TrendingUp, Cpu, CheckCircle2, RefreshCw } from 'lucide-react';

export const AIIntelligencePage: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<any>(mockPricePredictions['Wheat']);

  const supplyDemandData = [
    { crop: 'Wheat', supply: 12500, demand: 18500, gap: -6000 },
    { crop: 'Onion', supply: 19000, demand: 26800, gap: -7800 },
    { crop: 'Tomato', supply: 8400, demand: 8200, gap: 200 },
    { crop: 'Potato', supply: 15200, demand: 19800, gap: -4600 },
    { crop: 'Mustard', supply: 7800, demand: 6900, gap: 900 }
  ];

  const handleRunSimulation = (crop: string) => {
    setSelectedCrop(crop);
    setIsSimulating(true);
    setTimeout(() => {
      setSimulationResult(mockPricePredictions[crop] || mockPricePredictions['Wheat']);
      setIsSimulating(false);
    }, 800);
  };

  return (
    <div className="w-full font-sans py-12 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#006D42] bg-[#E8FFF6] px-3 py-1 rounded-full border border-[#00F098]/30">
            PREDICTIVE AGRITECH INFRASTRUCTURE
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tight mt-4 mb-4">
            AI Market Intelligence & Forecasting
          </h1>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            Eliminate price uncertainty before harvesting. Our machine learning engine ingests daily APMC spot rates, weather patterns, and urban procurement cycles.
          </p>
        </div>

        {/* Interactive AI Price Prediction Simulator */}
        <div className="rounded-3xl bg-white border border-[#E2E8F0] shadow-sm p-6 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#E2E8F0] gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-[#00C97E]" />
                <h3 className="text-xl font-black text-[#0F172A]">
                  AI Price Recommendation Engine
                </h3>
              </div>
              <p className="text-xs text-[#64748B]">
                Select a commodity to generate the optimal MANDI-X listing price
              </p>
            </div>

            {/* Crop Selector Chips */}
            <div className="flex flex-wrap items-center gap-2">
              {['Wheat', 'Onion', 'Tomato', 'Potato'].map(crop => (
                <button
                  key={crop}
                  onClick={() => handleRunSimulation(crop)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedCrop === crop
                      ? 'bg-[#0F172A] text-white shadow-sm'
                      : 'bg-[#F7F8FA] text-[#0F172A] border border-[#E2E8F0] hover:bg-slate-200'
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>

          {/* Simulation Output Card */}
          <div className="pt-8">
            {isSimulating ? (
              <div className="py-16 text-center flex flex-col items-center justify-center gap-3">
                <RefreshCw className="w-8 h-8 text-[#00C97E] animate-spin" />
                <span className="text-sm font-bold text-[#0F172A]">
                  Ingesting APMC benchmark telemetry & demand matrices...
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                <div className="p-5 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0]">
                  <span className="text-xs font-bold text-[#64748B] uppercase block mb-1">
                    APMC Baseline Rate
                  </span>
                  <div className="text-3xl font-black text-[#0F172A] tnum">
                    ₹{simulationResult.currentMandiRate} / kg
                  </div>
                  <span className="text-xs text-slate-500 mt-1 block">Local Mandi Trader Price</span>
                </div>

                <div className="p-5 rounded-2xl bg-[#E8FFF6] border border-[#00F098]">
                  <span className="text-xs font-bold text-[#006D42] uppercase block mb-1">
                    MANDI-X Suggested Rate
                  </span>
                  <div className="text-3xl font-black text-[#006D42] tnum">
                    ₹{simulationResult.mandixSuggestedRate} / kg
                  </div>
                  <span className="text-xs font-bold text-[#008753] mt-1 block">
                    {simulationResult.expectedRevenueBoost} Farmer Revenue Boost
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0]">
                  <span className="text-xs font-bold text-[#64748B] uppercase block mb-1">
                    Algorithm Confidence
                  </span>
                  <div className="text-3xl font-black text-[#0F172A] tnum">
                    {simulationResult.aiConfidence}%
                  </div>
                  <span className="text-xs text-emerald-700 font-bold mt-1 block">
                    Trend: {simulationResult.marketTrend}
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] md:col-span-1 shadow-xs">
                  <span className="text-xs font-bold text-[#0F172A] uppercase block mb-1">
                    AI Strategic Action
                  </span>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {simulationResult.advice}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Supply vs Demand Gap Chart */}
        <div className="rounded-3xl bg-white border border-[#E2E8F0] shadow-sm p-6 sm:p-8">
          <div className="mb-6">
            <h3 className="text-xl font-black text-[#0F172A]">
              14-Day Supply vs. Demand Gap Analysis
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Live market shortfall index across core wholesale agricultural commodities (in Quintals)
            </p>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={supplyDemandData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="crop" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '12px'
                  }}
                />
                <Legend />
                <Bar dataKey="supply" fill="#94A3B8" name="Current Mandi Supply (Qtl)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="demand" fill="#00F098" name="Urban Buyer Demand (Qtl)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 5 Crop Demand Forecast Cards */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-2xl font-black text-[#0F172A]">
              Upcoming Crop Demand Projections
            </h3>
            <p className="text-xs text-[#64748B] mt-1">
              Field recommendations generated using multi-mandi transactional telemetry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockDemandForecasts.map(fc => (
              <div
                key={fc.crop}
                className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#00C97E] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-base font-bold text-[#0F172A]">{fc.crop}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-[#E8FFF6] text-[#006D42]">
                      {fc.confidence}% Confidence
                    </span>
                  </div>

                  <div className="flex items-center gap-4 py-3 border-y border-[#E2E8F0] my-3">
                    <div>
                      <span className="text-[10px] text-[#64748B] uppercase font-bold block">Current</span>
                      <span className="text-lg font-black text-[#0F172A] tnum">{fc.currentDemand.toLocaleString()} Qtl</span>
                    </div>
                    <div className="text-slate-300">→</div>
                    <div>
                      <span className="text-[10px] text-[#64748B] uppercase font-bold block">Predicted</span>
                      <span className="text-lg font-black text-[#00C97E] tnum">{fc.predictedDemand.toLocaleString()} Qtl</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#64748B] leading-relaxed mb-3">
                    <strong>Trend Driver:</strong> {fc.reason}
                  </p>
                </div>

                <div className="text-xs font-semibold text-[#006D42] bg-[#E8FFF6] p-2.5 rounded-xl">
                  💡 {fc.priceImpact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
