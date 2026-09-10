import React from 'react';
import { Link } from 'react-router-dom';
import { useMarket } from '../../context/MarketContext';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { Store, Package, Users, DollarSign, ArrowRight, Truck } from 'lucide-react';

export const RetailerDashboard: React.FC = () => {
  const { inventory, orders } = useMarket();
  const { currentUser } = useAuth();

  const inventoryValue = inventory.reduce((sum, it) => sum + it.currentStock * it.costPrice, 0) || 124800;
  const activeOrders = orders.filter(o => o.buyerRole === 'Retailer' && o.status !== 'Delivered');

  const procurementChart = [
    { name: 'Wheat', spent: 64000, volume: 2000 },
    { name: 'Onion', spent: 38000, volume: 1500 },
    { name: 'Tomato', spent: 22000, volume: 800 },
    { name: 'Potato', spent: 31000, volume: 1300 },
    { name: 'Rice', spent: 54000, volume: 800 }
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Welcome Bar */}
      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
            Welcome back, {currentUser?.name?.split(' ')[0] || 'Vikas'} 👋
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Direct mandi procurement, warehouse stock replenishment, and bulk GST billing
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/retailer/products"
            className="h-11 px-6 rounded-2xl bg-[#00F098] text-[#0F172A] font-extrabold text-xs hover:bg-[#00C97E] hover:text-white transition-all shadow-sm flex items-center gap-2 active:scale-95"
          >
            <Store className="w-4 h-4" />
            <span>Procure Bulk Lots</span>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Active Bulk Orders"
          value={activeOrders.length || 2}
          subtext="In transit to warehouse"
          icon="📦"
          delta={{ value: '2 arriving today', isPositive: true }}
        />
        <StatCard
          label="Inventory Valuation"
          value={`₹${inventoryValue.toLocaleString()}`}
          subtext="Cost valuation at warehouse"
          icon="📋"
          highlight={true}
        />
        <StatCard
          label="Monthly Procurement"
          value="₹2,09,000"
          subtext="Savings vs local middlemen"
          icon="💰"
          delta={{ value: '18% saved', isPositive: true }}
        />
        <StatCard
          label="Active Farmer Suppliers"
          value="14 Kisans"
          subtext="Direct contract network"
          icon="👨‍🌾"
        />
      </div>

      {/* Procurement Volume Chart */}
      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-[#0F172A]">B2B Wholesale Procurement by Commodity</h3>
            <p className="text-xs text-[#64748B]">Procurement volume (kg) and total expenditure (₹)</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#E8FFF6] text-[#006D42]">
            Direct Mandi Invoiced
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={procurementChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip
                formatter={(val: number, name: string) => [
                  name === 'spent' ? `₹${val.toLocaleString()}` : `${val.toLocaleString()} kg`,
                  name === 'spent' ? 'Procured Amount' : 'Volume'
                ]}
                contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '12px' }}
              />
              <Bar dataKey="spent" fill="#00F098" radius={[6, 6, 0, 0]} name="spent" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Bulk POs & Inventory Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Bulk POs */}
        <div className="lg:col-span-8 bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-[#0F172A]">Recent Purchase Orders</h3>
            <Link to="/retailer/orders" className="text-xs font-bold text-[#006D42] hover:underline flex items-center gap-1">
              <span>View all</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-[#E2E8F0]">
            {orders.filter(o => o.buyerRole === 'Retailer' || true).slice(0, 3).map(o => (
              <div key={o.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-[#0F172A]">{o.id} • {o.items[0]?.productName}</span>
                  <div className="text-[11px] text-[#64748B]">Supplier: {o.farmerName} • Qty: {o.items[0]?.quantity} {o.items[0]?.unit}</div>
                </div>
                <div className="text-right">
                  <div className="font-black text-[#0F172A] tnum">₹{o.total.toLocaleString()}</div>
                  <Badge variant={o.status === 'Delivered' ? 'success' : 'mint'}>{o.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Alerts */}
        <div className="lg:col-span-4 bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-black text-[#0F172A]">Inventory Stock Alerts</h3>
          <div className="space-y-3">
            {inventory.map(it => (
              <div key={it.id} className="p-3 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] text-xs space-y-1">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-[#0F172A]">{it.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      it.status === 'In Stock'
                        ? 'bg-emerald-100 text-emerald-800'
                        : it.status === 'Low Stock'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {it.status}
                  </span>
                </div>
                <div className="flex justify-between text-[#64748B]">
                  <span>Current: {it.currentStock} {it.unit}</span>
                  <span>Min: {it.minStockThreshold} {it.unit}</span>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/retailer/inventory"
            className="w-full py-2 rounded-xl bg-[#F7F8FA] hover:bg-slate-200 text-slate-800 font-bold text-xs text-center block transition-colors"
          >
            Manage Warehouse Stock →
          </Link>
        </div>
      </div>
    </div>
  );
};
