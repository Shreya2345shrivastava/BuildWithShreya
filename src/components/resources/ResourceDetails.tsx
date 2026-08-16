type ResourceDetailsProps = {
  pages: number;
  format: string;
  type: string;
};

export function ResourceDetails({
  pages,
  format,
  type,
}: ResourceDetailsProps) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-[var(--color-border-soft)] dark:border-[#2a332d] p-8 text-center">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Pages
            </p>

            <h3 className="mt-2 text-4xl font-bold">
              {pages}
            </h3>
          </div>

          <div className="rounded-3xl border border-[var(--color-border-soft)] dark:border-[#2a332d] p-8 text-center">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Format
            </p>

            <h3 className="mt-2 text-4xl font-bold">
              {format}
            </h3>
          </div>

          <div className="rounded-3xl border border-[var(--color-border-soft)] dark:border-[#2a332d] p-8 text-center">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Type
            </p>

            <h3 className="mt-2 text-4xl font-bold">
              {type}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}