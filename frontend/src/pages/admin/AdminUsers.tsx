import React, { useState } from 'react';
import { mockUsers } from '../../data/mockUsers';
import { useNotifications } from '../../context/NotificationContext';
import { Role, User } from '../../types';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Search, ShieldAlert, CheckCircle2, UserX, Eye } from 'lucide-react';

export const AdminUsers: React.FC<{ defaultRole?: Role }> = ({ defaultRole }) => {
  const { showToast } = useNotifications();
  const [activeTab, setActiveTab] = useState<Role>(defaultRole || 'Farmer');
  const [usersList, setUsersList] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState('');
  const [confirmModal, setConfirmModal] = useState<{ user: User; action: 'suspend' | 'activate' } | null>(null);

  const filtered = usersList.filter(u => {
    const matchRole = u.role === activeTab;
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.location.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  const handleConfirmAction = () => {
    if (!confirmModal) return;
    const { user, action } = confirmModal;

    setUsersList(prev =>
      prev.map(u => (u.id === user.id ? { ...u, verified: action === 'activate' } : u))
    );

    showToast(
      action === 'activate' ? 'User Verified & Activated' : 'User Suspended',
      `${user.name} status updated.`,
      action === 'activate' ? 'success' : 'warning'
    );
    setConfirmModal(null);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
            User Persona Management
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Verify identity credentials, land records, GSTIN legitimacy, and manage access
          </p>
        </div>

        {/* Role Tabs */}
        <div className="inline-flex p-1 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
          {(['Farmer', 'Consumer', 'Retailer'] as Role[]).map(r => (
            <button
              key={r}
              onClick={() => setActiveTab(r)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === r
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              {r}s
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative w-full max-w-md bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={`Search ${activeTab.toLowerCase()} by name, email, location...`}
          className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-2xl focus:outline-none"
        />
      </div>

      {/* User Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-[#F7F8FA] border-b border-[#E2E8F0] text-[11px] font-bold uppercase text-[#64748B]">
                <th className="py-4 px-6">User / Business</th>
                <th className="py-4 px-6">Contact & Location</th>
                <th className="py-4 px-6">Credentials ID</th>
                <th className="py-4 px-6 text-center">Verification Status</th>
                <th className="py-4 px-6 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-[#F7F8FA] transition-colors">
                  <td className="py-4 px-6 font-bold text-[#0F172A]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#00F098] text-[#0F172A] font-black flex items-center justify-center text-xs">
                        {u.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div>{u.name}</div>
                        <span className="text-xs text-slate-400 font-normal">{u.role}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-xs text-[#0F172A]">
                    <div>{u.mobile}</div>
                    <span className="text-slate-400">{u.location}</span>
                  </td>
                  <td className="py-4 px-6 font-mono text-xs font-bold text-[#006D42]">
                    {u.kisanId || u.gstin || 'KYC-AADHAAR'}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Badge variant={u.verified ? 'verified' : 'warning'}>
                      {u.verified ? 'Verified & Active' : 'Pending Review'}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {u.verified ? (
                      <button
                        onClick={() => setConfirmModal({ user: u, action: 'suspend' })}
                        className="px-3 py-1 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors"
                      >
                        Suspend
                      </button>
                    ) : (
                      <button
                        onClick={() => setConfirmModal({ user: u, action: 'activate' })}
                        className="px-3.5 py-1 rounded-xl bg-[#00F098] text-[#0F172A] hover:bg-[#00C97E] text-xs font-bold transition-colors shadow-xs"
                      >
                        Verify & Activate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmModal && (
        <Modal
          isOpen={true}
          onClose={() => setConfirmModal(null)}
          title={confirmModal.action === 'suspend' ? 'Confirm User Suspension' : 'Approve & Activate User'}
          subtitle={`Account: ${confirmModal.user.name}`}
        >
          <div className="space-y-4 text-xs sm:text-sm">
            <p className="text-[#64748B] leading-relaxed">
              Are you sure you want to <strong>{confirmModal.action}</strong> the {confirmModal.user.role} account for{' '}
              <strong>{confirmModal.user.name}</strong> ({confirmModal.user.email})?
            </p>
            <div className="flex justify-end gap-3 pt-4 border-t border-[#E2E8F0]">
              <button
                onClick={() => setConfirmModal(null)}
                className="px-4 py-2 rounded-xl border border-[#E2E8F0] text-xs font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className={`px-5 py-2 rounded-xl text-xs font-extrabold shadow-sm ${
                  confirmModal.action === 'suspend'
                    ? 'bg-rose-600 text-white hover:bg-rose-700'
                    : 'bg-[#00F098] text-[#0F172A] hover:bg-[#00C97E]'
                }`}
              >
                Confirm {confirmModal.action === 'suspend' ? 'Suspension' : 'Activation'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
