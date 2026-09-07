"use client";

import { useOrder, type BusinessDetails } from "./OrderContext";

export function ConfiguratorBusiness() {
  const { form, updateBusiness } = useOrder();
  const d = form.business;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="font-serif text-3xl sm:text-5xl text-black dark:text-white leading-tight">
          Business Details
        </h2>
        <p className="mt-3 text-lg text-black/60 dark:text-white/50 max-w-lg">
          Configure the core features for your company website to drive growth.
        </p>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-3xl bg-white dark:bg-[#161818] border border-black/5 dark:border-white/5">
        <div className="space-y-2 sm:col-span-2">
          <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)] dark:text-white/40">Business Name</label>
          <input 
            type="text" 
            value={d.businessName} 
            onChange={(e) => updateBusiness({ businessName: e.target.value })}
            placeholder="e.g. Acme Corp"
            className="w-full bg-transparent border-b-2 border-black/10 dark:border-white/10 px-0 py-2 text-lg text-black dark:text-white placeholder-black/20 dark:placeholder-white/20 outline-none focus:border-[var(--color-accent-peach)] transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)] dark:text-white/40">Industry</label>
          <input 
            type="text" 
            value={d.industry} 
            onChange={(e) => updateBusiness({ industry: e.target.value })}
            placeholder="e.g. Real Estate"
            className="w-full bg-transparent border-b-2 border-black/10 dark:border-white/10 px-0 py-2 text-lg text-black dark:text-white placeholder-black/20 dark:placeholder-white/20 outline-none focus:border-[var(--color-accent-peach)] transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)] dark:text-white/40">Core Service</label>
          <input 
            type="text" 
            value={d.services} 
            onChange={(e) => updateBusiness({ services: e.target.value })}
            placeholder="What do you sell?"
            className="w-full bg-transparent border-b-2 border-black/10 dark:border-white/10 px-0 py-2 text-lg text-black dark:text-white placeholder-black/20 dark:placeholder-white/20 outline-none focus:border-[var(--color-accent-peach)] transition-colors"
          />
        </div>
      </div>

      {/* Toggle Features */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">Growth & Operations Modules</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { key: "hasLeadForms", label: "Advanced Lead Forms", price: "+₹1,500", desc: "Multi-step logic & validation" },
            { key: "hasCRM", label: "CRM Integration", price: "+₹3,500", desc: "Connect with HubSpot, Salesforce, etc." },
            { key: "hasWhatsApp", label: "WhatsApp Widget", price: "+₹800", desc: "Direct chat on your website" },
            { key: "hasEcommerce", label: "E-Commerce Setup", price: "+₹8,500", desc: "Full store with cart & payments" },
          ].map((feature) => {
            const isSelected = d[feature.key as keyof BusinessDetails] as boolean;
            return (
              <button
                key={feature.key}
                onClick={() => updateBusiness({ [feature.key]: !isSelected })}
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
  );
}
