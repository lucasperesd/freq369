import React, { useState, useEffect } from 'react';
import { Sparkles, ZoomIn, CheckCircle2, Smartphone, ArrowRight } from 'lucide-react';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show only when opening the site (session-based)
    const hasSeenWelcome = sessionStorage.getItem('frequencia369_welcome_confirmed');
    if (!hasSeenWelcome) {
      // Small delay for smooth entry after page loads
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConfirm = () => {
    sessionStorage.setItem('frequencia369_welcome_confirmed', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dark Blurred Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#0f172a] to-[#0b0f19] border border-teal-500/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(20,184,166,0.2)] z-10 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Glowing Top Pill Badge */}
        <div className="flex items-center justify-center mb-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(20,184,166,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
            Área de Acesso VIP
          </div>
        </div>

        {/* Modal Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-white font-brand tracking-wide leading-tight">
          Bem-vindo ao <br />
          <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
            Protocolo Frequência 369
          </span>
        </h2>

        {/* Welcome Copy */}
        <p className="text-slate-300 text-sm sm:text-base text-center mt-3 font-normal leading-relaxed">
          Parabéns pela iniciativa. Você agora tem acesso exclusivo ao material definitivo 
          para reprogramar sua presença, blindar sua energia e sintonizar sua melhor versão.
        </p>

        {/* Zoom Instructions Highlight Box */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-teal-950/40 border border-teal-500/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 shrink-0 shadow-[0_0_12px_rgba(20,184,166,0.3)]">
              <ZoomIn className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-300">
                <Smartphone className="w-3.5 h-3.5" /> Dica Importante de Leitura
              </div>
              <p className="text-xs sm:text-sm text-slate-200 mt-1.5 leading-relaxed font-medium">
                Se estiver no celular ou tablet, <strong className="text-white underline decoration-teal-400 decoration-2 underline-offset-2">faça o movimento de pinça com os dedos (zoom)</strong> para ajustar o tamanho do texto e visualizar todos os conteúdos e diagramas com nitidez máxima.
              </p>
            </div>
          </div>
        </div>

        {/* Confirmation Button */}
        <div className="mt-6 sm:mt-7">
          <button
            onClick={handleConfirm}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-extrabold text-sm sm:text-base bg-gradient-to-r from-teal-500 via-teal-400 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 shadow-[0_0_25px_rgba(20,184,166,0.4)] hover:shadow-[0_0_35px_rgba(20,184,166,0.6)] transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            <CheckCircle2 className="w-5 h-5 text-slate-950" />
            <span>Entendi, Acessar Conteúdos</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

      </div>
    </div>
  );
}
