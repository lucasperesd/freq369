import React, { useState, useEffect } from 'react';
import { CHAPTERS } from './data/chapters';
import BannerTop from './components/BannerTop';
import HeaderNav from './components/HeaderNav';
import Sidebar from './components/Sidebar';
import PdfViewerArea from './components/PdfViewerArea';
import FooterBar from './components/FooterBar';

export default function App() {
  // Active chapter state (persisted or defaults to chapter 1)
  const [activeChapterId, setActiveChapterId] = useState(() => {
    const saved = localStorage.getItem('frequencia369_active_chapter');
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (CHAPTERS.some(c => c.id === parsed)) return parsed;
    }
    return 1;
  });

  // Completed chapters state
  const [completedChapters, setCompletedChapters] = useState(() => {
    const saved = localStorage.getItem('frequencia369_completed_chapters');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Mobile menu drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem('frequencia369_active_chapter', activeChapterId.toString());
  }, [activeChapterId]);

  useEffect(() => {
    localStorage.setItem('frequencia369_completed_chapters', JSON.stringify(completedChapters));
  }, [completedChapters]);

  const activeChapter = CHAPTERS.find(c => c.id === activeChapterId) || CHAPTERS[0];
  const activeIndex = CHAPTERS.findIndex(c => c.id === activeChapterId);

  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < CHAPTERS.length - 1;

  const handlePrevChapter = () => {
    if (hasPrev) {
      setActiveChapterId(CHAPTERS[activeIndex - 1].id);
    }
  };

  const handleNextChapter = () => {
    if (hasNext) {
      setActiveChapterId(CHAPTERS[activeIndex + 1].id);
    }
  };

  const handleToggleComplete = (chapterId) => {
    setCompletedChapters(prev => {
      if (prev.includes(chapterId)) {
        return prev.filter(id => id !== chapterId);
      } else {
        return [...prev, chapterId];
      }
    });
  };

  const handleDownloadActive = () => {
    const link = document.createElement('a');
    link.href = activeChapter.path;
    link.download = activeChapter.file;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Keyboard navigation listener (Left / Right Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if user is typing inside an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (e.key === 'ArrowLeft' && hasPrev) {
        handlePrevChapter();
      } else if (e.key === 'ArrowRight' && hasNext) {
        handleNextChapter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, hasPrev, hasNext]);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans">
      {/* 1. MENSAGEM DE BOAS-VINDAS (Banner Global Topo) */}
      <BannerTop />

      {/* Header Bar */}
      <HeaderNav 
        activeChapter={activeChapter}
        completedChapters={completedChapters}
        totalChapters={CHAPTERS.length}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onDownloadActive={handleDownloadActive}
      />

      {/* 2. LAYOUT PRINCIPAL (Divisão de Tela: Sidebar + Central Area) */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 md:px-6 pt-4 sm:pt-6 flex gap-6">
        {/* 3. SIDEBAR (Navegação dos Capítulos) */}
        <Sidebar 
          chapters={CHAPTERS}
          activeChapterId={activeChapterId}
          onSelectChapter={setActiveChapterId}
          completedChapters={completedChapters}
          toggleCompleteChapter={handleToggleComplete}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* 4. ÁREA CENTRAL (Visualizador de PDF) */}
        <PdfViewerArea 
          chapter={activeChapter}
          isCompleted={completedChapters.includes(activeChapter.id)}
          onToggleComplete={handleToggleComplete}
          onPrevChapter={handlePrevChapter}
          onNextChapter={handleNextChapter}
          hasPrev={hasPrev}
          hasNext={hasNext}
          onDownload={handleDownloadActive}
        />
      </div>

      {/* Footer */}
      <FooterBar />
    </div>
  );
}
