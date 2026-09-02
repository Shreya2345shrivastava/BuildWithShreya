import React from "react";
import { Plus, Target, Calendar, Lightbulb } from "lucide-react";

export function QuickActions() {
  const actions = [
    { label: "Add Task", icon: <Plus className="w-5 h-5" /> },
    { label: "Add Goal", icon: <Target className="w-5 h-5" /> },
    { label: "Plan Day", icon: <Calendar className="w-5 h-5" /> },
    { label: "Capture Idea", icon: <Lightbulb className="w-5 h-5" /> },
  ];

  return (
    <section className="w-full max-w-3xl mx-auto mb-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map(action => (
          <button 
            key={action.label}
            className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-md hover:border-neutral-200 dark:hover:border-neutral-700 transition-all hover:-translate-y-0.5"
          >
            <div className="w-12 h-12 rounded-full bg-cream-50 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-neutral-900 transition-colors">
              {action.icon}
            </div>
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
