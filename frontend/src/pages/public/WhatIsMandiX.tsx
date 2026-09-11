import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, CheckCircle2, XCircle, TrendingUp, AlertTriangle } from 'lucide-react';

export const WhatIsMandiX: React.FC = () => {
  return (
    <div className="w-full font-sans py-12 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#006D42] bg-[#E8FFF6] px-3 py-1 rounded-full border border-[#00F098]/30">
            SIH PROBLEM STATEMENT SIH26033
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tight mt-4 mb-4">
            What is MANDI-X?
          </h1>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            MANDI-X is an algorithmic Agritech Marketplace & Intelligent Supply Chain platform that bridges Indian kisans directly to wholesale retailers and everyday households.
          </p>
        </div>

        {/* Problem vs Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* The Broken Reality */}
          <div className="p-8 rounded-3xl bg-white border border-rose-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600">The Problem</span>
                <h2 className="text-2xl font-black text-[#0F172A]">Traditional APMC Middlemen Cartels</h2>
              </div>
            </div>
            <ul className="space-y-4 text-sm text-[#64748B]">
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>35% - 50% Revenue Loss:</strong> Middlemen brokers siphon the lion's share of profits while farmers take production debt.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>Arbitrary Spot Pricing:</strong> Farmers forced into distressed sales at mandi gates with opaque manual deductions.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>Post-Harvest Spoilage:</strong> Up to 22% of perishable crops rot due to unscheduled transport and lack of cold logistics.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>Payment Delays:</strong> Kisan payment receipts held for 30 to 60 days by local commission agents.</span>
              </li>
            </ul>
          </div>

          {/* The MANDI-X Solution */}
          <div className="p-8 rounded-3xl bg-white border border-[#00F098] shadow-md relative overflow-hidden ring-2 ring-[#00F098]/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#E8FFF6] flex items-center justify-center text-[#006D42]">
                <ShieldCheck className="w-6 h-6 text-[#00C97E]" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#006D42]">The Mandi-X Solution</span>
                <h2 className="text-2xl font-black text-[#0F172A]">Direct, Transparent & AI-Optimized</h2>
              </div>
            </div>
            <ul className="space-y-4 text-sm text-[#0F172A]">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00C97E] shrink-0 mt-0.5" />
                <span><strong>0% Commission Direct Matching:</strong> Farmers connect directly to consumers and bulk retailers with 100% margin retention.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00C97E] shrink-0 mt-0.5" />
                <span><strong>Live APMC Benchmark Intelligence:</strong> Daily spot pricing openly published across 18 mandis prevents unfair discounting.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00C97E] shrink-0 mt-0.5" />
                <span><strong>Instant Digital Escrow:</strong> Payments secured prior to farm dispatch and released straight to farmer bank upon verification.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00C97E] shrink-0 mt-0.5" />
                <span><strong>Integrated Farm-Gate Logistics:</strong> Scheduled GPS-tracked pickup vehicles dispatch produce straight from the kisan's field.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Head-to-Head Comparison Table */}
        <div className="rounded-3xl bg-white border border-[#E2E8F0] shadow-sm p-6 sm:p-8 overflow-hidden">
          <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] mb-6 text-center">
            MANDI-X vs. Traditional Mandi Supply Chain
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#E2E8F0] text-[#64748B] text-xs font-bold uppercase tracking-wider">
                  <th className="pb-3 px-4">Feature Metric</th>
                  <th className="pb-3 px-4 text-rose-600">Traditional Mandi Process</th>
                  <th className="pb-3 px-4 text-[#006D42] bg-[#E8FFF6]/40 rounded-t-xl">MANDI-X Platform</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                <tr>
                  <td className="py-4 px-4 font-bold">Intermediaries</td>
                  <td className="py-4 px-4 text-slate-500">4 - 6 Middlemen (Arhatiya, Dalal, Wholesaler)</td>
                  <td className="py-4 px-4 font-bold text-[#006D42] bg-[#E8FFF6]/20">0 Middlemen (Peer-to-Peer Direct)</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold">Kisan Payout Speed</td>
                  <td className="py-4 px-4 text-slate-500">30 to 60 Days Credit</td>
                  <td className="py-4 px-4 font-bold text-[#006D42] bg-[#E8FFF6]/20">Instant Escrow Release Upon Dispatch</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold">Price Determination</td>
                  <td className="py-4 px-4 text-slate-500">Closed Secret Bidding (Under cover)</td>
                  <td className="py-4 px-4 font-bold text-[#006D42] bg-[#E8FFF6]/20">Transparent APMC Real-Time Index</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold">Buyer Traceability</td>
                  <td className="py-4 px-4 text-slate-500">Zero Farm Origin Information</td>
                  <td className="py-4 px-4 font-bold text-[#006D42] bg-[#E8FFF6]/20">100% Batch QR Code & Field History</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold">Farmer Net Income</td>
                  <td className="py-4 px-4 text-slate-500">Baseline ₹18 - ₹22 / kg</td>
                  <td className="py-4 px-4 font-bold text-[#006D42] bg-[#E8FFF6]/20">+35% Higher (₹28 - ₹34 / kg)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0F172A] text-white text-center flex flex-col items-center">
          <h2 className="text-3xl font-black mb-3">Join India's Direct Agritech Revolution</h2>
          <p className="text-white/80 max-w-xl text-sm sm:text-base mb-6">
            Sign up today as a Farmer, Bulk Retailer, or Household Consumer. Experience transparency.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/register"
              className="h-11 px-8 rounded-full bg-[#00F098] text-[#0F172A] text-sm font-extrabold hover:bg-[#00C97E] hover:text-white transition-all flex items-center gap-2"
            >
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/market-prices"
              className="h-11 px-8 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition-all inline-flex items-center justify-center"
            >
              Check Live Rates
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
