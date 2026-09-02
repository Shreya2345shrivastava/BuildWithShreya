"use client";

import React, { useState } from "react";
import { Activity, Brain, Moon, Timer } from "lucide-react";
import { IDailyMetric } from "@/types/lifeos";
import { Modal } from "./Modal";
import { motion } from "framer-motion";

interface Props {
  metrics?: IDailyMetric | null;
}

export function LifeMetrics({ metrics }: Props) {
  const [activeMetric, setActiveMetric] = useState<string | null>(null);

  const sleep = metrics?.sleepHours || 0;
  const deepWork = metrics?.deepWorkMinutes ? (metrics.deepWorkMinutes / 60).toFixed(1) : "0.0";
  
  // Basic calculation: (deepWork/240)*50 + (sleep/8)*50, capped at 100
  const dwScore = Math.min(((metrics?.deepWorkMinutes || 0) / 240) * 50, 50);
  const sleepScore = Math.min((sleep / 8) * 50, 50);
  const focusScore = Math.round(dwScore + sleepScore);

  let focusLabel = "Needs rest";
  if (focusScore >= 80) focusLabel = "Optimal";
  else if (focusScore >= 50) focusLabel = "Moderate";

  const renderHistory = () => (
    <div className="flex flex-col gap-4 text-[var(--color-text-secondary)] text-sm">
      <p>Your {activeMetric} history for the past 7 days will appear here as you log more data.</p>
      <div className="h-32 bg-[var(--color-surface-primary)] rounded-xl border border-[var(--color-border-subtle)] flex items-end justify-between p-4 px-8 mt-2">
        {/* Fake chart visualization */}
        {[40, 70, 45, 90, 65, 80, focusScore || 10].map((val, i) => (
          <div key={i} className="w-6 bg-[var(--color-border-strong)] rounded-t-sm" style={{ height: `${val}%` }} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-[var(--color-text-primary)]">
        <Activity size={20} className="text-[var(--color-text-secondary)]" />
        <h2 className="text-xl font-medium tracking-tight">Meaningful Metrics</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Metric 1 */}
        <motion.button 
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveMetric("Sleep")}
          className="bg-[var(--color-surface-elevated)] border border-[var(--color-border-soft)] hover:border-[var(--color-border-strong)] transition-colors rounded-2xl p-4 flex flex-col justify-between shadow-[var(--shadow-sm)] text-left"
        >
          <div className="flex items-center gap-2 text-[var(--color-text-muted)] mb-2">
            <Moon size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">Sleep</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-semibold text-[var(--color-text-primary)]">{sleep}</span>
            <span className="text-sm text-[var(--color-text-secondary)]">hrs</span>
          </div>
        </motion.button>

        {/* Metric 2 */}
        <motion.button 
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveMetric("Deep Work")}
          className="bg-[var(--color-surface-elevated)] border border-[var(--color-border-soft)] hover:border-[var(--color-border-strong)] transition-colors rounded-2xl p-4 flex flex-col justify-between shadow-[var(--shadow-sm)] text-left"
        >
          <div className="flex items-center gap-2 text-[var(--color-text-muted)] mb-2">
            <Timer size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">Deep Work</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-semibold text-[var(--color-text-primary)]">{deepWork}</span>
            <span className="text-sm text-[var(--color-text-secondary)]">hrs</span>
          </div>
        </motion.button>

        {/* Metric 3 */}
        <motion.button 
          whileHover={{ scale: 1.01, y: -2 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => setActiveMetric("Focus Score")}
          className="bg-[var(--color-surface-elevated)] border border-[var(--color-border-soft)] hover:border-[var(--color-border-strong)] transition-colors rounded-2xl p-4 flex flex-col justify-between shadow-[var(--shadow-sm)] col-span-2 text-left"
        >
          <div className="flex items-center gap-2 text-[var(--color-text-muted)] mb-2">
            <Brain size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">Focus Score</span>
          </div>
          <div className="flex items-center gap-4 w-full">
            <span className="text-3xl font-semibold text-[var(--color-text-primary)] shrink-0">{focusScore}</span>
            <div className="flex-1 h-2 bg-[var(--color-bg-ivory)] rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${focusScore >= 80 ? 'bg-[var(--color-botanical-leaf)]' : focusScore >= 50 ? 'bg-[var(--color-accent-gold)]' : 'bg-[var(--color-accent-peach)]'}`} 
                style={{ width: `${focusScore}%` }}
              ></div>
            </div>
            <span className="text-sm text-[var(--color-text-muted)] w-16 shrink-0">{focusLabel}</span>
          </div>
        </motion.button>
      </div>

      <Modal isOpen={!!activeMetric} onClose={() => setActiveMetric(null)} title={`${activeMetric} History`}>
        {renderHistory()}
      </Modal>
    </div>
  );
}
