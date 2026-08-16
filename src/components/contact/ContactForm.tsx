export function ContactForm() {
  return (
    <section className="pb-32 bg-[var(--color-bg-ivory)] dark:bg-[#131715] dark:bg-[#0F1211] transition-colors duration-300">
      <div className="mx-auto max-w-4xl px-6">
        <div className="py-16">
          <div className="mb-16">
            <h2 className="font-serif text-5xl sm:text-6xl text-[var(--color-text-primary)] dark:text-white">
              Send a Message
            </h2>
            <p className="mt-6 text-xl text-[var(--color-text-secondary)] dark:text-white/60 max-w-xl">
              Whether you have a question, a collaboration idea, or just want to say hello—I'm all ears.
            </p>
          </div>

          <form
            action="https://formspree.io/f/xkjwobve"
            method="POST"
            className="space-y-12"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="peer w-full bg-transparent border-0 border-b-2 border-black/10 dark:border-white/10 px-0 py-4 text-xl text-[var(--color-text-primary)] dark:text-white placeholder-transparent outline-none transition-all focus:border-[var(--color-accent-peach)] focus:ring-0"
                />
                <label className="absolute left-0 -top-6 text-sm tracking-widest text-[var(--color-text-secondary)] dark:text-white/40 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-xl peer-placeholder-shown:tracking-normal peer-focus:-top-6 peer-focus:text-sm peer-focus:tracking-widest peer-focus:text-[var(--color-accent-peach)] uppercase">
                  Your Name
                </label>
              </div>

              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your Email"
                  className="peer w-full bg-transparent border-0 border-b-2 border-black/10 dark:border-white/10 px-0 py-4 text-xl text-[var(--color-text-primary)] dark:text-white placeholder-transparent outline-none transition-all focus:border-[var(--color-accent-peach)] focus:ring-0"
                />
                <label className="absolute left-0 -top-6 text-sm tracking-widest text-[var(--color-text-secondary)] dark:text-white/40 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-xl peer-placeholder-shown:tracking-normal peer-focus:-top-6 peer-focus:text-sm peer-focus:tracking-widest peer-focus:text-[var(--color-accent-peach)] uppercase">
                  Your Email
                </label>
              </div>
            </div>

            <div className="relative group mt-16">
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Your Message..."
                className="peer w-full bg-transparent border-0 border-b-2 border-black/10 dark:border-white/10 px-0 py-4 text-xl text-[var(--color-text-primary)] dark:text-white placeholder-transparent outline-none transition-all focus:border-[var(--color-accent-peach)] focus:ring-0 resize-none"
              />
              <label className="absolute left-0 -top-6 text-sm tracking-widest text-[var(--color-text-secondary)] dark:text-white/40 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-xl peer-placeholder-shown:tracking-normal peer-focus:-top-6 peer-focus:text-sm peer-focus:tracking-widest peer-focus:text-[var(--color-accent-peach)] uppercase">
                Your Message
              </label>
            </div>

            <div className="pt-8 text-right">
              <button
                type="submit"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-transparent border border-black/20 dark:border-white/20 px-12 py-5 font-semibold text-[var(--color-text-primary)] dark:text-white transition-all duration-300 hover:border-[var(--color-accent-peach)] hover:text-white"
              >
                <span className="relative z-10 uppercase tracking-widest">Send Message</span>
                <div className="absolute inset-0 h-full w-0 bg-[var(--color-accent-peach)] transition-all duration-500 ease-out group-hover:w-full" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}