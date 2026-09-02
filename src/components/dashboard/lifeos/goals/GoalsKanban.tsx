"use client";
import React, { useState, useEffect } from "react";
import { IGoal } from "@/types/lifeos";
import { LayoutGrid, Search, Filter, ArrowUpDown, CheckCircle2, Circle, Flag } from "lucide-react"; 
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects
} from "@dnd-kit/core";
import { 
  SortableContext, 
  arrayMove, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { updateGoal } from "@/lib/actions/lifeos/goals.actions";
import { GoalActionsMenu } from "./GoalActionsMenu";

interface KanbanProps {
  goals: IGoal[];
  onSelectGoal: (id: string) => void;
  onAddChild: (id: string) => void;
  onDelete: (id: string) => void;
}

const COLUMNS = [
  { id: "not_started", title: "Planned" },
  { id: "in_progress", title: "Active" },
  { id: "completed", title: "Completed" },
  { id: "archived", title: "Archived" }
];

export function GoalsKanban({ goals: initialGoals, onSelectGoal, onAddChild, onDelete }: KanbanProps) {
  const [goals, setGoals] = useState(initialGoals);
  const [activeId, setActiveId] = useState<string | null>(null);
  
  // Filtering and Sorting State
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("priority");

  useEffect(() => {
    setGoals(initialGoals);
  }, [initialGoals]);

  // Apply filters & sorts
  const filteredGoals = goals.filter(g => {
    if (searchQuery && !g.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (typeFilter !== "all" && g.goalType !== typeFilter) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "priority") return a.priority.localeCompare(b.priority);
    if (sortBy === "progress") return b.progress - a.progress;
    return 0;
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";
    const isOverColumn = over.data.current?.type === "Column";

    if (!isActiveTask) return;

    // Dropping a Task over another Task
    if (isActiveTask && isOverTask) {
      setGoals((prev) => {
        const activeIndex = prev.findIndex((t) => t._id === activeId);
        const overIndex = prev.findIndex((t) => t._id === overId);

        if (prev[activeIndex].status !== prev[overIndex].status) {
          const updated = [...prev];
          updated[activeIndex] = { ...updated[activeIndex], status: prev[overIndex].status };
          return arrayMove(updated, activeIndex, overIndex);
        }

        return arrayMove(prev, activeIndex, overIndex);
      });
    }

    // Dropping a Task over an empty Column
    if (isActiveTask && isOverColumn) {
      setGoals((prev) => {
        const activeIndex = prev.findIndex((t) => t._id === activeId);
        const updated = [...prev];
        updated[activeIndex] = { ...updated[activeIndex], status: overId as "not_started" | "in_progress" | "completed" | "archived" };
        return arrayMove(updated, activeIndex, activeIndex);
      });
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const activeGoal = goals.find(g => g._id === activeId);
    
    if (activeGoal) {
      // Find what column it landed in based on current goals state
      const currentGoalInState = goals.find(g => g._id === activeId);
      if (currentGoalInState) {
        // Persist to DB
        await updateGoal(activeId as string, { status: currentGoalInState.status });
      }
    }
  };

  const activeGoal = activeId ? goals.find(g => g._id === activeId) : null;

  return (
    <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-[var(--color-text-primary)]">
          <LayoutGrid className="w-5 h-5 text-[var(--color-accent-peach)]" />
          <h2 className="text-xl font-serif">Goals Board</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input 
              type="text"
              placeholder="Search goals..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] text-sm rounded-lg outline-none focus:border-[var(--color-accent-peach)] w-40 sm:w-64 transition-all"
            />
          </div>

          {/* Type Filter */}
          <div className="relative">
            <Filter className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-muted)]" />
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="pl-9 pr-8 py-2 bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] text-sm rounded-lg outline-none appearance-none hover:border-[var(--color-text-secondary)] transition-colors"
            >
              <option value="all">All Types</option>
              <option value="Year">Year</option>
              <option value="Quarter">Quarter</option>
              <option value="Month">Month</option>
              <option value="Week">Week</option>
              <option value="Today">Today</option>
            </select>
          </div>

          {/* Sort */}
          <div className="relative">
            <ArrowUpDown className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-muted)]" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="pl-9 pr-8 py-2 bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] text-sm rounded-lg outline-none appearance-none hover:border-[var(--color-text-secondary)] transition-colors"
            >
              <option value="priority">Sort: Priority</option>
              <option value="progress">Sort: Progress</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto pb-4">
        <DndContext 
          sensors={sensors} 
          collisionDetection={closestCorners} 
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 min-w-max pb-4 overflow-x-auto snap-x">
            {COLUMNS.map(col => (
              <Column key={col.id} id={col.id} title={col.title} goals={filteredGoals.filter(g => g.status === col.id)} onSelectGoal={onSelectGoal} onAddChild={onAddChild} onDelete={onDelete} />
            ))}
          </div>

          <DragOverlay dropAnimation={{ sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: "0.4" } } }) }}>
            {activeGoal ? <GoalCard goal={activeGoal} isOverlay onSelectGoal={onSelectGoal} onAddChild={onAddChild} onDelete={onDelete} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}

