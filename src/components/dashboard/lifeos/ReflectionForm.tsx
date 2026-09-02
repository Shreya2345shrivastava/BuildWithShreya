"use client";
import React, { useState } from "react";
import { createReflection } from "@/lib/actions/lifeos/reflections.actions";

export function ReflectionForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      await createReflection({
        note: formData.get("note") as string,
        mood: formData.get("mood") as string,
        gratitude: formData.get("gratitude") as string,
        date: new Date()
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
        <label className="text-sm font-medium text-[var(--color-text-secondary)]">Current Mood</label>
        <select name="mood" className="w-full bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] rounded-xl px-4 py-2.5 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-border-strong)] transition-colors appearance-none">
          <option value="Focused ??">Focused ??</option>
          <option value="Calm ??">Calm ??</option>
          <option value="Energetic ?">Energetic ?</option>
          <option value="Tired ??">Tired ??</option>
          <option value="Stressed ???">Stressed ???</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--color-text-secondary)]">What's on your mind?</label>
        <textarea 
          required 
          name="note" 
          rows={4}
          placeholder="Journal your thoughts..." 
          className="w-full bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] rounded-xl px-4 py-2.5 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-border-strong)] transition-colors resize-none"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--color-text-secondary)]">Gratitude (Optional)</label>
        <input 
          name="gratitude" 
          placeholder="I am grateful for..." 
          className="w-full bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] rounded-xl px-4 py-2.5 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-border-strong)] transition-colors"
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="mt-4 w-full bg-[var(--color-text-primary)] text-[var(--color-bg-ivory)] font-medium rounded-xl py-3 transition-transform active:scale-[0.98] disabled:opacity-70"
      >
        {loading ? "Saving..." : "Save Reflection"}
      </button>
    </form>
  );
}
