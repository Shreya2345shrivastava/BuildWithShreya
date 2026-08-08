type ResourceHeroDetailProps = {
  title: string;
  description: string;
  price: string;
  type: string;
};

export function ResourceHeroDetail({
  title,
  description,
  price,
  type,
}: ResourceHeroDetailProps) {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <span className="rounded-full bg-[var(--color-accent-peach)]/10 px-4 py-2 text-sm font-medium text-[var(--color-accent-peach)]">
          {type}
        </span>

        <h1 className="mt-6 font-serif text-6xl text-[var(--color-text-primary)]">
          {title}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
          {description}
        </p>

        <div className="mt-8 text-5xl font-bold text-[var(--color-text-primary)]">
          {price}
        </div>
      </div>
    </section>
  );
}