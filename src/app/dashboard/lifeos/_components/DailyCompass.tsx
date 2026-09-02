import React from "react";
import { Compass, TrendingUp, TrendingDown, Minus } from "lucide-react";

export function DailyCompass() {
  const trends = [
    { name: "Health", trend: "up" },
    { name: "Career", trend: "flat" },
    { name: "Learning", trend: "up" },
    { name: "Creator", trend: "down" },
  ];

  return (
    <div className="flex flex-col gap-6 p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-sm relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-neutral-100 dark:bg-neutral-800 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="flex items-center gap-3 relative z-10">
        <Compass className="w-6 h-6 text-neutral-500 dark:text-neutral-400" />
        <h2 className="text-xl font-serif font-medium text-neutral-800 dark:text-neutral-100">Daily Compass</h2>
      </div>

      <div className="flex flex-col gap-4 relative z-10">
        {trends.map(item => (
          <div key={item.name} className="flex justify-between items-center text-sm">
            <span className="font-medium text-neutral-700 dark:text-neutral-300">{item.name}</span>
            <div className="text-neutral-400 dark:text-neutral-500">
              {item.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500 dark:text-green-500" />}
              {item.trend === 'down' && <TrendingDown className="w-4 h-4 text-orange-500 dark:text-orange-500" />}
              {item.trend === 'flat' && <Minus className="w-4 h-4" />}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-6 border-t border-neutral-100 dark:border-neutral-800 relative z-10">
        <p className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-medium mb-2">Today's Recommended Focus</p>
        <p className="text-xl font-serif text-neutral-900 dark:text-white">Learning</p>
      </div>
    </div>
  );
}
