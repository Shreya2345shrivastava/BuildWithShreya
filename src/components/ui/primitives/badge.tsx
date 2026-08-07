import type { HTMLAttributes } from "react";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

type BadgeVariant = keyof typeof theme.badges;

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	variant?: BadgeVariant;
}

export function Badge({ variant = "primary", className, style, ...props }: BadgeProps) {
	const token = theme.badges[variant];

	return (
		<span
			className={cn("inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.12em] uppercase", className)}
			style={{ backgroundColor: token.background, color: token.foreground, borderColor: token.border, ...style }}
			{...props}
		/>
	);
}