import { Button } from "@/components/ui";

export function HeroButtons() {
	return (
		<div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-6">
			<Button href="/books" size="lg" rounded={false} className="w-full justify-center px-7 py-[1.05rem] shadow-[0_8px_18px_rgba(201,123,99,0.16)] transition-[transform,box-shadow,background-color,color] duration-300 ease-out hover:-translate-y-[3px] hover:shadow-[0_14px_24px_rgba(201,123,99,0.2)] sm:w-auto">
				Read the Book
			</Button>
			<Button href="/newsletter" variant="secondary" size="lg" className="w-full justify-center border-[1.5px] border-[color-mix(in_srgb,var(--color-accent-peach)_92%,white)] bg-[color-mix(in_srgb,var(--color-surface-elevated)_78%,transparent)] px-7 py-[1.05rem] text-[var(--color-accent-peach)] shadow-[0_4px_14px_rgba(32,25,19,0.04)] backdrop-blur-md transition-[transform,box-shadow,background-color,color,border-color] duration-300 ease-out hover:-translate-y-[2px] hover:border-[var(--color-accent-peach)] hover:bg-[color-mix(in_srgb,var(--color-surface-elevated)_68%,rgba(217,164,143,0.1))] hover:shadow-[0_10px_18px_rgba(32,25,19,0.07)] sm:w-auto">
				Explore Resources
			</Button>
		</div>
	);
}