"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui";

export function CheckoutButton({ bookId, price }: { bookId: string; price: number }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, price }),
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe
      } else {
        setError(data.error || "Checkout is currently unavailable.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setError("Unable to start checkout. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        onClick={handleCheckout}
        loading={loading}
        disabled={loading}
        size="lg"
        leftIcon={<ShoppingCart className="h-5 w-5" />}
        className="w-full sm:w-auto px-8 py-4 text-base bg-[#3A332D] text-white hover:bg-[var(--color-accent-peach)]"
      >
        {loading ? "Processing..." : `Buy Now for $${price}`}
      </Button>
      {error && <p className="text-center text-sm text-red-500">{error}</p>}
    </div>
  );
}
