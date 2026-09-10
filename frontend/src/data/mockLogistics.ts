import { PickupRequest, RetailerInventoryItem, ComplaintTicket } from '../types';

export const initialPickups: PickupRequest[] = [
  {
    id: 'PCK-101',
    farmerId: 'user-farmer-1',
    farmerName: 'Ramesh Patil',
    cropName: 'Fresh Tomato (Lot 1)',
    quantity: 100,
    unit: 'kg',
    pickupDate: 'Tomorrow, 11 Sep',
    timeSlot: '07:00 AM - 09:00 AM',
    pickupAddress: 'Farm Gate #2, Kanpur Rural Belt',
    driverName: 'Harpreet Singh',
    driverPhone: '+91 98450 12345',
    vehicleNumber: 'UP 78 BT 4421',
    status: 'Scheduled'
  },
  {
    id: 'PCK-102',
    farmerId: 'user-farmer-1',
    farmerName: 'Ramesh Patil',
    cropName: 'Sharbati Wheat (Wholesale Bulk)',
    quantity: 500,
    unit: 'kg',
    pickupDate: '12 Sep 2026',
    timeSlot: '10:00 AM - 12:00 PM',
    pickupAddress: 'Warehouse Sector C, Kanpur Mandi Hub',
    driverName: 'Mukesh Yadav',
    driverPhone: '+91 97120 66789',
    vehicleNumber: 'UP 78 CT 9012',
    status: 'Driver Assigned'
  }
];

export const initialRetailerInventory: RetailerInventoryItem[] = [
  {
    id: 'inv-1',
    productId: 'prod-1',
    name: 'Fresh Hybrid Tomatoes',
    category: 'Vegetables',
    currentStock: 120,
    minStockThreshold: 50,
    unit: 'kg',
    costPrice: 28,
    retailPrice: 38,
    status: 'In Stock',
    supplierName: 'Ramesh Patil (Kanpur)',
    lastRestocked: 'Today'
  },
  {
    id: 'inv-2',
    productId: 'prod-2',
    name: 'Sharbati Wheat (Grade-A)',
    category: 'Grains',
    currentStock: 850,
    minStockThreshold: 200,
    unit: 'kg',
    costPrice: 32,
    retailPrice: 42,
    status: 'In Stock',
    supplierName: 'Ramesh Patil (Kanpur)',
    lastRestocked: 'Yesterday'
  },
  {
    id: 'inv-3',
    productId: 'prod-4',
    name: 'Nashik Red Onions',
    category: 'Vegetables',
    currentStock: 40,
    minStockThreshold: 100,
    unit: 'kg',
    costPrice: 26,
    retailPrice: 35,
    status: 'Low Stock',
    supplierName: 'Ganesh Shinde (Nashik)',
    lastRestocked: '3 days ago'
  },
  {
    id: 'inv-4',
    productId: 'prod-5',
    name: 'Basmati 1121 Paddy',
    category: 'Grains',
    currentStock: 0,
    minStockThreshold: 150,
    unit: 'kg',
    costPrice: 68,
    retailPrice: 85,
    status: 'Out of Stock',
    supplierName: 'Sukhwinder Singh (Khanna)',
    lastRestocked: '1 week ago'
  }
];

export const initialComplaints: ComplaintTicket[] = [
  {
    id: 'DISP-401',
    userId: 'user-retailer-1',
    userName: 'Vikas Khanna',
    userRole: 'Retailer',
    orderId: 'ORD-8919',
    category: 'Delayed Pickup',
    priority: 'Medium',
    subject: 'Transporter reached 3 hours late to Azadpur dock',
    description: 'The dispatch truck was stuck in bypass traffic without GPS telemetry update.',
    status: 'Resolved',
    createdAt: '2026-09-08'
  },
  {
    id: 'DISP-402',
    userId: 'user-consumer-1',
    userName: 'Rohit Sharma',
    userRole: 'Consumer',
    orderId: 'ORD-8921',
    category: 'Quality Issue',
    priority: 'Low',
    subject: 'Packaging crate corner seal was slightly loose',
    description: 'Produce quality inside was Grade-A, but exterior eco-box seal had slight tear.',
    status: 'Open',
    createdAt: '2026-09-10'
  }
];
