"use client";

import React, { useState } from "react";
import { Plus, CheckSquare, Target, Activity, MessageSquare, BookOpen, PenTool, Calendar } from "lucide-react";
import { Modal } from "./Modal";
import { TaskForm } from "./TaskForm";
import { TimelineForm } from "./TimelineForm";
import { ReflectionForm } from "./ReflectionForm";
import { GoalForm } from "./GoalForm";
import { HabitForm } from "./HabitForm";
import { motion, AnimatePresence } from "framer-motion";

export function QuickCapture() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const OPTIONS = [
    { id: "task", label: "Add Task", icon: CheckSquare },
    { id: "timeline", label: "Add Timeline Event", icon: Calendar },
    { id: "reflection", label: "Add Reflection", icon: MessageSquare },
    { id: "goal", label: "Add Goal", icon: Target },
    { id: "habit", label: "Add Habit", icon: Activity },
  ];

  const closeModal = () => {
    setActiveModal(null);
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-3">
        {/* Menu Options */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
                visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
              }}
              className="flex flex-col gap-2"
            >
              {OPTIONS.map((opt) => (
                <motion.button 
                  key={opt.id} 
                  variants={{
                    hidden: { opacity: 0, y: 15, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1 }
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onClick={() => setActiveModal(opt.id)}
                  className="flex items-center justify-between gap-4 bg-[var(--color-surface-elevated)] hover:bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] pl-4 pr-3 py-2.5 rounded-xl shadow-[var(--shadow-md)] transition-colors group w-56"
                >
                  <span className="text-sm font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">
                    {opt.label}
                  </span>
                  <opt.icon size={16} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-colors" />
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-14 h-14 bg-[var(--color-text-primary)] hover:bg-black dark:hover:bg-white text-[var(--color-bg-ivory)] dark:text-black rounded-full shadow-[var(--shadow-floating)] flex items-center justify-center transition-colors z-50 relative"
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Plus className="w-6 h-6" />
          </motion.div>
        </motion.button>
      </div>

      {/* Modals */}
      <Modal isOpen={activeModal === "task"} onClose={closeModal} title="Create Task">
        <TaskForm onSuccess={closeModal} />
      </Modal>

      <Modal isOpen={activeModal === "timeline"} onClose={closeModal} title="Schedule Event">
        <TimelineForm onSuccess={closeModal} />
      </Modal>

      <Modal isOpen={activeModal === "reflection"} onClose={closeModal} title="Daily Reflection">
        <ReflectionForm onSuccess={closeModal} />
      </Modal>

      <Modal isOpen={activeModal === "goal"} onClose={closeModal} title="Create Goal">
        <GoalForm onSuccess={closeModal} />
      </Modal>

      <Modal isOpen={activeModal === "habit"} onClose={closeModal} title="Create Habit">
        <HabitForm onSuccess={closeModal} />
      </Modal>
    </>
  );
}
