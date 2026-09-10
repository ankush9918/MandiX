import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../layouts/PublicLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';

// Public Pages
import { HomePage } from '../pages/public/HomePage';
import { WhatIsMandiX } from '../pages/public/WhatIsMandiX';
import { HowItWorksPage } from '../pages/public/HowItWorksPage';
import { SolutionsPage } from '../pages/public/SolutionsPage';
import { AIIntelligencePage } from '../pages/public/AIIntelligencePage';
import { MarketPricesPage } from '../pages/public/MarketPricesPage';

// Auth Pages
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';

// Farmer Suite
import { FarmerOverview } from '../pages/farmer/FarmerOverview';
import { FarmerProducts } from '../pages/farmer/FarmerProducts';
import { FarmerAddProduct } from '../pages/farmer/FarmerAddProduct';
import { FarmerOrders } from '../pages/farmer/FarmerOrders';
import { FarmerEarnings } from '../pages/farmer/FarmerEarnings';
import { FarmerMarket } from '../pages/farmer/FarmerMarket';
import { FarmerAIDemand } from '../pages/farmer/FarmerAIDemand';
import { FarmerAIPrice } from '../pages/farmer/FarmerAIPrice';
import { FarmerPickup } from '../pages/farmer/FarmerPickup';
import { FarmerAnalytics } from '../pages/farmer/FarmerAnalytics';
import { FarmerProfile } from '../pages/farmer/FarmerProfile';

// Consumer Suite
import { ConsumerDashboard } from '../pages/consumer/ConsumerDashboard';
import { ConsumerMarket } from '../pages/consumer/ConsumerMarket';
import { ConsumerProductDetail } from '../pages/consumer/ConsumerProductDetail';
import { ConsumerCart } from '../pages/consumer/ConsumerCart';
import { ConsumerCheckout } from '../pages/consumer/ConsumerCheckout';
import { ConsumerOrders } from '../pages/consumer/ConsumerOrders';
import { ConsumerDelivery } from '../pages/consumer/ConsumerDelivery';
import { ConsumerWishlist } from '../pages/consumer/ConsumerWishlist';
import { ConsumerReviews } from '../pages/consumer/ConsumerReviews';
import { ConsumerProfile } from '../pages/consumer/ConsumerProfile';

// Retailer Suite
import { RetailerDashboard } from '../pages/retailer/RetailerDashboard';
import { RetailerBrowse } from '../pages/retailer/RetailerBrowse';
import { RetailerBulkOrders } from '../pages/retailer/RetailerBulkOrders';
import { RetailerOrders } from '../pages/retailer/RetailerOrders';
import { RetailerInventory } from '../pages/retailer/RetailerInventory';
import { RetailerSuppliers } from '../pages/retailer/RetailerSuppliers';
import { RetailerPayments } from '../pages/retailer/RetailerPayments';
import { RetailerAnalytics } from '../pages/retailer/RetailerAnalytics';
import { RetailerProfile } from '../pages/retailer/RetailerProfile';

// Admin Suite
import { AdminOverview } from '../pages/admin/AdminOverview';
import { AdminUsers } from '../pages/admin/AdminUsers';
import { AdminProducts } from '../pages/admin/AdminProducts';
import { AdminOrders } from '../pages/admin/AdminOrders';
import { AdminLogistics } from '../pages/admin/AdminLogistics';
import { AdminPayments } from '../pages/admin/AdminPayments';
import { AdminSupplyDemand } from '../pages/admin/AdminSupplyDemand';
import { AdminAIForecast } from '../pages/admin/AdminAIForecast';
import { AdminPriceMonitoring } from '../pages/admin/AdminPriceMonitoring';
import { AdminComplaints } from '../pages/admin/AdminComplaints';
import { AdminSettings } from '../pages/admin/AdminSettings';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/what-is-mandix" element={<WhatIsMandiX />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/ai-intelligence" element={<AIIntelligencePage />} />
        <Route path="/market-prices" element={<MarketPricesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Farmer Dashboard */}
      <Route path="/farmer" element={<DashboardLayout />}>
        <Route index element={<FarmerOverview />} />
        <Route path="products" element={<FarmerProducts />} />
        <Route path="products/add" element={<FarmerAddProduct />} />
        <Route path="orders" element={<FarmerOrders />} />
        <Route path="earnings" element={<FarmerEarnings />} />
        <Route path="market" element={<FarmerMarket />} />
        <Route path="ai-demand" element={<FarmerAIDemand />} />
        <Route path="ai-price" element={<FarmerAIPrice />} />
        <Route path="pickup" element={<FarmerPickup />} />
        <Route path="analytics" element={<FarmerAnalytics />} />
        <Route path="profile" element={<FarmerProfile />} />
      </Route>

      {/* Consumer Dashboard */}
      <Route path="/consumer" element={<DashboardLayout />}>
        <Route index element={<ConsumerDashboard />} />
        <Route path="market" element={<ConsumerMarket />} />
        <Route path="product/:id" element={<ConsumerProductDetail />} />
        <Route path="cart" element={<ConsumerCart />} />
        <Route path="checkout" element={<ConsumerCheckout />} />
        <Route path="orders" element={<ConsumerOrders />} />
        <Route path="delivery" element={<ConsumerDelivery />} />
        <Route path="wishlist" element={<ConsumerWishlist />} />
        <Route path="reviews" element={<ConsumerReviews />} />
        <Route path="profile" element={<ConsumerProfile />} />
      </Route>

      {/* Retailer Dashboard */}
      <Route path="/retailer" element={<DashboardLayout />}>
        <Route index element={<RetailerDashboard />} />
        <Route path="products" element={<RetailerBrowse />} />
        <Route path="bulk-orders" element={<RetailerBulkOrders />} />
        <Route path="orders" element={<RetailerOrders />} />
        <Route path="inventory" element={<RetailerInventory />} />
        <Route path="suppliers" element={<RetailerSuppliers />} />
        <Route path="payments" element={<RetailerPayments />} />
        <Route path="analytics" element={<RetailerAnalytics />} />
        <Route path="profile" element={<RetailerProfile />} />
      </Route>

      {/* Admin Dashboard */}
      <Route path="/admin" element={<DashboardLayout />}>
        <Route index element={<AdminOverview />} />
        <Route path="farmers" element={<AdminUsers defaultRole="Farmer" />} />
        <Route path="consumers" element={<AdminUsers defaultRole="Consumer" />} />
        <Route path="retailers" element={<AdminUsers defaultRole="Retailer" />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="logistics" element={<AdminLogistics />} />
        <Route path="payments" element={<AdminPayments />} />
        <Route path="supply-demand" element={<AdminSupplyDemand />} />
        <Route path="ai-forecast" element={<AdminAIForecast />} />
        <Route path="prices" element={<AdminPriceMonitoring />} />
        <Route path="analytics" element={<AdminSupplyDemand />} />
        <Route path="complaints" element={<AdminComplaints />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
