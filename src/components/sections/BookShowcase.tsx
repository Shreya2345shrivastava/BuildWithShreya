import Image from "next/image";
import Link from "next/link";
import { Container, Book3D, FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui";
import { Check } from "lucide-react";

export default function BookShowcase() {
  return (
    <section id="featured-book" aria-labelledby="book-showcase-title" className="border-t border-black/[0.04] bg-[var(--color-bg-ivory)] dark:bg-[#131715] py-20 sm:py-28 lg:py-32">
      <Container width="wide">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          
          {/* Left: Book Mockup */}
          <FadeIn direction="left" className="order-2 lg:order-1 flex justify-center lg:justify-end perspective-1000">
            <Book3D 
              coverUrl="/images/books/book-cover.jpeg"
              title="First Build It, Then Make It Beautiful"
              className="w-full max-w-[400px] lg:max-w-[450px]"
            />
          </FadeIn>

          {/* Right: Content */}
          <FadeInStagger className="order-1 lg:order-2 flex flex-col justify-center">
            <FadeInStaggerItem>
              <h2 id="book-showcase-title" className="font-serif text-4xl leading-[1.1] tracking-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
                First Build It, <br />
                <span className="font-display italic text-[var(--color-accent-peach)]">Then Make It Beautiful</span>
              </h2>
            </FadeInStaggerItem>
            
            <FadeInStaggerItem>
              <p className="mt-4 text-xs font-semibold tracking-widest text-[var(--color-text-secondary)] uppercase">
                A gentle guide for creators, dreamers & doers.
              </p>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <p className="mt-6 max-w-[480px] text-lg leading-relaxed text-[var(--color-text-secondary)]">
                This book will help you move from overthinking to action, from waiting to building, and from surviving to creating a life you&apos;re proud of.
              </p>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <ul className="mt-8 space-y-4">
                {[
                  "Practical guidance",
                  "Reflection exercises",
                  "Habit systems",
                  "Creator mindset"
                ].map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-peach)]/10 text-[var(--color-accent-peach)]">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </FadeInStaggerItem>

            <FadeInStaggerItem>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link 
                  href="/books" 
                  className="inline-flex justify-center rounded-full bg-[var(--color-accent-peach)] px-8 py-3.5 text-sm font-bold !text-black dark:!text-black shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-peach)] focus:ring-offset-2"
                >
                  Buy Now 🛒
                </Link>
                <Link 
                  href="/sample" 
                  className="inline-flex justify-center rounded-full border-2 border-[var(--color-accent-peach)]/20 bg-transparent px-8 py-3.5 text-sm font-medium text-[var(--color-accent-peach)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-accent-peach)] hover:bg-[var(--color-accent-peach)]/5 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-peach)] focus:ring-offset-2"
                >
                  Read a Free Sample 🌿
                </Link>
              </div>
            </FadeInStaggerItem>
          </FadeInStagger>
        </div>
      </Container>
    </section>
  );
}
