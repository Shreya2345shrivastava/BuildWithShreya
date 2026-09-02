"use client";
import React, { useState } from "react";
import { createTimelineEvent, deleteTimelineEvent } from "@/lib/actions/lifeos/events.actions";
import { ITimelineEvent } from "@/types/lifeos";
import { Trash2 } from "lucide-react";

export function TimelineForm({ onSuccess, initialData }: { onSuccess: () => void, initialData?: ITimelineEvent | null }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    // Parse times
    const startTimeStr = formData.get("startTime") as string;
    const endTimeStr = formData.get("endTime") as string;
    
    const startTime = new Date();
    const endTime = new Date();
    
    const [sHours, sMins] = startTimeStr.split(":");
    startTime.setHours(parseInt(sHours), parseInt(sMins), 0, 0);
    
    const [eHours, eMins] = endTimeStr.split(":");
    endTime.setHours(parseInt(eHours), parseInt(eMins), 0, 0);

    try {
      const payload: any = {
        title: formData.get("title") as string,
        type: formData.get("type") as string,
        startTime,
        endTime
      };
      if (initialData?._id) payload._id = initialData._id;

      await createTimelineEvent(payload);
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
        <label className="text-sm font-medium text-[var(--color-text-secondary)]">Event Title</label>
        <input 
          required 
          name="title" 
          defaultValue={initialData?.title}
          placeholder="e.g. Deep Work Session" 
          className="w-full bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] rounded-xl px-4 py-2.5 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-border-strong)] transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--color-text-secondary)]">Type</label>
        <select name="type" defaultValue={initialData?.type || "Focus"} className="w-full bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] rounded-xl px-4 py-2.5 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-border-strong)] transition-colors appearance-none">
          <option value="Focus">Focus</option>
          <option value="Health">Health</option>
          <option value="Learning">Learning</option>
          <option value="Spiritual">Spiritual</option>
          <option value="Rest">Rest</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--color-text-secondary)]">Start Time</label>
          <input 
            type="time" 
            name="startTime" 
            required
            defaultValue={initialData?.startTime ? new Date(initialData.startTime).toTimeString().slice(0, 5) : ""}
            className="w-full bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] rounded-xl px-4 py-2.5 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-border-strong)] transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--color-text-secondary)]">End Time</label>
          <input 
            type="time" 
            name="endTime"
            required 
            defaultValue={initialData?.endTime ? new Date(initialData.endTime).toTimeString().slice(0, 5) : ""}
            className="w-full bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] rounded-xl px-4 py-2.5 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-border-strong)] transition-colors"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button 
          type="submit" 
          disabled={loading}
          className="flex-1 bg-[var(--color-text-primary)] text-[var(--color-bg-ivory)] font-medium rounded-xl py-3 transition-transform active:scale-[0.98] disabled:opacity-70"
        >
          {loading ? "Saving..." : initialData ? "Save Changes" : "Add to Timeline"}
        </button>
        
        {initialData && (
          <button 
            type="button"
            disabled={loading}
            className="px-4 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-xl transition-colors flex items-center justify-center disabled:opacity-70"
            onClick={async () => {
              setLoading(true);
              try {
                await deleteTimelineEvent(initialData._id);
                onSuccess();
              } catch (e) {
                console.error(e);
                setLoading(false);
              }
            }}
          >
            <Trash2 size={20} />
          </button>
        )}
      </div>
    </form>
  );
}
