import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BotanicalDecoration } from "@/components/ui/decorations/botanical-decoration";
import { Divider } from "@/components/ui/primitives/divider";

interface SectionTitleProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
	eyebrow?: ReactNode;
	title: ReactNode;
	description?: ReactNode;
	center?: boolean;
	left?: boolean;
	divider?: boolean;
	smallBotanicalOrnament?: boolean;
	level?: "h2" | "h3" | "h4";
}

const levelMap = {
	h2: "text-editorial-h2",
	h3: "text-editorial-h3",
	h4: "text-editorial-h4",
} as const;

export function SectionTitle({
	eyebrow,
	title,
	description,
	center = false,
	left = true,
	divider = false,
	smallBotanicalOrnament = false,
	level = "h2",
	className,
	...props
}: SectionTitleProps) {
	const alignClass = center ? "items-center text-center" : left ? "items-start text-left" : "items-start text-left";

	return (
		<div className={cn("flex flex-col gap-3", alignClass, className)} {...props}>
			{eyebrow ? <span className="text-label text-[var(--color-accent-peach)]">{eyebrow}</span> : null}
			<div className={cn("flex items-center gap-3", center && "justify-center")}>
				{smallBotanicalOrnament ? <BotanicalDecoration variant="leaf" className="h-4 w-4 text-[var(--color-botanical-leaf)]" /> : null}
				{level === "h2" ? (
					<h2 className={cn(levelMap[level], "max-w-3xl")}>{title}</h2>
				) : level === "h3" ? (
					<h3 className={cn(levelMap[level], "max-w-3xl")}>{title}</h3>
				) : (
					<h4 className={cn(levelMap[level], "max-w-3xl")}>{title}</h4>
				)}
			</div>
			{description ? <p className={cn("max-w-2xl text-body text-[var(--color-text-secondary)]", center && "mx-auto")}>{description}</p> : null}
			{divider ? <Divider variant={center ? "centered" : "left"} className="mt-2" /> : null}
		</div>
	);
}