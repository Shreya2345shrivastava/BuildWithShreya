import Image from "next/image";
import { Container } from "@/components/ui";
import { Check, Star } from "lucide-react";
import { CheckoutButton } from "@/components/books/CheckoutButton";

export default async function BookDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Hardcoded for the specific featured book.
  const book = {
    id: "first-build-it-then-make-it-beautiful",
    title: "First Build It, Then Make It Beautiful",
    subtitle: "A gentle guide for creators, dreamers & doers.",
    description: "This book will help you move from overthinking to action, from waiting to building, and from surviving to creating a life you're proud of. Inside, you'll find actionable frameworks, reflection exercises, and a system for sustainable creation without burnout.",
    author: "Shreya Shrivastava",
    price: 29.99,
    coverImage: "/images/books/book-cover.jpeg",
    benefits: [
      "Practical guidance on overcoming perfectionism",
      "Reflection exercises at the end of each chapter",
      "Systems for building consistent habits",
      "The mindset shift required to thrive as a modern creator"
    ]
  };

  return (
    <div className="bg-[var(--color-bg-ivory)] pb-24 pt-12 sm:pt-20">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-start">
          
          {/* Left: Sticky Image */}
          <div className="relative flex justify-center lg:sticky lg:top-24">
            <div className="relative aspect-[3/4] w-full max-w-[480px] overflow-hidden rounded-2xl shadow-2xl">
              <Image 
                src={book.coverImage} 
                alt={book.title} 
                fill 
                sizes="(max-width: 1024px) 100vw, 500px" 
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex gap-1 text-amber-500">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <span className="text-sm font-medium text-[#8A837D]">(4.9/5 from 120+ reviews)</span>
            </div>

            <h1 className="font-serif text-4xl leading-[1.1] tracking-tight text-[#3A332D] sm:text-5xl">
              {book.title.split(',')[0]},<br/>
              <span className="font-display italic text-[#D9895B]">{book.title.split(',')[1]?.trim() || book.title}</span>
            </h1>
            
            <p className="mt-6 text-sm font-semibold tracking-widest text-[#8A837D] uppercase">
              {book.subtitle}
            </p>

            <div className="mt-8 prose prose-stone text-[#8A837D]">
              <p className="text-lg leading-relaxed">{book.description}</p>
            </div>

            <div className="mt-10 rounded-2xl border border-black/[0.04] bg-white p-8 shadow-sm">
              <h3 className="font-serif text-xl text-[#3A332D] mb-6">What you'll learn:</h3>
              <ul className="space-y-4">
                {book.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-4 text-[#5A534D]">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FCF8F2] text-[#D9895B]">
                      <Check className="h-4 w-4 stroke-[3]" />
                    </div>
                    <span className="leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sticky Mobile Checkout Bar / Desktop Standard Button */}
            <div className="mt-12">
               <CheckoutButton bookId={book.id} price={book.price} />
               <p className="mt-4 text-center text-xs text-[#8A837D] sm:text-left">
                 Secure payment via Stripe. Instant digital download (PDF, EPUB).
               </p>
            </div>
            
          </div>
        </div>
      </Container>
    </div>
  );
}