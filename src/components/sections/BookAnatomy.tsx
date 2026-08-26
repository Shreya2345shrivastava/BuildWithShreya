"use client";

import { motion, Variants } from "framer-motion";
import { Container, Book3D } from "@/components/ui";
import Image from "next/image";
import { Target, CheckCircle2 } from "lucide-react";

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export function BookAnatomy() {
  return (
    <section className="relative bg-[var(--color-bg-ivory)] dark:bg-[#131715] py-10 lg:py-24 overflow-hidden">
      
      {/* Subtle Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-[var(--color-accent-peach)]/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -left-40 w-[600px] h-[600px] bg-[var(--color-accent-peach)]/5 rounded-full blur-[100px]" />
      </div>

      <Container width="wide" className="relative z-10">
        
        {/* Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="text-center max-w-3xl mx-auto mb-20 sm:mb-28"
        >
          <span className="inline-block py-1 px-3 rounded-full border border-[#D9895B]/30 bg-[var(--color-accent-peach)]/5 text-xs font-semibold tracking-widest text-[var(--color-accent-peach)] uppercase mb-6">
            The Complete Bundle
          </span>
          <h2 className="font-serif text-[clamp(2.5rem,8vw,4.5rem)] text-[var(--color-text-primary)] mb-8 leading-[1.1]">
            More than just <span className="italic text-[var(--color-accent-peach)]">a book.</span>
          </h2>
          <p className="text-xl sm:text-2xl text-[var(--color-text-secondary)] font-light leading-relaxed">
            A complete ecosystem designed to take you from overthinking to building, step by beautiful step.
          </p>
        </motion.div>

        <div className="flex flex-col gap-32 lg:gap-40">
          
          {/* Item 1: The Book */}
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full lg:w-1/2 flex justify-center lg:justify-end"
            >
              <div className="w-full max-w-[400px] relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent blur-3xl transform translate-y-10 scale-90" />
                <Book3D 
                  coverUrl="/images/books/book-cover.jpeg"
                  title="First Build It"
                  className="w-full relative z-10"
                />
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
              className="w-full lg:w-1/2 text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6 opacity-60">
                <span className="text-sm font-bold tracking-widest text-[var(--color-accent-peach)]">01</span>
                <div className="h-px w-12 bg-[var(--color-accent-peach)]" />
              </div>
              <h3 className="font-serif text-[clamp(2rem,6vw,3rem)] text-[var(--color-text-primary)] mb-6">The Core Philosophy</h3>
              <p className="text-[var(--color-text-secondary)] text-xl leading-relaxed max-w-lg mx-auto lg:mx-0 mb-6">
                A beautifully designed guide for creators, dreamers & doers. Learn how to stop waiting for perfection and start building with intention. 
              </p>
              <ul className="flex flex-col gap-4 max-w-lg mx-auto lg:mx-0 text-left">
                <li className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                  <CheckCircle2 size={20} className="text-[var(--color-accent-peach)] shrink-0 mt-1" />
                  <span>Break free from the cycle of overthinking.</span>
                </li>
                <li className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                  <CheckCircle2 size={20} className="text-[var(--color-accent-peach)] shrink-0 mt-1" />
                  <span>Discover the exact frameworks to build with intention.</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Item 2: The Workbook */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full lg:w-1/2 flex justify-center lg:justify-start relative"
            >
              {/* Decorative elements */}
              <div className="hidden sm:block absolute -left-10 top-10 w-32 h-32 bg-[var(--color-bg-ivory)] dark:bg-[#131715] rounded-full mix-blend-multiply opacity-50" />
              
              <div className="relative w-full max-w-[360px] aspect-[4/5] sm:rounded-r-3xl rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(30,25,20,0.1)] border border-white/50 rotate-0 sm:rotate-[2deg] bg-[var(--color-surface-elevated)] dark:bg-[#242b28] transition-transform hover:rotate-0 hover:scale-[1.02] duration-700 z-10">
                <Image 
                  src="/images/previews/all/page-27.png" 
                  alt="Workbook Page" 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 360px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/20 to-transparent mix-blend-multiply" />
                {/* Glossy overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/40 pointer-events-none" />
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
              className="w-full lg:w-1/2 text-center lg:text-right"
            >
              <div className="flex items-center justify-center lg:justify-end gap-4 mb-6 opacity-60">
                <div className="h-px w-12 bg-[var(--color-accent-peach)]" />
                <span className="text-sm font-bold tracking-widest text-[var(--color-accent-peach)]">02</span>
              </div>
              <h3 className="font-serif text-[clamp(2rem,6vw,3rem)] text-[var(--color-text-primary)] mb-6">The Action Workbook</h3>
              <p className="text-[var(--color-text-secondary)] text-xl leading-relaxed max-w-lg mx-auto lg:ml-auto lg:mr-0 mb-6">
                Filled with prompts, templates, and structured exercises designed to help you extract ideas from your head and turn them into tangible reality.
              </p>
              <ul className="flex flex-col gap-4 max-w-lg mx-auto lg:ml-auto lg:mr-0 text-left">
                <li className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                  <CheckCircle2 size={20} className="text-[var(--color-accent-peach)] shrink-0 mt-1" />
                  <span>Transform abstract ideas into actionable steps.</span>
                </li>
                <li className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                  <CheckCircle2 size={20} className="text-[var(--color-accent-peach)] shrink-0 mt-1" />
                  <span>Bypass procrastination with guided reflection prompts.</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Item 3: The Tracker */}
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full lg:w-1/2 flex justify-center lg:justify-end relative"
            >
              {/* Premium Glassmorphism Card */}
              <div className="w-full max-w-[420px] relative z-10 rounded-[2.5rem] p-8 sm:p-10 shadow-[0_30px_60px_rgba(217,137,91,0.12)] rotate-[-1deg] transition-all hover:rotate-0 hover:scale-[1.02] duration-700 overflow-hidden group border border-white/60">
                
                {/* Premium Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white dark:from-[#2a332d] via-[#FFFDFB] dark:via-[#242b28] to-[#FDF8F3] dark:to-[#1e2422] z-0" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(217,137,91,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(217,137,91,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(217,137,91,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(217,137,91,0.1)_1px,transparent_1px)] bg-[size:20px_20px] z-0" />
                <div className="hidden sm:block absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-[#D9895B]/10 to-transparent rounded-full blur-2xl z-0" />
                <div className="hidden sm:block absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-[#D9895B]/5 to-transparent rounded-full blur-2xl z-0" />

                {/* Content */}
                <div className="relative z-10">
                  
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h4 className="font-serif text-[clamp(1.75rem,5vw,2.25rem)] text-[var(--color-text-primary)] mb-1">30-Day</h4>
                      <p className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[var(--color-accent-peach)] uppercase">Challenge</p>
                    </div>
                    <div className="w-14 h-14 bg-[var(--color-surface-elevated)] dark:bg-[#242b28] rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(217,137,91,0.12)] border border-[#D9895B]/10 relative">
                      <div className="absolute inset-0 rounded-full border border-[#D9895B]/20 m-1" />
                      <Target size={24} className="text-[var(--color-accent-peach)]" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-8 bg-[var(--color-surface-elevated)] dark:bg-[#242b28]/50 p-4 rounded-2xl border border-white/80 shadow-sm backdrop-blur-sm">
                    <div className="flex justify-between items-center text-[10px] font-bold tracking-widest text-[var(--color-text-secondary)] uppercase mb-3">
                      <span>Progress</span>
                      <span className="text-[var(--color-accent-peach)] bg-[var(--color-accent-peach)]/10 px-2 py-1 rounded-full">7 / 30 Days</span>
                    </div>
                    <div className="h-2 w-full bg-[#E8DED5]/40 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '23%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-[#D9895B] to-[#E2A684] rounded-full relative"
                      >
                        <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 translate-x-4 animate-[shimmer_2s_infinite]" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Grid */}
                  <div className="grid grid-cols-6 gap-2 sm:gap-3 mb-8">
                    {Array.from({ length: 30 }).map((_, i) => {
                      const isChecked = i < 7;
                      return (
                        <div 
                          key={i} 
                          className={`
                            relative aspect-square rounded-full flex items-center justify-center transition-all duration-500
                            ${isChecked 
                              ? 'bg-gradient-to-br from-[#D9895B] to-[#B86B42] text-white shadow-[0_4px_12px_rgba(217,137,91,0.35)] scale-110 z-10 border border-[#D9895B]/50' 
                              : 'bg-[var(--color-surface-elevated)] dark:bg-[#242b28] shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)] border border-[var(--color-border-soft)] dark:border-[#2a332d]/60 text-transparent hover:border-[#D9895B]/40 hover:bg-[var(--color-bg-ivory)] dark:bg-[#131715]/50'}
                          `}
                        >
                          <CheckCircle2 size={12} strokeWidth={3} className={isChecked ? 'opacity-100' : 'opacity-0'} />
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Footer */}
                  <div className="pt-6 border-t border-[#D9895B]/15 flex items-center justify-center gap-3">
                    <div className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent-peach)] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-accent-peach)]"></span>
                    </div>
                    <p className="text-xs text-[var(--color-text-primary)] font-bold uppercase tracking-[0.15em]">
                      Build unstoppable momentum
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
              className="w-full lg:w-1/2 text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6 opacity-60">
                <span className="text-sm font-bold tracking-widest text-[var(--color-accent-peach)]">03</span>
                <div className="h-px w-12 bg-[var(--color-accent-peach)]" />
              </div>
              <h3 className="font-serif text-[clamp(2rem,6vw,3rem)] text-[var(--color-text-primary)] mb-6">The Accountability Tracker</h3>
              <p className="text-[var(--color-text-secondary)] text-xl leading-relaxed max-w-lg mx-auto lg:mx-0 mb-6">
                A 30-day visual roadmap that turns reading into doing. Cross off each day to build momentum and watch your consistency compound into real results.
              </p>
              <ul className="flex flex-col gap-4 max-w-lg mx-auto lg:mx-0 text-left">
                <li className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                  <CheckCircle2 size={20} className="text-[var(--color-accent-peach)] shrink-0 mt-1" />
                  <span>Stay consistent with a proven 30-day challenge.</span>
                </li>
                <li className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                  <CheckCircle2 size={20} className="text-[var(--color-accent-peach)] shrink-0 mt-1" />
                  <span>Watch your daily progress compound into massive wins.</span>
                </li>
              </ul>
            </motion.div>
          </div>

        </div>
      </Container>
    </section>
  );
}
