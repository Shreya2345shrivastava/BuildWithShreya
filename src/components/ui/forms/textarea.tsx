import { useId, type TextareaHTMLAttributes } from "react";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	error?: string;
	success?: string;
}

export function Textarea({ label, error, success, className, disabled, style, ...props }: TextareaProps) {
	const generatedId = useId();
	const textareaId = props.id ?? props.name ?? generatedId;
	const message = error ?? success;
	const messageId = message ? `${textareaId}-message` : props["aria-describedby"];

	return (
		<label className="flex w-full flex-col gap-2">
			{label ? <span className="text-label text-[var(--color-text-secondary)]">{label}</span> : null}
			<textarea
				disabled={disabled}
				className={cn(
					"min-h-[var(--form-textarea-min-height)] w-full rounded-[var(--radius-md)] border bg-[var(--color-surface-elevated)] dark:bg-[#242b28] px-4 py-3 text-form text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] transition-soft focus:border-[var(--color-focus)] focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-focus)_28%,transparent)] disabled:cursor-not-allowed disabled:bg-[var(--color-border-subtle)] disabled:text-[var(--color-text-muted)]",
					error ? "border-[var(--color-error)]" : success ? "border-[var(--color-success)]" : "border-[var(--color-border-soft)] dark:border-[#2a332d]",
					className,
				)}
				style={{ borderRadius: theme.radius.md, ...style }}
				id={textareaId}
				aria-invalid={Boolean(error)}
				aria-describedby={messageId}
				{...props}
			/>
			{error ? <span id={`${textareaId}-message`} className="text-caption text-[var(--color-error)]">{error}</span> : null}
			{!error && success ? <span id={`${textareaId}-message`} className="text-caption text-[var(--color-success)]">{success}</span> : null}
		</label>
	);
}