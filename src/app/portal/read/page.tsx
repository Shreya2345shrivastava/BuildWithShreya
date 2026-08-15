"use client";

import { useState, useEffect } from "react";
import { Maximize2, Minimize2, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export default function ReadOnlinePage() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Determine iframe filter class
  const getPdfClass = () => {
    if (theme === 'midnight') return 'pdf-midnight';
    return 'pdf-light';
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-in fade-in duration-700">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-[#3A332D]">Read Online</h1>
          <p className="text-[var(--color-text-secondary)]">First Build It, Then Make It Beautiful</p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Theme Controls */}
          {mounted && (
            <div className="flex items-center p-1 rounded-full border border-black/[0.04] bg-white shadow-sm">
              <button
                onClick={() => setTheme('light')}
                className={cn(
                  "p-2 rounded-full transition-all duration-300",
                  theme === 'light' ? "bg-[#FCF8F2] text-[#D9895B] shadow-sm" : "text-[#8A837D] hover:text-[#3A332D]"
                )}
                title="Light Mode"
              >
                <Sun size={16} />
              </button>
              <button
                onClick={() => setTheme('midnight')}
                className={cn(
                  "p-2 rounded-full transition-all duration-300",
                  theme === 'midnight' ? "bg-[#181D1B] text-[#A8B69D] shadow-sm" : "text-[#8A837D] hover:text-[#3A332D]"
                )}
                title="Midnight Mode"
              >
                <Moon size={16} />
              </button>
            </div>
          )}

          <button 
            onClick={toggleFullscreen}
            className="flex items-center gap-2 rounded-full border border-black/[0.04] bg-white px-4 py-2.5 text-sm font-medium text-[#3A332D] shadow-sm transition-all hover:bg-[#FCF8F2]"
          >
            {isFullscreen ? (
              <>
                <Minimize2 size={16} /> <span className="hidden sm:inline">Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 size={16} /> <span className="hidden sm:inline">Read in Fullscreen</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className={cn(
        "relative flex-1 overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-700",
        theme === 'midnight' ? "border-[#2A332D] bg-[#0F1211]" : "border-black/[0.04]"
      )}>
        {mounted && (
           <iframe
             src="/uploads/FirstBuildEBook-18dbb855d0a07791.pdf#toolbar=0"
             className={cn(
               "absolute inset-0 h-full w-full rounded-2xl",
               getPdfClass()
             )}
             title="eBook Reader"
           />
        )}
      </div>
    </div>
  );
}
