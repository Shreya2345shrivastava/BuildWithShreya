"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Container } from "@/components/ui";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Logo } from "@/components/layout/Logo";
import { NavLinks } from "@/components/layout/NavLinks";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { cn } from "@/lib/utils";

function MenuIcon() {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<line x1="3" y1="6" x2="21" y2="6" />
			<line x1="3" y1="12" x2="21" y2="12" />
			<line x1="3" y1="18" x2="21" y2="18" />
		</svg>
	);
}

export function Navbar() {
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const updateScrolled = () => {
			setScrolled(window.scrollY > 12);
		};

		updateScrolled();

		window.addEventListener("scroll", updateScrolled, {
			passive: true,
		});

		return () => {
			window.removeEventListener("scroll", updateScrolled);
		};
	}, []);

	return (
		<header className="fixed inset-x-0 top-0 z-[60] px-3 pt-3 sm:px-4 sm:pt-4">
			<Container width="wide" noPadding>
				<nav
					aria-label="Primary"
					className={cn(
						"flex min-h-[5rem] items-center justify-between gap-5 rounded-[var(--radius-full)] border px-5 py-3.5 backdrop-blur-3xl transition-all duration-500 ease-out sm:px-6 lg:px-7",
						scrolled
							? "border-[var(--color-border-subtle)] bg-[rgba(255,250,244,0.92)] shadow-[0_16px_40px_rgba(32,25,19,0.10)]"
							: "border-[color-mix(in_srgb,var(--color-border-soft)_70%,transparent)] bg-[rgba(255,250,244,0.72)] shadow-[0_8px_24px_rgba(32,25,19,0.06)]",
					)}
				>
					<Link
						href="/"
						aria-label="BuildWithShreya home"
						className="group inline-flex shrink-0 items-center"
					>
						<Logo className="transition-all duration-300 group-hover:scale-[1.02] group-hover:opacity-85" />
					</Link>

					<div className="hidden flex-1 justify-center lg:flex">
						<NavLinks />
					</div>

					<div className="hidden shrink-0 lg:flex">
						<PrimaryButton
							href="/books"
							size="md"
							rounded={false}
							className="rounded-[var(--radius-xl)] px-5 py-3.5 shadow-[0_10px_22px_rgba(201,123,99,0.20)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(201,123,99,0.28)]"
						>
							Get the Book
						</PrimaryButton>
					</div>

					<button
						type="button"
						aria-label="Open navigation menu"
						aria-expanded={open}
						aria-controls="mobile-navigation"
						onClick={() => setOpen(true)}
						className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border-soft)] bg-[var(--color-surface-primary)] text-[var(--color-text-primary)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.05] hover:shadow-[0_10px_20px_rgba(32,25,19,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-ivory)] lg:hidden"
					>
						<MenuIcon />
					</button>
				</nav>
			</Container>

			<MobileMenu
				open={open}
				onClose={() => setOpen(false)}
			/>
		</header>
	);
}