export function FooterLinks() {
  return (
    <div className="grid gap-10 sm:grid-cols-3">
      <div>
        <h4 className="mb-4 text-lg font-semibold text-[var(--color-text-primary)]">
          Navigation
        </h4>

        <ul className="space-y-3 text-[var(--color-text-secondary)]">
          <li className="transition-colors hover:text-[var(--color-accent-peach)]">
            Home
          </li>
          <li className="transition-colors hover:text-[var(--color-accent-peach)]">
            Books
          </li>
          <li className="transition-colors hover:text-[var(--color-accent-peach)]">
            Resources
          </li>
          <li className="transition-colors hover:text-[var(--color-accent-peach)]">
            About
          </li>
        </ul>
      </div>

      <div>
        <h4 className="mb-4 text-lg font-semibold text-[var(--color-text-primary)]">
          Resources
        </h4>

        <ul className="space-y-3 text-[var(--color-text-secondary)]">
          <li className="transition-colors hover:text-[var(--color-accent-peach)]">
            Newsletter
          </li>
          <li className="transition-colors hover:text-[var(--color-accent-peach)]">
            Blog
          </li>
          <li className="transition-colors hover:text-[var(--color-accent-peach)]">
            Workbook
          </li>
        </ul>
      </div>

      <div>
        <h4 className="mb-4 text-lg font-semibold text-[var(--color-text-primary)]">
          Contact
        </h4>

        <ul className="space-y-3 text-[var(--color-text-secondary)]">
          <li className="break-all">
            hello@buildwithshreya.com
          </li>

          <li>India 🇮🇳</li>
        </ul>
      </div>
    </div>
  );
}