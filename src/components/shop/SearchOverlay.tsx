"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open & Handle ESC to close
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const searchResults = {
    Templates: ["Minimal Portfolio", "SaaS Starter Kit", "Creator Hub"],
    Books: ["Build It Beautiful", "Launch Fast"],
    LifeOS: ["Creator LifeOS", "Freelance Dashboard"]
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-white/95 dark:bg-[#131715]/95 backdrop-blur-xl flex flex-col"
        >
          {/* Header */}
          <div className="w-full max-w-[1000px] mx-auto px-6 py-8 flex items-center justify-between border-b border-black/5 dark:border-white/5">
            <div className="flex-1 flex items-center gap-4">
              <Search size={28} className="text-black/30 dark:text-white/30" />
              <input 
                ref={inputRef}
                type="text" 
                placeholder="Search for templates, books, resources..." 
                className="w-full bg-transparent text-2xl md:text-4xl font-serif text-black dark:text-white placeholder:text-black/20 dark:placeholder:text-white/20 focus:outline-none"
              />
            </div>
            <button 
              onClick={onClose}
              className="ml-6 p-3 rounded-full bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Results Area */}
          <div className="flex-1 overflow-y-auto w-full max-w-[1000px] mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {Object.entries(searchResults).map(([category, items], idx) => (
                <motion.div 
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                >
                  <h3 className="text-sm font-bold tracking-widest uppercase text-black/40 dark:text-white/40 mb-6">
                    {category}
                  </h3>
                  <ul className="space-y-2">
                    {items.map((item, i) => (
                      <li key={i}>
                        <button className="w-full group flex items-center justify-between p-4 -mx-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all text-left">
                          <span className="text-lg font-medium text-black/80 dark:text-white/80 group-hover:text-[var(--color-accent-peach)] transition-colors">
                            {item}
                          </span>
                          <ArrowRight size={16} className="text-black/20 dark:text-white/20 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all group-hover:text-[var(--color-accent-peach)]" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="py-6 text-center text-sm text-black/40 dark:text-white/40">
            Press ESC to close
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
