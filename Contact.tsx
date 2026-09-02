
import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { Mail, Phone, ArrowRight, Sparkles, Loader2, CheckCircle, MapPin, ShieldCheck, Lock, ChevronDown, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT_INFO, SERVICES } from '../constants';
import { db } from '../db';

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  privacy: boolean;
}

interface ContactProps {
  onOpenLegal: (type: 'impressum' | 'privacy') => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenLegal }) => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    privacy: false
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Smart Phone Validation & Formatting
  const validatePhone = (num: string) => {
    const cleanNum = num.replace(/[\s\-]/g, '');
    const phoneRegex = /^(\+49|0049|0)[1-9][0-9]{7,13}$/;
    return phoneRegex.test(cleanNum);
  };

  const formatPhoneInput = (val: string) => {
    // Only allow +, digits, space and -
    let cleaned = val.replace(/[^0-9+\s\-]/g, '');
    return cleaned;
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = 'Name erforderlich';
    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail erforderlich';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Ungültiges Format';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon erforderlich';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Ungültiges Format (z.B. 017...)';
    }

    if (!formData.service) newErrors.service = 'Leistung wählen';
    if (formData.message.trim().length < 10) newErrors.message = 'Nachricht zu kurz';
    if (!formData.privacy) newErrors.privacy = 'Zustimmung erforderlich';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    let processedValue = value;
    if (name === 'phone') {
      processedValue = formatPhoneInput(value);
    }

    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : processedValue }));
    
    if (errors[name as keyof FormState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await new Promise(r => setTimeout(r, 1000));
        await db.saveInquiry(formData);
        setIsSuccess(true);
      } catch (err) {
        setErrors({ message: 'Übertragungsfehler.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const isPhoneFieldValid = formData.phone.length > 5 && validatePhone(formData.phone);

  const inputBaseClasses = (error?: string) => `
    w-full px-5 py-4 bg-white/60 dark:bg-slate-900 border rounded-2xl 
    focus:outline-none focus:ring-4 focus:ring-violet-600/5 focus:border-violet-600 
    transition-all text-[11px] font-bold backdrop-blur-sm uppercase tracking-widest
    placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm 
    ${error ? 'border-red-500 bg-red-50/30' : 'border-white/80 dark:border-slate-800'} 
    text-slate-900 dark:text-white appearance-none
  `;

  return (
    <section id="contact" className="py-32 relative scroll-mt-24 bg-white white:bg-[#020617] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }} 
          className="text-center lg:col-span-5 space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-full mb-2">
                      <Icons.Mail size={14} className="text-blue-600 dark:text-blue-400" />
                      <span className="text-blue-700 dark:text-blue-400 font-black uppercase tracking-[0.3em] text-[10px]">KONTAKT</span>
                    </div>
                    <h2 className="text-3xl md:text-3xl lg:text-5xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                       <span className="text-[18px] gradient-text">Sauberkeit ist sichtbar - Qualität ist Spürbar.</span>
                    </h2>
            <div className="relative group w-full h-[300px] rounded-[3rem] overflow-hidden border-2 border-slate-100 dark:border-slate-800 shadow-2xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d77967.65961601265!2d9.664402636660144!3d52.379105459341645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b00b514d420f83%3A0x425ac6d94ac46e0!2sHannover!5e0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b00b514d420f83%3A0x425ac6d94ac46e0!2sHannover!5e0!3m2!1sde!2sde!4v1715858000000!5m2!1sde!2sde" 
                className="absolute inset-0 w-full h-full grayscale dark:invert-[0.9] dark:hue-rotate-180 opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" 
                loading="lazy"
                title="KGH Standort Hannover"
              ></iframe>
              <div className="absolute top-6 left-6 p-4 glass border border-white/20 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 bg-violet-600 text-white rounded-xl flex items-center justify-center"><MapPin size={20} /></div>
                <div>
                  <p className="text-[7px] text-slate-400 font-black uppercase tracking-widest">Zentrale</p>
                  <p className="text-[10px] font-black dark:text-white uppercase tracking-tighter">Hannover, DE</p>
                </div>
              </div>
            </div>

            {/* <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: CONTACT_INFO.email },
                { icon: Phone, label: 'Telefon', value: CONTACT_INFO.phone },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="p-4 bg-white dark:bg-slate-900 text-violet-600 rounded-xl border border-slate-100 dark:border-slate-800 shadow-lg group-hover:bg-violet-600 group-hover:text-white transition-all"><item.icon size={16} /></div>
                  <div>
                    <p className="text-[7px] text-slate-400 font-black uppercase tracking-[0.4em] mb-0.5">{item.label}</p>
                    <p className="text-slate-900 dark:text-white font-black text-base tracking-tight uppercase">{item.value}</p>
                  </div>
                </div>
              ))}
            </div> */}
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="lg:col-span-7">
            <div className="bg-violet dark:bg-slate-900/50 backdrop-blur-3xl p-8 md:p-12 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-2xl relative">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center space-y-6 py-8">
                    <div className="w-16 h-16 bg-green-500 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/30"><CheckCircle size={32} /></div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-black tracking-tight uppercase">Anfrage Übermittelt</h4>
                      <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">Wir kontaktieren Sie innerhalb von 24h.</p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <input name="name" value={formData.name} onChange={handleChange} placeholder="NAME" className={inputBaseClasses(errors.name)} />
                        {errors.name && <p className="text-[8px] text-red-500 font-black uppercase ml-4 tracking-widest">{errors.name}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <input name="email" value={formData.email} onChange={handleChange} placeholder="EMAIL" className={inputBaseClasses(errors.email)} />
                        {errors.email && <p className="text-[8px] text-red-500 font-black uppercase ml-4 tracking-widest">{errors.email}</p>}
                      </div>
                    </div>
                    
                    <div className="space-y-1.5 relative">
                        <input 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleChange} 
                          placeholder="TELEFON (Z.B. 0151 1234567)" 
                          className={`${inputBaseClasses(errors.phone)} pr-12`} 
                        />
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                          <AnimatePresence>
                            {isPhoneFieldValid && (
                              <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}>
                                <Check size={14} className="text-green-500" />
                              </motion.div>
                            )}
                            {errors.phone && (
                              <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}>
                                <AlertCircle size={14} className="text-red-500" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        {errors.phone && <p className="text-[8px] text-red-500 font-black uppercase ml-4 tracking-widest">{errors.phone}</p>}
                    </div>

                    <div className="space-y-1.5 relative">
                      <select name="service" value={formData.service} onChange={handleChange} className={`${inputBaseClasses(errors.service)} pr-12 cursor-pointer`}>
                        <option value="" disabled>LEISTUNG WÄHLEN</option>
                        {SERVICES.map(s => <option key={s.id} value={s.title} className="bg-white dark:bg-slate-900">{s.title.toUpperCase()}</option>)}
                      </select>
                      <ChevronDown size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      {errors.service && <p className="text-[8px] text-red-500 font-black uppercase ml-4 tracking-widest">{errors.service}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <textarea name="message" value={formData.message} onChange={handleChange} rows={3} placeholder="IHRE ANFORDERUNGEN..." className={`${inputBaseClasses(errors.message)} resize-none`} />
                      {errors.message && <p className="text-[8px] text-red-500 font-black uppercase ml-4 tracking-widest">{errors.message}</p>}
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                      <div className="flex items-start gap-3 px-1">
                        <input type="checkbox" name="privacy" id="privacy-check" checked={formData.privacy} onChange={handleChange} className="mt-1 h-3.5 w-3.5 rounded border-slate-300 dark:border-slate-700 text-violet-600 cursor-pointer" />
                        <div className="flex flex-col">
                          <label htmlFor="privacy-check" className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest cursor-pointer leading-tight">
                            Ich akzeptiere die <button type="button" onClick={() => onOpenLegal('privacy')} className="text-violet-600 underline decoration-violet-600/30">Datenschutzbestimmungen</button>.
                          </label>
                          {errors.privacy && <p className="text-[8px] text-red-500 font-black uppercase mt-1.5 tracking-widest">{errors.privacy}</p>}
                        </div>
                      </div>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full py-5 bg-violet-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-slate-950 transition-all shadow-xl active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 mt-4">
                      {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <><span>Kostenlose Beratung Anfordern</span> <ArrowRight size={14} /></>}
                    </button>
                    <div className="text-center pt-2">
                      <div className="inline-flex items-center gap-2 text-[7px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">
                        <ShieldCheck size={10} />
                        <span>Sichere Übertragung via KGH Hybrid TLS Cluster</span>
                      </div>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
