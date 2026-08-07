import type { HTMLAttributes } from "react";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

type BotanicalVariant = "corner" | "divider" | "side-vine" | "watercolor-blob" | "leaf" | "flower" | "top-right" | "bottom-left";

interface BotanicalDecorationProps extends HTMLAttributes<HTMLSpanElement> {
	variant?: BotanicalVariant;
	opacity?: number;
}

function BotanicalMark({ variant }: { variant: BotanicalVariant }) {
	switch (variant) {
		case "flower":
			return (
				<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
					<path d="M24 8c2.9 0 4.7 2.7 4 5.4-.3 1.2-.9 2.3-1.7 3.2 1.2-.4 2.5-.6 3.7-.3 2.8.8 4.4 3.9 3.1 6.5-1.2 2.4-4 3.4-6.5 2.8.8.9 1.4 2 1.7 3.2.7 2.7-1.1 5.4-4 5.4-2.9 0-4.7-2.7-4-5.4.3-1.2.9-2.3 1.7-3.2-1.2.4-2.5.6-3.7.3-2.8-.8-4.4-3.9-3.1-6.5 1.2-2.4 4-3.4 6.5-2.8-.8-.9-1.4-2-1.7-3.2-.7-2.7 1.1-5.4 4-5.4Z" stroke="currentColor" strokeWidth="1.2" />
					<circle cx="24" cy="24" r="2.5" fill="currentColor" fillOpacity="0.18" />
				</svg>
			);
		case "watercolor-blob":
			return (
				<svg viewBox="0 0 120 120" fill="none" aria-hidden="true">
					<path d="M20 54C13 32 27 16 50 14c19-2 30 8 42 18 12 10 24 22 21 39-3 18-21 31-41 31-22 0-45-9-52-28Z" fill="currentColor" fillOpacity="0.18" />
				</svg>
			);
		case "side-vine":
			return (
				<svg viewBox="0 0 72 240" fill="none" aria-hidden="true">
					<path d="M38 232c6-20 5-43-5-61-7-13-18-24-24-38-8-18-5-40 10-53 13-11 27-11 39-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
					<path d="M29 122c6-4 12-6 18-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
					<path d="M42 78c7-3 14-4 21-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
					<path d="M24 164c6-2 12-2 18 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
				</svg>
			);
		case "divider":
			return (
				<svg viewBox="0 0 220 24" fill="none" aria-hidden="true">
					<path d="M12 12h76" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
					<path d="M132 12h76" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
					<path d="M110 4c3 3 6 6 10 8-4 2-7 5-10 8-3-3-6-6-10-8 4-2 7-5 10-8Z" fill="currentColor" fillOpacity="0.28" />
				</svg>
			);
		case "leaf":
			return (
				<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
					<path d="M24 38c7-7 11-16 12-28-9 1-18 5-25 12-4 4-6 9-7 16 7 0 13-2 20-7Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
				</svg>
			);
		case "corner":
			return (
				<svg viewBox="0 0 72 72" fill="none" aria-hidden="true">
					<path d="M68 10c-10 2-17 9-21 18-3 7-5 14-10 20-6 8-16 12-29 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
					<path d="M54 12c-4 2-7 5-10 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
					<path d="M40 28c-3 3-5 6-7 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
				</svg>
			);
		case "top-right":
		case "bottom-left":
			return (
				<svg viewBox="0 0 120 120" fill="none" aria-hidden="true">
					<path d="M16 92c14-28 36-45 68-56" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
					<path d="M60 36c7 10 13 23 15 38" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
					<path d="M52 66c10 1 19 5 28 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
				</svg>
			);
		default:
			return null;
	}
}

export function BotanicalDecoration({ variant = "leaf", opacity = 1, className, style, ...props }: BotanicalDecorationProps) {
	const colorMap: Record<BotanicalVariant, string> = {
		corner: theme.decorations.peach,
		divider: theme.decorations.gold,
		"side-vine": theme.decorations.fern,
		"watercolor-blob": theme.decorations.peach,
		leaf: theme.decorations.leaf,
		flower: theme.decorations.sage,
		"top-right": theme.decorations.fern,
		"bottom-left": theme.decorations.peach,
	};

	return (
		<span
			className={cn("pointer-events-none inline-flex shrink-0 text-[var(--color-botanical-leaf)]", className)}
			style={{ color: colorMap[variant], opacity, ...style }}
			aria-hidden="true"
			{...props}
		>
			<BotanicalMark variant={variant} />
		</span>
	);
}