"use client";

import { Check } from "lucide-react";

const FEATURES = [
  "Mobile Responsive",
  "SEO Ready",
  "Fast Loading",
  "Custom Domain Support",
  "Easy Customization",
  "Lifetime Access",
];

export function MarketplaceFeatures() {
  return (
    <section className="py-12 border-t border-black/5 dark:border-white/5 bg-white dark:bg-[#0B1110]">
      <div className="max-w-[1200px] mx-auto w-full px-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        {FEATURES.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm font-medium text-black/70 dark:text-white/70">
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[var(--color-accent-peach)]/20 text-[var(--color-accent-peach)]">
              <Check size={12} strokeWidth={3} />
            </div>
            {feature}
          </div>
        ))}
      </div>
    </section>
  );
}
