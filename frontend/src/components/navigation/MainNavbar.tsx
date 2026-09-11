import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, User, ChevronDown, Sparkles } from 'lucide-react';

export const MainNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { role, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'What is Mandi-X', path: '/what-is-mandix' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'AI Intelligence', path: '/ai-intelligence' },
    { name: 'Market Prices', path: '/market-prices' }
  ];

  return (
    <header
      className={`sticky top-0 left-0 right-0 w-full z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-sm'
          : 'bg-white border-b border-[#E2E8F0]'
      }`}
    >
      <div className="max-w-[1440px] mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo & Hindi Pill */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden bg-[#0F172A] border border-[#00C97E]/35 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <img
                src="/assets/logo.png"
                alt="MANDI-X Logo"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <span className="font-black text-lg sm:text-xl tracking-tight text-[#0F172A] flex items-center">
              MANDI<span className="text-[#00C97E]">-X</span>
            </span>
          </Link>
          <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#E8FFF6] text-[#006D42] border border-[#00F098]/40 text-xs font-bold">
            मंडी-X
          </span>
        </div>

        {/* Main Navigation Links (NO ROLES HERE) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-[#64748B]">
          {navLinks.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`transition-colors py-1 ${
                  isActive
                    ? 'text-[#0F172A] font-bold border-b-2 border-[#00F098]'
                    : 'hover:text-[#0F172A]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Login, Register, Profile Portal Dropdown */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated && (
            <Link
              to={`/${role.toLowerCase()}`}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E8FFF6] text-[#006D42] text-xs font-extrabold border border-[#00C97E]/30 hover:bg-[#00F098]/30 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-[#00C97E] animate-pulse" />
              <span>Go to {role} Dashboard</span>
            </Link>
          )}

          <Link
            to="/login"
            className="hidden sm:inline-flex items-center justify-center h-10 px-4 rounded-xl border border-[#E2E8F0] bg-white text-sm font-bold text-[#0F172A] hover:bg-[#F7F8FA] transition-colors"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="inline-flex items-center justify-center h-9 sm:h-10 px-3.5 sm:px-5 rounded-full bg-[#00F098] text-[#0F172A] text-xs sm:text-sm font-extrabold hover:bg-[#00C97E] hover:text-white transition-all shadow-[0_2px_8px_rgba(0,240,152,0.35)] active:scale-95"
          >
            Register
          </Link>

          {/* Profile Icon with Role Portal Dropdown */}
          <div className="relative">
            <button
              onClick={() => setPortalDropdownOpen(!portalDropdownOpen)}
              onBlur={() => setTimeout(() => setPortalDropdownOpen(false), 200)}
              aria-label="Portal Menu"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#E2E8F0] bg-[#F7F8FA] hover:bg-white flex items-center justify-center text-[#0F172A] transition-colors"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
            </button>

            {portalDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 p-2 rounded-2xl bg-white border border-[#E2E8F0] shadow-xl transition-all z-50">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                  Select Portal Access
                </div>
                <button
                  onMouseDown={() => navigate('/login?role=Farmer')}
                  className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-[#0F172A] hover:bg-[#F7F8FA] hover:text-[#006D42] transition-colors"
                >
                  <span className="text-base">🌾</span>
                  <span>Farmer Portal</span>
                </button>
                <button
                  onMouseDown={() => navigate('/login?role=Consumer')}
                  className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-[#0F172A] hover:bg-[#F7F8FA] hover:text-[#006D42] transition-colors"
                >
                  <span className="text-base">🛒</span>
                  <span>Consumer Portal</span>
                </button>
                <button
                  onMouseDown={() => navigate('/login?role=Retailer')}
                  className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-[#0F172A] hover:bg-[#F7F8FA] hover:text-[#006D42] transition-colors"
                >
                  <span className="text-base">🏪</span>
                  <span>Retailer Portal</span>
                </button>
                <div className="h-px bg-[#E2E8F0] my-1" />
                <button
                  onMouseDown={() => navigate('/login?role=Admin')}
                  className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#64748B] hover:bg-[#F7F8FA] hover:text-[#0F172A] transition-colors"
                >
                  <span className="text-base">🛡️</span>
                  <span>Admin Control Center</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F7F8FA] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E2E8F0] px-4 py-4 space-y-3 shadow-xl max-h-[calc(100vh-64px)] overflow-y-auto animate-in slide-in-from-top-2 duration-150">
          {isAuthenticated && (
            <Link
              to={`/${role.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-[#E8FFF6] border border-[#00C97E]/30 text-xs font-bold text-[#006D42]"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00C97E] animate-pulse" />
                <span>Go to {role} Dashboard</span>
              </div>
              <span>→</span>
            </Link>
          )}

          <div className="space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-xl text-sm font-bold ${
                  location.pathname === link.path
                    ? 'bg-[#E8FFF6] text-[#006D42] font-black'
                    : 'text-[#0F172A] hover:bg-[#F7F8FA]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="h-px bg-[#E2E8F0] my-2" />

          {/* Quick Persona Portals on Mobile */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] px-2 mb-1.5">
              Quick Portals
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/login?role=Farmer');
                }}
                className="p-2 text-left rounded-xl bg-[#F7F8FA] hover:bg-[#E8FFF6] border border-[#E2E8F0] text-xs font-bold flex items-center gap-1.5"
              >
                <span>🌾</span>
                <span>Farmer</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/login?role=Consumer');
                }}
                className="p-2 text-left rounded-xl bg-[#F7F8FA] hover:bg-[#E8FFF6] border border-[#E2E8F0] text-xs font-bold flex items-center gap-1.5"
              >
                <span>🛒</span>
                <span>Consumer</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/login?role=Retailer');
                }}
                className="p-2 text-left rounded-xl bg-[#F7F8FA] hover:bg-[#E8FFF6] border border-[#E2E8F0] text-xs font-bold flex items-center gap-1.5"
              >
                <span>🏪</span>
                <span>Retailer</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/login?role=Admin');
                }}
                className="p-2 text-left rounded-xl bg-[#F7F8FA] hover:bg-[#E8FFF6] border border-[#E2E8F0] text-xs font-bold flex items-center gap-1.5"
              >
                <span>🛡️</span>
                <span>Admin</span>
              </button>
            </div>
          </div>

          <div className="h-px bg-[#E2E8F0] my-2" />

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center rounded-xl border border-[#E2E8F0] bg-white text-xs font-bold text-[#0F172A] hover:bg-[#F7F8FA]"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center rounded-xl bg-[#00F098] text-[#0F172A] text-xs font-extrabold hover:bg-[#00C97E]"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
