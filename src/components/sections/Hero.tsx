import { Container, ParallaxBackground, BotanicalDecoration } from "@/components/ui";
import { HeroContent } from "@/components/sections/HeroContent";
import { HeroImage } from "@/components/sections/HeroImage";

export function Hero() {
  return (
    <section
      data-section="hero"
      aria-labelledby="hero-title"
      className="relative flex min-h-[85vh] items-center bg-[var(--color-bg-ivory)] dark:bg-[#131715] pt-16 pb-0 sm:pt-28 sm:pb-8 lg:pt-40 lg:pb-24 border-b border-black/[0.04] overflow-visible"
    >
      <ParallaxBackground offset={150} className="opacity-40">
        <BotanicalDecoration variant="watercolor-blob" className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] text-[#E0CDBF]" />
        <BotanicalDecoration variant="watercolor-blob" className="absolute top-[20%] -right-[20%] w-[1000px] h-[1000px] text-[#E8EDEB]" />
      </ParallaxBackground>

      <Container width="wide" className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <HeroContent />
          <HeroImage />
        </div>
      </Container>
    </section>
  );
}