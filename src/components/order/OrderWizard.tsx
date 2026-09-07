"use client";

import { useState, useEffect } from "react";
import { useOrder } from "./OrderContext";
import { StickySummary } from "./StickySummary";
import { CategorySelection } from "./CategorySelection";
import { ConfiguratorBirthday } from "./ConfiguratorBirthday";
import { ConfiguratorPortfolio } from "./ConfiguratorPortfolio";
import { ConfiguratorBusiness } from "./ConfiguratorBusiness";
import { ConfiguratorCustomStory } from "./ConfiguratorCustomStory";
import { DesignStudio } from "./DesignStudio";
import { FinalReview } from "./FinalReview";

function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

// ─── Progress Tracker ─────────────────────────────────────────────────────────

function ProgressTracker() {
  const { step, totalSteps } = useOrder();
  
  // Create an array of length totalSteps
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="mb-12">
      <div className="flex items-center">
        {steps.map((n, i) => {
          const done = n < step;
          const active = n === step;
          return (
            <div key={n} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                    done && "bg-[var(--color-accent-peach)] text-white shadow-sm",
                    active && "bg-white dark:bg-[#161818] border-2 border-[var(--color-accent-peach)] text-[var(--color-accent-peach)]",
                    !done && !active && "bg-black/5 dark:bg-white/5 text-black/30 dark:text-white/30"
                  )}
                >
                  {done ? (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : n}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="h-0.5 flex-1 mx-3 rounded-full relative overflow-hidden bg-black/5 dark:bg-white/5">
                  <div 
                    className="absolute inset-y-0 left-0 bg-[var(--color-accent-peach)] transition-all duration-500 ease-out"
                    style={{ width: done ? '100%' : '0%' }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Generic Fallback for unimplemented categories ────────────────────────────

function ConfiguratorGeneric() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 py-12 text-center border-2 border-dashed border-black/10 dark:border-white/10 rounded-3xl">
      <h2 className="font-serif text-3xl text-black dark:text-white">Custom Flow</h2>
      <p className="text-black/50 dark:text-white/40 max-w-sm mx-auto">
        This category uses a custom flow that is currently being tailored. Please proceed to the Design Studio.
      </p>
    </div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────

function SuccessScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 py-20 animate-in zoom-in-95 duration-500">
      <div className="w-24 h-24 rounded-full bg-[var(--color-accent-peach)]/10 flex items-center justify-center mb-4">
        <svg className="w-12 h-12 text-[var(--color-accent-peach)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="font-serif text-5xl sm:text-6xl text-[var(--color-text-primary)] dark:text-white tracking-tight">
        Project Submitted!
      </h2>
      <p className="text-lg text-[var(--color-text-secondary)] dark:text-white/50 max-w-lg mx-auto leading-relaxed">
        Your website configuration has been received. I will review your selections and send a formal proposal to your email within 24 hours.
      </p>
      <a
        href="/"
        className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-semibold hover:scale-105 transition-all duration-200 shadow-md"
      >
        Back to Home
      </a>
    </div>
  );
}

// ─── Main Wizard ──────────────────────────────────────────────────────────────

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xkjwobve";

export function OrderWizard() {
  const { step, totalSteps, setStep, form, estimatedPrice, estimatedDays } = useOrder();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function canProceed(): boolean {
    if (step === 1) return form.projectType !== "";
    // Other steps don't have hard blockers until final review
    return true;
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...form,
          estimatedPrice: "₹" + estimatedPrice.toLocaleString(),
          estimatedDays: estimatedDays + " Days",
          _subject: "New Website Project — " + form.projectType,
        }),
      });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      alert("Something went wrong. Please try again or email me directly.");
    } finally {
      setSubmitting(false);
    }
  }

  // Prevent hydration mismatch
  if (!mounted) return <div className="min-h-screen" />;

  if (submitted) return <SuccessScreen />;

  const renderStep = () => {
    if (step === 1) return <CategorySelection />;

    if (form.projectType === "custom_story") {
      switch (step) {
        case 2: return <ConfiguratorCustomStory stepId={1} />; // Purpose
        case 3: return <ConfiguratorCustomStory stepId={2} />; // Recipient
        case 4: return <ConfiguratorCustomStory stepId={3} />; // Story
        case 5: return <ConfiguratorCustomStory stepId={4} />; // Feelings
        case 6: return <DesignStudio />;                       // Design Style
        case 7: return <ConfiguratorCustomStory stepId={6} />; // Quality
        case 8: return <ConfiguratorCustomStory stepId={7} />; // Content Collection
        case 9: return <ConfiguratorCustomStory stepId={8} />; // Anything Else + Contact
        default: return <FinalReview />;
      }
    }

    // Default flow
    switch (step) {
      case 2:
        if (form.projectType === "birthday") return <ConfiguratorBirthday />;
        if (form.projectType === "portfolio") return <ConfiguratorPortfolio />;
        if (form.projectType === "business_site") return <ConfiguratorBusiness />;
        return <ConfiguratorGeneric />;
      case 3:
        return <DesignStudio />;
      case 4:
        return <FinalReview />;
      default:
        return <FinalReview />;
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto pb-24">
      {/* Header */}
      <div className="mb-16 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent-peach)] font-bold mb-4">
          Intelligent Configurator
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-black dark:text-white leading-[1.1] tracking-tight max-w-3xl mx-auto">
          Commission your digital experience.
        </h1>
      </div>

      {/* 70/30 Split Layout */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        
        {/* Left Side (70%) - Configurator Flow */}
        <div className="w-full lg:flex-[0_0_65%]">
          <ProgressTracker />
          
          <div className="min-h-[500px]">
            {renderStep()}
          </div>
          
          {/* Bottom Navigation */}
          <div className="mt-16 pt-8 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => {
                  setStep(step - 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 text-sm font-semibold text-black/50 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors py-2 px-4 -ml-4"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
            ) : (
              <div />
            )}

            {step < totalSteps - 1 ? (
              <button
                type="button"
                onClick={() => {
                  setStep(step + 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={!canProceed()}
                className={cn(
                  "group flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all duration-300",
                  canProceed()
                    ? "bg-black dark:bg-white text-white dark:text-black hover:scale-[1.02] shadow-lg shadow-black/10 dark:shadow-white/10"
                    : "bg-black/5 dark:bg-white/5 text-black/30 dark:text-white/20 cursor-not-allowed"
                )}
              >
                Continue to Next Step
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting || !form.name || !form.email}
                className={cn(
                  "group flex items-center gap-2 px-10 py-4 rounded-full font-bold text-sm transition-all duration-300",
                  !submitting && form.name && form.email
                    ? "bg-[var(--color-accent-peach)] text-white hover:scale-[1.02] shadow-lg shadow-[var(--color-accent-peach)]/30"
                    : "bg-black/5 dark:bg-white/5 text-black/30 dark:text-white/20 cursor-not-allowed"
                )}
              >
                {submitting ? "Processing..." : "Submit Configuration"}
              </button>
            )}
          </div>
        </div>

        {/* Right Side (30%) - Sticky Summary */}
        <div className="w-full lg:flex-[0_0_35%] lg:min-w-[320px]">
          <StickySummary />
        </div>
        
      </div>
    </div>
  );
}
