"use client";
import React, { useState } from "react";
import { IGoal, IVision } from "@/types/lifeos";
import { MotionPageWrapper } from "../MotionPageWrapper";
import { VisionDashboard } from "./VisionDashboard";
import { GoalPyramid } from "./GoalPyramid";
import { GoalsKanban } from "./GoalsKanban";
import { GoalWorkspace } from "./GoalWorkspace";
import { GoalAnalytics } from "./GoalAnalytics";
import { GoalTimeline } from "./GoalTimeline";
import { CreateGoalModal } from "./CreateGoalModal";
import { DeleteGoalModal } from "./DeleteGoalModal";
import { GoalsEmptyState } from "./GoalsEmptyState";

interface Props {
  goals: IGoal[];
  vision: IVision;
}

export function GoalsHub({ goals, vision }: Props) {
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [createGoalParentId, setCreateGoalParentId] = useState<string | null>(null);
  const [isCreatingGoal, setIsCreatingGoal] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState<string | null>(null);

  const handleCreateRoot = () => {
    setCreateGoalParentId(null);
    setIsCreatingGoal(true);
  };

  const handleAddChild = (parentId: string) => {
    setCreateGoalParentId(parentId);
    setIsCreatingGoal(true);
  };

  const handleDeleteRequest = (goalId: string) => {
    setGoalToDelete(goalId);
  };

  return (
    <MotionPageWrapper>
      {/* Workspace Overlay */}
      {selectedGoalId && (
        <GoalWorkspace 
          goalId={selectedGoalId} 
          onClose={() => setSelectedGoalId(null)} 
          goals={goals} 
          onDeleteRequest={() => { setSelectedGoalId(null); setGoalToDelete(selectedGoalId); }}
        />
      )}

      {/* Modals */}
      {isCreatingGoal && (
        <CreateGoalModal 
          parentGoalId={createGoalParentId || undefined} 
          onClose={() => setIsCreatingGoal(false)} 
          onSuccess={() => setIsCreatingGoal(false)} 
        />
      )}

      {goalToDelete && (
        <DeleteGoalModal 
          goalId={goalToDelete} 
          onClose={() => setGoalToDelete(null)} 
          onSuccess={() => setGoalToDelete(null)} 
        />
      )}

      <div className="flex flex-col gap-2 mt-8 mb-12">
        <h1 className="text-3xl font-serif text-[var(--color-text-primary)]">Goals Hub</h1>
        <p className="text-sm font-medium text-[var(--color-text-muted)]">Your cascading mission control and life OS core.</p>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-xs font-semibold text-[var(--color-text-secondary)] bg-[var(--color-surface-elevated)] px-3 py-1 rounded-full border border-[var(--color-border-subtle)]">
            Active: {goals.filter(g => g.status === "in_progress").length}
          </span>
          <span className="text-xs font-semibold text-[var(--color-botanical-leaf)] bg-[var(--color-surface-elevated)] px-3 py-1 rounded-full border border-[var(--color-border-subtle)]">
            Completed: {goals.filter(g => g.status === "completed").length}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-16">
        {/* Section 1: Vision */}
        <section>
          <VisionDashboard vision={vision} />
        </section>

        {goals.length === 0 ? (
          <GoalsEmptyState onCreateGoal={handleCreateRoot} />
        ) : (
          <>
            {/* Section 2: Goal Pyramid */}
            <section>
              <GoalPyramid 
                goals={goals} 
                onSelectGoal={setSelectedGoalId} 
                onAddChild={handleAddChild} 
                onDelete={handleDeleteRequest} 
                onCreateRoot={handleCreateRoot} 
              />
            </section>

            {/* Section 3: Goals Kanban Board */}
            <section>
              <GoalsKanban 
                goals={goals} 
                onSelectGoal={setSelectedGoalId} 
                onAddChild={handleAddChild} 
                onDelete={handleDeleteRequest} 
              />
            </section>

            {/* Section 4: Analytics */}
            <section>
              <GoalAnalytics goals={goals} />
            </section>

            {/* Section 5: Timeline */}
            <section>
              <GoalTimeline goals={goals} onSelectGoal={setSelectedGoalId} />
            </section>
          </>
        )}
      </div>
    </MotionPageWrapper>
  );
}
