"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Target } from "lucide-react";
import { createGoal } from "@/lib/actions/lifeos/goals.actions";

interface Props {
  parentGoalId?: string;
  defaultGoalType?: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateGoalModal({ parentGoalId, defaultGoalType = "Year", onClose, onSuccess }: Props) {
  const [title, setTitle] = useState("");
  const [goalType, setGoalType] = useState(defaultGoalType);
  const [lifeAreaId, setLifeAreaId] = useState("");
  const [priority, setPriority] = useState("P3");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    setSaving(true);
    await createGoal({
      title,
      goalType: goalType as any,
      lifeAreaId: lifeAreaId || undefined,
      parentGoalId: parentGoalId || undefined,
      priority: priority as any,
      status: "not_started"
    });
    setSaving(false);
    onSuccess();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-[var(--color-surface-primary)] border border-[var(--color-border-subtle)] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        >
          <div className="p-6 border-b border-[var(--color-border-subtle)] flex items-center justify-between bg-[var(--color-surface-elevated)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--color-accent-peach)]/10 text-[var(--color-accent-peach)] rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Create New Goal</h2>
                <p className="text-xs text-[var(--color-text-muted)]">Define your next milestone.</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-primary)] rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Goal Title <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                value={title} 
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Become a Senior Developer"
                autoFocus
                className="w-full bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] text-[var(--color-text-primary)] text-base rounded-xl px-4 py-3 outline-none focus:border-[var(--color-accent-peach)] transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Goal Type</label>
                <select value={goalType} onChange={e => setGoalType(e.target.value)} className="bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] text-[var(--color-text-primary)] text-sm rounded-xl px-4 py-3 outline-none hover:border-[var(--color-text-secondary)] transition-colors">
                  <option value="Year">Year Goal</option>
                  <option value="Quarter">Quarter Goal</option>
                  <option value="Month">Month Goal</option>
                  <option value="Week">Week Goal</option>
                  <option value="Today">Today Goal</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Priority</label>
                <select value={priority} onChange={e => setPriority(e.target.value)} className="bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] text-[var(--color-text-primary)] text-sm rounded-xl px-4 py-3 outline-none hover:border-[var(--color-text-secondary)] transition-colors">
                  <option value="P1">P1 - Highest</option>
                  <option value="P2">P2 - High</option>
                  <option value="P3">P3 - Medium</option>
                  <option value="P4">P4 - Low</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Life Area</label>
              <select value={lifeAreaId} onChange={e => setLifeAreaId(e.target.value)} className="w-full bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] text-[var(--color-text-primary)] text-sm rounded-xl px-4 py-3 outline-none hover:border-[var(--color-text-secondary)] transition-colors">
                <option value="">Uncategorized</option>
                <option value="career">Career & Work</option>
                <option value="financial">Financial</option>
                <option value="health">Health & Vitality</option>
                <option value="learning">Learning</option>
                <option value="creator">Creator</option>
                <option value="spiritual">Spiritual</option>
                <option value="relationships">Relationships</option>
                <option value="lifestyle">Lifestyle</option>
              </select>
            </div>

            {parentGoalId && (
              <div className="p-3 bg-[var(--color-accent-peach)]/10 text-[var(--color-accent-peach)] border border-[var(--color-accent-peach)]/20 rounded-xl text-xs font-medium">
                This goal will be created as a child of the selected parent.
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-[var(--color-border-soft)]">
              <button type="button" onClick={onClose} className="flex-1 py-3 bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] rounded-xl font-medium hover:bg-[var(--color-border-subtle)] transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={!title.trim() || saving} className="flex-1 py-3 bg-[var(--color-accent-peach)] text-white rounded-xl font-medium hover:bg-opacity-90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
                <Save className="w-4 h-4" /> {saving ? "Creating..." : "Create Goal"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
