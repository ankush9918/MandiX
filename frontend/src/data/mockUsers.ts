import { User } from '../types';

export const mockUsers: User[] = [
  {
    id: 'user-farmer-1',
    name: 'Ramesh Patil',
    email: 'farmer@mandix.demo',
    mobile: '+91 98765 43210',
    role: 'Farmer',
    location: 'Kanpur, Uttar Pradesh',
    kisanId: 'UP-KPK-4892',
    farmSize: '12.5 Acres',
    crops: ['Wheat', 'Potato', 'Tomato', 'Mustard'],
    verified: true,
    createdAt: '2025-04-12'
  },
  {
    id: 'user-consumer-1',
    name: 'Rohit Sharma',
    email: 'consumer@mandix.demo',
    mobile: '+91 98111 22334',
    role: 'Consumer',
    location: 'South Extension, New Delhi',
    deliveryAddress: 'Flat 402, Green Valley Apartments, New Delhi 110049',
    verified: true,
    createdAt: '2025-06-20'
  },
  {
    id: 'user-retailer-1',
    name: 'Vikas Khanna',
    email: 'retailer@mandix.demo',
    mobile: '+91 99222 33445',
    role: 'Retailer',
    location: 'Azadpur Trading Zone, Delhi',
    businessName: 'Khanna Agro Superstore Pvt Ltd',
    gstin: '07AAACK1234F1Z8',
    verified: true,
    createdAt: '2025-03-08'
  },
  {
    id: 'user-admin-1',
    name: 'Admin Supervisor',
    email: 'admin@mandix.demo',
    mobile: '+91 98000 00001',
    role: 'Admin',
    location: 'MANDI-X HQ, New Delhi',
    verified: true,
    createdAt: '2025-01-01'
  },
  // Additional farmers for directory / admin view
  {
    id: 'user-farmer-2',
    name: 'Sukhwinder Singh',
    email: 'sukhwinder@farmer.in',
    mobile: '+91 97723 11220',
    role: 'Farmer',
    location: 'Khanna, Punjab',
    kisanId: 'PB-KHN-9021',
    farmSize: '24.0 Acres',
    crops: ['Sharbati Wheat', 'Basmati Paddy'],
    verified: true,
    createdAt: '2025-05-18'
  },
  {
    id: 'user-farmer-3',
    name: 'Ganesh Shinde',
    email: 'ganesh.shinde@farmer.in',
    mobile: '+91 94220 88991',
    role: 'Farmer',
    location: 'Nashik, Maharashtra',
    kisanId: 'MH-NSK-3104',
    farmSize: '15.0 Acres',
    crops: ['Nashik Red Onion', 'Grapes'],
    verified: true,
    createdAt: '2025-05-25'
  }
];
