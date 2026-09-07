import Image from "next/image";
import { FadeIn } from "@/components/ui";

export function HeroImage() {
  return (
    <div className="relative flex justify-center lg:justify-end z-20 -mb-16 lg:mb-0">
      <FadeIn delay={0.2} direction="up" className="relative w-full lg:w-[120%] max-w-[800px]">
        <div className="group relative aspect-[3/2] w-full overflow-hidden rounded-2xl shadow-xl transition-transform duration-700 hover:-translate-y-1 hover:shadow-2xl">
          <Image
            src="/mockups/hero_book.png"
            alt="Beautiful 3D scene with a book, floating cards, and glowing lightbulb"
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-cover"
            priority
            quality={100}
          />
        </div>
      </FadeIn>
    </div>
  );
}