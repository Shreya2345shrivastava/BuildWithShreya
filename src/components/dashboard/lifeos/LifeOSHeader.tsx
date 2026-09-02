import React from "react";
import Link from "next/link";
import { ITask } from "@/types/lifeos";
import { Target } from "lucide-react";

interface Props {
  profileName: string;
  tasks?: ITask[];
}

export function LifeOSHeader({ profileName, tasks = [] }: Props) {
  const currentDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  // Derive top 3 focus categories from the top priorities (P1, P2)
  const focusSet = new Set<string>();
  const incompleteTasks = tasks.filter((t) => !t.completed);
  for (const task of incompleteTasks) {
    if (focusSet.size < 3) {
      focusSet.add(task.category);
    } else {
      break;
    }
  }
  const focusAreas = Array.from(focusSet);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[var(--color-text-primary)] leading-tight">
            Good Morning, {profileName} <span className="inline-block animate-pulse-slow">🌸</span>
          </h1>
          <p className="text-sm md:text-base font-medium tracking-wide uppercase text-[var(--color-text-muted)] mt-1">
            {currentDate}
          </p>
        </div>
        <Link 
          href="/dashboard/lifeos/goals"
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] hover:border-[var(--color-accent-peach)] text-[var(--color-text-primary)] rounded-full text-sm font-medium transition-all shadow-sm hover:shadow-md group"
        >
          <Target className="w-4 h-4 text-[var(--color-accent-peach)] group-hover:scale-110 transition-transform" />
          Goals Hub
        </Link>
      </div>
      
      <div className="mt-2 border-l-2 border-[var(--color-accent-peach)] pl-4 py-1">
        <p className="text-lg md:text-xl font-serif italic text-[var(--color-text-secondary)]">
          You are building your future one small step at a time.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
          Today's Focus:
        </span>
        <div className="flex gap-2">
          {focusAreas.length > 0 ? (
            focusAreas.map((focus) => (
              <span key={focus} className="bg-[var(--color-bg-peach-tint)] text-[var(--color-accent-peach)] px-3 py-1 rounded-full text-sm font-medium">
                • {focus}
              </span>
            ))
          ) : (
            <span className="text-[var(--color-text-secondary)] text-sm font-medium">Relaxing</span>
          )}
        </div>
      </div>
    </div>
  );
}
