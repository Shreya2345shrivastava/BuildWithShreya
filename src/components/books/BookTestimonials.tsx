export function BookTestimonials() {
  const testimonials = [
    {
      name: "Aarav",
      text: "This workbook helped me finally organize my goals and create a realistic action plan.",
    },
    {
      name: "Priya",
      text: "Beautiful design and practical exercises. I completed it in one weekend.",
    },
    {
      name: "Riya",
      text: "The reflection prompts completely changed how I think about personal growth.",
    },
  ];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="text-sm font-medium tracking-[0.2em] text-[var(--color-accent-peach)]">
            TESTIMONIALS
          </span>

          <h2 className="mt-5 font-serif text-5xl text-[var(--color-text-primary)]">
            What Readers Say
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-[2rem] border border-[var(--color-border-soft)] bg-white p-8"
            >
              <p className="leading-relaxed text-[var(--color-text-secondary)]">
                "{item.text}"
              </p>

              <p className="mt-6 font-medium text-[var(--color-text-primary)]">
                — {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}