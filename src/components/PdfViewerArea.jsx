import React, { useState, useEffect } from 'react';
import { 
  Download, 
  CheckCircle2, 
  Circle, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Info, 
  Layers 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PdfViewerArea({
  chapter,
  isCompleted,
  onToggleComplete,
  onPrevChapter,
  onNextChapter,
  hasPrev,
  hasNext,
  onDownload
}) {
  const [isLoading, setIsLoading] = useState(true);

  // Trigger loading state briefly when chapter changes to ensure smooth visual transition
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [chapter.id]);

  const handleCompletion = () => {
    if (!isCompleted) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#14b8a6', '#10b981', '#38bdf8', '#f59e0b']
      });
    }
    onToggleComplete(chapter.id);
  };

  return (
    <main className="flex-1 flex flex-col min-w-0 h-full">
      {/* Top Header Card of Central Viewing Area */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl mb-4 border border-slate-800/80 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Chapter Title & Info */}
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/10 text-teal-400 border border-teal-500/30">
                {chapter.badge}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-slate-400" /> {chapter.pages} páginas
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
              {chapter.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 line-clamp-1">
              {chapter.summary}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap shrink-0">
            {/* Mark as completed button */}
            <button
              onClick={handleCompletion}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                isCompleted
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-900/60 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                  : 'bg-slate-900 text-slate-300 border border-slate-700/80 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Concluído</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4 text-slate-400" />
                  <span>Marcar Lido</span>
                </>
              )}
            </button>

            {/* Download Button */}
            <button
              onClick={onDownload}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(20,184,166,0.3)] transition-all duration-200 active:scale-95"
              title="Baixar PDF deste capítulo"
            >
              <Download className="w-4 h-4" />
              <span>Baixar Material</span>
            </button>
          </div>
        </div>

        {/* Secondary Bar: Navigation & Fullscreen Controls */}
        <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex items-center justify-between gap-3 text-xs">
          {/* Previous / Next buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onPrevChapter}
              disabled={!hasPrev}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                hasPrev 
                  ? 'bg-slate-900 text-slate-200 border-slate-700 hover:bg-slate-800 hover:text-white' 
                  : 'bg-slate-950 text-slate-600 border-slate-900 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Anterior</span>
            </button>

            <button
              onClick={onNextChapter}
              disabled={!hasNext}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                hasNext 
                  ? 'bg-teal-500/10 text-teal-300 border-teal-500/30 hover:bg-teal-500/20 hover:text-teal-200' 
                  : 'bg-slate-950 text-slate-600 border-slate-900 cursor-not-allowed'
              }`}
            >
              <span className="hidden sm:inline">Próximo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick External Open */}
          <div className="flex items-center gap-2">
            <a
              href={chapter.path}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-400 hover:text-teal-300 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-slate-900 border border-slate-800/80"
              title="Abrir PDF em nova aba"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Abrir em Nova Aba</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Interactive PDF Container */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl transition-all duration-300 flex flex-col h-[75vh] min-h-[550px] lg:h-[calc(100vh-270px)]">

        {/* Loading Spinner overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-20 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 border-3 border-teal-500/30 border-t-teal-400 rounded-full animate-spin" />
            <p className="text-xs text-slate-400 font-medium">Carregando capítulo PDF...</p>
          </div>
        )}

        {/* Embedded PDF Object with iFrame Fallback */}
        <div className="relative w-full flex-1 bg-[#1e1e1e]">
          <object
            data={chapter.path}
            type="application/pdf"
            className="w-full h-full border-none"
          >
            <iframe
              src={`${chapter.path}#toolbar=1&navpanes=0&scrollbar=1`}
              title={chapter.title}
              className="w-full h-full border-none"
            >
              <div className="p-8 text-center text-slate-300 flex flex-col items-center justify-center h-full gap-4">
                <Info className="w-12 h-12 text-teal-400" />
                <p className="text-base font-semibold">Seu navegador não suporta a visualização nativa de PDF inline.</p>
                <a
                  href={chapter.path}
                  download={chapter.file}
                  className="px-5 py-2.5 rounded-xl bg-teal-500 text-slate-950 font-bold hover:bg-teal-400 transition-all"
                >
                  Clique aqui para baixar o PDF ({chapter.file})
                </a>
              </div>
            </iframe>
          </object>
        </div>
      </div>
    </main>
  );
}
