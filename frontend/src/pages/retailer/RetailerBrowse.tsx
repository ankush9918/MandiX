import React, { useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import { useNotifications } from '../../context/NotificationContext';
import { Product } from '../../types';
import { Modal } from '../../components/common/Modal';
import { Search, Store, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

export const RetailerBrowse: React.FC = () => {
  const { products, createOrder } = useMarket();
  const { showToast } = useNotifications();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalMode, setModalMode] = useState<'quote' | 'order'>('order');
  const [orderQuantity, setOrderQuantity] = useState('500');
  const [deliveryNotes, setDeliveryNotes] = useState('Unload at Shed 14, Azadpur Terminal with forklift');
  const [search, setSearch] = useState('');

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.variety.toLowerCase().includes(search.toLowerCase()) ||
    p.farmerName.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAction = (prod: Product, mode: 'quote' | 'order') => {
    setSelectedProduct(prod);
    setModalMode(mode);
    setOrderQuantity(String(Math.max(50, prod.moq * 5)));
  };

  const handleConfirmAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const qty = Number(orderQuantity);
    const subtotal = qty * selectedProduct.price;

    if (modalMode === 'quote') {
      showToast('RFQ Submitted', `Bulk RFQ for ${qty} ${selectedProduct.unit} sent to ${selectedProduct.farmerName}.`, 'success');
    } else {
      createOrder({
        buyerId: 'user-retailer-1',
        buyerName: 'Khanna Agro Superstore Pvt Ltd',
        buyerRole: 'Retailer',
        farmerId: selectedProduct.farmerId,
        farmerName: selectedProduct.farmerName,
        items: [
          {
            productId: selectedProduct.id,
            productName: selectedProduct.name,
            quantity: qty,
            pricePerUnit: selectedProduct.price,
            unit: selectedProduct.unit,
            image: selectedProduct.image
          }
        ],
        subtotal,
        deliveryFee: 450,
        total: subtotal + 450,
        status: 'Ready for Pickup',
        paymentMethod: 'Net Banking',
        paymentStatus: 'Escrow Secured',
        deliveryAddress: 'Shed 14, Azadpur Wholesale Terminal, Delhi',
        carrierName: 'AgriFreight Heavy E-Truck',
        estimatedDelivery: 'Tomorrow by 11:00 AM'
      });
      showToast('Bulk PO Generated!', `PO booked into escrow for ${selectedProduct.name}.`, 'success');
    }

    setSelectedProduct(null);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
            B2B Wholesale Procurement
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Procure multi-quintal lots directly from verified farming clusters with GST billing
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search bulk commodity..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#E2E8F0] rounded-xl text-xs sm:text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Wholesale Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#F7F8FA] border-b border-[#E2E8F0] text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                <th className="py-4 px-6">Produce Lot</th>
                <th className="py-4 px-6">Supplier Kisan</th>
                <th className="py-4 px-6 text-right">Available Qty</th>
                <th className="py-4 px-6 text-right">MOQ</th>
                <th className="py-4 px-6 text-right">Wholesale Rate</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filtered.map(prod => (
                <tr key={prod.id} className="hover:bg-[#F7F8FA] transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-[#0F172A]">{prod.name}</div>
                        <span className="text-xs text-[#64748B]">{prod.variety} • {prod.grade}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-[#0F172A]">{prod.farmerName}</div>
                    <span className="text-xs text-slate-400">{prod.farmerLocation}</span>
                  </td>
                  <td className="py-4 px-6 text-right font-bold text-slate-800 tnum">
                    {prod.availableQty} {prod.unit}
                  </td>
                  <td className="py-4 px-6 text-right font-medium text-slate-500 tnum">
                    {prod.moq} {prod.unit}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="font-black text-[#006D42] text-base tnum">
                      ₹{prod.price}
                    </span>
                    <span className="text-xs text-slate-400"> / {prod.unit}</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenAction(prod, 'quote')}
                        className="px-3 py-1.5 rounded-xl border border-[#E2E8F0] hover:bg-[#F7F8FA] text-xs font-bold text-slate-700 transition-colors"
                      >
                        RFQ Quote
                      </button>
                      <button
                        onClick={() => handleOpenAction(prod, 'order')}
                        className="px-3.5 py-1.5 rounded-xl bg-[#0F172A] hover:bg-[#00F098] hover:text-[#0F172A] text-white text-xs font-bold transition-all shadow-sm"
                      >
                        Place PO
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Modal */}
      {selectedProduct && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedProduct(null)}
          title={modalMode === 'quote' ? `Request Bulk RFQ: ${selectedProduct.name}` : `Book Wholesale PO: ${selectedProduct.name}`}
          subtitle={`Direct Producer: ${selectedProduct.farmerName}`}
        >
          <form onSubmit={handleConfirmAction} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1">
                Order Volume in {selectedProduct.unit} (Min: {selectedProduct.moq} {selectedProduct.unit})
              </label>
              <input
                type="number"
                required
                min={selectedProduct.moq}
                max={selectedProduct.availableQty}
                value={orderQuantity}
                onChange={e => setOrderQuantity(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] font-bold text-sm focus:bg-white focus:outline-none"
              />
            </div>

            <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] space-y-1">
              <div className="flex justify-between">
                <span>Calculated Wholesale Price:</span>
                <span className="font-bold text-[#0F172A] tnum">₹{selectedProduct.price} / {selectedProduct.unit}</span>
              </div>
              <div className="flex justify-between font-black text-sm pt-1 border-t border-[#E2E8F0]">
                <span>Estimated Total Escrow:</span>
                <span className="text-[#006D42] tnum">
                  ₹{(Number(orderQuantity) * selectedProduct.price).toLocaleString()}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1">Warehouse Gate Instructions</label>
              <textarea
                rows={2}
                value={deliveryNotes}
                onChange={e => setDeliveryNotes(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-xs focus:bg-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#00F098] text-[#0F172A] font-extrabold text-sm hover:bg-[#00C97E] hover:text-white transition-all shadow-sm"
            >
              {modalMode === 'quote' ? 'Submit Custom RFQ to Farmer' : 'Authorize Escrow PO Lock'}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};
