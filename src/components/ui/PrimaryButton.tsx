"use client";

import type { ReactNode } from "react";
import { Button, type ButtonProps } from "@/components/ui/primitives/button";

function BookIcon() {
	return (
		<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
			<path d="M6.5 4.5h7.8A3.2 3.2 0 0 1 17.5 7.7v11.8a2.1 2.1 0 0 0-2.1-2.1H6.5A2.5 2.5 0 0 0 4 19.9V7a2.5 2.5 0 0 1 2.5-2.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
			<path d="M17.5 17.4v-9.7A3.2 3.2 0 0 0 14.3 4.5H7.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M7.2 8.8h5.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
			<path d="M7.2 11.8h4.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
		</svg>
	);
}

export type PrimaryButtonProps = ButtonProps & {
	showIcon?: boolean;
	icon?: ReactNode;
};

export function PrimaryButton({
	showIcon = true,
	icon,
	rightIcon,
	variant = "primary",
	size = "md",
	rounded = false,
	children,
	...props
}: PrimaryButtonProps) {
	const resolvedIcon = rightIcon ?? (showIcon ? icon ?? <BookIcon /> : undefined);

	return (
  <Button
    variant={variant}
    size={size}
    rounded={rounded}
    rightIcon={resolvedIcon}
    className="transition-all duration-300 hover:scale-105"
    {...props}
  >
    {children}
  </Button>
);
}