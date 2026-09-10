import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { Role } from '../../types';
import { UserCheck, ArrowRight, Check } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  // Only Farmer, Consumer, Retailer (NO Admin Registration!)
  const [selectedRole, setSelectedRole] = useState<'Farmer' | 'Consumer' | 'Retailer'>('Farmer');
  const [loading, setLoading] = useState(false);

  // Common fields
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Farmer specific
  const [farmSize, setFarmSize] = useState('10 Acres');
  const [crops, setCrops] = useState('Wheat, Potato, Mustard');

  // Consumer specific
  const [deliveryAddress, setDeliveryAddress] = useState('');

  // Retailer specific
  const [businessName, setBusinessName] = useState('');
  const [gstin, setGstin] = useState('');
  const [businessDetails, setBusinessDetails] = useState('');

  const { register } = useAuth();
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast('Password Mismatch', 'Password and confirmation must match.', 'error');
      return;
    }

    setLoading(true);
    setTimeout(async () => {
      await register({
        name: selectedRole === 'Retailer' ? `${businessName} (${fullName})` : fullName,
        email,
        mobile,
        role: selectedRole,
        location,
        farmSize: selectedRole === 'Farmer' ? farmSize : undefined,
        crops: selectedRole === 'Farmer' ? crops.split(',').map(s => s.trim()) : undefined,
        deliveryAddress: selectedRole === 'Consumer' ? deliveryAddress : undefined,
        businessName: selectedRole === 'Retailer' ? businessName : undefined,
        gstin: selectedRole === 'Retailer' ? gstin : undefined
      });

      setLoading(false);
      showToast('Account Created!', `Welcome to MANDI-X as a verified ${selectedRole}.`, 'success');
      navigate(`/${selectedRole.toLowerCase()}`);
    }, 700);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-2xl bg-white border border-[#E2E8F0] shadow-xl rounded-3xl p-6 sm:p-10 space-y-8">
        {/* Header */}
        <div className="text-center space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#006D42] bg-[#E8FFF6] px-3 py-1 rounded-full border border-[#00F098]/30">
            JOIN MANDI-X
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight mt-2">
            Create Your Account
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Zero middleman commissions. Direct farm trade. Guaranteed escrow payments.
          </p>
        </div>

        {/* Step 1: Role Selection (Farmer, Consumer, Retailer) */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">
            Select Your Role
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { role: 'Farmer' as const, icon: '🌾', title: 'Farmer', sub: 'Sell harvests' },
              { role: 'Consumer' as const, icon: '🛒', title: 'Consumer', sub: 'Buy farm fresh' },
              { role: 'Retailer' as const, icon: '🏪', title: 'Retailer', sub: 'Bulk B2B' }
            ].map(r => {
              const active = selectedRole === r.role;
              return (
                <button
                  key={r.role}
                  type="button"
                  onClick={() => setSelectedRole(r.role)}
                  className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 relative ${
                    active
                      ? 'border-[#00F098] bg-[#E8FFF6]/40 shadow-xs ring-2 ring-[#00F098]/30'
                      : 'border-[#E2E8F0] bg-[#F7F8FA] hover:bg-white'
                  }`}
                >
                  {active && (
                    <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#00C97E] text-white flex items-center justify-center text-[10px]">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                  <span className="text-3xl">{r.icon}</span>
                  <span className="text-sm font-bold text-[#0F172A]">{r.title}</span>
                  <span className="text-[10px] text-[#64748B]">{r.sub}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Role-Specific Form */}
        <form onSubmit={handleRegister} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                {selectedRole === 'Retailer' ? 'Owner / Manager Name' : 'Full Name'}
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="w-full h-11 px-4 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Mobile Number</label>
              <input
                type="tel"
                required
                value={mobile}
                onChange={e => setMobile(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full h-11 px-4 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@mandix.in"
                className="w-full h-11 px-4 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Location / City</label>
              <input
                type="text"
                required
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g. Kanpur, Uttar Pradesh"
                className="w-full h-11 px-4 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
              />
            </div>

            {/* FARMER SPECIFIC */}
            {selectedRole === 'Farmer' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Farm Size (Acres)</label>
                  <input
                    type="text"
                    value={farmSize}
                    onChange={e => setFarmSize(e.target.value)}
                    placeholder="e.g. 12 Acres"
                    className="w-full h-11 px-4 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Primary Crops Grown</label>
                  <input
                    type="text"
                    value={crops}
                    onChange={e => setCrops(e.target.value)}
                    placeholder="e.g. Wheat, Tomato, Potato"
                    className="w-full h-11 px-4 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                  />
                </div>
              </>
            )}

            {/* CONSUMER SPECIFIC */}
            {selectedRole === 'Consumer' && (
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Delivery Address</label>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={e => setDeliveryAddress(e.target.value)}
                  placeholder="Flat / House No, Street, Landmark, Pincode"
                  className="w-full h-11 px-4 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                />
              </div>
            )}

            {/* RETAILER SPECIFIC */}
            {selectedRole === 'Retailer' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Business Name</label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    placeholder="e.g. Aggarwal Superstore Pvt Ltd"
                    className="w-full h-11 px-4 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5">GSTIN Number</label>
                  <input
                    type="text"
                    required
                    value={gstin}
                    onChange={e => setGstin(e.target.value)}
                    placeholder="07AAAAA0000A1Z5"
                    className="w-full h-11 px-4 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                  />
                </div>
              </>
            )}

            {/* Passwords */}
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 px-4 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Confirm Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 px-4 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-full bg-[#00F098] text-[#0F172A] text-sm font-extrabold hover:bg-[#00C97E] hover:text-white transition-all shadow-[0_2px_10px_rgba(0,240,152,0.35)] flex items-center justify-center gap-2 active:scale-95 mt-6"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Complete {selectedRole} Registration</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-[#64748B] pt-2 border-t border-[#E2E8F0]">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-[#006D42] hover:underline">
            Login to your account
          </Link>
        </div>
      </div>
    </div>
  );
};
