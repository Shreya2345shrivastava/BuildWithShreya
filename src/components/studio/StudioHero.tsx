"use client";

import { Container, FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function StudioHero() {
  return (
    <section className="relative overflow-hidden bg-[#F6F2EE] dark:bg-[#0B1110] pt-32 pb-24 lg:pt-48 lg:pb-32 border-b border-black/5 dark:border-white/5 transition-colors duration-500">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-1deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 9s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 5s ease-in-out infinite; }
      `}} />

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[#D9A38F] rounded-full blur-[250px] opacity-[0.25] dark:opacity-[0.1] pointer-events-none" />
      <div className="absolute top-0 right-10 w-[600px] h-[600px] bg-white rounded-full blur-[200px] opacity-[0.5] dark:opacity-[0.05] pointer-events-none" />

      <Container width="wide" className="relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
        
        {/* Left Content */}
        <div className="flex-1 w-full flex flex-col items-start text-left max-w-2xl">
          <FadeInStagger>
            <FadeInStaggerItem>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-semibold tracking-widest text-[#0B1110] dark:text-[#D9A38F] uppercase mb-8 backdrop-blur-md">
                <span className="text-[#D9A38F]">✦</span>
                BuildWithShreya Studio
              </div>
            </FadeInStaggerItem>
            
            <FadeInStaggerItem>
              <h1 className="font-serif text-[clamp(2.8rem,6vw,5rem)] text-[#0B1110] dark:text-[#F6F2EE] leading-[1.05] mb-4 tracking-tight">
                Your ideas deserve <br className="hidden md:block" />
                more than a social <br className="hidden md:block" />
                media post.
              </h1>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <p className="font-display italic text-[clamp(2.5rem,5.5vw,4.5rem)] text-[#D9A38F] leading-none mb-8">
                Give them a home.
              </p>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <p className="text-lg sm:text-xl text-black/60 dark:text-white/60 leading-relaxed font-light mb-12 max-w-xl">
                Beautiful custom mini websites designed to tell your story, showcase your work, celebrate your moments, and help people remember what you create.
              </p>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <Link href="#contact" className="w-full sm:w-auto">
                  <button className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold tracking-wide text-white dark:text-[#0B1110] bg-[#0B1110] dark:bg-[#F6F2EE] rounded-full shadow-[0_8px_20px_rgba(11,17,16,0.15)] dark:shadow-[0_8px_20px_rgba(246,242,238,0.15)] hover:shadow-[0_15px_30px_rgba(11,17,16,0.25)] dark:hover:shadow-[0_15px_30px_rgba(246,242,238,0.25)] hover:-translate-y-1 transition-all duration-300">
                    Start Your Website
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="#showcase" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold tracking-wide text-[#0B1110] dark:text-[#F6F2EE] bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full hover:bg-black/10 dark:hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 backdrop-blur-md">
                    View Examples
                  </button>
                </Link>
              </div>
            </FadeInStaggerItem>
          </FadeInStagger>
        </div>

        {/* Right Content - Floating Mockups */}
        <div className="flex-1 w-full relative h-[500px] lg:h-[700px] flex items-center justify-center">
          
          {/* Mockup 1 - Birthday Surprise */}
          <div className="absolute z-10 w-[240px] h-[340px] lg:w-[280px] lg:h-[400px] rounded-2xl bg-white dark:bg-gradient-to-br dark:from-[#2a1b18] dark:to-[#1a110e] border border-black/5 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-2 animate-float-slow -translate-x-[20%] -translate-y-[10%] rotate-[-6deg] overflow-hidden backdrop-blur-xl transition-colors duration-500">
             <div className="w-full h-full rounded-xl bg-black/5 dark:bg-white/5 overflow-hidden flex flex-col relative">
                <div className="h-24 bg-gradient-to-br from-[#D9A38F]/20 dark:from-[#D9A38F]/40 to-transparent w-full absolute top-0 left-0" />
                <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/10 dark:bg-white/20 backdrop-blur-md" />
                <div className="mt-16 px-4">
                  <div className="w-3/4 h-4 rounded-full bg-black/10 dark:bg-white/30 mb-2" />
                  <div className="w-1/2 h-3 rounded-full bg-black/5 dark:bg-white/20 mb-6" />
                  <div className="w-full h-24 rounded-lg bg-black/5 dark:bg-white/10 mb-3" />
                  <div className="w-full h-12 rounded-lg bg-[#D9A38F]/20 dark:bg-[#D9A38F]/40" />
                </div>
                <div className="absolute bottom-4 right-4 text-xs font-semibold text-black/40 dark:text-white/40 tracking-widest uppercase">Birthday</div>
             </div>
          </div>

          {/* Mockup 2 - Creator Portfolio */}
          <div className="absolute z-20 w-[260px] h-[380px] lg:w-[320px] lg:h-[460px] rounded-2xl bg-[#F6F2EE] dark:bg-[#0d1413] border border-black/10 dark:border-white/20 shadow-[0_30px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.6)] p-2 animate-float-medium translate-x-[10%] translate-y-[5%] rotate-[4deg] overflow-hidden backdrop-blur-2xl transition-colors duration-500">
             <div className="w-full h-full rounded-xl bg-gradient-to-b from-black/5 dark:from-white/10 to-transparent overflow-hidden flex flex-col relative border border-black/5 dark:border-white/5">
                <div className="p-5 flex flex-col items-center justify-center text-center mt-4">
                  <div className="w-20 h-20 rounded-full bg-black/10 dark:bg-white/20 mb-4 shadow-xl" />
                  <div className="w-4/5 h-5 rounded-full bg-black/20 dark:bg-white/40 mb-2" />
                  <div className="w-3/5 h-3 rounded-full bg-[#D9A38F]/40 dark:bg-[#D9A38F]/60 mb-8" />
                  
                  <div className="grid grid-cols-2 gap-3 w-full">
                     <div className="aspect-square rounded-lg bg-black/5 dark:bg-white/10" />
                     <div className="aspect-square rounded-lg bg-black/5 dark:bg-white/10" />
                     <div className="aspect-square rounded-lg bg-black/5 dark:bg-white/10" />
                     <div className="aspect-square rounded-lg bg-black/5 dark:bg-white/10" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 text-xs font-semibold text-[#D9A38F] tracking-widest uppercase">Portfolio</div>
             </div>
          </div>

          {/* Mockup 3 - Landing Page */}
          <div className="absolute z-0 w-[220px] h-[300px] lg:w-[260px] lg:h-[360px] rounded-2xl bg-white dark:bg-gradient-to-tr dark:from-[#131715] dark:to-[#1c2624] border border-black/5 dark:border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.4)] p-2 animate-float-slower translate-x-[40%] -translate-y-[20%] rotate-[12deg] overflow-hidden backdrop-blur-md transition-colors duration-500">
             <div className="w-full h-full rounded-xl bg-black/5 dark:bg-white/5 overflow-hidden flex flex-col relative p-4">
                <div className="w-full h-32 rounded-lg bg-black/10 dark:bg-white/20 mb-4 overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-t from-white/60 dark:from-black/60 to-transparent" />
                </div>
                <div className="w-full h-4 rounded-full bg-black/20 dark:bg-white/40 mb-2" />
                <div className="w-2/3 h-3 rounded-full bg-black/10 dark:bg-white/20 mb-4" />
                <div className="w-full h-8 rounded-full bg-black/5 dark:bg-white/10" />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-black/30 dark:text-white/30 tracking-widest uppercase">Launch Page</div>
             </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
