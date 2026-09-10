import React from 'react';
import { useMarket } from '../../context/MarketContext';
import { Badge } from '../../components/common/Badge';
import { Truck, MapPin, CheckCircle2, ShieldAlert } from 'lucide-react';

export const AdminLogistics: React.FC = () => {
  const { pickups } = useMarket();

  const fleets = [
    { id: 'FLT-01', driver: 'Harpreet Singh', vehicle: 'UP 78 BT 4421', route: 'Kanpur -> Delhi Azadpur', status: 'En Route', temp: '4.2°C' },
    { id: 'FLT-02', driver: 'Mukesh Yadav', vehicle: 'MH 15 CT 9012', route: 'Nashik -> Mumbai APMC', status: 'Loading at Gate', temp: '5.1°C' },
    { id: 'FLT-03', driver: 'Gurinder Gill', vehicle: 'PB 10 DT 8814', route: 'Khanna -> Chandigarh', status: 'Scheduled', temp: 'Ambient' }
  ];

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          Logistics Fleet & Dispatch Coordination
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Live telemetry of electric transport trucks, cold chain sensors, and farm pickup routes
        </p>
      </div>

      {/* Fleets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {fleets.map(f => (
          <div key={f.id} className="bg-white border border-[#E2E8F0] rounded-3xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-xs text-[#006D42]">{f.id}</span>
              <Badge variant={f.status === 'En Route' ? 'mint' : 'neutral'}>{f.status}</Badge>
            </div>
            <div>
              <div className="font-bold text-sm text-[#0F172A]">{f.driver}</div>
              <span className="text-xs text-slate-500 font-mono">{f.vehicle}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-xs space-y-1">
              <div><strong>Route:</strong> {f.route}</div>
              <div><strong>Cold Sensor:</strong> <span className="text-[#006D42] font-bold">{f.temp}</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* Pickups Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-sm p-6 space-y-4">
        <h3 className="text-base font-black text-[#0F172A]">Farm Gate Pickup Queue</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0] text-[11px] font-bold uppercase text-[#64748B]">
                <th className="pb-3 px-4">Pickup ID</th>
                <th className="pb-3 px-4">Producer Kisan</th>
                <th className="pb-3 px-4">Crop & Volume</th>
                <th className="pb-3 px-4">Pickup Window</th>
                <th className="pb-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-xs">
              {pickups.map(p => (
                <tr key={p.id} className="hover:bg-[#F7F8FA]">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#0F172A]">{p.id}</td>
                  <td className="py-3.5 px-4 font-medium">{p.farmerName}</td>
                  <td className="py-3.5 px-4">{p.cropName} ({p.quantity} {p.unit})</td>
                  <td className="py-3.5 px-4 text-slate-500">{p.pickupDate} ({p.timeSlot})</td>
                  <td className="py-3.5 px-4 text-center">
                    <Badge variant={p.status === 'Completed' ? 'success' : 'mint'}>{p.status}</Badge>
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
