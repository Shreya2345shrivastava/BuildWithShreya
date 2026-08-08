import { Button } from "@/components/ui";

export function HeroButtons() {
  return (
    <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-6">
      <Button
        href="/books"
        size="lg"
        rounded={false}
        className="
          w-full justify-center
          px-8 py-[1.05rem]
          shadow-[0_12px_28px_rgba(217,164,143,0.25)]
          transition-all duration-300 ease-out
          hover:-translate-y-1
          hover:scale-[1.02]
          hover:shadow-[0_18px_40px_rgba(217,164,143,0.32)]
          sm:w-auto
        "
      >
        Read the Book
      </Button>

      <Button
        href="/newsletter"
        variant="secondary"
        size="lg"
        className="
          w-full justify-center
          border-[1.5px]
          border-[color-mix(in_srgb,var(--color-accent-peach)_92%,white)]
          bg-[color-mix(in_srgb,var(--color-surface-elevated)_78%,transparent)]
          px-8 py-[1.05rem]
          text-[var(--color-accent-peach)]
          shadow-[0_6px_16px_rgba(32,25,19,0.05)]
          backdrop-blur-md
          transition-all duration-300 ease-out
          hover:-translate-y-1
          hover:scale-[1.02]
          hover:border-[var(--color-accent-peach)]
          hover:bg-[color-mix(in_srgb,var(--color-surface-elevated)_68%,rgba(217,164,143,0.1))]
          hover:shadow-[0_12px_24px_rgba(32,25,19,0.08)]
          sm:w-auto
        "
      >
        Explore Resources
      </Button>
    </div>
  );
}