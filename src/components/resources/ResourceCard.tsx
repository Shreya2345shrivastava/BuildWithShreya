import Link from "next/link";
import { ArrowUpRight, Sparkles, FileText, Target, BookOpen } from "lucide-react";

type ResourceCardProps = {
  slug: string;
  title: string;
  description: string;
  type: string;
  price: string;
  featured?: boolean;
};

export function ResourceCard({
  slug,
  title,
  description,
  type,
  price,
  featured,
}: ResourceCardProps) {
  
  // Dynamic theming based on resource type for high contrast premium feel
  const t = type.toLowerCase();
  const theme = t.includes('tracker') 
    ? { bg: 'from-[#D9895B] to-[#B86B42]', icon: Target, shadow: 'shadow-[#D9895B]/40', badge: 'bg-[#D9895B] text-white', accent: 'text-[#D9895B]' }
    : t.includes('planner')
    ? { bg: 'from-[#6B705C] to-[#4A4E40]', icon: BookOpen, shadow: 'shadow-[#6B705C]/40', badge: 'bg-[#6B705C] text-white', accent: 'text-[#6B705C]' }
    : { bg: 'from-[#8A837D] to-[#5A5551]', icon: FileText, shadow: 'shadow-[#8A837D]/40', badge: 'bg-[#8A837D] text-white', accent: 'text-[#8A837D]' };

  const Icon = theme.icon;

  return (
    <article className="group relative rounded-[2rem] border border-[#E8DED5]/60 bg-white shadow-[0_15px_40px_rgba(32,25,19,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(32,25,19,0.1)] flex flex-col h-full">
      
      {/* High Contrast Image Area */}
      <div className={`relative aspect-[4/3] w-full rounded-t-[2rem] overflow-hidden bg-gradient-to-br ${theme.bg} p-6 flex flex-col items-center justify-center`}>
        {/* Premium Grid Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Soft Vignette */}
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)]" />
        
        {/* High Fidelity Floating Document Mockup */}
        <div className={`relative z-10 w-36 h-48 bg-white rounded-2xl shadow-2xl ${theme.shadow} flex flex-col items-center justify-center transform group-hover:scale-[1.05] group-hover:-rotate-3 group-hover:-translate-y-2 transition-all duration-700 ease-out`}>
           {/* Document Detailing */}
           <div className="absolute top-5 left-5 right-5 h-1.5 bg-gray-100 rounded-full" />
           <div className="absolute top-9 left-5 w-1/2 h-1.5 bg-gray-100 rounded-full" />
           
           <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mt-6 border border-gray-100">
             <Icon className={theme.accent} size={28} strokeWidth={1.5} />
           </div>
           
           <div className="absolute bottom-5 right-5 flex gap-1.5">
             <div className="w-2 h-2 rounded-full bg-gray-200" />
             <div className="w-2 h-2 rounded-full bg-gray-200" />
           </div>
        </div>

        {featured && (
          <div className="absolute top-4 right-4 rounded-full bg-white/20 backdrop-blur-md px-4 py-1.5 text-[10px] font-bold tracking-widest text-white border border-white/30 shadow-sm flex items-center gap-1.5 z-20">
            <Sparkles size={10} className="animate-pulse" />
            FEATURED
          </div>
        )}
      </div>

      {/* Content Area with overlapping negative margin for premium 3D feel */}
      <div className="px-8 pt-8 pb-8 relative z-20 bg-white rounded-b-[2rem] flex flex-col flex-grow">
        <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${theme.accent} mb-3`}>
          {type}
        </p>

        <h3 className="font-serif text-3xl text-[#3A332D] mb-4 group-hover:text-[#D9895B] transition-colors duration-300">
          {title}
        </h3>

        <p className="leading-relaxed text-[#8A837D] text-sm mb-8 line-clamp-3 flex-grow">
          {description}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-[#E8DED5]/50 mt-auto">
          <span className="text-xl font-serif text-[#3A332D]">
            {price}
          </span>

          <Link
            href={`/resources/${slug}`}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FCF8F2] text-[#3A332D] group-hover:bg-[#3A332D] group-hover:text-white transition-colors duration-300"
          >
            <ArrowUpRight size={18} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </article>
  );
}