"use client";
import React, { useState } from "react";
import { createGoal } from "@/lib/actions/lifeos/goals.actions";

export function GoalForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      await createGoal({
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        priority: formData.get("priority") as string,
        goalType: formData.get("goalType") as string,
        status: "not_started",
        progress: 0,
        targetDate: new Date(formData.get("targetDate") as string)
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
        <label className="text-sm font-medium text-[var(--color-text-secondary)]">Goal Title</label>
        <input 
          required 
          name="title" 
          placeholder="e.g. Launch new SaaS product" 
          className="w-full bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] rounded-xl px-4 py-2.5 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-border-strong)] transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--color-text-secondary)]">Description</label>
        <textarea 
          name="description" 
          rows={2}
          className="w-full bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] rounded-xl px-4 py-2.5 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-border-strong)] transition-colors resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--color-text-secondary)]">Category</label>
          <select name="category" className="w-full bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] rounded-xl px-4 py-2.5 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-border-strong)] transition-colors appearance-none">
            <option value="Creator">Creator</option>
            <option value="Health">Health</option>
            <option value="Learning">Learning</option>
            <option value="Spiritual">Spiritual</option>
            <option value="Beauty">Beauty</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--color-text-secondary)]">Priority</label>
          <select name="priority" className="w-full bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] rounded-xl px-4 py-2.5 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-border-strong)] transition-colors appearance-none">
            <option value="P1">P1 - High</option>
            <option value="P2">P2 - Medium</option>
            <option value="P3">P3 - Low</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--color-text-secondary)]">Goal Type</label>
        <select name="goalType" className="w-full bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] rounded-xl px-4 py-2.5 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-border-strong)] transition-colors appearance-none">
          <option value="Year">Year (Long-term)</option>
          <option value="Quarter">Quarter</option>
          <option value="Month">Month</option>
          <option value="Week">Week</option>
          <option value="Today">Today (Short-term)</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--color-text-secondary)]">Target Date</label>
        <input 
          type="date" 
          name="targetDate" 
          required
          className="w-full bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] rounded-xl px-4 py-2.5 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-border-strong)] transition-colors"
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="mt-4 w-full bg-[var(--color-text-primary)] text-[var(--color-bg-ivory)] font-medium rounded-xl py-3 transition-transform active:scale-[0.98] disabled:opacity-70"
      >
        {loading ? "Saving..." : "Create Goal"}
      </button>
    </form>
  );
}
