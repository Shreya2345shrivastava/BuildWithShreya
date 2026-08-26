import { Container, FadeIn } from "@/components/ui";

export function TrustBar() {
  return (
    <section className="border-b border-black/[0.04] bg-[var(--color-surface-elevated)] dark:bg-[#242b28] py-10 overflow-hidden">
      <Container width="wide">
        <FadeIn delay={0.2} duration={0.6}>
          <div className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-4 md:gap-x-12 md:gap-y-6 text-sm font-medium tracking-widest text-[var(--color-text-secondary)] uppercase sm:text-[0.65rem]">
            <div className="flex items-center gap-3">
              <span className="h-1 w-1 rounded-full bg-[var(--color-accent-peach)]"></span>
              5000+ Readers
            </div>
            <div className="flex items-center gap-3">
              <span className="h-1 w-1 rounded-full bg-[var(--color-accent-peach)]"></span>
              25+ Resources
            </div>
            <div className="flex items-center gap-3">
              <span className="h-1 w-1 rounded-full bg-[var(--color-accent-peach)]"></span>
              10+ Guides
            </div>
            <div className="flex items-center gap-3">
              <span className="h-1 w-1 rounded-full bg-[var(--color-accent-peach)]"></span>
              Weekly Newsletter
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
