import { Metadata } from "next";
import { OrderProvider } from "@/components/order/OrderContext";
import { OrderWizard } from "@/components/order/OrderWizard";

export const metadata: Metadata = {
  title: "Custom Website Ordering | BuildWithShreya",
  description:
    "Commission a premium custom website with transparent pricing, instant estimates and a smooth multi‑step wizard.",
};

export default function OrderPage() {
  return (
    <OrderProvider>
      <main className="min-h-screen bg-[var(--color-bg-ivory)] dark:bg-[#131715] text-[var(--color-text-primary)] pt-32 pb-12 px-4 lg:px-12">
        <OrderWizard />
      </main>
    </OrderProvider>
  );
}
