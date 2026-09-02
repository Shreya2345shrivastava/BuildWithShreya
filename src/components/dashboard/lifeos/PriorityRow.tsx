"use client";
import React, { useTransition } from "react";
import { Clock, CheckCircle2, Circle } from "lucide-react";
import { ITask } from "@/types/lifeos";
import { toggleTaskCompletion } from "@/lib/actions/lifeos/tasks.actions";
import { motion } from "framer-motion";

interface Props {
  task: ITask;
  isLast: boolean;
}

export function PriorityRow({ task, isLast }: Props) {
  const [isPending, startTransition] = useTransition();
  const [optimisticCompleted, setOptimisticCompleted] = React.useState(task.completed);

  // Sync state if task prop changes externally
  React.useEffect(() => {
    setOptimisticCompleted(task.completed);
  }, [task.completed]);

  const handleToggle = () => {
    const newCompleted = !optimisticCompleted;
    setOptimisticCompleted(newCompleted); // Optimistic immediate update
    
    startTransition(async () => {
      try {
        await toggleTaskCompletion(task._id, newCompleted);
      } catch (error) {
        // Revert on error
        setOptimisticCompleted(!newCompleted);
        console.error("Failed to toggle task", error);
      }
    });
  };

  const timeString = task.scheduledTime 
    ? new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(new Date(task.scheduledTime))
    : "Anytime";

  // For visual purposes, we can base progress on completeness or mock a progress value if not tracked.
  // The schema doesn't have a specific `progress` field for tasks, but does for goals.
  // We will just show 100% if completed, 0% if not.
  const progress = optimisticCompleted ? 100 : 0;

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.005 }}
      whileTap={{ scale: 0.99 }}
      onClick={handleToggle}
      disabled={isPending}
      className={`w-full text-left flex items-center gap-4 p-4 transition-colors duration-300 ease-out ${
        !isLast ? "border-b border-[var(--color-border-soft)]" : ""
      } ${optimisticCompleted ? "opacity-50" : "hover:bg-[var(--color-surface-elevated-hover)]"} cursor-pointer`}
    >
      <motion.div 
        layout
        initial={false}
        animate={{ 
          scale: optimisticCompleted ? [1, 1.2, 1] : 1,
          color: optimisticCompleted ? "var(--color-botanical-leaf)" : "var(--color-border-strong)"
        }}
        transition={{ duration: 0.3 }}
        className="flex-shrink-0"
      >
        {optimisticCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
      </motion.div>

      {/* Priority Tag */}
      <div className={`px-2 py-1 rounded text-xs font-bold ${
        task.priority === 'P1' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
        task.priority === 'P2' ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' :
        'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
      }`}>
        {task.priority}
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex flex-col">
          <span className={`text-sm font-medium truncate ${optimisticCompleted ? "text-[var(--color-text-muted)] line-through" : "text-[var(--color-text-primary)]"}`}>
            {task.title}
          </span>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
              <Clock size={12} />
              <span>{timeString}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-[var(--color-border-strong)]"></div>
            <span className="text-xs uppercase tracking-wider font-semibold text-[var(--color-text-secondary)]">
              {task.category}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 w-full sm:w-32 shrink-0">
          <div className="flex-1 h-1.5 bg-[var(--color-bg-ivory)] rounded-full overflow-hidden relative">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ 
                width: `${progress}%`,
                backgroundColor: optimisticCompleted ? "var(--color-botanical-leaf)" : "var(--color-text-secondary)"
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="absolute left-0 top-0 h-full rounded-full" 
            />
          </div>
          <span className="text-xs font-medium text-[var(--color-text-muted)] w-8 text-right">
            {progress}%
          </span>
        </div>
      </div>
    </motion.button>
  );
}
