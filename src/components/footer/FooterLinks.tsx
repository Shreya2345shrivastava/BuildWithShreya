import Link from "next/link";

export function FooterLinks() {
  return (
    <div className="grid gap-10 sm:grid-cols-3">
      <div>
        <h4 className="mb-4 text-xs font-semibold tracking-widest text-[var(--color-text-primary)] uppercase">
          Quick Links
        </h4>

        <ul className="space-y-3 text-sm text-[var(--color-text-secondary)]">
          <li>
            <Link href="/" className="transition-colors hover:text-[var(--color-accent-peach)]">Home</Link>
          </li>
          <li>
            <Link href="/books" className="transition-colors hover:text-[var(--color-accent-peach)]">Books</Link>
          </li>
          <li>
            <Link href="/resources" className="transition-colors hover:text-[var(--color-accent-peach)]">Resources</Link>
          </li>
          <li>
            <Link href="/#author" className="transition-colors hover:text-[var(--color-accent-peach)]">About</Link>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="mb-4 text-xs font-semibold tracking-widest text-[var(--color-text-primary)] uppercase">
          Resources
        </h4>

        <ul className="space-y-3 text-sm text-[var(--color-text-secondary)]">
          <li>
            <Link href="/#newsletter" className="transition-colors hover:text-[var(--color-accent-peach)]">Newsletter</Link>
          </li>
          <li>
            <Link href="/blog" className="transition-colors hover:text-[var(--color-accent-peach)]">Blog</Link>
          </li>
          <li>
            <Link href="/books" className="transition-colors hover:text-[var(--color-accent-peach)]">Workbook</Link>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="mb-4 text-xs font-semibold tracking-widest text-[var(--color-text-primary)] uppercase">
          Connect
        </h4>

        <ul className="space-y-3 text-sm text-[var(--color-text-secondary)]">
          <li className="break-all">
            <a href="mailto:hello@buildwithshreya.com" className="transition-colors hover:text-[var(--color-accent-peach)]">hello@buildwithshreya.com</a>
          </li>
          <li>India 🇮🇳</li>
        </ul>
      </div>
    </div>
  );
}