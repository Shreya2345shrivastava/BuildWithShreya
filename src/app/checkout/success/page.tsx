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
        <h1 className="font-serif text-3xl text-[#3A332D]">Order not found</h1>
        <p className="mt-4 text-[#8A837D]">We couldn't locate this order.</p>
        <Link href="/books" className="mt-8 text-[#D9895B] hover:underline">Return to Books</Link>
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
        <div className="mx-auto max-w-2xl rounded-3xl border border-black/[0.04] bg-white p-8 shadow-xl sm:p-12 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-500 mb-8">
            <CheckCircle className="h-10 w-10" />
          </div>
          
          <h1 className="font-serif text-4xl text-[#3A332D]">Payment Successful!</h1>
          <p className="mt-4 text-lg text-[#8A837D]">
            Thank you for purchasing <span className="font-medium text-[#3A332D]">First Build It, Then Make It Beautiful</span>.
          </p>

          <div className="mt-12 rounded-2xl bg-[#FCF8F2] p-8 text-left">
            <h2 className="font-serif text-2xl text-[#3A332D] mb-6">Your Digital Downloads</h2>
            
            <div className="space-y-4">
              <a 
                href={`/api/download?token=${order.downloadToken}&format=pdf`} 
                className="flex items-center justify-between rounded-xl border border-black/[0.04] bg-white p-4 shadow-sm transition hover:border-[#D9895B]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FCF8F2] text-[#D9895B]">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-[#3A332D]">PDF Format</p>
                    <p className="text-xs text-[#8A837D]">Best for reading on desktop & tablet</p>
                  </div>
                </div>
                <Download className="text-[#D9895B]" size={20} />
              </a>

              <a 
                href={`/api/download?token=${order.downloadToken}&format=epub`} 
                className="flex items-center justify-between rounded-xl border border-black/[0.04] bg-white p-4 shadow-sm transition hover:border-[#D9895B]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FCF8F2] text-[#D9895B]">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-[#3A332D]">EPUB Format</p>
                    <p className="text-xs text-[#8A837D]">Best for Kindle & Apple Books</p>
                  </div>
                </div>
                <Download className="text-[#D9895B]" size={20} />
              </a>
            </div>

            <p className="mt-6 text-xs text-[#8A837D]">
              A receipt and backup download link have been sent to your email. 
              If you have an account, this book is now saved in your <Link href="/dashboard/purchases" className="text-[#D9895B] hover:underline">purchases dashboard</Link>.
            </p>
          </div>
          
          <div className="mt-12">
            <Link href="/" className="text-sm font-medium text-[#8A837D] transition hover:text-[#3A332D]">
              ← Return Home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
