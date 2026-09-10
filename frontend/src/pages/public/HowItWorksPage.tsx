import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Truck, ShieldCheck, CreditCard, Search, FileText } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'farmer' | 'buyer'>('farmer');

  const farmerSteps = [
    {
      num: '01',
      title: 'Farmer Registration & KYC Verification',
      desc: 'Sign up with mobile number and Kisan Credit Card or Aadhaar. Our village agronomists certify land records and crop varieties.',
      icon: <FileText className="w-6 h-6 text-[#006D42]" />
    },
    {
      num: '02',
      title: 'Post Harvest Lot with Reserve Rate',
      desc: 'Take photo of harvest, specify available quantity in quintals or crates, select quality grade (Grade-A / FAQ), and set your desired benchmark rate.',
      icon: <CheckCircle2 className="w-6 h-6 text-[#006D42]" />
    },
    {
      num: '03',
      title: 'AI Smart Buyer Matching',
      desc: 'Our algorithmic matching engine connects your crop lot with active wholesale retailers, food processors, and urban consumer groups nearby.',
      icon: <Search className="w-6 h-6 text-[#006D42]" />
    },
    {
      num: '04',
      title: 'Escrow Booking Confirmation',
      desc: 'Buyer places order and deposits 100% funds into secure MANDI-X escrow. You receive instant SMS & WhatsApp order confirmation.',
      icon: <CreditCard className="w-6 h-6 text-[#006D42]" />
    },
    {
      num: '05',
      title: 'Scheduled Farm-Gate Pickup',
      desc: 'A verified transporter truck arrives directly at your farm gate or collection center. Produce is weighed, tagged with QR code, and dispatched.',
      icon: <Truck className="w-6 h-6 text-[#006D42]" />
    },
    {
      num: '06',
      title: 'Instant Bank Payout Release',
      desc: 'The moment the transporter scans the gate dispatch QR code, escrow releases direct bank payment via NEFT/UPI with zero deductions.',
      icon: <ShieldCheck className="w-6 h-6 text-[#006D42]" />
    }
  ];

  const buyerSteps = [
    {
      num: '01',
      title: 'Browse Verified Farm Produce',
      desc: 'Explore fresh sunrise harvests directly listed by certified regional farmers. Filter by mandi benchmark rates, organic tag, and distance.',
      icon: <Search className="w-6 h-6 text-[#006D42]" />
    },
    {
      num: '02',
      title: 'Transparent APMC Benchmarking',
      desc: 'Every SKU displays live APMC market rates, allowing you to buy at 20-30% lower prices than supermarkets while paying farmers 35% more.',
      icon: <CheckCircle2 className="w-6 h-6 text-[#006D42]" />
    },
    {
      num: '03',
      title: 'Escrow Protected Checkout',
      desc: 'Pay securely via UPI, Card, or Net Banking. Funds remain locked in neutral escrow until your produce is inspected and delivered.',
      icon: <CreditCard className="w-6 h-6 text-[#006D42]" />
    },
    {
      num: '04',
      title: 'Farm-to-Door GPS Tracking',
      desc: 'Follow the dispatch vehicle in real-time from the farm gate all the way to your doorstep or retail warehouse.',
      icon: <Truck className="w-6 h-6 text-[#006D42]" />
    },
    {
      num: '05',
      title: 'Batch QR Traceability Scan',
      desc: 'Scan the printed QR code on your produce delivery crate to inspect harvest time, soil quality lab test, and farmer credentials.',
      icon: <FileText className="w-6 h-6 text-[#006D42]" />
    },
    {
      num: '06',
      title: 'Confirm & Rate Kisan',
      desc: 'Accept produce delivery and leave feedback for your farmer. Escrow automatically pays the kisan immediately.',
      icon: <ShieldCheck className="w-6 h-6 text-[#006D42]" />
    }
  ];

  const currentSteps = activeTab === 'farmer' ? farmerSteps : buyerSteps;

  return (
    <div className="w-full font-sans py-12 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#006D42] bg-[#E8FFF6] px-3 py-1 rounded-full border border-[#00F098]/30">
            TRANSPARENT 6-STEP WORKFLOW
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tight mt-4 mb-3">
            How MANDI-X Works
          </h1>
          <p className="text-base sm:text-lg text-[#64748B]">
            From harvest at sunrise to delivery with guaranteed escrow protection.
          </p>

          {/* Toggle between Farmer and Buyer flow */}
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm mt-8">
            <button
              onClick={() => setActiveTab('farmer')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'farmer'
                  ? 'bg-[#0F172A] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              🌾 For Farmers (Kisans)
            </button>
            <button
              onClick={() => setActiveTab('buyer')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'buyer'
                  ? 'bg-[#0F172A] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              🛒 For Consumers & Retailers
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentSteps.map(step => (
            <div
              key={step.num}
              className="p-7 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#00C97E] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8FFF6] flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-2xl font-black text-slate-300 tnum">{step.num}</span>
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-2">{step.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action CTA */}
        <div className="text-center pt-8">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-[#00F098] text-[#0F172A] font-extrabold text-sm hover:bg-[#00C97E] hover:text-white transition-all shadow-[0_4px_14px_rgba(0,240,152,0.4)]"
          >
            <span>Start Trading on MANDI-X</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
