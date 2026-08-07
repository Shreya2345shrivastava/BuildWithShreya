import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/primitives/card";

interface FeatureCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
	icon?: ReactNode;
	image?: ReactNode;
	title: ReactNode;
	description: ReactNode;
}

export function FeatureCard({ icon, image, title, description, className, ...props }: FeatureCardProps) {
	return (
		<Card background="feature" hover padding="lg" className={cn("flex h-full flex-col gap-4 text-left", className)} {...props}>
			<div className="flex items-start gap-3">
				{image ?? icon ? <div className="shrink-0">{image ?? icon}</div> : null}
				<div className="space-y-2">
					<h3 className="text-editorial-h4">{title}</h3>
					<p className="text-body text-[var(--color-text-secondary)]">{description}</p>
				</div>
			</div>
		</Card>
	);
}