import type { HTMLAttributes, ReactNode } from "react";
import { Button } from "@/components/ui/primitives/button";
import { Card } from "@/components/ui/primitives/card";
import { cn } from "@/lib/utils";

interface BookCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
	cover: ReactNode;
	title: ReactNode;
	subtitle?: ReactNode;
	price?: ReactNode;
	buttonLabel?: ReactNode;
	href?: string;
}

export function BookCard({ cover, title, subtitle, price, buttonLabel = "View Book", href, className, ...props }: BookCardProps) {
	return (
		<Card background="book" hover padding="lg" className={cn("flex h-full flex-col gap-4", className)} {...props}>
			<div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface-primary)]">{cover}</div>
			<div className="space-y-2">
				<h3 className="text-editorial-h4">{title}</h3>
				{subtitle ? <p className="text-body text-[var(--color-text-secondary)]">{subtitle}</p> : null}
			</div>
			<div className="mt-auto flex items-center justify-between gap-3">
				{price ? <span className="text-button text-[var(--color-accent-peach)]">{price}</span> : <span />}
				{href ? (
					<Button href={href} size="sm" variant="secondary">
						{buttonLabel}
					</Button>
				) : (
					<Button size="sm" variant="secondary">
						{buttonLabel}
					</Button>
				)}
			</div>
		</Card>
	);
}