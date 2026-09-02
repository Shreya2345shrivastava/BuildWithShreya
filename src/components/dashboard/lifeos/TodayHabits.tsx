import React from "react";
import { Check, Droplets, Moon, Sun } from "lucide-react";

const MOCK_HABITS = [
  { id: 1, title: "Morning Skincare", icon: Sun, completed: true },
  { id: 2, title: "Drink 2L Water", icon: Droplets, completed: false },
  { id: 3, title: "Evening Routine", icon: Moon, completed: false },
];

export function TodayHabits() {
  return (
    <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border-soft)] rounded-3xl p-6 md:p-8 shadow-[var(--shadow-sm)]">
      <h2 className="text-xl md:text-2xl font-serif text-[var(--color-text-primary)] mb-6">
        Daily Habits
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {MOCK_HABITS.map((habit) => (
          <button
            key={habit.id}
            className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-200 gap-3 ${
              habit.completed
                ? "bg-[var(--color-bg-sage-tint)] border-[var(--color-botanical-leaf)] text-[var(--color-botanical-leaf)]"
                : "bg-[var(--color-surface-primary)] border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-secondary)]"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center border ${
                habit.completed
                  ? "bg-white border-[var(--color-botanical-leaf)] text-[var(--color-botanical-leaf)] shadow-sm"
                  : "bg-[var(--color-bg-ivory)] border-transparent"
              }`}
            >
              {habit.completed ? (
                <Check className="w-5 h-5" />
              ) : (
                <habit.icon className="w-5 h-5" />
              )}
            </div>
            <span className="text-sm font-semibold tracking-wide">
              {habit.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
