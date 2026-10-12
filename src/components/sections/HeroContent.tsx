import { HeroButtons } from "@/components/sections/HeroButtons";
import { FadeInStagger, FadeInStaggerItem } from "@/components/ui";

export function HeroContent() {
  return (
    <FadeInStagger className="flex flex-col items-center text-center lg:items-start lg:text-left">
      {/* Editorial Navigation Badge */}
      <FadeInStaggerItem>
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-soft)] dark:border-[#2a332d] bg-[var(--color-surface-elevated)] dark:bg-[#242b28]/50 px-4 py-1.5 text-xs font-semibold tracking-widest text-[var(--color-text-secondary)] uppercase transition-all duration-300">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-peach)]"></span> Build With Shreya
        </span>
      </FadeInStaggerItem>

      {/* Hero Title */}
      <FadeInStaggerItem>
        <h1
          id="hero-title"
          className="mt-5 lg:mt-8 w-full max-w-[650px] font-serif text-[clamp(2.6rem,7vw,4.75rem)] leading-[1.02] tracking-tight text-[var(--color-text-primary)]"
        >
          <span className="block">Build It First.</span>
          <span className="block text-[var(--color-accent-peach)] italic">Then Make It Beautiful.</span>
        </h1>
      </FadeInStaggerItem>

      {/* Body Copy */}
      <FadeInStaggerItem>
        <p className="mt-6 max-w-[480px] text-lg leading-[1.8] text-[var(--color-text-secondary)] lg:mt-8">
          Books, creator systems, templates, and custom websites to help you turn a clear idea into something real.
        </p>
      </FadeInStaggerItem>

      {/* CTA Buttons */}
      <FadeInStaggerItem>
        <div className="mt-10">
          <HeroButtons />
        </div>
      </FadeInStaggerItem>

    </FadeInStagger>
  );
}