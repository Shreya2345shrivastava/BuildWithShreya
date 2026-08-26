"use client";

import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { addSubscriber } from "@/lib/actions/newsletter.actions";

export function NewsletterForm() {
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
        setMessage("Thanks for subscribing!");
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
    <div className="mx-auto mt-10 w-full max-w-lg">
      <form
        action={handleSubmit}
        className="relative flex w-full items-center rounded-full bg-[var(--color-surface-elevated)] dark:bg-[#242b28]/60 dark:bg-[var(--color-surface-elevated)] dark:bg-[#242b28]/10 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-xl border border-black/5 dark:border-white/20 focus-within:ring-2 focus-within:ring-[var(--color-accent-peach)] focus-within:ring-offset-2 focus-within:ring-offset-transparent transition-all duration-300"
      >
        <input
          type="email"
          name="email"
          required
          disabled={status === "loading" || status === "success"}
          placeholder="Enter your best email..."
          className="flex-1 bg-transparent px-6 py-3.5 text-[var(--color-text-primary)] dark:text-white placeholder-black/40 dark:placeholder-white/60 outline-none w-full disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="group flex items-center justify-center rounded-full bg-[var(--color-accent-peach)] px-8 py-3.5 font-bold !text-black dark:!text-black shadow-lg transition-all hover:scale-105 hover:bg-[var(--color-accent-peach)] disabled:opacity-50 disabled:hover:scale-100"
        >
          {status === "loading" ? (
            "Subscribing..."
          ) : status === "success" ? (
            <>
              Subscribed
              <Check size={16} className="ml-2" />
            </>
          ) : (
            <>
              Subscribe
              <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
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