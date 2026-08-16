"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoTestimonialCardProps {
  name: string;
  role: string;
  review: string;
  videoUrl: string;
  posterUrl?: string;
  heightClass?: string; // e.g. "h-[400px]" or "h-[500px]" for masonry variety
}

export function VideoTestimonialCard({
  name,
  role,
  review,
  videoUrl,
  posterUrl,
  heightClass = "h-[400px]",
}: VideoTestimonialCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      // Ensure it's playing in case it was paused
      videoRef.current.play().catch(() => {
        // Autoplay policy might block unmuting if no user interaction
        videoRef.current!.muted = true;
        setIsMuted(true);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  return (
    <div
      className={cn(
        "video-card relative w-full overflow-hidden rounded-2xl bg-black transform-gpu transition-all duration-500 ease-out mb-6 break-inside-avoid shadow-lg cursor-pointer",
        heightClass,
        isHovered ? "scale-[1.03] shadow-2xl z-10" : "scale-100 z-0"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMouseEnter} // Fallback for mobile
    >
      <video
        ref={videoRef}
        src={videoUrl}
        poster={posterUrl}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity duration-500 hover:opacity-100"
      />
      
      {/* Dark Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-6 text-white pointer-events-none">
        <p className="mb-4 text-sm font-medium leading-snug sm:text-base text-white/95 line-clamp-4">
          "{review}"
        </p>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-serif text-lg text-white">{name}</h4>
            <p className="text-xs text-white/70">{role}</p>
          </div>
          
          {/* Mute Toggle (Pointer events enabled so it can be clicked) */}
          <button 
            onClick={toggleMute}
            className={cn(
              "pointer-events-auto rounded-full p-2 bg-[var(--color-surface-elevated)] dark:bg-[#242b28]/10 backdrop-blur-sm border border-white/20 transition-all duration-300",
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            )}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
