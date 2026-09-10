import React, { createContext, useContext, useState, useEffect } from 'react';
import { Notification } from '../types';

interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  toasts: Toast[];
  addNotification: (notif: Omit<Notification, 'id' | 'read' | 'timestamp'>) => void;
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearToasts: () => void;
}

const initialNotifications: Notification[] = [
  {
    id: 'notif-1',
    title: 'New Order Received',
    message: 'Khanna Agro Superstore placed order ORD-8922 for 500kg Sharbati Wheat.',
    type: 'order',
    read: false,
    timestamp: '15 mins ago'
  },
  {
    id: 'notif-2',
    title: 'Escrow Payment Secured',
    message: '₹16,450 deposited in MANDI-X escrow for order ORD-8922.',
    type: 'payment',
    read: false,
    timestamp: '2 hours ago'
  },
  {
    id: 'notif-3',
    title: 'Pickup Transporter Allocated',
    message: 'Driver Harpreet Singh (UP 78 BT 4421) assigned for tomorrow 07:00 AM.',
    type: 'pickup',
    read: true,
    timestamp: '4 hours ago'
  }
];

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('mandix_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    localStorage.setItem('mandix_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (notif: Omit<Notification, 'id' | 'read' | 'timestamp'>) => {
    const newNotif: Notification = {
      ...notif,
      id: `notif-${Date.now()}`,
      read: false,
      timestamp: 'Just now'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const showToast = (
    title: string,
    message: string,
    type: 'success' | 'info' | 'warning' | 'error' = 'success'
  ) => {
    const newToast: Toast = {
      id: `toast-${Date.now()}-${Math.random()}`,
      title,
      message,
      type
    };
    setToasts(prev => [...prev, newToast]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newToast.id));
    }, 4000);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearToasts = () => setToasts([]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        toasts,
        addNotification,
        showToast,
        markAsRead,
        markAllAsRead,
        clearToasts
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within a NotificationProvider');
  return context;
};
