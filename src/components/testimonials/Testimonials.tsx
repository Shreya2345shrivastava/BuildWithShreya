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
      className="border-t border-black/[0.04] bg-white py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-16 flex flex-col items-center text-center">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            Loved by Readers
          </h2>
          <div className="mt-6 flex items-center justify-center gap-2 text-[var(--color-accent-peach)]/60">
            <div className="mr-2 h-px w-12 bg-[var(--color-accent-peach)]/20"></div>
            <span className="h-1 w-1 rounded-full bg-current"></span>
            <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
            <span className="h-1 w-1 rounded-full bg-current"></span>
            <div className="ml-2 h-px w-12 bg-[var(--color-accent-peach)]/20"></div>
          </div>
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

      </div>
    </section>
  );
}