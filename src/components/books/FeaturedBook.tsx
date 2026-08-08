import Image from "next/image";
import { Button } from "@/components/ui";

export function FeaturedBook() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-[3rem] border border-[var(--color-border-soft)] bg-[var(--color-surface-primary)] shadow-[0_30px_70px_rgba(32,25,19,0.08)]">
          <div className="grid items-center gap-12 p-10 lg:grid-cols-2 lg:p-16">
            <div>
              <span className="text-sm tracking-[0.2em] text-[var(--color-accent-peach)]">
                FEATURED BOOK
              </span>

              <h2 className="mt-5 font-serif text-5xl leading-tight text-[var(--color-text-primary)]">
                Dream Life Workbook
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
                Design your ideal future, create meaningful goals,
                and build habits that move your life forward.
              </p>

              <ul className="mt-8 space-y-3 text-[var(--color-text-secondary)]">
                <li>✓ Goal Planning</li>
                <li>✓ Life Vision Exercises</li>
                <li>✓ Habit Tracking</li>
                <li>✓ Reflection Prompts</li>
              </ul>

              <div className="mt-10">
                <Button href="/books/dream-life-workbook">
                  View Book
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <Image
                src="/images/books/dream-life.jpg"
                alt="Dream Life Workbook"
                width={450}
                height={600}
                className="rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}