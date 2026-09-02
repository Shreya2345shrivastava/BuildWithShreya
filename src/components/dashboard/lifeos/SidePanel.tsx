import React, { useEffect } from "react";
import { X, TrendingUp } from "lucide-react";
import { ILifeArea } from "@/types/lifeos";
import { motion, AnimatePresence } from "framer-motion";

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  area: ILifeArea | null;
}

export function SidePanel({ isOpen, onClose, area }: SidePanelProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && area && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-sm bg-[var(--color-surface-elevated)] h-full border-l border-[var(--color-border-soft)] shadow-2xl flex flex-col"
          >
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border-subtle)]">
              <div>
                <h3 className="text-2xl font-serif text-[var(--color-text-primary)]">{area.name}</h3>
                <p className="text-sm font-medium text-[var(--color-text-secondary)] mt-1">Area Detail & History</p>
              </div>
              <button 
                onClick={onClose}
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors rounded-full p-2 hover:bg-[var(--color-surface-primary)]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
              
              <div className="flex flex-col items-center justify-center bg-[var(--color-surface-primary)] rounded-2xl py-8 border border-[var(--color-border-subtle)]">
                <span className="text-5xl font-bold text-[var(--color-text-primary)]">{area.score}</span>
                <span className="text-sm text-[var(--color-text-secondary)] mt-2 uppercase tracking-wider font-semibold">Current Score</span>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[var(--color-text-primary)]">
                  <TrendingUp size={18} className="text-[var(--color-botanical-leaf)]" />
                  <h4 className="font-semibold text-lg">Consistency Streak</h4>
                </div>
                <div className="bg-[var(--color-surface-primary)] rounded-xl p-4 border border-[var(--color-border-subtle)]">
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--color-text-secondary)] font-medium">Current</span>
                    <span className="text-xl font-bold text-[var(--color-text-primary)]">{area.streak} Days</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="font-semibold text-lg text-[var(--color-text-primary)]">Insights</h4>
                <div className="bg-[var(--color-surface-primary)] rounded-xl p-4 border border-[var(--color-border-subtle)] text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {area.insights || `You are maintaining a steady focus on your ${area.name}. Keep prioritizing small daily actions to grow this score.`}
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
