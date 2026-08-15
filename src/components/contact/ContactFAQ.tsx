
const faqs = [
  {
    question: "How quickly do you respond?",
    answer: "Most messages receive a response within 24–48 hours during business days.",
  },
  {
    question: "Do you accept collaborations?",
    answer: "Yes, I am always open to relevant partnerships, podcast features, and brand collaborations.",
  },
  {
    question: "Can I suggest resource ideas?",
    answer: "Absolutely! I actively build resources based on community feedback and suggestions.",
  },
];

export function ContactFAQ() {
  return (
    <section className="py-24 bg-[var(--color-bg-ivory)] dark:bg-[#0F1211] transition-colors duration-300">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl text-[var(--color-text-primary)] dark:text-white">
            Common Questions
          </h2>
        </div>

        <div className="grid gap-6">
          {faqs.map((faq, idx) => (
            <div
              key={faq.question}
              className="group relative overflow-hidden rounded-3xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5 p-8 transition-all hover:-translate-y-1 hover:shadow-xl hover:bg-white dark:hover:bg-white/10 backdrop-blur-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-peach)]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-4">
                <span className="text-sm font-medium tracking-widest text-[var(--color-accent-peach)]/50 transition-colors group-hover:text-[var(--color-accent-peach)] mt-1">
                  0{idx + 1}
                </span>
                <div>
                  <h3 className="font-serif text-2xl text-[var(--color-text-primary)] dark:text-white transition-colors group-hover:text-[var(--color-accent-peach)]">
                    {faq.question}
                  </h3>
                  <p className="mt-4 text-[var(--color-text-secondary)] dark:text-white/60 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}