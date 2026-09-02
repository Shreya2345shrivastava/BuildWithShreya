import React from "react";
import { ListTodo, ChevronRight } from "lucide-react";
import { ITask } from "@/types/lifeos";
import { PriorityRow } from "./PriorityRow";

interface Props {
  tasks: ITask[];
}

export function TodaysPriorities({ tasks }: Props) {
  // Sort tasks by priority (P1 -> P2 -> P3)
  const sortedTasks = [...tasks].sort((a, b) => a.priority.localeCompare(b.priority));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[var(--color-text-primary)]">
          <ListTodo size={20} className="text-[var(--color-text-secondary)]" />
          <h2 className="text-xl font-medium tracking-tight">Today's Priorities</h2>
        </div>
        <button className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors text-sm font-medium flex items-center">
          View All <ChevronRight size={16} />
        </button>
      </div>

      <div className="flex flex-col rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface-elevated)] overflow-hidden shadow-[var(--shadow-sm)]">
        {sortedTasks.length === 0 ? (
          <div className="p-6 text-center text-[var(--color-text-muted)] text-sm">
            No priorities scheduled for today.
          </div>
        ) : (
          sortedTasks.map((task, idx) => (
            <PriorityRow key={task._id} task={task} isLast={idx === sortedTasks.length - 1} />
          ))
        )}
      </div>
    </div>
  );
}
