
import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES } from '../constants';
import { Service } from '../types';

export const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedService]);

  return (
    <section id="services" className="py-24 relative bg-white scroll-mt-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-20 space-y-4">
          <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 md:mb-24 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-full mb-2">
            <Icons.Zap size={14} className="text-blue-600 dark:text-blue-400" />
            <span className="text-blue-700 dark:text-blue-600 font-black uppercase tracking-[0.3em] text-[10px]">DIENSTLEISTUNGEN</span>
          </div>
          <h2 className="text-3xl md:text-3xl lg:text-4xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
             <span className="gradient-text">Unsere Leistungen  für Ihr Gebäude und Umfeld.</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-700 max-w-2xl mx-auto text-lg md:text-xl font-medium">
            Entdecken Sie unsere 4 Kernbereiche – alles auf einen Blick für maximale Übersichtlichkeit.
          </p>
        </motion.div>
        </div>

        {/* Uniform 4-column grid for services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, idx) => {
            const Icon = (Icons as any)[service.icon] || Icons.HelpCircle;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setSelectedService(service)}
                className="group cursor-pointer p-8 rounded-[2.5rem] border border-slate-100 bg-slate-50/50 flex flex-col justify-between transition-all hover:bg-white hover:shadow-[0_40px_80px_-15px_rgba(124,58,237,0.15)] h-[340px]"
              >
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-violet-600 shadow-lg group-hover:bg-violet-600 group-hover:text-white transition-all duration-500">
                    <Icon size={20} strokeWidth={2.5} />
                  </div>
                  <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-violet-500 group-hover:border-violet-500 transition-all">
                    <Icons.ArrowUpRight size={14} />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-black mb-3 text-slate-900 tracking-tighter group-hover:text-violet-600 transition-colors">{service.title}</h3>
                  <p className="text-slate-500 font-medium text-[11px] leading-relaxed line-clamp-3 mb-2">{service.description}</p>
                </div>

                <div className="flex items-center gap-2 text-[7px] font-black uppercase tracking-[0.4em] text-violet-600 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  <Icons.Zap size={9} fill="currentColor" />
                  <span>Execute Parameter</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedService(null)} 
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl z-20 flex flex-col max-h-[85vh]"
            >
              {/* Modal Header */}
              <div className="p-8 border-b flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-violet-600 text-white rounded-xl flex items-center justify-center shadow-lg">
                    {React.createElement((Icons as any)[selectedService.icon] || Icons.HelpCircle, { size: 18 })}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">{selectedService.title}</h3>
                    <p className="text-[9px] font-black text-violet-600 uppercase tracking-widest mt-0.5">Service Details</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedService(null)} 
                  className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-red-500 transition-all active:scale-90"
                >
                  <Icons.X size={16} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-10 overflow-y-auto no-scrollbar flex-grow space-y-8">
                <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                  {[].map(tag => (
                    <div key={tag} className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                      <div className="w-1 h-1 rounded-full bg-violet-600" />
                      {tag}
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  
                    <div className="space-y-4">
                      {selectedService.description.map((paragraph, i) => (
                        <p key={i} className="text-[12px] text-slate-600 font-medium leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    
                  </div>

                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-8 border-t shrink-0">
                <a 
                  href="#contact" 
                  onClick={() => setSelectedService(null)}
                  className="w-full inline-flex items-center justify-center px-8 py-5 bg-violet-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-slate-900 transition-all shadow-xl group active:scale-95"
                >
                  <span>Kostenlose Beratung Anfordern</span>
                  <Icons.ArrowRight size={14} className="ml-3 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};