"use client";

import React, { useState } from "react";
import { Plus, Send } from "lucide-react";

export function CommandCenterQuickCapture() {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    // Handle save logic
    setValue("");
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-xl px-4 z-50">
      <form 
        onSubmit={handleSubmit}
        className="flex items-center gap-2 p-2 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 rounded-full shadow-lg"
      >
        <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0">
          <Plus className="w-5 h-5 text-neutral-500" />
        </div>
        <input 
          type="text" 
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Capture an idea, task, or thought..."
          className="flex-1 bg-transparent border-none outline-none text-neutral-700 dark:text-neutral-200 placeholder:text-neutral-400 px-2"
        />
        <button 
          type="submit"
          disabled={!value.trim()}
          className="w-10 h-10 rounded-full bg-neutral-800 dark:bg-neutral-200 flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          <Send className="w-4 h-4 text-white dark:text-neutral-900 ml-0.5" />
        </button>
      </form>
    </div>
  );
}
