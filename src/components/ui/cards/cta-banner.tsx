import type { HTMLAttributes, ReactNode } from "react";
import { Button } from "@/components/ui/primitives/button";
import { Card } from "@/components/ui/primitives/card";
import { cn } from "@/lib/utils";

interface CtaBannerProps extends HTMLAttributes<HTMLDivElement> {
	heading: ReactNode;
	description: ReactNode;
	primaryLabel: ReactNode;
	primaryHref?: string;
	secondaryLabel?: ReactNode;
	secondaryHref?: string;
}

export function CtaBanner({ heading, description, primaryLabel, primaryHref, secondaryLabel, secondaryHref, className, ...props }: CtaBannerProps) {
	return (
		<Card background="newsletter" hover padding="lg" className={cn("flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between", className)} {...props}>
			<div className="max-w-2xl space-y-2">
				<h3 className="text-editorial-h3">{heading}</h3>
				<p className="text-body text-[var(--color-text-secondary)]">{description}</p>
			</div>
			<div className="flex flex-col gap-3 sm:flex-row">
				<Button href={primaryHref ?? "#"} variant="primary">
					{primaryLabel}
				</Button>
				{secondaryLabel ? (
					<Button href={secondaryHref ?? "#"} variant="outline">
						{secondaryLabel}
					</Button>
				) : null}
			</div>
		</Card>
	);
}