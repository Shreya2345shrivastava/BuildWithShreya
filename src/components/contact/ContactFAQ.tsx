const faqs = [
  {
    question: "How quickly do you respond?",
    answer:
      "Most messages receive a response within 24–48 hours.",
  },
  {
    question: "Do you accept collaborations?",
    answer:
      "Yes, I'm open to relevant partnerships and collaborations.",
  },
  {
    question: "Can I suggest resource ideas?",
    answer:
      "Absolutely. Feedback and suggestions are always welcome.",
  },
];

export function ContactFAQ() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <h2 className="font-serif text-5xl text-[var(--color-text-primary)]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-14 space-y-5">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-[1.5rem] border border-[var(--color-border-soft)] bg-white p-6"
            >
              <h3 className="font-medium">
                {faq.question}
              </h3>

              <p className="mt-3 text-[var(--color-text-secondary)]">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}