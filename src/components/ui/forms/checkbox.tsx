import { useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
	label: string;
	error?: string;
}

export function Checkbox({ label, error, className, disabled, ...props }: CheckboxProps) {
	const generatedId = useId();
	const checkboxId = props.id ?? props.name ?? generatedId;
	const messageId = error ? `${checkboxId}-message` : props["aria-describedby"];

	return (
		<label className={cn("flex items-start gap-3 text-body text-[var(--color-text-primary)]", disabled && "opacity-60", className)}>
			<input
				type="checkbox"
				disabled={disabled}
				className="peer sr-only"
				id={checkboxId}
				aria-invalid={Boolean(error)}
				aria-describedby={messageId}
				{...props}
			/>
			<span className="relative mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-[0.4rem] border border-[var(--color-border-strong)] bg-[var(--color-surface-elevated)] dark:bg-[#242b28] shadow-[var(--shadow-sm)] transition-soft peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-focus)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--color-bg-ivory)]">
				<svg className="h-3.5 w-3.5 scale-0 text-[var(--color-text-primary)] transition-transform peer-checked:scale-100" viewBox="0 0 16 16" fill="none" aria-hidden="true">
					<path d="M3.5 8.4 6.4 11.3 12.5 4.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</span>
			<span className="space-y-1">
				<span>{label}</span>
				{error ? <span id={`${checkboxId}-message`} className="block text-caption text-[var(--color-error)]">{error}</span> : null}
			</span>
		</label>
	);
}