import Order from "@/lib/models/Order";
import { connectDB } from "@/lib/mongodb";
import { Download, BookOpen } from "lucide-react";
import Image from "next/image";

export default async function PurchasesPage() {
  await connectDB();
  
  // In a real app with authentication, you would filter by the logged-in user's email or ID.
  // We'll mock the user email here for demonstration.
  const userEmail = "mock@example.com"; 
  
  // Fetch only completed orders
  const purchases = await Order.find({ 
    customerEmail: userEmail,
    status: "completed"
  }).sort({ createdAt: -1 });

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-serif text-4xl text-[var(--color-text-primary)]">My Library</h1>
        <p className="mt-2 text-lg text-[var(--color-text-secondary)]">Books and digital products you've purchased.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {purchases.map((purchase) => (
          <div key={purchase._id} className="flex flex-col overflow-hidden rounded-2xl border border-black/[0.04] bg-[var(--color-surface-elevated)] dark:bg-[#242b28] shadow-sm transition-all hover:shadow-md">
             <div className="relative aspect-[3/4] w-full bg-[var(--color-bg-ivory)] dark:bg-[#131715] p-6 flex justify-center items-center">
                 <div className="relative h-full w-full max-w-[200px] overflow-hidden rounded-lg shadow-lg">
                    {/* Hardcoded image for now, normally fetched from the bookId relation */}
                   <Image 
                     src="/images/books/book-cover.jpeg" 
                     alt="Book Cover" 
                     fill 
                     className="object-cover"
                   />
                 </div>
             </div>
             
             <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="font-serif text-xl text-[var(--color-text-primary)]">First Build It, Then Make It Beautiful</h3>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">Purchased on {new Date(purchase.createdAt).toLocaleDateString()}</p>
                </div>
                
                <div className="mt-6 flex flex-col gap-3">
                  <a href={`/api/download?token=${purchase.downloadToken}&format=pdf`} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-bg-ivory)] dark:bg-[#131715] px-4 py-2.5 text-sm font-medium text-[var(--color-accent-peach)] transition-colors hover:bg-[#F2EAE1]">
                    <Download size={16} /> Download PDF
                  </a>
                  <a href={`/api/download?token=${purchase.downloadToken}&format=epub`} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-bg-ivory)] dark:bg-[#131715] px-4 py-2.5 text-sm font-medium text-[var(--color-accent-peach)] transition-colors hover:bg-[#F2EAE1]">
                    <Download size={16} /> Download EPUB
                  </a>
                </div>
             </div>
          </div>
        ))}

        {purchases.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-black/[0.04] bg-[var(--color-surface-elevated)] dark:bg-[#242b28] py-24 text-center shadow-sm">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-bg-ivory)] dark:bg-[#131715] text-[var(--color-accent-peach)]">
              <BookOpen size={32} />
            </div>
            <h3 className="font-serif text-2xl text-[var(--color-text-primary)]">Your library is empty</h3>
            <p className="mt-2 text-[var(--color-text-secondary)]">You haven't purchased any books yet.</p>
            <a href="/books" className="mt-6 rounded-full bg-[#3A332D] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--color-accent-peach)]">
              Browse Books
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