function Column({ id, title, goals, onSelectGoal, onAddChild, onDelete }: { id: string; title: string; goals: IGoal[], onSelectGoal: (id: string) => void, onAddChild: (id: string) => void, onDelete: (id: string) => void }) {
  const { setNodeRef } = useSortable({
    id: id,
    data: { type: "Column" }
  });

  return (
    <div 
      ref={setNodeRef}
      className="w-80 flex-shrink-0 bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] rounded-xl flex flex-col"
    >
      <div className="p-4 border-b border-[var(--color-border-subtle)] flex items-center justify-between">
        <h3 className="font-semibold text-[var(--color-text-primary)]">{title}</h3>
        <span className="text-xs font-semibold bg-[var(--color-surface-primary)] text-[var(--color-text-muted)] px-2 py-1 rounded-full">{goals.length}</span>
      </div>
      <div className="p-3 flex flex-col gap-3 min-h-[300px]">
        <SortableContext items={goals.map(g => g._id)} strategy={verticalListSortingStrategy}>
          {goals.map(goal => (
            <SortableGoalCard key={goal._id} goal={goal} onSelectGoal={onSelectGoal} onAddChild={onAddChild} onDelete={onDelete} />
          ))}
        </SortableContext>
        {goals.length === 0 && (
          <div className="text-center p-4 text-xs text-[var(--color-text-muted)] italic opacity-60">No goals in this status</div>
        )}
      </div>
    </div>
  );
}

function SortableGoalCard({ goal, onSelectGoal, onAddChild, onDelete }: { goal: IGoal, onSelectGoal: (id: string) => void, onAddChild: (id: string) => void, onDelete: (id: string) => void }) {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: goal._id,
    data: { type: "Task", goal }
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div ref={setNodeRef} style={style} className="bg-[var(--color-surface-primary)] border-2 border-dashed border-[var(--color-accent-peach)] opacity-30 rounded-xl h-[120px] w-full" />
    );
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <GoalCard goal={goal} onSelectGoal={onSelectGoal} onAddChild={onAddChild} onDelete={onDelete} />
    </div>
  );
}

function GoalCard({ goal, isOverlay = false, onSelectGoal, onAddChild, onDelete }: { goal: IGoal, isOverlay?: boolean, onSelectGoal: (id: string) => void, onAddChild: (id: string) => void, onDelete: (id: string) => void }) {
  const handleCheckboxClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const newStatus = goal.status === 'completed' ? 'not_started' : 'completed';
    const newProgress = newStatus === 'completed' ? 100 : goal.progress;
    await updateGoal(goal._id, { status: newStatus, progress: newProgress });
  };

  return (
    <div 
      onClick={() => onSelectGoal(goal._id)}
      className={`group bg-[var(--color-surface-primary)] border border-[var(--color-border-strong)] p-4 rounded-xl shadow-sm cursor-grab active:cursor-grabbing relative overflow-hidden ${isOverlay ? 'shadow-xl scale-105 rotate-2' : 'hover:border-[var(--color-text-secondary)] transition-colors'}`}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">{goal.goalType}</span>
        <div className="flex items-center gap-1">
          <div onClick={handleCheckboxClick} className="cursor-pointer mr-1">
            {goal.status === "completed" ? <CheckCircle2 className="w-4 h-4 text-[var(--color-botanical-leaf)]" /> : <Circle className="w-4 h-4 text-[var(--color-text-muted)]" />}
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
            goal.priority === 'P1' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
            goal.priority === 'P2' ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' :
            'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
          }`}>{goal.priority}</span>
          
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
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
      <h4 className={`font-semibold text-sm mb-3 leading-tight ${goal.status === 'completed' ? 'line-through text-[var(--color-text-muted)]' : 'text-[var(--color-text-primary)]'}`}>{goal.title}</h4>
      <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
        <span className="font-medium">{goal.progress}%</span>
        <div className="w-2/3 bg-[var(--color-border-subtle)] h-1.5 rounded-full overflow-hidden">
          <div className="bg-[var(--color-botanical-leaf)] h-full rounded-full transition-all" style={{ width: `${goal.progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}
