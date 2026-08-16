import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
	mode?: "light" | "dark";
	compact?: boolean;
}

function Sprig({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<path d="M12 21c1.8-3.2 3.2-6.1 4.1-8.7.9-2.6 1.3-4.8 1.1-6.6-1.9.3-4 1.1-6.1 2.4C9 9.4 7.4 10.8 6 12.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M12 21c-.5-3.8-1.3-6.9-2.5-9.4-1.2-2.5-2.7-4.2-4.5-5.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M14.6 9.6c-.9.1-1.8.5-2.6 1.1" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
		</svg>
	);
}

export function Logo({ mode = "light", compact = false, className, ...props }: LogoProps) {
	const isDark = mode === "dark";

	return (
		<div className={cn("inline-flex items-center gap-2 font-semibold tracking-tight", className)} {...props}>
			<span className={cn("inline-flex h-9 w-9 items-center justify-center rounded-full border", isDark ? "border-white/20 bg-[var(--color-surface-elevated)] dark:bg-[#242b28]/10 text-[var(--color-text-inverse)]" : "border-[var(--color-border-soft)] dark:border-[#2a332d] bg-[var(--color-surface-primary)] text-[var(--color-accent-peach)]")}>
				<Sprig className="h-5 w-5" />
			</span>
			<span className={cn("leading-none", isDark ? "text-[var(--color-text-inverse)]" : "text-[var(--color-text-primary)]")}>
				<span className="font-serif text-lg tracking-[-0.04em]">BuildWith</span>
				<span className="font-serif text-lg tracking-[-0.04em] text-[var(--color-accent-peach)]">Shreya</span>
				{!compact ? <span className="sr-only"> premium editorial brand</span> : null}
			</span>
		</div>
	);
}