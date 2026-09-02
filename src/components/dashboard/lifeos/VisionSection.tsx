import React from "react";
import { Telescope, Calendar, CalendarDays, Target } from "lucide-react";

export function VisionSection() {
  return (
    <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border-soft)] rounded-3xl p-6 md:p-8 shadow-[var(--shadow-sm)]">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl md:text-2xl font-serif text-[var(--color-text-primary)]">
          Vision Alignment
        </h2>
      </div>

      <div className="relative flex flex-col gap-6">
        {/* Connecting line */}
        <div className="absolute left-[23px] top-[24px] bottom-[24px] w-[2px] bg-gradient-to-b from-[var(--color-accent-gold)] via-[var(--color-botanical-moss)] to-[var(--color-accent-peach)] opacity-20"></div>

        {/* 2026 Vision */}
        <div className="relative flex gap-4">
          <div className="w-12 h-12 shrink-0 rounded-full bg-[var(--color-bg-ivory)] border-2 border-[var(--color-accent-gold)] flex items-center justify-center text-[var(--color-accent-gold)] z-10 shadow-sm">
            <Telescope className="w-5 h-5" />
          </div>
          <div className="pt-1">
            <p className="text-xs uppercase tracking-widest font-bold text-[var(--color-accent-gold)] mb-1">
              2026 Vision
            </p>
            <p className="text-lg font-medium text-[var(--color-text-primary)]">
              Become Full Stack Developer
            </p>
          </div>
        </div>

        {/* This Month */}
        <div className="relative flex gap-4">
          <div className="w-12 h-12 shrink-0 rounded-full bg-[var(--color-bg-ivory)] border-2 border-[var(--color-botanical-moss)] flex items-center justify-center text-[var(--color-botanical-moss)] z-10 shadow-sm">
            <CalendarDays className="w-5 h-5" />
          </div>
          <div className="pt-1">
            <p className="text-xs uppercase tracking-widest font-bold text-[var(--color-botanical-moss)] mb-1">
              This Month
            </p>
            <p className="text-base font-medium text-[var(--color-text-primary)]">
              Finish JavaScript Foundations
            </p>
          </div>
        </div>

        {/* This Week */}
        <div className="relative flex gap-4">
          <div className="w-12 h-12 shrink-0 rounded-full bg-[var(--color-bg-ivory)] border-2 border-[var(--color-botanical-leaf)] flex items-center justify-center text-[var(--color-botanical-leaf)] z-10 shadow-sm">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="pt-1">
            <p className="text-xs uppercase tracking-widest font-bold text-[var(--color-botanical-leaf)] mb-1">
              This Week
            </p>
            <p className="text-sm font-medium text-[var(--color-text-primary)]">
              Closures, Promises, Async/Await
            </p>
          </div>
        </div>

        {/* Today */}
        <div className="relative flex gap-4">
          <div className="w-12 h-12 shrink-0 rounded-full bg-[var(--color-accent-peach)] flex items-center justify-center text-[var(--color-bg-ivory)] z-10 shadow-md">
            <Target className="w-5 h-5" />
          </div>
          <div className="pt-1">
            <p className="text-xs uppercase tracking-widest font-bold text-[var(--color-accent-peach)] mb-1">
              Today
            </p>
            <p className="text-lg font-serif font-bold text-[var(--color-text-primary)]">
              2 Hours Study
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
