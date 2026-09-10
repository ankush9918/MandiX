import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Role } from '../../types';
import { Sparkles, ChevronUp, ChevronDown, Check } from 'lucide-react';

export const DemoToolbar: React.FC = () => {
  const { role, switchRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [minimized, setMinimized] = useState(false);

  const roles: { role: Role; label: string; icon: string; path: string }[] = [
    { role: 'Farmer', label: 'Farmer', icon: '🌾', path: '/farmer' },
    { role: 'Consumer', label: 'Consumer', icon: '🛒', path: '/consumer' },
    { role: 'Retailer', label: 'Retailer', icon: '🏪', path: '/retailer' },
    { role: 'Admin', label: 'Admin', icon: '🛡️', path: '/admin' }
  ];

  const handleRoleChange = (targetRole: Role, path: string) => {
    switchRole(targetRole);
    // If currently on a dashboard route, transition to the new role's dashboard
    if (
      location.pathname.startsWith('/farmer') ||
      location.pathname.startsWith('/consumer') ||
      location.pathname.startsWith('/retailer') ||
      location.pathname.startsWith('/admin')
    ) {
      navigate(path);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-[90] select-none font-sans">
      <div className="bg-[#0F172A] text-white rounded-2xl p-2 shadow-2xl border border-white/15 flex flex-col gap-1.5 backdrop-blur-md">
        <div className="flex items-center justify-between gap-3 px-2 py-1 text-[11px] font-bold text-slate-300">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#00F098]" />
            <span className="tracking-wider uppercase text-[10px] text-[#00F098]">Demo Controls</span>
          </div>
          <button
            onClick={() => setMinimized(!minimized)}
            className="hover:text-white text-slate-400"
            title={minimized ? 'Expand' : 'Minimize'}
          >
            {minimized ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {!minimized && (
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-white/10">
            {roles.map(r => {
              const active = role === r.role;
              return (
                <button
                  key={r.role}
                  onClick={() => handleRoleChange(r.role, r.path)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    active
                      ? 'bg-[#00F098] text-[#0F172A] shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span>{r.icon}</span>
                  <span>{r.label}</span>
                  {active && <Check className="w-3 h-3 stroke-[3]" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
