import Image from "next/image";
import { Container, FadeIn, FadeInStagger, FadeInStaggerItem, ParallaxBackground, BotanicalDecoration } from "@/components/ui";

export function AuthorSection() {
  return (
    <section id="author" className="relative border-t border-black/[0.04] bg-[var(--color-bg-ivory)] py-20 sm:py-28 lg:py-32 overflow-hidden">
      <ParallaxBackground offset={100} className="opacity-40 mix-blend-multiply">
        <BotanicalDecoration variant="watercolor-blob" className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] text-[#F9E5D9]" />
      </ParallaxBackground>

      <Container width="wide" className="relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px] lg:gap-16 xl:gap-24">

          {/* Left: Author Profile */}
          <FadeInStagger className="flex flex-col sm:flex-row gap-8 sm:gap-12">
            <FadeInStaggerItem className="shrink-0">
              <div className="relative aspect-[3/4] w-48 overflow-hidden rounded-[2rem] sm:rounded-t-full sm:w-56 shadow-sm border border-[var(--color-border-soft)]">
                <Image
                  src="/images/authors/Author.jpeg"
                  alt="Shreya portrait"
                  fill
                  sizes="224px"
                  className="object-cover"
                />
              </div>
              </FadeInStaggerItem>
            <div className="flex flex-col justify-center">
              <FadeInStaggerItem>
                <h2 className="font-serif text-3xl font-medium tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
                  Hi, I&apos;m Shreya.
                </h2>
              </FadeInStaggerItem>
              <FadeInStaggerItem>
                <div className="mt-5 flex items-center gap-2 text-[var(--color-accent-peach)]/60">
                  <span className="h-1 w-1 rounded-full bg-current"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                  <span className="h-1 w-1 rounded-full bg-current"></span>
                  <div className="ml-2 h-px w-12 bg-[var(--color-accent-peach)]/20"></div>
                </div>
              </FadeInStaggerItem>
              <FadeInStaggerItem>
                <p className="mt-6 max-w-sm text-base leading-relaxed text-[var(--color-text-secondary)]">
                  I believe beautiful lives aren&apos;t found. They&apos;re built—one small step at a time. Through my books and resources, I hope to walk beside you as you build your dream and make it beautifully yours.
                </p>
              </FadeInStaggerItem>
              <FadeInStaggerItem>
                <div className="mt-10 flex flex-col">
                  <span className="font-serif text-4xl italic tracking-wide text-[var(--color-accent-peach)]">
                    Shreya Shrivastava
                  </span>
                </div>
              </FadeInStaggerItem>
            </div>
          </FadeInStagger>

          {/* Right: Newsletter Card */}
          <FadeIn delay={0.2} direction="up" className="flex flex-col justify-center rounded-[2rem] border border-[var(--color-border-soft)] bg-white p-8 shadow-sm sm:p-10">
            <h3 className="font-serif text-2xl font-medium text-[var(--color-text-primary)]">
              Build with me.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Receive thoughtful emails, free resources, and first access to new releases.
            </p>

            <form action="https://formspree.io/f/xkjwobve" method="POST" className="mt-8 flex flex-col gap-3">
              <input
                type="email"
                name="email"
                required
                placeholder="Your email address"
                className="w-full rounded-full border border-[var(--color-border-soft)] bg-[#FCF8F2]/50 px-5 py-3.5 text-sm outline-none transition-colors focus:border-[var(--color-accent-peach)] focus:bg-white"
              />
              <button
                type="submit"
                className="w-full rounded-full bg-[var(--color-accent-peach)] px-5 py-3.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-peach)] focus:ring-offset-2"
              >
                Join Free 🌿
              </button>
            </form>
          </FadeIn>

        </div>
      </Container>
    </section>
  );
}