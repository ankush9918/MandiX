import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../../context/NotificationContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, clearToasts } = useNotifications();

  return (
    <div className="fixed bottom-20 right-5 z-[150] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => {
          const icons = {
            success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
            info: <Info className="w-5 h-5 text-blue-600 shrink-0" />,
            warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
            error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          };

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className="pointer-events-auto bg-white border border-[#E2E8F0] shadow-xl rounded-2xl p-4 flex items-start gap-3 select-none"
            >
              {icons[toast.type]}
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-[#0F172A] leading-snug">{toast.title}</h4>
                <p className="text-[11px] text-[#64748B] mt-0.5 leading-relaxed">{toast.message}</p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
