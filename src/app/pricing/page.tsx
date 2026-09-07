import { Metadata } from "next";
import { Footer } from "@/components/footer/Footer";
import { Button } from "@/components/ui";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing | BuildWithShreya",
  description: "Simple, transparent pricing for digital products and custom websites.",
};

const TIERS = [
  {
    name: "Digital Products",
    price: "₹499 - ₹4,999",
    description: "Books, resources, and Notion systems to build faster.",
    features: [
      "Instant lifetime access",
      "Source files included",
      "Regular updates",
      "Community access",
    ],
    cta: "Explore Shop",
    href: "/shop",
    isPopular: false,
  },
  {
    name: "Website Templates",
    price: "₹1,999 - ₹4,999",
    description: "Ready-to-launch templates for creators and businesses.",
    features: [
      "Fully responsive design",
      "SEO optimized structure",
      "Easy customization",
      "Video setup guides",
      "Figma files included",
    ],
    cta: "View Templates",
    href: "/shop#mini-websites",
    isPopular: true,
  },
  {
    name: "Custom Websites",
    price: "₹2,999 - ₹14,999+",
    description: "Bespoke design and development tailored to your brand.",
    features: [
      "Custom UI/UX design",
      "Bespoke animations",
      "Content strategy",
      "Performance optimization",
      "Priority email support",
      "14-Day revision period",
    ],
    cta: "Start Configurator",
    href: "/custom-websites",
    isPopular: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <main className="min-h-screen bg-[var(--color-bg-ivory)] dark:bg-[#131715] pt-32 pb-24 px-6 selection:bg-[#D9A38F] selection:text-[#F6F2EE] dark:selection:text-[#0B1110]">
        <div className="max-w-[1200px] mx-auto w-full">
          
          <div className="text-center mb-20">
            <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-black dark:text-white leading-[1.05] tracking-tight mb-6">
              Simple, transparent pricing.
            </h1>
            <p className="text-lg text-black/60 dark:text-white/60 max-w-2xl mx-auto">
              From instant digital downloads to bespoke custom websites, find the perfect solution for your creative project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TIERS.map((tier) => (
              <div 
                key={tier.name}
                className={`relative flex flex-col p-8 rounded-3xl ${tier.isPopular ? "bg-white dark:bg-[#1A1D1C] border-2 border-[var(--color-accent-peach)] shadow-[0_20px_60px_rgba(217,164,143,0.15)]" : "bg-white dark:bg-[#161818] border border-black/10 dark:border-white/10 shadow-sm"} transition-transform duration-300 hover:-translate-y-2`}
              >
                {tier.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--color-accent-peach)] text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-xl font-semibold text-black dark:text-white mb-2">{tier.name}</h3>
                <p className="text-sm text-black/60 dark:text-white/60 mb-6 min-h-[40px]">{tier.description}</p>
                
                <div className="text-3xl font-serif font-bold text-[var(--color-accent-peach)] mb-8">
                  {tier.price}
                </div>

                <div className="flex flex-col gap-4 mb-8 flex-grow">
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-accent-peach)]/10 flex items-center justify-center text-[var(--color-accent-peach)]">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="text-sm font-medium text-black/80 dark:text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  href={tier.href} 
                  variant={tier.isPopular ? "primary" : "secondary"}
                  className="w-full justify-center py-3"
                  rounded={false}
                >
                  {tier.cta}
                </Button>
              </div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
