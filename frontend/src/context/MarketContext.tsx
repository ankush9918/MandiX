import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Order,
  OrderStatus,
  MarketPrice,
  RetailerInventoryItem,
  PickupRequest,
  ComplaintTicket
} from '../types';
import { initialProducts } from '../data/mockProducts';
import { initialOrders } from '../data/mockOrders';
import { initialMarketPrices } from '../data/mockMarketPrices';
import { initialPickups, initialRetailerInventory, initialComplaints } from '../data/mockLogistics';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface MarketContextType {
  products: Product[];
  addProduct: (newProduct: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductStatus: (id: string) => void;

  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'trackingNumber' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;

  marketPrices: MarketPrice[];
  updateMarketPrice: (id: string, newRate: number) => void;

  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDeliveryFee: number;
  cartTotal: number;

  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  pickups: PickupRequest[];
  schedulePickup: (pickupData: Omit<PickupRequest, 'id' | 'status'>) => void;
  updatePickupStatus: (id: string, status: PickupRequest['status']) => void;

  inventory: RetailerInventoryItem[];
  adjustInventoryStock: (id: string, delta: number) => void;
  addInventoryItem: (item: Omit<RetailerInventoryItem, 'id' | 'status'>) => void;

  complaints: ComplaintTicket[];
  addComplaint: (ticket: Omit<ComplaintTicket, 'id' | 'status' | 'createdAt'>) => void;
  updateComplaintStatus: (id: string, status: ComplaintTicket['status']) => void;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const MarketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('mandix_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  // 2. Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('mandix_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  // 3. Market Prices
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>(() => {
    const saved = localStorage.getItem('mandix_prices');
    return saved ? JSON.parse(saved) : initialMarketPrices;
  });

  // 4. Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('mandix_cart');
    return saved ? JSON.parse(saved) : [
      { product: initialProducts[0], quantity: 5 },
      { product: initialProducts[2], quantity: 10 }
    ];
  });

  // 5. Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('mandix_wishlist');
    return saved ? JSON.parse(saved) : ['prod-1', 'prod-4'];
  });

  // 6. Pickups
  const [pickups, setPickups] = useState<PickupRequest[]>(() => {
    const saved = localStorage.getItem('mandix_pickups');
    return saved ? JSON.parse(saved) : initialPickups;
  });

  // 7. Inventory
  const [inventory, setInventory] = useState<RetailerInventoryItem[]>(() => {
    const saved = localStorage.getItem('mandix_inventory');
    return saved ? JSON.parse(saved) : initialRetailerInventory;
  });

  // 8. Complaints
  const [complaints, setComplaints] = useState<ComplaintTicket[]>(() => {
    const saved = localStorage.getItem('mandix_complaints');
    return saved ? JSON.parse(saved) : initialComplaints;
  });

  // Persist whenever states change
  useEffect(() => {
    localStorage.setItem('mandix_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('mandix_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('mandix_prices', JSON.stringify(marketPrices));
  }, [marketPrices]);

  useEffect(() => {
    localStorage.setItem('mandix_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('mandix_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('mandix_pickups', JSON.stringify(pickups));
  }, [pickups]);

  useEffect(() => {
    localStorage.setItem('mandix_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('mandix_complaints', JSON.stringify(complaints));
  }, [complaints]);

  // Product CRUD
  const addProduct = (newProductData: Omit<Product, 'id'>) => {
    const newProd: Product = {
      ...newProductData,
      id: `prod-${Date.now()}`
    };
    setProducts(prev => [newProd, ...prev]);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const toggleProductStatus = (id: string) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          const nextStatus = p.status === 'Active' ? 'Sold Out' : 'Active';
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  // Order Management
  const createOrder = (orderData: Omit<Order, 'id' | 'trackingNumber' | 'createdAt'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      trackingNumber: `MX-TRK-${Math.floor(1000 + Math.random() * 9000)}-DEL`,
      createdAt: 'Just now'
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId) {
          const isDelivered = newStatus === 'Delivered' || newStatus === 'Completed';
          return {
            ...o,
            status: newStatus,
            paymentStatus: isDelivered ? 'Released to Farmer' : o.paymentStatus
          };
        }
        return o;
      })
    );
  };

  // Market Prices
  const updateMarketPrice = (id: string, newRate: number) => {
    setMarketPrices(prev =>
      prev.map(mp => (mp.id === id ? { ...mp, mandiXRate: newRate, updatedAt: 'Just now' } : mp))
    );
  };

  // Cart Management
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartDeliveryFee = cart.length > 0 ? (cartSubtotal > 500 ? 0 : 40) : 0;
  const cartTotal = cartSubtotal + cartDeliveryFee;

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Pickups
  const schedulePickup = (pickupData: Omit<PickupRequest, 'id' | 'status'>) => {
    const newPickup: PickupRequest = {
      ...pickupData,
      id: `PCK-${Math.floor(100 + Math.random() * 900)}`,
      status: 'Scheduled',
      driverName: 'Harpreet Logistics Team',
      vehicleNumber: 'UP 78 BT 8821'
    };
    setPickups(prev => [newPickup, ...prev]);
  };

  const updatePickupStatus = (id: string, status: PickupRequest['status']) => {
    setPickups(prev => prev.map(p => (p.id === id ? { ...p, status } : p)));
  };

  // Inventory Management
  const adjustInventoryStock = (id: string, delta: number) => {
    setInventory(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(0, item.currentStock + delta);
          let status: 'In Stock' | 'Low Stock' | 'Out of Stock' = 'In Stock';
          if (newQty === 0) status = 'Out of Stock';
          else if (newQty < item.minStockThreshold) status = 'Low Stock';
          return { ...item, currentStock: newQty, status };
        }
        return item;
      })
    );
  };

  const addInventoryItem = (itemData: Omit<RetailerInventoryItem, 'id' | 'status'>) => {
    let status: 'In Stock' | 'Low Stock' | 'Out of Stock' = 'In Stock';
    if (itemData.currentStock === 0) status = 'Out of Stock';
    else if (itemData.currentStock < itemData.minStockThreshold) status = 'Low Stock';

    const newItem: RetailerInventoryItem = {
      ...itemData,
      id: `inv-${Date.now()}`,
      status
    };
    setInventory(prev => [newItem, ...prev]);
  };

  // Complaints
  const addComplaint = (ticketData: Omit<ComplaintTicket, 'id' | 'status' | 'createdAt'>) => {
    const newTicket: ComplaintTicket = {
      ...ticketData,
      id: `DISP-${Math.floor(100 + Math.random() * 900)}`,
      status: 'Open',
      createdAt: 'Today'
    };
    setComplaints(prev => [newTicket, ...prev]);
  };

  const updateComplaintStatus = (id: string, status: ComplaintTicket['status']) => {
    setComplaints(prev => prev.map(c => (c.id === id ? { ...c, status } : c)));
  };

  return (
    <MarketContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStatus,
        orders,
        createOrder,
        updateOrderStatus,
        marketPrices,
        updateMarketPrice,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartDeliveryFee,
        cartTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        pickups,
        schedulePickup,
        updatePickupStatus,
        inventory,
        adjustInventoryStock,
        addInventoryItem,
        complaints,
        addComplaint,
        updateComplaintStatus
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const context = useContext(MarketContext);
  if (!context) throw new Error('useMarket must be used within a MarketProvider');
  return context;
};
