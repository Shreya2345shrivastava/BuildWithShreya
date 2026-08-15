import Image from "next/image";
import { Container } from "@/components/ui";
import { Check, Star, Sparkles, BookOpen } from "lucide-react";
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
    <main className="bg-white min-h-screen">
       <section className="relative overflow-hidden pt-40 pb-24 sm:pt-48">
          {/* Ambient Background Glows */}
          <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-[#FCF8F2] to-transparent opacity-80" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D9895B]/10 rounded-full blur-[120px] mix-blend-multiply" />
          <div className="absolute top-40 left-0 w-[400px] h-[400px] bg-[#FDF8F3] rounded-full blur-[100px]" />

          <Container className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
              
              {/* Left Column: 3D Book Cover (lg:col-span-5) */}
              <div className="lg:col-span-5 relative flex justify-center lg:sticky lg:top-32 perspective-1000 group">
                {/* Premium display pedestal */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#D9895B]/10 to-transparent rounded-[3rem] transform -rotate-3 scale-[1.02] -z-10 blur-xl opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FCF8F2] to-transparent rounded-[3rem] transform rotate-1 scale-[1.05] -z-10 border border-white/50" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(217,137,91,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(217,137,91,0.03)_1px,transparent_1px)] bg-[size:24px_24px] rounded-[3rem] -z-10" />
                
                <div className="relative aspect-[3/4] w-full max-w-[420px] shadow-[0_40px_80px_rgba(32,25,19,0.15)] rounded-r-[1rem] rounded-l-sm overflow-hidden transform transition-all duration-700 ease-out border border-white/50 group-hover:-translate-y-2 group-hover:shadow-[0_50px_100px_rgba(217,137,91,0.2)]">
                  {/* Spine effect */}
                  <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/30 via-white/10 to-transparent z-20 shadow-[inset_1px_0_0_rgba(255,255,255,0.4)]" />
                  <div className="absolute inset-y-0 left-4 w-px bg-black/10 z-20" />
                  
                  {/* Cover */}
                  <Image 
                    src={book.coverImage} 
                    alt={book.title} 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 500px" 
                    className="object-cover relative z-10"
                    priority
                  />
                  {/* Glossy Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 z-20 pointer-events-none" />
                </div>
              </div>

              {/* Right Column: Content (lg:col-span-7) */}
              <div className="lg:col-span-7 flex flex-col pt-8 lg:pt-0">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-[#FCF8F2] rounded-full border border-[#E8DED5]/50">
                    <BookOpen size={12} className="text-[#D9895B]" />
                    <span className="text-[10px] font-bold tracking-[0.2em] text-[#D9895B] uppercase">Digital Ebook</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                    <Star size={12} fill="currentColor" />
                    <span className="text-[10px] font-bold tracking-widest text-amber-600">4.9/5 (120+ REVIEWS)</span>
                  </div>
                </div>

                <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-[#3A332D] sm:text-6xl lg:text-7xl mb-6">
                  {book.title.split(',')[0]},<br className="hidden sm:block" />
                  <span className="font-display italic text-[#D9895B] sm:pl-4">{book.title.split(',')[1]?.trim() || book.title}</span>
                </h1>
                
                <p className="text-sm font-bold tracking-[0.2em] text-[#8A837D] uppercase mb-8 pb-8 border-b border-[#E8DED5]/60 leading-relaxed">
                  {book.subtitle}
                </p>

                <div className="prose prose-lg prose-stone text-[#5A534D] mb-12">
                  <p className="leading-relaxed font-light text-xl sm:text-2xl">{book.description}</p>
                </div>

                {/* Premium "What you'll learn" Section */}
                <div className="relative rounded-[2.5rem] border border-[#E8DED5]/60 bg-gradient-to-br from-white to-[#FDF8F3] p-8 sm:p-10 shadow-[0_20px_40px_rgba(217,137,91,0.06)] mb-12 overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#D9895B]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="flex items-center gap-3 mb-8 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-[#FCF8F2] flex items-center justify-center border border-[#D9895B]/20 shadow-sm">
                       <Sparkles size={18} className="text-[#D9895B]" />
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#3A332D]">Inside the book:</h3>
                  </div>
                  
                  <ul className="space-y-5 relative z-10">
                    {book.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-4 text-[#5A534D]">
                        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white shadow-sm border border-[#E8DED5] text-[#D9895B]">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                        <span className="leading-relaxed text-[1.05rem]">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing & Checkout Area */}
                <div className="flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-[2rem] shadow-[0_15px_40px_rgba(32,25,19,0.08)] border border-[#E8DED5] relative z-10">
                   <div className="flex flex-col text-center sm:text-left min-w-[120px]">
                     <span className="text-[10px] font-bold text-[#8A837D] uppercase tracking-widest mb-1">Total Price</span>
                     <span className="font-serif text-4xl text-[#3A332D]">${book.price}</span>
                   </div>
                   <div className="hidden sm:block w-px h-16 bg-[#E8DED5]" />
                   <div className="flex-1 w-full flex flex-col justify-center">
                     <CheckoutButton bookId={book.id} price={book.price} />
                     <div className="mt-4 flex items-center justify-center sm:justify-start gap-4 opacity-70">
                        <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-[#8A837D]">
                          <Check size={10} strokeWidth={3} className="text-[#D9895B]" />
                          Instant Download
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-[#8A837D]">
                          <Check size={10} strokeWidth={3} className="text-[#D9895B]" />
                          Secure Payment
                        </div>
                     </div>
                   </div>
                </div>
                
              </div>
            </div>
          </Container>
       </section>
    </main>
  );
}