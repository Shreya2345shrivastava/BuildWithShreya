import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6">
      <div className="relative flex items-center justify-center">
        {/* Subtle glow effect behind the loader */}
        <div className="absolute h-16 w-16 animate-pulse rounded-full bg-[var(--color-accent-peach)] opacity-20 blur-xl"></div>
        
        {/* The loader icon */}
        <Loader2 
          size={40} 
          className="animate-spin text-[var(--color-accent-peach)] relative z-10" 
          strokeWidth={1.5}
        />
      </div>
      
      <div className="flex flex-col items-center space-y-2">
        <h3 className="font-serif text-xl text-[var(--color-text-primary)]">
          Loading...
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Preparing your workspace
        </p>
      </div>
    </div>
  );
}
