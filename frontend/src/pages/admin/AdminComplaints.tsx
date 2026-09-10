import React, { useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import { useNotifications } from '../../context/NotificationContext';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { AlertTriangle, CheckCircle2, ArrowUpRight, Eye } from 'lucide-react';
import { ComplaintTicket } from '../../types';

export const AdminComplaints: React.FC = () => {
  const { complaints, updateComplaintStatus } = useMarket();
  const { showToast } = useNotifications();
  const [selectedTicket, setSelectedTicket] = useState<ComplaintTicket | null>(null);

  const handleResolve = (id: string) => {
    updateComplaintStatus(id, 'Resolved');
    showToast('Dispute Resolved', `Ticket ${id} marked as resolved in escrow audit.`, 'success');
    if (selectedTicket) setSelectedTicket({ ...selectedTicket, status: 'Resolved' });
  };

  const handleEscalate = (id: string) => {
    updateComplaintStatus(id, 'Escalated');
    showToast('Ticket Escalated', `Ticket ${id} assigned to APMC senior arbitration officer.`, 'warning');
    if (selectedTicket) setSelectedTicket({ ...selectedTicket, status: 'Escalated' });
  };

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          Grievances & Dispute Resolution Desk
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Resolve produce quality objections, delayed pickups, and escrow arbitration tickets
        </p>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-[#F7F8FA] border-b border-[#E2E8F0] text-[11px] font-bold uppercase text-[#64748B]">
                <th className="py-4 px-6">Ticket ID</th>
                <th className="py-4 px-6">Complainant User</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Priority</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-xs">
              {complaints.map(t => (
                <tr key={t.id} className="hover:bg-[#F7F8FA]">
                  <td className="py-4 px-6 font-mono font-bold text-[#0F172A]">{t.id}</td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-[#0F172A]">{t.userName}</div>
                    <span className="text-[11px] text-slate-400">{t.userRole}</span>
                  </td>
                  <td className="py-4 px-6 text-slate-700 font-medium">{t.category}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        t.priority === 'High' || t.priority === 'Urgent'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {t.priority}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Badge variant={t.status === 'Resolved' ? 'success' : 'warning'}>
                      {t.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => setSelectedTicket(t)}
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

      {selectedTicket && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedTicket(null)}
          title={`Dispute Ticket: ${selectedTicket.id}`}
          subtitle={`${selectedTicket.category} • ${selectedTicket.userName}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#F7F8FA] border border-[#E2E8F0] space-y-2">
              <div><strong>Subject:</strong> {selectedTicket.subject}</div>
              <div><strong>Description:</strong> {selectedTicket.description}</div>
              {selectedTicket.orderId && <div><strong>Linked Order:</strong> {selectedTicket.orderId}</div>}
              <div><strong>Status:</strong> {selectedTicket.status}</div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => handleResolve(selectedTicket.id)}
                className="py-2.5 rounded-xl bg-[#00F098] text-[#0F172A] font-bold text-xs hover:bg-[#00C97E] hover:text-white transition-all"
              >
                Mark as Resolved
              </button>
              <button
                onClick={() => handleEscalate(selectedTicket.id)}
                className="py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-rose-600 transition-all"
              >
                Escalate to Senior Officer
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
