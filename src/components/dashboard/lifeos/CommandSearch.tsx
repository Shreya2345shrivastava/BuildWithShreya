"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search, Command, CheckSquare, Calendar, Target, Repeat, BookOpen, Plus } from "lucide-react";
import { ITask, ITimelineEvent, IGoal, IHabit, IReflection } from "@/types/lifeos";
import { motion, AnimatePresence } from "framer-motion";
import { Modal } from "./Modal";
import { TaskForm } from "./TaskForm";
import { TimelineForm } from "./TimelineForm";
import { GoalForm } from "./GoalForm";
import { HabitForm } from "./HabitForm";
import { ReflectionForm } from "./ReflectionForm";

interface Props {
  tasks?: ITask[];
  events?: ITimelineEvent[];
  goals?: IGoal[];
  habits?: IHabit[];
  reflections?: IReflection[];
}

type ActionModal = "task" | "event" | "goal" | "habit" | "reflection" | null;

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ElementType;
  type: "action" | "task" | "event" | "goal" | "habit" | "reflection";
  onClick: () => void;
  completed?: boolean;
}

export function CommandSearch({ 
  tasks = [], 
  events = [], 
  goals = [], 
  habits = [], 
  reflections = [] 
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeModal, setActiveModal] = useState<ActionModal>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Actions
  const actions: CommandItem[] = [
    { id: "action-task", title: "Create Task", icon: Plus, type: "action", onClick: () => setActiveModal("task") },
    { id: "action-event", title: "Schedule Event", icon: Plus, type: "action", onClick: () => setActiveModal("event") },
    { id: "action-goal", title: "Create Goal", icon: Plus, type: "action", onClick: () => setActiveModal("goal") },
    { id: "action-habit", title: "Create Habit", icon: Plus, type: "action", onClick: () => setActiveModal("habit") },
    { id: "action-reflection", title: "Write Reflection", icon: Plus, type: "action", onClick: () => setActiveModal("reflection") },
  ];

  // Data Items
  const taskItems: CommandItem[] = tasks.map(t => ({
    id: `task-${t._id}`, title: t.title, subtitle: t.category, icon: CheckSquare, type: "task", completed: t.completed, onClick: () => {} 
  }));
  const eventItems: CommandItem[] = events.map(e => ({
    id: `event-${e._id}`, title: e.title, subtitle: e.type, icon: Calendar, type: "event", onClick: () => {}
  }));
  const goalItems: CommandItem[] = goals.map(g => ({
    id: `goal-${g._id}`, title: g.title, subtitle: g.category, icon: Target, type: "goal", completed: g.status === "completed", onClick: () => {}
  }));
  const habitItems: CommandItem[] = habits.map(h => ({
    id: `habit-${h._id}`, title: h.title, subtitle: h.frequency, icon: Repeat, type: "habit", onClick: () => {}
  }));
  const reflectionItems: CommandItem[] = reflections.map(r => ({
    id: `ref-${r._id}`, title: `Reflection for ${new Date(r.date).toLocaleDateString()}`, subtitle: "Journal", icon: BookOpen, type: "reflection", onClick: () => {}
  }));

  const allItems = [...actions, ...taskItems, ...eventItems, ...goalItems, ...habitItems, ...reflectionItems];

  // Filter
  const filteredItems = query
    ? allItems.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.subtitle?.toLowerCase().includes(query.toLowerCase())
      )
    : actions; // When empty, just show actions (could also append recently viewed here)

  // Groups
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  // Flatten for keyboard nav
  const flatItems = Object.values(groupedItems).flat();

  useEffect(() => {
    setActiveIndex(0);
  }, [query, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || activeModal) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % flatItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + flatItems.length) % flatItems.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const activeItem = flatItems[activeIndex];
        if (activeItem) {
          activeItem.onClick();
          if (activeItem.type === "action") setIsOpen(false); // Close menu when opening modal
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeIndex, flatItems, activeModal]);

  // Scroll into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [activeIndex]);

  const closeModal = () => setActiveModal(null);

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      action: "Actions", task: "Tasks", event: "Events", goal: "Goals", habit: "Habits", reflection: "Reflections"
    };
    return labels[type] || type;
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full max-w-md mx-auto mb-8 bg-[var(--color-surface-elevated)] border border-[var(--color-border-soft)] hover:border-[var(--color-border-strong)] transition-colors rounded-full px-6 py-3 flex items-center justify-between shadow-[var(--shadow-sm)] group cursor-pointer"
      >
        <div className="flex items-center gap-3 text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-colors">
          <Search size={18} />
          <span className="text-sm font-medium">Command search...</span>
        </div>
        <div className="flex items-center gap-1 text-[var(--color-text-muted)] text-xs font-semibold bg-[var(--color-surface-primary)] px-2 py-1 rounded-md border border-[var(--color-border-subtle)]">
          <Command size={12} />
          <span>K</span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex pt-24 justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="relative w-full max-w-2xl bg-[var(--color-surface-elevated)] border border-[var(--color-border-soft)] rounded-2xl shadow-2xl flex flex-col max-h-[60vh] overflow-hidden"
            >
              
              <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--color-border-subtle)]">
                <Search size={20} className="text-[var(--color-text-muted)]" />
                <input 
                  ref={inputRef}
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What do you need?"
                  className="flex-1 bg-transparent border-none outline-none text-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
                />
                <div className="flex items-center gap-1 text-[var(--color-text-muted)] text-xs font-semibold bg-[var(--color-surface-primary)] px-2 py-1 rounded-md border border-[var(--color-border-subtle)]">
                  ESC
                </div>
              </div>

              <div ref={listRef} className="overflow-y-auto p-2 flex flex-col gap-1">
                {Object.keys(groupedItems).map((type) => (
                  <div key={type} className="mb-2">
                    <h4 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1 px-3 mt-2">{getTypeLabel(type)}</h4>
                    <div className="flex flex-col gap-0.5">
                      {groupedItems[type].map((item) => {
                        const globalIndex = flatItems.findIndex(i => i.id === item.id);
                        const isActive = globalIndex === activeIndex;

                        return (
                          <div 
                            key={item.id} 
                            data-active={isActive}
                            onClick={() => {
                              item.onClick();
                              if (item.type === "action") setIsOpen(false);
                            }}
                            onMouseEnter={() => setActiveIndex(globalIndex)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                              isActive ? "bg-[var(--color-surface-primary)]" : "hover:bg-black/5 dark:hover:bg-white/5"
                            }`}
                          >
                            <item.icon size={16} className={item.completed ? "text-[var(--color-botanical-leaf)]" : "text-[var(--color-text-muted)]"} />
                            <span className={`text-sm font-medium ${item.completed ? "text-[var(--color-text-muted)] line-through" : "text-[var(--color-text-primary)]"}`}>
                              {item.title}
                            </span>
                            {item.subtitle && (
                              <span className="ml-auto text-xs px-2 py-0.5 rounded-md bg-[var(--color-border-subtle)] text-[var(--color-text-secondary)]">
                                {item.subtitle}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {flatItems.length === 0 && (
                  <div className="text-center py-16 flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-surface-primary)] flex items-center justify-center text-[var(--color-text-muted)] border border-[var(--color-border-subtle)]">
                      <Search size={24} />
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-semibold text-[var(--color-text-primary)]">No results found</span>
                      <span className="text-xs text-[var(--color-text-muted)] mt-1">We couldn't find anything matching "{query}"</span>
                    </div>
                  </div>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Action Modals */}
      <Modal isOpen={activeModal === "task"} onClose={closeModal} title="Create Task">
        <TaskForm onSuccess={closeModal} />
      </Modal>
      <Modal isOpen={activeModal === "event"} onClose={closeModal} title="Schedule Event">
        <TimelineForm onSuccess={closeModal} />
      </Modal>
      <Modal isOpen={activeModal === "goal"} onClose={closeModal} title="Create Goal">
        <GoalForm onSuccess={closeModal} />
      </Modal>
      <Modal isOpen={activeModal === "habit"} onClose={closeModal} title="Create Habit">
        <HabitForm onSuccess={closeModal} />
      </Modal>
      <Modal isOpen={activeModal === "reflection"} onClose={closeModal} title="Write Reflection">
        <ReflectionForm onSuccess={closeModal} />
      </Modal>
    </>
  );
}
