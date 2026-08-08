import { FooterLinks } from "./FooterLinks";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--color-border-soft)] bg-[var(--color-bg-ivory)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,164,143,0.08),transparent_45%)]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-20">
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

        <div className="mt-16 border-t border-[var(--color-border-soft)] pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-[var(--color-text-secondary)] md:flex-row">
            <p>
              © 2026 BuildWithShreya. All rights reserved.
            </p>

            <p>
              Built with ❤️ by Shreya
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}