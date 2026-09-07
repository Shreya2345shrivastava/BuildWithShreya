import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Zap, Repeat, ExternalLink, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "SaaS Starter Kit | BuildWithShreya",
  description: "A complete, high-converting landing page for SaaS applications.",
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // In a real app, fetch product by ID
  const product = {
    title: "SaaS Starter Kit",
    price: "$49",
    category: "Template",
    description: "Launch your SaaS in days, not weeks. This premium Framer template is meticulously designed for high conversion, beautiful typography, and seamless user experience.",
    features: [
      "Fully responsive on all devices",
      "Built-in light/dark mode",
      "SEO optimized structure",
      "No-code CMS integration",
      "Figma design file included"
    ],
    image: "/images/previews/all/mini-website.jpg",
    gallery: [
      "/images/previews/all/mini-website.jpg",
      "/images/previews/all/mini-website.jpg"
    ]
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg-ivory)] dark:bg-[#131715] pt-28 pb-24">
      <div className="max-w-[1200px] mx-auto px-6 w-full">
        
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center">
          <Link href="/shop" className="text-sm font-semibold text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Shop
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 relative">
          
          {/* Left Column: Content */}
          <div className="w-full lg:w-[65%] flex flex-col gap-12">
            
            {/* Hero Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2 relative aspect-[16/9] md:aspect-[4/3] rounded-2xl overflow-hidden bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                <Image src={product.image} alt={product.title} fill className="object-cover" />
              </div>
              {product.gallery.map((img, i) => (
                <div key={i} className="relative aspect-video rounded-xl overflow-hidden bg-black/5 dark:bg-white/5 hidden md:block">
                  <Image src={img} alt={`${product.title} gallery ${i+1}`} fill className="object-cover" />
                </div>
              ))}
            </div>

            {/* Main Description */}
            <section className="prose prose-lg prose-slate dark:prose-invert max-w-none">
              <h2 className="font-serif text-3xl mb-6">Overview</h2>
              <p className="text-black/70 dark:text-white/70 leading-relaxed mb-6">
                {product.description} Built for founders who want to stop tweaking CSS and start selling. 
                This template includes everything from hero sections, pricing tables, to testimonial sliders—all engineered for maximum trust and conversion.
              </p>

              {/* Template Live Preview (Phase 4) */}
              {product.category === "Template" && (
                <div className="my-10 p-8 rounded-2xl bg-[#F6F2EE] dark:bg-[#1C201E] border border-black/5 dark:border-white/5 flex flex-col items-center text-center">
                  <h3 className="font-serif text-2xl mb-3">See it in action</h3>
                  <p className="text-black/60 dark:text-white/60 mb-6 max-w-md">Experience the template exactly as your future customers will. Opens in a clean, brand-free window.</p>
                  <Button href="#" target="_blank" size="lg" className="px-8 flex items-center gap-2 bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90">
                    View Live Preview
                    <ExternalLink size={18} />
                  </Button>
                </div>
              )}

              <h3 className="font-serif text-2xl mb-6 mt-12">What's Included</h3>
              <ul className="space-y-4 not-prose mb-12">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 p-1 rounded-full bg-[var(--color-accent-peach)]/10 text-[var(--color-accent-peach)]">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-lg text-black/80 dark:text-white/80">{feat}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Column: Sticky Purchase Panel (Phase 5) */}
          <div className="w-full lg:w-[35%] relative">
            <div className="sticky top-28 bg-white dark:bg-[#1C201E] rounded-3xl p-8 shadow-xl shadow-black/5 dark:shadow-white/5 border border-black/10 dark:border-white/10 flex flex-col">
              
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-[var(--color-accent-peach)] mb-3">
                {product.category}
              </span>
              
              <h1 className="font-serif text-3xl md:text-4xl text-[#0B1110] dark:text-[#F6F2EE] leading-tight mb-2">
                {product.title}
              </h1>
              
              <div className="text-3xl font-semibold text-[#0B1110] dark:text-[#F6F2EE] mb-8">
                {product.price}
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3 mb-8">
                <Button className="w-full justify-center py-4 text-base shadow-lg shadow-[var(--color-accent-peach)]/20 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  Buy Now
                </Button>
                <Button variant="secondary" className="w-full justify-center py-4 text-base border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5">
                  Add to Cart
                </Button>
              </div>

              {/* Trust Layer (Phase 12) */}
              <div className="flex flex-col gap-4 pt-6 border-t border-black/10 dark:border-white/10">
                <div className="flex items-center gap-3 text-sm text-black/70 dark:text-white/70">
                  <Zap size={18} className="text-yellow-500" />
                  <span>Instant Access & Download</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-black/70 dark:text-white/70">
                  <Repeat size={18} className="text-blue-500" />
                  <span>Lifetime Updates Included</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-black/70 dark:text-white/70">
                  <ShieldCheck size={18} className="text-green-500" />
                  <span>Secure Checkout via Stripe</span>
                </div>
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
