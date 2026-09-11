import React from 'react';
import { Link } from 'react-router-dom';

export const MainFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#0B1120] text-white/80 border-t border-white/10 pt-14 pb-8 font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Branding */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#0A1120] border border-[#00F098]/40 flex items-center justify-center shrink-0 shadow-sm">
                <img
                  src="/assets/logo.png"
                  alt="MANDI-X Logo"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <span className="font-black text-2xl text-white tracking-tight flex items-center">
                MANDI<span className="text-[#00F098]">-X</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#00F098]/20 text-[#00F098] text-[10px] font-bold border border-[#00F098]/30">
                मंडी-X
              </span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed max-w-sm">
              India's direct agritech trading network. Connecting farm gate to urban buyer with 0% middleman commission, AI demand forecasting, and transparent APMC spot pricing.
            </p>
            <div className="mt-1 text-xs text-[#00F098] font-bold">
              मंडी से सीधे घर और दुकान तक
            </div>
          </div>

          {/* Col 2: Marketplace Links */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-1">
              Marketplace
            </h4>
            <Link to="/what-is-mandix" className="text-xs hover:text-[#00F098] transition-colors">
              What is MANDI-X
            </Link>
            <Link to="/how-it-works" className="text-xs hover:text-[#00F098] transition-colors">
              How It Works
            </Link>
            <Link to="/solutions" className="text-xs hover:text-[#00F098] transition-colors">
              Role Solutions
            </Link>
            <Link to="/ai-intelligence" className="text-xs hover:text-[#00F098] transition-colors">
              AI Yield & Demand
            </Link>
            <Link to="/market-prices" className="text-xs hover:text-[#00F098] transition-colors">
              Live Mandi Benchmark
            </Link>
          </div>

          {/* Col 3: Support */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-1">
              Kisan Support
            </h4>
            <span className="text-xs text-white/90 font-medium">Toll-Free Helpline: 1800-MANDI-X</span>
            <span className="text-xs text-white/60">Mon - Sat: 06:00 AM - 08:00 PM IST</span>
            <span className="text-xs text-white/60">WhatsApp Bot: +91 98000 12345 (24x7)</span>
            <span className="text-xs text-white/60">Farm Gate Pickup Assistance</span>
            <span className="text-xs text-white/60">APMC Mandi Grievance Cell</span>
          </div>

          {/* Col 4: Trust & Compliance */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-1">
              Trust & Security
            </h4>
            <span className="text-xs text-white/60">100% Escrow Protected Trades</span>
            <span className="text-xs text-white/60">State APMC Regulatory Aligned</span>
            <span className="text-xs text-white/60">FSSAI Certified Traceability</span>
            <span className="text-xs text-white/60">Direct Bank Payout Settlement</span>
            <span className="text-xs text-white/60">SIH26033 Agritech Innovation</span>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-2">
          <p>© 2026 MANDI-X. All rights reserved. Zero Middleman Direct Agritech Platform.</p>
          <p className="text-white/60">Built for Indian Agriculture • Farmer-First Architecture</p>
        </div>
      </div>
    </footer>
  );
};
