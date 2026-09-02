"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IVision } from "@/types/lifeos";
import { updateVision } from "@/lib/actions/lifeos/vision.actions";
import { Sparkles, Briefcase, DollarSign, HeartPulse, BookOpen, Palette, Infinity, Users, Coffee, ArrowRight, Trash2 } from "lucide-react";

interface Props {
  vision: IVision;
}

const AREAS = [
  { id: "career", label: "Career & Work", icon: <Briefcase /> },
  { id: "financial", label: "Financial Freedom", icon: <DollarSign /> },
  { id: "health", label: "Health & Vitality", icon: <HeartPulse /> },
  { id: "learning", label: "Growth & Learning", icon: <BookOpen /> },
  { id: "creator", label: "Creator & Output", icon: <Palette /> },
  { id: "spiritual", label: "Spiritual & Mental", icon: <Infinity /> },
  { id: "relationships", label: "Relationships & Family", icon: <Users /> },
  { id: "lifestyle", label: "Lifestyle & Joy", icon: <Coffee /> }
] as const;

export function VisionDashboard({ vision }: Props) {
  const [saving, setSaving] = useState(false);
  const [localVision, setLocalVision] = useState(vision);

  const handleSave = async (areaId: keyof IVision, field: string, val: string) => {
    const updatedArea = { ...(localVision[areaId] as any), [field]: val };
    setLocalVision(prev => ({ ...prev, [areaId]: updatedArea }));
    
    setSaving(true);
    await updateVision({ [areaId]: updatedArea });
    setSaving(false);
  };

  const handleClear = async (areaId: keyof IVision) => {
    const emptyArea = { vision: "", why: "", currentState: "", targetState: "" };
    setLocalVision(prev => ({ ...prev, [areaId]: emptyArea }));
    
    setSaving(true);
    await updateVision({ [areaId]: emptyArea });
    setSaving(false);
  };

  return (
    <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-soft)] rounded-2xl p-6 sm:p-8 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-[var(--color-text-primary)]">
          <Sparkles className="w-5 h-5 text-[var(--color-accent-peach)]" />
          <h2 className="text-xl font-serif">Life Areas & Vision</h2>
        </div>
        {saving && <span className="text-xs font-semibold text-[var(--color-text-muted)] animate-pulse">Saving...</span>}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {AREAS.map(area => {
          const data = (localVision[area.id as keyof IVision] as any) || { vision: "", why: "", currentState: "", targetState: "" };
          
          return (
            <div key={area.id} className="group bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-strong)] rounded-xl flex flex-col overflow-hidden transition-colors shadow-sm">
              <div className="bg-[var(--color-surface-primary)] border-b border-[var(--color-border-subtle)] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 text-[var(--color-accent-peach)]">
                  <div className="w-5 h-5 flex items-center justify-center">{area.icon}</div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-primary)]">{area.label}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleClear(area.id as keyof IVision)} className="opacity-0 group-hover:opacity-100 p-1.5 text-[var(--color-text-muted)] hover:text-red-500 hover:bg-red-50 rounded transition-all" title="Clear Vision Data">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <Link href={`/dashboard/lifeos/areas/${area.id}`} className="flex items-center gap-1 text-[10px] uppercase font-bold text-[var(--color-text-muted)] hover:text-[var(--color-accent-peach)] bg-[var(--color-surface-elevated)] px-2 py-1 rounded transition-colors">
                    Module <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
              
              <div className="p-5 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Ultimate Vision</label>
                  <input
                    type="text"
                    defaultValue={data.vision}
                    onBlur={e => { if (e.target.value !== data.vision) handleSave(area.id as keyof IVision, "vision", e.target.value) }}
                    placeholder="E.g., Become a recognized expert..."
                    className="w-full bg-transparent border-none outline-none text-sm text-[var(--color-text-primary)] placeholder:italic placeholder:text-[var(--color-border-strong)]"
                  />
                </div>
                
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">The Why</label>
                  <input
                    type="text"
                    defaultValue={data.why}
                    onBlur={e => { if (e.target.value !== data.why) handleSave(area.id as keyof IVision, "why", e.target.value) }}
                    placeholder="Why is this important to you?"
                    className="w-full bg-transparent border-none outline-none text-sm text-[var(--color-text-primary)] placeholder:italic placeholder:text-[var(--color-border-strong)]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-2 pt-4 border-t border-[var(--color-border-soft)]">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Current State</label>
                    <input
                      type="text"
                      defaultValue={data.currentState}
                      onBlur={e => { if (e.target.value !== data.currentState) handleSave(area.id as keyof IVision, "currentState", e.target.value) }}
                      placeholder="Where are you now?"
                      className="w-full bg-transparent border-none outline-none text-sm text-[var(--color-text-primary)] placeholder:italic placeholder:text-[var(--color-border-strong)]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Target State (This Year)</label>
                    <input
                      type="text"
                      defaultValue={data.targetState}
                      onBlur={e => { if (e.target.value !== data.targetState) handleSave(area.id as keyof IVision, "targetState", e.target.value) }}
                      placeholder="Where will you be?"
                      className="w-full bg-transparent border-none outline-none text-sm text-[var(--color-text-primary)] placeholder:italic placeholder:text-[var(--color-border-strong)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
