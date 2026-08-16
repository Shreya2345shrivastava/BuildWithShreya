import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  icon: ReactNode;
  title: ReactNode;
  description: ReactNode;
  visible?: boolean;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  visible = true,
  className,
  ...props
}: FeatureCardProps) {
  return (
    <article
      tabIndex={0}
      data-visible={visible}
      className={cn(
        "group flex h-full flex-col items-center justify-center rounded-2xl border border-[var(--color-border-soft)] dark:border-[#2a332d] bg-[var(--color-surface-elevated)] dark:bg-[#242b28] px-5 py-8 text-center",
        "shadow-sm",
        "transition-all duration-500 ease-out",
        "hover:-translate-y-1",
        "hover:border-[var(--color-accent-peach)]/40",
        "hover:shadow-md",
        "focus-visible:-translate-y-1",
        "focus-visible:border-[var(--color-accent-peach)]",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-[var(--color-focus)]",
        "focus-visible:ring-offset-2",
        "focus-visible:ring-offset-[var(--color-bg-cream)]",
        "data-[visible=false]:translate-y-5",
        "data-[visible=false]:opacity-0",
        "data-[visible=true]:translate-y-0",
        "data-[visible=true]:opacity-100",
        className,
      )}
      {...props}
    >
      <div className="transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
        {icon}
      </div>

      <div className="mt-6 space-y-3">
        <h3 className="font-serif text-xl font-medium text-[var(--color-text-primary)]">
          {title}
        </h3>

        <p className="text-body leading-[1.82] text-[var(--color-text-secondary)]">
          {description}
        </p>
      </div>
    </article>
  );
}