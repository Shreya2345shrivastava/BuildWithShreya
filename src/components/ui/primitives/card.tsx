import type { HTMLAttributes } from "react";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

type CardRadius = keyof Pick<typeof theme.radius, "sm" | "md" | "lg" | "xl" | "pill">;
type CardShadow = keyof Pick<typeof theme.shadows, "none" | "sm" | "md" | "lg" | "floating" | "card" | "soft" | "gentle" | "elevated">;

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	padding?: "none" | "sm" | "md" | "lg";
	shadow?: CardShadow;
	hover?: boolean;
	radius?: CardRadius;
	background?: keyof typeof theme.cards;
	border?: boolean;
}

const paddingMap = {
	none: "p-0",
	sm: "p-4",
	md: "p-6",
	lg: "p-8",
} as const;

export function Card({
	padding = "md",
	shadow,
	hover = false,
	radius,
	background = "base",
	border = true,
	className,
	style,
	...props
}: CardProps) {
	const token = theme.cards[background];
	const resolvedShadow = shadow ? theme.shadows[shadow] : token.shadow;
	const resolvedRadius = radius ? theme.radius[radius] : token.radius;

	return (
		<div
			className={cn(
				"transition-soft",
				hover && "hover-lift",
				border && "border border-[var(--color-border-soft)] dark:border-[#2a332d]",
				paddingMap[padding],
				className,
			)}
			style={{
				backgroundColor: token.background,
				boxShadow: resolvedShadow,
				borderRadius: resolvedRadius,
				borderColor: token.border,
				...style,
			}}
			{...props}
		/>
	);
}