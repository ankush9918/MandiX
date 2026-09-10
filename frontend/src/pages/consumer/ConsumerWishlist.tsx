import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMarket } from '../../context/MarketContext';
import { useNotifications } from '../../context/NotificationContext';
import { Heart, Plus, Trash2, ArrowRight } from 'lucide-react';

export const ConsumerWishlist: React.FC = () => {
  const { wishlist, products, addToCart, toggleWishlist } = useMarket();
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const savedProducts = products.filter(p => wishlist.includes(p.id));

  const handleMoveToCart = (prod: any) => {
    addToCart(prod, 1);
    showToast('Moved to Cart', `${prod.name} added to your basket.`, 'success');
  };

  if (savedProducts.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4 font-sans bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-xs">
        <Heart className="w-12 h-12 text-slate-300 mx-auto" />
        <h2 className="text-xl font-black text-[#0F172A]">No Saved Produce Lots</h2>
        <p className="text-xs text-[#64748B]">Tap the heart icon on any farmer produce card to save it for easy re-ordering.</p>
        <Link
          to="/consumer/market"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#00F098] text-[#0F172A] font-extrabold text-xs"
        >
          <span>Browse Marketplace</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          Saved Farm Produce
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Your wishlist of seasonal farm lots and favorite farmer produce
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {savedProducts.map(prod => (
          <div
            key={prod.id}
            className="bg-white border border-[#E2E8F0] rounded-3xl p-4 shadow-xs hover:border-[#00F098] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 rounded-2xl overflow-hidden mb-3 bg-slate-100">
                <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                <button
                  onClick={() => toggleWishlist(prod.id)}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-rose-500 shadow-xs"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-sm font-bold text-[#0F172A] truncate">{prod.name}</h3>
              <p className="text-xs text-[#64748B]">Kisan: {prod.farmerName}</p>
              <div className="mt-2 text-base font-black text-[#006D42] tnum">₹{prod.price} / {prod.unit}</div>
            </div>

            <button
              onClick={() => handleMoveToCart(prod)}
              className="mt-4 w-full py-2.5 rounded-xl bg-[#00F098] hover:bg-[#00C97E] hover:text-white text-[#0F172A] text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Move to Cart</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
