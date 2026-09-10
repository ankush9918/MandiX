import React, { useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import { Order } from '../../types';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Truck, CheckCircle2, Clock, Eye, MapPin, PackageCheck } from 'lucide-react';

export const ConsumerOrders: React.FC = () => {
  const { orders } = useMarket();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const consumerOrders = orders.filter(o => o.buyerRole === 'Consumer' || true);

  const timelineSteps = [
    { label: 'Harvest Placed', icon: '🌾' },
    { label: 'Farm Picked Up', icon: '🚚' },
    { label: 'In Cold Transit', icon: '❄️' },
    { label: 'Delivered', icon: '🏡' }
  ];

  const getStepProgress = (status: string) => {
    if (status === 'Pending' || status === 'Confirmed' || status === 'Processing') return 1;
    if (status === 'Ready for Pickup' || status === 'Picked Up') return 2;
    if (status === 'In Transit') return 3;
    if (status === 'Delivered' || status === 'Completed') return 4;
    return 1;
  };

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          My Farm Deliveries
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Real-time GPS tracking and batch delivery verification from local growers
        </p>
      </div>

      <div className="space-y-4">
        {consumerOrders.map(order => {
          const currentStep = getStepProgress(order.status);
          return (
            <div
              key={order.id}
              className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-xs hover:border-[#00F098] transition-all space-y-5"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2E8F0]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-[#0F172A]">{order.id}</span>
                    <Badge variant={order.status === 'Delivered' ? 'success' : 'mint'}>
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Ordered on {order.createdAt} • Producer: <strong className="text-[#0F172A]">{order.farmerName}</strong>
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="text-left sm:text-right">
                    <div className="text-base font-black text-[#006D42] tnum">
                      ₹{order.total.toLocaleString()}
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {order.paymentMethod} • {order.paymentStatus}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="p-2 rounded-xl border border-[#E2E8F0] hover:bg-[#F7F8FA] text-slate-700 text-xs font-bold"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Items Summary */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-700">
                {order.items.map((it, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-[#F7F8FA] px-3 py-1.5 rounded-xl border border-[#E2E8F0]">
                    <span>{it.productName}</span>
                    <span className="font-bold text-[#0F172A] tnum">({it.quantity} {it.unit})</span>
                  </div>
                ))}
              </div>

              {/* Animated Delivery Timeline Bar */}
              <div className="pt-2">
                <div className="grid grid-cols-4 gap-2 relative">
                  {timelineSteps.map((step, idx) => {
                    const stepNum = idx + 1;
                    const isDone = currentStep >= stepNum;
                    return (
                      <div key={step.label} className="flex flex-col items-center text-center space-y-1">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-base transition-all ${
                            isDone
                              ? 'bg-[#00F098] text-[#0F172A] font-black shadow-xs ring-4 ring-[#00F098]/20'
                              : 'bg-slate-100 text-slate-400'
                          }`}
                        >
                          {step.icon}
                        </div>
                        <span className={`text-[10px] font-bold ${isDone ? 'text-[#0F172A]' : 'text-slate-400'}`}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedOrder && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedOrder(null)}
          title={`Delivery Telemetry: ${selectedOrder.id}`}
          subtitle="Farm Gate to Doorstep Route Log"
        >
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] space-y-2">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Carrier Fleet:</span>
                <span className="font-bold text-[#0F172A]">{selectedOrder.carrierName || 'Kisan Direct Delivery'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Waybill ID:</span>
                <span className="font-mono font-bold text-[#006D42]">{selectedOrder.trackingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Destination:</span>
                <span className="font-medium text-[#0F172A] text-right max-w-xs">{selectedOrder.deliveryAddress}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#E8FFF6] border border-[#00F098] text-xs text-[#006D42] space-y-1">
              <span className="font-bold block">🛡️ Escrow Settlement Guarantee</span>
              <p className="text-[11px] leading-relaxed">
                The farmer receives payment from escrow once you confirm delivery and inspect crop freshness.
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
