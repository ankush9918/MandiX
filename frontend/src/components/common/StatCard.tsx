import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: string | React.ReactNode;
  delta?: {
    value: string;
    isPositive: boolean;
  };
  highlight?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  icon,
  delta,
  highlight = false
}) => {
  return (
    <div
      className={`p-5 sm:p-6 rounded-2xl bg-white border transition-all duration-200 hover:shadow-md ${
        highlight
          ? 'border-[#00F098] ring-2 ring-[#00F098]/20'
          : 'border-[#E2E8F0] hover:border-slate-300'
      }`}
    >
      <div className="flex items-center justify-between text-slate-500 mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">{label}</span>
        <div className="w-10 h-10 rounded-xl bg-[#E8FFF6] flex items-center justify-center text-xl text-[#006D42]">
          {typeof icon === 'string' ? <span>{icon}</span> : icon}
        </div>
      </div>
      <div>
        <div className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight tnum">
          {value}
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          {delta && (
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                delta.isPositive
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-rose-50 text-rose-700'
              }`}
            >
              {delta.isPositive ? '↑' : '↓'} {delta.value}
            </span>
          )}
          {subtext && <p className="text-xs text-[#64748B] font-medium truncate">{subtext}</p>}
        </div>
      </div>
    </div>
  );
};
