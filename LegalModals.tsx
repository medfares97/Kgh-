
import React, { useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X, ShieldAlert, Scale, Phone, Mail, Award, ChevronRight, FileText } from 'lucide-react';
import { LEGAL_CONTENT } from '../constants';

interface LegalModalProps {
  type: 'impressum' | 'privacy' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    if (type) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [type]);

  const contentVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.98, 
      y: 10, 
      transition: { duration: 0.2 } 
    }
  };

  if (!type) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative bg-white w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-[2.5rem] shadow-2xl z-20 border border-slate-100 flex flex-col"
        >
          {/* Unified Header */}
          <div className="p-8 border-b flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${type === 'impressum' ? 'bg-slate-900' : 'bg-violet-600'} text-white`}>
                {type === 'impressum' ? <Scale size={18} /> : <ShieldAlert size={18} />}
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">
                  {type === 'impressum' ? 'Impressum' : 'Datenschutz'}
                </h3>
                <p className="text-[9px] font-black text-violet-600 uppercase tracking-widest mt-0.5">Legal Protocol v2.5</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-red-500 transition-all active:scale-90"
            >
              <X size={16} />
            </button>
          </div>

          {/* Unified Scrollable Body with Small Text */}
          <div className="p-10 overflow-y-auto no-scrollbar flex-grow space-y-10">
            {type === 'impressum' ? (
              <div className="space-y-8">
                <div className="space-y-2">
                  <p className="text-[9px] font-black text-violet-600 uppercase tracking-[0.4em]">Angaben gemäß § 5 TMG</p>
                  <h4 className="text-base font-black text-slate-900 tracking-tight">{LEGAL_CONTENT.impressum.company}</h4>
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">{LEGAL_CONTENT.impressum.owner}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                     <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Anschrift</p>
                     <p className="text-[10px] font-bold text-slate-700 leading-relaxed">{LEGAL_CONTENT.impressum.address}</p>
                  </div>
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                     <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Kontakt</p>
                     <div className="flex items-center gap-2 text-[10px] font-bold text-slate-700">
                        <Mail size={12} className="text-violet-500" />
                        <span>{LEGAL_CONTENT.impressum.contact.email}</span>
                     </div>
                     <div className="flex items-center gap-2 text-[10px] font-bold text-slate-700">
                        <Phone size={12} className="text-violet-500" />
                        <span>{LEGAL_CONTENT.impressum.contact.phone}</span>
                     </div>
                  </div>
                </div>

                <div className="p-6 bg-violet-50 rounded-2xl border border-violet-100">
                  <p className="text-[9px] font-black text-violet-600 uppercase tracking-[0.4em] mb-2 flex items-center gap-2">
                    <Award size={12} /> Haftungsausschluss
                  </p>
                  <p className="text-[10px] text-slate-600 leading-relaxed italic font-medium">
                    {LEGAL_CONTENT.impressum.disclaimer}
                  </p>
                </div>

                <div className="text-center pt-4">
                  <span className="px-4 py-2 bg-slate-100 rounded-lg text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    {LEGAL_CONTENT.impressum.taxId}
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                 <div className="flex items-center gap-3 p-4 bg-violet-50 rounded-2xl border border-violet-100 mb-4">
                    <FileText size={16} className="text-violet-600" />
                    <p className="text-[10px] font-black text-violet-600 uppercase tracking-widest">Global Data Security Protocol</p>
                 </div>
                 {LEGAL_CONTENT.privacy.sections.map((section, idx) => (
                    <div key={idx} className="space-y-3 group">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center font-black text-violet-600 text-[10px] group-hover:bg-violet-600 group-hover:text-white transition-colors">
                          {idx + 1}
                        </span>
                        <h4 className="text-[11px] font-black text-slate-900 tracking-widest uppercase">{section.title}</h4>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-medium pl-9">
                        {section.content}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Unified Footer Action */}
          <div className="p-8 border-t shrink-0">
             <button 
              onClick={onClose}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] hover:bg-violet-600 transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95"
            >
              <span>Verstanden & Schließen</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
