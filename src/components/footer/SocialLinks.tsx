export function SocialLinks() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <a
        href="https://www.instagram.com/build.withshreya"
        target="_blank"
        rel="noopener noreferrer"
        className="
          rounded-full
          border border-[var(--color-border-soft)] dark:border-[#2a332d]
          px-4 py-2
          text-sm
          text-[var(--color-text-secondary)]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-[var(--color-accent-peach)]
          hover:text-[var(--color-accent-peach)]
        "
      >
        Instagram
      </a>

      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="
          rounded-full
          border border-[var(--color-border-soft)] dark:border-[#2a332d]
          px-4 py-2
          text-sm
          text-[var(--color-text-secondary)]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-[var(--color-accent-peach)]
          hover:text-[var(--color-accent-peach)]
        "
      >
        YouTube
      </a>

      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="
          rounded-full
          border border-[var(--color-border-soft)] dark:border-[#2a332d]
          px-4 py-2
          text-sm
          text-[var(--color-text-secondary)]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-[var(--color-accent-peach)]
          hover:text-[var(--color-accent-peach)]
        "
      >
        Pinterest
      </a>
    </div>
  );
}