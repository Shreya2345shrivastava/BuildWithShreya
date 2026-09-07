"use client";

import { motion } from "framer-motion";
import { Smartphone, Zap, Settings2, Globe2, Rocket } from "lucide-react";

const STATS = [
  { label: "50+ Templates", icon: Globe2 },
  { label: "Mobile Optimized", icon: Smartphone },
  { label: "SEO Ready", icon: Zap },
  { label: "Easy Customization", icon: Settings2 },
  { label: "Fast Setup", icon: Rocket },
];

export function MarketplaceStats() {
  return (
    <section className="border-y border-black/5 dark:border-white/5 bg-white/50 dark:bg-[#161818]/50 backdrop-blur-md sticky top-[72px] z-40 overflow-hidden">
      <div className="max-w-[1200px] mx-auto w-full px-6 py-4 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        {STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + idx * 0.1, ease: "easeOut" }}
              className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-black/60 dark:text-white/60 shrink-0"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 text-[var(--color-accent-peach)]">
                <Icon size={14} strokeWidth={2.5} />
              </div>
              {stat.label}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
