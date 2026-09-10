import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMarket } from '../../context/MarketContext';
import { useNotifications } from '../../context/NotificationContext';
import { Product } from '../../types';
import { Plus, Edit2, Trash2, Power, CheckCircle, Search, Filter } from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const FarmerProducts: React.FC = () => {
  const { products, deleteProduct, toggleProductStatus, updateProduct } = useMarket();
  const { showToast } = useNotifications();

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(p => {
    const matchCat = filterCategory === 'All' || p.category === filterCategory;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.variety.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      deleteProduct(id);
      showToast('Product Removed', `${name} has been removed from marketplace.`, 'info');
    }
  };

  const handleToggle = (id: string, currentStatus: string) => {
    toggleProductStatus(id);
    showToast('Status Updated', `Lot status changed to ${currentStatus === 'Active' ? 'Sold Out' : 'Active'}.`, 'success');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct.id, editingProduct);
    showToast('Product Updated', `${editingProduct.name} lot details successfully updated.`, 'success');
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
            My Crop Products
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Manage your harvest listings, pricing, and available quantities
          </p>
        </div>
        <Link
          to="/farmer/products/add"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#00F098] text-[#0F172A] text-sm font-extrabold hover:bg-[#00C97E] hover:text-white transition-all shadow-sm self-start sm:self-auto active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3 rounded-2xl border border-[#E2E8F0]">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search crop or variety..."
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] focus:outline-none focus:bg-white"
          />
        </div>
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          className="h-10 px-3 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-xs font-bold text-[#0F172A] outline-none"
        >
          <option value="All">All Categories</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Grains">Grains</option>
          <option value="Fruits">Fruits</option>
          <option value="Oilseeds">Oilseeds</option>
          <option value="Pulses">Pulses</option>
        </select>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map(prod => (
          <div
            key={prod.id}
            className="border border-[#E2E8F0] rounded-2xl p-5 flex flex-col justify-between bg-white hover:border-[#00F098] hover:shadow-md transition-all"
          >
            <div>
              <div className="relative h-40 rounded-xl overflow-hidden mb-3 bg-slate-100">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover"
                />
                <span
                  className={`absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    prod.status === 'Active'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {prod.status}
                </span>
                <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#0F172A]/85 text-white text-[10px] font-bold">
                  {prod.grade}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#0F172A] truncate">{prod.name}</h3>
              <p className="text-xs text-[#64748B] mt-0.5 truncate">📍 {prod.mandi}</p>

              <div className="mt-3 pt-3 border-t border-[#E2E8F0] space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Available:</span>
                  <span className="font-bold text-[#0F172A] tnum">{prod.availableQty} {prod.unit}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[#64748B]">Listing Rate:</span>
                  <span className="text-base font-black text-[#006D42] tnum">₹{prod.price} / {prod.unit}</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>MOQ:</span>
                  <span>{prod.moq} {prod.unit}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-3 gap-1.5 mt-4 pt-3 border-t border-[#E2E8F0]">
              <button
                onClick={() => setEditingProduct(prod)}
                className="py-1.5 px-2 text-[11px] font-bold rounded-lg border border-[#E2E8F0] text-slate-700 hover:bg-[#F7F8FA] flex items-center justify-center gap-1 transition-colors"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleToggle(prod.id, prod.status)}
                className="py-1.5 px-2 text-[11px] font-bold rounded-lg border border-[#E2E8F0] text-slate-700 hover:bg-[#F7F8FA] flex items-center justify-center gap-1 transition-colors"
                title={prod.status === 'Active' ? 'Mark as Sold Out' : 'Mark as Active'}
              >
                <Power className="w-3 h-3" />
                <span>{prod.status === 'Active' ? 'Pause' : 'Live'}</span>
              </button>
              <button
                onClick={() => handleDelete(prod.id, prod.name)}
                className="py-1.5 px-2 text-[11px] font-bold rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 flex items-center justify-center gap-1 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>Del</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <Modal
          isOpen={true}
          onClose={() => setEditingProduct(null)}
          title={`Edit Lot: ${editingProduct.name}`}
          subtitle="Modify Produce Information"
        >
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1">Product Name</label>
              <input
                type="text"
                required
                value={editingProduct.name}
                onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                className="w-full h-10 px-3 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm focus:outline-none focus:bg-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">Price (₹ per {editingProduct.unit})</label>
                <input
                  type="number"
                  required
                  value={editingProduct.price}
                  onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                  className="w-full h-10 px-3 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm focus:outline-none focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1">Available Qty ({editingProduct.unit})</label>
                <input
                  type="number"
                  required
                  value={editingProduct.availableQty}
                  onChange={e => setEditingProduct({ ...editingProduct, availableQty: Number(e.target.value) })}
                  className="w-full h-10 px-3 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm focus:outline-none focus:bg-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1">Mandi / Field Location</label>
              <input
                type="text"
                value={editingProduct.mandi}
                onChange={e => setEditingProduct({ ...editingProduct, mandi: e.target.value })}
                className="w-full h-10 px-3 rounded-xl bg-[#F7F8FA] border border-[#E2E8F0] text-sm focus:outline-none focus:bg-white"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#00F098] text-[#0F172A] font-extrabold text-sm hover:bg-[#00C97E] hover:text-white transition-all shadow-sm"
            >
              Save Changes
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};
