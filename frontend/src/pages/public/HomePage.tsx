import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMarket } from '../../context/MarketContext';
import { useAuth } from '../../context/AuthContext';
import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  PlusSquare,
  Search,
  Truck,
  MessageCircle,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { marketPrices } = useMarket();
  const { demoLogin } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMandi, setSelectedMandi] = useState('All');
  const [selectedCrop, setSelectedCrop] = useState('All');

  const crops = ['All', 'Wheat', 'Potato', 'Tomato', 'Rice', 'Onion', 'Mustard'];
  const mandis = ['All', 'Khanna Mandi', 'Lasalgaon APMC', 'Azadpur Mandi', 'Karnal Mandi', 'Kanpur Mandi', 'Alwar Mandi'];

  const filteredPrices = marketPrices.filter(item => {
    const matchesSearch =
      item.commodity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.market.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCrop = selectedCrop === 'All' || item.commodity.toLowerCase().includes(selectedCrop.toLowerCase());
    const matchesMandi = selectedMandi === 'All' || item.market === selectedMandi;
    return matchesSearch && matchesCrop && matchesMandi;
  });

  const handleQuickPortal = (role: 'Farmer' | 'Consumer' | 'Retailer') => {
    demoLogin(role);
    navigate(`/${role.toLowerCase()}`);
  };

  return (
    <div className="w-full flex flex-col font-sans">
      {/* ========================================== */}
      {/* 1. HERO SECTION                            */}
      {/* ========================================== */}
      <section className="relative w-full min-h-[640px] lg:min-h-[720px] flex items-center bg-[#0F172A] overflow-hidden">
        {/* Background Image & Ambient Gradients */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/hero-farmer.png"
            alt="Empowered Indian Farmer in lush field"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/90 to-[#0F172A]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-[#0F172A]/30" />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Heading & CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 flex flex-col items-start text-white"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F172A]/90 border border-[#00F098]/40 mb-6 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F098] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F098]" />
                </span>
                <span className="text-[11px] font-bold tracking-widest text-[#00F098] uppercase">
                  ELIMINATING MIDDLEMEN IN AGRITECH
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight text-white leading-tight sm:leading-none mb-5">
                smart farm <br />
                <span className="text-white">trading platform</span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-xl mb-8 leading-relaxed font-medium">
                Empowering farmers, bulk retailers, and everyday consumers with direct trade, AI demand forecasting, and integrated logistics.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 w-full sm:w-auto">
                <Link
                  to="/register"
                  className="h-12 px-7 rounded-full bg-[#00F098] text-[#0F172A] text-sm sm:text-base font-extrabold hover:bg-[#00C97E] hover:text-white transition-all shadow-[0_4px_16px_rgba(0,240,152,0.4)] inline-flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#live-rates"
                  className="h-12 px-7 rounded-full bg-slate-800/90 hover:bg-slate-700 text-white text-sm sm:text-base font-bold border border-white/20 transition-all inline-flex items-center justify-center shadow-md"
                >
                  Explore Market
                </a>
              </div>

              {/* Verified Trust Strip */}
              <div className="flex flex-wrap items-center gap-y-2.5 gap-x-5 text-xs sm:text-sm text-white/90 pt-4 border-t border-white/15 w-full">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <span className="text-[#00F098] font-black">✓</span> Verified Farmers
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <span className="text-[#00F098] font-black">✓</span> 0% Middlemen Commission
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <span className="text-[#00F098] font-black">✓</span> AI Price Prediction
                </span>
              </div>
            </motion.div>

            {/* Right Column: Floating Intelligence & Trust Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 flex flex-col gap-4 sm:max-w-md lg:ml-auto"
            >
              <div className="rounded-2xl bg-white/95 p-5 border border-white shadow-xl flex items-start gap-4 text-[#0F172A]">
                <div className="w-11 h-11 rounded-xl bg-[#E8FFF6] flex items-center justify-center text-[#006D42] shrink-0">
                  <TrendingUp className="w-6 h-6 text-[#00C97E]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
                    Mandi Intelligence
                  </span>
                  <p className="text-sm font-bold leading-snug">
                    Live Market Rates • 18 Mandis Connected • Updated Real-time
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-white/95 p-5 border border-white shadow-xl flex items-start gap-4 text-[#0F172A]">
                <div className="w-11 h-11 rounded-xl bg-[#E8FFF6] flex items-center justify-center text-[#006D42] shrink-0">
                  <ShieldCheck className="w-6 h-6 text-[#00C97E]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
                    Trust & Escrow Settlements
                  </span>
                  <p className="text-sm font-bold leading-snug">
                    Direct From Farmers • 100% Escrow Protection • +35% Kisan Revenue
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 2. QUICK ACTIONS (4 Horizontal Cards)      */}
      {/* ========================================== */}
      <section className="relative z-20 -mt-8 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1: Sell Your Crop */}
          <div
            onClick={() => handleQuickPortal('Farmer')}
            className="group p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#00F098] transition-all cursor-pointer select-none"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-xl bg-[#E8FFF6] text-[#006D42] flex items-center justify-center group-hover:bg-[#00F098] group-hover:text-[#0F172A] transition-colors">
                <PlusSquare className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-[#64748B] group-hover:text-[#006D42] flex items-center gap-0.5">
                Action →
              </span>
            </div>
            <h3 className="text-base font-bold text-[#0F172A] mb-1">Sell Your Crop</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              For kisans: Post produce lot directly at your desired benchmark price.
            </p>
          </div>

          {/* 2: Market Rates */}
          <a
            href="#live-rates"
            className="group p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#00F098] transition-all block select-none"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-xl bg-[#E8FFF6] text-[#006D42] flex items-center justify-center group-hover:bg-[#00F098] group-hover:text-[#0F172A] transition-colors">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-[#64748B] group-hover:text-[#006D42] flex items-center gap-0.5">
                Explore →
              </span>
            </div>
            <h3 className="text-base font-bold text-[#0F172A] mb-1">Market Rates</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Instant APMC spot prices lookup across major trading mandis today.
            </p>
          </a>

          {/* 3: Find Products */}
          <div
            onClick={() => handleQuickPortal('Consumer')}
            className="group p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#00F098] transition-all cursor-pointer select-none"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-xl bg-[#E8FFF6] text-[#006D42] flex items-center justify-center group-hover:bg-[#00F098] group-hover:text-[#0F172A] transition-colors">
                <Search className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-[#64748B] group-hover:text-[#006D42] flex items-center gap-0.5">
                Browse →
              </span>
            </div>
            <h3 className="text-base font-bold text-[#0F172A] mb-1">Find Products</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Browse freshly harvested lots directly available from verified farmers.
            </p>
          </div>

          {/* 4: My Orders */}
          <div
            onClick={() => handleQuickPortal('Consumer')}
            className="group p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#00F098] transition-all cursor-pointer select-none"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-xl bg-[#E8FFF6] text-[#006D42] flex items-center justify-center group-hover:bg-[#00F098] group-hover:text-[#0F172A] transition-colors">
                <Truck className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-[#64748B] group-hover:text-[#006D42] flex items-center gap-0.5">
                Track →
              </span>
            </div>
            <h3 className="text-base font-bold text-[#0F172A] mb-1">My Orders</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Track active purchases, farm-gate dispatches, and escrow release status.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 3. HOW IT WORKS (5-Step Numbered Flow)     */}
      {/* ========================================== */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20" id="how-it-works">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#006D42] bg-[#E8FFF6] px-3 py-1 rounded-full border border-[#00F098]/30">
            SIMPLE 5-STEP TRADE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight mt-3 mb-2">
            How MANDI-X Works
          </h2>
          <p className="text-sm sm:text-base text-[#64748B]">
            From harvest to doorstep delivery in 5 simple transparent steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {[
            {
              step: '1',
              title: 'List Crop',
              desc: 'Farmer lists harvest with photos, quantity, variety & reserve rate.',
              icon: '🌾'
            },
            {
              step: '2',
              title: 'Discover',
              desc: 'Buyers & retailers discover verified crop lots benchmarked to APMC rates.',
              icon: '🔎'
            },
            {
              step: '3',
              title: 'Order & Escrow',
              desc: 'Instant digital escrow booking with transparent price protection.',
              icon: '💳'
            },
            {
              step: '4',
              title: 'Gate Pickup',
              desc: 'Farm-gate verified pickup with scheduled transporter & GPS dispatch.',
              icon: '🚚'
            },
            {
              step: '5',
              title: 'Delivery & Payout',
              desc: 'Direct delivery to doorstep or warehouse with instant bank payout release.',
              icon: '🏦'
            }
          ].map(s => (
            <div
              key={s.step}
              className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col justify-between hover:border-[#00C97E] transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="w-9 h-9 rounded-full bg-[#0F172A] text-[#00F098] font-black text-sm flex items-center justify-center">
                  {s.step}
                </span>
                <span className="text-2xl">{s.icon}</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0F172A] mb-1.5">{s.title}</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================== */}
      {/* 4. WHY MANDI-X (6 Pillars)                 */}
      {/* ========================================== */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-[#E2E8F0]" id="what-is-mandi-x">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight mb-2">
            Why MANDI-X?
          </h2>
          <p className="text-sm sm:text-base text-[#64748B]">
            A simpler, fairer direct agricultural ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              num: '1',
              title: 'Direct Marketplace',
              desc: 'Farmers sell directly to buyers with zero middleman commissions or unfair cartels.'
            },
            {
              num: '2',
              title: 'Transparent Pricing',
              desc: 'Clear, daily benchmarked APMC mandi rates published openly without hidden markups.'
            },
            {
              num: '3',
              title: 'Verified Users',
              desc: 'KYC & land-verified farmers, certified buyers, and registered retailers with GSTIN.'
            },
            {
              num: '4',
              title: 'Secure Payments',
              desc: 'Safe digital escrow releases directly to farmer bank account upon verified produce dispatch.'
            },
            {
              num: '5',
              title: 'Smart Logistics',
              desc: 'Farm-gate pickup scheduling and vehicle tracking assistance right from the field.'
            },
            {
              num: '6',
              title: 'Better Market Access',
              desc: 'Kisans expand reach beyond local physical mandis to commercial buyers across India.'
            }
          ].map(b => (
            <div
              key={b.num}
              className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#00C97E] transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#E8FFF6] flex items-center justify-center text-[#006D42] font-black text-sm mb-4">
                0{b.num}
              </div>
              <h3 className="text-base font-bold text-[#0F172A] mb-1.5">{b.title}</h3>
              <p className="text-sm text-[#64748B] leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================== */}
      {/* 5. WHATSAPP AI SECTION                     */}
      {/* ========================================== */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16" id="whatsapp-ai">
        <div className="w-full rounded-3xl bg-[#E8FFF6] border border-[#E2E8F0] p-6 sm:p-10 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Value Prop */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#00C97E]/30 text-xs font-bold text-[#006D42] mb-4">
                <MessageCircle className="w-4 h-4 text-[#00C97E]" />
                <span>WHATSAPP INTEGRATION</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight mb-2">
                MANDI-X on WhatsApp
              </h2>
              <p className="text-base sm:text-lg text-[#64748B] mb-6">
                Check prices, manage orders and get marketplace help directly on WhatsApp.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-8">
                <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] flex items-start gap-3 shadow-xs">
                  <span className="text-xl">💹</span>
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A]">1. Check Market Price</h4>
                    <p className="text-xs text-[#64748B] mt-0.5">Instant spot rate lookup for any crop & mandi</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] flex items-start gap-3 shadow-xs">
                  <span className="text-xl">🔍</span>
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A]">2. Find Products</h4>
                    <p className="text-xs text-[#64748B] mt-0.5">Browse live active farmer crop lots easily</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] flex items-start gap-3 shadow-xs">
                  <span className="text-xl">📦</span>
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A]">3. Check Order</h4>
                    <p className="text-xs text-[#64748B] mt-0.5">Live status on active dispatches and escrow</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] flex items-start gap-3 shadow-xs">
                  <span className="text-xl">🚚</span>
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A]">4. Pickup Help</h4>
                    <p className="text-xs text-[#64748B] mt-0.5">Transporter allocation & collection support</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] flex items-start gap-3 shadow-xs sm:col-span-2">
                  <span className="text-xl">🌐</span>
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A]">5. Hindi / Regional Languages</h4>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Natural voice & chat support in Hindi, Punjabi, Marathi & 8+ Indian regional languages
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="#whatsapp-ai"
                onClick={(e) => {
                  e.preventDefault();
                  // Open WhatsApp chat drawer directly
                  const btn = document.querySelector('button[title*="WhatsApp"], button:has(.lucide-message-square)');
                  (btn as HTMLButtonElement)?.click();
                }}
                className="h-12 px-7 rounded-full bg-[#006D42] text-white font-bold text-sm hover:bg-[#005231] transition-all flex items-center gap-2.5 shadow-md active:scale-95"
              >
                <MessageCircle className="w-5 h-5 text-[#00F098]" />
                <span>Try WhatsApp AI Interactive Bot</span>
              </a>
            </div>

            {/* Right: Mock Phone Screen */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-3xl bg-white border border-[#E2E8F0] shadow-xl overflow-hidden">
                <div className="bg-[#075E54] text-white p-3.5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs text-[#00F098]">
                    MX
                  </div>
                  <div>
                    <div className="flex items-center gap-1 font-bold text-sm">
                      <span>MANDI-X Assistant</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00F098]" />
                    </div>
                    <span className="text-[11px] text-white/80">Online • 24x7 Direct Mandi Bot</span>
                  </div>
                </div>

                <div className="bg-[#ECE5DD] p-4 flex flex-col gap-3 min-h-[280px]">
                  <div className="self-center bg-white/70 px-2 py-0.5 rounded text-[10px] font-bold text-[#64748B] uppercase">
                    Today
                  </div>
                  <div className="self-end max-w-[85%] bg-[#DCF8C6] text-[#0F172A] p-2.5 rounded-xl rounded-tr-xs shadow-xs text-xs">
                    Khanna Mandi me Sharbati Gehu ka kya rate hai aaj?
                    <div className="text-[9px] text-[#64748B] text-right mt-1">10:42 AM ✓✓</div>
                  </div>
                  <div className="self-start max-w-[85%] bg-white text-[#0F172A] p-2.5 rounded-xl rounded-tl-xs shadow-xs text-xs">
                    🌾 <strong>Aaj ka rate: ₹2,600/Qtl</strong> (Khanna Mandi APMC Spot Rate).
                    <p className="mt-1 text-[#64748B]">
                      MANDI-X par aapki lot direct B2B mill buyers dekh rahe hain.
                    </p>
                    <div className="text-[9px] text-[#64748B] text-right mt-1">10:42 AM</div>
                  </div>
                </div>

                <div className="p-2.5 bg-[#F7F8FA] border-t border-[#E2E8F0] flex items-center justify-between text-xs text-slate-500">
                  <span>Type message in Hindi or English...</span>
                  <span className="w-7 h-7 rounded-full bg-[#075E54] text-white flex items-center justify-center text-xs">
                    🎤
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 6. WHO WE SERVE (3 Personas)               */}
      {/* ========================================== */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#006D42] bg-[#E8FFF6] px-3 py-1 rounded-full border border-[#00F098]/30">
            WHO WE SERVE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight mt-3 mb-2">
            Built for Everyone in the Agriculture Chain
          </h2>
          <p className="text-sm sm:text-base text-[#64748B]">
            Tailored advantages designed for farmers, households, and trade buyers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Persona 1: Farmers */}
          <div className="p-7 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#E8FFF6] flex items-center justify-center text-2xl text-[#006D42] mb-5">
                🌾
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#00C97E] block mb-1">
                FARMERS
              </span>
              <h3 className="text-xl font-black text-[#0F172A] mb-3">Sell Directly</h3>
              <p className="text-sm text-[#64748B] leading-relaxed mb-6">
                Higher profit margins, guaranteed escrow payment upon dispatch, farm-gate pickup, and direct access to nationwide buyers without middlemen cuts.
              </p>
            </div>
            <button
              onClick={() => handleQuickPortal('Farmer')}
              className="w-full py-2.5 rounded-xl bg-[#F7F8FA] hover:bg-[#E8FFF6] text-xs font-bold text-[#006D42] border border-[#E2E8F0] transition-colors"
            >
              Open Farmer Portal →
            </button>
          </div>

          {/* Persona 2: Consumers */}
          <div className="p-7 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#E8FFF6] flex items-center justify-center text-2xl text-[#006D42] mb-5">
                🛒
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#00C97E] block mb-1">
                CONSUMERS
              </span>
              <h3 className="text-xl font-black text-[#0F172A] mb-3">Buy Fresh</h3>
              <p className="text-sm text-[#64748B] leading-relaxed mb-6">
                Sunrise-harvested produce, 100% farm-gate traceability, 20-30% lower prices than supermarkets, and dependable doorstep delivery.
              </p>
            </div>
            <button
              onClick={() => handleQuickPortal('Consumer')}
              className="w-full py-2.5 rounded-xl bg-[#F7F8FA] hover:bg-[#E8FFF6] text-xs font-bold text-[#006D42] border border-[#E2E8F0] transition-colors"
            >
              Open Consumer Portal →
            </button>
          </div>

          {/* Persona 3: Retailers */}
          <div className="p-7 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#E8FFF6] flex items-center justify-center text-2xl text-[#006D42] mb-5">
                🏪
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#00C97E] block mb-1">
                RETAILERS
              </span>
              <h3 className="text-xl font-black text-[#0F172A] mb-3">Buy in Bulk</h3>
              <p className="text-sm text-[#64748B] leading-relaxed mb-6">
                Direct mandi-grade procurement, quality verified lots, standardized tax billing, and reliable scheduled supply chain straight to your warehouse.
              </p>
            </div>
            <button
              onClick={() => handleQuickPortal('Retailer')}
              className="w-full py-2.5 rounded-xl bg-[#F7F8FA] hover:bg-[#E8FFF6] text-xs font-bold text-[#006D42] border border-[#E2E8F0] transition-colors"
            >
              Open Retailer Portal →
            </button>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 7. LIVE MANDI RATES (Search & Filters)     */}
      {/* ========================================== */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20" id="live-rates">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
                Live Mandi Rates
              </h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8FFF6] border border-[#00F098]/30 text-xs font-bold text-[#006D42]">
                <span className="w-2 h-2 rounded-full bg-[#00C97E]" />
                Updated Today
              </span>
            </div>
            <p className="text-sm text-[#64748B]">
              Transparent spot benchmark rates across major APMC trading hubs.
            </p>
          </div>

          {/* Search & Location Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search crop or mandi..."
                className="w-full h-10 pl-9 pr-3 rounded-xl bg-white border border-[#E2E8F0] text-sm text-[#0F172A] placeholder-[#64748B] focus:border-[#0F172A] outline-none"
              />
              <Search className="w-4 h-4 absolute left-3 top-3 text-[#64748B]" />
            </div>

            <select
              value={selectedMandi}
              onChange={e => setSelectedMandi(e.target.value)}
              className="h-10 px-3 rounded-xl bg-white border border-[#E2E8F0] text-sm text-[#0F172A] font-medium outline-none"
            >
              {mandis.map(m => (
                <option key={m} value={m}>
                  {m === 'All' ? 'All Mandis' : m}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Crop Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 text-xs font-bold no-scrollbar">
          {crops.map(c => {
            const active = selectedCrop === c;
            return (
              <button
                key={c}
                onClick={() => setSelectedCrop(c)}
                className={`px-3.5 py-1.5 rounded-full transition-colors ${
                  active
                    ? 'bg-[#0F172A] text-white'
                    : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:border-[#0F172A]'
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Rates Table */}
        <div className="w-full rounded-2xl bg-white border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F7F8FA] border-b border-[#E2E8F0] text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                  <th className="py-3.5 px-5">Crop / Product</th>
                  <th className="py-3.5 px-5">Market / APMC</th>
                  <th className="py-3.5 px-5 text-right">Min Rate</th>
                  <th className="py-3.5 px-5 text-right">Max Rate</th>
                  <th className="py-3.5 px-5 text-right bg-[#E8FFF6]/40 text-[#006D42]">
                    MANDI-X Rate
                  </th>
                  <th className="py-3.5 px-5 text-center">24h Change</th>
                  <th className="py-3.5 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-sm">
                {filteredPrices.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                      No mandi rates found matching your filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredPrices.map(item => (
                    <tr key={item.id} className="hover:bg-[#F7F8FA] transition-colors">
                      <td className="py-4 px-5 font-bold text-[#0F172A]">
                        <div className="flex items-center gap-2.5">
                          <span className="w-8 h-8 rounded-lg bg-[#F7F8FA] flex items-center justify-center text-base">
                            {item.icon}
                          </span>
                          <div>
                            <div>{item.commodity}</div>
                            <span className="text-[11px] text-[#64748B] font-medium">{item.variety}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-[#64748B] font-medium">
                        <div>{item.market}</div>
                        <span className="text-[11px] text-slate-400">{item.state}</span>
                      </td>
                      <td className="py-4 px-5 text-right font-medium text-[#64748B] tnum">
                        ₹{item.minPrice}
                      </td>
                      <td className="py-4 px-5 text-right font-medium text-[#64748B] tnum">
                        ₹{item.maxPrice}
                      </td>
                      <td className="py-4 px-5 text-right bg-[#E8FFF6]/30">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-[#00F098] text-[#0F172A] font-black text-sm tnum">
                          ₹{item.mandiXRate}/Qtl
                        </span>
                      </td>
                      <td className="py-4 px-5 text-center">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${
                            item.change24h >= 0
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {item.change24h >= 0 ? `+${item.change24h}%` : `${item.change24h}%`}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right">
                        <button
                          onClick={() => handleQuickPortal('Farmer')}
                          className="px-3 py-1 rounded-lg border border-[#E2E8F0] hover:bg-[#0F172A] hover:text-white text-xs font-bold transition-all"
                        >
                          Trade
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 8. PLATFORM IMPACT (5 Metric Cards)        */}
      {/* ========================================== */}
      <section className="w-full bg-[#0F172A] py-16 text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00F098] block mb-1">
              PROVEN IMPACT
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Direct Agricultural Scale
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-3xl sm:text-4xl font-black text-[#00F098] block tnum">
                8,420+
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white/80 mt-1 block">
                Farmers Connected
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-3xl sm:text-4xl font-black text-white block tnum">184 Lots</span>
              <span className="text-xs sm:text-sm font-semibold text-white/80 mt-1 block">
                Products Listed
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-3xl sm:text-4xl font-black text-white block tnum">
                12,500+
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white/80 mt-1 block">
                Orders Completed
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-3xl sm:text-4xl font-black text-white block tnum">42 APMCs</span>
              <span className="text-xs sm:text-sm font-semibold text-white/80 mt-1 block">
                Markets Covered
              </span>
            </div>

            <div className="col-span-2 md:col-span-1 p-5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-3xl sm:text-4xl font-black text-[#00F098] block tnum">
                ₹48.9 Cr+
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white/80 mt-1 block">
                Kisan Earnings
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 9. FINAL CALL-TO-ACTION                    */}
      {/* ========================================== */}
      <section className="w-full bg-[#0F172A] border-t border-white/10 py-16 text-center text-white relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
            Ready to Trade Directly?
          </h2>
          <p className="text-base sm:text-lg text-white/80 mb-8">
            A simpler, fairer way to connect farmers, consumers, and retailers across India.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="h-12 px-8 rounded-full bg-[#00F098] text-[#0F172A] text-sm font-extrabold hover:bg-[#00C97E] hover:text-white transition-all shadow-[0_4px_16px_rgba(0,240,152,0.4)] active:scale-95 inline-flex items-center justify-center"
            >
              Get Started Free
            </Link>
            <a
              href="#live-rates"
              className="h-12 px-8 rounded-full bg-slate-800 text-white border border-white/20 hover:bg-slate-700 text-sm font-bold transition-all inline-flex items-center justify-center shadow-md"
            >
              Explore Market
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
