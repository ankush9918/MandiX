import React, { createContext, useContext, useState, useEffect } from 'react';
import { Role, User } from '../types';
import { mockUsers } from '../data/mockUsers';

interface AuthContextType {
  currentUser: User | null;
  role: Role;
  isAuthenticated: boolean;
  login: (identifier: string, pass: string, role: Role) => Promise<boolean>;
  demoLogin: (targetRole: Role) => void;
  register: (userData: Partial<User>) => Promise<boolean>;
  switchRole: (newRole: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('mandix_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return mockUsers[0];
      }
    }
    // Default to Farmer for immediate hackathon exploration if desired, or null
    return mockUsers[0];
  });

  const [role, setRole] = useState<Role>(() => {
    const saved = localStorage.getItem('mandix_role') as Role;
    return saved || 'Farmer';
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('mandix_user', JSON.stringify(currentUser));
      localStorage.setItem('mandix_role', currentUser.role);
      setRole(currentUser.role);
    } else {
      localStorage.removeItem('mandix_user');
      localStorage.removeItem('mandix_role');
    }
  }, [currentUser]);

  const login = async (identifier: string, _pass: string, selectedRole: Role): Promise<boolean> => {
    // Find matching mock user or construct realistic demo user
    const match = mockUsers.find(
      u => u.role === selectedRole && (u.email.toLowerCase() === identifier.toLowerCase() || u.mobile.includes(identifier))
    );

    const userToSet: User = match || {
      id: `user-${Date.now()}`,
      name: identifier.includes('@') ? identifier.split('@')[0] : 'Demo User',
      email: identifier.includes('@') ? identifier : `${selectedRole.toLowerCase()}@mandix.demo`,
      mobile: identifier.includes('@') ? '+91 98765 00000' : identifier,
      role: selectedRole,
      location: 'Kanpur, Uttar Pradesh',
      verified: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCurrentUser(userToSet);
    setRole(selectedRole);
    return true;
  };

  const demoLogin = (targetRole: Role) => {
    const match = mockUsers.find(u => u.role === targetRole) || mockUsers[0];
    setCurrentUser(match);
    setRole(targetRole);
  };

  const register = async (userData: Partial<User>): Promise<boolean> => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: userData.name || 'New Member',
      email: userData.email || 'user@mandix.in',
      mobile: userData.mobile || '+91 98000 12345',
      role: userData.role || 'Farmer',
      location: userData.location || 'New Delhi, India',
      kisanId: userData.kisanId,
      crops: userData.crops || ['Wheat'],
      deliveryAddress: userData.deliveryAddress,
      businessName: userData.businessName,
      gstin: userData.gstin,
      verified: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCurrentUser(newUser);
    setRole(newUser.role);
    return true;
  };

  const switchRole = (newRole: Role) => {
    const match = mockUsers.find(u => u.role === newRole);
    if (match) {
      setCurrentUser(match);
      setRole(newRole);
    } else {
      setRole(newRole);
      if (currentUser) {
        setCurrentUser({ ...currentUser, role: newRole });
      }
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('mandix_user');
    localStorage.removeItem('mandix_role');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        isAuthenticated: !!currentUser,
        login,
        demoLogin,
        register,
        switchRole,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
