import Image from "next/image";
import { NewsletterForm } from "./NewsletterForm";

export function Newsletter() {
  return (
    <section
      id="newsletter"
      className="relative overflow-hidden py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-[var(--color-border-soft)] bg-[var(--color-bg-cream)] px-8 py-16 text-center shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:px-12 lg:px-20">

          {/* Left Floral */}
          <div className="pointer-events-none absolute left-0 top-0 opacity-20">
            <Image
              src="/images/hero/hero-leaves.svg"
              alt=""
              aria-hidden="true"
              width={220}
              height={220}
            />
          </div>

          {/* Right Floral */}
          <div className="pointer-events-none absolute bottom-0 right-0 opacity-20">
            <Image
              src="/images/hero/hero-leaves.svg"
              alt=""
              aria-hidden="true"
              width={220}
              height={220}
              className="scale-x-[-1]"
            />
          </div>

          <span className="text-label text-[var(--color-accent-peach)]">
            NEWSLETTER
          </span>

          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[var(--color-text-primary)] md:text-5xl">
            Join the Journey 💌
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
            Get inspiration, productivity insights, creator tips, and updates
            about new books delivered straight to your inbox.
          </p>

          <div className="flex justify-center">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}