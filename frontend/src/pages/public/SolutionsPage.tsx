import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

export const SolutionsPage: React.FC = () => {
  const { demoLogin } = useAuth();
  const navigate = useNavigate();

  const handleOpenRole = (role: 'Farmer' | 'Consumer' | 'Retailer') => {
    demoLogin(role);
    navigate(`/${role.toLowerCase()}`);
  };

  const solutions = [
    {
      role: 'Farmer' as const,
      badge: 'PRODUCER NETWORK',
      title: 'Farmer Solution Suite',
      desc: 'Sell crops at your desired benchmark price directly to retail buyers with farm-gate pickup and guaranteed escrow settlement.',
      features: [
        'My Products: Active lot inventory with real-time stock status',
        'Add Product: Instant crop listing with grading and photo upload',
        'Market Prices: Live 18-mandi APMC benchmark rates index',
        'AI Demand: 14-day crop demand forecast and planting suggestions',
        'AI Price: Predictive price recommendation engine',
        'Pickup: Farm-gate transport scheduling and truck assignment',
        'Earnings: Transparent escrow tracking and direct bank transfers'
      ],
      cta: 'Explore Farmer Dashboard',
      accent: 'border-[#00F098]',
      icon: '🌾'
    },
    {
      role: 'Consumer' as const,
      badge: 'HOUSEHOLD COMMERCE',
      title: 'Consumer Marketplace',
      desc: 'Get farm-fresh produce harvested at sunrise, with 100% batch traceability and 20-30% lower prices than supermarkets.',
      features: [
        'Browse Market: Direct access to verified regional farmers',
        'Smart Search: Filter by category, location, and price',
        'Cart & Checkout: 4-step secure checkout with UPI/Card/COD',
        'My Orders: Live dispatch tracking with animated route map',
        'Batch Traceability: QR code breakdown with harvest timestamp',
        'Wishlist: Save your favorite farmer lots for later',
        'Farmer Reviews: Direct feedback and farmer support'
      ],
      cta: 'Explore Consumer Marketplace',
      accent: 'border-[#00C97E]',
      icon: '🛒'
    },
    {
      role: 'Retailer' as const,
      badge: 'B2B PROCUREMENT',
      title: 'Retailer Procurement Hub',
      desc: 'Institutional procurement for grocery stores, supermarkets, and food processors with standardized GST billing and scheduled delivery.',
      features: [
        'B2B Wholesale Catalog: Multi-quintal bulk lots with MOQ tiers',
        'Bulk Orders: Request instant custom quotes & place POs',
        'Inventory Management: Stock tracking with Low Stock alerts',
        'Supplier Directory: Verified direct farmer vendor relationships',
        'Payments & Invoices: Downloadable GST compliant tax invoices',
        'Procurement Analytics: Margin analysis and commodity price trends',
        'Scheduled Fleet Logistics: Dedicated truck delivery to warehouse'
      ],
      cta: 'Explore Retailer Dashboard',
      accent: 'border-slate-800',
      icon: '🏪'
    }
  ];

  return (
    <div className="w-full font-sans py-12 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#006D42] bg-[#E8FFF6] px-3 py-1 rounded-full border border-[#00F098]/30">
            TAILORED ECOSYSTEMS
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tight mt-4 mb-3">
            Solutions Built for Your Role
          </h1>
          <p className="text-base sm:text-lg text-[#64748B]">
            Explore tailored feature sets for farmers, everyday consumers, and institutional B2B retailers.
          </p>
        </div>

        {/* 3 Solutions Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {solutions.map(sol => (
            <div
              key={sol.role}
              className={`rounded-3xl bg-white border ${sol.accent} p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{sol.icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#E8FFF6] text-[#006D42]">
                    {sol.badge}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-[#0F172A] mb-2">{sol.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed mb-6">{sol.desc}</p>

                <div className="space-y-3 pt-4 border-t border-[#E2E8F0] mb-8">
                  {sol.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#0F172A]">
                      <CheckCircle2 className="w-4 h-4 text-[#00C97E] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleOpenRole(sol.role)}
                className="w-full h-11 rounded-xl bg-[#0F172A] text-white hover:bg-[#00F098] hover:text-[#0F172A] text-xs font-bold transition-all flex items-center justify-center gap-2 group shadow-sm active:scale-95"
              >
                <span>{sol.cta}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
