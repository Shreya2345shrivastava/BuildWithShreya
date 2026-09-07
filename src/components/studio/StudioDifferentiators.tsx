"use client";

import { Container, FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui";
import { Sparkles, Zap, Smartphone, Paintbrush } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Thoughtful Design",
    description: "No generic templates. Everything is custom.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "From concept to live website quickly.",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Looks beautiful and works flawlessly everywhere.",
  },
  {
    icon: Paintbrush,
    title: "Crafted Experience",
    description: "Every page feels personal and intentional.",
  },
];

export function StudioDifferentiators() {
  return (
    <section className="bg-white dark:bg-[#0B1110] py-24 lg:py-32 relative transition-colors duration-500">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          <div className="flex-1 text-center lg:text-left">
            <FadeIn>
              <h2 className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] text-[#0B1110] dark:text-[#F6F2EE] leading-[1.1] tracking-tight mb-6">
                Built for people who care about <br className="hidden lg:block" />
                <span className="italic font-display text-[#D9A38F]">details.</span>
              </h2>
              <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                We believe your digital home should reflect the quality of your work. We don&apos;t do cookie-cutter; we do craftsmanship.
              </p>
            </FadeIn>
          </div>

          <div className="flex-1 w-full">
            <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <FadeInStaggerItem key={idx}>
                    <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md shadow-lg dark:shadow-lg hover:bg-black/10 dark:hover:bg-white/10 hover:border-[#D9A38F]/40 dark:hover:border-[#D9A38F]/30 transition-all duration-300">
                      <div className="mb-4">
                        <Icon className="w-6 h-6 text-[#D9A38F]" />
                      </div>
                      <h3 className="font-semibold text-lg text-[#0B1110] dark:text-[#F6F2EE] mb-2">{feature.title}</h3>
                      <p className="text-black/60 dark:text-white/60 text-sm">{feature.description}</p>
                    </div>
                  </FadeInStaggerItem>
                );
              })}
            </FadeInStagger>
          </div>

        </div>
      </Container>
    </section>
  );
}
