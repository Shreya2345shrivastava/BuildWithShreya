"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { ITask as Task } from "@/types/lifeos";

interface Props {
  tasks: Task[];
}

export function TodaysFocus({ tasks }: Props) {
  // Take top 3 tasks for focus
  const focusTasks = tasks.slice(0, 3);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const toggleTask = (id: string) => {
    setCompletedIds(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-medium text-neutral-800 dark:text-neutral-100">Today's Focus</h2>
      <div className="flex flex-col gap-3">
        {focusTasks.length > 0 ? focusTasks.map(task => (
          <div 
            key={task._id}
            onClick={() => toggleTask(task._id)}
            className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm cursor-pointer transition-all hover:border-neutral-300 dark:hover:border-neutral-700"
          >
            <div className={`w-6 h-6 rounded-md flex items-center justify-center border transition-colors ${
              completedIds.includes(task._id) 
                ? "bg-neutral-800 border-neutral-800 dark:bg-neutral-200 dark:border-neutral-200" 
                : "border-neutral-300 dark:border-neutral-700"
            }`}>
              {completedIds.includes(task._id) && <Check className="w-4 h-4 text-white dark:text-neutral-900" />}
            </div>
            <span className={`text-lg transition-all ${
              completedIds.includes(task._id) ? "text-neutral-400 line-through" : "text-neutral-700 dark:text-neutral-200"
            }`}>
              {task.title}
            </span>
          </div>
        )) : (
          <div className="p-8 rounded-2xl bg-cream-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 flex flex-col items-center justify-center text-center gap-3">
            <span className="text-3xl mb-1">🎯</span>
            <div>
              <p className="text-neutral-800 dark:text-neutral-200 font-medium font-serif">No focus tasks set.</p>
              <p className="text-sm text-neutral-500 mt-1 max-w-xs">Let's build something meaningful today. What's the one thing that will move the needle?</p>
            </div>
            <button className="mt-3 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium rounded-full shadow-sm hover:scale-105 transition-transform">
              Set Today's Focus
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
