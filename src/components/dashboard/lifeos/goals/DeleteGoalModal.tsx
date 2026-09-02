"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { deleteGoal } from "@/lib/actions/lifeos/goals.actions";

interface Props {
  goalId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function DeleteGoalModal({ goalId, onClose, onSuccess }: Props) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await deleteGoal(goalId);
    setDeleting(false);
    onSuccess();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
          onClick={onClose}
        />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          exit={{ scale: 0.9, opacity: 0 }} 
          className="relative bg-[var(--color-surface-primary)] border border-red-200 p-8 rounded-2xl shadow-2xl max-w-md w-full flex flex-col gap-6 items-center text-center"
        >
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-[var(--color-text-primary)]">Delete Goal?</h3>
            <p className="text-sm text-[var(--color-text-muted)]">This action cannot be undone. All milestones and data associated with this goal will be removed.</p>
          </div>
          <div className="flex gap-3 w-full mt-4">
            <button onClick={onClose} disabled={deleting} className="flex-1 py-3 bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] rounded-xl font-medium hover:bg-[var(--color-border-subtle)] transition-colors">Cancel</button>
            <button onClick={handleDelete} disabled={deleting} className="flex-1 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors disabled:opacity-50">{deleting ? "Deleting..." : "Delete Forever"}</button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
