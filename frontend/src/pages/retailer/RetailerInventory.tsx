import React, { useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import { useNotifications } from '../../context/NotificationContext';
import { Plus, Minus, PlusCircle, Package } from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const RetailerInventory: React.FC = () => {
  const { inventory, adjustInventoryStock, addInventoryItem } = useMarket();
  const { showToast } = useNotifications();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [currentStock, setCurrentStock] = useState('200');
  const [minThreshold, setMinThreshold] = useState('50');
  const [costPrice, setCostPrice] = useState('28');
  const [retailPrice, setRetailPrice] = useState('38');
  const [supplierName, setSupplierName] = useState('Ramesh Patil (Kanpur)');

  const handleAdjust = (id: string, delta: number, itemName: string) => {
    adjustInventoryStock(id, delta);
    showToast('Stock Adjusted', `${itemName} stock updated.`, 'info');
  };

  const handleAddSKU = (e: React.FormEvent) => {
    e.preventDefault();
    addInventoryItem({
      productId: `prod-${Date.now()}`,
      name,
      category: 'Vegetables',
      currentStock: Number(currentStock),
      minStockThreshold: Number(minThreshold),
      unit: 'kg',
      costPrice: Number(costPrice),
      retailPrice: Number(retailPrice),
      supplierName,
      lastRestocked: 'Today'
    });
    showToast('SKU Added', `${name} added to warehouse inventory.`, 'success');
    setAddModalOpen(false);
    setName('');
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
            Warehouse Inventory & Stock
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Automated low-stock alerts, procurement valuation, and stock adjusters
          </p>
        </div>
        <button
          onClick={() => setAddModalOpen(true)}
          className="h-10 px-5 rounded-2xl bg-[#00F098] text-[#0F172A] font-extrabold text-xs hover:bg-[#00C97E] hover:text-white transition-all flex items-center gap-2 shadow-xs active:scale-95 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Warehouse SKU</span>
        </button>
      </div>

      {/* Inventory Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#F7F8FA] border-b border-[#E2E8F0] text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                <th className="py-4 px-6">Product / Commodity</th>
                <th className="py-4 px-6">Primary Supplier</th>
                <th className="py-4 px-6 text-center">Stock Status</th>
                <th className="py-4 px-6 text-right">Available Stock</th>
                <th className="py-4 px-6 text-right">Valuation (₹)</th>
                <th className="py-4 px-6 text-center">Adjust Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {inventory.map(item => {
                const itemValuation = item.currentStock * item.costPrice;
                return (
                  <tr key={item.id} className="hover:bg-[#F7F8FA] transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-[#0F172A]">{item.name}</div>
                      <span className="text-xs text-[#64748B]">Min Threshold: {item.minStockThreshold} {item.unit}</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-[#0F172A] font-medium">
                      {item.supplierName}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-black ${
                          item.status === 'In Stock'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.status === 'Low Stock'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-black text-slate-800 tnum">
                      {item.currentStock} {item.unit}
                    </td>
                    <td className="py-4 px-6 text-right font-black text-[#006D42] tnum">
                      ₹{itemValuation.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="inline-flex items-center gap-1 border border-[#E2E8F0] rounded-xl bg-[#F7F8FA] p-1">
                        <button
                          onClick={() => handleAdjust(item.id, -20, item.name)}
                          className="w-7 h-7 rounded-lg bg-white shadow-xs flex items-center justify-center hover:bg-slate-100 text-slate-700"
                          title="Decrease 20 kg"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#0F172A]">±20</span>
                        <button
                          onClick={() => handleAdjust(item.id, 20, item.name)}
                          className="w-7 h-7 rounded-lg bg-white shadow-xs flex items-center justify-center hover:bg-slate-100 text-slate-700"
                          title="Increase 20 kg"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add SKU Modal */}
      {addModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setAddModalOpen(false)}
          title="Add New Warehouse SKU"
          subtitle="Inventory Catalog Entry"
        >
          <form onSubmit={handleAddSKU} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1">Commodity Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Basmati Rice Extra Long"
                className="w-full h-10 px-3 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm focus:outline-none focus:bg-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">Initial Stock (kg)</label>
                <input
                  type="number"
                  required
                  value={currentStock}
                  onChange={e => setCurrentStock(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm focus:outline-none focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">Minimum Alert Threshold</label>
                <input
                  type="number"
                  required
                  value={minThreshold}
                  onChange={e => setMinThreshold(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm focus:outline-none focus:bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">Cost Price (₹/kg)</label>
                <input
                  type="number"
                  required
                  value={costPrice}
                  onChange={e => setCostPrice(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm focus:outline-none focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">Selling Price (₹/kg)</label>
                <input
                  type="number"
                  required
                  value={retailPrice}
                  onChange={e => setRetailPrice(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm focus:outline-none focus:bg-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1">Farmer Supplier</label>
              <input
                type="text"
                required
                value={supplierName}
                onChange={e => setSupplierName(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm focus:outline-none focus:bg-white"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#00F098] text-[#0F172A] font-extrabold text-sm hover:bg-[#00C97E] hover:text-white transition-all shadow-sm"
            >
              Add to Warehouse System
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};
