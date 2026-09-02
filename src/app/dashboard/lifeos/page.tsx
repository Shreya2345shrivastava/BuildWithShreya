"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, Play, Square } from "lucide-react";

import { MotionPageWrapper } from "@/components/dashboard/lifeos/MotionPageWrapper";
import { HeroCommandCenter } from "./_components/HeroCommandCenter";
import { QuickActions } from "./_components/QuickActions";
import { TodaysTasks } from "./_components/TodaysTasks";
import { TodaysHabits } from "./_components/TodaysHabits";
import { AttentionCenter } from "./_components/AttentionCenter";
import { DailyCompass } from "./_components/DailyCompass";
import { YourLife } from "./_components/YourLife";
import { WeeklyReflectionCard } from "./_components/WeeklyReflectionCard";
import { FloatingQuickAdd } from "./_components/FloatingQuickAdd";

import { ITask, IHabit, ILifeArea } from "@/types/lifeos";

export default function LifeOSDashboard() {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [focusTime, setFocusTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  const profile = { name: "Shreya" };
  
  const tasks = [
    { _id: '1', title: 'Complete DSA Session', status: 'not_started', userId: '1', createdAt: new Date(), updatedAt: new Date() },
    { _id: '2', title: 'Publish Instagram Reel', status: 'not_started', userId: '1', createdAt: new Date(), updatedAt: new Date() },
  ] as unknown as ITask[];
  
  const habits = [
    { _id: 'h1', title: 'Water', userId: '1', frequency: 'daily', createdAt: new Date(), updatedAt: new Date() },
    { _id: 'h2', title: 'Workout', userId: '1', frequency: 'daily', createdAt: new Date(), updatedAt: new Date() },
  ] as unknown as IHabit[];
  
  const areas: ILifeArea[] = [];
  const mainFocus = tasks[0];

  // Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isFocusMode && isTimerRunning) {
      interval = setInterval(() => {
        setFocusTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isFocusMode, isTimerRunning]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleStartFocus = () => {
    setIsFocusMode(true);
    setIsTimerRunning(true);
  };

  const handleEndFocus = () => {
    setIsFocusMode(false);
    setIsTimerRunning(false);
    setFocusTime(0);
  };

  if (isFocusMode) {
    return (
      <div className="fixed inset-0 z-50 bg-[#FDFBF7] dark:bg-[#0A0A0A] flex flex-col items-center justify-center p-6 animate-in fade-in duration-700">
        <button 
          onClick={handleEndFocus}
          className="absolute top-8 right-8 p-3 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors text-neutral-400"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="flex flex-col items-center w-full max-w-2xl text-center gap-10">
          
          <div className="flex flex-col items-center gap-4">
            <span className="text-sm font-medium uppercase tracking-widest text-neutral-400">Current Focus</span>
            <h1 className="text-4xl md:text-5xl font-serif text-neutral-900 dark:text-neutral-100 leading-tight">
              {mainFocus?.title || "Deep Work"}
            </h1>
          </div>

          {/* Timer */}
          <div className="flex flex-col items-center gap-6">
            <span className="text-7xl md:text-9xl font-light font-mono text-neutral-800 dark:text-neutral-200 tracking-tighter tabular-nums">
              {formatTime(focusTime)}
            </span>
            
            <button 
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors text-sm font-medium"
            >
              {isTimerRunning ? (
                <><Square className="w-4 h-4" /> Pause Timer</>
              ) : (
                <><Play className="w-4 h-4" /> Resume Timer</>
              )}
            </button>
          </div>

          {/* Notes & Done */}
          <div className="w-full mt-8 flex flex-col gap-6">
            <textarea 
              placeholder="Jot down quick thoughts or distractions here..."
              className="w-full p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-neutral-700 resize-none h-32 placeholder:text-neutral-400 shadow-sm text-neutral-800 dark:text-neutral-200"
            />
            
            <button 
              onClick={handleEndFocus}
              className="w-full flex items-center justify-center gap-3 p-5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium text-lg hover:-translate-y-0.5 transition-transform shadow-lg shadow-neutral-900/20 dark:shadow-white/10"
            >
              <CheckCircle2 className="w-6 h-6" />
              Complete Task
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <MotionPageWrapper>
      <div className="mx-auto min-h-screen font-sans bg-[#F4F1EA] dark:bg-[#0A0A0A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center pb-32">
          
          {/* Level 1: Hero Command Center */}
          <HeroCommandCenter 
            name={profile.name} 
            totalTasks={5} 
            completedTasks={3} 
            mainFocus={mainFocus}
            onStartFocus={handleStartFocus}
          />

          {/* Level 2: Quick Actions */}
          <QuickActions />

          {/* Grid Layout for Level 3 & 4 */}
          <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
            
            {/* Left 60%: Today's Work */}
            <div className="lg:col-span-7 flex flex-col gap-16">
              <TodaysTasks tasks={tasks} />
              <TodaysHabits habits={habits} />
            </div>

            {/* Right 40%: Context & Direction */}
            <div className="lg:col-span-5 flex flex-col gap-10">
              <DailyCompass />
              <AttentionCenter />
            </div>
            
          </div>

          {/* Level 5: Life Areas */}
          <div className="w-full max-w-5xl mb-20">
            <YourLife areas={areas} />
          </div>

          {/* Weekly Reflection (Bottom) */}
          <div className="w-full max-w-3xl">
            <WeeklyReflectionCard />
          </div>

        </div>

        {/* Global Floating Actions */}
        <FloatingQuickAdd />
      </div>
    </MotionPageWrapper>
  );
}
