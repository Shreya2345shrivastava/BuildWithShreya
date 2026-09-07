import { ReactNode } from "react";
import { ShopProvider } from "@/components/shop/ShopProvider";
import { QuickViewModal } from "@/components/shop/QuickViewModal";
import { GlobalCartDrawer } from "@/components/shop/GlobalCartDrawer"; // I will create a small wrapper

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <ShopProvider>
      {children}
      <QuickViewModal />
      <GlobalCartDrawer />
    </ShopProvider>
  );
}
