import React from "react";
import { Flame } from "lucide-react";

export function StreakSection() {
  const streaks = [
    { name: "DSA", days: 14 },
    { name: "Workout", days: 8 },
    { name: "Reading", days: 12 },
  ];

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-medium text-neutral-800 dark:text-neutral-100 font-serif">Current Streaks</h2>
      
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {streaks.map(streak => (
          <div 
            key={streak.name}
            className="flex items-center gap-3 py-2 px-4 rounded-full bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/30 shrink-0"
          >
            <Flame className="w-4 h-4 text-orange-500 dark:text-orange-400" />
            <span className="text-sm font-medium text-orange-800 dark:text-orange-300">
              {streak.name} <span className="opacity-60 font-normal ml-1">— {streak.days} days</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
