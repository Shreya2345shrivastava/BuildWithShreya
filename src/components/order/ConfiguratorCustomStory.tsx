"use client";

import { useOrder, type CustomStoryDetails } from "./OrderContext";

interface Props {
  stepId: number;
}

export function ConfiguratorCustomStory({ stepId }: Props) {
  const { form, updateCustomStory, updateForm } = useOrder();
  const d = form.customStory;

  const feelingsList = [
    "Loved", "Surprised", "Emotional", "Inspired", 
    "Happy", "Nostalgic", "Romantic", "Professional", "Other"
  ];

  const qualityTiers = [
    { id: "essential", label: "Essential", desc: "Basic layout, clean design", price: "Starting ₹2,999" },
    { id: "premium", label: "Premium", desc: "Custom animations, rich media", price: "Starting ₹5,999" },
    { id: "luxury", label: "Luxury", desc: "Highly bespoke, complex interactions", price: "Starting ₹9,999" },
    { id: "signature", label: "Signature", desc: "A true digital masterpiece", price: "Custom Quote" },
  ];

  const contentTypes = [
    { key: "photos", label: "Photo Uploads" },
    { key: "videos", label: "Video Uploads" },
    { key: "audio", label: "Audio / Music" },
    { key: "messages", label: "Guest Messages" },
    { key: "letters", label: "Written Letters" },
    { key: "screenshots", label: "Chat Screenshots" },
    { key: "voiceNotes", label: "Voice Notes" },
    { key: "links", label: "External Links" },
    { key: "documents", label: "Documents / PDFs" },
  ];

  switch (stepId) {
    case 1: // Purpose
      return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <h2 className="font-serif text-3xl sm:text-5xl text-black dark:text-white leading-tight">What is the purpose of this website?</h2>
            <p className="mt-2 text-lg text-black/60 dark:text-white/50">Tell me what you want this website to achieve.</p>
          </div>
          <textarea
            rows={5}
            value={d.purpose}
            onChange={(e) => updateCustomStory({ purpose: e.target.value })}
            placeholder="e.g. I want to surprise my girlfriend on her birthday... I want to ask someone on a date..."
            className="w-full p-6 rounded-2xl bg-white dark:bg-[#161818] border border-black/10 dark:border-white/10 text-lg text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none focus:border-[var(--color-accent-peach)] transition-colors resize-none shadow-sm"
          />
        </div>
      );
    case 2: // Recipient
      return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <h2 className="font-serif text-3xl sm:text-5xl text-black dark:text-white leading-tight">Who is this website for?</h2>
          </div>
          <div className="grid gap-6 p-8 rounded-3xl bg-white dark:bg-[#161818] border border-black/5 dark:border-white/5 shadow-sm">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/40">Recipient Name</label>
              <input
                type="text"
                value={d.recipientName}
                onChange={(e) => updateCustomStory({ recipientName: e.target.value })}
                placeholder="e.g. Sarah"
                className="w-full bg-transparent border-b-2 border-black/10 dark:border-white/10 px-0 py-2 text-xl text-black dark:text-white placeholder-black/20 outline-none focus:border-[var(--color-accent-peach)]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/40">Relationship</label>
              <input
                type="text"
                value={d.relationship}
                onChange={(e) => updateCustomStory({ relationship: e.target.value })}
                placeholder="e.g. Girlfriend, Friend, Sibling..."
                className="w-full bg-transparent border-b-2 border-black/10 dark:border-white/10 px-0 py-2 text-xl text-black dark:text-white placeholder-black/20 outline-none focus:border-[var(--color-accent-peach)]"
              />
            </div>
          </div>
        </div>
      );
    case 3: // Story
      return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <h2 className="font-serif text-3xl sm:text-5xl text-black dark:text-white leading-tight">Describe Your Story</h2>
            <p className="mt-2 text-lg text-black/60 dark:text-white/50">Tell me the story behind this project. Include important memories, moments, emotions, and details.</p>
          </div>
          <textarea
            rows={8}
            value={d.story}
            onChange={(e) => updateCustomStory({ story: e.target.value })}
            placeholder="Once upon a time..."
            className="w-full p-6 rounded-2xl bg-white dark:bg-[#161818] border border-black/10 dark:border-white/10 text-lg text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none focus:border-[var(--color-accent-peach)] transition-colors resize-none shadow-sm"
          />
        </div>
      );
    case 4: // Feelings
      return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <h2 className="font-serif text-3xl sm:text-5xl text-black dark:text-white leading-tight">What should visitors feel?</h2>
            <p className="mt-2 text-lg text-black/60 dark:text-white/50">Select all that apply.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {feelingsList.map((f) => {
              const active = d.feelings.includes(f);
              return (
                <button
                  key={f}
                  onClick={() => {
                    const newFeelings = active ? d.feelings.filter((x) => x !== f) : [...d.feelings, f];
                    updateCustomStory({ feelings: newFeelings });
                  }}
                  className={`px-6 py-3 rounded-full border-2 text-sm font-bold transition-all duration-200 ${
                    active
                      ? "border-[var(--color-accent-peach)] bg-[var(--color-accent-peach)]/10 text-[var(--color-accent-peach)]"
                      : "border-black/10 dark:border-white/10 text-black/70 dark:text-white/70 hover:border-black/20"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      );
    case 6: // Quality
      return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <h2 className="font-serif text-3xl sm:text-5xl text-black dark:text-white leading-tight">Choose Website Quality</h2>
            <p className="mt-2 text-lg text-black/60 dark:text-white/50">This helps me gauge the level of detail and production value required.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {qualityTiers.map((q) => (
              <button
                key={q.id}
                onClick={() => updateCustomStory({ qualityLevel: q.id as CustomStoryDetails["qualityLevel"] })}
                className={`flex flex-col items-start p-6 rounded-3xl border-2 text-left transition-all duration-300 ${
                  d.qualityLevel === q.id
                    ? "border-[var(--color-accent-peach)] bg-[var(--color-accent-peach)]/5 shadow-md shadow-[var(--color-accent-peach)]/10"
                    : "border-black/5 dark:border-white/5 bg-white dark:bg-[#161818] hover:border-black/15"
                }`}
              >
                <div className="flex justify-between w-full items-center mb-2">
                  <span className={`text-xl font-bold ${d.qualityLevel === q.id ? "text-[var(--color-accent-peach)]" : "text-black dark:text-white"}`}>{q.label}</span>
                  <span className="text-sm font-semibold text-black/40 dark:text-white/40">{q.price}</span>
                </div>
                <p className="text-black/60 dark:text-white/50">{q.desc}</p>
              </button>
            ))}
          </div>
        </div>
      );
    case 7: // Content
      return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <h2 className="font-serif text-3xl sm:text-5xl text-black dark:text-white leading-tight">Content Collection</h2>
            <p className="mt-2 text-lg text-black/60 dark:text-white/50">What kind of content will we feature? (Optional)</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {contentTypes.map((c) => {
              const active = d.contentUploads[c.key as keyof typeof d.contentUploads];
              return (
                <label
                  key={c.key}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    active
                      ? "border-[var(--color-accent-peach)] bg-[var(--color-accent-peach)]/5"
                      : "border-black/5 dark:border-white/5 bg-white dark:bg-[#161818]"
                  }`}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${active ? "bg-[var(--color-accent-peach)] border-[var(--color-accent-peach)]" : "border-black/20"}`}>
                    {active && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <span className={`text-sm font-semibold ${active ? "text-[var(--color-accent-peach)]" : "text-black/70 dark:text-white/70"}`}>{c.label}</span>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={active}
                    onChange={(e) => updateCustomStory({ contentUploads: { ...d.contentUploads, [c.key]: e.target.checked } })}
                  />
                </label>
              );
            })}
          </div>
        </div>
      );
    case 8: // Anything Else & Final Contact
      return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <h2 className="font-serif text-3xl sm:text-5xl text-black dark:text-white leading-tight">Anything Else?</h2>
            <p className="mt-2 text-lg text-black/60 dark:text-white/50">Describe anything you imagine. Even if you're unsure how it would work, tell me your idea and I'll explore ways to bring it to life.</p>
          </div>
          <textarea
            rows={4}
            value={d.extraNotes}
            onChange={(e) => updateCustomStory({ extraNotes: e.target.value })}
            placeholder="I had an idea for..."
            className="w-full p-6 rounded-2xl bg-white dark:bg-[#161818] border border-black/10 dark:border-white/10 text-lg text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none focus:border-[var(--color-accent-peach)] transition-colors resize-none shadow-sm"
          />
          
          {/* We embed the Final Contact form here since this is the last step for Custom Story */}
          <div className="pt-8 border-t border-black/10 dark:border-white/10">
            <h3 className="text-xl font-serif text-black dark:text-white mb-6">Where should I send the proposal?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-8 rounded-3xl bg-white dark:bg-[#161818] border border-black/5 dark:border-white/5 shadow-sm">
              <div className="relative space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)] dark:text-white/40">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={form.name} 
                  onChange={(e) => updateForm({ name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full bg-transparent border-b-2 border-black/10 dark:border-white/10 px-0 py-2 text-lg text-black dark:text-white placeholder-black/20 dark:placeholder-white/20 outline-none focus:border-[var(--color-accent-peach)] transition-colors"
                />
              </div>
              <div className="relative space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-secondary)] dark:text-white/40">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={form.email} 
                  onChange={(e) => updateForm({ email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full bg-transparent border-b-2 border-black/10 dark:border-white/10 px-0 py-2 text-lg text-black dark:text-white placeholder-black/20 dark:placeholder-white/20 outline-none focus:border-[var(--color-accent-peach)] transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}
