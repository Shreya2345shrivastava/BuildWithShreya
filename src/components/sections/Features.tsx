"use client";

import { useEffect, useRef, useState } from "react";
import { Lightbulb, Target, CalendarCheck, Sparkles, Navigation, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { cn } from "@/lib/utils";

type FeatureItem = {
	icon: LucideIcon;
	title: string;
	description: string;
};

const FEATURES: FeatureItem[] = [
	{
		icon: Lightbulb,
		title: "Dream",
		description: "Reconnect with your dreams and remember what lights you up.",
	},
	{
		icon: Target,
		title: "Growth",
		description: "Develop the mindset to overcome challenges and evolve.",
	},
	{
		icon: CalendarCheck,
		title: "Habits",
		description: "Build sustainable routines that create real momentum.",
	},
	{
		icon: Sparkles,
		title: "Reflection",
		description: "Reflect, grow, and become your future self with clarity.",
	},
	{
		icon: Navigation,
		title: "Purpose",
		description: "Find your true north and align your actions with your values.",
	},
];

const delayClasses = ["delay-[0ms]", "delay-[80ms]", "delay-[160ms]", "delay-[240ms]", "delay-[320ms]"];

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
		<section ref={sectionRef} aria-labelledby="features-title" className="relative bg-[var(--color-bg-ivory)] pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-24">
			<Container width="wide">
				<div className="mx-auto flex w-full max-w-[1400px] flex-col items-center text-center">
					<div className={cn("transition-all duration-500 ease-out", visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}>
						<h2 id="features-title" className="text-center font-serif text-3xl font-medium tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
							What You&apos;ll Find Inside
						</h2>
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