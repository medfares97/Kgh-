
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS } from '../constants.tsx';
import * as Icons from 'lucide-react';
const FAQItem: React.FC<{ question: string; answer: string; isOpen: boolean; onClick: () => void }> = ({ question, answer, isOpen, onClick }) => {
  return (
    <motion.div 
      layout
      className={`rounded-2xl border transition-all duration-500 overflow-hidden backdrop-blur-md ${isOpen ? 'bg-white/80 border-violet-200 shadow-xl' : 'bg-white/40 border-white/60 shadow-sm'}`}
    >
      <button 
        onClick={onClick}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className={`text-[14px] font-bold transition-colors duration-300 ${isOpen ? 'text-violet-600' : 'text-slate-800 group-hover:text-violet-500'}`}>
          {question}
        </span>
        <span className={`p-1.5 rounded-lg transition-all duration-300 ${isOpen ? 'bg-violet-600 text-white rotate-180' : 'bg-white/60 text-slate-400'}`}>
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="px-6 pb-6 text-slate-700 text-[13px] leading-relaxed border-t border-slate-100/50 pt-4 font-medium">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 bg-white/95 backdrop-blur-sm scroll-mt-24">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-20 md:mb-24 space-y-6"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-full mb-2">
                    <Icons.HelpCircle size={14} className="text-blue-600 dark:text-blue-400" />
                    <span className="text-blue-700 dark:text-blue-600 font-black uppercase tracking-[0.3em] text-[10px]">FAQ</span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight">
                     <span className="gradient-text">die wichtigsten Fragen und Antworten zur KGH</span>
                     
                  </h3>
                  <p className="text-slate-500 dark:text-slate-700 max-w-2xl mx-auto text-lg md:text-xl font-medium">


                  </p>
                </motion.div>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <FAQItem 
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};