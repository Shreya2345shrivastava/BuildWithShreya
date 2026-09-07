"use client";

import { useOrder } from "./OrderContext";

export function FinalReview() {
  const { form, updateForm } = useOrder();

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="font-serif text-3xl sm:text-5xl text-black dark:text-white leading-tight">
          Final Review
        </h2>
        <p className="mt-3 text-lg text-black/60 dark:text-white/50 max-w-lg">
          Almost there. Please review your configuration and provide your contact details to receive the formal proposal.
        </p>
      </div>

      {/* Contact Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-8 rounded-3xl bg-white dark:bg-[#161818] border border-black/5 dark:border-white/5 shadow-sm">
        <div className="relative space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)] dark:text-white/40">Your Name</label>
          <input 
            type="text" 
            required
            value={form.name} 
            onChange={(e) => updateForm({ name: e.target.value })}
            placeholder="John Doe"
            className="w-full bg-transparent border-b-2 border-black/10 dark:border-white/10 px-0 py-2 text-lg text-black dark:text-white placeholder-black/20 dark:placeholder-white/20 outline-none focus:border-[var(--color-accent-peach)] transition-colors"
          />
        </div>
        <div className="relative space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)] dark:text-white/40">Email Address</label>
          <input 
            type="email" 
            required
            value={form.email} 
            onChange={(e) => updateForm({ email: e.target.value })}
            placeholder="john@example.com"
            className="w-full bg-transparent border-b-2 border-black/10 dark:border-white/10 px-0 py-2 text-lg text-black dark:text-white placeholder-black/20 dark:placeholder-white/20 outline-none focus:border-[var(--color-accent-peach)] transition-colors"
          />
        </div>
        <div className="sm:col-span-2 pt-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              checked={form.rushDelivery} 
              onChange={(e) => updateForm({ rushDelivery: e.target.checked })}
              className="w-5 h-5 rounded border-black/20 text-[var(--color-accent-peach)] focus:ring-[var(--color-accent-peach)] accent-[var(--color-accent-peach)]"
            />
            <span className="text-sm font-semibold text-black dark:text-white">
              Enable Rush Delivery (+₹2,500, halves the timeline)
            </span>
          </label>
        </div>
      </div>

      {/* Confidence Builders */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)] dark:text-white/40 mb-4">
          Included in every project
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            "Responsive Design",
            "SEO Setup",
            "Performance Tuning",
            "Mobile Optimization",
            "Hosting Guidance",
            "Launch Support"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60">
              <svg className="w-4 h-4 text-[var(--color-accent-peach)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
