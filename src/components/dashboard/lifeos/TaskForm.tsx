"use client";
import React, { useState } from "react";
import { createTask } from "@/lib/actions/lifeos/tasks.actions";

export function TaskForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    // Parse time input to a date for today
    let scheduledTime = undefined;
    const timeStr = formData.get("time") as string;
    if (timeStr) {
      const date = new Date();
      const [hours, minutes] = timeStr.split(":");
      date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
      scheduledTime = date;
    }

    try {
      await createTask({
        title: formData.get("title") as string,
        category: formData.get("category") as string,
        priority: formData.get("priority") as string,
        scheduledTime
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
        <label className="text-sm font-medium text-[var(--color-text-secondary)]">Task Title</label>
        <input 
          required 
          name="title" 
          placeholder="e.g. Publish new video" 
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
            <option value="Work">Work</option>
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
        <label className="text-sm font-medium text-[var(--color-text-secondary)]">Scheduled Time (Optional)</label>
        <input 
          type="time" 
          name="time" 
          className="w-full bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] rounded-xl px-4 py-2.5 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-border-strong)] transition-colors"
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="mt-4 w-full bg-[var(--color-text-primary)] text-[var(--color-bg-ivory)] font-medium rounded-xl py-3 transition-transform active:scale-[0.98] disabled:opacity-70"
      >
        {loading ? "Saving..." : "Create Task"}
      </button>
    </form>
  );
}
