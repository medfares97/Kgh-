
import React from 'react';
import { Zap, Heart, Users, Sparkles, ShieldCheck, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {

  return (
    <section id="about" className="py-32 relative bg-transparent scroll-mt-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* LEFT CONTENT: DNA & STATS */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-[1] uppercase">
              
              </h2>
               <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 dark:text-dark leading-tight">
                <span className="gradient-text">ÜBER UNS</span> <br />
              </h3>
              <p className="text-base md:text-lg text-slate-500 dark:text-slate-600 leading-relaxed font-medium">
                Sauberkeit, Qualität und Zuverlässigkeit stehen bei uns im Mittelpunkt. Als professioneller Dienstleister für Gebäudereinigung bieten wir maßgeschneiderte Lösungen für Gewerbe, Immobilienverwaltungen und Privatkunden.

              </p>
              <p className="text-base md:text-lg text-slate-500 dark:text-slate-600 leading-relaxed font-medium">
                Durch klar strukturierte Prozesse, moderne Arbeitsmethoden und eine kontinuierliche Qualitätskontrolle gewährleisten wir gleichbleibend hohe Reinigungsstandards. Unser qualifiziertes Team arbeitet effizient, sorgfältig und termingerecht, um hygienisch einwandfreie Ergebnisse zu erzielen.

              </p>
              <p className="text-base md:text-lg text-slate-500 dark:text-slate-600 leading-relaxed font-medium">
                Für besondere Anforderungen kooperieren wir mit ausgewählten Fachpartnern und stellen so sicher, dass auch komplexe Aufgaben auf höchstem Niveau umgesetzt werden. Unser Anspruch ist es, langfristige Partnerschaften aufzubauen und unseren Kunden jederzeit einen verlässlichen Service zu bieten.
              </p>
              <p>
                <span className="gradient-text text-[16px]">Sauberkeit ist sichtbar - Qulität ist Spürbar</span>
              </p>
            
            </div>
            
          </motion.div>

          {/* RIGHT VISUAL: ANIMATED WEB3 IMAGE CARD */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[500px] perspective-1000"
            >
              {/* Floating Container */}
              <motion.div 
                animate={{ 
                  y: [0, -20, 0],
                  rotateZ: [0, 1, 0]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="relative z-10 p-3 bg-white/20 backdrop-blur-3xl border border-white/40 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(124,58,237,0.2)] overflow-hidden group"
              >
                {/* Main Image */}
                <div className="relative overflow-hidden rounded-[3.2rem]">
                  <img 
                    src="kgh.jpeg" 
                    className="w-full h-[500px] object-cover grayscale brightness-110 group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                    alt="Hannover Office Cleanliness"
                  />
                  
                  {/* Web3 Scanning Light Effect */}
                  <motion.div 
                    animate={{ top: ["-100%", "200%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-40 bg-gradient-to-b from-transparent via-violet-500/20 to-transparent pointer-events-none z-20 skew-y-12"
                  />
                  
                  {/* HUD Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>

              {/* Decorative Background Blur for the card */}
              <div className="absolute -bottom-10 -right-10 w-full h-full bg-violet-600/10 rounded-[4rem] blur-[80px] -z-10" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};




              