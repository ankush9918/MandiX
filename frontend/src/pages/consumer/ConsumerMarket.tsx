import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMarket } from '../../context/MarketContext';
import { useNotifications } from '../../context/NotificationContext';
import { Product } from '../../types';
import { Search, Heart, Plus, CheckCircle2, Filter } from 'lucide-react';

export const ConsumerMarket: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const { products, addToCart, toggleWishlist, isInWishlist } = useMarket();
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'rating'>('rating');

  const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Pulses', 'Oilseeds', 'Dairy', 'Spices', 'Organic'];
  const locations = ['All', 'Kanpur, UP', 'Nashik, Maharashtra', 'Khanna, Punjab'];

  const filtered = products
    .filter(p => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.variety.toLowerCase().includes(search.toLowerCase()) ||
        p.farmerName.toLowerCase().includes(search.toLowerCase());
      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchLoc = selectedLocation === 'All' || p.farmerLocation === selectedLocation;
      return matchSearch && matchCategory && matchLoc;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return b.rating - a.rating;
    });

  const handleAddToCart = (e: React.MouseEvent, prod: Product) => {
    e.stopPropagation();
    addToCart(prod, 1);
    showToast('Item Added', `${prod.name} added to your basket.`, 'success');
  };

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          Direct Farmer Marketplace
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Browse verified sunrise harvests directly from registered Indian kisans
        </p>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white p-4 rounded-3xl border border-[#E2E8F0] shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search produce, kisan..."
            className="w-full pl-9 pr-3 py-2 bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl text-xs sm:text-sm focus:outline-none focus:bg-white"
          />
        </div>

        {/* Category */}
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="h-10 px-3 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-xs font-bold text-[#0F172A] outline-none"
        >
          {categories.map(c => (
            <option key={c} value={c}>
              {c === 'All' ? 'All Categories' : c}
            </option>
          ))}
        </select>

        {/* Location */}
        <select
          value={selectedLocation}
          onChange={e => setSelectedLocation(e.target.value)}
          className="h-10 px-3 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-xs font-bold text-[#0F172A] outline-none"
        >
          {locations.map(l => (
            <option key={l} value={l}>
              {l === 'All' ? 'All Farm Locations' : l}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as any)}
          className="h-10 px-3 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-xs font-bold text-[#0F172A] outline-none"
        >
          <option value="rating">Top Rated & Verified</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400 text-xs bg-white rounded-3xl border border-[#E2E8F0]">
            No produce lots match your search filters.
          </div>
        ) : (
          filtered.map(prod => (
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
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#006D42] uppercase">{prod.category}</span>
                    <span className="text-[11px] font-bold text-amber-600">★ {prod.rating}</span>
                  </div>
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
          ))
        )}
      </div>
    </div>
  );
};
