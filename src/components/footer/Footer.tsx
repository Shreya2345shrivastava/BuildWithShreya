import { FooterLinks } from "./FooterLinks";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-soft)] dark:border-[#2a332d] bg-[var(--color-bg-ivory)] dark:bg-[#131715]">
      <div className="mx-auto w-full max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <h2 className="font-serif text-4xl text-[var(--color-text-primary)]">
              BuildWithShreya
            </h2>

            <p className="mt-5 max-w-md leading-relaxed text-[var(--color-text-secondary)]">
              Helping creators, students, and dreamers transform
              ideas into meaningful projects with clarity,
              consistency, and confidence.
            </p>

            <div className="mt-8">
              <SocialLinks />
            </div>
          </div>

          <FooterLinks />
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[var(--color-border-soft)] dark:border-[#2a332d] pt-8 text-sm text-[var(--color-text-secondary)] md:flex-row">
          <p>© 2026 BuildWithShreya. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-peach)]"></span>
          </div>
        </div>
      </div>
    </footer>
  );
}