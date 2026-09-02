
import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { Services } from './components/Services.tsx';
import { About } from './components/About.tsx';
import { Careers } from './components/Careers.tsx';
import { FAQ } from './components/FAQ.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { BackToTop } from './components/BackToTop.tsx';
import { LegalModals } from './components/LegalModals.tsx';
import { StatusCheck } from './components/StatusCheck.tsx';
import { AdminSpace } from './components/AdminSpace.tsx';
import { WelcomePopup } from './components/WelcomePopup.tsx';
import { AIConsultant } from './components/AIConsultant.tsx';
import { Fingerprint, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function App() {
  const [activeLegalModal, setActiveLegalModal] = useState<'impressum' | 'privacy' | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);

  const handleOpenLegal = (type: 'impressum' | 'privacy') => {
    setActiveLegalModal(type);
  };

  const handleWelcomeFinish = () => {
    const hasSeenTour = localStorage.getItem('kgh_tour_completed');
    if (!hasSeenTour) {
      setTimeout(() => setIsTourOpen(true), 1200);
    }
  };

  const closeTour = () => {
    setIsTourOpen(false);
    localStorage.setItem('kgh_tour_completed', 'true');
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 selection:bg-kgh-blue/20 selection:text-kgh-blue overflow-x-hidden">
      <WelcomePopup onFinish={handleWelcomeFinish} onOpenLegal={handleOpenLegal} />
      <AIConsultant onOpenLegal={handleOpenLegal} />
      
      {/* Global "Flou" (Blurred) Fixed Background System */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Base Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-110 blur-[80px] opacity-40"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200')",
          }}
        />
        
        {/* Dynamic Web3 Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/80 to-violet-50/50 backdrop-blur-3xl" />
        
        {/* Pulsating Organic Blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -right-[10%] w-[80%] h-[80%] bg-violet-400/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, -30, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -left-[10%] w-[70%] h-[70%] bg-emerald-400/10 rounded-full blur-[100px]" 
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-pattern opacity-[0.1] mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 flex flex-col">
        <Navbar currentPath={window.location.pathname} />
        
        <main className="flex-grow">
          <Hero />
          <About />
          <Services />
          <Careers onOpenLegal={handleOpenLegal} />
          <FAQ />
          <Contact onOpenLegal={handleOpenLegal} />
        </main>
        
        <Footer onOpenLegal={handleOpenLegal} onOpenAdmin={() => setIsAdminOpen(true)} />
      </div>

      <LegalModals type={activeLegalModal} onClose={() => setActiveLegalModal(null)} />
      <AdminSpace isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} onOpenLegal={handleOpenLegal} />
      <StatusCheck isOpen={isStatusOpen} onClose={() => setIsStatusOpen(false)} onOpenLegal={handleOpenLegal} />

      {/* FLOATING ACTIONS */}
      <div className="fixed bottom-6 left-6 z-[100] pointer-events-none">
        <motion.button 
          id="status-portal-trigger"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsStatusOpen(true)}
          className="pointer-events-auto p-5 bg-white/80 backdrop-blur-md text-kgh-blue rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-600/5 group border border-white overflow-hidden relative transition-all"
        >
          <Fingerprint size={24} className="relative z-10" />
          <span className="max-w-0 group-hover:max-w-xs group-hover:ml-4 overflow-hidden transition-all duration-500 font-bold text-[12px] relative z-10 whitespace-nowrap">
            Status-Portal
          </span>
          <div className="absolute inset-0 bg-blue-50/50 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </motion.button>
      </div>

      <BackToTop />
    </div>
  );
}
