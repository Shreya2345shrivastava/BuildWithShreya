import { Container } from "@/components/ui";
import { HeroContent } from "@/components/sections/HeroContent";
import { HeroImage } from "@/components/sections/HeroImage";

export function Hero() {
	return (
		<section
			aria-labelledby="hero-title"
			className="relative isolate flex min-h-[84vh] items-center overflow-hidden bg-[radial-gradient(circle_at_50%_12%,rgba(217,164,143,0.16),transparent_28%),radial-gradient(circle_at_top_left,rgba(217,164,143,0.12),transparent_34%),radial-gradient(circle_at_85%_18%,rgba(168,182,157,0.14),transparent_30%),linear-gradient(180deg,#fcf8f2_0%,#fffaf4_52%,#fcf8f2_100%)] pt-32 pb-16 sm:min-h-[88vh] sm:pt-36 sm:pb-20 lg:min-h-[94vh] lg:pt-40 lg:pb-24"
		>
			<div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[rgba(255,250,244,0.98)] to-transparent" />
			<div className="pointer-events-none absolute inset-x-1/2 top-[14%] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(217,164,143,0.16)_0%,rgba(217,164,143,0.09)_30%,transparent_72%)] blur-3xl" />
			<div className="pointer-events-none absolute -left-16 top-20 h-56 w-56 rounded-full bg-[rgba(217,164,143,0.1)] blur-3xl" />
			<div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-[rgba(168,182,157,0.1)] blur-3xl" />
			<Container width="wide">
				<div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
					<HeroContent />
					<HeroImage />
				</div>
			</Container>
		</section>
	);
}