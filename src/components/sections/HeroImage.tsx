import Image from "next/image";

export function HeroImage() {
  return (
    <div className="relative flex justify-center lg:justify-end">
      <div className="relative w-full max-w-[640px] opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-forwards delay-200">
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
          <div className="absolute inset-0 bg-[var(--color-bg-ivory)] mix-blend-color opacity-10 transition-opacity duration-700 group-hover:opacity-0" />
        </div>
      </div>
    </div>
  );
}