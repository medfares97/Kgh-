
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Activity, Cpu } from 'lucide-react';
import { Logo } from './Logo.tsx';
import { NAV_ITEMS } from '../constants.tsx';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  currentPath: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Trigger scrolled state earlier for better transition
      setScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      observerOptions
    );

    const sectionIds = ['home', 'about', 'services', 'careers', 'faq', 'contact'];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setActiveSection(targetId);
    }
  };

  return (
    <>
      {/* MAIN FULL NAVBAR - Visible only at the top */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-4 py-6 md:px-10 pointer-events-none">
        <motion.div 
          initial={{ y: 0, opacity: 1 }}
          animate={{ 
            y: scrolled ? -150 : 0, 
            opacity: scrolled ? 0 : 1 
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-10 py-4 rounded-[3rem]  pointer-events-auto"
        >
          {/* Branding */}
          <div className="flex items-center gap-6">
            <a 
              href="#home" 
              onClick={(e) => scrollToSection(e, '#home')} 
              className="relative z-10 p-2  transition-all  active:scale-95 group"
            >
              <Logo className="h-20 w-32 ml-[-40px]" />
            </a>
          </div>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center bg-transparent gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`px-4 py-2 text-[10px] font-black tracking-[0.1em] transition-all relative group uppercase rounded-full ${
                    isActive ? 'text-white' : 'text-slate-900/60 hover:text-slate-900'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.span 
                      layoutId="nav-glow" 
                      className="absolute inset-0 bg-violet-600 rounded-full -z-0 shadow-[0_0_20px_rgba(124,58,237,0.5)]" 
                    />
                  )}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4">
              <a 
                href="#contact" 
                onClick={(e) => scrollToSection(e, '#contact')}
                className="px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center gap-3 overflow-hidden group relative bg-slate-950 text-white hover:bg-violet-600 shadow-2xl shadow-slate-900/20"
              >
                <span className="relative z-10">Anfragen</span>
                <Activity size={12} className="relative z-10 group-hover:animate-bounce" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </div>
            {/* Mobile menu trigger button inside full nav */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="lg:hidden p-3 rounded-2xl transition-all duration-300 border bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/20"
            >
              <Menu size={20} />
            </button>
          </div>
        </motion.div>
      </nav>

      {/* COMPACT FLOATING MENU ICON - Appearing on scroll */}
      <div className="fixed top-8 right-6 md:right-10 z-[110] pointer-events-none">
        <AnimatePresence>
          {scrolled && !isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0, rotate: 45 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => setIsOpen(true)}
              className="pointer-events-auto p-5 bg-slate-950 text-white rounded-[2rem] shadow-2xl shadow-slate-900/40 group relative overflow-hidden border border-white/10"
            >
              <div className="relative z-10 flex items-center justify-center">
                <Menu size={20} className="group-hover:rotate-90 transition-transform duration-500" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* MOBILE / COMPACT NAV OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(40px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-[120] bg-slate-950/95 flex flex-col pt-40 px-8 overflow-y-auto no-scrollbar"
          >
            {/* Close Button in Overlay */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-10 right-8 p-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all border border-white/10"
            >
              <X size={24} />
            </button>

            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="flex flex-col gap-6 relative z-10">
              {NAV_ITEMS.map((item, i) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <motion.a 
                    key={i} 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    href={item.href} 
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={`text-2xl md:text-2xl font-black tracking-tighter flex items-center justify-between group py-2 border-b border-white/5 ${isActive ? 'text-violet-500' : 'text-white/40 hover:text-white'}`}
                  >
                    <span className="uppercase tracking-tighter">{item.label}</span>
                    <div className={`p-4 rounded-2xl transition-all ${isActive ? 'bg-violet-600 text-white shadow-xl shadow-violet-600/30' : 'bg-white/5 text-white/20'}`}>
                      <ChevronRight size={28} />
                    </div>
                  </motion.a>
                );
              })}
            </div>
            
            <div className="mt-auto pb-12 pt-12 relative z-10">
              <div className="p-10 bg-white/5 rounded-[3rem] border border-white/10 backdrop-blur-3xl space-y-6">
                <div className="flex flex-col">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-violet-500 mb-2">Service Grid</p>
                  <a href="tel:+4951199887766" className="text-3xl font-black text-white hover:text-violet-500 transition-colors tracking-tight">+49 511 99887766</a>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white/40">
                      <Cpu size={24} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Protocol</span>
                      <span className="text-[11px] font-bold text-white uppercase">v2.5 Stable</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-5 py-2.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};