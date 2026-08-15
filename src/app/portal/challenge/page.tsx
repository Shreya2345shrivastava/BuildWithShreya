"use client";

import { useState, useEffect } from "react";
import { Check, Trophy, BookOpen } from "lucide-react";
import clsx from "clsx";

export default function ChallengePage() {
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("buildwithshreya_challenge");
    if (saved) {
      try {
        setCompletedDays(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
    setIsLoaded(true);
  }, []);

  const toggleDay = (day: number) => {
    setCompletedDays((prev) => {
      const newDays = prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day];
      
      localStorage.setItem("buildwithshreya_challenge", JSON.stringify(newDays));
      return newDays;
    });
  };

  const progress = Math.round((completedDays.length / 30) * 100);

  if (!isLoaded) return null;

  return (
    <div className="animate-in fade-in duration-700 max-w-4xl">
      <div className="mb-10">
        <h1 className="font-serif text-3xl sm:text-4xl text-[#3A332D] mb-4">30-Day Challenge</h1>
        <p className="text-lg text-[#8A837D]">
          Small, consistent steps build momentum. Check off a day every time you spend at least 30 minutes reading, reflecting, or executing your ideas.
        </p>
      </div>

      <div className="mb-10 rounded-2xl bg-white p-6 shadow-sm border border-black/[0.04] flex items-center justify-between gap-6 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <div className="flex justify-between text-sm font-medium mb-2">
            <span className="text-[#3A332D]">Your Progress</span>
            <span className="text-[#D9895B]">{progress}% Complete</span>
          </div>
          <div className="h-2 w-full rounded-full bg-[#FCF8F2] overflow-hidden">
            <div 
              className="h-full bg-[#D9895B] transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex flex-col items-end">
            <span className="font-serif text-3xl text-[#3A332D]">{completedDays.length}/30</span>
            <span className="text-xs uppercase tracking-widest text-[#8A837D]">Days Completed</span>
          </div>
          {completedDays.length === 30 && (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FCF8F2] text-[#D9895B] animate-bounce">
              <Trophy size={24} />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3 sm:gap-4 md:grid-cols-6 lg:grid-cols-10">
        {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
          const isCompleted = completedDays.includes(day);
          
          return (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={clsx(
                "group relative flex aspect-square flex-col items-center justify-center rounded-xl border-2 transition-all duration-300",
                isCompleted 
                  ? "border-[#D9895B] bg-[#D9895B] text-white shadow-md hover:bg-[#C27546]" 
                  : "border-black/[0.04] bg-white text-[#8A837D] hover:border-[#D9895B]/50 hover:shadow-sm"
              )}
            >
              <span className="text-sm font-medium">Day</span>
              <span className={clsx(
                "font-serif text-xl",
                isCompleted ? "text-white" : "text-[#3A332D]"
              )}>
                {day}
              </span>
              
              <div className={clsx(
                "absolute inset-0 flex items-center justify-center rounded-xl bg-[#D9895B] transition-all duration-300",
                isCompleted ? "opacity-0 scale-50" : "opacity-0 group-hover:opacity-20"
              )}>
                <Check size={24} className="text-white" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
