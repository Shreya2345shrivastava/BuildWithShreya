"use client";
import React from "react";
import { IGoal } from "@/types/lifeos";
import { BarChart3, TrendingUp, CheckCircle, Target, AlertCircle, Award, PieChart } from "lucide-react";

interface Props {
  goals: IGoal[];
}

export function GoalAnalytics({ goals }: Props) {
  const total = goals.length;
  const active = goals.filter(g => g.status === "in_progress").length;
  const completed = goals.filter(g => g.status === "completed").length;
  const archived = goals.filter(g => g.status === "archived").length;
  
  // Overdue: active or not_started, and dueDate is past
  const now = new Date().getTime();
  const overdue = goals.filter(g => {
    if (g.status === "completed" || g.status === "archived") return false;
    if (!g.dueDate) return false;
    return new Date(g.dueDate).getTime() < now;
  }).length;
  
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  // Success rate: completed vs (completed + archived as abandoned)
  const resolved = completed + archived;
  const successRate = resolved > 0 ? Math.round((completed / resolved) * 100) : 0;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const completedThisMonth = goals.filter(g => {
    if (g.status !== "completed" || !g.completedDate) return false;
    const d = new Date(g.completedDate);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  }).length;

  const completedThisYear = goals.filter(g => {
    if (g.status !== "completed" || !g.completedDate) return false;
    const d = new Date(g.completedDate);
    return d.getFullYear() === currentYear;
  }).length;

  // Life Area Distribution
  const distribution: Record<string, number> = {};
  goals.forEach(g => {
    const area = g.lifeAreaId || "uncategorized";
    distribution[area] = (distribution[area] || 0) + 1;
  });

  if (total === 0) {
    return (
      <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] rounded-2xl p-12 flex flex-col items-center justify-center text-center gap-4">
        <BarChart3 className="w-16 h-16 text-[var(--color-border-strong)]" />
        <h3 className="text-xl font-serif text-[var(--color-text-primary)]">Analytics Unavailable</h3>
        <p className="text-sm text-[var(--color-text-muted)] max-w-md leading-relaxed">Start creating and tracking goals to see your performance metrics, completion rates, and life area distribution.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] rounded-2xl p-6 sm:p-8">
      <div className="flex items-center gap-3 text-[var(--color-text-primary)]">
        <BarChart3 className="w-5 h-5 text-[var(--color-accent-peach)]" />
        <h2 className="text-xl font-serif">Performance Analytics</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard icon={<Target />} label="Active Goals" value={active.toString()} />
        <MetricCard icon={<CheckCircle />} label="Completion Rate" value={`${completionRate}%`} />
        <MetricCard icon={<Award />} label="Success Rate" value={`${successRate}%`} />
        <MetricCard icon={<AlertCircle />} label="Overdue" value={overdue.toString()} color="text-red-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] rounded-xl p-6 flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">Completed This Month</span>
          <span className="text-3xl font-bold text-[var(--color-text-primary)]">{completedThisMonth}</span>
        </div>
        <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] rounded-xl p-6 flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">Completed This Year</span>
          <span className="text-3xl font-bold text-[var(--color-text-primary)]">{completedThisYear}</span>
        </div>
        <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] rounded-xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <PieChart className="w-4 h-4 text-[var(--color-accent-peach)]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">Life Area Focus</span>
          </div>
          <div className="flex flex-col gap-2">
            {Object.entries(distribution).sort((a,b) => b[1] - a[1]).slice(0, 3).map(([area, count]) => (
              <div key={area} className="flex items-center justify-between">
                <span className="text-sm text-[var(--color-text-primary)] capitalize">{area}</span>
                <span className="text-xs font-bold text-[var(--color-text-muted)] bg-[var(--color-surface-primary)] px-2 py-0.5 rounded">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, color = "text-[var(--color-accent-peach)]" }: { icon: React.ReactNode, label: string, value: string, color?: string }) {
  return (
    <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] rounded-xl p-5 flex flex-col gap-4 shadow-sm hover:border-[var(--color-border-strong)] transition-colors">
      <div className={`${color} w-5 h-5`}>{icon}</div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-[var(--color-text-primary)]">{value}</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mt-1">{label}</span>
      </div>
    </div>
  );
}
