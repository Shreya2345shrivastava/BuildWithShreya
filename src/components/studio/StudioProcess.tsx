"use client";

import { Container, FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui";

const steps = [
  {
    num: "01",
    title: "Share Your Vision",
    description: "Tell us about your project, your brand, and what you want to achieve.",
  },
  {
    num: "02",
    title: "Design & Build",
    description: "We craft a beautiful, custom experience tailored perfectly to your goals.",
  },
  {
    num: "03",
    title: "Review & Refine",
    description: "We collaborate to make sure every detail looks and feels exactly right.",
  },
  {
    num: "04",
    title: "Launch & Celebrate",
    description: "Your stunning new mini website goes live for the world to see.",
  },
];

export function StudioProcess() {
  return (
    <section className="bg-white dark:bg-[#0B1110] py-24 lg:py-32 relative overflow-hidden transition-colors duration-500">
      {/* Background Glow */}
      <div className="absolute top-1/2 -right-[20%] w-[800px] h-[800px] bg-[#D9A38F] rounded-full blur-[200px] opacity-[0.15] dark:opacity-[0.05] pointer-events-none" />

      <Container>
        <div className="text-center mb-24">
          <FadeIn>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] text-[#0B1110] dark:text-[#F6F2EE] leading-[1.1] tracking-tight">
              From idea to launch <br className="hidden sm:block" />
              <span className="italic font-display text-[#D9A38F]">in 4 steps.</span>
            </h2>
          </FadeIn>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D9A38F]/50 dark:via-[#D9A38F]/30 to-transparent" />

          <FadeInStagger className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, idx) => (
              <FadeInStaggerItem key={idx}>
                <div className="relative flex flex-col items-center text-center group">
                  {/* Step Number Circle */}
                  <div className="w-24 h-24 rounded-full bg-[#F6F2EE] dark:bg-[#131715] border border-black/10 dark:border-white/10 flex items-center justify-center mb-8 relative z-10 group-hover:border-[#D9A38F]/50 group-hover:shadow-[0_0_30px_rgba(217,163,143,0.3)] dark:group-hover:shadow-[0_0_30px_rgba(217,163,143,0.2)] transition-all duration-500">
                    <span className="font-serif text-2xl text-[#D9A38F] group-hover:scale-110 transition-transform duration-500">
                      {step.num}
                    </span>
                    {/* Connecting Line (Mobile) */}
                    {idx !== steps.length - 1 && (
                      <div className="lg:hidden absolute top-24 left-1/2 w-[1px] h-12 bg-gradient-to-b from-[#D9A38F]/50 dark:from-[#D9A38F]/30 to-transparent" />
                    )}
                  </div>

                  <h3 className="font-semibold text-xl text-[#0B1110] dark:text-[#F6F2EE] mb-4 tracking-wide group-hover:-translate-y-1 transition-transform duration-300">
                    {step.title}
                  </h3>
                  <p className="text-black/60 dark:text-white/60 leading-relaxed max-w-[250px] mx-auto">
                    {step.description}
                  </p>
                </div>
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>
        </div>
      </Container>
    </section>
  );
}
