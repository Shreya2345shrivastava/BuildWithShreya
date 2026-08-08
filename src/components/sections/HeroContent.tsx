import { HeroButtons } from "@/components/sections/HeroButtons";

function DecorativeHeart() {
	return (
		<svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 text-[var(--color-accent-peach)]" fill="currentColor">
			<path d="M8 13.6 6.8 12.6C3.4 9.7 1.2 7.8 1.2 5.4 1.2 3.5 2.6 2 4.5 2c1.1 0 2.2.5 2.9 1.4C8.1 2.5 9.2 2 10.3 2c1.9 0 3.3 1.5 3.3 3.4 0 2.4-2.2 4.3-5.6 7.2L8 13.6Z" />
		</svg>
	);
}

export function HeroContent() {
	return (
		<div className="flex flex-col items-center text-center lg:items-start lg:text-left">
  <span
    className="
      inline-flex items-center gap-2
      rounded-full
      border border-[var(--color-border-soft)]
      bg-white/70
      px-4 py-2
      text-sm
      text-[var(--color-accent-peach)]
      shadow-sm
      backdrop-blur-sm
      transition-all duration-300
      hover:-translate-y-0.5
    "
  >
    ✨ BuildWithShreya
  </span>

  <h1
    id="hero-title"
    className="
      mt-8
      font-serif
      text-5xl
      leading-[0.92]
      tracking-[-0.05em]
      text-[var(--color-text-primary)]
      sm:text-6xl
      lg:text-7xl
      xl:text-8xl
    "
  >
    Build your dream.
    <br />
    Then make it
    <br />
    beautiful.
  </h1>

  <div className="mt-11 flex items-center justify-center gap-2 lg:justify-start">
    <span className="h-px w-16 bg-[var(--color-border-soft)]/75 sm:w-20" />
    <DecorativeHeart />
    <span className="h-px w-16 bg-[var(--color-border-soft)]/75 sm:w-20" />
  </div>

  <p
    className="
      mt-8
      max-w-[520px]
      text-lg
      leading-[1.9]
      text-[var(--color-text-secondary)]
    "
  >
    Gentle books, practical tools, and thoughtful resources to help
    you build a meaningful life—one step at a time.
  </p>

  <div className="mt-10">
    <HeroButtons />
  </div>
</div>
	);
}