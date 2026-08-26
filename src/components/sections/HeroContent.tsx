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
          className="mt-4 lg:mt-8 font-serif text-[clamp(2.75rem,8vw,5rem)] leading-[1.1] tracking-tight text-[var(--color-text-primary)] max-w-[540px]"
        >
          Build It First.
          <br />
          Then Make It
          <br />
          <span className="font-display italic text-[var(--color-accent-peach)] text-[1.15em] leading-none block mt-1 sm:mt-2">Beautiful.</span>
        </h1>
      </FadeInStaggerItem>

      {/* Body Copy */}
      <FadeInStaggerItem>
        <p className="mt-5 lg:mt-8 max-w-[480px] text-lg leading-[1.8] text-[var(--color-text-secondary)]">
          A gentle guide and workbook for creators, dreamers, and doers. Move from overthinking to action—one meaningful step at a time.
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