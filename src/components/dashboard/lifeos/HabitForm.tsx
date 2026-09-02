"use client";
import React, { useState } from "react";
import { createHabit } from "@/lib/actions/lifeos/habits.actions";

export function HabitForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      await createHabit({
        title: formData.get("title") as string,
        category: formData.get("category") as string,
        frequency: formData.get("frequency") as string,
        streak: 0,
        completionHistory: []
      });
      onSuccess();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--color-text-secondary)]">Habit Title</label>
        <input 
          required 
          name="title" 
          placeholder="e.g. Morning Meditation" 
          className="w-full bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] rounded-xl px-4 py-2.5 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-border-strong)] transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--color-text-secondary)]">Category</label>
          <select name="category" className="w-full bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] rounded-xl px-4 py-2.5 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-border-strong)] transition-colors appearance-none">
            <option value="Health">Health</option>
            <option value="Learning">Learning</option>
            <option value="Creator">Creator</option>
            <option value="Spiritual">Spiritual</option>
            <option value="Beauty">Beauty</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--color-text-secondary)]">Frequency</label>
          <select name="frequency" className="w-full bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] rounded-xl px-4 py-2.5 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-border-strong)] transition-colors appearance-none">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="mt-4 w-full bg-[var(--color-text-primary)] text-[var(--color-bg-ivory)] font-medium rounded-xl py-3 transition-transform active:scale-[0.98] disabled:opacity-70"
      >
        {loading ? "Saving..." : "Create Habit"}
      </button>
    </form>
  );
}
