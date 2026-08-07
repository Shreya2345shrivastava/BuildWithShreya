import { Button, Divider, Section } from "@/components/ui";
import { Navbar } from "@/components/layout/Navbar";

const foundationLines = [
	"Design System ✓",
	"UI Components ✓",
	"Homepage Coming Soon",
];

export default function Home() {
	return (
		<>
			<Navbar />
			<main className="bg-[var(--color-bg-ivory)] pt-28 text-[var(--color-text-primary)] sm:pt-32">
				<Section
					background="cream"
					spacing="4xl"
					alignment="center"
					containerWidth="narrow"
					title="BuildWithShreya"
					description="Foundation Complete"
					divider
					smallBotanicalOrnament
				>
					<div className="flex flex-col items-center gap-8">
						<div className="w-full rounded-[var(--radius-xl)] border border-[var(--color-border-soft)] bg-[var(--color-surface-primary)] p-6 shadow-[var(--shadow-card)] sm:p-8">
							<div className="flex flex-col gap-4">
								{foundationLines.map((line, index) => (
									<div key={line} className="space-y-4">
										<p className={index === 0 ? "text-editorial-h3" : "text-body-large text-[var(--color-text-secondary)]"}>{line}</p>
										{index < foundationLines.length - 1 ? <Divider variant={index === 0 ? "botanical" : "centered"} /> : null}
									</div>
								))}
							</div>
						</div>

						<div className="flex flex-col gap-3 sm:flex-row">
							<Button href="#" variant="primary" size="md">
								Foundation Ready
							</Button>
							<Button href="#" variant="outline" size="md">
								Phase 5 Next
							</Button>
						</div>
					</div>
				</Section>
			</main>
		</>
	);
}
