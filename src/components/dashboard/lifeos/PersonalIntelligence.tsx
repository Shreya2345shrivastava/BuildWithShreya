import React from "react";
import { Sparkles } from "lucide-react";
import { ITask, IDailyMetric } from "@/types/lifeos";

interface Props {
  tasks?: ITask[];
  metrics?: IDailyMetric | null;
}

export function PersonalIntelligence({ tasks = [], metrics }: Props) {
  // Generate insights based on actual data
  const incompleteTasks = tasks.filter((t) => !t.completed);
  const p1Tasks = incompleteTasks.filter((t) => t.priority === "P1").length;
  
  const water = metrics?.water || 0;
  const studyMins = metrics?.studyMinutes || 0;

  let primaryInsight = "Your day is just getting started.";
  if (p1Tasks > 0) {
    primaryInsight = `You have ${p1Tasks} critical (P1) tasks remaining. Focus on those first.`;
  } else if (incompleteTasks.length === 0 && tasks.length > 0) {
    primaryInsight = "Incredible work! You've cleared all your priorities for today.";
  }

  let secondaryInsight = "";
  if (water < 4) {
    secondaryInsight = "Water intake is currently low. Remember to hydrate.";
  } else {
    secondaryInsight = "Hydration is looking solid today.";
  }

  let tag1 = studyMins >= 60 ? "Study: Strong" : "Study: Pending";
  let tag2 = incompleteTasks.length === 0 ? "Focus: Complete" : "Focus: Active";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-[var(--color-text-primary)]">
        <Sparkles size={20} className="text-[var(--color-text-secondary)]" />
        <h2 className="text-xl font-medium tracking-tight">Intelligence</h2>
      </div>

      <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border-soft)] rounded-2xl p-5 shadow-[var(--shadow-sm)] flex flex-col gap-4">
        
        <div className="text-sm font-medium text-[var(--color-text-primary)] leading-relaxed">
          <p className="mb-2">
            {primaryInsight}
          </p>
          <p className={water < 4 ? "text-[var(--color-error)]" : "text-[var(--color-botanical-leaf)]"}>
            {secondaryInsight}
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <span className="px-3 py-1 bg-[var(--color-surface-primary)] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] rounded-full text-xs font-semibold">
            {tag1}
          </span>
          <span className="px-3 py-1 bg-[var(--color-surface-primary)] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] rounded-full text-xs font-semibold">
            {tag2}
          </span>
        </div>
      </div>
    </div>
  );
}
