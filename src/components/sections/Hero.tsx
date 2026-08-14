import { Container } from "@/components/ui";
import { HeroContent } from "@/components/sections/HeroContent";
import { HeroImage } from "@/components/sections/HeroImage";

export function Hero() {
  return (
    <section
      data-section="hero"
      aria-labelledby="hero-title"
      className="relative flex min-h-[85vh] items-center bg-[var(--color-bg-ivory)] pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 border-b border-black/[0.04]"
    >
      <Container width="wide">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8 animate-in fade-in duration-1000">
          <HeroContent />
          <HeroImage />
        </div>
      </Container>
    </section>
  );
}