import React from "react";
import { Sparkle } from "lucide-react";

export function MotivationCard() {
  return (
    <div className="relative overflow-hidden bg-[var(--color-accent-peach)] rounded-3xl p-8 shadow-[var(--shadow-md)] text-[var(--color-bg-ivory)]">
      {/* Decorative background elements */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-[var(--color-accent-gold)]/20 rounded-full blur-2xl"></div>
      
      <div className="relative z-10 flex flex-col h-full justify-center min-h-[160px]">
        <Sparkle className="w-6 h-6 mb-4 text-white/80" />
        <h3 className="font-serif text-2xl md:text-3xl leading-snug">
          Build It First.<br />
          <span className="text-white font-medium italic">Then Make It Beautiful.</span>
        </h3>
      </div>
    </div>
  );
}
