type BookDetailsProps = {
  pages: number;
  format: string;
  category: string;
};

export function BookDetails({
  pages,
  format,
  category,
}: BookDetailsProps) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-[var(--color-border-soft)] dark:border-[#2a332d] bg-[var(--color-surface-elevated)] dark:bg-[#242b28] p-8 text-center">
            <div className="text-4xl font-serif">{pages}</div>
            <p className="mt-2 text-[var(--color-text-secondary)]">
              Pages
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-[var(--color-border-soft)] dark:border-[#2a332d] bg-[var(--color-surface-elevated)] dark:bg-[#242b28] p-8 text-center">
            <div className="text-4xl font-serif">{format}</div>
            <p className="mt-2 text-[var(--color-text-secondary)]">
              Format
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-[var(--color-border-soft)] dark:border-[#2a332d] bg-[var(--color-surface-elevated)] dark:bg-[#242b28] p-8 text-center">
            <div className="text-4xl font-serif">{category}</div>
            <p className="mt-2 text-[var(--color-text-secondary)]">
              Type
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}