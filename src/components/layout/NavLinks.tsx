"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { HTMLAttributes } from "react";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

export interface NavLinkItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavLinkItem[] = [
  { label: "Home", href: ROUTES.home },
  { label: "Books", href: ROUTES.books },
  { label: "Mini Websites", href: ROUTES.miniWebsites },
  { label: "Resources", href: ROUTES.resources },
  { label: "About", href: ROUTES.about },
  { label: "Contact", href: ROUTES.contact },
];

interface NavLinksProps extends HTMLAttributes<HTMLUListElement> {
  orientation?: "horizontal" | "vertical";
  onNavigate?: () => void;
}

function isActiveLink(pathname: string, href: string) {
  if (href === ROUTES.home) {
    return pathname === ROUTES.home;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  label,
  href,
  active,
  onNavigate,
}: NavLinkItem & {
  active: boolean;
  onNavigate?: () => void;
}) {
  return (
    <li>
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        onClick={onNavigate}
        className={cn(
          "group relative inline-flex items-center px-4 py-2 text-[0.95rem] tracking-wide",
          "transition-all duration-300 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-peach)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          active
            ? "font-semibold text-[var(--color-text-primary)] dark:text-white"
            : "font-medium text-[var(--color-text-secondary)] dark:text-white/60 hover:text-[var(--color-text-primary)] dark:hover:text-white"
        )}
      >
        {label}
        {/* Subtle active indicator dot */}
        {active && (
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-[var(--color-accent-peach)]" />
        )}
      </Link>
    </li>
  );
}

export function NavLinks({
  orientation = "horizontal",
  onNavigate,
  className,
  ...props
}: NavLinksProps) {
  const pathname = usePathname();

  const isVertical = orientation === "vertical";

  return (
    <ul
      className={cn(
        "flex",
        isVertical
          ? "flex-col gap-2"
          : "items-center gap-6 lg:gap-8 xl:gap-10",
        className
      )}
      {...props}
    >
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.href}
          {...item}
          active={isActiveLink(pathname, item.href)}
          onNavigate={onNavigate}
        />
      ))}
    </ul>
  );
}