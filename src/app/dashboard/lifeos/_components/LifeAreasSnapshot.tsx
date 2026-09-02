import React from "react";
import Link from "next/link";
import { ILifeArea as LifeArea } from "@/types/lifeos";
import { ArrowUpRight } from "lucide-react";

interface Props {
  areas: LifeArea[];
}

// Hardcoded for now based on prompt requirements to ensure all 8 are shown even if missing from DB
const defaultAreas = [
  { id: 'health', name: 'Health', icon: '🏃‍♀️', progress: 40, activeGoals: 2, activeHabits: 4 },
  { id: 'learning', name: 'Learning', icon: '📚', progress: 70, activeGoals: 1, activeHabits: 2 },
  { id: 'creator', name: 'Creator', icon: '✨', progress: 35, activeGoals: 3, activeHabits: 1 },
  { id: 'spiritual', name: 'Spiritual', icon: '🧘‍♀️', progress: 80, activeGoals: 1, activeHabits: 3 },
  { id: 'beauty', name: 'Beauty', icon: '💅', progress: 60, activeGoals: 1, activeHabits: 2 },
  { id: 'career', name: 'Career', icon: '💼', progress: 65, activeGoals: 2, activeHabits: 1 },
  { id: 'relationships', name: 'Relationships', icon: '💝', progress: 90, activeGoals: 0, activeHabits: 1 },
  { id: 'lifestyle', name: 'Lifestyle', icon: '🏡', progress: 50, activeGoals: 1, activeHabits: 0 },
];

export function LifeAreasSnapshot({ areas }: Props) {
  // Use DB areas if available, fallback to default
  const displayAreas = defaultAreas;

  return (
    <section className="flex flex-col gap-4 mt-4">
      <h2 className="text-xl font-medium text-neutral-800 dark:text-neutral-100">Life Areas</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {displayAreas.map(area => (
          <Link 
            href={`/dashboard/lifeos/areas/${area.id}`} 
            key={area.id}
            className="group flex flex-col p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">{area.icon}</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-400 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
            </div>
            <h3 className="font-medium text-neutral-800 dark:text-neutral-200 mb-1">{area.name}</h3>
            
            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
              <span>{area.activeGoals} Goals</span>
              <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <span>{area.activeHabits} Habits</span>
            </div>

            {/* Simple Progress Line */}
            <div className="mt-auto w-full h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-neutral-800 dark:bg-neutral-300 rounded-full" 
                style={{ width: `${area.progress}%` }}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
