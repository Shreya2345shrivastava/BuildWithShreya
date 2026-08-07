import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
	icon: ReactNode;
	title: ReactNode;
	description: ReactNode;
	visible?: boolean;
	className?: string;
}

export function FeatureCard({ icon, title, description, visible = true, className, ...props }: FeatureCardProps) {
	return (
		<article
			tabIndex={0}
			data-visible={visible}
			className={cn(
				"group flex h-full flex-col items-center justify-center rounded-[26px] border border-[var(--color-border-soft)] bg-[rgba(255,250,244,0.94)] px-5 py-7 text-center shadow-[0_12px_30px_rgba(32,25,19,0.045)] backdrop-blur-[6px] transition-[transform,box-shadow,border-color,opacity] duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[8px] hover:border-[var(--color-accent-peach)] hover:shadow-[0_18px_40px_rgba(32,25,19,0.07)] focus-visible:-translate-y-[8px] focus-visible:border-[var(--color-accent-peach)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-cream)] data-[visible=false]:translate-y-5 data-[visible=false]:opacity-0 data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100",
				className,
			)}
			{...props}
		>
			<div className="flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-bg-peach-tint)_70%,white)] text-[var(--color-accent-peach)] shadow-[0_10px_18px_rgba(217,164,143,0.16)] transition-transform duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08] group-focus-visible:scale-[1.08]">
				{icon}
			</div>

			<div className="mt-5 space-y-2.5">
				<h3 className="text-editorial-h4 font-semibold text-[var(--color-text-primary)]">{title}</h3>
				<p className="text-body leading-[1.82] text-[var(--color-text-secondary)]">{description}</p>
			</div>
		</article>
	);
}