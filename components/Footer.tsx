
import React from 'react';
import { Logo } from './Logo.tsx';
import { NAV_ITEMS, CONTACT_INFO } from '../constants.tsx';
import { Facebook, Instagram, Linkedin, Twitter, ArrowUpRight, Mail, Phone, MapPin, Sparkles, ChevronRight, Lock } from 'lucide-react';

interface FooterProps {
  onOpenLegal: (type: 'impressum' | 'privacy') => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onOpenAdmin }) => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth'
        });
        window.history.pushState(null, '', href);
      }
    }
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="relative pt-20 pb-10 bg-white text-slate-900 overflow-hidden border-t border-slate-200 selection:bg-violet-600/30">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-16">
          
          {/* Section 1: Brand & Social */}
          <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left space-y-6">
            <div 
              className="flex flex-col items-center sm:items-start group cursor-pointer" 
              onClick={(e) => scrollToSection(e as any, '#home')}
            >
              <div className="p-4 bg-transparent rounded-[2rem]  ">
                <Logo className="h-20 w-21" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-slate-900 text-2xl sm:text-3xl tracking-tighter leading-none gradient-text uppercase">KGH</span>
                <span className="text-[12px] text-violet-700 font-bold tracking-tight mt-2 sm:mt-3">Gebäudereinigung Hannover UG (haftungsbeschränkt)</span>
              </div>
            </div>
            
            <p>
                <span className="text-[17px] gradient-text">Sauberkeit ist sichtbar - Qulität ist Spürbar</span>
              </p>

            <div className="flex items-center justify-center sm:justify-start space-x-3">
              {socialLinks.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-violet-600 transition-all duration-300 group shadow-sm"
                  aria-label={social.label}
                >
                  <social.icon size={18} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Section 2: Quick Links */}
          <div className="lg:col-span-2 flex flex-col items-center sm:items-start space-y-8 sm:space-y-6">
            <h5 className="font-heading font-black text-slate-900 uppercase tracking-widest text-[10px] flex items-center justify-center sm:justify-start">
              <span className="w-3 h-px bg-violet-500 mr-3 hidden sm:block"></span>
              Menü
            </h5>
            <nav className="flex flex-col items-center sm:items-start space-y-5 sm:space-y-3">
              {NAV_ITEMS.map((item) => (
                <a 
                  key={item.label} 
                  href={item.href} 
                  onClick={(e) => scrollToSection(e, item.href)} 
                  className="text-slate-500 hover:text-violet-600 transition-all text-[12px] sm:text-[11px] font-bold group flex items-center gap-2"
                >
                  <ChevronRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-violet-500 hidden sm:block" />
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Section 3: Contact Details */}
          <div className="lg:col-span-3 flex flex-col items-center sm:items-start space-y-8 sm:space-y-6">
            <h5 className="font-heading font-black text-slate-900 uppercase tracking-widest text-[10px] flex items-center justify-center sm:justify-start">
              <span className="w-3 h-px bg-violet-500 mr-3 hidden sm:block"></span>
              Zentrale
            </h5>
            <div className="space-y-8 sm:space-y-6 w-full">
              {[
                { icon: MapPin, label: 'Adresse', value: CONTACT_INFO.address },
                { icon: Phone, label: 'Telefon', value: CONTACT_INFO.phone },
                { icon: Mail, label: 'E-Mail', value: CONTACT_INFO.email },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-3 sm:space-y-0 sm:space-x-4 group">
                  <div className="p-4 sm:p-3 rounded-xl bg-white border border-slate-200 text-violet-500 group-hover:bg-violet-600 group-hover:text-white transition-all shadow-sm">
                    <item.icon size={16} />
                  </div>
                  <div className="flex flex-col items-center sm:items-start">
                    <span className="text-[10px] text-slate-400 font-bold mb-1">{item.label}</span>
                    <p className="text-slate-700 text-sm sm:text-[12px] font-bold group-hover:text-violet-600 transition-colors break-all">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Premium CTA Widget */}
          <div className="lg:col-span-3">
            <div className="p-10 sm:p-7 rounded-[3rem] sm:rounded-[2rem] bg-white border border-slate-200 relative overflow-hidden group hover:border-violet-500/40 transition-all duration-500 shadow-xl flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="absolute -top-6 -right-6 p-4 text-violet-500/5 group-hover:text-violet-500/10 transition-all duration-700 pointer-events-none">
                <Sparkles size={120} className="rotate-12" />
              </div>
              
              <div className="w-12 h-12 sm:w-10 sm:h-10 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center mb-6 border border-violet-100 group-hover:bg-violet-600 group-hover:text-white transition-all">
                <Sparkles size={20} />
              </div>

              <h6 className="text-slate-900 font-black text-2xl sm:text-xl mb-3 relative z-10 tracking-tight leading-tight">Glanz auf <br className="hidden sm:block" />Knopfdruck.</h6>
              <p className="text-slate-500 text-[12px] sm:text-[11px] mb-8 sm:mb-6 relative z-10 font-medium leading-relaxed">
                Profitieren Sie von unserem Premium-Service in Hannover und Region..
              </p>
              
              <a 
                href="#contact" 
                onClick={(e) => scrollToSection(e as any, '#contact')}
                className="w-full inline-flex items-center justify-center px-8 py-5 sm:py-4 bg-violet-600 hover:bg-slate-950 text-white rounded-xl font-bold text-[14px] sm:text-[12px] transition-all shadow-xl group active:scale-95"
              >
                <span>Anfragen</span>
                <ArrowUpRight size={14} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Meta & Legal */}
        <div className="pt-10 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-10 sm:gap-6 text-slate-500">
          <div className="flex flex-col items-center sm:items-start gap-3 sm:gap-1 relative group/admin">
            <p className="text-[12px] sm:text-[10px] font-bold text-slate-400 text-center sm:text-left">
              © {new Date().getFullYear()} {CONTACT_INFO.companyName}
            </p>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-700">
  Crafted with care by  
  <a 
    href="https://www.linkedin.com/in/med-fares-abidi" 
    target="_blank" 
    rel="noopener noreferrer"
    className="font-text-[10px] md:text-[11px] text-blue-600 font-black uppercase tracking-[0.5em] mt-3 ml-2"
  >
    MFA
  </a>
</p>
            
            {/* Discreet Admin Trigger */}
            <button 
              onClick={onOpenAdmin}
              className="absolute -right-6 top-0 opacity-[0.05] hover:opacity-100 transition-opacity text-slate-400 p-2 cursor-default"
              aria-label="Admin Access"
            >
              <Lock size={10} />
            </button>
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-8 sm:gap-8 w-full sm:w-auto">
            <button 
              onClick={() => onOpenLegal('impressum')}
              className="text-[12px] sm:text-[11px] font-bold text-slate-500 hover:text-violet-600 transition-all flex items-center gap-2 group"
            >
              <div className="w-1.5 h-1.5 bg-violet-500 rounded-full group-hover:scale-150 transition-transform"></div>
              Impressum
            </button>
            <button 
              onClick={() => onOpenLegal('privacy')}
              className="text-[12px] sm:text-[11px] font-bold text-slate-500 hover:text-violet-600 transition-all flex items-center gap-2 group"
            >
              <div className="w-1.5 h-1.5 bg-violet-500 rounded-full group-hover:scale-150 transition-transform"></div>
              Datenschutz
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};