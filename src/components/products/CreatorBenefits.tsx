"use client";

import { motion } from "framer-motion";
import { Zap, Wrench, Download } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Actionable",
    description:
      "Every resource is designed for implementation, not inspiration. You'll know exactly what to do next.",
    accent: "#d9a48f",
  },
  {
    icon: Wrench,
    title: "Professional",
    description:
      "Built using real workflows and systems — the same ones used to run an actual creator business.",
    accent: "#a8b69d",
  },
  {
    icon: Download,
    title: "Instant Access",
    description:
      "Immediate download after purchase. No waiting, no friction. Start building the same day.",
    accent: "#c8aa6d",
  },
];

export function CreatorBenefits() {
  return (
    <section className="py-28 px-6 bg-[var(--color-bg-ivory)] dark:bg-[#131715]">
      <div className="max-w-[1200px] mx-auto w-full">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-peach)] mb-3">
            Why it works
          </p>
          <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.5rem)] text-black dark:text-white leading-[1.08] tracking-tight">
            Built for Creators
          </h2>
        </motion.div>

        {/* 3 Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col p-8 rounded-3xl bg-white dark:bg-[#161818] border border-black/6 dark:border-white/6 overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-400"
              >
                {/* Subtle accent glow */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: benefit.accent + "40" }}
                />

                {/* Icon */}
                <div
                  className="relative flex items-center justify-center w-12 h-12 rounded-2xl mb-7 shadow-sm"
                  style={{ backgroundColor: benefit.accent + "20" }}
                >
                  <Icon size={20} strokeWidth={1.8} style={{ color: benefit.accent }} />
                </div>

                {/* Number + Title */}
                <div className="flex items-baseline gap-3 mb-3">
                  <span
                    className="text-[11px] font-bold tabular-nums"
                    style={{ color: benefit.accent + "99" }}
                  >
                    0{idx + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-black dark:text-white">
                    {benefit.title}
                  </h3>
                </div>

                <p className="text-sm text-black/55 dark:text-white/45 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
