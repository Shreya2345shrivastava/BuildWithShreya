import { useId, type InputHTMLAttributes } from "react";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	success?: string;
}

export function Input({ label, error, success, className, disabled, style, ...props }: InputProps) {
	const generatedId = useId();
	const inputId = props.id ?? props.name ?? generatedId;
	const message = error ?? success;
	const messageId = message ? `${inputId}-message` : props["aria-describedby"];

	return (
		<label className="flex w-full flex-col gap-2">
			{label ? <span className="text-label text-[var(--color-text-secondary)]">{label}</span> : null}
			<input
				disabled={disabled}
				className={cn(
					"h-[var(--form-input-height)] w-full rounded-[var(--radius-md)] border bg-[var(--color-surface-elevated)] px-4 text-form text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] transition-soft focus:border-[var(--color-focus)] focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-focus)_28%,transparent)] disabled:cursor-not-allowed disabled:bg-[var(--color-border-subtle)] disabled:text-[var(--color-text-muted)]",
					error ? "border-[var(--color-error)]" : success ? "border-[var(--color-success)]" : "border-[var(--color-border-soft)]",
					className,
				)}
				style={{ borderRadius: theme.radius.md, ...style }}
				id={inputId}
				aria-invalid={Boolean(error)}
				aria-describedby={messageId}
				{...props}
			/>
			{error ? <span id={`${inputId}-message`} className="text-caption text-[var(--color-error)]">{error}</span> : null}
			{!error && success ? <span id={`${inputId}-message`} className="text-caption text-[var(--color-success)]">{success}</span> : null}
		</label>
	);
}