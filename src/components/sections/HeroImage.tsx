import Image from "next/image";
import { FadeIn } from "@/components/ui";

export function HeroImage() {
  return (
    <div className="relative flex justify-center lg:justify-end z-20 -mb-16 lg:mb-0">
      <FadeIn delay={0.2} direction="up" className="relative w-full max-w-[640px]">
        <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl transition-transform duration-700 hover:-translate-y-1 hover:shadow-2xl">
          <Image
            src="/mockups/hero_book.jpg"
            alt="Premium book and candle on an elegant wooden desk"
            fill
            sizes="(max-width: 1024px) 100vw, 640px"
            className="object-cover"
            priority
          />
          {/* Extremely subtle overlay to soften the image slightly for the editorial vibe */}
          <div className="absolute inset-0 bg-[var(--color-bg-ivory)] dark:bg-[#131715] mix-blend-color opacity-10 transition-opacity duration-700 group-hover:opacity-0" />
        </div>
      </FadeIn>
    </div>
  );
}