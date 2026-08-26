"use client";

import { useState } from "react";
import { addSubscriber } from "@/lib/actions/newsletter.actions";
import { Mail } from "lucide-react";

export function AuthorNewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    setStatus("loading");
    const email = formData.get("email") as string;
    
    if (!email) return;

    try {
      const res = await addSubscriber({ email });
      if (res.success) {
        setStatus("success");
        setMessage("Thanks for subscribing! Check your inbox.");
      } else {
        setStatus("error");
        setMessage(res.error || "Failed to subscribe.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An unexpected error occurred.");
    }
  }

  return (
    <div className="mt-8">
      <form action={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <input
            type="email"
            name="email"
            required
            disabled={status === "loading" || status === "success"}
            placeholder="Your email address"
            className="w-full rounded-full border border-[var(--color-border-soft)] dark:border-[#2a332d] bg-transparent px-6 py-4 text-sm outline-none transition-colors focus:border-[var(--color-accent-peach)] focus:bg-[var(--color-surface-elevated)] dark:bg-transparent disabled:opacity-50 pr-12 text-[var(--color-text-primary)]"
          />
          <Mail className="absolute right-5 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] opacity-50" size={18} />
        </div>
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="w-full rounded-full bg-[#D9895B] hover:bg-[#c4774c] px-6 py-4 text-sm font-bold !text-white dark:!text-white transition-all shadow-[0_4px_14px_rgba(217,137,91,0.3)] hover:shadow-[0_6px_20px_rgba(217,137,91,0.4)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-peach)] focus:ring-offset-2 disabled:opacity-50 hover:-translate-y-0.5"
        >
          {status === "loading" ? "Joining..." : status === "success" ? "Joined 🌿" : "Join Free 🌿"}
        </button>
      </form>
      {message && (
        <p className={`mt-3 text-sm ${status === "success" ? "text-green-500" : "text-red-500"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
