
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, X, Search, ShieldCheck, RefreshCw, Clock, MessageSquare, Award, CheckCircle, Copy, Check } from 'lucide-react';
import { db } from '../db';

interface StatusCheckProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLegal: (type: 'impressum' | 'privacy') => void;
}

const STEPS = [
  { label: 'Eingang', key: 'Eingegangen', icon: Clock, desc: 'Dokumente empfangen.' },
  { label: 'Prüfung', key: 'Prüfung', icon: Search, desc: 'Analyse läuft.' },
  { label: 'Dialog', key: 'Interview', icon: MessageSquare, desc: 'Kontaktaufnahme.' },
  { label: 'Abschluss', key: 'Final', icon: Award, desc: 'Prozess beendet.' }
];

export const StatusCheck: React.FC<StatusCheckProps> = ({ isOpen, onClose, onOpenLegal }) => {
  const [trackingId, setTrackingId] = useState('');
  const [statusResult, setStatusResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTrackingId('');
      setStatusResult(null);
      setError('');
      setCopied(false);
    }
  }, [isOpen]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = trackingId.trim().toUpperCase();
    if (!id) return;
    
    setIsSearching(true);
    setError('');
    setCopied(false);
    try {
      await new Promise(r => setTimeout(r, 1200));
      const result = await db.findById(id);
      if (result) setStatusResult(result);
      else setError('ID nicht gefunden.');
    } catch (err) {
      setError('Systemfehler.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStepIndex = (status: string) => {
    if (status === 'Eingegangen' || status === 'Neu') return 0;
    if (status === 'Prüfung') return 1;
    if (status === 'Interview' || status === 'Besichtigung') return 2;
    if (status === 'Angenommen' || status === 'Abgelehnt' || status === 'Erledigt') return 3;
    return 0;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" />
          <motion.div initial={{ opacity: 0, scale: 0.98, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: 10 }} className="relative bg-white dark:bg-slate-900 w-full max-w-lg overflow-hidden rounded-[2.5rem] shadow-2xl z-20 border border-slate-200 dark:border-slate-800 flex flex-col">
            <button onClick={onClose} className="absolute top-6 right-6 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-red-500 transition-all z-30 active:scale-90"><X size={16} /></button>
            <div className="p-10 overflow-y-auto no-scrollbar">
              <div className="max-w-xs mx-auto space-y-10">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-violet-600/10 text-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm"><ShieldCheck size={24} /></div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Kandidaten-Portal</h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-[0.2em] leading-relaxed">Statusabfrage in Echtzeit (DSGVO Konform).</p>
                </div>

                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="relative">
                    <Fingerprint size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" value={trackingId} onChange={(e) => setTrackingId(e.target.value.toUpperCase())} placeholder="KGH-ABC123" className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-violet-600/10 focus:border-violet-600 text-sm font-black tracking-[0.2em] text-slate-900 dark:text-white uppercase" />
                  </div>
                  <button type="submit" disabled={isSearching || !trackingId.trim()} className="w-full py-5 bg-violet-600 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-slate-950 transition-all shadow-xl disabled:opacity-30 flex items-center justify-center gap-3 active:scale-95">
                    {isSearching ? <RefreshCw className="animate-spin" size={16} /> : <span>Status Prüfen</span>}
                  </button>
                  {error && <p className="text-center text-red-500 text-[9px] font-black uppercase tracking-widest">{error}</p>}
                </form>

                {statusResult && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 bg-slate-50 dark:bg-slate-950/50 rounded-[2rem] border dark:border-slate-800 space-y-8">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-[8px] font-black text-violet-600 uppercase tracking-widest">Tracking: {statusResult.id}</p>
                          <button 
                            onClick={() => handleCopy(statusResult.id)}
                            className="p-1 text-slate-300 hover:text-violet-600 transition-colors"
                            title="Kopieren"
                          >
                            {copied ? <Check size={10} className="text-green-500" /> : <Copy size={10} />}
                          </button>
                        </div>
                        <h4 className="text-sm font-black dark:text-white mt-1 uppercase tracking-tight">{statusResult.name}</h4>
                        <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">{statusResult.jobTitle || statusResult.service}</p>
                      </div>
                      <div className="px-3 py-1 bg-violet-600 text-white rounded-lg text-[8px] font-black uppercase tracking-widest">{statusResult.status}</div>
                    </div>

                    <div className="relative pt-6 pb-2">
                      <div className="absolute top-8 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full" />
                      <div className="absolute top-8 left-0 h-1 bg-violet-600 rounded-full transition-all duration-1000" style={{ width: `${(getStepIndex(statusResult.status) / 3) * 100}%` }} />
                      <div className="relative flex justify-between">
                        {STEPS.map((step, i) => {
                          const isActive = i <= getStepIndex(statusResult.status);
                          const Icon = step.icon;
                          return (
                            <div key={i} className="flex flex-col items-center group relative">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center z-10 transition-all duration-500 ${isActive ? 'bg-violet-600 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                                <Icon size={14} />
                              </div>
                              <span className={`mt-3 text-[7px] font-black uppercase tracking-widest ${isActive ? 'text-violet-600' : 'text-slate-400'}`}>{step.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div className="flex flex-col items-center gap-4 pt-4">
                  <div className="text-center text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Datenübermittlung verschlüsselt (DSGVO).</div>
                  <div className="flex items-center gap-4 text-[7px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <button type="button" onClick={() => onOpenLegal('impressum')} className="hover:text-violet-600 transition-colors">Impressum</button>
                    <div className="w-0.5 h-0.5 bg-slate-300 rounded-full" />
                    <button type="button" onClick={() => onOpenLegal('privacy')} className="hover:text-violet-600 transition-colors">Datenschutz</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
