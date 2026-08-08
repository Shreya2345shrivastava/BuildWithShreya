export function NewsletterPreview() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="rounded-[2rem] border border-[var(--color-border-soft)] bg-white p-10">
          <span className="text-sm tracking-[0.15em] text-[var(--color-accent-peach)]">
            SAMPLE ISSUE
          </span>

          <h2 className="mt-5 font-serif text-4xl text-[var(--color-text-primary)]">
            This Week's Newsletter
          </h2>

          <ul className="mt-8 space-y-4 text-[var(--color-text-secondary)]">
            <li>📌 3 Productivity Lessons</li>
            <li>📌 Best Resources of the Week</li>
            <li>📌 Career Growth Insights</li>
            <li>📌 Actionable Weekly Challenge</li>
          </ul>
        </div>
      </div>
    </section>
  );
}