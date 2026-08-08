import { NewsletterForm } from "./NewsletterForm";

export function NewsletterSignup() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-serif text-5xl text-[var(--color-text-primary)]">
          Join The Newsletter
        </h2>

        <p className="mt-6 text-lg text-[var(--color-text-secondary)]">
          Get practical growth strategies and curated resources every week.
        </p>

        <NewsletterForm />
      </div>
    </section>
  );
}