import { Container } from "@/components/ui";

export function TrustBar() {
  return (
    <section className="border-b border-black/[0.04] bg-white py-10">
      <Container width="wide">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-sm font-medium tracking-widest text-[#8A837D] uppercase sm:text-[0.65rem]">
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
      </Container>
    </section>
  );
}
