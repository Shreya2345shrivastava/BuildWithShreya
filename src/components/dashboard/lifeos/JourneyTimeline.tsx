import React from "react";
import { Sun, Sunset, Moon } from "lucide-react";

const JOURNEY = [
  {
    period: "Morning",
    icon: Sun,
    color: "text-[var(--color-accent-gold)]",
    bg: "bg-[var(--color-surface-elevated)]",
    items: ["Worship", "Water", "Skincare"],
  },
  {
    period: "Afternoon",
    icon: Sunset,
    color: "text-[var(--color-accent-peach)]",
    bg: "bg-[var(--color-bg-peach-tint)]",
    items: ["Study", "Deep Work"],
  },
  {
    period: "Evening",
    icon: Moon,
    color: "text-[var(--color-botanical-moss)]",
    bg: "bg-[var(--color-bg-sage-tint)]",
    items: ["Walk", "Reading"],
  },
];

export function JourneyTimeline() {
  return (
    <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border-soft)] rounded-3xl p-8 shadow-[var(--shadow-sm)]">
      <h2 className="text-xl font-serif text-[var(--color-text-primary)] mb-8">
        Today's Journey
      </h2>

      <div className="relative border-l-2 border-[var(--color-border-subtle)] ml-4 space-y-8 pb-4">
        {JOURNEY.map((phase) => (
          <div key={phase.period} className="relative pl-8">
            <div className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full border-[4px] border-[var(--color-surface-elevated)] ${phase.bg} flex items-center justify-center shadow-sm`}>
              <phase.icon className={`w-3.5 h-3.5 ${phase.color}`} />
            </div>
            
            <h3 className="text-lg font-serif font-medium text-[var(--color-text-primary)] mb-3">
              {phase.period}
            </h3>
            
            <ul className="space-y-2">
              {phase.items.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-border-strong)]"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
