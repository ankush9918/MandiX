import React, { useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import { useNotifications } from '../../context/NotificationContext';
import { Badge } from '../../components/common/Badge';
import { Check, X, Flag, Trash2, Search } from 'lucide-react';

export const AdminProducts: React.FC = () => {
  const { products, updateProduct, deleteProduct } = useMarket();
  const { showToast } = useNotifications();
  const [search, setSearch] = useState('');

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.farmerName.toLowerCase().includes(search.toLowerCase())
  );

  const handleApprove = (id: string, name: string) => {
    updateProduct(id, { status: 'Active' });
    showToast('Product Approved', `${name} approved for marketplace catalog.`, 'success');
  };

  const handleReject = (id: string, name: string) => {
    updateProduct(id, { status: 'Sold Out' });
    showToast('Product Flagged', `${name} set to under review / paused.`, 'warning');
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Remove listing ${name} from platform?`)) {
      deleteProduct(id);
      showToast('Product Deleted', `${name} removed from database.`, 'info');
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
            Produce Listings Moderation
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Review quality grades, APMC price bounds, and manage active crop lot listings
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search crop or farmer..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#E2E8F0] rounded-xl text-xs sm:text-sm focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-[#F7F8FA] border-b border-[#E2E8F0] text-[11px] font-bold uppercase text-[#64748B]">
                <th className="py-4 px-6">Product / Commodity</th>
                <th className="py-4 px-6">Seller Kisan</th>
                <th className="py-4 px-6 text-right">Unit Rate</th>
                <th className="py-4 px-6 text-right">Available Qty</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-[#F7F8FA] transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <div className="font-bold text-[#0F172A]">{p.name}</div>
                        <span className="text-xs text-[#64748B]">{p.category} • {p.grade}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-xs font-medium text-[#0F172A]">
                    <div>{p.farmerName}</div>
                    <span className="text-slate-400">{p.mandi}</span>
                  </td>
                  <td className="py-4 px-6 text-right font-black text-[#006D42] tnum">
                    ₹{p.price} / {p.unit}
                  </td>
                  <td className="py-4 px-6 text-right font-bold text-slate-800 tnum">
                    {p.availableQty} {p.unit}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Badge variant={p.status === 'Active' ? 'success' : 'neutral'}>
                      {p.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleApprove(p.id, p.name)}
                        className="p-1.5 rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                        title="Approve Listing"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleReject(p.id, p.name)}
                        className="p-1.5 rounded-lg border border-amber-200 text-amber-700 hover:bg-amber-50"
                        title="Flag / Pause"
                      >
                        <Flag className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-1.5 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
