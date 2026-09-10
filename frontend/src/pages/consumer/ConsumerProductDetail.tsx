import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMarket } from '../../context/MarketContext';
import { useNotifications } from '../../context/NotificationContext';
import { Badge } from '../../components/common/Badge';
import {
  ArrowLeft,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  Truck,
  Star
} from 'lucide-react';

export const ConsumerProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useMarket();
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const product = products.find(p => p.id === id) || products[0];
  const [qty, setQty] = useState(product ? Math.max(1, product.moq) : 1);

  if (!product) {
    return (
      <div className="py-12 text-center text-slate-500">
        Product not found.{' '}
        <button onClick={() => navigate('/consumer/market')} className="text-[#006D42] font-bold">
          Return to Market
        </button>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product, qty);
    showToast('Cart Updated', `${qty} ${product.unit} of ${product.name} added to cart.`, 'success');
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    navigate('/consumer/checkout');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 font-sans">
      <button
        onClick={() => navigate('/consumer/market')}
        className="inline-flex items-center gap-2 text-xs font-bold text-[#64748B] hover:text-[#0F172A] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Market Catalog</span>
      </button>

      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left: Product Image & Farm Badge */}
        <div className="md:col-span-6 space-y-4">
          <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-100 shadow-xs">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge variant="verified" icon={<CheckCircle2 className="w-3.5 h-3.5 text-[#00C97E]" />}>
                Verified Producer
              </Badge>
            </div>
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#0F172A]/85 backdrop-blur text-white flex items-center justify-between text-xs">
              <span>Batch #{product.traceability.batchNumber}</span>
              <span className="text-[#00F098] font-bold">100% Traceable</span>
            </div>
          </div>
        </div>

        {/* Right: Pricing, Description, Actions */}
        <div className="md:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#006D42] bg-[#E8FFF6] px-2.5 py-1 rounded-full">
              {product.category} • {product.grade}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 text-xs text-[#64748B]">
              <span>Kisan: <strong className="text-[#0F172A]">{product.farmerName}</strong></span>
              <span>•</span>
              <span>📍 {product.farmerLocation}</span>
              <span>•</span>
              <span className="text-amber-600 font-bold flex items-center gap-0.5">
                <Star className="w-3 h-3 fill-current" /> {product.rating} ({product.reviewsCount} reviews)
              </span>
            </div>

            <div className="py-3 border-y border-[#E2E8F0] flex items-baseline gap-3">
              <span className="text-3xl font-black text-[#006D42] tnum">
                ₹{product.price}
              </span>
              <span className="text-sm text-slate-500 font-medium">per {product.unit} (incl. mandi taxes)</span>
            </div>

            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              {product.description}
            </p>

            <div className="text-xs text-slate-500 space-y-1">
              <div>Available Harvest Stock: <strong className="text-slate-800">{product.availableQty} {product.unit}</strong></div>
              <div>Minimum Order Quantity (MOQ): <strong className="text-slate-800">{product.moq} {product.unit}</strong></div>
              <div>Estimated Delivery: <strong className="text-[#006D42]">Tomorrow Morning by 09:00 AM</strong></div>
            </div>
          </div>

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-4 pt-4 border-t border-[#E2E8F0]">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-[#0F172A]">Quantity ({product.unit}):</span>
              <div className="flex items-center border border-[#E2E8F0] rounded-xl bg-[#F7F8FA] p-1">
                <button
                  onClick={() => setQty(Math.max(product.moq, qty - 1))}
                  className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center hover:bg-slate-100 text-slate-700"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-12 text-center text-sm font-black text-[#0F172A] tnum">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center hover:bg-slate-100 text-slate-700"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-sm font-bold text-[#006D42] tnum">
                Total: ₹{(qty * product.price).toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAdd}
                className="h-12 rounded-2xl border-2 border-[#0F172A] bg-white hover:bg-[#F7F8FA] text-[#0F172A] text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleBuyNow}
                className="h-12 rounded-2xl bg-[#00F098] hover:bg-[#00C97E] hover:text-white text-[#0F172A] text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 shadow-[0_2px_10px_rgba(0,240,152,0.35)] active:scale-95"
              >
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Traceability Timeline */}
      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2">
          <QrCode className="w-5 h-5 text-[#006D42]" />
          <h3 className="text-lg font-black text-[#0F172A]">
            Farm-to-Plate Traceability Timeline
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
          <div className="p-4 rounded-2xl bg-[#E8FFF6] border border-[#00F098] space-y-1">
            <span className="text-[10px] font-black uppercase text-[#006D42] block">Step 1: Harvest</span>
            <div className="font-bold text-xs text-[#0F172A]">{product.traceability.harvestTimestamp}</div>
            <p className="text-[11px] text-[#64748B]">{product.traceability.fieldLocation}</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#E8FFF6] border border-[#00F098] space-y-1">
            <span className="text-[10px] font-black uppercase text-[#006D42] block">Step 2: Cold Handoff</span>
            <div className="font-bold text-xs text-[#0F172A]">Aerated Cold Hub</div>
            <p className="text-[11px] text-[#64748B]">Pre-cooled within 2 hours of harvest</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#E8FFF6] border border-[#00F098] space-y-1">
            <span className="text-[10px] font-black uppercase text-[#006D42] block">Step 3: Quality Check</span>
            <div className="font-bold text-xs text-[#0F172A]">{product.grade} Certified</div>
            <p className="text-[11px] text-[#64748B]">{product.traceability.qualityCertifiedBy}</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] space-y-1">
            <span className="text-[10px] font-black uppercase text-slate-500 block">Step 4: Dispatch</span>
            <div className="font-bold text-xs text-[#0F172A]">Transit Sealed</div>
            <p className="text-[11px] text-[#64748B]">GPS E-Way Bill Monitored</p>
          </div>
        </div>
      </div>
    </div>
  );
};
