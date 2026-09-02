import React from "react";
import { IGoal as Goal } from "@/types/lifeos";

interface Props {
  goals: Goal[];
}

export function GoalProgress({ goals }: Props) {
  // Aggregate goals by area for the simple progress view
  const progressData = [
    { name: "Career", progress: 65 },
    { name: "Learning", progress: 70 },
    { name: "Health", progress: 40 },
    { name: "Creator", progress: 35 },
  ];

  return (
    <section className="flex flex-col gap-4 p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
      <h2 className="text-lg font-medium text-neutral-800 dark:text-neutral-100 mb-2">Goal Progress</h2>
      <div className="flex flex-col gap-5">
        {progressData.map(item => (
          <div key={item.name} className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-neutral-700 dark:text-neutral-300">{item.name}</span>
              <span className="text-neutral-500">{item.progress}%</span>
            </div>
            <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-neutral-800 dark:bg-neutral-300 rounded-full transition-all duration-1000"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
