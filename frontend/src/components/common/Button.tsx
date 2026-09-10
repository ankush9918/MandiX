import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'neon' | 'dark' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'neon',
  size = 'md',
  loading = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-bold transition-all active:scale-95 select-none rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1';

  const sizeStyles = {
    sm: 'h-8 px-3 text-xs gap-1.5',
    md: 'h-10 px-4 text-sm gap-2',
    lg: 'h-12 px-6 text-base gap-2.5 rounded-full'
  };

  const variantStyles = {
    neon: 'bg-[#00F098] text-[#0F172A] hover:bg-[#00C97E] hover:text-white shadow-[0_2px_10px_rgba(0,240,152,0.35)] focus:ring-[#00F098]',
    dark: 'bg-[#0F172A] text-white hover:bg-slate-800 shadow-sm focus:ring-[#0F172A]',
    ghost: 'bg-[#F7F8FA] text-[#0F172A] hover:bg-slate-200 border border-[#E2E8F0] focus:ring-slate-300',
    outline: 'bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F7F8FA] hover:border-[#0F172A] focus:ring-[#0F172A]',
    danger: 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 focus:ring-rose-500'
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        disabled || loading ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''
      } ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        icon
      )}
      <span>{children}</span>
    </button>
  );
};
