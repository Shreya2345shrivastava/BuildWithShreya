import { Metadata } from "next";

import { MarketplaceGrid } from "@/components/marketplace/MarketplaceGrid";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Website Templates | BuildWithShreya",
  description: "Ready-to-launch website templates for creators, brands, and businesses.",
};

export default function WebsiteTemplatesPage() {
  return (
    <>
      <main className="min-h-screen bg-[var(--color-bg-ivory)] dark:bg-[#131715] text-[var(--color-text-primary)]">
        <MarketplaceGrid />
      </main>
      <Footer />
    </>
  );
}