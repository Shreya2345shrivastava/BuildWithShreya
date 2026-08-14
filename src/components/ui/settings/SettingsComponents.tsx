import React from "react";
import { cn } from "@/lib/utils";

// --- Settings Section & Card --- //

export function SettingsSection({ title, description, children, footer }: { title: string; description: string; children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-black/[0.04] bg-white shadow-sm">
      <div className="border-b border-black/[0.04] p-6 sm:p-8">
        <h2 className="font-serif text-2xl text-[#3A332D]">{title}</h2>
        <p className="mt-1 text-sm text-[#8A837D]">{description}</p>
      </div>
      <div className="p-6 sm:p-8 space-y-6">
        {children}
      </div>
      {footer && (
        <div className="flex items-center justify-end rounded-b-2xl border-t border-black/[0.04] bg-[#FAF7F4] p-6 sm:px-8">
          {footer}
        </div>
      )}
    </section>
  );
}

// --- Inputs --- //

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  prefixUrl?: string;
}

export const SettingsInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, prefixUrl, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#3A332D]">{label}</label>
        <div className="relative flex w-full overflow-hidden rounded-xl border border-black/[0.04] bg-[#FCF8F2]/50 transition-all focus-within:border-[#D9895B] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#D9895B]">
          {prefixUrl && (
            <div className="flex items-center pl-4 text-sm text-[#8A837D]">
              {prefixUrl}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "flex-1 bg-transparent px-4 py-2.5 text-sm text-[#3A332D] outline-none",
              prefixUrl && "pl-1",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
SettingsInput.displayName = "SettingsInput";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const SettingsTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#3A332D]">{label}</label>
        <textarea
          ref={ref}
          className={cn(
            "w-full rounded-xl border border-black/[0.04] bg-[#FCF8F2]/50 px-4 py-3 text-sm text-[#3A332D] outline-none transition-all focus:border-[#D9895B] focus:bg-white focus:ring-1 focus:ring-[#D9895B]",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
SettingsTextarea.displayName = "SettingsTextarea";

// --- Toggle --- //

interface ToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function SettingsToggle({ label, description, checked, onChange, disabled }: ToggleProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-[#3A332D]">{label}</span>
        <span className="text-sm text-[#8A837D]">{description}</span>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#D9895B] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          checked ? "bg-[#D9895B]" : "bg-gray-200"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
}
