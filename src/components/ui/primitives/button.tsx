"use client";

import Link from "next/link";

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

type ButtonVariant = keyof typeof theme.buttons;
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
	children?: ReactNode;
	variant?: ButtonVariant;
	size?: ButtonSize;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	fullWidth?: boolean;
	rounded?: boolean;
	loading?: boolean;
	disabled?: boolean;
	className?: string;
}

interface ButtonAsButtonProps extends ButtonBaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
	href?: undefined;
}

interface ButtonAsLinkProps extends ButtonBaseProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
	href: string;
}

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const sizeStyles: Record<ButtonSize, string> = {
	sm: "px-3 py-2 text-sm min-h-[44px]",
	md: "px-4 py-3 text-sm min-h-[44px]",
	lg: "px-5 py-3.5 text-base min-h-[48px]",
};

const iconSizeStyles: Record<ButtonSize, string> = {
	sm: "h-3.5 w-3.5",
	md: "h-4 w-4",
	lg: "h-5 w-5",
};

function getButtonStyle(variant: ButtonVariant, rounded: boolean): CSSProperties {
	const token = theme.buttons[variant];

	return {
		backgroundColor: token.background,
		color: token.foreground,
		borderColor: token.border,
		borderRadius: rounded ? theme.radius.pill : theme.radius.xl,
		boxShadow: theme.shadows.sm,
		transitionDuration: theme.motion.base,
	};
}

function renderContent(props: ButtonProps, size: ButtonSize) {
	const { children, leftIcon, rightIcon, loading } = props;

	return (
		<>
			{loading ? (
				<svg aria-hidden="true" className={cn("animate-spin", iconSizeStyles[size])} viewBox="0 0 24 24" fill="none">
					<circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
					<path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
				</svg>
			) : (
				leftIcon && <span className={cn("inline-flex shrink-0", iconSizeStyles[size])}>{leftIcon}</span>
			)}
			<span className="truncate">{children}</span>
			{rightIcon ? <span className={cn("inline-flex shrink-0", iconSizeStyles[size])}>{rightIcon}</span> : null}
		</>
	);
}

export function Button(props: ButtonProps) {
	const {
		variant = "primary",
		size = "md",
		leftIcon,
		rightIcon,
		fullWidth,
		rounded = true,
		loading,
		className,
		href,
		disabled,
		children,
		...rest
	} = props;

	const baseClassName = cn(
		"inline-flex items-center justify-center gap-2 border font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-ivory)] disabled:cursor-not-allowed disabled:opacity-60 hover:[background-color:var(--hover-background)] hover:[color:var(--hover-foreground)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-md active:translate-y-0 active:shadow-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]",
		sizeStyles[size],
		fullWidth && "w-full",
		rounded && "rounded-full",
		!rounded && "rounded-[var(--radius-md)]",
		variant === "text" && "border-transparent px-0 shadow-none",
		href && (disabled || loading) && "pointer-events-none",
		className,
	);
	const style = {
		...getButtonStyle(variant, rounded),
		"--hover-background": theme.buttons[variant].hoverBackground,
		"--hover-foreground": theme.buttons[variant].hoverForeground,
	} as CSSProperties;

	if (href) {
		const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
		const handleClick: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"] = (event) => {
			if (disabled || loading) {
				event.preventDefault();
				event.stopPropagation();
				return;
			}

			anchorProps.onClick?.(event);
		};

		const isExternalOrAnchor = href.startsWith("http") || href.startsWith("#");

		if (isExternalOrAnchor) {
			return (
				<a
					href={href}
					aria-disabled={disabled || loading}
					tabIndex={disabled || loading ? -1 : anchorProps.tabIndex}
					className={baseClassName}
					style={style}
					onClick={handleClick as any}
					{...(anchorProps as any)}
				>
					{renderContent({ children, leftIcon, rightIcon, loading }, size)}
				</a>
			);
		}

		return (
			<Link
				href={href}
				aria-disabled={disabled || loading}
				aria-busy={loading || undefined}
				tabIndex={disabled || loading ? -1 : anchorProps.tabIndex}
				className={baseClassName}
				style={style}
				onClick={handleClick as any}
				{...(anchorProps as any)}
			>
				{renderContent({ children, leftIcon, rightIcon, loading }, size)}
			</Link>
		);
	}

	const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;

	return (
		<button
			type={buttonProps.type ?? "button"}
			disabled={disabled || loading}
			aria-busy={loading || undefined}
			className={baseClassName}
			style={style}
			{...buttonProps}
		>
			{renderContent({ children, leftIcon, rightIcon, loading }, size)}
		</button>
	);
}