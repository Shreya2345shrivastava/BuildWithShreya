import Link from "next/link";

type ResourceCardProps = {
  slug: string;
  title: string;
  description: string;
  type: string;
  price: string;
  featured?: boolean;
};

export function ResourceCard({
  slug,
  title,
  description,
  type,
  price,
  featured,
}: ResourceCardProps) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-[var(--color-border-soft)] bg-white shadow-[0_15px_40px_rgba(32,25,19,0.05)] transition duration-300 hover:-translate-y-2">
      <div className="aspect-[4/3] bg-[var(--color-bg-peach-tint)]" />

      <div className="p-6">
        {featured && (
          <span className="rounded-full bg-[var(--color-accent-peach)] px-4 py-1 text-xs font-medium text-white">
            Featured
          </span>
        )}

        <p className="mt-4 text-sm uppercase tracking-[0.12em] text-[var(--color-accent-peach)]">
          {type}
        </p>

        <h3 className="mt-3 font-serif text-3xl text-[var(--color-text-primary)]">
          {title}
        </h3>

        <p className="mt-4 leading-relaxed text-[var(--color-text-secondary)]">
          {description}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-xl font-semibold text-[var(--color-text-primary)]">
            {price}
          </span>

          <Link
            href={`/resources/${slug}`}
            className="rounded-full bg-[var(--color-accent-peach)] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            View Resource
          </Link>
        </div>
      </div>
    </article>
  );
}