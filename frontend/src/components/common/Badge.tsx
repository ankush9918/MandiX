import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'mint' | 'verified' | 'success' | 'warning' | 'error' | 'neutral' | 'dark';
  size?: 'sm' | 'md';
  pulse?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'mint',
  size = 'sm',
  pulse = false,
  icon,
  className = ''
}) => {
  const baseStyles = 'inline-flex items-center font-bold tracking-wide rounded-full select-none';

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 gap-1',
    md: 'text-xs px-3 py-1 gap-1.5'
  };

  const variantStyles = {
    mint: 'bg-[#E8FFF6] text-[#006D42] border border-[#00F098]/40',
    verified: 'bg-[#E8FFF6] text-[#008753] border border-[#00C97E]/30',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    error: 'bg-rose-50 text-rose-700 border border-rose-200',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
    dark: 'bg-[#0F172A] text-[#00F098] border border-white/10'
  };

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
        </span>
      )}
      {icon}
      <span>{children}</span>
    </span>
  );
};
