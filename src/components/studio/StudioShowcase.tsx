"use client";

import { Container, FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui";
import { useState } from "react";

const projects = [
  {
    title: "Happy Birthday Sarah",
    category: "Celebration",
    color: "from-pink-900/40 to-rose-900/20",
    accent: "text-rose-600 dark:text-rose-200",
  },
  {
    title: "Build It First Book Landing Page",
    category: "Launch Page",
    color: "from-[#D9A38F]/30 to-[#2A1B18]/40",
    accent: "text-[#D9A38F]",
  },
  {
    title: "LifeOS Productivity Dashboard",
    category: "System",
    color: "from-emerald-900/30 to-teal-900/20",
    accent: "text-emerald-700 dark:text-emerald-200",
  },
  {
    title: "Creator Portfolio",
    category: "Portfolio",
    color: "from-indigo-900/30 to-purple-900/20",
    accent: "text-indigo-600 dark:text-indigo-200",
  },
];

export function StudioShowcase() {
  return (
    <section id="showcase" className="bg-[#F6F2EE] dark:bg-[#0B1110] py-24 lg:py-32 relative transition-colors duration-500">
      <Container width="wide">
        <div className="text-center mb-20">
          <FadeIn>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] text-[#0B1110] dark:text-[#F6F2EE] leading-[1.1] tracking-tight mb-4">
              Featured Projects
            </h2>
            <p className="text-black/60 dark:text-white/60 text-lg max-w-xl mx-auto">
              A glimpse into the digital homes we&apos;ve built for creators, authors, and celebrations.
            </p>
          </FadeIn>
        </div>

        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {projects.map((project, idx) => (
            <FadeInStaggerItem key={idx}>
              <div 
                className="group relative flex flex-col rounded-[2rem] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 overflow-hidden cursor-pointer transition-transform duration-700 hover:-translate-y-2 hover:scale-[1.02] shadow-xl dark:shadow-2xl hover:shadow-[0_30px_60px_rgba(217,163,143,0.3)] dark:hover:shadow-[0_30px_60px_rgba(217,163,143,0.15)]"
                style={{ perspective: "1000px" }}
              >
                {/* 3D Tilt Wrapper */}
                <div className="w-full aspect-[4/3] bg-white dark:bg-[#131715] relative overflow-hidden transition-transform duration-500 group-hover:rotate-x-2 group-hover:rotate-y-[-2deg]">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 dark:opacity-50 group-hover:opacity-60 dark:group-hover:opacity-100 transition-opacity duration-700`} />
                  
                  {/* Laptop Mockup */}
                  <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[80%] aspect-[16/10] bg-[#e5e5e5] dark:bg-black rounded-t-xl border-4 border-gray-300 dark:border-gray-800 shadow-2xl overflow-hidden group-hover:-translate-y-2 transition-transform duration-700">
                     <div className="w-full h-full bg-white dark:bg-white/5 flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-black/80 to-transparent z-10" />
                        <h4 className={`text-xl font-serif z-20 ${project.accent} opacity-80 dark:opacity-50`}>{project.title}</h4>
                     </div>
                  </div>
                  {/* Laptop Base */}
                  <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[90%] h-2 mt-[50%] bg-gray-400 dark:bg-gray-700 rounded-b-xl shadow-2xl group-hover:-translate-y-2 transition-transform duration-700" />
                  
                  {/* Mobile Mockup */}
                  <div className="absolute bottom-[-10%] right-[10%] w-[25%] aspect-[9/19] bg-[#e5e5e5] dark:bg-black rounded-[2rem] border-4 border-gray-300 dark:border-gray-800 shadow-2xl overflow-hidden group-hover:-translate-y-4 group-hover:-rotate-3 transition-transform duration-700 z-30">
                     <div className="w-full h-full bg-white dark:bg-white/10" />
                  </div>
                </div>
                
                <div className="p-8 relative z-10 bg-white dark:bg-[#0B1110] border-t border-black/5 dark:border-white/5">
                  <div className={`text-xs font-semibold tracking-widest uppercase mb-2 ${project.accent}`}>
                    {project.category}
                  </div>
                  <h3 className="font-semibold text-2xl text-[#0B1110] dark:text-[#F6F2EE] tracking-wide">{project.title}</h3>
                </div>
              </div>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      </Container>
    </section>
  );
}
