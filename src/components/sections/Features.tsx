"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CalendarCheck2, Heart, Route, Sprout, Sunrise } from "lucide-react";
import { Container } from "@/components/ui";
import { FeatureCard } from "@/components/ui/cards";
import { cn } from "@/lib/utils";

type FeatureItem = {
	icon: typeof Sprout;
	title: string;
	description: string;
};

const FEATURES: FeatureItem[] = [
	{
		icon: Sprout,
		title: "Dream",
		description: "Reconnect with your dreams and remember what lights you up.",
	},
	{
		icon: Sunrise,
		title: "Courage",
		description: "Build the courage to begin, even when you're scared.",
	},
	{
		icon: Route,
		title: "Action",
		description: "Take simple steps and turn intention into real progress.",
	},
	{
		icon: CalendarCheck2,
		title: "Consistency",
		description: "Build habits that create momentum and bring change.",
	},
	{
		icon: Heart,
		title: "Reflection",
		description: "Reflect, grow, and become your future self with clarity.",
	},
];

const delayClasses = ["delay-[0ms]", "delay-[80ms]", "delay-[160ms]", "delay-[240ms]", "delay-[320ms]"];

function BotanicalEdge({ side }: { side: "left" | "right" }) {
	return (
		<div aria-hidden="true" className={cn("pointer-events-none absolute inset-y-0 hidden w-48 xl:block", side === "left" ? "-left-10" : "-right-10")}>
			<div className={cn("absolute top-1/2 -translate-y-1/2 opacity-[0.09]", side === "left" ? "-translate-x-1/3" : "translate-x-1/3")}>
				<Image
					src="/images/hero/hero-leaves.svg"
					alt=""
					aria-hidden="true"
					width={220}
					height={220}
					className={cn("h-auto w-full", side === "right" && "scale-x-[-1]")}
				/>
			</div>
		</div>
	);
}

function DecorativeDivider() {
	return (
		<div className="mt-4 flex items-center justify-center gap-2.5">
			<span className="h-px w-24 bg-[var(--color-accent-peach)]/75 sm:w-28" />
			<Heart aria-hidden="true" className="h-3.5 w-3.5 fill-[var(--color-accent-peach)] text-[var(--color-accent-peach)] opacity-90" />
			<span className="h-px w-24 bg-[var(--color-accent-peach)]/75 sm:w-28" />
		</div>
	);
}

export function Features() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const node = sectionRef.current;

		if (!node) {
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
		);

		observer.observe(node);

		return () => observer.disconnect();
	}, []);

	return (
		<section ref={sectionRef} aria-labelledby="features-title" className="relative overflow-hidden bg-[var(--color-bg-cream)] pt-24 pb-16 sm:pt-24 sm:pb-20 lg:pt-24 lg:pb-24">
			<BotanicalEdge side="left" />
			<BotanicalEdge side="right" />

			<Container width="wide">
				<div className="mx-auto flex w-full max-w-[1400px] flex-col items-center text-center">
					<div className={cn("transition-all duration-500 ease-out", visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}>
						<h2 id="features-title" className="whitespace-nowrap text-[clamp(1.05rem,2.5vw,3rem)] font-semibold tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-[clamp(1.15rem,2.35vw,3rem)]">
							What You&apos;ll Find Inside
						</h2>
						<DecorativeDivider />
					</div>

					<div className="mt-10 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2 lg:gap-6 xl:grid-cols-5 xl:gap-5">
						{FEATURES.map((feature, index) => {
							const Icon = feature.icon;

							return (
								<FeatureCard
									key={feature.title}
									visible={visible}
									className={cn(
										"min-h-[13.1rem] xl:min-h-[14.9rem]",
										delayClasses[index],
									)}
									icon={<Icon aria-hidden="true" className="h-7 w-7 stroke-[1.7]" />}
									title={feature.title}
									description={feature.description}
								/>
							);
						})}
					</div>
				</div>
			</Container>
		</section>
	);
}