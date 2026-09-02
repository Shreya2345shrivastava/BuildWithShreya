"use client";
import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, Edit2, Plus, Copy, Trash, Archive } from "lucide-react";
import { createGoal } from "@/lib/actions/lifeos/goals.actions";

interface Props {
  goalId: string;
  goalType: string;
  lifeAreaId?: string;
  onEdit: () => void;
  onAddChild?: () => void;
  onDelete: () => void;
  onDuplicate?: () => void;
  onArchive?: () => void;
  className?: string;
}

export function GoalActionsMenu({ goalId, goalType, lifeAreaId, onEdit, onAddChild, onDelete, onDuplicate, onArchive, className = "" }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    setIsOpen(false);
    action();
  };

  return (
    <div className={`relative ${className}`} ref={menuRef} onClick={(e) => e.stopPropagation()}>
      <button 
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
        className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] rounded-lg transition-colors"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-[var(--color-surface-primary)] border border-[var(--color-border-subtle)] rounded-xl shadow-xl z-50 overflow-hidden flex flex-col py-1">
          <button onClick={(e) => handleAction(e, onEdit)} className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors text-left">
            <Edit2 className="w-4 h-4 text-[var(--color-text-muted)]" /> Edit Goal
          </button>
          
          {onAddChild && goalType !== "Today" && (
            <button onClick={(e) => handleAction(e, onAddChild)} className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors text-left">
              <Plus className="w-4 h-4 text-[var(--color-text-muted)]" /> Add Child Goal
            </button>
          )}

          {onDuplicate && (
            <button onClick={(e) => handleAction(e, onDuplicate)} className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors text-left">
              <Copy className="w-4 h-4 text-[var(--color-text-muted)]" /> Duplicate
            </button>
          )}

          <div className="h-px bg-[var(--color-border-soft)] my-1"></div>

          {onArchive && (
            <button onClick={(e) => handleAction(e, onArchive)} className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] transition-colors text-left">
              <Archive className="w-4 h-4 text-[var(--color-text-muted)]" /> Archive
            </button>
          )}

          <button onClick={(e) => handleAction(e, onDelete)} className="flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors text-left">
            <Trash className="w-4 h-4" /> Delete
          </button>
        </div>
      )}
    </div>
  );
}
