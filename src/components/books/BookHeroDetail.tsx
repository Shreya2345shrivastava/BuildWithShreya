import Image from "next/image";
import { Button } from "@/components/ui";

type BookHeroDetailProps = {
  title: string;
  description: string;
  price: string;
  category: string;
  cover: string;
  gumroadUrl: string;
};

export function BookHeroDetail({
  title,
  description,
  price,
  category,
  cover,
  gumroadUrl,
}: BookHeroDetailProps) {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,164,143,0.12),transparent_45%)]" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2">
        
        {/* Book Cover */}
        <div className="flex justify-center">
          <div className="group relative overflow-hidden rounded-[2rem] border border-[var(--color-border-soft)] dark:border-[#2a332d] bg-[var(--color-surface-elevated)] dark:bg-[#242b28] p-4 shadow-[0_30px_80px_rgba(32,25,19,0.10)] transition duration-500 hover:-translate-y-2">
            <Image
              src={cover}
              alt={title}
              width={500}
              height={700}
              priority
              className="h-auto w-full max-w-sm rounded-[1.5rem] object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div>
          <span className="rounded-full bg-[var(--color-accent-peach)]/10 px-4 py-2 text-sm font-medium text-[var(--color-accent-peach)]">
            {category}
          </span>

          <h1 className="mt-6 font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-[var(--color-text-primary)] sm:text-6xl">
            {title}
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
            {description}
          </p>

          <div className="mt-8 text-5xl font-bold text-[var(--color-text-primary)]">
            {price}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              href={gumroadUrl}
              size="lg"
            >
              Buy Now
            </Button>

            <div className="flex items-center gap-2 rounded-full border border-[var(--color-border-soft)] dark:border-[#2a332d] px-4 py-3 text-sm">
              ⚡ Instant Download
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-[var(--color-border-soft)] dark:border-[#2a332d] px-4 py-2 text-sm">
              PDF Format
            </span>

            <span className="rounded-full border border-[var(--color-border-soft)] dark:border-[#2a332d] px-4 py-2 text-sm">
              Lifetime Access
            </span>

            <span className="rounded-full border border-[var(--color-border-soft)] dark:border-[#2a332d] px-4 py-2 text-sm">
              Printable
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}