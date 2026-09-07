import { Metadata } from "next";
import { Footer } from "@/components/footer/Footer";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Your Cart | BuildWithShreya",
  description: "Review your digital products and complete your purchase.",
};

export default function CartPage() {
  return (
    <>
      <main className="min-h-screen bg-[var(--color-bg-ivory)] dark:bg-[#131715] pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 mb-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center">
          <svg className="w-10 h-10 text-black/20 dark:text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        
        <h1 className="font-serif text-3xl sm:text-4xl text-black dark:text-white mb-4">
          Your cart is empty
        </h1>
        
        <p className="text-black/60 dark:text-white/60 mb-8 max-w-md">
          Looks like you haven't added any digital products, templates, or resources to your cart yet.
        </p>

        <Button href="/shop" size="lg">
          Explore the Shop &rarr;
        </Button>
      </main>
      <Footer />
    </>
  );
}
