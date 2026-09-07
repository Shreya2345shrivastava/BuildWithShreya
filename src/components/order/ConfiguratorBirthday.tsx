"use client";

import { useOrder, type BirthdayDetails } from "./OrderContext";

interface FeatureOption {
  value: string;
  label: string;
  price: string;
  desc?: string;
}

export function ConfiguratorBirthday() {
  const { form, updateBirthday } = useOrder();
  const d = form.birthday;

  const galleryOptions: FeatureOption[] = [
    { value: "none", label: "No Gallery", price: "Included" },
    { value: "10", label: "10 Photos", price: "Included", desc: "Basic slideshow" },
    { value: "25", label: "25 Photos", price: "+₹500", desc: "Categorized grid" },
    { value: "50", label: "50 Photos", price: "+₹1,000", desc: "Premium lightbox" },
    { value: "100", label: "100 Photos", price: "+₹2,000", desc: "Luxury masonry layout" },
  ];

  const videoOptions: FeatureOption[] = [
    { value: "none", label: "No Videos", price: "Included" },
    { value: "1-3", label: "1-3 Videos", price: "+₹800", desc: "Embedded memories" },
    { value: "4-10", label: "4-10 Videos", price: "+₹1,500", desc: "Video gallery" },
    { value: "unlimited", label: "Unlimited", price: "+₹2,500", desc: "Custom video player" },
  ];

  const messageOptions: FeatureOption[] = [
    { value: "none", label: "No Messages", price: "Included" },
    { value: "5", label: "Up to 5", price: "Included", desc: "Simple text notes" },
    { value: "10", label: "Up to 10", price: "+₹400", desc: "Text & Image notes" },
    { value: "20", label: "Up to 20", price: "+₹800", desc: "Digital guestbook" },
    { value: "unlimited", label: "Unlimited", price: "+₹1,500", desc: "Premium message wall" },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="font-serif text-3xl sm:text-5xl text-black dark:text-white leading-tight">
          Birthday Details
        </h2>
        <p className="mt-3 text-lg text-black/60 dark:text-white/50 max-w-lg">
          Configure the specific features and content for the birthday website.
        </p>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-3xl bg-white dark:bg-[#161818] border border-black/5 dark:border-white/5">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)] dark:text-white/40">Birthday Person Name</label>
          <input 
            type="text" 
            value={d.personName} 
            onChange={(e) => updateBirthday({ personName: e.target.value })}
            placeholder="e.g. Sarah"
            className="w-full bg-transparent border-b-2 border-black/10 dark:border-white/10 px-0 py-2 text-lg text-black dark:text-white placeholder-black/20 dark:placeholder-white/20 outline-none focus:border-[var(--color-accent-peach)] transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)] dark:text-white/40">Turning Age</label>
          <input 
            type="text" 
            value={d.age} 
            onChange={(e) => updateBirthday({ age: e.target.value })}
            placeholder="e.g. 25"
            className="w-full bg-transparent border-b-2 border-black/10 dark:border-white/10 px-0 py-2 text-lg text-black dark:text-white placeholder-black/20 dark:placeholder-white/20 outline-none focus:border-[var(--color-accent-peach)] transition-colors"
          />
        </div>
      </div>

      {/* Features Configurator */}
      <div className="space-y-10">
        
        {/* Photo Gallery */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">Photo Gallery</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {galleryOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateBirthday({ gallerySize: opt.value as BirthdayDetails["gallerySize"] })}
                className={`flex flex-col items-start p-4 text-left rounded-2xl border-2 transition-all duration-200 ${
                  d.gallerySize === opt.value
                    ? "border-[var(--color-accent-peach)] bg-[var(--color-accent-peach)]/5"
                    : "border-black/5 dark:border-white/5 bg-white dark:bg-[#161818] hover:border-black/15 dark:hover:border-white/15"
                }`}
              >
                <div className="flex justify-between w-full items-center mb-2">
                  <span className={`font-semibold ${d.gallerySize === opt.value ? "text-[var(--color-accent-peach)]" : "text-black dark:text-white"}`}>{opt.label}</span>
                  <span className="text-xs font-bold text-black/40 dark:text-white/40">{opt.price}</span>
                </div>
                {opt.desc && <span className="text-xs text-black/50 dark:text-white/40">{opt.desc}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Video Memories */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">Video Memories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {videoOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateBirthday({ videoCount: opt.value as BirthdayDetails["videoCount"] })}
                className={`flex flex-col items-start p-4 text-left rounded-2xl border-2 transition-all duration-200 ${
                  d.videoCount === opt.value
                    ? "border-[var(--color-accent-peach)] bg-[var(--color-accent-peach)]/5"
                    : "border-black/5 dark:border-white/5 bg-white dark:bg-[#161818] hover:border-black/15 dark:hover:border-white/15"
                }`}
              >
                <div className="flex justify-between w-full items-center mb-2">
                  <span className={`font-semibold ${d.videoCount === opt.value ? "text-[var(--color-accent-peach)]" : "text-black dark:text-white"}`}>{opt.label}</span>
                </div>
                <span className="text-xs font-bold text-black/40 dark:text-white/40 mb-1">{opt.price}</span>
                {opt.desc && <span className="text-xs text-black/50 dark:text-white/40">{opt.desc}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">Guest Messages</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {messageOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateBirthday({ messagesCount: opt.value as BirthdayDetails["messagesCount"] })}
                className={`flex flex-col items-start p-4 text-left rounded-2xl border-2 transition-all duration-200 ${
                  d.messagesCount === opt.value
                    ? "border-[var(--color-accent-peach)] bg-[var(--color-accent-peach)]/5"
                    : "border-black/5 dark:border-white/5 bg-white dark:bg-[#161818] hover:border-black/15 dark:hover:border-white/15"
                }`}
              >
                <div className="flex justify-between w-full items-center mb-2">
                  <span className={`font-semibold ${d.messagesCount === opt.value ? "text-[var(--color-accent-peach)]" : "text-black dark:text-white"}`}>{opt.label}</span>
                  <span className="text-xs font-bold text-black/40 dark:text-white/40">{opt.price}</span>
                </div>
                {opt.desc && <span className="text-xs text-black/50 dark:text-white/40">{opt.desc}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Toggle Features */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-black dark:text-white">Premium Experiences</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: "music", label: "Background Music", price: "+₹300", desc: "Auto-play their favorite song on load" },
              { key: "memoryTimeline", label: "Memory Timeline", price: "+₹700", desc: "Interactive 'Childhood to Today' journey" },
              { key: "countdown", label: "Live Countdown", price: "+₹200", desc: "Animated timer until the big day" },
              { key: "surpriseReveal", label: "Surprise Lock", price: "+₹600", desc: "Site unlocks exactly at midnight" },
            ].map((feature) => {
              const isSelected = d[feature.key as keyof BirthdayDetails] as boolean;
              return (
                <button
                  key={feature.key}
                  onClick={() => updateBirthday({ [feature.key]: !isSelected })}
                  className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-200 text-left ${
                    isSelected
                      ? "border-[var(--color-accent-peach)] bg-[var(--color-accent-peach)]/5"
                      : "border-black/5 dark:border-white/5 bg-white dark:bg-[#161818] hover:border-black/15 dark:hover:border-white/15"
                  }`}
                >
                  <div>
                    <p className={`font-semibold ${isSelected ? "text-[var(--color-accent-peach)]" : "text-black dark:text-white"}`}>{feature.label}</p>
                    <p className="text-xs text-black/50 dark:text-white/40 mt-1">{feature.desc}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-black/40 dark:text-white/40 mb-2">{feature.price}</span>
                    <div className={`w-10 h-5 rounded-full flex items-center p-1 transition-colors ${isSelected ? "bg-[var(--color-accent-peach)]" : "bg-black/10 dark:bg-white/10"}`}>
                      <div className={`w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform ${isSelected ? "translate-x-4.5" : "translate-x-0"}`} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
