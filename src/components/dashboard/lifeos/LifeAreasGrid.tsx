"use client";

import React, { useState } from "react";
import { Heart, BookOpen, PenTool, Sparkles, Smile, LayoutGrid, TrendingUp, User, Briefcase, Users, DollarSign } from "lucide-react";
import { ILifeArea } from "@/types/lifeos";
import { SidePanel } from "./SidePanel";
import { motion } from "framer-motion";

const ICON_MAP: Record<string, React.ElementType> = {
  Health: Heart,
  Learning: BookOpen,
  Creator: PenTool,
  Spiritual: Sparkles,
  Beauty: Smile,
  Personal: User,
  Career: Briefcase,
  Relationships: Users,
  Finance: DollarSign,
};

// Default template if database is empty
const DEFAULT_AREAS = [
  { name: "Health", score: 0, progress: 0, streak: 0 },
  { name: "Learning", score: 0, progress: 0, streak: 0 },
  { name: "Creator", score: 0, progress: 0, streak: 0 },
  { name: "Spiritual", score: 0, progress: 0, streak: 0 },
  { name: "Beauty", score: 0, progress: 0, streak: 0 },
  { name: "Personal", score: 0, progress: 0, streak: 0 },
  { name: "Career", score: 0, progress: 0, streak: 0 },
  { name: "Relationships", score: 0, progress: 0, streak: 0 },
  { name: "Finance", score: 0, progress: 0, streak: 0 },
];

interface Props {
  areas?: ILifeArea[];
}

export function LifeAreasGrid({ areas = [] }: Props) {
  const [selectedArea, setSelectedArea] = useState<ILifeArea | null>(null);

  // Merge database areas with defaults to ensure all 5 are always displayed
  const displayAreas = DEFAULT_AREAS.map((def) => {
    const dbArea = areas.find((a) => a.name === def.name);
    return dbArea || def;
  }) as ILifeArea[];

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex items-center gap-2 text-[var(--color-text-primary)]">
        <LayoutGrid size={20} className="text-[var(--color-text-secondary)]" />
        <h2 className="text-xl font-medium tracking-tight">Life Areas Detail</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {displayAreas.map((area) => {
          const Icon = ICON_MAP[area.name as string] || Sparkles;
          
          return (
            <motion.button 
              key={area.name} 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedArea(area)}
              className="bg-[var(--color-surface-elevated)] border border-[var(--color-border-soft)] hover:border-[var(--color-border-strong)] transition-colors rounded-2xl p-5 shadow-[var(--shadow-sm)] flex flex-col gap-4 text-left cursor-pointer"
            >
              
              <div className="flex justify-between items-start w-full">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-primary)] border border-[var(--color-border-subtle)] flex items-center justify-center text-[var(--color-text-secondary)]">
                    <Icon size={16} />
                  </div>
                  <h3 className="font-semibold text-[var(--color-text-primary)]">{area.name}</h3>
                </div>
                <div className="text-lg font-bold text-[var(--color-text-primary)]">
                  {area.score}
                </div>
              </div>

              <div className="w-full">
                <div className="flex justify-between text-xs text-[var(--color-text-muted)] mb-1">
                  <span>Today's Progress</span>
                  <span>{(area as any).target || "Daily goal"}</span>
                </div>
                <div className="w-full h-1.5 bg-[var(--color-bg-ivory)] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[var(--color-text-secondary)] rounded-full transition-all duration-1000" 
                    style={{ width: `${area.score}%` }}
                  ></div>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--color-border-subtle)] flex items-center justify-between mt-auto w-full">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-muted)]">
                  <TrendingUp size={14} className="text-[var(--color-botanical-leaf)]" />
                  <span>{area.streak} day streak</span>
                </div>
                <span className="text-xs text-[var(--color-text-muted)]">
                  {area.score >= 80 ? "On track" : area.score >= 50 ? "Steady" : "Needs attention"}
                </span>
              </div>
              
            </motion.button>
          );
        })}
      </div>

      <SidePanel 
        isOpen={!!selectedArea} 
        onClose={() => setSelectedArea(null)} 
        area={selectedArea} 
      />
    </div>
  );
}
