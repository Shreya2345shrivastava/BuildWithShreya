export function BookFaq() {
  const faqs = [
    {
      question: "What format is the book available in?",
      answer:
        "The book is delivered as a PDF digital download that works on mobile, tablet, and desktop devices.",
    },
    {
      question: "Will I get instant access?",
      answer:
        "Yes. Once payment is completed, you'll receive immediate access to download the book.",
    },
    {
      question: "Can I print the workbook?",
      answer:
        "Absolutely. The workbook is designed to be both digital-friendly and printable.",
    },
    {
      question: "Do I get lifetime access?",
      answer:
        "Yes. After purchase, the book remains yours forever.",
    },
  ];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <span className="text-sm font-medium tracking-[0.2em] text-[var(--color-accent-peach)]">
            FAQ
          </span>

          <h2 className="mt-5 font-serif text-5xl text-[var(--color-text-primary)]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-14 space-y-5">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-[1.5rem] border border-[var(--color-border-soft)] bg-white p-6"
            >
              <h3 className="font-medium text-[var(--color-text-primary)]">
                {faq.question}
              </h3>

              <p className="mt-3 leading-relaxed text-[var(--color-text-secondary)]">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}