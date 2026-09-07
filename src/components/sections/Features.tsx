"use client";

import { useRef, useState, useEffect } from "react";
import { Book, LayoutTemplate, Sparkles, Gift } from "lucide-react";
import { Container, FadeIn } from "@/components/ui";

const features = [
  {
    icon: Book,
    title: "Books",
    description: "Frameworks and actionable guides",
    posX: -320,
    posY: -160,
  },
  {
    icon: LayoutTemplate,
    title: "Mini Websites",
    description: "Beautiful custom websites for creators",
    posX: 320,
    posY: -160,
  },
  {
    icon: Sparkles,
    title: "LifeOS",
    description: "Productivity systems and digital tools",
    posX: -320,
    posY: 160,
  },
  {
    icon: Gift,
    title: "Resources",
    description: "Templates, worksheets, creator assets",
    posX: 320,
    posY: 160,
  },
];

export function Features() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePosition({ x, y });
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (section) section.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="features" 
      className="relative bg-[var(--color-bg-ivory)] dark:bg-[#0B1110] min-h-screen flex items-center justify-center py-20 overflow-hidden border-t border-black/5 dark:border-black/20 transition-colors duration-500"
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes custom-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-custom-float {
          animation: custom-float 6s ease-in-out infinite;
        }
      `}} />

      {/* Ambient background glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D9A38F] rounded-full blur-[200px] opacity-[0.05] dark:opacity-[0.15] pointer-events-none transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(calc(-50% + ${mousePosition.x * 60}px), calc(-50% + ${mousePosition.y * 60}px))`
        }}
      />

      <Container width="wide" className="relative z-10 w-full">
        
        {/* Header Section */}
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center mb-10 lg:mb-16">
          <FadeIn>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] font-medium tracking-tight text-[#0B1110] dark:text-[#F6F2EE] leading-[1.1] mb-4">
              One idea.<br/>
              Many ways to <span className="font-display italic text-[#D9A38F] font-light">build it.</span>
            </h2>
            <p className="text-base sm:text-lg text-black/60 dark:text-white/60 leading-relaxed max-w-2xl mx-auto font-light">
              Whether you&apos;re writing a book, launching a website, building systems, or creating resources—everything starts with taking action.
            </p>
          </FadeIn>
        </div>

        {/* Desktop Radial Visualization */}
        <div className="hidden lg:flex relative w-full max-w-5xl mx-auto h-[450px] items-center justify-center">
          
          {/* Connecting SVG Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: "drop-shadow(0 0 8px rgba(217,163,143,0.3))" }}>
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D9A38F" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#D9A38F" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#D9A38F" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path d="M 512 225 Q 300 125 192 90" fill="none" stroke="url(#line-gradient)" strokeWidth="1.5" className="animate-[pulse_3s_ease-in-out_infinite]" />
            <path d="M 512 225 Q 724 125 832 90" fill="none" stroke="url(#line-gradient)" strokeWidth="1.5" className="animate-[pulse_4s_ease-in-out_infinite]" />
            <path d="M 512 225 Q 300 325 192 360" fill="none" stroke="url(#line-gradient)" strokeWidth="1.5" className="animate-[pulse_5s_ease-in-out_infinite]" />
            <path d="M 512 225 Q 724 325 832 360" fill="none" stroke="url(#line-gradient)" strokeWidth="1.5" className="animate-[pulse_3.5s_ease-in-out_infinite]" />
          </svg>

          {/* Core Orb */}
          <div 
            className="absolute z-20 flex flex-col items-center justify-center w-52 h-52 rounded-full bg-gradient-to-br from-white/60 to-white/20 dark:from-[#1c2624] dark:to-[#0d1413] border border-white/60 dark:border-white/10 shadow-[0_20px_60px_rgba(217,137,91,0.15)] dark:shadow-[0_0_60px_rgba(217,163,143,0.15)] backdrop-blur-2xl animate-custom-float"
            style={{
              transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`
            }}
          >
            <div className="absolute inset-0 rounded-full bg-[#D9A38F] opacity-10 animate-ping" style={{ animationDuration: '4s' }} />
            <h3 className="relative font-serif text-2xl text-[#0B1110] dark:text-[#F6F2EE] font-medium tracking-wide">BuildWithShreya</h3>
          </div>

          {/* Orbiting Cards */}
          <div className="absolute inset-0 flex items-center justify-center">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              const floatDelay = ["0s", "1.5s", "3s", "4.5s"][idx];

              return (
                <div 
                  key={idx}
                  className="absolute z-10 w-[280px]"
                  style={{
                    transform: `translate(calc(${feature.posX}px + ${mousePosition.x * 40}px), calc(${feature.posY}px + ${mousePosition.y * 40}px))`
                  }}
                >
                  <div 
                    className="w-full p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(217,137,91,0.08)] dark:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/60 dark:hover:bg-white/10 hover:border-white/80 dark:hover:border-[#D9A38F]/40 hover:shadow-[0_15px_40px_rgba(217,137,91,0.15)] dark:hover:shadow-[0_0_30px_rgba(217,163,143,0.2)] group cursor-default animate-custom-float"
                    style={{ animationDelay: floatDelay }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-[#D9A38F]/15 dark:bg-[#D9A38F]/10 rounded-lg text-[#D9A38F] group-hover:bg-[#D9A38F]/25 dark:group-hover:bg-[#D9A38F]/20 group-hover:scale-110 transition-all duration-300">
                        <Icon size={18} />
                      </div>
                      <h4 className="font-semibold text-[#0B1110] dark:text-[#F6F2EE] text-base tracking-wide">{feature.title}</h4>
                    </div>
                    <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed group-hover:text-black/80 dark:group-hover:text-white/80 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Stacked Layout */}
        <div className="lg:hidden flex flex-col gap-5 relative max-w-sm mx-auto z-10 mt-8">
          <div className="flex flex-col items-center justify-center w-40 h-40 mx-auto mb-4 rounded-full bg-gradient-to-br from-white/60 to-white/20 dark:from-[#1c2624] dark:to-[#0d1413] border border-white/60 dark:border-white/10 shadow-[0_20px_40px_rgba(217,137,91,0.15)] dark:shadow-[0_0_40px_rgba(217,163,143,0.15)] backdrop-blur-2xl animate-custom-float">
             <div className="absolute inset-0 rounded-full bg-[#D9A38F] opacity-10 animate-ping" style={{ animationDuration: '4s' }} />
             <h3 className="relative font-serif text-lg text-[#0B1110] dark:text-[#F6F2EE] font-medium text-center px-4">BuildWith<br/>Shreya</h3>
          </div>

          {features.map((feature, idx) => {
             const Icon = feature.icon;
             return (
               <FadeIn key={idx} delay={idx * 0.1}>
                  <div className="relative flex flex-col p-5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(217,137,91,0.08)] dark:shadow-2xl">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-[#D9A38F]/15 dark:bg-[#D9A38F]/10 rounded-xl text-[#D9A38F]">
                        <Icon size={20} />
                      </div>
                      <h4 className="font-semibold text-[#0B1110] dark:text-[#F6F2EE] text-lg tracking-wide">{feature.title}</h4>
                    </div>
                    <p className="text-black/60 dark:text-white/60 leading-relaxed ml-[3rem] text-sm">
                      {feature.description}
                    </p>
                  </div>
               </FadeIn>
             );
          })}
        </div>



      </Container>
    </section>
  );
}