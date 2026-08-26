import Image from "next/image";
import { Container, FadeIn, FadeInStagger, FadeInStaggerItem, ParallaxBackground, BotanicalDecoration } from "@/components/ui";
import { AuthorNewsletterForm } from "./AuthorNewsletterForm";
import { Leaf, Mail, ShieldCheck, Sparkles, Heart } from "lucide-react";

export function AuthorSection() {
  return (
    <section id="author" className="relative border-t border-black/[0.04] bg-[var(--color-bg-ivory)] dark:bg-[#131715] py-20 lg:py-32 overflow-hidden">
      <ParallaxBackground offset={100} className="opacity-40 mix-blend-multiply">
        <BotanicalDecoration variant="watercolor-blob" className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] text-[#F9E5D9]" />
      </ParallaxBackground>

      <Container width="wide" className="relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[280px_1fr_420px] lg:gap-12 xl:gap-16 items-center">

          {/* Left Column: Author Photo */}
          <FadeIn direction="right" className="mx-auto lg:mx-0 relative w-full max-w-[280px]">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-full rounded-b-full border-[6px] border-white dark:border-[#1a201d] shadow-[0_20px_50px_rgba(217,137,91,0.2)] z-10">
              <Image
                src="/images/authors/Author.jpeg"
                alt="Shreya portrait"
                fill
                sizes="(max-width: 1024px) 280px, 280px"
                className="object-cover object-top"
              />
            </div>
          </FadeIn>

          {/* Center Column: Author Intro */}
          <FadeInStagger className="flex flex-col text-center lg:text-left px-0 lg:px-4">
            <FadeInStaggerItem>
              <h2 className="font-serif text-5xl lg:text-[4rem] text-[var(--color-text-primary)] leading-[1.1]">
                Hi, I'm <span className="text-[var(--color-accent-peach)] italic">Shreya.</span>
              </h2>
            </FadeInStaggerItem>
            
            <FadeInStaggerItem>
              <div className="mt-8 flex items-center justify-center lg:justify-start gap-4">
                <div className="h-px w-16 bg-[var(--color-border-soft)] dark:bg-[#2a332d]"></div>
                <Leaf size={16} className="text-[var(--color-accent-peach)] opacity-80" />
                <div className="h-px w-16 bg-[var(--color-border-soft)] dark:bg-[#2a332d]"></div>
              </div>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <p className="mt-8 text-[1.1rem] leading-[1.8] text-[var(--color-text-secondary)] font-light max-w-md mx-auto lg:mx-0">
                I believe meaningful work isn't about perfect timing—it's about small, consistent steps.
              </p>
              <p className="mt-5 text-[1.1rem] leading-[1.8] text-[var(--color-text-secondary)] font-light max-w-md mx-auto lg:mx-0">
                Through Build With Shreya, I create books and resources that help you move from overthinking to action, and build a life that feels truly yours.
              </p>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <div className="mt-10 relative pl-8 lg:pl-10 border-l-[3px] border-[var(--color-accent-peach)]/30 py-4 max-w-md mx-auto lg:mx-0">
                <p className="relative z-10 font-serif italic text-2xl leading-relaxed text-[var(--color-text-primary)]">
                  My mission is to give you the permission to start messy, and the system to keep going without burning out.
                </p>
              </div>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <div className="mt-12 flex flex-col items-center lg:items-start gap-2">
                <span className="font-serif text-4xl italic tracking-wide text-[var(--color-accent-peach)] opacity-90">
                  Shreya Shrivastava
                </span>
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[var(--color-text-secondary)] mt-2 opacity-80">
                  Creator • Writer • Dreamer
                </span>
              </div>
            </FadeInStaggerItem>
          </FadeInStagger>

          {/* Right Column: Premium Newsletter Card */}
          <FadeIn direction="up" className="relative">
            <div className="flex flex-col bg-white dark:bg-[#1a201d] rounded-[2.5rem] p-10 lg:p-12 shadow-[0_30px_60px_rgba(30,25,20,0.06)] border border-black/5 dark:border-[#2a332d] z-10 relative">
              <div className="w-12 h-12 rounded-full bg-[var(--color-accent-peach)]/10 flex items-center justify-center mb-6">
                 <Mail className="text-[var(--color-accent-peach)]" size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-[2.5rem] leading-[1.1] text-[var(--color-text-primary)] mb-4">
                Build <span className="italic text-[var(--color-accent-peach)]">with</span> me.
              </h3>
              <p className="text-[15px] leading-relaxed text-[var(--color-text-secondary)] mb-8 font-light">
                Join my newsletter for thoughtful emails, free resources, and early access to new releases.
              </p>

              <AuthorNewsletterForm />

              <div className="mt-8 pt-6 border-t border-[var(--color-border-soft)] dark:border-[#2a332d] grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center text-center gap-2">
                   <ShieldCheck size={16} className="text-[var(--color-accent-peach)] opacity-80" strokeWidth={1.5} />
                   <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--color-text-secondary)] opacity-70">No spam</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2 border-l border-[var(--color-border-soft)] dark:border-[#2a332d]">
                   <Sparkles size={16} className="text-[var(--color-accent-peach)] opacity-80" strokeWidth={1.5} />
                   <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--color-text-secondary)] opacity-70">Helpful<br/>resources</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2 border-l border-[var(--color-border-soft)] dark:border-[#2a332d]">
                   <Heart size={16} className="text-[var(--color-accent-peach)] opacity-80" strokeWidth={1.5} />
                   <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--color-text-secondary)] opacity-70">Early<br/>updates</span>
                </div>
              </div>
            </div>
            {/* Subtle glow behind card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[var(--color-accent-peach)]/5 rounded-[3rem] blur-[60px] -z-10 pointer-events-none" />
          </FadeIn>

        </div>
      </Container>
    </section>
  );
}