import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { Role } from '../../types';
import { LogIn, KeyRound, Sparkles, Check, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialRole = (searchParams.get('role') as Role) || 'Farmer';

  const [selectedRole, setSelectedRole] = useState<Role>(initialRole);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('demo123');
  const [loading, setLoading] = useState(false);

  const { login, demoLogin } = useAuth();
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  // Auto-fill demo credentials on role change
  useEffect(() => {
    const creds: Record<Role, string> = {
      Farmer: 'farmer@mandix.demo',
      Consumer: 'consumer@mandix.demo',
      Retailer: 'retailer@mandix.demo',
      Admin: 'admin@mandix.demo'
    };
    setIdentifier(creds[selectedRole]);
    setPassword('demo123');
  }, [selectedRole]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(async () => {
      await login(identifier, password, selectedRole);
      setLoading(false);
      showToast('Login Successful', `Welcome to MANDI-X ${selectedRole} Console!`, 'success');
      navigate(`/${selectedRole.toLowerCase()}`);
    }, 600);
  };

  const handle1ClickDemo = (targetRole: Role) => {
    demoLogin(targetRole);
    showToast('Demo Mode Activated', `Switched session to ${targetRole}.`, 'info');
    navigate(`/${targetRole.toLowerCase()}`);
  };

  const roleConfigs = [
    {
      role: 'Farmer' as const,
      icon: '🌾',
      title: 'Farmer',
      desc: 'Sell crops directly, view live mandi rates & AI demand'
    },
    {
      role: 'Consumer' as const,
      icon: '🛒',
      title: 'Consumer',
      desc: 'Buy sunrise-fresh produce with farm-gate traceability'
    },
    {
      role: 'Retailer' as const,
      icon: '🏪',
      title: 'Retailer',
      desc: 'Procure bulk lots, manage inventory & wholesale orders'
    },
    {
      role: 'Admin' as const,
      icon: '🛡️',
      title: 'Admin',
      desc: 'Marketplace control, logistics telemetry & escrow oversight'
    }
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-xl bg-white border border-[#E2E8F0] shadow-xl rounded-3xl p-6 sm:p-10 space-y-8">
        {/* Header */}
        <div className="text-center space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#006D42] bg-[#E8FFF6] px-3 py-1 rounded-full border border-[#00F098]/30">
            PORTAL ACCESS
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight mt-2">
            Sign In to MANDI-X
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Select your persona to access your dedicated dashboard
          </p>
        </div>

        {/* 1. ROLE SELECTION FIRST (4 Cards) */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">
            Step 1: Choose Your Persona
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {roleConfigs.map(item => {
              const active = selectedRole === item.role;
              return (
                <button
                  type="button"
                  key={item.role}
                  onClick={() => setSelectedRole(item.role)}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 relative ${
                    active
                      ? 'border-[#00F098] bg-[#E8FFF6]/40 shadow-xs ring-2 ring-[#00F098]/30'
                      : 'border-[#E2E8F0] bg-[#F7F8FA] hover:bg-white hover:border-slate-300'
                  }`}
                >
                  {active && (
                    <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#00C97E] text-white flex items-center justify-center text-[10px]">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-xs font-bold text-[#0F172A]">{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. AUTHENTICATION FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
              {selectedRole === 'Farmer'
                ? 'Mobile Number or Kisan ID'
                : selectedRole === 'Retailer'
                ? 'GSTIN or Business Email'
                : 'Email Address / Mobile'}
            </label>
            <input
              type="text"
              required
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A] transition-all"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-[#0F172A]">Password</label>
              <button
                type="button"
                onClick={() => showToast('OTP Demo', 'Demo OTP: 442199', 'info')}
                className="text-xs font-bold text-[#006D42] hover:underline"
              >
                Login via OTP
              </button>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A] transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-full bg-[#00F098] text-[#0F172A] text-sm font-extrabold hover:bg-[#00C97E] hover:text-white transition-all shadow-[0_2px_10px_rgba(0,240,152,0.35)] flex items-center justify-center gap-2 active:scale-95 mt-4"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In as {selectedRole}</span>
                <LogIn className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* 3. 1-CLICK DEMO LOGIN BUTTONS */}
        <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#64748B]">
            <Sparkles className="w-4 h-4 text-[#00C97E]" />
            <span>Hackathon Instant 1-Click Login:</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(['Farmer', 'Consumer', 'Retailer', 'Admin'] as Role[]).map(r => (
              <button
                key={r}
                type="button"
                onClick={() => handle1ClickDemo(r)}
                className="py-2 px-2 text-[11px] font-bold rounded-xl border border-[#E2E8F0] bg-[#F7F8FA] hover:bg-[#0F172A] hover:text-white transition-colors"
              >
                1-Click {r}
              </button>
            ))}
          </div>
        </div>

        {/* Switch to Register */}
        <div className="text-center text-xs text-[#64748B]">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-[#006D42] hover:underline">
            Register as a Farmer, Consumer or Retailer
          </Link>
        </div>
      </div>
    </div>
  );
};
