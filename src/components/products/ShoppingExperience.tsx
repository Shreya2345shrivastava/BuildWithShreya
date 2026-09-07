"use client";

import { motion } from "framer-motion";
import { Search, ShoppingBag, ShieldCheck, Zap } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Discover",
    description: "Find the exact framework, template, or system you need.",
    icon: Search,
  },
  {
    id: 2,
    title: "Add to Cart",
    description: "Review your selection and head to our secure checkout.",
    icon: ShoppingBag,
  },
  {
    id: 3,
    title: "Secure Checkout",
    description: "Pay safely via our encrypted payment processor.",
    icon: ShieldCheck,
  },
  {
    id: 4,
    title: "Instant Access",
    description: "Get immediate access to your digital downloads and links.",
    icon: Zap,
  },
];

export function ShoppingExperience() {
  return (
    <section className="py-24 px-6 bg-[var(--color-bg-ivory)] dark:bg-[#131715]">
      <div className="max-w-[1000px] mx-auto w-full">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif text-black dark:text-white mb-4 tracking-tight">Seamless Experience</h2>
          <p className="text-lg text-black/60 dark:text-white/60 max-w-2xl mx-auto">From discovery to execution in minutes.</p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent -translate-y-1/2 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-[#1A1C1C] text-[var(--color-accent-peach)] border-[4px] border-[var(--color-bg-ivory)] dark:border-[#131715] shadow-sm mb-6">
                    <Icon size={24} strokeWidth={2} />
                    
                    {/* Step Number Badge */}
                    <div className="absolute -top-1 -right-1 w-6 h-6 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold shadow-sm">
                      {step.id}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed max-w-[200px]">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
