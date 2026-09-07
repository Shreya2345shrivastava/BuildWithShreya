"use client";

import { Container, FadeIn } from "@/components/ui";
import { Quote } from "lucide-react";

export function StudioTestimonial() {
  return (
    <section className="bg-[var(--color-bg-ivory)] dark:bg-[#131715] py-32 lg:py-48 relative border-y border-black/5 dark:border-white/5 transition-colors duration-500">
      {/* Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-white/50 dark:bg-white/5 rounded-[100%] blur-[120px] pointer-events-none" />

      <Container>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className="flex justify-center mb-10">
              <Quote className="w-12 h-12 text-[#D9A38F]/60 dark:text-[#D9A38F]/40" />
            </div>
            
            <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-[#0B1110] dark:text-[#F6F2EE] leading-[1.2] tracking-wide mb-12">
              "People don&apos;t remember websites.<br />
              <span className="italic font-display text-[#D9A38F]">They remember experiences.</span>"
            </h2>
            
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden" />
              <div className="text-left">
                <div className="font-semibold text-[#0B1110] dark:text-[#F6F2EE]">Shreya Shrivastava</div>
                <div className="text-sm text-[#D9A38F]">Founder, BuildWithShreya</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
