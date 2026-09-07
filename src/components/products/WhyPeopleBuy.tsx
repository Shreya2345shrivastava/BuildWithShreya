"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Zap, Download, Compass } from "lucide-react";

const reasons = [
  {
    title: "Practical & Actionable",
    description: "No fluff. Every product is designed to give you concrete steps to move forward.",
    icon: Compass,
  },
  {
    title: "Easy to Use",
    description: "Built for beginners and creators alike, with simple onboarding and clear instructions.",
    icon: CheckCircle2,
  },
  {
    title: "Instant Access",
    description: "Download immediately after purchase. Start building your vision today.",
    icon: Download,
  },
  {
    title: "Built from Experience",
    description: "Created directly from the actual systems and workflows I use to run my business.",
    icon: Zap,
  },
];

export function WhyPeopleBuy() {
  return (
    <section className="py-24 px-6 bg-white dark:bg-[#0F1211]">
      <div className="max-w-[1200px] mx-auto w-full">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif text-black dark:text-white mb-4 tracking-tight">Why Choose Our Products?</h2>
          <p className="text-lg text-black/60 dark:text-white/60 max-w-2xl mx-auto">Tools built with intent, designed to help you execute.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center p-8 rounded-3xl bg-[var(--color-bg-ivory)] dark:bg-[#131715] border border-black/5 dark:border-white/5"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white dark:bg-[#1A1C1C] text-[var(--color-accent-peach)] mb-6 shadow-sm">
                  <Icon size={24} strokeWidth={2} />
                </div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-3">
                  {reason.title}
                </h3>
                <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
