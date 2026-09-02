
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, MapPin, CheckCircle, X, ArrowRight, Sparkles, 
  Loader2, ChevronRight, Heart, UserCircle, Target, AlertCircle,
  Copy, Check, FileUp, ShieldCheck, Gift, Award, Phone
} from 'lucide-react';
import { CAREER_OFFERS } from '../constants.tsx';
import { CareerOffer } from '../types.ts';
import { db } from '../db.ts';

interface CareersProps {
  onOpenLegal: (type: 'impressum' | 'privacy') => void;
}

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
  privacy: boolean;
}

export const Careers: React.FC<CareersProps> = ({ onOpenLegal }) => {
  const [detailJob, setDetailJob] = useState<CareerOffer | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const [formData, setFormData] = useState<FormValues>({
    name: '',
    email: '',
    phone: '',
    message: '',
    privacy: false
  });
  const [errors, setErrors] = useState<Partial<FormValues & { resume: string }>>({});
  
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeBase64, setResumeBase64] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validatePhone = (num: string) => {
    const cleanNum = num.replace(/[\s\-]/g, '');
    const phoneRegex = /^(\+49|0049|0)[1-9][0-9]{7,13}$/;
    return phoneRegex.test(cleanNum);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    let processedValue = value;
    if (name === 'phone') {
      processedValue = value.replace(/[^0-9+\s\-]/g, '');
    }

    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : processedValue }));
    if (errors[name as keyof FormValues]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: any = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = 'Name erforderlich';
    if (!emailRegex.test(formData.email)) newErrors.email = 'Ungültige E-Mail';
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon erforderlich';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Ungültiges Format (z.B. 017...)';
    }

    if (!resumeFile) newErrors.resume = 'Lebenslauf fehlt (PDF)';
    if (!formData.privacy) newErrors.privacy = 'Zustimmung erforderlich';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setErrors(prev => ({ ...prev, resume: 'Nur PDF-Dateien erlaubt' }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, resume: 'Max. 5MB erlaubt' }));
        return;
      }
      setErrors(prev => ({ ...prev, resume: undefined }));
      const reader = new FileReader();
      reader.onload = (event) => setResumeBase64(event.target?.result as string);
      reader.readAsDataURL(file);
      setResumeFile(file);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setFormStatus('submitting');
    setUploadProgress(0);

    const duration = 2000;
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const progressTimer = setInterval(() => {
      currentStep++;
      const progress = Math.min(Math.round((currentStep / steps) * 100), 98);
      setUploadProgress(progress);
      if (currentStep >= steps) clearInterval(progressTimer);
    }, interval);

    try {
      await new Promise(resolve => setTimeout(resolve, duration));
      const newApp = await db.saveApplication({
        ...formData,
        jobTitle: detailJob?.title || 'Initiativbewerbung',
        fileName: resumeFile?.name || 'Dokument.pdf',
        fileData: resumeBase64 || undefined
      });
      setUploadProgress(100);
      setApplicationId(newApp.id);
      setTimeout(() => {
        setFormStatus('success');
        clearInterval(progressTimer);
      }, 300);
    } catch (err) {
      setFormStatus('error');
      clearInterval(progressTimer);
    }
  };

  const resetForm = () => {
    setFormStatus('idle');
    setDetailJob(null);
    setFormData({ name: '', email: '', phone: '', message: '', privacy: false });
    setResumeFile(null);
    setResumeBase64(null);
    setErrors({});
    setCopied(false);
    setUploadProgress(0);
  };

  const isPhoneFieldValid = formData.phone.length > 5 && validatePhone(formData.phone);

  const inputClasses = (error?: string) => `w-full px-5 py-4 bg-white/50 dark border rounded-xl focus:outline-none focus:ring-4 focus:ring-violet-600/10 transition-all text-[13px] font-medium shadow-inner ${error ? 'border-red-500 bg-red-50/50' : 'border-slate-200'} text-slate-900 placeholder:text-slate-400`;

  return (
    <section id="careers" className="py-32 relative bg-white scroll-mt-24 bg-[#fcfdfe]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-24 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-blue-50 dark:bg-blue-500/10 rounded-full mb-2"><Sparkles size={16} className="text-blue-600" /><span className="text-blue-700 dark:text-blue-600 font-bold uppercase tracking-widest text-[10px]">KARRIERE</span></div>
          <h3 className="text-3xl lg:text-4xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight"><span className="gradient-text">Werden Sie Teil unseres Teams starten Sie Ihre Karriere bei KGH.</span></h3>
          <p className="text-slate-500 dark:text-slate-700 max-w-2xl mx-auto text-lg md:text-xl font-medium">Wir wachsen stetig und suchen motivierte Talente für Hannover.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAREER_OFFERS.map((job) => (
            <motion.div key={job.id} whileHover={{ y: -8 }} className="bg-white p-8 rounded-[2rem] border shadow-sm hover:shadow-xl transition-all flex flex-col group cursor-pointer" onClick={() => setDetailJob(job)}>
              <div className="flex justify-between items-start mb-8">
                <div className="p-4 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-violet-600 group-hover:text-white transition-all"><Briefcase size={20} /></div>
                <span className="text-[10px] font-bold px-3 py-1.5 bg-slate-100 rounded-full">{job.type}</span>
              </div>
              <h4 className="text-lg font-black mb-3 group-hover:text-violet-600 transition-colors">{job.title}</h4>
              <div className="flex items-center gap-2 text-slate-400 text-[11px] font-medium mb-6"><MapPin size={12} className="text-violet-500" /><span>{job.location}</span></div>
              <p className="text-slate-500 text-[12px] mb-8 flex-grow font-medium leading-relaxed line-clamp-3">{job.description}</p>
              <div className="flex items-center justify-between text-violet-600 font-bold text-[11px]"><span>Jetzt bewerben</span><div className="w-8 h-8 rounded-full border flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-all"><ChevronRight size={16} /></div></div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {detailJob && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={resetForm} className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.98, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: 10 }} className="relative bg-white w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-[2.5rem] shadow-2xl z-20 border flex flex-col">
              <div className="p-8 border-b flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-violet-600 text-white rounded-xl flex items-center justify-center shadow-lg"><Briefcase size={18} /></div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 tracking-tight">{detailJob.title}</h3>
                    <p className="text-[10px] font-bold text-violet-600 mt-0.5">{detailJob.type}</p>
                  </div>
                </div>
                <button onClick={resetForm} className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-red-500 transition-all active:scale-90"><X size={16} /></button>
              </div>
              
              <div className="p-10 overflow-y-auto no-scrollbar flex-grow space-y-10">
                {formStatus === 'success' ? (
                  <div className="flex flex-col items-center justify-center text-center space-y-8 py-10">
                    <div className="w-20 h-20 bg-green-500 text-white rounded-2xl flex items-center justify-center shadow-2xl"><CheckCircle size={32} /></div>
                    <div className="space-y-3">
                      <h4 className="text-xl font-black tracking-tight">Erfolgreich!</h4>
                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 group relative">
                        <p className="text-[10px] font-bold text-slate-400 mb-2">Tracking-ID</p>
                        <div className="flex items-center justify-center gap-3">
                          <p className="text-2xl font-black text-violet-600 tracking-widest">{applicationId}</p>
                          <button 
                            onClick={() => applicationId && handleCopy(applicationId)}
                            className="p-2 text-slate-400 hover:text-violet-600 transition-colors"
                            title="Kopieren"
                          >
                            {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                          </button>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">Nutzen Sie diese ID im Status-Portal.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-10">
                    <div className="space-y-8">
                      {/* Job Description Paragraphs - Now matches Services.tsx modal style */}
                      <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                        <p className="text-[14px] text-slate-600 font-medium leading-relaxed">
                          {detailJob.description}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col">
                          <p className="text-[11px] font-bold text-violet-600 mb-4 flex items-center gap-2">
                            <Target size={14} /> Ihre Aufgaben
                          </p>
                          <ul className="space-y-3 flex-grow">
                            {detailJob.tasks.map((task, i) => (
                              <li key={i} className="text-[12px] text-slate-600 flex gap-3 font-medium leading-tight">
                                <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-violet-500 shrink-0" />{task}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-6 bg-violet-50/50 rounded-3xl border border-violet-100 shadow-sm flex flex-col">
                          <p className="text-[11px] font-bold text-violet-600 mb-4 flex items-center gap-2">
                            <Gift size={14} /> Wir bieten
                          </p>
                          <ul className="space-y-3 flex-grow">
                            {detailJob.benefits.map((benefit, i) => (
                              <li key={i} className="text-[12px] text-slate-700 flex gap-3 font-medium leading-tight">
                                <CheckCircle size={12} className="text-violet-600 shrink-0 mt-0.5" />{benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm">
                        <p className="text-[11px] font-bold text-slate-500 mb-4 flex items-center gap-2">
                          <UserCircle size={14} /> Ihr Profil
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {detailJob.profile.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100">
                              <Award size={12} className="text-violet-400" />
                              <span className="text-[11px] font-medium text-slate-600 leading-none">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 pt-10 border-t border-slate-100">
                      <div className="text-center space-y-2 mb-6">
                        <h4 className="text-lg font-black tracking-tight text-slate-900">Express-Bewerbung</h4>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Minimaler Aufwand, maximale Chance.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <input name="name" value={formData.name} onChange={handleInputChange} className={inputClasses(errors.name)} placeholder="Vollständiger Name" disabled={formStatus === 'submitting'} />
                          {errors.name && <p className="text-[11px] text-red-500 font-bold ml-4">{errors.name}</p>}
                        </div>
                        <div className="space-y-1">
                          <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={inputClasses(errors.email)} placeholder="E-Mail Adresse" disabled={formStatus === 'submitting'} />
                          {errors.email && <p className="text-[11px] text-red-500 font-bold ml-4">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="space-y-1 relative">
                        <input 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleInputChange} 
                          className={`${inputClasses(errors.phone)} pr-12`} 
                          placeholder="Telefon (z.B. 0171 1234567)" 
                          disabled={formStatus === 'submitting'} 
                        />
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                          <AnimatePresence>
                            {isPhoneFieldValid && (
                              <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}>
                                <Check size={14} className="text-green-500" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        {errors.phone && <p className="text-[11px] text-red-500 font-bold ml-4">{errors.phone}</p>}
                      </div>

                      <textarea name="message" value={formData.message} onChange={handleInputChange} rows={2} className={`${inputClasses()} resize-none`} placeholder="Optionale Nachricht..." disabled={formStatus === 'submitting'} />

                      <div className="space-y-2">
                        <div 
                          onClick={() => formStatus !== 'submitting' && fileInputRef.current?.click()} 
                          className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center transition-all ${formStatus === 'submitting' ? 'cursor-wait bg-slate-100 opacity-60' : 'cursor-pointer hover:border-violet-600'} ${errors.resume ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200'}`}
                        >
                          <input type="file" ref={fileInputRef} className="hidden" accept=".pdf" onChange={handleFileChange} disabled={formStatus === 'submitting'} />
                          {resumeFile ? (
                            <div className="flex items-center gap-3">
                              <FileUp size={18} className="text-violet-600" />
                              <p className="text-[12px] font-bold text-slate-900 truncate max-w-[200px]">{resumeFile.name}</p>
                            </div>
                          ) : (
                            <p className="text-[11px] font-bold text-slate-400">Lebenslauf (PDF, max. 5MB) hochladen</p>
                          )}
                        </div>
                        
                        <AnimatePresence>
                          {formStatus === 'submitting' && (
                            <motion.div 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="px-2 space-y-2"
                            >
                              <div className="flex justify-between items-center text-[10px] font-bold text-violet-600">
                                <span>Übertragung läuft...</span>
                                <span>{uploadProgress}%</span>
                              </div>
                              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-100">
                                <motion.div 
                                  className="h-full bg-violet-600 shadow-[0_0_10px_rgba(124,58,237,0.5)]"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${uploadProgress}%` }}
                                  transition={{ duration: 0.1 }}
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        {errors.resume && <p className="text-[11px] text-red-500 font-bold ml-4">{errors.resume}</p>}
                      </div>

                      <div className="flex items-start gap-3 px-2">
                        <input type="checkbox" name="privacy" id="career-privacy" checked={formData.privacy} onChange={handleInputChange} className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-violet-600 cursor-pointer" disabled={formStatus === 'submitting'} />
                        <div className="flex flex-col">
                          <label htmlFor="career-privacy" className="text-[12px] font-medium text-slate-500 cursor-pointer leading-tight">Zustimmung zur <button type="button" onClick={() => onOpenLegal('privacy')} className="text-violet-600 underline decoration-violet-600/30">Datenverarbeitung</button>.</label>
                          {errors.privacy && <p className="text-[11px] text-red-500 font-bold mt-1 ml-1">{errors.privacy}</p>}
                        </div>
                      </div>

                      <button type="submit" disabled={formStatus === 'submitting'} className="w-full py-5 bg-violet-600 text-white font-bold text-[14px] rounded-xl hover:bg-slate-950 transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95 disabled:opacity-50">
                        {formStatus === 'submitting' ? (
                          <>
                            <Loader2 className="animate-spin" size={16} />
                            <span>Verschlüsselung...</span>
                          </>
                        ) : (
                          <>
                            <span>Bewerbung absenden</span>
                            <ArrowRight size={14} />
                          </>
                        )}
                      </button>
                      
                      <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400">
                        <ShieldCheck size={12} className="text-green-500" />
                        Sichere Datenübermittlung aktiv
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
