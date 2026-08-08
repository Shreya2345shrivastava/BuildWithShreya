"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  mode?: "light" | "dark";
  compact?: boolean;
  className?: string;
}

function BotanicalMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
    >
      <path
        d="M12 4C9 6 8 10 9.5 13.5C11 17 14 19 18 20C18.5 16 17.5 12 15 9C13.5 7.2 12.8 5.8 12 4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 4C15 6 16 10 14.5 13.5C13 17 10 19 6 20C5.5 16 6.5 12 9 9C10.5 7.2 11.2 5.8 12 4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({
  mode = "light",
  compact = false,
  className,
}: LogoProps) {
  const isDark = mode === "dark";

  return (
    <span
      className={cn(
        "group inline-flex items-center gap-3 text-left",
        "transition-all duration-300 ease-out",
        isDark
          ? "text-[var(--color-text-inverse)]"
          : "text-[var(--color-text-primary)]",
        className
      )}
    >
      <span
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-full border",
          "shadow-[var(--shadow-sm)]",
          "transition-all duration-300 ease-out",
          "group-hover:scale-105 group-hover:rotate-3",
          isDark
            ? "border-white/15 bg-white/10 text-[var(--color-text-inverse)]"
            : "border-[var(--color-border-soft)] bg-[var(--color-surface-primary)] text-[var(--color-accent-peach)]"
        )}
      >
        <BotanicalMark />
      </span>

      <span className="whitespace-nowrap font-serif text-lg leading-none tracking-[-0.04em] sm:text-xl">
        <span
          className={
            isDark
              ? "text-[var(--color-text-inverse)]"
              : "text-[var(--color-text-primary)]"
          }
        >
          BuildWith
        </span>

        <span className="text-[var(--color-accent-peach)]">
          Shreya
        </span>

        {!compact && (
          <span className="sr-only">
            premium editorial brand
          </span>
        )}
      </span>
    </span>
  );
}