import React from "react";

const MOCK_AREAS = [
  { name: "Health", progress: 85, color: "bg-[var(--color-botanical-leaf)]" },
  { name: "Learning", progress: 60, color: "bg-[var(--color-accent-peach)]" },
  { name: "Creator", progress: 90, color: "bg-[var(--color-accent-gold)]" },
  { name: "Spiritual", progress: 40, color: "bg-[var(--color-botanical-moss)]" },
  { name: "Beauty", progress: 100, color: "bg-[var(--color-text-secondary)]" },
];

export function LifeAreas() {
  return (
    <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border-soft)] rounded-3xl p-6 md:p-8 shadow-[var(--shadow-sm)]">
      <h2 className="text-xl font-serif text-[var(--color-text-primary)] mb-6">
        Life Areas
      </h2>

      <div className="flex flex-col gap-5">
        {MOCK_AREAS.map((area) => (
          <div key={area.name}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                {area.name}
              </span>
              <span className="text-xs font-bold text-[var(--color-text-muted)]">
                {area.progress}%
              </span>
            </div>
            <div className="h-2 w-full bg-[var(--color-bg-ivory)] rounded-full overflow-hidden border border-[var(--color-border-subtle)]">
              <div
                className={`h-full rounded-full ${area.color} transition-all duration-1000 ease-out`}
                style={{ width: `${area.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
