"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Container } from "@/components/ui";

const previewPages = [
  { title: "Personal Note", subtitle: "From Shreya", src: "/images/previews/all/page-3.png" },
  { title: "Table of Contents", subtitle: "Overview", src: "/images/previews/all/page-4.png" },
  { title: "Introduction", subtitle: "Getting Started", src: "/images/previews/all/page-5.png" },
  { title: "Chapter 1", subtitle: "Complete", src: "/images/previews/all/page-6.png" },
  { title: "Reflection Page", subtitle: "Workbook", src: "/images/previews/all/page-27.png" },
];

export function PreviewGallery() {
  const [selectedPage, setSelectedPage] = useState<number | null>(null);

  // Keyboard Navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (selectedPage === null) return;
      if (e.key === "ArrowRight") {
        setSelectedPage(prev => (prev! < previewPages.length - 1 ? prev! + 1 : 0));
      } else if (e.key === "ArrowLeft") {
        setSelectedPage(prev => (prev! > 0 ? prev! - 1 : previewPages.length - 1));
      } else if (e.key === "Escape") {
        setSelectedPage(null);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPage]);

  // Touch Swipe Handling
  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { offset }: PanInfo) => {
    const swipeThreshold = 50; // pixels
    if (offset.x < -swipeThreshold) {
      setSelectedPage(prev => (prev! < previewPages.length - 1 ? prev! + 1 : 0));
    } else if (offset.x > swipeThreshold) {
      setSelectedPage(prev => (prev! > 0 ? prev! - 1 : previewPages.length - 1));
    }
  };

  return (
    <section aria-labelledby="preview-gallery-title" className="relative border-t border-black/[0.04] bg-[radial-gradient(ellipse_at_top_center,var(--color-bg-ivory),transparent_70%)] py-16 lg:py-32 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF9] to-white -z-10" />

      <Container width="wide">
        <div className="flex flex-col items-center text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            id="preview-gallery-title" 
            className="font-serif text-4xl font-medium tracking-tight text-[var(--color-text-primary)] sm:text-5xl"
          >
            A Peek Inside
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-6 flex items-center justify-center gap-2 text-[var(--color-accent-peach)]/60"
          >
            <div className="mr-2 h-px w-12 bg-[var(--color-accent-peach)]/20"></div>
            <span className="h-1 w-1 rounded-full bg-[var(--color-accent-peach)]"></span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-peach)] opacity-80"></span>
            <span className="h-1 w-1 rounded-full bg-[var(--color-accent-peach)]"></span>
            <div className="ml-2 h-px w-12 bg-[var(--color-accent-peach)]/20"></div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-6 text-[var(--color-text-secondary)] font-medium max-w-md mx-auto"
          >
            Click any page to read an excerpt from the book.
          </motion.p>
        </div>

        <div className="mt-10 lg:mt-20 flex overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-5 gap-6 lg:gap-x-10 pb-8 lg:pb-0 perspective-1000 scrollbar-hide">
          {previewPages.map((page, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              key={index} 
              className="group relative flex flex-col items-center cursor-pointer min-w-[70vw] sm:min-w-[45vw] lg:min-w-0 snap-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-peach)] rounded-lg"
              onClick={() => setSelectedPage(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedPage(index);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`View ${page.title} preview`}
            >
              {/* Premium Book Page Card */}
              <div className="relative w-full rounded-[4px] bg-[var(--color-bg-ivory)] dark:bg-[#131715] shadow-[0_10px_30px_rgba(32,25,19,0.08),inset_1px_1px_0px_rgba(255,255,255,0.9)] border-r border-b border-[var(--color-border-soft)] dark:border-[#2a332d]/80 transition-all duration-700 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] group-hover:-translate-y-6 group-hover:scale-[1.03] group-hover:shadow-[0_30px_60px_rgba(219,150,106,0.12),inset_1px_1px_0px_rgba(255,255,255,1)] group-hover:border-[var(--color-accent-peach)]/30 group-hover:rotate-y-2">
                {/* Book spine simulation */}
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/[0.06] via-black/[0.02] to-transparent z-10 pointer-events-none" />
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[var(--color-surface-elevated)] dark:bg-[#242b28]/40 z-20 pointer-events-none" />
                
                <div className="aspect-[3/4] w-full relative overflow-hidden rounded-[3px]">
                  <Image 
                    src={page.src} 
                    alt={page.title} 
                    fill 
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" 
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  {/* Subtle warm wash on hover */}
                  <div className="absolute inset-0 bg-[var(--color-accent-peach)]/0 transition-colors duration-700 group-hover:bg-[var(--color-accent-peach)]/5 z-20 pointer-events-none" />
                </div>
              </div>

              {/* Text beautifully placed below the image */}
              <div className="mt-8 flex flex-col items-center opacity-70 transition-all duration-500 group-hover:opacity-100 group-hover:-translate-y-2">
                <span className="font-serif text-lg font-medium text-[var(--color-text-primary)] transition-colors duration-300 group-hover:text-[var(--color-accent-peach)]">{page.title}</span>
                <span className="mt-1.5 text-[10px] tracking-[0.2em] text-[var(--color-text-secondary)] uppercase font-semibold">{page.subtitle}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* Lightbox Modal */}
      <AnimatePresence mode="wait">
        {selectedPage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F1211]/90 backdrop-blur-md p-4 sm:p-8"
            onClick={() => setSelectedPage(null)}
          >
            <button 
              className="absolute top-6 right-6 z-50 rounded-full bg-[var(--color-surface-elevated)] dark:bg-[#242b28]/10 p-3 text-white backdrop-blur-md transition-all hover:bg-[var(--color-surface-elevated)] dark:bg-[#242b28]/20 hover:scale-110"
              onClick={() => setSelectedPage(null)}
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>

            <motion.div
              key={selectedPage} // Forces re-animation when page changes
              initial={{ scale: 0.9, x: 50, opacity: 0 }}
              animate={{ scale: 1, x: 0, opacity: 1 }}
              exit={{ scale: 0.9, x: -50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative flex justify-center items-center h-full max-h-[90vh] w-full max-w-4xl touch-none cursor-grab active:cursor-grabbing"
              onClick={(e) => e.stopPropagation()}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
            >
              <div className="relative h-full w-full pointer-events-none">
                <Image
                  src={previewPages[selectedPage].src}
                  alt={previewPages[selectedPage].title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 1200px"
                  priority
                />
              </div>
            </motion.div>
            
            {/* Desktop Navigation overlays */}
            <div 
              className="hidden sm:flex absolute inset-y-0 left-0 w-1/4 items-center justify-start p-8 opacity-0 hover:opacity-100 transition-opacity cursor-pointer" 
              onClick={(e) => { e.stopPropagation(); setSelectedPage(prev => prev! > 0 ? prev! - 1 : previewPages.length - 1); }}
              role="button"
              aria-label="Previous page"
            >
              <div className="bg-black/20 text-white rounded-full p-3 backdrop-blur-md border border-white/10 hover:bg-black/40 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </div>
            </div>
            <div 
              className="hidden sm:flex absolute inset-y-0 right-0 w-1/4 items-center justify-end p-8 opacity-0 hover:opacity-100 transition-opacity cursor-pointer" 
              onClick={(e) => { e.stopPropagation(); setSelectedPage(prev => prev! < previewPages.length - 1 ? prev! + 1 : 0); }}
              role="button"
              aria-label="Next page"
            >
              <div className="bg-black/20 text-white rounded-full p-3 backdrop-blur-md border border-white/10 hover:bg-black/40 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </div>
            </div>
            
            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 font-medium tracking-widest text-sm bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10 pointer-events-none">
              {selectedPage + 1} / {previewPages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}