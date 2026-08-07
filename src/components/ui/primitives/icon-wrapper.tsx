import type { HTMLAttributes, ReactNode } from "react";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface IconWrapperProps extends HTMLAttributes<HTMLSpanElement> {
	icon: ReactNode;
	size?: "sm" | "md" | "lg";
}

const sizeMap = {
	sm: "h-8 w-8",
	md: "h-10 w-10",
	lg: "h-12 w-12",
} as const;

export function IconWrapper({ icon, size = "md", className, style, ...props }: IconWrapperProps) {
	return (
		<span
			className={cn("inline-flex items-center justify-center border border-[var(--color-border-soft)] bg-[var(--color-surface-primary)] text-[var(--color-text-primary)] shadow-[var(--shadow-sm)]", sizeMap[size], className)}
			style={{ borderRadius: theme.radius.full, ...style }}
			{...props}
		>
			{icon}
		</span>
	);
}