import Image from "next/image";
import { Signature } from "./Signature";

export function AboutAuthor() {
  return (
    <div className="grid gap-12 lg:grid-cols-[380px_1fr] lg:items-center">
      <div className="flex justify-center lg:justify-start">
        <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border-soft)] dark:border-[#2a332d] bg-[var(--color-surface-elevated)] dark:bg-[#242b28] shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
          <Image
            src="/images/authors/Author.jpeg"
            alt="Shreya portrait"
            width={320}
            height={420}
            className="h-auto w-full object-cover"
          />
        </div>
      </div>

      <div>
        <span className="text-label text-[var(--color-accent-peach)]">
          ABOUT THE AUTHOR
        </span>

        <h2 className="mt-4 font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-[var(--color-text-primary)]">
          Hi, I&apos;m Shreya 👋
        </h2>

        <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
          I created BuildWithShreya to help creators, students,
          and dreamers build meaningful projects with clarity,
          consistency, and confidence.
        </p>

        <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">
          This workbook combines reflection, planning, and
          action-taking exercises designed to help you move
          from ideas to execution.
        </p>

        <Signature />
      </div>
    </div>
  );
}