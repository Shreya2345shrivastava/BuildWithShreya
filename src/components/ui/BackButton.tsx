import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  href: string;
  label?: string;
  className?: string;
}

export function BackButton({ href, label = "Back", className }: BackButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors group",
        className
      )}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full border border-[var(--color-border-soft)] dark:border-[#2a332d] bg-[var(--color-surface-elevated)] group-hover:bg-[var(--color-surface-secondary)] transition-colors shadow-sm group-hover:shadow">
        <ArrowLeft size={16} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
      </div>
      <span>{label}</span>
    </Link>
  );
}
