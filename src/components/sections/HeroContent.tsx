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
          className="mt-8 font-serif text-5xl leading-[1.1] tracking-tight text-[var(--color-text-primary)] sm:text-6xl lg:text-7xl xl:text-[5rem]"
        >
          Build your dream.
          <br />
          Then make it <span className="font-display italic text-[var(--color-accent-peach)]">beautiful.</span>
        </h1>
      </FadeInStaggerItem>

      {/* Body Copy */}
      <FadeInStaggerItem>
        <p className="mt-8 max-w-[480px] text-lg leading-[1.8] text-[var(--color-text-secondary)]">
          Gentle books, practical tools, and thoughtful resources to help you build a meaningful life—one step at a time.
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