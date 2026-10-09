import React from 'react';
import { ShieldCheck, Compass, Heart } from 'lucide-react';

export default function FooterBar() {
  return (
    <footer className="mt-8 border-t border-slate-800/80 bg-[#080b13] py-6 px-4 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-teal-400" />
          <span className="font-brand font-bold text-slate-300 tracking-wider">
            PROTOCOLO FREQUÊNCIA 369
          </span>
          <span className="text-slate-600">|</span>
          <span>Plataforma de Leitura Oficial</span>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> Conteúdo 100% Autêntico
          </span>
        </div>

      </div>
    </footer>
  );
}
