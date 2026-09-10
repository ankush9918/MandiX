import React from 'react';
import { Truck, MapPin, CheckCircle2, ThermometerSnowflake, ShieldCheck } from 'lucide-react';

export const ConsumerDelivery: React.FC = () => {
  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          Live Dispatch & Cold Chain Telemetry
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          GPS-tracked temperature-controlled electric dispatch from farm gate to your address
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Map & Transit Telemetry */}
        <div className="lg:col-span-8 bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F098] animate-ping" />
              <h3 className="text-base font-black text-[#0F172A]">Active Dispatch: Delhi Kisan Express #4</h3>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E8FFF6] text-[#006D42]">
              On Schedule (Est. 42 mins)
            </span>
          </div>

          {/* Stylized Simulated Route Graphic */}
          <div className="relative h-72 rounded-2xl bg-slate-900 border border-white/10 overflow-hidden flex flex-col justify-between p-6 text-white shadow-inner">
            <div className="flex justify-between items-start text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#00F098]" />
                <span>Origin: Kanpur Rural Agri Belt</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Destination: New Delhi 110049</span>
              </div>
            </div>

            {/* Visual Highway Route Line */}
            <div className="relative w-full py-6">
              <div className="w-full h-2 bg-slate-800 rounded-full relative overflow-hidden">
                <div className="w-3/4 h-full bg-gradient-to-r from-[#00F098] to-[#00C97E] rounded-full animate-pulse" />
              </div>
              {/* Truck Icon moving */}
              <div className="absolute top-3 left-[72%] -translate-x-1/2 flex flex-col items-center">
                <span className="text-2xl animate-bounce">🚚</span>
                <span className="text-[10px] font-mono bg-[#00F098] text-[#0F172A] px-2 py-0.5 rounded font-black mt-1">
                  Speed: 58 km/h
                </span>
              </div>
            </div>

            {/* Environmental Sensors */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <ThermometerSnowflake className="w-4 h-4 text-cyan-400" />
                <span>Container Temp: <strong className="text-cyan-300">4.2°C (Optimal Crisp)</strong></span>
              </div>
              <div>
                <span>Humidity: <strong className="text-slate-200">82% RH</strong></span>
              </div>
              <div>
                <span>Transporter: <strong className="text-slate-200">Harpreet Singh (DL 1L AA 4011)</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Driver & Delivery Safety Card */}
        <div className="lg:col-span-4 bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-base font-black text-[#0F172A]">Delivery Instructions</h3>
            <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] space-y-2 text-xs">
              <div className="font-bold text-[#0F172A]">Contactless Doorstep Delivery</div>
              <p className="text-[#64748B] leading-relaxed">
                Driver will ring bell and set sealed bio-crate outside door. QR code on lid unlocks produce quality inspection.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#E8FFF6] border border-[#00F098]/40 space-y-1 text-xs text-[#006D42]">
              <span className="font-bold block">100% Escrow Release Policy</span>
              <p className="text-[11px] leading-relaxed">
                Take your time to open and inspect the harvest produce. Once satisfied, tap 'Confirm Quality' to release payment to your farmer.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E2E8F0] text-center">
            <span className="text-xs text-slate-400">Toll-Free Transporter Desk: 1800-MANDI-X</span>
          </div>
        </div>
      </div>
    </div>
  );
};
