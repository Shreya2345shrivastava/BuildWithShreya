import React from "react";
import { Flag, Plus } from "lucide-react";

interface Props {
  onCreateGoal: () => void;
}

export function GoalsEmptyState({ onCreateGoal }: Props) {
  return (
    <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] rounded-2xl p-12 flex flex-col items-center justify-center text-center gap-6 my-4 shadow-sm">
      <div className="w-16 h-16 bg-[var(--color-surface-elevated)] text-[var(--color-accent-peach)] rounded-full flex items-center justify-center shadow-inner">
        <span className="text-3xl">🎯</span>
      </div>
      <div className="flex flex-col gap-2 max-w-sm">
        <h3 className="text-xl font-serif text-[var(--color-text-primary)]">No goals yet</h3>
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
          Create your first goal to start building your life system. Break it down into milestones, link habits, and track your progress.
        </p>
      </div>
      <button 
        onClick={onCreateGoal} 
        className="mt-2 flex items-center gap-2 px-6 py-3 bg-[var(--color-accent-peach)] text-white rounded-xl text-sm font-medium hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg"
      >
        <Plus className="w-4 h-4" /> Create Goal
      </button>
    </div>
  );
}
