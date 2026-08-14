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

export function MobileMenu({
	open,
	onClose,
}: MobileMenuProps) {
	const panelRef = useRef<HTMLDivElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!open) return;

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		closeButtonRef.current?.focus();

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
				return;
			}

			if (event.key !== "Tab") return;

			const focusableElements =
				panelRef.current?.querySelectorAll<HTMLElement>(
					'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
				);

			if (!focusableElements?.length) return;

			const firstElement = focusableElements[0];
			const lastElement =
				focusableElements[focusableElements.length - 1];

			const activeElement =
				document.activeElement as HTMLElement | null;

			if (
				event.shiftKey &&
				activeElement === firstElement
			) {
				event.preventDefault();
				lastElement.focus();
			}

			if (
				!event.shiftKey &&
				activeElement === lastElement
			) {
				event.preventDefault();
				firstElement.focus();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.body.style.overflow =
				previousOverflow;
			document.removeEventListener(
				"keydown",
				handleKeyDown,
			);
		};
	}, [open, onClose]);

	return (
		<div
			className={cn(
				"fixed inset-0 z-[70] transition-all duration-500 ease-out",
				open
					? "pointer-events-auto opacity-100"
					: "pointer-events-none opacity-0",
			)}
			aria-hidden={!open}
		>
			<button
				type="button"
				aria-label="Close navigation menu"
				onClick={onClose}
				className={cn(
					"absolute inset-0 cursor-default bg-[rgba(32,25,19,0.42)] backdrop-blur-md transition-opacity duration-500",
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
					"absolute right-0 top-0 flex h-full w-full max-w-[28rem] flex-col border-l border-[var(--color-border-soft)] bg-[rgba(255,250,244,0.96)] backdrop-blur-2xl px-5 pb-6 pt-5 shadow-[0_20px_60px_rgba(32,25,19,0.12)] transition-all duration-500 ease-out",
					open
						? "translate-x-0"
						: "translate-x-full",
				)}
			>
				<div className="flex items-center justify-between gap-4">
					<Logo compact />

					<button
						ref={closeButtonRef}
						type="button"
						onClick={onClose}
						aria-label="Close menu"
						className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border-soft)] bg-[var(--color-surface-primary)] text-[var(--color-text-primary)] transition-all duration-300 hover:-translate-y-1 hover:rotate-90 hover:shadow-[0_12px_24px_rgba(32,25,19,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-ivory)]"
					>
						<svg
							viewBox="0 0 24 24"
							aria-hidden="true"
							className="h-5 w-5"
							fill="none"
						>
							<path
								d="M6 6l12 12M18 6 6 18"
								stroke="currentColor"
								strokeWidth="1.6"
								strokeLinecap="round"
							/>
						</svg>
					</button>
				</div>

				<nav
					aria-label="Mobile primary navigation"
					className="mt-12 flex flex-1 flex-col"
				>
					<NavLinks
						orientation="vertical"
						onNavigate={onClose}
						className="text-base"
					/>

					<div className="mt-auto pt-8">
						<PrimaryButton
							href="/books/first-build-it-then-make-it-beautiful"
							size="lg"
							onClick={onClose}
							className="w-full shadow-[0_12px_28px_rgba(217,164,143,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(217,164,143,0.32)]"
						>
							Get the Book
						</PrimaryButton>
					</div>
				</nav>
			</aside>
		</div>
	);
}