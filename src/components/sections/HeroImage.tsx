import Image from "next/image";

function BotanicalAccent() {
	return (
		<div className="pointer-events-none absolute -right-4 top-4 hidden w-32 rotate-12 opacity-70 lg:block">
			<Image src="/images/hero/hero-leaves.svg" alt="" aria-hidden="true" width={160} height={160} className="h-auto w-full" />
		</div>
	);
}

export function HeroImage() {
	return (
		<div className="relative flex justify-center lg:justify-end">
			<div className="relative w-full max-w-[740px] fade-in">
				<div className="absolute inset-x-8 bottom-2 h-32 rounded-full bg-[rgba(32,25,19,0.07)] blur-3xl" />
				<div className="absolute left-[6%] top-[16%] h-32 w-32 rounded-full bg-[rgba(217,164,143,0.18)] blur-3xl" />
				<div className="absolute right-[14%] top-[36%] h-24 w-24 rounded-full bg-[rgba(168,182,157,0.1)] blur-3xl" />

				<div className="relative aspect-[11/10] overflow-hidden rounded-[2.75rem] border border-[color-mix(in_srgb,var(--color-border-soft)_62%,transparent)] bg-[linear-gradient(180deg,rgba(255,250,244,0.96),rgba(245,231,219,0.28))] p-4 shadow-[0_42px_84px_rgba(32,25,19,0.08)] backdrop-blur-[12px] sm:p-6 lg:p-8">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_34%_22%,rgba(217,164,143,0.22),transparent_24%),radial-gradient(circle_at_78%_60%,rgba(168,182,157,0.16),transparent_22%),radial-gradient(circle_at_60%_14%,rgba(255,244,236,0.75),transparent_18%)]" />
					<div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,250,244,0.28),transparent)]" />
					<div className="absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(180deg,transparent,rgba(255,250,244,0.6))]" />
					<div className="absolute left-6 top-6 h-32 w-32 rounded-full bg-[rgba(255,250,244,0.42)] blur-3xl" />

					<div className="relative z-10 h-full w-full">
						<BotanicalAccent />
						<div className="absolute left-[16%] top-[13%] h-[32%] w-[36%] rounded-full bg-[rgba(217,164,143,0.26)] blur-3xl" />
						<div className="absolute right-[10%] bottom-[10%] h-[22%] w-[22%] rounded-full bg-[rgba(201,184,149,0.2)] blur-3xl" />

						<div className="absolute left-[4%] top-[5%] w-[50%] max-w-[330px] float-gentle transition-transform duration-500 ease-out hover:-translate-y-1 hover:scale-[1.014] motion-reduce:animate-none">
							<Image
								src="/images/hero/book-placeholder.svg"
								alt="A premium book mockup standing upright with a cream and peach botanical cover"
								width={800}
								height={980}
								priority
								sizes="(max-width: 1024px) 56vw, 380px"
								className="h-auto w-full drop-shadow-[0_34px_30px_rgba(32,25,19,0.14)]"
							/>
						</div>

						<div className="absolute right-[7%] bottom-[5%] w-[22%] max-w-[150px] transition-transform duration-500 ease-out hover:-translate-y-0.5">
							<div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,rgba(255,214,182,0.6),transparent_66%)] blur-2xl" />
							<Image
								src="/images/hero/hero-candle.svg"
								alt="A small glass candle glowing warmly beside the book"
								width={260}
								height={340}
								sizes="(max-width: 1024px) 22vw, 160px"
								className="h-auto w-full drop-shadow-[0_22px_24px_rgba(32,25,19,0.14)]"
							/>
						</div>

						<div className="absolute left-[28%] bottom-[3%] w-[28%] max-w-[190px] transition-transform duration-500 ease-out hover:-translate-y-0.5">
							<Image
								src="/images/hero/hero-vase.svg"
								alt="A beige ceramic vase with soft flowers and stems"
								width={360}
								height={420}
								sizes="(max-width: 1024px) 28vw, 210px"
								className="h-auto w-full drop-shadow-[0_22px_24px_rgba(32,25,19,0.12)]"
							/>
						</div>

						<div className="absolute left-[52%] top-[12%] hidden w-[16%] max-w-[108px] opacity-45 transition-opacity duration-700 lg:block">
							<Image
								src="/images/hero/hero-leaves.svg"
								alt="Botanical leaves framing the scene"
								width={240}
								height={240}
								sizes="120px"
								className="h-auto w-full"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}