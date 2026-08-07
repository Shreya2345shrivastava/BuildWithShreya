"use client";

import { useEffect, useRef } from "react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { NavLinks } from "@/components/layout/NavLinks";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
	open: boolean;
	onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
	const panelRef = useRef<HTMLDivElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!open) {
			return;
		}

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		closeButtonRef.current?.focus();

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
				return;
			}

			if (event.key !== "Tab") {
				return;
			}

			const focusableElements = panelRef.current?.querySelectorAll<HTMLElement>(
				'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
			);

			if (!focusableElements || focusableElements.length === 0) {
				return;
			}

			const firstElement = focusableElements[0];
			const lastElement = focusableElements[focusableElements.length - 1];
			const activeElement = document.activeElement as HTMLElement | null;

			if (event.shiftKey && activeElement === firstElement) {
				event.preventDefault();
				lastElement.focus();
			}

			if (!event.shiftKey && activeElement === lastElement) {
				event.preventDefault();
				firstElement.focus();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.body.style.overflow = previousOverflow;
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [open, onClose]);

	return (
		<div
			className={cn(
				"fixed inset-0 z-[70] transition-soft",
				open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
			)}
			aria-hidden={!open}
		>
			<button
				type="button"
				aria-label="Close navigation menu"
				onClick={onClose}
				className={cn(
					"absolute inset-0 cursor-default bg-[var(--color-scrim)] backdrop-blur-[2px] transition-opacity duration-300",
					open ? "opacity-100" : "opacity-0",
				)}
			/>

			<aside
				ref={panelRef}
				id="mobile-navigation"
				role="dialog"
				aria-modal="true"
				aria-label="Mobile navigation"
				className={cn(
					"absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-[var(--color-border-soft)] bg-[linear-gradient(180deg,var(--color-bg-ivory)_0%,var(--color-surface-primary)_100%)] px-5 pb-6 pt-5 shadow-[var(--shadow-floating)] transition-transform duration-300",
					open ? "translate-x-0" : "translate-x-full",
				)}
			>
				<div className="flex items-center justify-between gap-4">
					<Logo compact />
					<button
						ref={closeButtonRef}
						type="button"
						onClick={onClose}
						aria-label="Close menu"
						className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border-soft)] bg-[var(--color-surface-primary)] text-[var(--color-text-primary)] transition-soft hover:translate-y-[-1px] hover:shadow-[var(--shadow-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-ivory)]"
					>
						<svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none">
							<path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
						</svg>
					</button>
				</div>

				<nav aria-label="Mobile primary navigation" className="mt-10 flex flex-1 flex-col">
					<NavLinks orientation="vertical" onNavigate={onClose} className="text-base" />

					<div className="mt-auto pt-8">
						<PrimaryButton href="/books" className="w-full" size="lg" onClick={onClose}>
							Get the Book
						</PrimaryButton>
					</div>
				</nav>
			</aside>
		</div>
	);
}