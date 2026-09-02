"use client";
import React from "react";
import { IGoal } from "@/types/lifeos";
import { CalendarDays, ArrowRight } from "lucide-react";

interface Props {
  goals: IGoal[];
  onSelectGoal: (id: string) => void;
}

export function GoalTimeline({ goals, onSelectGoal }: Props) {
  // Sort goals by startDate or targetDate
  const sortedGoals = [...goals].sort((a, b) => {
    const dateA = a.startDate ? new Date(a.startDate).getTime() : (a.targetDate ? new Date(a.targetDate).getTime() : 0);
    const dateB = b.startDate ? new Date(b.startDate).getTime() : (b.targetDate ? new Date(b.targetDate).getTime() : 0);
    return dateA - dateB;
  });

  const yearGoals = sortedGoals.filter(g => g.goalType === "Year");
  const quarterGoals = sortedGoals.filter(g => g.goalType === "Quarter");
  const monthGoals = sortedGoals.filter(g => g.goalType === "Month");
  const weekGoals = sortedGoals.filter(g => g.goalType === "Week");

  if (goals.length === 0) {
    return (
      <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-4">
        <CalendarDays className="w-12 h-12 text-[var(--color-border-strong)]" />
        <h3 className="text-lg font-serif text-[var(--color-text-primary)]">No Timeline Available</h3>
        <p className="text-sm text-[var(--color-text-muted)] max-w-md">Add dates to your goals to see them visualized on your roadmap.</p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] rounded-2xl p-6 sm:p-8 flex flex-col gap-8">
      <div className="flex items-center gap-3 text-[var(--color-text-primary)]">
        <CalendarDays className="w-5 h-5 text-[var(--color-accent-peach)]" />
        <h2 className="text-xl font-serif">Goal Timeline</h2>
      </div>

      <div className="flex flex-col gap-12 relative pl-4 sm:pl-8">
        <div className="absolute left-[15px] sm:left-[31px] top-2 bottom-2 w-px bg-[var(--color-border-soft)] z-0"></div>
        
        <TimelineSection title="Yearly Vision" goals={yearGoals} onSelectGoal={onSelectGoal} color="var(--color-accent-peach)" />
        <TimelineSection title="Quarterly Objectives" goals={quarterGoals} onSelectGoal={onSelectGoal} color="var(--color-text-secondary)" />
        <TimelineSection title="Monthly Milestones" goals={monthGoals} onSelectGoal={onSelectGoal} color="var(--color-botanical-leaf)" />
        <TimelineSection title="Weekly Sprints" goals={weekGoals} onSelectGoal={onSelectGoal} color="var(--color-text-muted)" />

      </div>
    </div>
  );
}

function TimelineSection({ title, goals, onSelectGoal, color }: { title: string, goals: IGoal[], onSelectGoal: (id: string) => void, color: string }) {
  if (goals.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 relative z-10">
      <div className="flex items-center gap-4">
        <div className="w-3 h-3 rounded-full border-2 border-[var(--color-surface-primary)]" style={{ backgroundColor: color, marginLeft: "-6px" }}></div>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">{title}</h3>
      </div>
      
      <div className="flex flex-col gap-3 pl-8">
        {goals.map(goal => (
          <div 
            key={goal._id} 
            onClick={() => onSelectGoal(goal._id)}
            className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] hover:border-[var(--color-text-secondary)] rounded-xl cursor-pointer transition-all shadow-sm"
          >
            <div className="flex flex-col gap-1">
              <h4 className={`text-sm font-semibold ${goal.status === 'completed' ? 'line-through text-[var(--color-text-muted)]' : 'text-[var(--color-text-primary)]'}`}>
                {goal.title}
              </h4>
              <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                {goal.startDate && <span>{new Date(goal.startDate).toLocaleDateString()}</span>}
                {goal.startDate && goal.dueDate && <ArrowRight className="w-3 h-3" />}
                {goal.dueDate && <span>{new Date(goal.dueDate).toLocaleDateString()}</span>}
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-3 sm:mt-0">
              <div className="w-24 bg-[var(--color-border-subtle)] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[var(--color-botanical-leaf)] h-full rounded-full" style={{ width: `${goal.progress}%` }}></div>
              </div>
              <span className="text-xs font-medium text-[var(--color-text-secondary)]">{goal.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
