import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";

export default function Home() {
	return (
		<>
			<Navbar />
			<main className="bg-[var(--color-bg-ivory)] text-[var(--color-text-primary)]">
				<Hero />
				<Features />
			</main>
		</>
	);
}
