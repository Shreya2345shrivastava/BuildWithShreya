export function ContactForm() {
  return (
    <section className="pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="rounded-[2rem] border border-[var(--color-border-soft)] bg-white p-10">
          <h2 className="font-serif text-5xl text-[var(--color-text-primary)]">
            Send a Message
          </h2>

          <form
            action="https://formspree.io/f/xkjwobve"
            method="POST"
            className="mt-10 space-y-5"
          >
            <input
              type="text"
              name="name"
              required
              placeholder="Your Name"
              className="w-full rounded-xl border border-[var(--color-border-soft)] px-5 py-4 outline-none"
            />

            <input
              type="email"
              name="email"
              required
              placeholder="Your Email"
              className="w-full rounded-xl border border-[var(--color-border-soft)] px-5 py-4 outline-none"
            />

            <textarea
              name="message"
              required
              rows={6}
              placeholder="Your Message"
              className="w-full rounded-xl border border-[var(--color-border-soft)] px-5 py-4 outline-none"
            />

            <button
              type="submit"
              className="rounded-full bg-[var(--color-accent-peach)] px-8 py-4 font-medium text-white transition hover:opacity-90"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}