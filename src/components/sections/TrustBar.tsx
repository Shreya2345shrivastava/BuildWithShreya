import { Container, FadeIn } from "@/components/ui";

export function TrustBar() {
  return (
    <section className="relative z-20 w-full">
      <Container width="wide" className="flex justify-center px-0">
        <FadeIn delay={0.3} duration={0.6}>
          <div className="bg-[var(--color-surface-elevated)] dark:bg-[#242b28]/80 backdrop-blur-md rounded-full shadow-lg border border-[var(--color-border-soft)] dark:border-[#2a332d] px-8 py-4 flex items-center justify-center gap-4">
            
            {/* Optional Avatar Cluster (Simulated with simple overlapping circles) */}
            <div className="hidden sm:flex -space-x-2 mr-2">
              <div className="w-6 h-6 rounded-full bg-[var(--color-accent-peach)] border border-white dark:border-[#131715] flex items-center justify-center text-[10px] font-bold text-white">S</div>
              <div className="w-6 h-6 rounded-full bg-[#E8DACB] border border-white dark:border-[#131715] flex items-center justify-center text-[10px] font-bold text-black/60">C</div>
              <div className="w-6 h-6 rounded-full bg-[#D4C3B3] border border-white dark:border-[#131715] flex items-center justify-center text-[10px] font-bold text-black/60">F</div>
            </div>

            <p className="text-sm font-medium text-[var(--color-text-secondary)]">
              Helping creators, students, founders, and dreamers bring ideas to life.
            </p>

          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
