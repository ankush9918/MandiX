import React from 'react';
import { useMarket } from '../../context/MarketContext';
import { Badge } from '../../components/common/Badge';
import { Layers, FileText, Download, Truck } from 'lucide-react';

export const RetailerBulkOrders: React.FC = () => {
  const { orders } = useMarket();
  const bulkOrders = orders.filter(o => o.buyerRole === 'Retailer' || o.total > 5000);

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          Bulk Wholesale Purchase Orders
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Track commercial contracts, truck dispatches, and tax-invoiced mandi consignments
        </p>
      </div>

      <div className="space-y-4">
        {bulkOrders.map(order => (
          <div
            key={order.id}
            className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-xs hover:border-[#00F098] transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-[#0F172A]">{order.id}</span>
                  <Badge variant={order.status === 'Delivered' ? 'success' : 'mint'}>
                    {order.status}
                  </Badge>
                </div>
                <span className="text-xs text-[#64748B]">
                  Supplier: <strong>{order.farmerName}</strong> • Consignment Lot #{order.trackingNumber}
                </span>
              </div>

              <div className="text-right">
                <div className="text-lg font-black text-[#006D42] tnum">₹{order.total.toLocaleString()}</div>
                <span className="text-xs text-slate-500 font-medium">{order.paymentStatus}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0]">
                <span className="text-[#64748B] block">Procured Item:</span>
                <span className="font-bold text-[#0F172A]">{order.items[0]?.productName} ({order.items[0]?.quantity} {order.items[0]?.unit})</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0]">
                <span className="text-[#64748B] block">Freight Carrier:</span>
                <span className="font-bold text-[#0F172A]">{order.carrierName || 'AgriFreight Logistics'}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0]">
                <span className="text-[#64748B] block">Warehouse Destination:</span>
                <span className="font-bold text-[#0F172A] truncate block">{order.deliveryAddress}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const RetailerOrders: React.FC = () => {
  return <RetailerBulkOrders />;
};
