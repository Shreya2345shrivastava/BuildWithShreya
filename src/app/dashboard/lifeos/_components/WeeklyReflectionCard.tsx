import React from "react";

export function WeeklyReflectionCard() {
  return (
    <section className="flex flex-col gap-4 p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-sm relative overflow-hidden">
      {/* Subtle decorative background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-neutral-100 to-transparent dark:from-neutral-800 rounded-full blur-3xl opacity-50 -mr-10 -mt-10 pointer-events-none" />

      <h2 className="text-lg font-medium text-neutral-800 dark:text-neutral-100 font-serif relative z-10">This Week</h2>
      
      <div className="flex flex-col gap-6 relative z-10">
        
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-wider text-green-600 dark:text-green-500">Best Win</span>
          <p className="text-base text-neutral-700 dark:text-neutral-300">
            Completed DSA for 14 days
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-wider text-orange-600 dark:text-orange-500">Biggest Challenge</span>
          <p className="text-base text-neutral-700 dark:text-neutral-300">
            Missed workout twice
          </p>
        </div>

        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/50">
          <span className="text-xs font-medium uppercase tracking-wider text-blue-600 dark:text-blue-500 mb-1 block">Next Focus</span>
          <p className="text-base font-medium text-neutral-800 dark:text-neutral-200">
            Improve consistency
          </p>
        </div>

      </div>
    </section>
  );
}
