"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Container, FadeIn } from "@/components/ui";
import { Lightbulb, BookOpen, LayoutDashboard, Hammer, Rocket } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Idea",
    description: "Every meaningful project begins with curiosity.",
    icon: Lightbulb,
    offset: "-translate-y-6" // Alternate up
  },
  {
    id: "02",
    title: "Journal",
    description: "Capture thoughts before they disappear.",
    icon: BookOpen,
    offset: "translate-y-6" // Alternate down
  },
  {
    id: "03",
    title: "System",
    description: "Create structure that supports consistency.",
    icon: LayoutDashboard,
    offset: "-translate-y-6"
  },
  {
    id: "04",
    title: "Build",
    description: "Turn plans into tangible creations.",
    icon: Hammer,
    offset: "translate-y-6"
  },
  {
    id: "05",
    title: "Launch",
    description: "Share your work with the world.",
    icon: Rocket,
    offset: "-translate-y-6"
  },
];

export function TheJourney() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "center 50%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  const fillWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section 
      ref={containerRef}
      className="relative bg-[var(--color-bg-ivory)] dark:bg-[#0B1110] pt-24 pb-10 lg:pt-32 lg:pb-0 transition-colors duration-500"
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D9A38F] rounded-full blur-[150px] opacity-[0.15] dark:opacity-[0.1] pointer-events-none" />
        {/* Subtle Grid - Light Mode */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:32px_32px] dark:opacity-0" />
      </div>

      <Container width="wide" className="relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-12 lg:mb-16">
          <FadeIn>
            <span className="inline-block py-1.5 px-4 rounded-full border border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/5 text-xs font-semibold tracking-widest text-[#0B1110] dark:text-[#F6F2EE] uppercase mb-6 backdrop-blur-md shadow-sm">
              The Philosophy
            </span>
            <h2 className="font-serif text-[clamp(2.2rem,4vw,3.5rem)] text-[#0B1110] dark:text-[#F6F2EE] mb-4 leading-[1.1] tracking-tight">
              Every creation starts the same way.<br />
              <span className="italic text-[#D9A38F] font-light">With an idea.</span>
            </h2>
            <p className="text-base sm:text-lg text-black/60 dark:text-white/60 font-light leading-relaxed max-w-[700px] mx-auto">
              The book, LifeOS, creator resources, and mini websites all began as a simple thought. BuildWithShreya exists to help transform ideas into something real.
            </p>
          </FadeIn>
        </div>

        {/* Timeline Area */}
        <div className="relative w-full max-w-6xl mx-auto mt-4 lg:mt-8 pb-32">
          
          {/* Main Continuous Line */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-black/10 dark:bg-white/10 -translate-y-1/2 z-0">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#D9A38F] to-[#B86B42] origin-left shadow-[0_0_15px_rgba(217,163,143,0.5)]"
              style={{ width: fillWidth }}
            />
          </div>

          {/* Steps */}
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center w-full min-h-[500px] md:min-h-[300px] py-10 md:py-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const threshold = index / (steps.length - 1);
              const isActive = useTransform(smoothProgress, (val) => val >= threshold - 0.05);
              const opacity = useTransform(isActive, (active) => active ? 1 : 0.4);
              const iconScale = useTransform(isActive, (active) => active ? 1 : 0.9);
              
              // We alternate positioning: odd steps go top, even go bottom (on desktop)
              const isTop = index % 2 === 0;

              return (
                <div key={step.id} className="relative flex justify-center w-full h-full my-8 md:my-0">
                  
                  {/* Step Icon Node (Sits exactly on the line) */}
                  <motion.div 
                    style={{ opacity, scale: iconScale }}
                    className="md:absolute md:top-1/2 md:-translate-y-1/2 flex items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-[#1C201E] border-2 border-[var(--color-bg-ivory)] dark:border-[#0B1110] shadow-[0_4px_20px_rgba(217,137,91,0.15)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-xl z-20 transition-all duration-500"
                  >
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-[#D9A38F]/20 dark:bg-[#D9A38F]/10 blur-md transition-opacity duration-500"
                      style={{ opacity: useTransform(isActive, (a) => a ? 1 : 0) }}
                    />
                    <Icon className="w-5 h-5 text-[#0B1110] dark:text-[#F6F2EE] relative z-10" strokeWidth={1.5} />
                  </motion.div>

                  {/* Glassmorphism Card */}
                  <motion.div 
                    style={{ opacity }}
                    className={`flex flex-col items-center text-center bg-white/70 dark:bg-white/5 border border-white dark:border-white/10 shadow-[0_8px_30px_rgba(32,25,19,0.04)] dark:shadow-2xl backdrop-blur-xl rounded-2xl p-5 w-[220px] transition-all duration-500 group hover:shadow-[0_15px_40px_rgba(217,137,91,0.15)] dark:hover:shadow-[0_15px_40px_rgba(217,137,91,0.1)]
                      md:absolute ${isTop ? 'md:bottom-[calc(50%+40px)] hover:-translate-y-2' : 'md:top-[calc(50%+40px)] hover:translate-y-2'}
                      mt-4 md:mt-0
                    `}
                  >
                    <span className="text-[10px] font-bold tracking-[0.15em] text-[#D9A38F] mb-2 uppercase">{step.id}</span>
                    <h4 className="font-serif text-xl text-[#0B1110] dark:text-[#F6F2EE] mb-2">{step.title}</h4>
                    <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>
      </Container>

      {/* Closing Quote Card - Overlaps the bottom */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-full px-4 z-30">
        <FadeIn direction="up">
          <div className="mx-auto max-w-[650px] flex flex-col items-center text-center p-6 md:p-8 rounded-[2rem] bg-white/80 dark:bg-[#1C201E]/90 border border-white dark:border-white/10 shadow-[0_20px_60px_rgba(32,25,19,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl hover:-translate-y-2 transition-transform duration-700">
            <h3 className="font-serif text-xl md:text-3xl text-[#0B1110] dark:text-[#F6F2EE] leading-snug">
              BuildWithShreya isn&apos;t a destination.<br />
              <span className="italic font-light text-[#D9A38F]">It&apos;s the path from idea to execution.</span>
            </h3>
          </div>
        </FadeIn>
      </div>

    </section>
  );
}
