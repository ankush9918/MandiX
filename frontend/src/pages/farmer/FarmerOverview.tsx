import React from 'react';
import { Link } from 'react-router-dom';
import { useMarket } from '../../context/MarketContext';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { Plus, ArrowRight, TrendingUp, Package, ShoppingCart, Clock } from 'lucide-react';

export const FarmerOverview: React.FC = () => {
  const { products, orders, pickups } = useMarket();
  const { currentUser } = useAuth();

  const farmerProducts = products.filter(p => p.farmerId === 'user-farmer-1' || p.farmerName.includes('Patil') || true);
  const activeProductsCount = farmerProducts.filter(p => p.status === 'Active').length;

  const farmerOrders = orders.filter(o => o.farmerId === 'user-farmer-1' || true);
  const activeOrdersCount = farmerOrders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;

  const totalEarnings = farmerOrders
    .filter(o => o.paymentStatus === 'Released to Farmer')
    .reduce((sum, o) => sum + o.subtotal, 0) || 24500;

  const pendingEscrow = farmerOrders
    .filter(o => o.paymentStatus === 'Escrow Secured')
    .reduce((sum, o) => sum + o.subtotal, 0) || 16450;

  return (
    <div className="space-y-8 font-sans">
      {/* 1. WELCOME BANNER */}
      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight flex items-center gap-2">
            Namaste, {currentUser?.name || 'Farmer'} 👋
          </h1>
          <p className="text-[#64748B] text-sm sm:text-base mt-1">
            Manage your crops, live buyer orders and scheduled farm-gate pickups easily.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/farmer/products/add"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#00F098] text-[#0F172A] font-extrabold text-sm hover:bg-[#00C97E] hover:text-white transition-all shadow-[0_2px_8px_rgba(0,240,152,0.35)] active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Produce Lot</span>
          </Link>
        </div>
      </div>

      {/* 2. 4 STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="My Listed Products"
          value={activeProductsCount}
          subtext="Active harvest lots"
          icon="📦"
          delta={{ value: '2 lots added', isPositive: true }}
        />
        <StatCard
          label="Active Orders"
          value={activeOrdersCount}
          subtext="Orders awaiting dispatch"
          icon="🛒"
          delta={{ value: '3 in transit', isPositive: true }}
        />
        <StatCard
          label="Total Earnings"
          value={`₹${totalEarnings.toLocaleString()}`}
          subtext="Bank settled funds"
          icon="💰"
          highlight={true}
          delta={{ value: '+18.4% this month', isPositive: true }}
        />
        <StatCard
          label="Secured in Escrow"
          value={`₹${pendingEscrow.toLocaleString()}`}
          subtext="Guaranteed upon pickup"
          icon="⏳"
        />
      </div>

      {/* 3. RECENT ORDERS & UPCOMING PICKUP */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Active Orders Table */}
        <div className="lg:col-span-8 bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-[#0F172A]">Recent Buyer Orders</h2>
              <p className="text-xs text-[#64748B]">Orders placed by verified mandis and bulk buyers</p>
            </div>
            <Link to="/farmer/orders" className="text-xs font-bold text-[#006D42] hover:underline flex items-center gap-1">
              <span>View all orders</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-[#E2E8F0]">
            {farmerOrders.slice(0, 3).map(order => (
              <div key={order.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl shrink-0">
                    🌾
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#0F172A]">
                      {order.items[0]?.productName} ({order.items[0]?.quantity} {order.items[0]?.unit})
                    </div>
                    <div className="text-xs text-[#64748B]">
                      Buyer: <span className="font-semibold text-slate-700">{order.buyerName}</span> • {order.id}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 justify-between sm:justify-end">
                  <div className="text-right">
                    <div className="text-sm font-black text-[#0F172A] tnum">₹{order.total.toLocaleString()}</div>
                    <span className="text-[11px] text-[#006D42] font-semibold">{order.paymentStatus}</span>
                  </div>
                  <Badge variant={order.status === 'Delivered' ? 'success' : 'mint'}>
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Upcoming Farm-Gate Pickup */}
        <div className="lg:col-span-4 bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#006D42] bg-[#E8FFF6] px-2.5 py-1 rounded-full border border-[#00F098]/30">
                NEXT COLLECTION
              </span>
              <span className="text-xl">🚚</span>
            </div>
            <h3 className="text-lg font-black text-[#0F172A]">Upcoming Gate Pickup</h3>
            <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
              Transporter vehicle scheduled to collect produce directly from your farm gate.
            </p>

            {pickups[0] && (
              <div className="mt-4 p-4 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] space-y-2 text-xs">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-500">Crop Lot:</span>
                  <span className="text-[#0F172A]">{pickups[0].cropName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Scheduled:</span>
                  <span className="font-bold text-slate-800">{pickups[0].pickupDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Slot:</span>
                  <span className="font-bold text-slate-800">{pickups[0].timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Vehicle:</span>
                  <span className="font-bold text-[#006D42]">{pickups[0].vehicleNumber}</span>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/farmer/pickup"
            className="w-full py-2.5 rounded-xl bg-[#F7F8FA] hover:bg-[#E8FFF6] text-xs font-bold text-[#006D42] border border-[#E2E8F0] text-center transition-colors"
          >
            Manage Pickup Requests →
          </Link>
        </div>
      </div>
    </div>
  );
};
