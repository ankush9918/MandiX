import React, { useState } from 'react';
import { Badge } from '../../components/common/Badge';
import { Users, Star, MapPin, CheckCircle2, Phone, Search } from 'lucide-react';

export const RetailerSuppliers: React.FC = () => {
  const [search, setSearch] = useState('');

  const suppliers = [
    {
      id: 'sup-1',
      name: 'Ramesh Patil',
      farmLocation: 'Kanpur, UP',
      crops: ['Tomato', 'Wheat', 'Potato', 'Mustard'],
      totalOrders: 28,
      rating: 4.9,
      status: 'Active Partner',
      phone: '+91 98765 43210',
      escrowPaid: '₹1,42,000'
    },
    {
      id: 'sup-2',
      name: 'Ganesh Shinde',
      farmLocation: 'Nashik, Maharashtra',
      crops: ['Nashik Red Onion', 'Chana Dal'],
      totalOrders: 19,
      rating: 4.8,
      status: 'Active Partner',
      phone: '+91 94220 88991',
      escrowPaid: '₹98,500'
    },
    {
      id: 'sup-3',
      name: 'Sukhwinder Singh',
      farmLocation: 'Khanna, Punjab',
      crops: ['Sharbati Wheat', 'Basmati Rice'],
      totalOrders: 34,
      rating: 5.0,
      status: 'Active Partner',
      phone: '+91 97723 11220',
      escrowPaid: '₹2,64,000'
    }
  ];

  const filtered = suppliers.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.farmLocation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
            Direct Farmer Suppliers Directory
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Verified agriculture grower networks delivering produce with standardized GST compliance
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search supplier kisan..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#E2E8F0] rounded-xl text-xs sm:text-sm focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(sup => (
          <div
            key={sup.id}
            className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-xs hover:border-[#00F098] transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-2xl bg-[#E8FFF6] text-[#006D42] font-black flex items-center justify-center text-base">
                  {sup.name.slice(0, 2).toUpperCase()}
                </div>
                <Badge variant="verified">
                  {sup.status}
                </Badge>
              </div>

              <h3 className="text-base font-black text-[#0F172A]">{sup.name}</h3>
              <p className="text-xs text-[#64748B] flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#00C97E]" />
                <span>{sup.farmLocation}</span>
              </p>

              <div className="p-3 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] my-3 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Quality Rating:</span>
                  <span className="font-bold text-amber-600 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> {sup.rating} / 5.0
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Fulfilled POs:</span>
                  <span className="font-bold text-[#0F172A] tnum">{sup.totalOrders} Consignments</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Escrow Settled:</span>
                  <span className="font-black text-[#006D42] tnum">{sup.escrowPaid}</span>
                </div>
              </div>

              <div className="text-xs text-[#64748B]">
                <strong>Crops:</strong> {sup.crops.join(', ')}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
              <span className="text-slate-500">{sup.phone}</span>
              <button className="px-3 py-1.5 rounded-xl bg-[#0F172A] text-white hover:bg-[#00F098] hover:text-[#0F172A] font-bold transition-colors">
                Procure Lot
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
