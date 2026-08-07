"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
	mode?: "light" | "dark";
	compact?: boolean;
	className?: string;
}

function BotanicalMark() {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
			<path d="M12 21c1.9-3.2 3.1-6.3 3.8-9.3.6-2.5.8-4.6.6-6.4-1.8.2-3.8.9-6 2.2C8 9 6.5 10.3 5.1 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M12 21c-.5-3.7-1.3-6.8-2.5-9.2-1.2-2.5-2.7-4.1-4.4-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

export function Logo({ mode = "light", compact = false, className }: LogoProps) {
	const isDark = mode === "dark";

	return (
		<span
			className={cn(
				"inline-flex items-center gap-2 text-left transition-opacity duration-300 hover:opacity-90",
				isDark ? "text-[var(--color-text-inverse)]" : "text-[var(--color-text-primary)]",
				className,
			)}
		>
			<span
				className={cn(
					"inline-flex h-10 w-10 items-center justify-center rounded-full border shadow-[var(--shadow-sm)]",
					isDark
						? "border-white/15 bg-white/10 text-[var(--color-text-inverse)]"
						: "border-[var(--color-border-soft)] bg-[var(--color-surface-primary)] text-[var(--color-accent-peach)]",
				)}
			>
				<BotanicalMark />
			</span>
			<span className="whitespace-nowrap font-serif text-lg leading-none tracking-[-0.04em] sm:text-xl">
				<span className={cn(isDark ? "text-[var(--color-text-inverse)]" : "text-[var(--color-text-primary)]")}>BuildWith</span>
				<span className="text-[var(--color-accent-peach)]">Shreya</span>
				{compact ? null : <span className="sr-only"> premium editorial brand</span>}
			</span>
		</span>
	);
}