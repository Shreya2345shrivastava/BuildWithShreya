"use client";

import { useOrder, type DesignStyle, type ColorMood, type AnimationLevel } from "./OrderContext";

const styles: { id: DesignStyle; label: string; desc: string }[] = [
  { id: "luxury", label: "Luxury", desc: "High-end, lots of breathing room" },
  { id: "editorial", label: "Editorial", desc: "Magazine-style, typography focused" },
  { id: "minimal", label: "Minimal", desc: "Clean, ultra-simple, stark" },
  { id: "elegant", label: "Elegant", desc: "Soft, sophisticated, timeless" },
  { id: "modern", label: "Modern", desc: "Sharp, tech-forward, clean" },
  { id: "romantic", label: "Romantic", desc: "Soft lines, delicate typography" },
  { id: "bold", label: "Bold", desc: "High contrast, large fonts" },
  { id: "creative", label: "Creative", desc: "Playful, unique layouts" },
];

const colors: { id: ColorMood; label: string; hex: string }[] = [
  { id: "warm_beige", label: "Warm Beige", hex: "#d9a48f" },
  { id: "champagne", label: "Champagne", hex: "#e6d5c3" },
  { id: "soft_pink", label: "Soft Pink", hex: "#f2c6cc" },
  { id: "dark_luxury", label: "Dark Luxury", hex: "#1a1a1a" },
  { id: "forest_green", label: "Forest Green", hex: "#2a3b2c" },
  { id: "cream", label: "Cream", hex: "#f7f5f0" },
];

const animations: { id: AnimationLevel; label: string; desc: string; price: string }[] = [
  { id: "minimal", label: "Minimal", desc: "Basic fades and smooth scrolling", price: "Included" },
  { id: "balanced", label: "Balanced", desc: "Micro-interactions and parallax", price: "Included" },
  { id: "premium", label: "Premium", desc: "Scroll-linked reveals, custom cursors", price: "+₹1,500" },
  { id: "luxury", label: "Luxury", desc: "Full 3D / WebGL, page transitions", price: "+₹3,000" },
];

export function DesignStudio() {
  const { form, updateForm } = useOrder();

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="font-serif text-3xl sm:text-5xl text-black dark:text-white leading-tight">
          Design Studio
        </h2>
        <p className="mt-3 text-lg text-black/60 dark:text-white/50 max-w-lg">
          Configure the visual mood of your website. See the preview update instantly.
        </p>
      </div>

      {/* Aesthetic Style */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">Aesthetic Style</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {styles.map((style) => (
            <button
              key={style.id}
              onClick={() => updateForm({ designStyle: style.id })}
              className={`flex flex-col items-start p-4 text-left rounded-2xl border-2 transition-all duration-200 ${
                form.designStyle === style.id
                  ? "border-[var(--color-accent-peach)] bg-[var(--color-accent-peach)]/5"
                  : "border-black/5 dark:border-white/5 bg-white dark:bg-[#161818] hover:border-black/15 dark:hover:border-white/15"
              }`}
            >
              <span className={`font-semibold mb-1 ${form.designStyle === style.id ? "text-[var(--color-accent-peach)]" : "text-black dark:text-white"}`}>{style.label}</span>
              <span className="text-xs text-black/50 dark:text-white/40">{style.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Color Mood */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">Color Mood</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => updateForm({ colorMood: color.id })}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all duration-200 ${
                form.colorMood === color.id
                  ? "border-[var(--color-accent-peach)] bg-[var(--color-accent-peach)]/5"
                  : "border-black/5 dark:border-white/5 bg-white dark:bg-[#161818] hover:border-black/15 dark:hover:border-white/15"
              }`}
            >
              <div className="w-10 h-10 rounded-full shadow-sm mb-2 border border-black/10 dark:border-white/10" style={{ backgroundColor: color.hex }} />
              <span className={`text-xs font-semibold text-center ${form.colorMood === color.id ? "text-[var(--color-accent-peach)]" : "text-black dark:text-white"}`}>
                {color.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Animation Level */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">Animation Complexity</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {animations.map((anim) => (
            <button
              key={anim.id}
              onClick={() => updateForm({ animationLevel: anim.id })}
              className={`flex flex-col items-start p-4 text-left rounded-2xl border-2 transition-all duration-200 ${
                form.animationLevel === anim.id
                  ? "border-[var(--color-accent-peach)] bg-[var(--color-accent-peach)]/5"
                  : "border-black/5 dark:border-white/5 bg-white dark:bg-[#161818] hover:border-black/15 dark:hover:border-white/15"
              }`}
            >
              <div className="flex justify-between w-full items-center mb-1">
                <span className={`font-semibold ${form.animationLevel === anim.id ? "text-[var(--color-accent-peach)]" : "text-black dark:text-white"}`}>{anim.label}</span>
                <span className="text-xs font-bold text-black/40 dark:text-white/40">{anim.price}</span>
              </div>
              <span className="text-xs text-black/50 dark:text-white/40">{anim.desc}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
