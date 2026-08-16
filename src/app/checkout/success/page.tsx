import { redirect } from "next/navigation";
import { Container } from "@/components/ui";
import { CheckCircle, Download, ShoppingBag } from "lucide-react";
import Order from "@/lib/models/Order";
import { connectDB } from "@/lib/mongodb";
import Link from "next/link";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/books");
  }

  await connectDB();
  
  // Find order by session ID
  const order = await Order.findOne({ stripeSessionId: session_id });

  if (!order) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[var(--color-bg-ivory)] px-4">
        <h1 className="font-serif text-3xl text-[var(--color-text-primary)]">Order not found</h1>
        <p className="mt-4 text-[var(--color-text-secondary)]">We couldn't locate this order.</p>
        <Link href="/books" className="mt-8 text-[var(--color-accent-peach)] hover:underline">Return to Books</Link>
      </div>
    );
  }

  // If we're mocking, auto-complete it since webhooks aren't running locally
  if (order.status === "pending" && !process.env.STRIPE_SECRET_KEY) {
     order.status = "completed";
     await order.save();
  }

  return (
    <div className="bg-[var(--color-bg-ivory)] py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl rounded-3xl border border-black/[0.04] bg-[var(--color-surface-elevated)] p-8 shadow-xl sm:p-12 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-500 mb-8">
            <CheckCircle className="h-10 w-10" />
          </div>
          
          <h1 className="font-serif text-4xl text-[var(--color-text-primary)]">Payment Successful!</h1>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
            Thank you for purchasing <span className="font-medium text-[var(--color-text-primary)]">First Build It, Then Make It Beautiful</span>.
          </p>

          <div className="mt-12 rounded-2xl bg-[var(--color-bg-ivory)] p-8 text-left">
            <h2 className="font-serif text-2xl text-[var(--color-text-primary)] mb-6">Your Digital Downloads</h2>
            
            <div className="space-y-4">
              <a 
                href={`/api/download?token=${order.downloadToken}&format=pdf`} 
                className="flex items-center justify-between rounded-xl border border-black/[0.04] bg-[var(--color-surface-elevated)] p-4 shadow-sm transition hover:border-[#D9895B]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-bg-ivory)] text-[var(--color-accent-peach)]">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--color-text-primary)]">PDF Format</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">Best for reading on desktop & tablet</p>
                  </div>
                </div>
                <Download className="text-[var(--color-accent-peach)]" size={20} />
              </a>

              <a 
                href={`/api/download?token=${order.downloadToken}&format=epub`} 
                className="flex items-center justify-between rounded-xl border border-black/[0.04] bg-[var(--color-surface-elevated)] p-4 shadow-sm transition hover:border-[#D9895B]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-bg-ivory)] text-[var(--color-accent-peach)]">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--color-text-primary)]">EPUB Format</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">Best for Kindle & Apple Books</p>
                  </div>
                </div>
                <Download className="text-[var(--color-accent-peach)]" size={20} />
              </a>
            </div>

            <p className="mt-6 text-xs text-[var(--color-text-secondary)]">
              A receipt and backup download link have been sent to your email. 
              If you have an account, this book is now saved in your <Link href="/dashboard/purchases" className="text-[var(--color-accent-peach)] hover:underline">purchases dashboard</Link>.
            </p>
          </div>
          
          <div className="mt-12">
            <Link href="/" className="text-sm font-medium text-[var(--color-text-secondary)] transition hover:text-[var(--color-text-primary)]">
              ← Return Home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
