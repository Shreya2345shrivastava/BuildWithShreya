import React from "react";
import { Sparkles, Calendar } from "lucide-react";

export function WelcomeHeader() {
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4 text-[var(--color-text-muted)]" />
          <span className="text-sm font-medium tracking-wider uppercase text-[var(--color-text-muted)]">
            {date}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-[var(--color-text-primary)]">
          Good Morning, Shreya <span className="inline-block animate-bounce ml-1 text-2xl">🌸</span>
        </h1>
        <p className="text-[var(--color-text-secondary)] mt-2 font-medium">
          Ready to build your masterpiece today?
        </p>
      </div>

      <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border-soft)] rounded-2xl p-5 shadow-[var(--shadow-sm)] flex items-center gap-5 min-w-[240px]">
        <div className="w-12 h-12 rounded-full bg-[var(--color-bg-peach-tint)] text-[var(--color-accent-peach)] flex items-center justify-center">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-[var(--color-text-muted)] font-medium uppercase tracking-wider">
            Life Score
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-[var(--color-text-primary)]">
              85
            </span>
            <span className="text-sm text-[var(--color-text-secondary)]">/ 100</span>
          </div>
        </div>
      </div>
    </div>
  );
}
