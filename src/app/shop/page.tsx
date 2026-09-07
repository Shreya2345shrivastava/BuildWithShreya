import { Metadata } from "next";

import { ShopHero } from "@/components/products/ShopHero";
import { ShopCatalog } from "@/components/shop/ShopCatalog";
import { RecentlyViewed } from "@/components/shop/RecentlyViewed";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Shop Products | BuildWithShreya",
  description:
    "Books, systems, templates, and creator resources designed to help you build faster and work smarter.",
};

export default function ProductsPage() {
  return (
    <>
      <main className="min-h-screen bg-[var(--color-bg-ivory)] dark:bg-[#131715] text-[var(--color-text-primary)]">
        <ShopHero />
        <ShopCatalog />
        <RecentlyViewed />
      </main>
      <Footer />
    </>
  );
}
