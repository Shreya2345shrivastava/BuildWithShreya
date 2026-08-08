import Image from "next/image";
import { cn } from "@/lib/utils";

type PreviewCardProps = {
  src: string;
  alt: string;
  onOpen: () => void;
  className?: string;
};

export function PreviewCard({
  src,
  alt,
  onOpen,
  className,
}: PreviewCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open preview: ${alt}`}
      className={cn(
        `
        group
        block
        w-full
        overflow-hidden
        rounded-[1.75rem]
        border
        border-[var(--color-border-soft)]
        bg-[var(--color-surface-primary)]
        text-left
        shadow-[0_16px_36px_rgba(32,25,19,0.08)]
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-[0_28px_56px_rgba(32,25,19,0.14)]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--color-focus)]
        focus-visible:ring-offset-4
        focus-visible:ring-offset-[var(--color-bg-ivory)]
        `,
        className,
      )}
    >
      <div className="relative overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={800}
          height={1200}
          sizes="(max-width: 768px) 70vw, 320px"
          className="
            h-auto
            w-full
            object-cover
            transition-transform
            duration-500
            ease-out
            group-hover:scale-110
          "
        />

        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-black/10
            via-transparent
            to-transparent
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        />
      </div>

      <div className="flex items-center justify-between px-5 py-4">
        <span className="text-sm font-medium text-[var(--color-text-secondary)]">
          Click to preview
        </span>

        <span
          className="
            text-lg
            text-[var(--color-accent-peach)]
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
        >
          →
        </span>
      </div>
    </button>
  );
}