import React from 'react';
import { BookOpen, CheckCircle, Circle, ChevronRight, X, Sparkles, FileText, Trophy } from 'lucide-react';

export default function Sidebar({ 
  chapters, 
  activeChapterId, 
  onSelectChapter, 
  completedChapters,
  toggleCompleteChapter,
  isMobileOpen,
  onCloseMobile
}) {
  const completedCount = completedChapters.length;
  const progressPercent = Math.round((completedCount / chapters.length) * 100);

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0b0f19] border-r border-slate-800/80 w-full">
      {/* Top Header of Sidebar */}
      <div className="p-5 border-b border-slate-800/80 bg-slate-900/40">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.8)] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-teal-400">
              PROTOCOLO INTERATIVO
            </span>
          </div>
          {isMobileOpen && (
            <button 
              onClick={onCloseMobile}
              className="lg:hidden p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <h2 className="font-brand font-extrabold text-xl text-white tracking-wide m-0 leading-snug">
          Protocolo <br />
          <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Frequência 369
          </span>
        </h2>
        <p className="text-xs text-slate-400 mt-1.5 font-sans">
          Navegue pelos 9 capítulos do guia definitivo de transformação pessoal.
        </p>

        {/* Progress Card */}
        <div className="mt-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-200">Seu Progresso</div>
              <div className="text-[11px] text-slate-400">{completedCount} de {chapters.length} lidos</div>
            </div>
          </div>
          <span className="text-xs font-bold text-teal-400 bg-teal-500/10 px-2 py-1 rounded-md border border-teal-500/20">
            {progressPercent}%
          </span>
        </div>
      </div>

      {/* Chapters Menu List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <div className="px-3 py-1.5 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
          Índice de Capítulos
        </div>

        {chapters.map((chapter, index) => {
          const isActive = chapter.id === activeChapterId;
          const isCompleted = completedChapters.includes(chapter.id);

          return (
            <div 
              key={chapter.id}
              className={`group relative flex items-center justify-between p-3.5 rounded-xl transition-all duration-200 cursor-pointer ${
                isActive 
                  ? 'bg-teal-500/15 border-l-4 border-teal-400 text-white shadow-[0_0_20px_rgba(20,184,166,0.15)] ring-1 ring-teal-500/30' 
                  : 'text-slate-300 hover:bg-slate-900/70 hover:text-white hover:border-l-4 hover:border-slate-600'
              }`}
              onClick={() => {
                onSelectChapter(chapter.id);
                if (isMobileOpen) onCloseMobile();
              }}
            >
              <div className="flex items-start gap-3 min-w-0 pr-2">
                {/* Chapter Number Badge / Icon */}
                <div className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0 transition-colors ${
                  isActive 
                    ? 'bg-teal-400 text-slate-950 shadow-[0_0_10px_rgba(20,184,166,0.5)]' 
                    : isCompleted
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200'
                }`}>
                  {index + 1}
                </div>

                {/* Chapter Metadata */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      isActive 
                        ? 'bg-teal-400/20 text-teal-300' 
                        : 'bg-slate-800/80 text-slate-400'
                    }`}>
                      {chapter.badge}
                    </span>
                  </div>

                  <h3 className={`text-sm font-semibold mt-1 leading-snug truncate transition-colors ${
                    isActive ? 'text-white font-bold' : 'text-slate-200 group-hover:text-white'
                  }`}>
                    {chapter.title}
                  </h3>
                </div>
              </div>

              {/* Read Checkbox Toggle */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCompleteChapter(chapter.id);
                  }}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isCompleted 
                      ? 'text-teal-400 hover:text-teal-300 bg-teal-500/10' 
                      : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800'
                  }`}
                  title={isCompleted ? "Marcar como não lido" : "Marcar como lido"}
                  aria-label={isCompleted ? "Marcar como não lido" : "Marcar como lido"}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4 text-teal-400" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-400" />
                  )}
                </button>
                <ChevronRight className={`w-4 h-4 transition-transform ${
                  isActive ? 'text-teal-400 translate-x-0.5' : 'text-slate-400 group-hover:text-slate-300'
                }`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer info */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-900/50 text-center">
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
          <FileText className="w-4 h-4 text-teal-400" />
          <span>9 Arquivos PDF Inclusos</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed width on left) */}
      <aside className="hidden lg:block w-80 shrink-0 h-[calc(100vh-125px)] sticky top-[73px] z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop & Modal */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-85 max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-300">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
