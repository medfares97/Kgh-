
import { GoogleGenAI } from "@google/genai";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Sparkles, X, Send, BrainCircuit, Loader2, Info } from 'lucide-react';

interface AIConsultantProps {
  onOpenLegal: (type: 'impressum' | 'privacy') => void;
}

export const AIConsultant: React.FC<AIConsultantProps> = ({ onOpenLegal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const handleQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMessage = prompt;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setPrompt('');
    setIsThinking(true);

    try {
      // Always initialize GoogleGenAI right before making an API call to ensure it uses the most up-to-date API key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: `You are the KGH AI Consultant, an expert in German cleaning standards (DIN 77400, etc.) and facility management. Answer the following query professionally and in German: ${userMessage}`,
        config: {
          thinkingConfig: { thinkingBudget: 32768 }
        },
      });

      // Access .text property directly as per the latest SDK guidelines
      setMessages(prev => [...prev, { role: 'ai', text: response.text || "Ich konnte leider keine Antwort generieren. Bitte versuchen Sie es erneut." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Systemfehler. Bitte prüfen Sie Ihre Verbindung." }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <>
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 left-6 z-[120] p-5 bg-violet-600 text-white rounded-3xl flex items-center justify-center shadow-2xl shadow-violet-600/30 group border border-white/20 overflow-hidden relative"
      >
        <BrainCircuit size={28} className="relative z-10" />
        <span className="max-w-0 group-hover:max-w-xs group-hover:ml-4 overflow-hidden transition-all duration-500 font-black uppercase text-[10px] tracking-widest relative z-10 whitespace-nowrap">
          AI Experte
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[600] flex items-end justify-center sm:items-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" 
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(124,58,237,0.4)] border border-slate-100 overflow-hidden flex flex-col h-[80vh] sm:h-[600px]"
            >
              <div className="p-8 bg-violet-600 text-white flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black tracking-tight leading-none">KGH AI EXPERT</h4>
                    <p className="text-[8px] font-black uppercase tracking-[0.3em] opacity-70 mt-1">Deep Maintenance Logic Enabled</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-3 hover:bg-white/10 rounded-xl transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 space-y-6 no-scrollbar">
                {messages.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-violet-600 mb-2">
                      <BrainCircuit size={40} />
                    </div>
                    <h5 className="text-xl font-black text-slate-900">Wie kann ich helfen?</h5>
                    <p className="text-xs text-slate-500 font-medium max-w-[240px]">Fragen Sie nach komplexen Reinigungsplänen oder Fachberatung.</p>
                  </div>
                )}
                
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-5 rounded-3xl text-sm font-medium leading-relaxed ${
                      m.role === 'user' 
                        ? 'bg-violet-600 text-white rounded-tr-none' 
                        : 'bg-slate-50 text-slate-900 rounded-tl-none shadow-sm'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                
                {isThinking && (
                  <div className="flex justify-start">
                    <div className="bg-slate-50 p-5 rounded-3xl rounded-tl-none flex items-center gap-3">
                      <Loader2 className="animate-spin text-violet-600" size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Analysiere Parameter...</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 border-t bg-slate-50/50">
                <form onSubmit={handleQuery} className="relative">
                  <input 
                    type="text" 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Komplexe Anfrage stellen..." 
                    className="w-full pl-6 pr-16 py-5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-violet-600/10 text-sm font-bold text-slate-900"
                  />
                  <button 
                    type="submit"
                    disabled={isThinking || !prompt.trim()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-violet-600 text-white rounded-xl flex items-center justify-center shadow-lg disabled:opacity-30 transition-all hover:bg-slate-950"
                  >
                    <Send size={18} />
                  </button>
                </form>
                <div className="mt-4 flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <Info size={10} />
                    <span>Think Mode: gemini-3-pro-preview Active</span>
                  </div>
                  <div className="flex items-center gap-4 text-[7px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <button type="button" onClick={() => onOpenLegal('impressum')} className="hover:text-violet-600 transition-colors">Impressum</button>
                    <div className="w-0.5 h-0.5 bg-slate-300 rounded-full" />
                    <button type="button" onClick={() => onOpenLegal('privacy')} className="hover:text-violet-600 transition-colors">Datenschutz</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
