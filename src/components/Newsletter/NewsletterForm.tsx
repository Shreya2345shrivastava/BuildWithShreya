"use client";

export function NewsletterForm() {
  return (
    <form className="mt-8 flex w-full max-w-xl flex-col gap-4 sm:flex-row">
      <input
        type="email"
        placeholder="Enter your email"
        className="h-14 flex-1 rounded-full border border-[var(--color-border-soft)] bg-white px-6 text-[var(--color-text-primary)] outline-none transition-all focus:border-[var(--color-accent-peach)]"
      />

      <button
        type="submit"
        className="h-14 rounded-full bg-[var(--color-accent-peach)] px-8 font-medium text-white transition-all hover:-translate-y-0.5"
      >
        Join Now
      </button>
    </form>
  );
}