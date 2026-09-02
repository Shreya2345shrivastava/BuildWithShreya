"use client";

import React from "react";
import { Play, Flame, ArrowUp } from "lucide-react";
import { ITask } from "@/types/lifeos";

interface Props {
  name: string;
  totalTasks: number;
  completedTasks: number;
  mainFocus?: ITask;
  onStartFocus: () => void;
}

export function HeroCommandCenter({ name, totalTasks, completedTasks, mainFocus, onStartFocus }: Props) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const getMomentum = () => {
    if (progress === 0) return "Ready To Start";
    if (progress < 50) return "Started Strong";
    if (progress === 50) return "Halfway There";
    if (progress < 100) return "Almost Done";
    return "Perfect Day";
  };

  const streaks = [
    { name: "DSA", days: 14, icon: "🔥" },
    { name: "Workout", days: 8, icon: "💪" },
    { name: "Reading", days: 12, icon: "📚" },
    { name: "Water", days: 5, icon: "💧" },
  ];

  return (
    <section className="flex flex-col gap-10 w-full max-w-3xl mx-auto items-center mt-10 mb-8">
      
      {/* Greeting & Life Score */}
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-neutral-800 dark:text-neutral-100 font-serif">
          {getGreeting()}, {name} <span className="inline-block animate-wave origin-[70%_70%]">🌸</span>
        </h1>
        
        <div className="flex flex-col items-center mt-1">
          <p className="text-xs uppercase tracking-widest text-neutral-400 font-medium">Life Score</p>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-3xl font-serif text-neutral-800 dark:text-neutral-200">82 <span className="text-lg text-neutral-400">/ 100</span></span>
          </div>
          <span className="text-xs font-medium text-green-600 dark:text-green-400 flex items-center gap-1 mt-1 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
            <ArrowUp className="w-3 h-3" /> +4 this week
          </span>
        </div>
      </div>

      {/* Progress, Momentum & Streaks */}
      <div className="flex flex-col items-center gap-5 w-full">
        
        <div className="flex flex-col items-center gap-2 w-full max-w-sm">
          <div className="flex items-center justify-between w-full px-1">
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Today's Progress</p>
            <p className="text-sm text-neutral-500 font-medium">{getMomentum()}</p>
          </div>
          
          <div className="w-full h-3 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-neutral-900 dark:bg-neutral-100 rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Streaks Pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {streaks.map(streak => (
            <div key={streak.name} className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-full shadow-sm text-sm font-medium text-neutral-700 dark:text-neutral-300 transition-transform hover:scale-105 cursor-default">
              <span>{streak.icon}</span>
              <span>{streak.name} {streak.days}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Today's Main Focus */}
      <div className="w-full flex flex-col gap-3 mt-4">
        
        {mainFocus ? (
          <div className="group relative flex flex-col md:flex-row items-center justify-between p-6 md:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl shadow-neutral-200/40 dark:shadow-none hover:border-neutral-800 dark:hover:border-neutral-400 transition-all cursor-pointer overflow-hidden transform hover:-translate-y-1 duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-100/50 to-transparent dark:via-neutral-800/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            
            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1 mb-6 md:mb-0 z-10">
              <p className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-1">Main Focus</p>
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎯</span>
                <h3 className="text-2xl font-serif font-medium text-neutral-900 dark:text-neutral-100">{mainFocus.title}</h3>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-500 ml-0 md:ml-12 mt-1">
                <span>Est: 90 mins</span>
                <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <span className="text-orange-600 dark:text-orange-400 font-medium">Priority: High</span>
              </div>
            </div>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                onStartFocus();
              }}
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium transition-transform active:scale-95 shadow-md z-10 w-full md:w-auto justify-center hover:bg-neutral-800 dark:hover:bg-neutral-100"
            >
              <Play className="w-4 h-4 fill-current" />
              Start Focus Session
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/50 border border-dashed border-neutral-300 dark:border-neutral-700">
            <span className="text-3xl mb-3">🎯</span>
            <p className="text-neutral-800 dark:text-neutral-200 font-medium font-serif">No main focus set.</p>
            <p className="text-sm text-neutral-500 mt-1 max-w-xs text-center mb-4">Choose one thing that makes everything else easier or unnecessary.</p>
            <button className="px-5 py-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium text-sm hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors">
              Set Focus
            </button>
          </div>
        )}
      </div>

    </section>
  );
}
