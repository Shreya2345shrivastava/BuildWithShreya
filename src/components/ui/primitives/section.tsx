import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/primitives/container";
import { SectionTitle } from "@/components/ui/primitives/section-title";

type SectionAlignment = "left" | "center";
type SectionSpacing = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
type SectionBackground = "transparent" | "cream" | "ivory" | "peach" | "sage";

interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
	title?: ReactNode;
	subtitle?: ReactNode;
	children: ReactNode;
	alignment?: SectionAlignment;
	spacing?: SectionSpacing;
	background?: SectionBackground;
	eyebrow?: ReactNode;
	description?: ReactNode;
	divider?: boolean;
	smallBotanicalOrnament?: boolean;
	containerWidth?: "default" | "narrow" | "wide" | "full";
}

const spacingMap: Record<SectionSpacing, string> = {
	sm: "py-10 sm:py-12",
	md: "py-12 sm:py-16",
	lg: "py-16 sm:py-20",
	xl: "py-20 sm:py-24",
	"2xl": "py-24 sm:py-28",
	"3xl": "py-28 sm:py-32",
	"4xl": "py-32 sm:py-40",
};

const backgroundMap: Record<SectionBackground, string> = {
	transparent: "bg-transparent",
	cream: "bg-[var(--color-bg-cream)]",
	ivory: "bg-[var(--color-bg-ivory)] dark:bg-[#131715]",
	peach: "bg-[var(--color-bg-peach-tint)]",
	sage: "bg-[var(--color-bg-sage-tint)]",
};

export function Section({
	title,
	subtitle,
	children,
	alignment = "left",
	spacing = "xl",
	background = "transparent",
	eyebrow,
	description,
	divider = false,
	smallBotanicalOrnament = false,
	containerWidth = "default",
	className,
	...props
}: SectionProps) {
	return (
		<section className={cn(backgroundMap[background], spacingMap[spacing], className)} {...props}>
			<Container width={containerWidth}>
				<div className={cn("flex flex-col gap-8", alignment === "center" && "items-center")}> 
					{title ? (
						<SectionTitle
							eyebrow={eyebrow}
							title={title}
							description={description ?? subtitle}
							center={alignment === "center"}
							divider={divider}
							smallBotanicalOrnament={smallBotanicalOrnament}
						/>
					) : null}
					<div className={cn("w-full", alignment === "center" && "text-center")}>{children}</div>
				</div>
			</Container>
		</section>
	);
}