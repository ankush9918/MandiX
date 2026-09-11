import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { useMarket } from '../context/MarketContext';
import { FloatingWhatsAppAI } from '../components/ai/FloatingWhatsAppAI';
import { ToastContainer } from '../components/common/ToastContainer';
import { Drawer } from '../components/common/Drawer';
import {
  Home,
  Package,
  PlusCircle,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Truck,
  User as UserIcon,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  Store,
  Layers,
  Users,
  ShieldCheck,
  FileText,
  AlertTriangle,
  Cpu,
  Heart,
  Star,
  CheckCircle,
  CreditCard,
  Building,
  Check
} from 'lucide-react';
import { Role } from '../types';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: number;
}

export const DashboardLayout: React.FC = () => {
  const { currentUser, role, logout, switchRole } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const { cart } = useMarket();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Nav configurations for each persona
  const farmerNav: NavItem[] = [
    { label: 'Overview', path: '/farmer', icon: <Home className="w-5 h-5" /> },
    { label: 'My Products', path: '/farmer/products', icon: <Package className="w-5 h-5" /> },
    { label: 'Add Product', path: '/farmer/products/add', icon: <PlusCircle className="w-5 h-5" /> },
    { label: 'My Orders', path: '/farmer/orders', icon: <ShoppingCart className="w-5 h-5" /> },
    { label: 'Earnings', path: '/farmer/earnings', icon: <DollarSign className="w-5 h-5" /> },
    { label: 'Market Prices', path: '/farmer/market', icon: <TrendingUp className="w-5 h-5" /> },
    { label: 'AI Demand', path: '/farmer/ai-demand', icon: <Cpu className="w-5 h-5" /> },
    { label: 'AI Price', path: '/farmer/ai-price', icon: <TrendingUp className="w-5 h-5" /> },
    { label: 'Pickup', path: '/farmer/pickup', icon: <Truck className="w-5 h-5" /> },
    { label: 'Analytics', path: '/farmer/analytics', icon: <Layers className="w-5 h-5" /> },
    { label: 'Profile', path: '/farmer/profile', icon: <UserIcon className="w-5 h-5" /> }
  ];

  const consumerNav: NavItem[] = [
    { label: 'Marketplace', path: '/consumer', icon: <Home className="w-5 h-5" /> },
    { label: 'Browse Products', path: '/consumer/market', icon: <Store className="w-5 h-5" /> },
    { label: 'My Cart', path: '/consumer/cart', icon: <ShoppingCart className="w-5 h-5" />, badge: cart.length },
    { label: 'My Orders', path: '/consumer/orders', icon: <Package className="w-5 h-5" /> },
    { label: 'Live Delivery', path: '/consumer/delivery', icon: <Truck className="w-5 h-5" /> },
    { label: 'Wishlist', path: '/consumer/wishlist', icon: <Heart className="w-5 h-5" /> },
    { label: 'Reviews', path: '/consumer/reviews', icon: <Star className="w-5 h-5" /> },
    { label: 'My Profile', path: '/consumer/profile', icon: <UserIcon className="w-5 h-5" /> }
  ];

  const retailerNav: NavItem[] = [
    { label: 'Dashboard', path: '/retailer', icon: <Home className="w-5 h-5" /> },
    { label: 'B2B Wholesale', path: '/retailer/products', icon: <Store className="w-5 h-5" /> },
    { label: 'Bulk Orders', path: '/retailer/bulk-orders', icon: <Layers className="w-5 h-5" /> },
    { label: 'My Orders', path: '/retailer/orders', icon: <ShoppingCart className="w-5 h-5" /> },
    { label: 'Inventory', path: '/retailer/inventory', icon: <Package className="w-5 h-5" /> },
    { label: 'Suppliers', path: '/retailer/suppliers', icon: <Users className="w-5 h-5" /> },
    { label: 'Payments', path: '/retailer/payments', icon: <CreditCard className="w-5 h-5" /> },
    { label: 'Analytics', path: '/retailer/analytics', icon: <TrendingUp className="w-5 h-5" /> },
    { label: 'Company Profile', path: '/retailer/profile', icon: <Building className="w-5 h-5" /> }
  ];

  const adminNav: NavItem[] = [
    { label: 'Command Overview', path: '/admin', icon: <Home className="w-5 h-5" /> },
    { label: 'Farmers', path: '/admin/farmers', icon: <Users className="w-5 h-5" /> },
    { label: 'Consumers', path: '/admin/consumers', icon: <Users className="w-5 h-5" /> },
    { label: 'Retailers', path: '/admin/retailers', icon: <Building className="w-5 h-5" /> },
    { label: 'Products Moderation', path: '/admin/products', icon: <Package className="w-5 h-5" /> },
    { label: 'Orders Ledger', path: '/admin/orders', icon: <FileText className="w-5 h-5" /> },
    { label: 'Logistics Fleet', path: '/admin/logistics', icon: <Truck className="w-5 h-5" /> },
    { label: 'Escrow Payments', path: '/admin/payments', icon: <CreditCard className="w-5 h-5" /> },
    { label: 'Supply vs Demand', path: '/admin/supply-demand', icon: <TrendingUp className="w-5 h-5" /> },
    { label: 'AI Demand Forecast', path: '/admin/ai-forecast', icon: <Cpu className="w-5 h-5" /> },
    { label: 'Price Monitoring', path: '/admin/prices', icon: <TrendingUp className="w-5 h-5" /> },
    { label: 'Analytics & Reports', path: '/admin/analytics', icon: <Layers className="w-5 h-5" /> },
    { label: 'Complaints / Disputes', path: '/admin/complaints', icon: <AlertTriangle className="w-5 h-5" /> },
    { label: 'System Settings', path: '/admin/settings', icon: <ShieldCheck className="w-5 h-5" /> }
  ];

  // Auto-detect role from path if present
  const section = location.pathname.split('/')[1]?.toLowerCase();
  React.useEffect(() => {
    const roleMap: Record<string, Role> = {
      farmer: 'Farmer',
      consumer: 'Consumer',
      retailer: 'Retailer',
      admin: 'Admin'
    };
    if (section && roleMap[section] && roleMap[section] !== role) {
      switchRole(roleMap[section]);
    }
  }, [section, role, switchRole]);

  let activeNav = farmerNav;
  if (section === 'farmer') activeNav = farmerNav;
  else if (section === 'consumer') activeNav = consumerNav;
  else if (section === 'retailer') activeNav = retailerNav;
  else if (section === 'admin') activeNav = adminNav;
  else if (role === 'Consumer') activeNav = consumerNav;
  else if (role === 'Retailer') activeNav = retailerNav;
  else if (role === 'Admin') activeNav = adminNav;

  const currentDisplayRole = section ? section.charAt(0).toUpperCase() + section.slice(1) : role;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-[#F7F8FA] text-[#0F172A] font-sans antialiased">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-[#E2E8F0] flex-col shrink-0 sticky top-0 h-screen z-30 justify-between select-none">
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand Header */}
          <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl overflow-hidden bg-[#0F172A] border border-[#00C97E]/30 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <img
                  src="/assets/logo.png"
                  alt="MANDI-X Logo"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <span className="font-black text-xl tracking-tight text-[#0F172A] flex items-center">
                MANDI<span className="text-[#00C97E]">-X</span>
              </span>
            </Link>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#E8FFF6] text-[#006D42] border border-[#00F098]/30">
              {currentDisplayRole}
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 text-sm font-medium">
            {activeNav.map(item => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold transition-all ${
                    active
                      ? 'bg-[#E8FFF6] text-[#0F172A] border-l-4 border-[#00C97E] shadow-xs'
                      : 'text-[#64748B] hover:bg-[#F7F8FA] hover:text-[#0F172A]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={active ? 'text-[#006D42]' : 'text-[#64748B]'}>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-black bg-[#00F098] text-[#0F172A]">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#E2E8F0] flex flex-col gap-1 text-xs">
          <Link
            to="/"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[#64748B] hover:bg-[#F7F8FA] hover:text-[#0F172A] font-medium transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Back to Public Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 font-bold transition-colors w-full text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MOBILE DRAWER SIDEBAR */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-72 bg-white h-full flex flex-col justify-between z-10 shadow-2xl animate-in slide-in-from-left duration-200">
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-[#0F172A] border border-[#00C97E]/30 flex items-center justify-center shrink-0">
                    <img
                      src="/assets/logo.png"
                      alt="MANDI-X Logo"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <span className="font-black text-lg text-[#0F172A] flex items-center">
                    MANDI<span className="text-[#00C97E]">-X</span>
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8FFF6] text-[#006D42]">
                    {currentDisplayRole}
                  </span>
                </Link>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="p-3 space-y-1">
                {activeNav.map(item => {
                  const active = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold ${
                        active
                          ? 'bg-[#E8FFF6] text-[#0F172A] border-l-4 border-[#00C97E]'
                          : 'text-[#64748B] hover:bg-[#F7F8FA]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-black bg-[#00F098] text-[#0F172A]">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="p-4 border-t border-[#E2E8F0]">
              <button
                onClick={handleLogout}
                className="w-full py-2.5 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN VIEWPORT */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOPBAR */}
        <header className="bg-white border-b border-[#E2E8F0] h-16 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-[#E2E8F0] hover:bg-[#F7F8FA] text-[#0F172A]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-[#0F172A] tracking-tight">
                {currentDisplayRole} Console
              </h2>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-[#006D42] bg-[#E8FFF6] px-2 py-0.5 rounded-full border border-[#00F098]/40">
                <CheckCircle className="w-3 h-3 text-[#00C97E]" />
                <span>APMC Verified</span>
              </span>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={`Search ${role.toLowerCase()} products, orders, mandi rates...`}
                className="w-full bg-[#F7F8FA] border border-[#E2E8F0] rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0F172A] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Actions on right */}
          <div className="flex items-center gap-3">
            {/* Cart shortcut for Consumer */}
            {role === 'Consumer' && (
              <Link
                to="/consumer/cart"
                className="relative p-2 rounded-xl text-slate-600 hover:bg-[#F7F8FA] hover:text-[#0F172A] transition-colors"
                title="View Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#00F098] text-[#0F172A] rounded-full text-[10px] font-black flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}

            {/* Notification bell */}
            <button
              onClick={() => setNotificationsOpen(true)}
              className="relative p-2 rounded-xl text-slate-600 hover:bg-[#F7F8FA] hover:text-[#0F172A] transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#00F098] rounded-full ring-2 ring-white" />
              )}
            </button>

            <div className="h-6 w-px bg-slate-200 hidden sm:block" />

            {/* User badge */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#00F098] text-[#0F172A] font-extrabold flex items-center justify-center text-xs shadow-xs">
                {currentUser?.name?.slice(0, 2).toUpperCase() || 'MX'}
              </div>
              <div className="hidden sm:flex flex-col leading-tight text-left">
                <span className="text-xs font-bold text-[#0F172A] truncate max-w-[130px]">
                  {currentUser?.name || 'Authorized User'}
                </span>
                <span className="text-[10px] text-[#64748B] font-medium">{role}</span>
              </div>
            </div>
          </div>
        </header>

        {/* BODY CONTENT */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6 min-w-0 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      {/* NOTIFICATIONS DRAWER */}
      <Drawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        title="Notifications"
        subtitle="MANDI-X Live Feed"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
          <span className="text-xs font-bold text-[#64748B]">{unreadCount} unread alerts</span>
          <button
            onClick={markAllAsRead}
            className="text-xs font-bold text-[#006D42] hover:underline"
          >
            Mark all read
          </button>
        </div>
        <div className="space-y-3 mt-4">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">No notifications right now</div>
          ) : (
            notifications.map(n => (
              <div
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  n.read
                    ? 'bg-white border-[#E2E8F0] opacity-80'
                    : 'bg-[#E8FFF6]/40 border-[#00F098]/60 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#0F172A]">{n.title}</span>
                  <span className="text-[10px] text-[#64748B]">{n.timestamp}</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">{n.message}</p>
              </div>
            ))
          )}
        </div>
      </Drawer>

      <FloatingWhatsAppAI />
      <ToastContainer />
    </div>
  );
};
