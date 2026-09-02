import React from "react";
import { BookOpen, Clock } from "lucide-react";

export function TodayStudy() {
  return (
    <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border-soft)] rounded-3xl p-6 md:p-8 shadow-[var(--shadow-sm)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-serif text-[var(--color-text-primary)]">
            Today's Study
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Current Focus Area
          </p>
        </div>
      </div>

      <div className="bg-[var(--color-bg-ivory)] border border-[var(--color-border-subtle)] rounded-2xl p-5 flex flex-col md:flex-row gap-5 items-start md:items-center">
        <div className="w-14 h-14 rounded-2xl bg-[var(--color-surface-elevated)] shadow-sm border border-[var(--color-border-soft)] flex flex-shrink-0 items-center justify-center text-[var(--color-botanical-moss)]">
          <BookOpen className="w-6 h-6" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-peach)] bg-[var(--color-bg-peach-tint)] px-2 py-0.5 rounded-full">
              System Design
            </span>
          </div>
          <h3 className="font-medium text-[var(--color-text-primary)] text-lg">
            Grokking the System Design Interview
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Chapter 4: Designing a Rate Limiter
          </p>
        </div>

        <div className="flex items-center gap-2 text-[var(--color-text-muted)] bg-[var(--color-surface-elevated)] px-4 py-2 rounded-full border border-[var(--color-border-subtle)] shadow-sm self-start md:self-center">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-semibold">45 min</span>
        </div>
      </div>
    </div>
  );
}
