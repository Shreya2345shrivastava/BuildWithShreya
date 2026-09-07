"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { ArrowRight } from "lucide-react";

export function ShopCTA() {
  return (
    <section className="relative py-32 px-6 bg-white dark:bg-[#0F1211] overflow-hidden">

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[var(--color-accent-peach)]/12 dark:bg-[var(--color-accent-peach)]/6 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-[720px] mx-auto w-full flex flex-col items-center text-center">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-peach)] mb-6"
        >
          Get Started
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[clamp(2.8rem,6vw,5rem)] text-black dark:text-white leading-[1.04] tracking-tight mb-7"
        >
          Ready to Build<br />
          <span className="text-[var(--color-accent-peach)]">Something Meaningful?</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg text-black/55 dark:text-white/50 font-medium leading-relaxed max-w-[540px] mb-12"
        >
          Explore the systems, resources, and tools designed to help creators move from ideas to execution.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            href="#collections"
            size="lg"
            rounded={false}
            className="group inline-flex items-center gap-2 w-full sm:w-auto justify-center px-8 py-[1.05rem] shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            Browse Products
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Button>

          <Button
            href="#bestsellers"
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto justify-center px-8 py-[1.05rem] border-[1.5px] border-black/15 dark:border-white/15 text-black dark:text-white bg-transparent hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 hover:-translate-y-1"
          >
            View Bestsellers
          </Button>
        </motion.div>

        {/* Divider line with label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="flex items-center gap-4 mt-14 w-full max-w-xs"
        >
          <div className="flex-1 h-px bg-black/8 dark:bg-white/8" />
          <span className="text-xs text-black/35 dark:text-white/30 font-medium whitespace-nowrap">
            Instant download · Secure payment
          </span>
          <div className="flex-1 h-px bg-black/8 dark:bg-white/8" />
        </motion.div>

      </div>
    </section>
  );
}
