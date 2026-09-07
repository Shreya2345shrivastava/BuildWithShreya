"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { ArrowRight, Laptop } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full min-h-[75vh] overflow-hidden bg-[var(--color-bg-ivory)] dark:bg-[#131715] py-24 px-6 border-t border-black/[0.03] dark:border-white/[0.02]">
      
      {/* Background Ambient Glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[1000px] lg:h-[1000px] rounded-full bg-[#E8DACB] dark:bg-[var(--color-accent-peach)] blur-[100px] lg:blur-[180px] pointer-events-none opacity-40 dark:opacity-[0.03]" 
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.02, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] lg:w-[700px] lg:h-[700px] rounded-full bg-[#F5F1EC] dark:bg-[#E0CDBF] blur-[80px] lg:blur-[150px] pointer-events-none opacity-50 dark:opacity-[0.02]" 
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[var(--color-accent-peach)]/20 dark:bg-transparent blur-[80px] pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-[1000px] w-full mx-auto">
        
        {/* Headline */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-serif text-[clamp(2.5rem,6vw,4rem)] text-black dark:text-white leading-[1.05] tracking-tight mb-16"
        >
          Choose your next step.
        </motion.h2>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          
          {/* LEFT COLUMN: Shop Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col h-full bg-white dark:bg-[#161818] p-10 rounded-3xl border border-black/5 dark:border-white/5 shadow-xl text-left"
          >
            <h3 className="font-serif text-3xl text-black dark:text-white mb-6">Shop Products</h3>
            <ul className="flex flex-col gap-3 mb-10 text-lg text-black/60 dark:text-white/60">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-peach)]" /> Books</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-peach)]" /> Resources</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-peach)]" /> LifeOS</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-peach)]" /> Website Templates</li>
            </ul>
            <div className="mt-auto">
              <Button
                href="/shop"
                size="lg"
                rounded={false}
                className="w-full justify-center px-8 py-4 shadow-[0_12px_28px_rgba(217,164,143,0.25)] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_18px_40px_rgba(217,164,143,0.32)]"
              >
                Browse Products
              </Button>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Custom Websites */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col h-full bg-[#131715] dark:bg-black p-10 rounded-3xl border border-black/10 dark:border-white/10 shadow-xl text-left relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[var(--color-accent-peach)]/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            
            <h3 className="relative z-10 font-serif text-3xl text-white mb-6">Need Something Custom?</h3>
            <p className="relative z-10 text-lg text-white/70 mb-10 leading-relaxed max-w-sm">
              Get a website designed specifically for your project, brand, event, or business.
            </p>
            <div className="relative z-10 mt-auto">
              <Button
                href="/custom-websites"
                variant="secondary"
                size="lg"
                className="w-full justify-center border-white/20 bg-white/5 px-8 py-4 text-white shadow-none backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:bg-white/10"
              >
                Get a Custom Website
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
