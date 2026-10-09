import React, { useState } from 'react';
import { Flame, CheckCircle2, Sparkles, X } from 'lucide-react';

export default function BannerTop() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative w-full bg-gradient-to-r from-teal-950/90 via-slate-900 to-emerald-950/90 border-b border-teal-500/30 text-slate-200 px-4 py-3 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm md:text-base">
        <div className="flex items-center gap-3 font-medium tracking-wide">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-400 shadow-[0_0_12px_rgba(20,184,166,0.3)] animate-pulse">
            <Flame className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="leading-snug text-slate-200">
            <span className="font-semibold text-teal-300 mr-1.5 inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 inline" /> Parabéns!
            </span>
            Parabéns, você acabou de tomar uma das melhores decisões da sua vida. Siga o nosso caminho pré-estabelecido para melhores resultados garantidos.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="hidden lg:inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider bg-teal-500/10 text-teal-300 border border-teal-500/20 px-2.5 py-1 rounded-full">
            <Sparkles className="w-3 h-3 text-teal-400" /> Protocolo Ativo
          </span>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800/60 transition-colors"
            title="Minimizar aviso"
            aria-label="Minimizar aviso"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
