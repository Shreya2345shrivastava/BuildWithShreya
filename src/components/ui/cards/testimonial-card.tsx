import type { HTMLAttributes, ReactNode } from "react";
import { Card } from "@/components/ui/primitives/card";
import { cn } from "@/lib/utils";

interface TestimonialCardProps extends HTMLAttributes<HTMLDivElement> {
	quote: ReactNode;
	name: ReactNode;
	location?: ReactNode;
	avatar?: ReactNode;
	rating?: number;
}

function Stars({ rating = 5 }: { rating?: number }) {
	return (
		<div className="flex items-center gap-1 text-[var(--color-accent-gold)]" aria-label={`${rating} out of 5 stars`}>
			{Array.from({ length: 5 }, (_, index) => (
				<svg key={index} className={cn("h-3.5 w-3.5", index >= rating && "opacity-25")} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
					<path d="m10 1.6 2.6 5.3 5.8.8-4.2 4.1 1 5.7L10 15l-5.2 2.7 1-5.7-4.2-4.1 5.8-.8L10 1.6Z" />
				</svg>
			))}
		</div>
	);
}

export function TestimonialCard({ quote, name, location, avatar, rating = 5, className, ...props }: TestimonialCardProps) {
	return (
		<Card background="testimonial" hover padding="lg" className={cn("flex h-full flex-col gap-5", className)} {...props}>
			<Stars rating={rating} />
			<blockquote className="text-body-large text-[var(--color-text-primary)]">“{quote}”</blockquote>
			<div className="mt-auto flex items-center gap-3">
				{avatar ? <div className="h-12 w-12 overflow-hidden rounded-full border border-[var(--color-border-soft)]">{avatar}</div> : null}
				<div>
					<p className="text-button text-[var(--color-text-primary)]">{name}</p>
					{location ? <p className="text-caption text-[var(--color-text-secondary)]">{location}</p> : null}
				</div>
			</div>
		</Card>
	);
}