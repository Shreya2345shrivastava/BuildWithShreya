import React from "react";
import { Quote } from "lucide-react";

export function ReflectionCard() {
  return (
    <div className="relative overflow-hidden bg-[var(--color-surface-elevated)] border border-[var(--color-border-soft)] rounded-3xl p-8 shadow-[var(--shadow-sm)]">
      {/* Decorative background elements */}
      <div className="absolute -top-4 -right-4 text-[var(--color-bg-peach-tint)] opacity-50 z-0 transform rotate-12">
        <Quote size={120} />
      </div>
      
      <div className="relative z-10 flex flex-col h-full justify-between min-h-[160px]">
        <div>
          <h3 className="text-xs uppercase tracking-widest font-bold text-[var(--color-text-muted)] mb-6">
            Today's Reflection
          </h3>
          
          <blockquote className="font-serif text-2xl md:text-3xl leading-snug text-[var(--color-text-primary)]">
            Build It First.<br />
            <span className="text-[var(--color-accent-peach)] italic">Then Make It Beautiful.</span>
          </blockquote>
        </div>
        
        <div className="mt-8">
          <p className="text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
            Consistency compounds.
          </p>
        </div>
      </div>
    </div>
  );
}
