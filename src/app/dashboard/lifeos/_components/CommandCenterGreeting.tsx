"use client";

import React, { useState } from "react";
import { Award } from "lucide-react";

interface Props {
  name: string;
  completionPercentage: number;
}

const moods = [
  { emoji: "😊", label: "Great" },
  { emoji: "🙂", label: "Good" },
  { emoji: "😐", label: "Okay" },
  { emoji: "😔", label: "Low" },
];

export function CommandCenterGreeting({ name, completionPercentage }: Props) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-cream-50 dark:bg-neutral-900/50 p-6 rounded-3xl border border-neutral-100 dark:border-neutral-800">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-medium tracking-tight text-neutral-800 dark:text-neutral-100 mb-1 font-serif">
            {getGreeting()}, {name} <span className="inline-block animate-wave origin-[70%_70%]">🌸</span>
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400">
            You completed {completionPercentage}% of today's commitments.
          </p>
        </div>

        {/* Today's Win */}
        <div className="flex items-start gap-3 mt-2 bg-white dark:bg-neutral-800/50 p-4 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-700/50 max-w-md">
          <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
            <Award className="w-4 h-4 text-amber-600 dark:text-amber-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">Today's Win</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Completed your DSA streak for 7 consecutive days. Keep the momentum going!
            </p>
          </div>
        </div>
      </div>

      {/* Mood Selector */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 pl-1">How are you feeling?</span>
        <div className="flex items-center gap-2 bg-white dark:bg-neutral-800/80 p-2 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-700/50">
          {moods.map((mood) => (
            <button
              key={mood.label}
              onClick={() => setSelectedMood(mood.label)}
              className={`w-12 h-12 text-2xl flex items-center justify-center rounded-xl transition-all ${
                selectedMood === mood.label
                  ? "bg-neutral-100 dark:bg-neutral-700 scale-110 shadow-sm"
                  : "hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:scale-105 opacity-70 hover:opacity-100"
              }`}
              title={mood.label}
            >
              {mood.emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
