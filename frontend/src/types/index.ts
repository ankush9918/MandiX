export type Role = 'Farmer' | 'Consumer' | 'Retailer' | 'Admin';

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: Role;
  avatar?: string;
  location: string;
  // Specific persona fields
  kisanId?: string;
  farmSize?: string;
  crops?: string[];
  deliveryAddress?: string;
  businessName?: string;
  gstin?: string;
  verified: boolean;
  createdAt: string;
}

export type ProductCategory =
  | 'Vegetables'
  | 'Fruits'
  | 'Grains'
  | 'Pulses'
  | 'Oilseeds'
  | 'Dairy'
  | 'Spices'
  | 'Organic';

export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  category: ProductCategory;
  variety: string;
  grade: 'Grade-A' | 'Grade-B' | 'Export Quality' | 'FAQ';
  price: number; // Price in INR per kg or quintal
  unit: 'kg' | 'quintal' | 'crate' | 'ton';
  availableQty: number;
  moq: number; // Minimum Order Quantity
  farmerId: string;
  farmerName: string;
  farmerLocation: string;
  mandi: string;
  image: string;
  description: string;
  status: 'Active' | 'Sold Out' | 'Under Review' | 'Draft';
  harvestDate: string;
  traceability: {
    harvestTimestamp: string;
    fieldLocation: string;
    batchNumber: string;
    coldStoragePassed: boolean;
    qualityCertifiedBy: string;
  };
  rating: number;
  reviewsCount: number;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Ready for Pickup'
  | 'Picked Up'
  | 'In Transit'
  | 'Delivered'
  | 'Completed'
  | 'Cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  pricePerUnit: number;
  unit: string;
  image: string;
}

export interface Order {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerRole: 'Consumer' | 'Retailer';
  farmerId: string;
  farmerName: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  paymentMethod: 'UPI' | 'Card' | 'Net Banking' | 'Cash on Delivery';
  paymentStatus: 'Escrow Secured' | 'Released to Farmer' | 'Refunded' | 'Pending';
  deliveryAddress: string;
  trackingNumber: string;
  carrierName?: string;
  estimatedDelivery: string;
  createdAt: string;
}

export interface MarketPrice {
  id: string;
  commodity: string;
  variety: string;
  market: string;
  state: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  mandiXRate: number;
  change24h: number; // Percentage
  unit: string;
  icon: string;
  updatedAt: string;
}

export interface RetailerInventoryItem {
  id: string;
  productId: string;
  name: string;
  category: ProductCategory;
  currentStock: number;
  minStockThreshold: number;
  unit: string;
  costPrice: number;
  retailPrice: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  supplierName: string;
  lastRestocked: string;
}

export interface PickupRequest {
  id: string;
  farmerId: string;
  farmerName: string;
  cropName: string;
  quantity: number;
  unit: string;
  pickupDate: string;
  timeSlot: string;
  pickupAddress: string;
  driverName?: string;
  driverPhone?: string;
  vehicleNumber?: string;
  status: 'Scheduled' | 'Driver Assigned' | 'En Route' | 'Completed' | 'Cancelled';
}

export interface Notification {
  id: string;
  userId?: string; // If targetted or global
  title: string;
  message: string;
  type: 'order' | 'payment' | 'pickup' | 'price' | 'alert' | 'system';
  read: boolean;
  timestamp: string;
  link?: string;
}

export interface ComplaintTicket {
  id: string;
  userId: string;
  userName: string;
  userRole: Role;
  orderId?: string;
  category: 'Quality Issue' | 'Delayed Pickup' | 'Payment Delay' | 'Account' | 'Other';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  subject: string;
  description: string;
  status: 'Open' | 'Under Investigation' | 'Resolved' | 'Escalated';
  createdAt: string;
}
