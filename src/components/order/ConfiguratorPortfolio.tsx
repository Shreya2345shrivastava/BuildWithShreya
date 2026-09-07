"use client";

import { useOrder, type PortfolioDetails } from "./OrderContext";

interface FeatureOption {
  value: string;
  label: string;
  price: string;
  desc?: string;
}

export function ConfiguratorPortfolio() {
  const { form, updatePortfolio } = useOrder();
  const d = form.portfolio;

  const projectOptions: FeatureOption[] = [
    { value: "none", label: "No Projects", price: "Included", desc: "Just a bio & resume" },
    { value: "3", label: "3 Case Studies", price: "+₹1,500", desc: "Deep dive case studies" },
    { value: "5", label: "5 Case Studies", price: "+₹2,500", desc: "Standard portfolio" },
    { value: "10", label: "10 Case Studies", price: "+₹4,000", desc: "Senior level portfolio" },
    { value: "20", label: "20 Case Studies", price: "+₹7,000", desc: "Agency level archive" },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="font-serif text-3xl sm:text-5xl text-black dark:text-white leading-tight">
          Portfolio Details
        </h2>
        <p className="mt-3 text-lg text-black/60 dark:text-white/50 max-w-lg">
          Configure the specific features to showcase your personal brand and work.
        </p>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-3xl bg-white dark:bg-[#161818] border border-black/5 dark:border-white/5">
        <div className="space-y-2 sm:col-span-2">
          <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)] dark:text-white/40">Your Profession / Title</label>
          <input 
            type="text" 
            value={d.profession} 
            onChange={(e) => updatePortfolio({ profession: e.target.value })}
            placeholder="e.g. Senior Product Designer"
            className="w-full bg-transparent border-b-2 border-black/10 dark:border-white/10 px-0 py-2 text-lg text-black dark:text-white placeholder-black/20 dark:placeholder-white/20 outline-none focus:border-[var(--color-accent-peach)] transition-colors"
          />
        </div>
      </div>

      {/* Features Configurator */}
      <div className="space-y-10">
        
        {/* Projects */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">Case Studies Setup</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {projectOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updatePortfolio({ projectCount: opt.value as PortfolioDetails["projectCount"] })}
                className={`flex flex-col items-start p-4 text-left rounded-2xl border-2 transition-all duration-200 ${
                  d.projectCount === opt.value
                    ? "border-[var(--color-accent-peach)] bg-[var(--color-accent-peach)]/5"
                    : "border-black/5 dark:border-white/5 bg-white dark:bg-[#161818] hover:border-black/15 dark:hover:border-white/15"
                }`}
              >
                <div className="flex justify-between w-full items-center mb-2">
                  <span className={`font-semibold ${d.projectCount === opt.value ? "text-[var(--color-accent-peach)]" : "text-black dark:text-white"}`}>{opt.label}</span>
                  <span className="text-xs font-bold text-black/40 dark:text-white/40">{opt.price}</span>
                </div>
                {opt.desc && <span className="text-xs text-black/50 dark:text-white/40">{opt.desc}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Toggle Features */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">Professional Modules</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: "hasBlog", label: "Blog / Articles Setup", price: "+₹2,000", desc: "CMS setup for your writing" },
              { key: "hasBooking", label: "Booking System", price: "+₹1,500", desc: "Let clients book calls directly" },
              { key: "hasServices", label: "Services & Pricing Page", price: "+₹1,000", desc: "Dedicated page to sell your skills" },
            ].map((feature) => {
              const isSelected = d[feature.key as keyof PortfolioDetails] as boolean;
              return (
                <button
                  key={feature.key}
                  onClick={() => updatePortfolio({ [feature.key]: !isSelected })}
                  className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-200 text-left ${
                    isSelected
                      ? "border-[var(--color-accent-peach)] bg-[var(--color-accent-peach)]/5"
                      : "border-black/5 dark:border-white/5 bg-white dark:bg-[#161818] hover:border-black/15 dark:hover:border-white/15"
                  }`}
                >
                  <div>
                    <p className={`font-semibold ${isSelected ? "text-[var(--color-accent-peach)]" : "text-black dark:text-white"}`}>{feature.label}</p>
                    <p className="text-xs text-black/50 dark:text-white/40 mt-1">{feature.desc}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-black/40 dark:text-white/40 mb-2">{feature.price}</span>
                    <div className={`w-10 h-5 rounded-full flex items-center p-1 transition-colors ${isSelected ? "bg-[var(--color-accent-peach)]" : "bg-black/10 dark:bg-white/10"}`}>
                      <div className={`w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform ${isSelected ? "translate-x-4.5" : "translate-x-0"}`} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
