
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { Sparkles, ArrowRight, Heart, ShieldCheck } from 'lucide-react';

interface WelcomePopupProps {
  onFinish?: () => void;
  onOpenLegal: (type: 'impressum' | 'privacy') => void;
}

export const WelcomePopup: React.FC<WelcomePopupProps> = ({ onFinish, onOpenLegal }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const hasSeenWelcome = sessionStorage.getItem('kgh_welcome_seen');
      if (!hasSeenWelcome) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 800);
        return () => clearTimeout(timer);
      }
    } catch (e) {}
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem('kgh_welcome_seen', 'true');
    } catch (e) {}
    if (onFinish) onFinish();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleClose} className="absolute inset-0 bg-slate-950/80 backdrop-blur-2xl" />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white dark:bg-slate-900 w-full max-w-sm overflow-hidden rounded-[2.5rem] shadow-2xl z-20 border border-slate-200 dark:border-slate-800">
            <div className="p-10 text-center space-y-8 relative z-10">
              <div className="flex flex-col items-center">
                <div className="p-4  rounded-3xl">
                  <Logo className="h-32 w-32" />
                </div>
                <h4 className="text-violet-600 dark:text-violet-400 font-black uppercase tracking-[0.6em] text-[9px]">KGH Gebäudereinigung</h4>
              </div>
              <div className="flex items-center justify-center gap-2 text-[8px] font-black text-slate-400 uppercase tracking-widest">
                  <ShieldCheck size={10} className="text-green-500" /> Premium Service Hannover
                </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-heading font-black text-slate-900 dark:text-white leading-tight tracking-tight uppercase"><span className="gradient-text">Willkommen bei KGH!.</span></h2>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-[240px] mx-auto uppercase tracking-wide">Präzise, zuverlässig und kompetent  Ihr Partner für professionelle Gebäudereinigung in Hannover.</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 font-black text-[10px] uppercase tracking-[0.3em]">
                    {/* <Heart size={14} fill="currentColor" /> */}
                    <span>Sauberkeit ist sichtbar <br/> Qualität ist Spürbar.</span>
                  </div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleClose} className="w-full py-5 bg-violet-600 text-white rounded-xl font-black uppercase text-[10px] tracking-[0.4em] shadow-xl hover:bg-slate-950 transition-all flex items-center justify-center gap-3">
                <span>Seite Entdecken</span>
                <ArrowRight size={16} />
              </motion.button>
              
              <div className="flex flex-col items-center gap-4">
                
                <div className="flex items-center gap-4 text-[7px] font-black uppercase tracking-[0.2em] text-slate-400">
                  <button onClick={() => onOpenLegal('impressum')} className="hover:text-violet-600 transition-colors">Impressum</button>
                  <div className="w-1 h-1 bg-slate-200 rounded-full" />
                  <button onClick={() => onOpenLegal('privacy')} className="hover:text-violet-600 transition-colors">Datenschutz</button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
