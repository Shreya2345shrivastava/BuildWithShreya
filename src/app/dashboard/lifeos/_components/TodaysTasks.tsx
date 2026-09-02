"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { ITask as Task } from "@/types/lifeos";

interface Props {
  tasks: Task[];
}

export function TodaysTasks({ tasks }: Props) {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [celebrationId, setCelebrationId] = useState<string | null>(null);

  const toggleTask = (id: string) => {
    if (completedIds.includes(id)) {
      setCompletedIds(prev => prev.filter(t => t !== id));
      setCelebrationId(null);
    } else {
      setCompletedIds(prev => [...prev, id]);
      setCelebrationId(id);
      // Clear celebration message after a delay
      setTimeout(() => setCelebrationId(null), 3000);
    }
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-serif text-neutral-800 dark:text-neutral-100">Today's Tasks</h2>
        <span className="text-sm font-medium text-neutral-500">{completedIds.length} of {tasks.length} completed</span>
      </div>
      
      <div className="flex flex-col gap-4">
        {tasks.length > 0 ? tasks.map(task => (
          <div key={task._id} className="relative">
            <div 
              onClick={() => toggleTask(task._id)}
              className={`group flex items-center gap-5 p-5 rounded-2xl border transition-all cursor-pointer duration-300 ${
                completedIds.includes(task._id)
                  ? "bg-neutral-50 dark:bg-neutral-900/30 border-transparent opacity-60"
                  : "bg-white dark:bg-neutral-900 border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-neutral-200 dark:hover:border-neutral-700"
              }`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all duration-300 ${
                completedIds.includes(task._id) 
                  ? "bg-neutral-900 border-neutral-900 dark:bg-white dark:border-white scale-90" 
                  : "border-neutral-300 dark:border-neutral-600 group-hover:border-neutral-400"
              }`}>
                {completedIds.includes(task._id) && <Check className="w-4 h-4 text-white dark:text-neutral-900" />}
              </div>
              <span className={`text-lg transition-all duration-300 ${
                completedIds.includes(task._id) 
                  ? "text-neutral-400 line-through" 
                  : "text-neutral-800 dark:text-neutral-200"
              }`}>
                {task.title}
              </span>
            </div>

            {/* Tiny Celebration Toast */}
            {celebrationId === task._id && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 px-4 py-2 rounded-xl shadow-lg border border-neutral-100 dark:border-neutral-700 text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-300 z-10 whitespace-nowrap">
                🎉 Great job! Task completed.
              </div>
            )}
          </div>
        )) : (
          <div className="p-10 rounded-3xl bg-cream-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 flex flex-col items-center justify-center text-center gap-4">
            <span className="text-4xl mb-2 opacity-50">✨</span>
            <div>
              <p className="text-neutral-800 dark:text-neutral-200 text-lg font-medium font-serif">You're all caught up.</p>
              <p className="text-base text-neutral-500 mt-1">Enjoy the rest of your day or get ahead on tomorrow.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
