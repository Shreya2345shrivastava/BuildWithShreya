import { TestimonialCard } from "./TestimonialCard";

const testimonials = [
  {
    name: "Priya Sharma",
    review:
      "This workbook helped me turn ideas into action and stay consistent every week.",
  },
  {
    name: "Aman Verma",
    review:
      "Beautifully designed and incredibly practical. Every page feels intentional.",
  },
  {
    name: "Neha Gupta",
    review:
      "One of the most inspiring productivity workbooks I've used this year.",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-24 sm:py-28 lg:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,164,143,0.08),transparent_45%)]" />

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="text-label text-[var(--color-accent-peach)]">
            TESTIMONIALS
          </span>

          <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl text-[var(--color-text-primary)]">
            Reader Reviews ⭐
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
            Discover how creators, students, and dreamers are using this
            workbook to build better habits, stay consistent, and bring ideas
            to life.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item) => (
            <TestimonialCard
              key={item.name}
              name={item.name}
              review={item.review}
            />
          ))}
        </div>

        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-soft)] bg-white px-5 py-3 shadow-sm">
            <span className="text-[var(--color-accent-peach)]">
              ★★★★★
            </span>

            <span className="text-sm text-[var(--color-text-secondary)]">
              Rated 4.9/5 by early readers
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}