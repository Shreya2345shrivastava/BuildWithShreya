import React from "react";
import { CheckCircle2, Circle } from "lucide-react";

const MOCK_TOP_THREE = [
  {
    id: 1,
    title: "Draft Next.js Architecture Guide",
    category: "Creator",
    completed: true,
  },
  {
    id: 2,
    title: "Complete 1 hour Deep Work Session",
    category: "Learning",
    completed: false,
  },
  {
    id: 3,
    title: "Evening Skincare Routine & Read 10 Pages",
    category: "Beauty & Health",
    completed: false,
  },
];

export function TopThree() {
  return (
    <section className="bg-[var(--color-surface-elevated)] border border-[var(--color-border-soft)] rounded-3xl p-6 md:p-8 shadow-[var(--shadow-sm)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-serif text-[var(--color-text-primary)]">
            Today's Top 3
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Focus on what moves the needle.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {MOCK_TOP_THREE.map((task, index) => (
          <div
            key={task.id}
            className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
              task.completed
                ? "bg-[var(--color-bg-sage-tint)] border-transparent opacity-80"
                : "bg-[var(--color-surface-primary)] border-[var(--color-border-subtle)] hover:border-[var(--color-border-strong)]"
            }`}
          >
            <button className="flex-shrink-0 text-[var(--color-botanical-leaf)] hover:text-[var(--color-botanical-moss)] transition-colors">
              {task.completed ? (
                <CheckCircle2 className="w-6 h-6" />
              ) : (
                <Circle className="w-6 h-6" />
              )}
            </button>
            <div className="flex-1">
              <p
                className={`font-medium ${
                  task.completed
                    ? "text-[var(--color-text-secondary)] line-through"
                    : "text-[var(--color-text-primary)]"
                }`}
              >
                {task.title}
              </p>
              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-semibold mt-1">
                {task.category}
              </p>
            </div>
            <div className="text-sm font-bold text-[var(--color-text-muted)] opacity-30">
              0{index + 1}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
