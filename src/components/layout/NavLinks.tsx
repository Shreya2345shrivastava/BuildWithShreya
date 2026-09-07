"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { HTMLAttributes } from "react";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { ChevronDown, Book, Hammer, Sparkles, LayoutTemplate, Laptop, Paintbrush } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface NavLinkChild {
  label: string;
  href: string;
  description?: string;
  icon?: any;
}

export interface NavLinkItem {
  label: string;
  href: string;
  children?: NavLinkChild[];
}

const NAV_ITEMS: NavLinkItem[] = [
  { label: "Home", href: ROUTES.home },
  { 
    label: "Shop", 
    href: "/shop",
    children: [
      { 
        label: "Books", 
        href: "/shop#books", 
        description: "Frameworks, guides & digital books",
        icon: Book
      },
      { 
        label: "Resources", 
        href: "/shop#resources",
        description: "Templates, worksheets & creator tools",
        icon: Hammer
      },
      { 
        label: "LifeOS", 
        href: "/shop#lifeos",
        description: "Productivity systems & planning tools",
        icon: Sparkles
      },
      { 
        label: "Website Templates", 
        href: "/shop/templates",
        description: "Ready-to-launch website designs",
        icon: LayoutTemplate
      },
    ]
  },
  { label: "Custom Websites", href: "/custom-websites" },
  { label: "Pricing", href: "/pricing" },
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

function NavItemDesktop({
  item,
  pathname,
  onNavigate,
}: {
  item: NavLinkItem;
  pathname: string;
  onNavigate?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const active = isActiveLink(pathname, item.href);

  if (item.children) {
    return (
      <li 
        className="relative group"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Link
          href={item.href}
          onClick={onNavigate}
          className={cn(
            "group relative inline-flex items-center gap-1 px-4 py-2 text-[0.95rem] tracking-wide",
            "transition-all duration-300 ease-out",
            active
              ? "font-semibold text-[var(--color-text-primary)] dark:text-white"
              : "font-medium text-[var(--color-text-secondary)] dark:text-white/60 hover:text-[var(--color-text-primary)] dark:hover:text-white"
          )}
        >
          {item.label}
          <ChevronDown size={14} className={cn("transition-transform duration-300", isOpen ? "rotate-180" : "")} />
          {active && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-[var(--color-accent-peach)]" />}
        </Link>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50"
            >
              <div className="w-[380px] p-2 rounded-3xl bg-white/95 dark:bg-[#131715]/95 backdrop-blur-2xl border border-black/5 dark:border-white/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden">
                {item.children.map((child) => {
                  const Icon = child.icon;
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => {
                        setIsOpen(false);
                        if (onNavigate) onNavigate();
                      }}
                      className="group/link flex items-start gap-4 p-4 rounded-2xl hover:bg-[var(--color-accent-peach)]/5 dark:hover:bg-[var(--color-accent-peach)]/10 transition-all duration-300"
                    >
                      {Icon && (
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 group-hover/link:bg-white dark:group-hover/link:bg-black group-hover/link:shadow-sm transition-all duration-300 flex-shrink-0 text-black/60 dark:text-white/60 group-hover/link:text-[var(--color-accent-peach)]">
                          <Icon size={18} />
                        </div>
                      )}
                      <div>
                        <h4 className="text-sm font-semibold text-black dark:text-white group-hover/link:text-[var(--color-accent-peach)] transition-colors mb-1">
                          {child.label}
                        </h4>
                        <p className="text-xs text-black/50 dark:text-white/50 leading-relaxed">
                          {child.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        onClick={onNavigate}
        className={cn(
          "group relative inline-flex items-center px-4 py-2 text-[0.95rem] tracking-wide",
          "transition-all duration-300 ease-out",
          active
            ? "font-semibold text-[var(--color-text-primary)] dark:text-white"
            : "font-medium text-[var(--color-text-secondary)] dark:text-white/60 hover:text-[var(--color-text-primary)] dark:hover:text-white"
        )}
      >
        {item.label}
        {active && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-[var(--color-accent-peach)]" />}
      </Link>
    </li>
  );
}

function NavItemMobile({
  item,
  pathname,
  onNavigate,
}: {
  item: NavLinkItem;
  pathname: string;
  onNavigate?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const active = isActiveLink(pathname, item.href);

  if (item.children) {
    return (
      <li className="flex flex-col">
        <div className="flex items-center justify-between">
          <Link
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "py-3 text-lg transition-colors",
              active
                ? "font-semibold text-[var(--color-text-primary)] dark:text-white"
                : "font-medium text-[var(--color-text-secondary)] dark:text-white/60 hover:text-[var(--color-text-primary)] dark:hover:text-white"
            )}
          >
            {item.label}
          </Link>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-black/50 dark:text-white/50"
          >
            <ChevronDown size={18} className={cn("transition-transform duration-300", isOpen ? "rotate-180" : "")} />
          </button>
        </div>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden flex flex-col pl-4 border-l border-black/10 dark:border-white/10 ml-2 mb-2 gap-4"
            >
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onNavigate}
                  className="flex flex-col pt-2"
                >
                  <span className="text-base font-semibold text-[var(--color-text-secondary)] dark:text-white/80 hover:text-[var(--color-text-primary)] dark:hover:text-white transition-colors mb-1">
                    {child.label}
                  </span>
                  <span className="text-sm text-black/50 dark:text-white/40 leading-tight">
                    {child.description}
                  </span>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={item.href}
        onClick={onNavigate}
        className={cn(
          "block py-3 text-lg transition-colors",
          active
            ? "font-semibold text-[var(--color-text-primary)] dark:text-white"
            : "font-medium text-[var(--color-text-secondary)] dark:text-white/60 hover:text-[var(--color-text-primary)] dark:hover:text-white"
        )}
      >
        {item.label}
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
          : "items-center gap-2 lg:gap-4 xl:gap-6",
        className
      )}
      {...props}
    >
      {NAV_ITEMS.map((item) => (
        isVertical ? (
          <NavItemMobile
            key={item.href}
            item={item}
            pathname={pathname}
            onNavigate={onNavigate}
          />
        ) : (
          <NavItemDesktop
            key={item.href}
            item={item}
            pathname={pathname}
            onNavigate={onNavigate}
          />
        )
      ))}
    </ul>
  );
}