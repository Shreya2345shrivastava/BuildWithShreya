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
		<div className="flex flex-col items-center text-center slide-up lg:items-start lg:text-left">
			<div className="max-w-[520px]">
				<h1 id="hero-title" className="text-editorial-h1 text-[var(--color-text-primary)] leading-[1.06] sm:text-[clamp(3.6rem,5vw,5.55rem)]">
					<span className="block">Build your dream.</span>
					<span className="block -mt-2">Then make it</span>
					<span className="mt-1 block font-normal italic leading-[0.9] tracking-tight text-[var(--color-accent-peach)] antialiased [text-rendering:geometricPrecision] [-webkit-font-smoothing:antialiased] sm:text-[clamp(3.25rem,5vw,4.85rem)]">
						beautiful.
					</span>
				</h1>

				<div className="mt-11 flex items-center justify-center gap-2 lg:justify-start">
					<span className="h-px w-16 bg-[var(--color-border-soft)]/75 sm:w-20" />
					<DecorativeHeart />
					<span className="h-px w-16 bg-[var(--color-border-soft)]/75 sm:w-20" />
				</div>

				<p className="mt-8 max-w-[420px] text-body-large leading-[1.82] text-[var(--color-text-secondary)]">
					Gentle books, practical tools, and thoughtful resources to help you build a meaningful life—one step at a time.
				</p>

				<HeroButtons />
			</div>
		</div>
	);
}