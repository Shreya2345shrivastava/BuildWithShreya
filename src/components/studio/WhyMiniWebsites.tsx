"use client";

import { Container, FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui";
import { Cake, Briefcase, BookOpen, Star } from "lucide-react";

const reasons = [
  {
    title: "Birthday & Celebration Websites",
    description: "Create unforgettable digital experiences.",
    icon: Cake,
  },
  {
    title: "Creator Portfolios",
    description: "Showcase your work beautifully.",
    icon: Star,
  },
  {
    title: "Book Launch Pages",
    description: "Turn readers into buyers.",
    icon: BookOpen,
  },
  {
    title: "Personal Brand Websites",
    description: "Build credibility instantly.",
    icon: Briefcase,
  },
];

export function WhyMiniWebsites() {
  return (
    <section className="bg-white dark:bg-[#0B1110] py-24 lg:py-32 relative transition-colors duration-500">
      <Container>
        <div className="max-w-2xl mb-16">
          <FadeIn>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] text-[#0B1110] dark:text-[#F6F2EE] leading-[1.1] tracking-tight mb-4">
              Small websites.<br />
              <span className="italic font-display text-[#D9A38F]">Big impact.</span>
            </h2>
          </FadeIn>
        </div>

        <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <FadeInStaggerItem key={idx}>
                <div className="group relative flex flex-col items-start p-8 lg:p-10 rounded-[2rem] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-xl shadow-lg dark:shadow-xl hover:shadow-[0_20px_40px_rgba(217,163,143,0.15)] dark:hover:shadow-[0_20px_40px_rgba(217,163,143,0.1)] transition-all duration-500 overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 dark:from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative p-4 mb-8 bg-white dark:bg-[#131715] rounded-2xl border border-black/5 dark:border-white/10 group-hover:scale-110 group-hover:border-[#D9A38F]/30 transition-transform duration-500 shadow-sm">
                    <Icon className="w-8 h-8 text-[#D9A38F] stroke-[1.5]" />
                  </div>
                  
                  <h3 className="relative font-semibold text-2xl text-[#0B1110] dark:text-[#F6F2EE] mb-3 tracking-wide">{reason.title}</h3>
                  <p className="relative text-black/60 dark:text-white/60 text-lg leading-relaxed">{reason.description}</p>
                </div>
              </FadeInStaggerItem>
            );
          })}
        </FadeInStagger>
      </Container>
    </section>
  );
}
