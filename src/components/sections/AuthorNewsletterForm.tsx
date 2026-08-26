"use client";

import { useState } from "react";
import { addSubscriber } from "@/lib/actions/newsletter.actions";

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
      <form action={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          name="email"
          required
          disabled={status === "loading" || status === "success"}
          placeholder="Your email address"
          className="w-full rounded-full border border-[var(--color-border-soft)] dark:border-[#2a332d] bg-[var(--color-bg-ivory)] dark:bg-[#131715]/50 px-5 py-3.5 text-sm outline-none transition-colors focus:border-[var(--color-accent-peach)] focus:bg-[var(--color-surface-elevated)] dark:bg-[#242b28] disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="w-full rounded-full bg-[var(--color-accent-peach)] px-5 py-3.5 text-sm font-bold !text-black dark:!text-black transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-peach)] focus:ring-offset-2 disabled:opacity-50 disabled:hover:translate-y-0"
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
