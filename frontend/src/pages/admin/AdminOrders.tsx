import React, { useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Eye, Search, Filter } from 'lucide-react';
import { Order } from '../../types';

export const AdminOrders: React.FC = () => {
  const { orders } = useMarket();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = orders.filter(o => {
    const matchRole = roleFilter === 'All' || o.buyerRole === roleFilter;
    const matchStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchRole && matchStatus;
  });

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
            Universal Orders Ledger
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Track all direct consumer and wholesale retailer consignments across India
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="h-10 px-3 rounded-xl bg-white border border-[#E2E8F0] text-xs font-bold outline-none"
          >
            <option value="All">All Buyer Roles</option>
            <option value="Consumer">Consumer Orders</option>
            <option value="Retailer">Retailer Wholesale POs</option>
          </select>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="h-10 px-3 rounded-xl bg-white border border-[#E2E8F0] text-xs font-bold outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Ready for Pickup">Ready for Pickup</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-[#F7F8FA] border-b border-[#E2E8F0] text-[11px] font-bold uppercase text-[#64748B]">
                <th className="py-4 px-6">Order ID</th>
                <th className="py-4 px-6">Buyer & Channel</th>
                <th className="py-4 px-6">Producer Kisan</th>
                <th className="py-4 px-6 text-right">Escrow Amount</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filtered.map(o => (
                <tr key={o.id} className="hover:bg-[#F7F8FA] transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-[#0F172A]">{o.id}</td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-[#0F172A]">{o.buyerName}</div>
                    <span className="text-xs text-[#64748B]">{o.buyerRole}</span>
                  </td>
                  <td className="py-4 px-6 text-xs text-[#0F172A] font-medium">{o.farmerName}</td>
                  <td className="py-4 px-6 text-right font-black text-[#006D42] tnum">
                    ₹{o.total.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Badge variant={o.status === 'Delivered' ? 'success' : 'mint'}>
                      {o.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => setSelectedOrder(o)}
                      className="p-1.5 rounded-lg border border-[#E2E8F0] hover:bg-[#F7F8FA] text-slate-700"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedOrder(null)}
          title={`Audit Consignment: ${selectedOrder.id}`}
          subtitle="Platform Escrow Ledger"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] space-y-1.5">
              <div><strong>Buyer:</strong> {selectedOrder.buyerName} ({selectedOrder.buyerRole})</div>
              <div><strong>Producer:</strong> {selectedOrder.farmerName}</div>
              <div><strong>Destination:</strong> {selectedOrder.deliveryAddress}</div>
              <div><strong>Waybill:</strong> {selectedOrder.trackingNumber}</div>
              <div><strong>Payment Status:</strong> {selectedOrder.paymentStatus} ({selectedOrder.paymentMethod})</div>
            </div>
            <div className="pt-2 flex justify-between font-black text-sm">
              <span>Total Trade Amount:</span>
              <span className="text-[#006D42]">₹{selectedOrder.total.toLocaleString()}</span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
