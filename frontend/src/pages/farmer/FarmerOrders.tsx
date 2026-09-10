import React, { useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import { useNotifications } from '../../context/NotificationContext';
import { Order, OrderStatus } from '../../types';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Eye, ArrowRight, Truck, CheckCircle2, DollarSign } from 'lucide-react';

export const FarmerOrders: React.FC = () => {
  const { orders, updateOrderStatus } = useMarket();
  const { showToast } = useNotifications();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filteredOrders = orders.filter(o => {
    if (filterStatus === 'All') return true;
    return o.status === filterStatus;
  });

  const nextStatusMap: Record<OrderStatus, OrderStatus | null> = {
    'Pending': 'Confirmed',
    'Confirmed': 'Processing',
    'Processing': 'Ready for Pickup',
    'Ready for Pickup': 'Picked Up',
    'Picked Up': 'In Transit',
    'In Transit': 'Delivered',
    'Delivered': 'Completed',
    'Completed': null,
    'Cancelled': null
  };

  const handleAdvanceStatus = (order: Order) => {
    const next = nextStatusMap[order.status];
    if (next) {
      updateOrderStatus(order.id, next);
      showToast('Order Status Updated', `Order ${order.id} is now ${next}.`, 'success');
      if (selectedOrder && selectedOrder.id === order.id) {
        setSelectedOrder({ ...selectedOrder, status: next });
      }
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
            Incoming Buyer Orders
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Manage orders, update gate dispatch status, and verify escrow payment releases
          </p>
        </div>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="h-10 px-3 rounded-xl bg-white border border-[#E2E8F0] text-xs font-bold text-[#0F172A] outline-none"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Ready for Pickup">Ready for Pickup</option>
          <option value="Picked Up">Picked Up</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-12 text-center text-[#64748B] text-xs">
            No orders found matching this filter.
          </div>
        ) : (
          filteredOrders.map(order => {
            const nextStatus = nextStatusMap[order.status];
            return (
              <div
                key={order.id}
                className="bg-white border border-[#E2E8F0] rounded-3xl p-5 sm:p-6 shadow-xs hover:border-[#00F098] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl shrink-0">
                    🌾
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-[#0F172A]">{order.id}</span>
                      <Badge variant={order.status === 'Delivered' || order.status === 'Completed' ? 'success' : 'mint'}>
                        {order.status}
                      </Badge>
                      <span className="text-[11px] text-[#64748B] font-medium">• {order.createdAt}</span>
                    </div>

                    <div className="text-xs text-[#0F172A] font-semibold mt-1">
                      {order.items.map(i => `${i.productName} (${i.quantity} ${i.unit})`).join(', ')}
                    </div>

                    <div className="text-xs text-[#64748B] mt-0.5">
                      Buyer: <span className="font-bold text-slate-700">{order.buyerName}</span> ({order.buyerRole})
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-[#E2E8F0]">
                  <div className="text-left md:text-right">
                    <div className="text-base font-black text-[#006D42] tnum">
                      ₹{order.total.toLocaleString()}
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium block">
                      {order.paymentStatus}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 rounded-xl border border-[#E2E8F0] hover:bg-[#F7F8FA] text-slate-700 text-xs font-bold"
                      title="Inspect Order"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {nextStatus && (
                      <button
                        onClick={() => handleAdvanceStatus(order)}
                        className="px-3.5 py-2 rounded-xl bg-[#0F172A] hover:bg-[#00C97E] hover:text-[#0F172A] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        <span>Mark {nextStatus}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedOrder(null)}
          title={`Order Details: ${selectedOrder.id}`}
          subtitle="Buyer Escrow Settlement Summary"
        >
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] space-y-2">
              <div className="flex justify-between font-bold">
                <span>Buyer Name:</span>
                <span className="text-[#0F172A]">{selectedOrder.buyerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Destination:</span>
                <span className="text-[#0F172A] text-right font-medium max-w-xs">{selectedOrder.deliveryAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Tracking:</span>
                <span className="font-mono font-bold text-[#006D42]">{selectedOrder.trackingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Transporter Fleet:</span>
                <span className="font-medium text-slate-800">{selectedOrder.carrierName || 'Kisan Express'}</span>
              </div>
            </div>

            <div className="border-t border-[#E2E8F0] pt-3 space-y-2">
              <h4 className="font-bold text-[#0F172A]">Ordered Items</h4>
              {selectedOrder.items.map((it, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs py-1">
                  <span>{it.productName} × {it.quantity} {it.unit}</span>
                  <span className="font-bold tnum">₹{(it.pricePerUnit * it.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between items-center text-sm font-black pt-2 border-t border-[#E2E8F0]">
                <span>Total Escrow Value:</span>
                <span className="text-[#006D42] text-base tnum">₹{selectedOrder.total.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2">
              {nextStatusMap[selectedOrder.status] && (
                <button
                  onClick={() => handleAdvanceStatus(selectedOrder)}
                  className="w-full py-3 rounded-2xl bg-[#00F098] text-[#0F172A] font-extrabold text-sm hover:bg-[#00C97E] hover:text-white transition-all shadow-sm"
                >
                  Advance to {nextStatusMap[selectedOrder.status]}
                </button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
