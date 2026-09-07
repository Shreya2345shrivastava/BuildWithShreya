"use client";

import { Container, FadeIn } from "@/components/ui";
import { ArrowRight, CalendarDays } from "lucide-react";
import Link from "next/link";

export function StudioFinalCTA() {
  return (
    <section className="bg-[#F6F2EE] dark:bg-[#0B1110] pt-24 pb-32 lg:pt-32 lg:pb-48 relative overflow-hidden transition-colors duration-500">
      {/* Massive Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[#D9A38F] rounded-[100%] blur-[250px] opacity-[0.25] dark:opacity-[0.15] pointer-events-none translate-y-1/2" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white rounded-full blur-[150px] opacity-[0.4] dark:opacity-[0.03] pointer-events-none" />

      <Container>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn direction="up">
            <h2 className="font-serif text-[clamp(3rem,7vw,5rem)] text-[#0B1110] dark:text-[#F6F2EE] leading-[1.05] tracking-tight mb-8">
              Let&apos;s build something <br className="hidden sm:block" />
              <span className="italic font-display text-[#D9A38F]">worth sharing.</span>
            </h2>
            
            <p className="text-lg sm:text-xl text-black/60 dark:text-white/60 leading-relaxed font-light max-w-2xl mx-auto mb-16">
              Whether it&apos;s a birthday surprise, a portfolio, a launch page, or a dream you&apos;ve been sitting on for months — let&apos;s bring it online beautifully.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link href="#contact" className="w-full sm:w-auto">
                <button className="group w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-5 text-lg font-semibold tracking-wide text-white dark:text-[#0B1110] bg-[#0B1110] dark:bg-[#F6F2EE] rounded-full shadow-[0_8px_30px_rgba(11,17,16,0.2)] dark:shadow-[0_8px_30px_rgba(246,242,238,0.2)] hover:shadow-[0_20px_40px_rgba(11,17,16,0.3)] dark:hover:shadow-[0_20px_40px_rgba(246,242,238,0.3)] hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300">
                  Start My Website
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="#book" className="w-full sm:w-auto">
                <button className="group w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-5 text-lg font-semibold tracking-wide text-[#0B1110] dark:text-[#F6F2EE] bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full hover:bg-black/10 dark:hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 backdrop-blur-md">
                  <CalendarDays className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                  Book a Discovery Call
                </button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
