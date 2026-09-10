import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMarket } from '../../context/MarketContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';

export const ConsumerCart: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, cartSubtotal, cartDeliveryFee, cartTotal } = useMarket();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4 font-sans bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-xs">
        <div className="w-16 h-16 rounded-full bg-[#E8FFF6] flex items-center justify-center text-3xl mx-auto">
          🛒
        </div>
        <h2 className="text-2xl font-black text-[#0F172A]">Your Basket is Empty</h2>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Browse fresh verified crop lots directly from Indian farmers with zero middleman markup.
        </p>
        <Link
          to="/consumer/market"
          className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-[#00F098] text-[#0F172A] font-extrabold text-xs shadow-sm hover:bg-[#00C97E] hover:text-white transition-all"
        >
          <span>Explore Farm Marketplace</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 font-sans">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          My Shopping Basket
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Direct farm-gate produce with transparent APMC benchmark pricing
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-sm divide-y divide-[#E2E8F0]">
          {cart.map(item => (
            <div key={item.product.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-2xl object-cover bg-slate-100 shrink-0"
                />
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">{item.product.name}</h3>
                  <p className="text-xs text-[#64748B]">Kisan: {item.product.farmerName} • 📍 {item.product.farmerLocation}</p>
                  <span className="text-xs font-bold text-[#006D42]">
                    ₹{item.product.price} / {item.product.unit}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6">
                {/* Quantity adjuster */}
                <div className="flex items-center border border-[#E2E8F0] rounded-xl bg-[#F7F8FA] p-1">
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                    className="w-7 h-7 rounded-lg bg-white shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-100"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-[#0F172A] tnum">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                    className="w-7 h-7 rounded-lg bg-white shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-100"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <div className="text-right min-w-[70px]">
                  <span className="text-sm font-black text-[#0F172A] tnum">
                    ₹{(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary & Proceed CTA */}
        <div className="lg:col-span-4 bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-sm space-y-5">
          <h3 className="text-base font-black text-[#0F172A]">Bill Summary</h3>

          <div className="space-y-2.5 text-xs text-[#64748B] pb-4 border-b border-[#E2E8F0]">
            <div className="flex justify-between">
              <span>Produce Subtotal:</span>
              <span className="font-bold text-[#0F172A] tnum">₹{cartSubtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Farm-to-Door Delivery:</span>
              <span className="font-bold text-[#0F172A] tnum">
                {cartDeliveryFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `₹${cartDeliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Middlemen Brokerage:</span>
              <span className="font-bold text-[#006D42]">₹0 (100% Direct)</span>
            </div>
            <div className="flex justify-between">
              <span>Escrow Protection Fee:</span>
              <span className="font-bold text-[#006D42]">FREE</span>
            </div>
          </div>

          <div className="flex justify-between items-baseline text-sm font-black text-[#0F172A]">
            <span>Total Payable:</span>
            <span className="text-xl font-black text-[#006D42] tnum">₹{cartTotal.toLocaleString()}</span>
          </div>

          <button
            onClick={() => navigate('/consumer/checkout')}
            className="w-full h-12 rounded-2xl bg-[#00F098] hover:bg-[#00C97E] hover:text-white text-[#0F172A] font-extrabold text-sm transition-all shadow-[0_2px_10px_rgba(0,240,152,0.35)] flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="p-3 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] text-[11px] text-[#64748B] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#006D42] shrink-0" />
            <span>100% Escrow Protection: Funds held securely until produce is delivered to your door.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
