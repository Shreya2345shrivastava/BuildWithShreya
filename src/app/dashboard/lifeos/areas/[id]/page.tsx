import React from "react";
import { getLifeOSAuth } from "@/lib/actions/lifeos/auth";
import { redirect } from "next/navigation";
import { ArrowLeft, Target, CheckSquare, Zap, BarChart, BookOpen, Layers } from "lucide-react";
import Link from "next/link";

const areaIcons: Record<string, string> = {
  health: '🏃‍♀️',
  learning: '📚',
  creator: '✨',
  spiritual: '🧘‍♀️',
  beauty: '💅',
  career: '💼',
  relationships: '💝',
  lifestyle: '🏡',
};

export default async function LifeAreaPage({ params }: { params: { id: string } }) {
  const userId = await getLifeOSAuth();
  if (!userId) redirect("/login");

  const areaId = params.id;
  const icon = areaIcons[areaId.toLowerCase()] || '📦';

  return (
    <div className="flex-1 p-8 overflow-y-auto bg-neutral-50 dark:bg-neutral-950 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col gap-12 pb-32">
        
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard/lifeos" className="p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-4xl font-medium tracking-tight text-neutral-800 dark:text-neutral-100 flex items-center gap-3">
              <span>{icon}</span>
              <span className="capitalize">{areaId} Workspace</span>
            </h1>
            <p className="text-base text-neutral-500 mt-1">Deep work and strategic planning for your {areaId} life area.</p>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col gap-3 hover:border-neutral-300 transition-colors cursor-pointer">
            <Target className="w-6 h-6 text-neutral-400" />
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">Goals</h3>
            <p className="text-sm text-neutral-500">Manage strategic objectives and long-term milestones.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col gap-3 hover:border-neutral-300 transition-colors cursor-pointer">
            <Layers className="w-6 h-6 text-neutral-400" />
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">Projects</h3>
            <p className="text-sm text-neutral-500">Active projects and actionable step-by-step plans.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col gap-3 hover:border-neutral-300 transition-colors cursor-pointer">
            <Zap className="w-6 h-6 text-neutral-400" />
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">Habits</h3>
            <p className="text-sm text-neutral-500">Daily and weekly routines specific to {areaId}.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col gap-3 hover:border-neutral-300 transition-colors cursor-pointer">
            <BookOpen className="w-6 h-6 text-neutral-400" />
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">Notes & Ideas</h3>
            <p className="text-sm text-neutral-500">Thoughts, reflections, and quick captures.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col gap-3 hover:border-neutral-300 transition-colors cursor-pointer lg:col-span-2">
            <BarChart className="w-6 h-6 text-neutral-400" />
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">Analytics & Progress</h3>
            <p className="text-sm text-neutral-500">Deep dive into your performance metrics and historical data.</p>
          </div>

        </div>

      </div>
    </div>
  );
}
