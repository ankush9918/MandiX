import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMarket } from '../../context/MarketContext';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';
import {
  MapPin,
  Clock,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Sparkles
} from 'lucide-react';

export const ConsumerCheckout: React.FC = () => {
  const { cart, cartSubtotal, cartDeliveryFee, cartTotal, createOrder, clearCart } = useMarket();
  const { currentUser } = useAuth();
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [address, setAddress] = useState(
    currentUser?.deliveryAddress || 'Flat 402, Green Valley Apartments, New Delhi 110049'
  );
  const [deliverySlot, setDeliverySlot] = useState('Tomorrow Morning (07:00 AM - 09:30 AM)');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'Cash on Delivery'>('UPI');
  const [upiId, setUpiId] = useState('rohit.sharma@okaxis');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrderId, setCompletedOrderId] = useState('');

  const handleProcessPayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      // Create new Order in LocalStorage
      const newOrder = createOrder({
        buyerId: currentUser?.id || 'user-consumer-1',
        buyerName: currentUser?.name || 'Rohit Sharma',
        buyerRole: 'Consumer',
        farmerId: cart[0]?.product.farmerId || 'user-farmer-1',
        farmerName: cart[0]?.product.farmerName || 'Ramesh Patil',
        items: cart.map(i => ({
          productId: i.product.id,
          productName: i.product.name,
          quantity: i.quantity,
          pricePerUnit: i.product.price,
          unit: i.product.unit,
          image: i.product.image
        })),
        subtotal: cartSubtotal,
        deliveryFee: cartDeliveryFee,
        total: cartTotal,
        status: 'Confirmed',
        paymentMethod: paymentMethod === 'Cash on Delivery' ? 'Cash on Delivery' : 'UPI',
        paymentStatus: 'Escrow Secured',
        deliveryAddress: address,
        carrierName: 'Delhi Kisan Express Transporter',
        estimatedDelivery: deliverySlot
      });

      setCompletedOrderId(newOrder.id);
      setStep(4);
      clearCart();

      // Fire celebratory confetti!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      showToast('Payment Secured!', `Order ${newOrder.id} placed in escrow protection.`, 'success');
    }, 1800);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 font-sans">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          Checkout & Escrow Booking
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Direct agricultural settlement with 100% buyer escrow protection
        </p>
      </div>

      {/* Progress Steps Header */}
      <div className="flex items-center justify-between p-4 bg-white border border-[#E2E8F0] rounded-2xl shadow-xs text-xs font-bold">
        {[
          { num: 1, title: 'Address' },
          { num: 2, title: 'Delivery Slot' },
          { num: 3, title: 'Escrow Payment' },
          { num: 4, title: 'Confirmation' }
        ].map(s => (
          <div
            key={s.num}
            className={`flex items-center gap-2 ${
              step === s.num ? 'text-[#006D42]' : step > s.num ? 'text-[#0F172A]' : 'text-slate-400'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                step === s.num
                  ? 'bg-[#00F098] text-[#0F172A]'
                  : step > s.num
                  ? 'bg-[#0F172A] text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {step > s.num ? '✓' : s.num}
            </span>
            <span className="hidden sm:inline">{s.title}</span>
          </div>
        ))}
      </div>

      {/* STEP 1: ADDRESS */}
      {step === 1 && (
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#006D42]" />
            <h3 className="text-lg font-black text-[#0F172A]">Delivery Address</h3>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
              Confirm Street Address, Building, Landmark & Pincode
            </label>
            <textarea
              rows={3}
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="w-full p-4 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setStep(2)}
              className="h-11 px-8 rounded-full bg-[#00F098] text-[#0F172A] font-extrabold text-sm hover:bg-[#00C97E] hover:text-white transition-all flex items-center gap-2 shadow-sm"
            >
              <span>Next: Delivery Slot</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: DELIVERY SLOT */}
      {step === 2 && (
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#006D42]" />
            <h3 className="text-lg font-black text-[#0F172A]">Choose Morning Delivery Slot</h3>
          </div>

          <div className="space-y-3">
            {[
              'Tomorrow Morning (07:00 AM - 09:30 AM) — Sunrise Farm Fresh',
              'Tomorrow Midday (11:00 AM - 01:30 PM)',
              'Day After Tomorrow (07:00 AM - 09:30 AM)'
            ].map(slot => (
              <label
                key={slot}
                onClick={() => setDeliverySlot(slot)}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  deliverySlot === slot
                    ? 'border-[#00F098] bg-[#E8FFF6] shadow-xs'
                    : 'border-[#E2E8F0] bg-[#F7F8FA] hover:bg-white'
                }`}
              >
                <span className="text-xs sm:text-sm font-bold text-[#0F172A]">{slot}</span>
                <input
                  type="radio"
                  name="deliverySlot"
                  checked={deliverySlot === slot}
                  onChange={() => setDeliverySlot(slot)}
                  className="accent-[#0F172A]"
                />
              </label>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => setStep(1)}
              className="text-xs font-bold text-[#64748B] hover:text-[#0F172A]"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="h-11 px-8 rounded-full bg-[#00F098] text-[#0F172A] font-extrabold text-sm hover:bg-[#00C97E] hover:text-white transition-all flex items-center gap-2 shadow-sm"
            >
              <span>Next: Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PAYMENT METHOD & ESCROW LOCK */}
      {step === 3 && (
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#006D42]" />
            <h3 className="text-lg font-black text-[#0F172A]">Secured Escrow Payment</h3>
          </div>

          {/* Payment Method Selector */}
          <div className="grid grid-cols-3 gap-3">
            {(['UPI', 'Card', 'Cash on Delivery'] as const).map(m => (
              <button
                key={m}
                type="button"
                onClick={() => setPaymentMethod(m)}
                className={`p-3.5 rounded-2xl border text-center font-bold text-xs transition-all ${
                  paymentMethod === m
                    ? 'border-[#00F098] bg-[#E8FFF6] text-[#006D42] shadow-xs'
                    : 'border-[#E2E8F0] bg-[#F7F8FA] text-[#0F172A] hover:bg-white'
                }`}
              >
                {m === 'UPI' ? '📱 UPI' : m === 'Card' ? '💳 Card' : '💵 Pay on Delivery'}
              </button>
            ))}
          </div>

          {paymentMethod === 'UPI' && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#0F172A]">UPI Virtual Payment Address</label>
              <input
                type="text"
                value={upiId}
                onChange={e => setUpiId(e.target.value)}
                placeholder="username@okbank"
                className="w-full h-11 px-4 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm focus:outline-none focus:bg-white"
              />
            </div>
          )}

          <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] space-y-2 text-xs">
            <div className="flex justify-between font-medium">
              <span>Total Payable Amount:</span>
              <span className="text-base font-black text-[#006D42] tnum">₹{cartTotal.toLocaleString()}</span>
            </div>
            <p className="text-[11px] text-[#64748B]">
              100% Escrow Guarantee: Funds will be held safely by MANDI-X until you receive and verify the sunrise harvest delivery.
            </p>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => setStep(2)}
              className="text-xs font-bold text-[#64748B] hover:text-[#0F172A]"
            >
              Back
            </button>
            <button
              onClick={handleProcessPayment}
              disabled={isProcessing}
              className="h-12 px-8 rounded-full bg-[#00F098] text-[#0F172A] font-extrabold text-sm hover:bg-[#00C97E] hover:text-white transition-all flex items-center gap-2 shadow-sm disabled:opacity-60 active:scale-95"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Authorizing Escrow Lock...</span>
                </>
              ) : (
                <>
                  <span>Pay ₹{cartTotal.toLocaleString()} & Book Produce</span>
                  <ShieldCheck className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: ORDER CONFIRMATION */}
      {step === 4 && (
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 sm:p-12 shadow-sm text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#E8FFF6] border-2 border-[#00F098] text-[#006D42] flex items-center justify-center text-3xl mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10 text-[#00C97E]" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#006D42]">
              PAYMENT ESCROW SECURED
            </span>
            <h2 className="text-3xl font-black text-[#0F172A]">Order Successfully Placed!</h2>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto">
              Your order <strong className="text-[#0F172A]">{completedOrderId}</strong> has been transmitted directly to the farmer. Farm-gate dispatch is being scheduled.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] max-w-md mx-auto text-left text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Destination:</span>
              <span className="font-bold text-[#0F172A] truncate max-w-[220px]">{address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Delivery Window:</span>
              <span className="font-bold text-[#006D42]">{deliverySlot}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Escrow Security:</span>
              <span className="font-bold text-slate-800">100% Protected</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <button
              onClick={() => navigate('/consumer/orders')}
              className="h-11 px-7 rounded-full bg-[#0F172A] text-white font-extrabold text-xs hover:bg-slate-800 transition-colors"
            >
              Track Order on Live Map
            </button>
            <button
              onClick={() => navigate('/consumer/market')}
              className="h-11 px-7 rounded-full border border-[#E2E8F0] bg-white text-xs font-bold text-[#0F172A] hover:bg-[#F7F8FA]"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
