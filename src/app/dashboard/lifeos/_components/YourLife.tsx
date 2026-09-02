import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ILifeArea as LifeArea } from "@/types/lifeos";

interface Props {
  areas: LifeArea[];
}

const defaultAreas = [
  { id: 'health', name: 'Health', progress: 72, activeGoals: 3, streak: 14, label: "🌱 Thriving" },
  { id: 'career', name: 'Career', progress: 65, activeGoals: 2, streak: 5, label: "🚀 Growing" },
  { id: 'learning', name: 'Learning', progress: 45, activeGoals: 1, streak: 2, label: "📈 Improving" },
  { id: 'creator', name: 'Creator', progress: 80, activeGoals: 2, streak: 21, label: "⭐ Excellent" },
];

export function YourLife({ areas }: Props) {
  const displayAreas = defaultAreas;

  return (
    <section className="flex flex-col gap-6 w-full mt-8">
      <h2 className="text-2xl font-serif text-neutral-800 dark:text-neutral-100">Life Areas</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayAreas.map((area) => (
          <Link 
            href={`/dashboard/lifeos/areas/${area.id}`} 
            key={area.id}
            className="group flex flex-col p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-md hover:border-neutral-200 dark:hover:border-neutral-700 transition-all hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="flex flex-col mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-medium text-neutral-900 dark:text-neutral-100">{area.name}</span>
                <span className="text-xs font-medium text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-full">{area.label}</span>
              </div>
              <span className="text-3xl font-serif text-neutral-800 dark:text-neutral-200">{area.progress}%</span>
            </div>
            
            <div className="flex flex-col gap-1 text-sm text-neutral-500 font-medium mb-8">
              <span>{area.activeGoals} Goals Active</span>
              <span>{area.streak} Day Streak</span>
            </div>

            <div className="mt-auto flex items-center justify-between text-sm font-medium text-neutral-900 dark:text-neutral-100">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">Explore</span>
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
