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

function NavLink({ label, href, active, onNavigate }: NavLinkItem & { active: boolean; onNavigate?: () => void }) {
	return (
		<li>
			<Link
				href={href}
				aria-current={active ? "page" : undefined}
				onClick={onNavigate}
				className={cn(
					"group relative inline-flex items-center py-2 text-[0.95rem] font-medium tracking-[-0.01em] transition-colors duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-ivory)]",
					active ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
				)}
			>
				<span className="relative pb-0.5">
					{label}
					<span
						className={cn(
							"absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[var(--color-accent-peach)] transition-transform duration-300 ease-out group-hover:scale-x-100",
							active && "scale-x-100",
						)}
					/>
				</span>
			</Link>
		</li>
	);
}

export function NavLinks({ orientation = "horizontal", onNavigate, className, ...props }: NavLinksProps) {
	const pathname = usePathname();
	const isVertical = orientation === "vertical";

	return (
		<ul className={cn("flex", isVertical ? "flex-col gap-1" : "items-center gap-8 xl:gap-10", className)} {...props}>
			{NAV_ITEMS.map((item) => (
				<NavLink key={item.href} {...item} active={isActiveLink(pathname, item.href)} onNavigate={onNavigate} />
			))}
		</ul>
	);
}