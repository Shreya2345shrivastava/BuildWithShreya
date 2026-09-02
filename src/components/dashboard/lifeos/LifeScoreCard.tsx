import React from "react";

export function LifeScoreCard() {
  const score = 85;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border-soft)] rounded-3xl p-8 shadow-[var(--shadow-gentle)] flex flex-col items-center justify-center text-center h-full relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--color-bg-sage-tint)] to-transparent opacity-50 z-0"></div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-6">
          Life Alignment
        </h3>
        
        <div className="relative flex items-center justify-center mb-6">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              className="text-[var(--color-bg-ivory)] stroke-current"
              strokeWidth="8"
              cx="64"
              cy="64"
              r="40"
              fill="transparent"
            ></circle>
            <circle
              className="text-[var(--color-accent-gold)] stroke-current transition-all duration-1000 ease-out"
              strokeWidth="8"
              strokeLinecap="round"
              cx="64"
              cy="64"
              r="40"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            ></circle>
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-3xl font-serif text-[var(--color-text-primary)]">{score}</span>
          </div>
        </div>

        <p className="text-sm font-medium text-[var(--color-text-secondary)]">
          You are highly aligned with your macro goals today. Keep the momentum.
        </p>
      </div>
    </div>
  );
}
