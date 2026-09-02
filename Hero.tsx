
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20">
      {/* Dynamic Background Accents */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Parallax Blobs */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute -top-[10%] -right-[10%] w-[50rem] h-[50rem] bg-violet-600/5 rounded-full blur-[180px] mix-blend-multiply" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute top-[30%] -left-[10%] w-[40rem] h-[40rem] bg-blue-600/5 rounded-full blur-[160px] mix-blend-multiply" 
        />

        {/* Animated Floating Accents */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[15%] w-64 h-64 bg-violet-400/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ 
            y: [0, 40, 0],
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-blue-400/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ 
            x: [0, 20, 0],
            y: [0, -20, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-[50%] left-[40%] w-48 h-48 bg-kgh-azure/10 rounded-full blur-[80px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* LEFT COLUMN: Marketing Copy */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left order-1"
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/90 backdrop-blur-3xl border border-white/50 rounded-2xl mb-8 shadow-xl">
              <ShieldCheck size={14} className="text-violet-600" />
              <span className="text-violet-600 font-bold tracking-tight text-[10px] uppercase">Premium Standard Hannover</span>
            </div>

            {/* Headline Group */}
            <div className="space-y-2 mb-10">
              <h1 className="text-2xl sm:text-6xl lg:text-4xl font-heading font-black text-slate-950 leading-[1.1] tracking-tighter">
                Sauberkeit ist <span className="text-slate-600">sichtbar.</span>
              </h1>
              <h2 className="text-2xl sm:text-xl lg:text-4xl font-heading font-black leading-[1.1] tracking-tighter gradient-text">
                Qualität ist spürbar.
              </h2>
            </div>

            {/* Description Paragraph */}
            <p className="text-slate-600 text-base md:text-lg lg:text-xl font-medium leading-relaxed max-w-xl mb-12">
              Mit anderen Worten: Wir sind Ihr zuverlässiger Partner für professionelle, nachhaltige und effiziente Gebäudereinigung – für langfristige Sauberkeit und Werterhalt.
            </p>

            {/* Action Group */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <a 
                href="#about" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="btn-primary inline-flex items-center justify-center px-12 py-5 text-white rounded-[2rem] font-bold text-[14px] shadow-2xl group active:scale-95 transition-all border border-white/20"
              >
                <span>Start</span>
                <ArrowRight size={18} className="ml-4 group-hover:translate-x-2 transition-transform" />
              </a>
              
              <button 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary inline-flex items-center justify-center px-12 py-5 text-white rounded-[2rem] font-bold text-[14px] shadow-2xl group active:scale-95 transition-all border border-white/20"
              >
                Leistungen ansehen
                <ArrowRight size={18} className="ml-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Animated Web3 Image Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2"
          >
            <div className="relative group">
              {/* Floating Frame */}
              <motion.div 
                animate={{ 
                  y: [0, -15, 0],
                  rotateZ: [0, -1, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="relative z-10 p-4 bg-white/20 backdrop-blur-3xl border border-white/40 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(37,99,235,0.2)] overflow-hidden"
              >
                <img 
                  src="https://i.pinimg.com/1200x/19/59/3b/19593b730eb32c4e51e9fce8660f5c78.jpg" 
                  alt="Architecture Design" 
                  className="w-full h-[400px] lg:h-[550px] object-cover rounded-[2.2rem] shadow-2xl brightness-110 contrast-105"
                />
                
                {/* Internal UI Elements */}
                <div className="absolute top-10 left-10 p-4 bg-white/90 backdrop-blur-xl rounded-2xl border border-white shadow-xl flex items-center gap-3">
                

                </div>
              </motion.div>

              {/* Decorative Glows */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-violet-600/20 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-[80px] pointer-events-none" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
