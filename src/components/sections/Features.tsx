import { Lightbulb, Target, CalendarCheck, Sparkles, Navigation, type LucideIcon } from "lucide-react";
import { Container, FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui";
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

export function Features() {
	return (
		<section aria-labelledby="features-title" className="relative bg-[var(--color-bg-ivory)] dark:bg-[#131715] pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-24">
			<Container width="wide">
				<FadeInStagger className="mx-auto flex w-full max-w-[1400px] flex-col items-center text-center">
					<FadeIn>
						<h2 id="features-title" className="text-center font-serif text-3xl font-medium tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
							What You&apos;ll Find Inside
						</h2>
					</FadeIn>

					<div className="mt-10 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2 lg:gap-6 xl:grid-cols-5 xl:gap-5">
						{FEATURES.map((feature, index) => {
							const Icon = feature.icon;

							return (
								<FadeInStaggerItem key={feature.title}>
									<FeatureCard
										visible={true}
										className="min-h-[13.1rem] xl:min-h-[14.9rem]"
										icon={<Icon aria-hidden="true" className="h-7 w-7 stroke-[1.7]" />}
										title={feature.title}
										description={feature.description}
									/>
								</FadeInStaggerItem>
							);
						})}
					</div>
				</FadeInStagger>
			</Container>
		</section>
	);
}