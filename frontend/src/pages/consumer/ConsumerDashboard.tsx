import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMarket } from '../../context/MarketContext';
import { useNotifications } from '../../context/NotificationContext';
import { Product } from '../../types';
import {
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  TrendingDown,
  ArrowRight,
  Heart,
  Plus
} from 'lucide-react';

export const ConsumerDashboard: React.FC = () => {
  const { products, addToCart, toggleWishlist, isInWishlist } = useMarket();
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const categories = [
    { name: 'Vegetables', icon: '🥬', count: '24 items' },
    { name: 'Fruits', icon: '🍎', count: '18 items' },
    { name: 'Grains', icon: '🌾', count: '12 items' },
    { name: 'Pulses', icon: '🫘', count: '15 items' },
    { name: 'Dairy', icon: '🥛', count: '8 items' },
    { name: 'Spices', icon: '🌶️', count: '14 items' },
    { name: 'Oilseeds', icon: '🌻', count: '6 items' },
    { name: 'Organic', icon: '🌿', count: '10 items' }
  ];

  const handleAddToCart = (e: React.MouseEvent, prod: Product) => {
    e.stopPropagation();
    addToCart(prod, 1);
    showToast('Added to Cart', `${prod.name} added to your basket.`, 'success');
  };

  return (
    <div className="space-y-10 font-sans">
      {/* 1. RUNNING APMC TICKER */}
      <div className="bg-[#0F172A] text-white py-2.5 px-4 rounded-2xl flex items-center justify-between gap-4 overflow-hidden text-xs">
        <div className="flex items-center gap-2 font-bold shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#00F098] animate-ping" />
          <span className="text-[#00F098]">MANDI LIVE:</span>
          <span className="hidden sm:inline text-slate-300">Daily APMC Settlement Rates</span>
        </div>
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar whitespace-nowrap text-slate-300">
          <span>🍅 Tomato: <b className="text-[#00F098]">₹28/kg</b> (▼ 18% vs Market)</span>
          <span>🧅 Nashik Onion: <b className="text-[#00F098]">₹26/kg</b> (▼ 14% vs Market)</span>
          <span>🌾 Sharbati Wheat: <b className="text-[#00F098]">₹32/kg</b> (Grade-A)</span>
          <span>🥔 Pahadi Potato: <b className="text-[#00F098]">₹24/kg</b></span>
        </div>
      </div>

      {/* 2. HERO PROMOTIONAL BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#13281E] to-[#0F172A] text-white p-6 sm:p-10 lg:p-12 shadow-md">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00F098]/20 text-[#00F098] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DIRECT FARM-TO-HOME GATEWAY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Fresh From <br />
            <span className="text-[#00F098]">Indian Farms</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-lg leading-relaxed">
            Better Prices. Fresher Produce. Direct from verified farmers at zero middleman markup. Plucked at sunrise, delivered straight to your home.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/consumer/market"
              className="h-11 px-7 rounded-full bg-[#00F098] text-[#0F172A] font-extrabold text-sm hover:bg-[#00C97E] hover:text-white transition-all flex items-center gap-2 shadow-sm"
            >
              <span>Shop Fresh Produce</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/consumer/orders"
              className="h-11 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-colors flex items-center justify-center"
            >
              Track Deliveries
            </Link>
          </div>
        </div>
      </div>

      {/* 3. SHOP BY CATEGORY */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-[#0F172A]">Shop by Category</h2>
            <p className="text-xs text-[#64748B]">Hand-picked farm staples harvested daily from regional grower belts</p>
          </div>
          <Link to="/consumer/market" className="text-xs font-bold text-[#006D42] hover:underline flex items-center gap-1">
            <span>Browse All</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map(cat => (
            <Link
              key={cat.name}
              to={`/consumer/market?category=${cat.name}`}
              className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs hover:border-[#00F098] hover:-translate-y-1 transition-all flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 rounded-full bg-[#E8FFF6] flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <span className="text-xs font-bold text-[#0F172A]">{cat.name}</span>
              <span className="text-[10px] text-[#64748B] mt-0.5">{cat.count}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 4. BEST PRICES TODAY */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-[#0F172A]">Best Farm Gate Deals</h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-[#00F098] text-[#0F172A]">
              20-30% OFF
            </span>
          </div>
          <Link to="/consumer/market" className="text-xs font-bold text-[#006D42] hover:underline">
            View all deals →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.slice(0, 4).map(prod => (
            <div
              key={prod.id}
              onClick={() => navigate(`/consumer/product/${prod.id}`)}
              className="bg-white border border-[#E2E8F0] rounded-3xl p-4 shadow-xs hover:border-[#00F098] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 rounded-2xl overflow-hidden mb-3 bg-slate-100">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(prod.id);
                    }}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-xs"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isInWishlist(prod.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-400'
                      }`}
                    />
                  </button>
                  <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-[#0F172A]/85 text-white text-[10px] font-bold">
                    📍 {prod.farmerLocation}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#006D42] uppercase">{prod.category}</span>
                  <h3 className="text-sm font-bold text-[#0F172A] truncate">{prod.name}</h3>
                  <p className="text-xs text-[#64748B]">Kisan: {prod.farmerName}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#E2E8F0]">
                <div>
                  <span className="text-base font-black text-[#0F172A] tnum">₹{prod.price}</span>
                  <span className="text-xs text-slate-500"> / {prod.unit}</span>
                </div>

                <button
                  onClick={(e) => handleAddToCart(e, prod)}
                  className="h-9 px-3.5 rounded-xl bg-[#00F098] hover:bg-[#00C97E] hover:text-white text-[#0F172A] text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
