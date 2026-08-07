import type { HTMLAttributes } from "react";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { BotanicalDecoration } from "@/components/ui/decorations/botanical-decoration";

type DividerVariant = "simple" | "botanical" | "centered" | "left";

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
	variant?: DividerVariant;
}

export function Divider({ variant = "simple", className, ...props }: DividerProps) {
	if (variant === "botanical") {
		return (
			<div className={cn("flex items-center justify-center gap-3", className)} aria-hidden="true" {...props}>
				<span className="h-px w-12 bg-[var(--color-border-soft)]" />
				<BotanicalDecoration variant="leaf" opacity={0.5} className="h-5 w-5" />
				<span className="h-px w-12 bg-[var(--color-border-soft)]" />
			</div>
		);
	}

	if (variant === "centered") {
		return (
			<div className={cn("flex items-center justify-center", className)} aria-hidden="true" {...props}>
				<span className="h-px w-24 bg-[var(--color-border-subtle)]" />
			</div>
		);
	}

	if (variant === "left") {
		return (
			<div className={cn("flex items-center justify-start", className)} aria-hidden="true" {...props}>
				<span className="h-px w-24 bg-[var(--color-border-soft)]" />
			</div>
		);
	}

	return <div className={cn("h-px w-full", className)} style={{ backgroundColor: theme.dividers.simple }} aria-hidden="true" {...props} />;
}