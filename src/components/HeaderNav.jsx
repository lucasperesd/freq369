import React from 'react';
import { Menu, BookOpen, CheckCircle, Shield, Download, Sparkles, Compass } from 'lucide-react';

export default function HeaderNav({ 
  activeChapter, 
  completedChapters, 
  totalChapters, 
  onOpenMobileMenu,
  onDownloadActive 
}) {
  const progressPercent = Math.round((completedChapters.length / totalChapters) * 100);

  return (
    <header className="sticky top-0 z-30 bg-[#0b0f19]/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3.5 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Brand / Logo */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle Button */}
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-teal-400 hover:bg-slate-800 hover:text-white transition-all flex items-center gap-2"
            aria-label="Abrir menu de capítulos"
          >
            <Menu className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">Capítulos</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 p-[1px] shadow-[0_0_15px_rgba(20,184,166,0.3)]">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-teal-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-brand font-bold text-base sm:text-lg tracking-wider text-white uppercase m-0 leading-none">
                  Protocolo <span className="text-teal-400">Frequência 369</span>
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/20">
                  <Shield className="w-3 h-3 text-teal-400" /> VIP
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 hidden xs:block">
                Área de Membros Exclusiva &amp; Leitor Interativo
              </p>
            </div>
          </div>
        </div>

        {/* Right: Progress & Quick Download */}
        <div className="flex items-center gap-4">
          {/* Progress bar info */}
          <div className="hidden sm:flex flex-col items-end gap-1 min-w-[150px]">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <span className="text-slate-400">Progresso:</span>
              <span className="text-teal-400 font-bold">{completedChapters.length}/{totalChapters}</span>
              <span className="text-slate-400">({progressPercent}%)</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
              <div 
                className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-500 rounded-full shadow-[0_0_8px_rgba(20,184,166,0.5)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={onDownloadActive}
            className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-bold text-xs sm:text-sm px-3.5 py-2 rounded-xl shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_20px_rgba(20,184,166,0.5)] transition-all active:scale-95"
            title={`Baixar ${activeChapter.title}`}
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Baixar PDF</span>
          </button>
        </div>

      </div>
    </header>
  );
}
