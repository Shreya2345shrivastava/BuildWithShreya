"use client";
import React, { useState } from "react";
import { IGoal } from "@/types/lifeos";
import { Network, Plus, CheckCircle2, Circle, ChevronRight, ChevronDown, Flag, MoreVertical } from "lucide-react";
import { DndContext, useDraggable, useDroppable, DragEndEvent } from "@dnd-kit/core";
import { updateGoal, createGoal } from "@/lib/actions/lifeos/goals.actions";
import { GoalActionsMenu } from "./GoalActionsMenu";

export function GoalPyramid({ goals, onSelectGoal, onAddChild, onDelete, onCreateRoot }: { goals: IGoal[], onSelectGoal: (id: string) => void, onAddChild: (id: string) => void, onDelete: (id: string) => void, onCreateRoot: () => void }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const draggedGoalId = active.id as string;
      const targetGoalId = over.id as string;
      await updateGoal(draggedGoalId, { parentGoalId: targetGoalId === 'root' ? null : targetGoalId });
    }
  };

  const toggleExpand = (id: string) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  // Root goals (Year or those without parents)
  const rootGoals = goals.filter(g => !g.parentGoalId);

  return (
    <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] rounded-2xl p-6 sm:p-8 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-[var(--color-text-primary)]">
          <Network className="w-5 h-5 text-[var(--color-accent-peach)]" />
          <h2 className="text-xl font-serif">Goal Hierarchy</h2>
        </div>
        {isMounted && (
          <button onClick={onCreateRoot} className="flex items-center gap-2 px-4 py-2 bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] hover:border-[var(--color-accent-peach)] hover:text-[var(--color-accent-peach)] text-[var(--color-text-primary)] text-sm font-medium rounded-xl transition-colors shadow-sm">
            <Plus className="w-4 h-4" /> Create Root Goal
          </button>
        )}
      </div>

      {isMounted ? (
        <DndContext onDragEnd={handleDragEnd}>
          <div className="flex flex-col gap-2">
            {rootGoals.length > 0 ? rootGoals.map(goal => (
              <TreeNode 
                key={goal._id} 
                goal={goal} 
                allGoals={goals} 
                onSelectGoal={onSelectGoal} 
                expanded={expanded} 
                toggleExpand={toggleExpand} 
                depth={0} 
                onAddChild={onAddChild}
                onDelete={onDelete}
              />
            )) : (
              <div className="text-sm text-[var(--color-text-muted)] p-12 text-center bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] rounded-xl flex flex-col items-center gap-4">
                <Flag className="w-8 h-8 opacity-50" />
                <p>No goals yet. Create a Root Goal to start building your hierarchy.</p>
              </div>
            )}
          </div>
        </DndContext>
      ) : (
        <div className="h-[200px] flex items-center justify-center text-[var(--color-text-muted)] text-sm">Loading Hierarchy...</div>
      )}
    </div>
  );
}

function DroppableRoot() {
  const { setNodeRef, isOver } = useDroppable({ id: 'root' });
  return (
    <div ref={setNodeRef} className={`hidden`}></div>
  );
}

function TreeNode({ goal, allGoals, onSelectGoal, expanded, toggleExpand, depth, onAddChild, onDelete }: { goal: IGoal, allGoals: IGoal[], onSelectGoal: (id: string) => void, expanded: Record<string, boolean>, toggleExpand: (id: string) => void, depth: number, onAddChild: (id: string) => void, onDelete: (id: string) => void }) {
  const children = allGoals.filter(g => g.parentGoalId === goal._id);
  const isExpanded = expanded[goal._id] !== false; // default true
  
  const { attributes, listeners, setNodeRef: setDraggableRef, isDragging } = useDraggable({
    id: goal._id,
    data: { goal }
  });

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: goal._id,
  });

  const handleCheckboxClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const newStatus = goal.status === 'completed' ? 'not_started' : 'completed';
    const newProgress = newStatus === 'completed' ? 100 : goal.progress;
    await updateGoal(goal._id, { status: newStatus, progress: newProgress });
  };

  // Group children by Type to enforce visual hierarchy
  const typesOrder = ["Year", "Quarter", "Month", "Week", "Today"];
  
  // Sort children by hierarchy type so Quarter always appears before Month, etc.
  const sortedChildren = [...children].sort((a, b) => typesOrder.indexOf(a.goalType) - typesOrder.indexOf(b.goalType));

  return (
    <div className="flex flex-col">
      <div 
        ref={setDroppableRef}
        className={`group flex items-center gap-3 p-3 rounded-xl transition-colors ${isOver ? 'bg-[var(--color-accent-peach)]/10 ring-1 ring-[var(--color-accent-peach)]' : 'hover:bg-[var(--color-surface-elevated)]'} ${isDragging ? 'opacity-50' : ''}`}
        style={{ paddingLeft: `${Math.max(0.75, depth * 2)}rem` }}
      >
        <div 
          ref={setDraggableRef} 
          {...listeners} 
          {...attributes}
          className="cursor-grab active:cursor-grabbing p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <MoreVertical className="w-4 h-4" />
        </div>
        
        <div className="flex-1 flex items-center justify-between cursor-pointer" onClick={() => onSelectGoal(goal._id)}>
          <div className="flex items-center gap-3">
            <div onClick={handleCheckboxClick} className="cursor-pointer">
              {goal.status === "completed" ? <CheckCircle2 className="w-5 h-5 text-[var(--color-botanical-leaf)] shrink-0" /> : <Circle className="w-5 h-5 text-[var(--color-text-muted)] shrink-0" />}
            </div>
            <div className="flex flex-col gap-0.5">
              <span className={`text-sm font-semibold ${goal.status === 'completed' ? 'line-through text-[var(--color-text-muted)]' : 'text-[var(--color-text-primary)]'}`}>{goal.title}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-text-muted)]">{goal.goalType}</span>
                {goal.progress > 0 && <span className="text-[10px] font-bold text-[var(--color-botanical-leaf)]">{goal.progress}%</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {children.length > 0 && (
            <button 
              onClick={(e) => { e.stopPropagation(); toggleExpand(goal._id); }} 
              className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] rounded transition-colors"
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          )}
          <div className="opacity-0 group-hover:opacity-100 flex items-center transition-opacity">
            <GoalActionsMenu 
              goalId={goal._id}
              goalType={goal.goalType}
              onEdit={() => onSelectGoal(goal._id)}
              onAddChild={() => onAddChild(goal._id)}
              onDelete={() => onDelete(goal._id)}
              onArchive={async () => await updateGoal(goal._id, { status: "archived" })}
            />
          </div>
        </div>
      </div>

      {isExpanded && sortedChildren.length > 0 && (
        <div className="flex flex-col mt-1 relative">
          <div className="absolute left-[22px] top-0 bottom-0 w-px bg-[var(--color-border-soft)] z-0" style={{ left: `${Math.max(0.75, depth * 2) + 1.2}rem` }}></div>
          {sortedChildren.map(child => (
            <TreeNode 
              key={child._id} 
              goal={child} 
              allGoals={allGoals} 
              onSelectGoal={onSelectGoal} 
              expanded={expanded} 
              toggleExpand={toggleExpand} 
              depth={depth + 1} 
              onAddChild={onAddChild}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
