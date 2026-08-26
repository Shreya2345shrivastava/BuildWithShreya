import Link from "next/link";
import { Container, PrimaryButton, FadeIn } from "@/components/ui";
import { BookOpen } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-bg-ivory)] dark:bg-[#131715] py-24 sm:py-32 border-t border-black/[0.04]">
      {/* Premium Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-accent-peach)]/10 dark:bg-[var(--color-accent-peach)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E0CDBF]/20 dark:bg-[#2A332D]/40 rounded-full blur-[100px] pointer-events-none" />

      <Container className="relative z-10 text-center flex flex-col items-center">
        <FadeIn direction="up">
          <h2 className="font-serif text-[clamp(2.5rem,6vw,4rem)] text-[var(--color-text-primary)] leading-[1.1] mb-6">
            Ready to build <br className="hidden sm:block" />
            <span className="italic text-[var(--color-accent-peach)]">your dream?</span>
          </h2>
          <p className="max-w-lg mx-auto text-lg sm:text-xl text-[var(--color-text-secondary)] mb-10 leading-relaxed font-light">
            Stop waiting for the perfect moment. Get the exact frameworks, templates, and guidance you need to start building today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link href="/books/first-build-it-then-make-it-beautiful" className="w-full sm:w-auto">
              <PrimaryButton size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow bg-[#3A332D] text-white hover:bg-[var(--color-accent-peach)] px-10 py-4 text-base border-none">
                Get The Book
              </PrimaryButton>
            </Link>
            <Link href="/sample" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-4 text-base font-bold tracking-wide text-[var(--color-text-primary)] border border-[var(--color-border-soft)] dark:border-[#2a332d] bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 rounded-full transition-all">
                <BookOpen size={18} />
                Read Free Sample
              </button>
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
