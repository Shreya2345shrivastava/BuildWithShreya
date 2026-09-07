export const BASE_PRICES: Record<string, number> = {
  "Birthday Website": 2999,
  "Anniversary Website": 3499,
  "Wedding Website": 5999,
  "Portfolio Website": 4999,
  "Creator Website": 5999,
  "Business Website": 8999,
  "Landing Page": 3999,
  "Store Website": 12999,
  "Custom Project": 0,
};

export const FEATURE_PRICES: Record<string, number> = {
  "Photo Gallery": 500,
  "Video Gallery": 600,
  "Timeline": 400,
  "Memory Wall": 450,
  "Guest Messages": 300,
  "Countdown Timer": 300,
  "RSVP": 350,
  "Surprise Reveal": 500,
  "Password Protection": 250,
  "Custom Domain Setup": 200,
  "Contact Form": 300,
  "Testimonials": 250,
  "Guest Book": 300,
  "Interactive Story": 550,
  "Gift Registry": 400,
  "Mobile Optimization": 600,
  "Social Media Links": 200,
  "Analytics": 300,
  "Blog Section": 800,
  "E-commerce": 1500,
};

export function calculatePrice(data: any): { breakdown: Record<string, number>; total: number } {
  const breakdown: Record<string, number> = {};
  const type: string = data.websiteType || "Custom Project";
  const base = BASE_PRICES[type] ?? 0;
  if (base) {
    breakdown[type] = base;
  }
  const selectedFeatures: string[] = data.features ?? [];
  selectedFeatures.forEach((feat) => {
    const price = FEATURE_PRICES[feat] ?? 0;
    if (price) {
      breakdown[feat] = price;
    }
  });
  if (data.isRush) {
    const rushFee = Math.round(base * 0.2);
    if (rushFee) breakdown["Rush Fee (20%)"] = rushFee;
  }
  const total = Object.values(breakdown).reduce((sum, v) => sum + v, 0);
  return { breakdown, total };
}
