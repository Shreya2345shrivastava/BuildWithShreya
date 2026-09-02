import React from "react";
import { Flame } from "lucide-react";

const STREAKS = [
  { title: "Study", days: 14 },
  { title: "Water", days: 7 },
  { title: "Reading", days: 23 },
  { title: "Worship", days: 30 },
];

export function StreakSection() {
  return (
    <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border-soft)] rounded-3xl p-6 shadow-[var(--shadow-sm)]">
      <div className="flex items-center gap-2 mb-6">
        <Flame className="w-5 h-5 text-orange-400" />
        <h2 className="text-lg font-serif text-[var(--color-text-primary)]">
          Current Streaks
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {STREAKS.map((streak) => (
          <div key={streak.title} className="flex flex-col items-center justify-center p-4 bg-[var(--color-bg-ivory)] rounded-2xl border border-[var(--color-border-subtle)]">
            <span className="text-2xl font-serif text-[var(--color-text-primary)] mb-1">
              {streak.days}
            </span>
            <span className="text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)]">
              {streak.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
