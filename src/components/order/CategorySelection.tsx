"use client";

import { motion } from "framer-motion";
import { useOrder, type ProjectType, type Category } from "./OrderContext";

interface ProjectOption {
  id: ProjectType;
  label: string;
  icon: string;
  basePrice: string;
  days: string;
}

const personalCelebrations: ProjectOption[] = [
  { id: "birthday", label: "Birthday", icon: "🎂", basePrice: "₹2,999", days: "7 Days" },
  { id: "anniversary", label: "Anniversary", icon: "❤️", basePrice: "₹2,999", days: "7 Days" },
  { id: "wedding", label: "Wedding", icon: "💍", basePrice: "₹4,999", days: "14 Days" },
];

const personalBrands: ProjectOption[] = [
  { id: "portfolio", label: "Portfolio", icon: "👩‍💻", basePrice: "₹4,999", days: "14 Days" },
  { id: "creator", label: "Creator Brand", icon: "✨", basePrice: "₹4,999", days: "14 Days" },
  { id: "author", label: "Author", icon: "📚", basePrice: "₹4,999", days: "14 Days" },
];

const customExperiences: ProjectOption[] = [
  { id: "custom_story", label: "Custom Story", icon: "💫", basePrice: "₹2,999", days: "Est. 14 Days" },
];


function OptionCard({ 
  option, 
  category, 
  isSelected 
}: { 
  option: ProjectOption; 
  category: Category;
  isSelected: boolean 
}) {
  const { updateForm } = useOrder();

  return (
    <button
      type="button"
      onClick={() => updateForm({ category, projectType: option.id })}
      className={`relative group flex flex-col items-start p-5 rounded-2xl border-2 transition-all duration-300 text-left overflow-hidden ${
        isSelected 
          ? "border-[var(--color-accent-peach)] bg-[var(--color-accent-peach)]/5 shadow-md shadow-[var(--color-accent-peach)]/10" 
          : "border-black/5 dark:border-white/5 bg-white dark:bg-[#161818] hover:border-black/15 dark:hover:border-white/15 hover:shadow-lg"
      }`}
    >
      <div className="flex justify-between w-full items-start mb-4">
        <span className="text-3xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">{option.icon}</span>
        {isSelected && (
          <div className="w-5 h-5 rounded-full bg-[var(--color-accent-peach)] flex items-center justify-center shadow-sm">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
      <h4 className={`font-semibold text-base mb-1 ${isSelected ? "text-[var(--color-accent-peach)]" : "text-black dark:text-white"}`}>
        {option.label}
      </h4>
      <div className="flex items-center gap-2 text-xs font-medium text-black/50 dark:text-white/40 mt-auto pt-4 border-t border-black/5 dark:border-white/5 w-full">
        <span>From {option.basePrice}</span>
        <span className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/20" />
        <span>{option.days}</span>
      </div>
    </button>
  );
}

export function CategorySelection() {
  const { form } = useOrder();

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="font-serif text-3xl sm:text-5xl text-black dark:text-white leading-tight">
          What are you building?
        </h2>
        <p className="mt-3 text-lg text-black/60 dark:text-white/50 max-w-lg">
          Select the type of project you need. The configurator will adapt to your choice automatically.
        </p>
      </div>

      <div className="space-y-10">
        
        {/* Personal Celebrations */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)] dark:text-white/40 mb-4">
            Personal Celebrations
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {personalCelebrations.map((opt) => (
              <OptionCard 
                key={opt.id} 
                option={opt} 
                category="personal_celebration" 
                isSelected={form.projectType === opt.id} 
              />
            ))}
          </div>
        </div>

        {/* Personal Brands */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)] dark:text-white/40 mb-4">
            Personal Brands
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {personalBrands.map((opt) => (
              <OptionCard 
                key={opt.id} 
                option={opt} 
                category="personal_brand" 
                isSelected={form.projectType === opt.id} 
              />
            ))}
          </div>
        </div>

        {/* Custom Experiences */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)] dark:text-white/40 mb-4">
            Custom Experiences
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {customExperiences.map((opt) => (
              <OptionCard 
                key={opt.id} 
                option={opt} 
                category="custom_experiences" 
                isSelected={form.projectType === opt.id} 
              />
            ))}
          </div>
        </div>


      </div>
    </div>
  );
}
