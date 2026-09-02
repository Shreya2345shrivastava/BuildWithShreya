"use client";

import React, { useState } from "react";
import { Plus, CheckSquare, Target, Zap, BookOpen, PenTool, Lightbulb } from "lucide-react";

export function FloatingQuickAdd() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { label: "Add Task", icon: <CheckSquare className="w-4 h-4" /> },
    { label: "Add Habit", icon: <Zap className="w-4 h-4" /> },
    { label: "Add Goal", icon: <Target className="w-4 h-4" /> },
    { label: "Add Note", icon: <BookOpen className="w-4 h-4" /> },
    { label: "Add Idea", icon: <Lightbulb className="w-4 h-4" /> },
    { label: "Add Journal", icon: <PenTool className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Menu Options */}
      <div 
        className={`flex flex-col gap-2 transition-all origin-bottom ${
          isOpen ? "scale-100 opacity-100 mb-2" : "scale-50 opacity-0 pointer-events-none mb-0"
        }`}
      >
        {actions.map((action, index) => (
          <button
            key={action.label}
            className="flex items-center justify-end gap-3 group"
            style={{ 
              transitionDelay: isOpen ? `${(actions.length - index) * 30}ms` : '0ms' 
            }}
          >
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
              {action.label}
            </span>
            <div className="w-12 h-12 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-md flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-white transition-colors">
              {action.icon}
            </div>
          </button>
        ))}
      </div>

      {/* Main Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95 ${
          isOpen ? "rotate-45" : ""
        }`}
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
