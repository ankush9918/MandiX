import { Order } from '../types';

export const initialOrders: Order[] = [
  {
    id: 'ORD-8921',
    buyerId: 'user-consumer-1',
    buyerName: 'Rohit Sharma',
    buyerRole: 'Consumer',
    farmerId: 'user-farmer-1',
    farmerName: 'Ramesh Patil',
    items: [
      {
        productId: 'prod-1',
        productName: 'Fresh Hybrid Tomatoes',
        quantity: 10,
        pricePerUnit: 28,
        unit: 'kg',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'
      },
      {
        productId: 'prod-3',
        productName: 'Pahadi White Potatoes',
        quantity: 15,
        pricePerUnit: 24,
        unit: 'kg',
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80'
      }
    ],
    subtotal: 640,
    deliveryFee: 40,
    total: 680,
    status: 'In Transit',
    paymentMethod: 'UPI',
    paymentStatus: 'Escrow Secured',
    deliveryAddress: 'Flat 402, Green Valley Apartments, New Delhi 110049',
    trackingNumber: 'MX-TRK-9821-DEL',
    carrierName: 'Kisan Express Logistics #4',
    estimatedDelivery: 'Today by 4:00 PM',
    createdAt: '2026-09-10 08:30 IST'
  },
  {
    id: 'ORD-8922',
    buyerId: 'user-retailer-1',
    buyerName: 'Vikas Khanna (Khanna Agro)',
    buyerRole: 'Retailer',
    farmerId: 'user-farmer-1',
    farmerName: 'Ramesh Patil',
    items: [
      {
        productId: 'prod-2',
        productName: 'Sharbati Wheat (Grade-A)',
        quantity: 500,
        pricePerUnit: 32,
        unit: 'kg',
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80'
      }
    ],
    subtotal: 16000,
    deliveryFee: 450,
    total: 16450,
    status: 'Ready for Pickup',
    paymentMethod: 'Net Banking',
    paymentStatus: 'Escrow Secured',
    deliveryAddress: 'Shed 14, Azadpur Wholesale Terminal, Delhi',
    trackingNumber: 'MX-B2B-4412-WHT',
    carrierName: 'AgriFreight Heavy E-Truck',
    estimatedDelivery: 'Tomorrow by 11:00 AM',
    createdAt: '2026-09-09 14:15 IST'
  },
  {
    id: 'ORD-8919',
    buyerId: 'user-consumer-1',
    buyerName: 'Rohit Sharma',
    buyerRole: 'Consumer',
    farmerId: 'user-farmer-3',
    farmerName: 'Ganesh Shinde',
    items: [
      {
        productId: 'prod-4',
        productName: 'Nashik Red Onions',
        quantity: 20,
        pricePerUnit: 26,
        unit: 'kg',
        image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80'
      }
    ],
    subtotal: 520,
    deliveryFee: 30,
    total: 550,
    status: 'Delivered',
    paymentMethod: 'UPI',
    paymentStatus: 'Released to Farmer',
    deliveryAddress: 'Flat 402, Green Valley Apartments, New Delhi 110049',
    trackingNumber: 'MX-TRK-7714-DEL',
    carrierName: 'Delhi Direct Transporter',
    estimatedDelivery: 'Delivered yesterday',
    createdAt: '2026-09-08 10:20 IST'
  },
  {
    id: 'ORD-8925',
    buyerId: 'user-retailer-1',
    buyerName: 'Vikas Khanna (Khanna Agro)',
    buyerRole: 'Retailer',
    farmerId: 'user-farmer-2',
    farmerName: 'Sukhwinder Singh',
    items: [
      {
        productId: 'prod-5',
        productName: 'Basmati 1121 Traditional Rice',
        quantity: 800,
        pricePerUnit: 68,
        unit: 'kg',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80'
      }
    ],
    subtotal: 54400,
    deliveryFee: 1200,
    total: 55600,
    status: 'Confirmed',
    paymentMethod: 'Net Banking',
    paymentStatus: 'Escrow Secured',
    deliveryAddress: 'Shed 14, Azadpur Wholesale Terminal, Delhi',
    trackingNumber: 'MX-B2B-9023-RCE',
    carrierName: 'Punjab Freight Inter-State',
    estimatedDelivery: '12 Sep 2026',
    createdAt: '2026-09-10 11:45 IST'
  }
];
