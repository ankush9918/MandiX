import React from 'react';
import { Outlet } from 'react-router-dom';
import { MainNavbar } from '../components/navigation/MainNavbar';
import { MainFooter } from '../components/navigation/MainFooter';
import { FloatingWhatsAppAI } from '../components/ai/FloatingWhatsAppAI';
import { DemoToolbar } from '../components/common/DemoToolbar';
import { ToastContainer } from '../components/common/ToastContainer';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FA] text-[#0F172A]">
      <MainNavbar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <MainFooter />
      <FloatingWhatsAppAI />
      <DemoToolbar />
      <ToastContainer />
    </div>
  );
};
