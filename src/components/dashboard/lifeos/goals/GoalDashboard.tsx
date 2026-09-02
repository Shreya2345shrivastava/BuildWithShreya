"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IGoal } from "@/types/lifeos";
import { Target, LayoutGrid, List, Network } from "lucide-react";
import { MotionPageWrapper } from "../MotionPageWrapper";

interface Props {
  goals: IGoal[];
}

type ViewMode = "list" | "kanban" | "tree";

const GoalNode = ({ goal, allGoals, depth = 0 }: { goal: IGoal, allGoals: IGoal[], depth?: number }) => {
  if (!goal || !goal._id) return null;
  // Prevent infinite recursion by ensuring depth doesn't exceed 10 and filtering out self-references
  if (depth > 10) return null; 
  
  const children = allGoals.filter(g => g.parentGoalId === goal._id && g._id !== goal._id);
  const isCompleted = goal.status === "completed";
  
  return (
    <div className="flex flex-col relative">
      <div className={`p-4 bg-[var(--color-surface-elevated)] border rounded-xl flex flex-col gap-2 relative z-10 w-full sm:w-80 ${isCompleted ? 'border-[var(--color-botanical-leaf)] opacity-60' : 'border-[var(--color-border-strong)] shadow-sm'}`}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] bg-[var(--color-surface-primary)] px-2 py-0.5 rounded">{goal.goalType}</span>
          <span className="text-xs font-semibold text-[var(--color-text-secondary)]">{goal.progress}%</span>
        </div>
        <h4 className={`text-sm font-semibold ${isCompleted ? 'line-through text-[var(--color-text-muted)]' : 'text-[var(--color-text-primary)]'}`}>{goal.title}</h4>
      </div>
      
      {children.length > 0 && (
        <div className="pl-6 sm:pl-12 pt-4 flex flex-col gap-4 relative">
          <div className="absolute left-3 sm:left-6 top-0 bottom-6 w-px bg-[var(--color-border-soft)] z-0"></div>
          {children.map(child => (
            <div key={child._id} className="relative">
              <div className="absolute left-[-12px] sm:left-[-24px] top-6 w-4 sm:w-6 h-px bg-[var(--color-border-soft)] z-0"></div>
              <GoalNode goal={child} allGoals={allGoals} depth={depth + 1} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export function GoalDashboard({ goals }: Props) {
  const [view, setView] = useState<ViewMode>("tree");

  return (
    <MotionPageWrapper>
      <div className="flex flex-col gap-2 mt-8">
        <h1 className="text-3xl font-serif text-[var(--color-text-primary)]">Goals & Vision</h1>
        <p className="text-sm font-medium text-[var(--color-text-muted)]">Your cascading mission control.</p>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-xs font-semibold text-[var(--color-text-secondary)] bg-[var(--color-surface-elevated)] px-3 py-1 rounded-full border border-[var(--color-border-subtle)]">
            Active: {goals.filter(g => g.status !== "completed").length}
          </span>
          <span className="text-xs font-semibold text-[var(--color-botanical-leaf)] bg-[var(--color-surface-elevated)] px-3 py-1 rounded-full border border-[var(--color-border-subtle)]">
            Completed: {goals.filter(g => g.status === "completed").length}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-8 mt-6">
        <button onClick={() => setView("tree")} className={`p-2 rounded-lg transition-colors ${view === "tree" ? "bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] shadow-sm" : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"}`}>
          <Network size={18} />
        </button>
        <button onClick={() => setView("kanban")} className={`p-2 rounded-lg transition-colors ${view === "kanban" ? "bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] shadow-sm" : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"}`}>
          <LayoutGrid size={18} />
        </button>
        <button onClick={() => setView("list")} className={`p-2 rounded-lg transition-colors ${view === "list" ? "bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] shadow-sm" : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"}`}>
          <List size={18} />
        </button>
      </div>

      <div className="min-h-[50vh]">
        <AnimatePresence mode="wait">
          {view === "tree" && (
            <motion.div key="tree" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-8 overflow-x-auto pb-12">
              {goals.filter(g => !g.parentGoalId).map(rootGoal => (
                <GoalNode key={rootGoal._id} goal={rootGoal} allGoals={goals} />
              ))}
              {goals.length === 0 && (
                <div className="p-12 text-center border border-dashed border-[var(--color-border-soft)] rounded-2xl text-[var(--color-text-muted)]">
                  No goals found. Click + to create a root Vision or Year goal.
                </div>
              )}
            </motion.div>
          )}
          {view === "kanban" && (
            <motion.div key="kanban" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-4 overflow-x-auto pb-8 snap-x">
              {["not_started", "in_progress", "completed"].map(status => {
                const columnGoals = goals.filter(g => g.status === status);
                return (
                  <div key={status} className="flex-shrink-0 w-80 bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] rounded-2xl flex flex-col snap-start">
                    <div className="p-4 border-b border-[var(--color-border-soft)] flex items-center justify-between">
                      <h3 className="font-semibold text-[var(--color-text-primary)] capitalize">{status.replace("_", " ")}</h3>
                      <span className="text-xs bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] px-2 py-1 rounded-full">{columnGoals.length}</span>
                    </div>
                    <div className="p-4 flex flex-col gap-3 min-h-[300px]">
                      {columnGoals.map(goal => (
                        <div key={goal._id} className="bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex items-start justify-between mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">{goal.goalType}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                              goal.priority === 'P1' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
                              goal.priority === 'P2' ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' :
                              'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                            }`}>{goal.priority}</span>
                          </div>
                          <h4 className="font-medium text-[var(--color-text-primary)] text-sm mb-3">{goal.title}</h4>
                          <div className="w-full bg-[var(--color-border-subtle)] h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[var(--color-botanical-leaf)] h-full rounded-full transition-all" style={{ width: `${goal.progress}%` }}></div>
                          </div>
                        </div>
                      ))}
                      {columnGoals.length === 0 && (
                        <div className="text-center p-4 text-xs text-[var(--color-text-muted)]">No goals in this stage.</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
          {view === "list" && (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-6">
              {goals.map(goal => (
                <div key={goal._id} className="p-4 bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] rounded-xl flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-[var(--color-text-primary)]">{goal.title}</h3>
                    <span className="text-xs text-[var(--color-text-muted)] uppercase">{goal.goalType}</span>
                  </div>
                  <div className="text-sm font-semibold">{goal.progress}%</div>
                </div>
              ))}
              {goals.length === 0 && (
                <div className="p-12 text-center border border-dashed border-[var(--color-border-soft)] rounded-2xl text-[var(--color-text-muted)]">
                  No goals found. Click + to create one.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionPageWrapper>
  );
}
