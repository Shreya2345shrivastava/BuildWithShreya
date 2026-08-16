import { CheckCircle2, Star, Mail } from "lucide-react";

export function NewsletterPreview() {
  return (
    <section className="relative py-32 bg-[var(--color-surface-elevated)] dark:bg-[#242b28] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-accent-sage)]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Side: Text */}
        <div className="flex-1 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent-sage)]/30 bg-[var(--color-accent-sage)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#778668]">
            <Mail size={14} />
            Sample Issue
          </span>
          <h2 className="mt-6 font-serif text-4xl sm:text-5xl text-[var(--color-text-primary)] leading-tight">
            A sneak peek inside your <span className="italic text-[#778668]">inbox</span>
          </h2>
          <p className="mt-6 text-lg text-[var(--color-text-secondary)]">
            No fluff, just high-signal content. Every Sunday, you'll receive a beautifully formatted email packed with actionable advice to help you build and grow.
          </p>
        </div>

        {/* Right Side: Mock Inbox 3D UI */}
        <div className="flex-1 w-full perspective-[2000px]">
          <div className="relative mx-auto max-w-md transform-gpu rotate-y-[-12deg] rotate-x-[5deg] rounded-3xl border border-black/5 bg-[var(--color-surface-elevated)] dark:bg-[#242b28] p-2 shadow-2xl transition-transform duration-700 hover:rotate-y-0 hover:rotate-x-0 hover:scale-105">
            {/* Browser/Email Header */}
            <div className="flex items-center gap-2 rounded-t-2xl bg-gray-50/50 px-4 py-3 border-b border-gray-100">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <div className="ml-4 flex-1 rounded-md bg-[var(--color-surface-elevated)] dark:bg-[#242b28] px-3 py-1 text-xs text-gray-400 shadow-sm border border-gray-100">
                From: Shreya &lt;hello@buildwithshreya.com&gt;
              </div>
            </div>

            {/* Email Body */}
            <div className="p-8">
              <h3 className="font-serif text-2xl text-gray-900 mb-6 border-b border-gray-100 pb-4">
                The 1% Rule of Building 🚀
              </h3>
              
              <ul className="space-y-5 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 text-green-500 shrink-0" size={20} />
                  <span><strong>3 Productivity Lessons:</strong> How to overcome the blank page syndrome.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="mt-0.5 text-amber-500 shrink-0" size={20} />
                  <span><strong>Best Resources:</strong> My top 5 tools for rapid prototyping this week.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 text-green-500 shrink-0" size={20} />
                  <span><strong>Career Growth:</strong> Why soft skills accelerate your dev career.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="mt-0.5 text-amber-500 shrink-0" size={20} />
                  <span><strong>Weekly Challenge:</strong> Build a micro-habit in 5 minutes today.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}