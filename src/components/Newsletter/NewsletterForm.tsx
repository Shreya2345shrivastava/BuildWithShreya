export function NewsletterForm() {
  return (
    <form
      action="https://formspree.io/f/xkjwobve"
      method="POST"
      className="mt-8 flex flex-col gap-4 sm:flex-row"
    >
      <input
        type="email"
        name="email"
        required
        placeholder="Enter your email"
        className="flex-1 rounded-full border border-[var(--color-border-soft)] px-6 py-4 outline-none"
      />

      <button
        type="submit"
        className="rounded-full bg-[var(--color-accent-peach)] px-8 py-4 font-medium text-white"
      >
        Subscribe
      </button>
    </form>
  );
}