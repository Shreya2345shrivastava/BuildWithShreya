"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { IHabit as Habit } from "@/types/lifeos";

interface Props {
  habits: Habit[];
}

export function TodaysHabits({ habits }: Props) {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [celebrationId, setCelebrationId] = useState<string | null>(null);

  const toggleHabit = (id: string) => {
    if (completedIds.includes(id)) {
      setCompletedIds(prev => prev.filter(h => h !== id));
      setCelebrationId(null);
    } else {
      setCompletedIds(prev => [...prev, id]);
      setCelebrationId(id);
      setTimeout(() => setCelebrationId(null), 3000);
    }
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-serif text-neutral-800 dark:text-neutral-100">Today's Habits</h2>
      </div>
      
      <div className="flex flex-col gap-4">
        {habits.length > 0 ? habits.slice(0, 5).map(habit => (
          <div key={habit._id} className="relative">
            <div 
              onClick={() => toggleHabit(habit._id)}
              className={`group flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer duration-300 ${
                completedIds.includes(habit._id)
                  ? "bg-green-50 dark:bg-green-900/10 border-transparent"
                  : "bg-white dark:bg-neutral-900 border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-neutral-200 dark:hover:border-neutral-700"
              }`}
            >
              <span className={`text-lg font-medium transition-all duration-300 ${
                completedIds.includes(habit._id) 
                  ? "text-green-700 dark:text-green-400" 
                  : "text-neutral-800 dark:text-neutral-200"
              }`}>
                {habit.title}
              </span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                completedIds.includes(habit._id)
                  ? "bg-green-500 border-green-500 scale-110 shadow-sm shadow-green-500/20"
                  : "border-neutral-300 dark:border-neutral-600 group-hover:border-neutral-400"
              }`}>
                {completedIds.includes(habit._id) && <Check className="w-5 h-5 text-white" />}
              </div>
            </div>

            {/* Tiny Celebration Toast */}
            {celebrationId === habit._id && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 px-4 py-2 rounded-xl shadow-lg border border-neutral-100 dark:border-neutral-700 text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-300 z-10 whitespace-nowrap">
                🎉 Great job! {habit.title} streak maintained.
              </div>
            )}
          </div>
        )) : (
          <div className="p-8 rounded-2xl bg-cream-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 flex flex-col items-center justify-center text-center gap-3">
            <span className="text-3xl mb-1">🌱</span>
            <div>
              <p className="text-neutral-800 dark:text-neutral-200 font-medium font-serif">No daily habits.</p>
              <p className="text-sm text-neutral-500 mt-1 max-w-xs">Small daily actions compound into massive results.</p>
            </div>
            <button className="mt-3 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium rounded-full shadow-sm hover:scale-105 transition-transform">
              Create a Habit
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
