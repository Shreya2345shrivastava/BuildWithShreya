"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useOrder } from "./OrderContext";

export function StickySummary() {
  const { form, estimatedPrice, estimatedDays, pricingMode } = useOrder();

  const getLineItems = () => {
    const items = [];
    
    // Base
    if (form.projectType) {
      let basePrice = 0;
      if (form.category === "personal_celebration") basePrice = 2999;
      if (form.category === "personal_brand") basePrice = 4999;
      if (form.category === "business") basePrice = 8999;
      
      const typeLabels: Record<string, string> = {
        birthday: "Birthday Website",
        anniversary: "Anniversary Website",
        wedding: "Wedding Website",
        portfolio: "Portfolio Setup",
        creator: "Creator Brand Setup",
        business_site: "Business Website",
        custom_story: "Custom Story Experience",
      };
      
      if (pricingMode !== "estimate") {
        items.push({ id: "base", label: typeLabels[form.projectType] || "Custom Setup", price: `₹${basePrice.toLocaleString()}` });
      } else {
        items.push({ id: "base", label: typeLabels[form.projectType] || "Custom Setup", price: "Est. Included" });
      }
    }

    // Birthday Addons
    if (form.projectType === "birthday") {
      if (form.birthday.gallerySize === "25") items.push({ id: "g25", label: "25 Photos Gallery", price: 500 });
      if (form.birthday.gallerySize === "50") items.push({ id: "g50", label: "50 Photos Gallery", price: 1000 });
      if (form.birthday.gallerySize === "100") items.push({ id: "g100", label: "100 Photos Gallery", price: 2000 });
      
      if (form.birthday.videoCount === "1-3") items.push({ id: "v1", label: "1-3 Video Memories", price: 800 });
      if (form.birthday.videoCount === "4-10") items.push({ id: "v2", label: "4-10 Video Memories", price: 1500 });
      if (form.birthday.videoCount === "unlimited") items.push({ id: "v3", label: "Unlimited Videos", price: 2500 });

      if (form.birthday.music) items.push({ id: "music", label: "Background Music", price: 300 });
      
      if (form.birthday.messagesCount === "10") items.push({ id: "m1", label: "Collect 10 Messages", price: 400 });
      if (form.birthday.messagesCount === "20") items.push({ id: "m2", label: "Collect 20 Messages", price: 800 });
      if (form.birthday.messagesCount === "unlimited") items.push({ id: "m3", label: "Unlimited Messages", price: 1500 });

      if (form.birthday.memoryTimeline) items.push({ id: "timeline", label: "Memory Timeline", price: 700 });
      if (form.birthday.countdown) items.push({ id: "countdown", label: "Live Countdown", price: 200 });
      if (form.birthday.surpriseReveal) items.push({ id: "reveal", label: "Surprise Reveal Lock", price: 600 });
    }

    // Portfolio Addons
    if (form.projectType === "portfolio") {
      if (form.portfolio.projectCount === "3") items.push({ id: "p3", label: "3 Case Studies", price: 1500 });
      if (form.portfolio.projectCount === "5") items.push({ id: "p5", label: "5 Case Studies", price: 2500 });
      if (form.portfolio.projectCount === "10") items.push({ id: "p10", label: "10 Case Studies", price: 4000 });
      if (form.portfolio.projectCount === "20") items.push({ id: "p20", label: "20 Case Studies", price: 7000 });
      
      if (form.portfolio.hasBlog) items.push({ id: "blog", label: "Blog Setup", price: 2000 });
      if (form.portfolio.hasBooking) items.push({ id: "booking", label: "Booking System", price: 1500 });
      if (form.portfolio.hasServices) items.push({ id: "services", label: "Services Page", price: 1000 });
    }

    // Business Addons
    if (form.projectType === "business_site") {
      if (form.business.hasLeadForms) items.push({ id: "leads", label: "Advanced Lead Forms", price: 1500 });
      if (form.business.hasCRM) items.push({ id: "crm", label: "CRM Integration", price: 3500 });
      if (form.business.hasWhatsApp) items.push({ id: "wa", label: "WhatsApp Chat Widget", price: 800 });
      if (form.business.hasEcommerce) items.push({ id: "store", label: "E-commerce Module", price: 8500 });
    }

    // Design Addons
    if (form.animationLevel === "premium") items.push({ id: "anim_p", label: "Premium Animations", price: pricingMode === "estimate" ? "TBD" : "₹1,500" });
    if (form.animationLevel === "luxury") items.push({ id: "anim_l", label: "Luxury Animations", price: pricingMode === "estimate" ? "TBD" : "₹3,000" });

    // Custom Story Specifics
    if (form.projectType === "custom_story") {
      if (form.customStory.qualityLevel) {
         items.push({ id: "quality", label: `Quality: ${form.customStory.qualityLevel}`, price: "TBD" });
      }
    }

    if (form.rushDelivery) items.push({ id: "rush", label: "Rush Delivery", price: pricingMode === "estimate" ? "TBD" : "₹2,500" });

    return items;
  };

  const lineItems = getLineItems();

  // Mini Mockup Variables
  const themeColors: Record<string, string> = {
    warm_beige: "#d9a48f",
    champagne: "#e6d5c3",
    soft_pink: "#f2c6cc",
    dark_luxury: "#1a1a1a",
    forest_green: "#2a3b2c",
    cream: "#f7f5f0",
  };
  const previewBgColor = themeColors[form.colorMood] || "#e5e5e5";
  const isDark = form.colorMood === "dark_luxury" || form.colorMood === "forest_green";

  return (
    <div className="sticky top-32 flex flex-col gap-6">
      
      {/* Live Preview Card */}
      <div className="bg-white dark:bg-[#161818] border border-black/8 dark:border-white/8 rounded-3xl overflow-hidden shadow-lg shadow-black/5 dark:shadow-white/5 transition-all">
        <div className="p-4 border-b border-black/5 dark:border-white/5 flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          <span className="text-[10px] font-medium text-black/40 dark:text-white/40 ml-2 uppercase tracking-widest">
            Live Preview
          </span>
        </div>
        
        {/* Mockup Screen */}
        <div 
          className="relative h-48 w-full overflow-hidden transition-colors duration-500 ease-in-out p-6 flex flex-col justify-center items-center text-center"
          style={{ backgroundColor: previewBgColor }}
        >
          {form.projectType ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              key={form.projectType}
            >
              <h4 className={`font-serif text-2xl mb-2 ${isDark ? "text-white" : "text-black"}`}>
                {form.projectType === "birthday" && form.birthday.personName ? `${form.birthday.personName}'s ${form.birthday.age}th` : 
                 form.projectType === "portfolio" && form.portfolio.profession ? `${form.portfolio.profession} Portfolio` :
                 form.projectType === "business_site" && form.business.businessName ? form.business.businessName :
                 "Your New Website"}
              </h4>
              <div className={`text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full ${isDark ? "bg-white/10 text-white/80" : "bg-black/5 text-black/60"}`}>
                {form.designStyle || "Style Pending"}
              </div>
            </motion.div>
          ) : (
            <div className="text-black/30 dark:text-white/30 text-sm font-medium italic">
              Make a selection to preview
            </div>
          )}
        </div>
      </div>

      {/* Pricing Summary */}
      <div className="bg-white dark:bg-[#161818] border border-black/8 dark:border-white/8 rounded-3xl p-7 shadow-lg shadow-black/5 dark:shadow-white/5">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent-peach)] mb-6">
          Project Breakdown
        </h3>

        {lineItems.length === 0 ? (
          <p className="text-sm text-black/40 dark:text-white/40 italic mb-8">
            Select a package to see pricing...
          </p>
        ) : (
          <div className="space-y-3 mb-8">
            <AnimatePresence initial={false}>
              {lineItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  exit={{ opacity: 0, x: 10, height: 0 }}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-black/60 dark:text-white/60 font-medium">
                    {item.label}
                  </span>
                  <span className="text-black dark:text-white font-semibold tabular-nums">
                    {typeof item.price === "number" ? `₹${item.price.toLocaleString()}` : item.price}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        <div className="pt-6 border-t border-black/8 dark:border-white/8">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-bold text-black dark:text-white">Estimated Total</span>
            
            {pricingMode === "estimate" ? (
              <motion.div 
                key={form.customStory.qualityLevel}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-right"
              >
                {form.customStory.qualityLevel === "signature" ? (
                  <>
                    <div className="text-xl font-serif font-bold dark:text-white text-[var(--color-accent-peach)]">Custom Quote</div>
                    <div className="text-[10px] uppercase tracking-wider text-black/40 dark:text-white/40 mt-1">Proposal Required</div>
                  </>
                ) : (
                  <>
                    <div className="text-xl font-serif font-bold dark:text-white text-[var(--color-accent-peach)]">₹2,999 – ₹14,999+</div>
                    <div className="text-[10px] uppercase tracking-wider text-black/40 dark:text-white/40 mt-1">Depending on complexity</div>
                  </>
                )}
              </motion.div>
            ) : (
              <motion.span 
                key={estimatedPrice}
                initial={{ scale: 1.1, color: "var(--color-accent-peach)" }}
                animate={{ scale: 1, color: "var(--color-text-primary)" }}
                className="text-3xl font-serif font-bold dark:text-white tabular-nums"
              >
                ₹{estimatedPrice.toLocaleString()}
              </motion.span>
            )}
          </div>
          
          <div className="flex justify-between items-center text-xs font-semibold text-black/50 dark:text-white/40 bg-black/5 dark:bg-white/5 p-3 rounded-xl mt-4">
            <span className="uppercase tracking-wider">Est. Delivery</span>
            <span className="text-[var(--color-accent-peach)]">{estimatedDays > 0 ? `${estimatedDays} Days` : "TBD"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
