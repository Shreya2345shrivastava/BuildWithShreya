import type { HTMLAttributes, ReactNode } from "react";
import { Button } from "@/components/ui/primitives/button";
import { Card } from "@/components/ui/primitives/card";
import { Input } from "@/components/ui/forms/input";
import { cn } from "@/lib/utils";

interface NewsletterCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
	title: ReactNode;
	description: ReactNode;
	buttonLabel?: ReactNode;
	placeholder?: string;
}

export function NewsletterCard({ title, description, buttonLabel = "Join Free", placeholder = "Your email address", className, ...props }: NewsletterCardProps) {
	return (
		<Card background="newsletter" hover padding="lg" className={cn("flex h-full flex-col gap-5", className)} {...props}>
			<div className="space-y-2">
				<h3 className="text-editorial-h4">{title}</h3>
				<p className="text-body text-[var(--color-text-secondary)]">{description}</p>
			</div>
			<form className="flex flex-col gap-3 sm:flex-row">
				<Input type="email" name="email" placeholder={placeholder} className="flex-1" />
				<Button type="submit" variant="primary" size="md">
					{buttonLabel}
				</Button>
			</form>
		</Card>
	);
}