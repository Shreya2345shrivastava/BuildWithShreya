"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export function AmbientPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Using a reliable, royalty-free placeholder ambient track
  // In production, you would replace this with your own /audio/ambient.mp3
  const audioUrl = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (!mounted) return null;

  return (
    <div className={cn(
      "fixed bottom-8 right-8 z-50 flex items-center gap-3 p-2 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all duration-500 backdrop-blur-xl border",
      theme === 'midnight' ? "bg-[#181D1B]/80 border-[#2A332D]" : "bg-white/80 border-white"
    )}>
      <audio 
        ref={audioRef} 
        src={audioUrl} 
        loop 
        preload="none"
      />

      {/* Floating Notes Animation when playing */}
      <div className="relative flex items-center justify-center w-12 h-12">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "absolute inset-0 flex items-center justify-center rounded-full transition-all duration-300 z-10",
            theme === 'midnight' ? "bg-[#242B28] text-[#A8B69D] hover:bg-[#2b3330]" : "bg-[#FCF8F2] text-[#D9895B] hover:bg-[#F5E7DB]"
          )}
          title="Reading Soundtrack"
        >
          <Music size={18} className={cn("transition-transform duration-1000", isPlaying ? "animate-pulse" : "")} />
        </button>
        
        {/* Animated rings when playing */}
        {isPlaying && (
          <>
            <div className={cn(
              "absolute inset-0 rounded-full animate-ping opacity-20",
              theme === 'midnight' ? "bg-[#A8B69D]" : "bg-[#D9895B]"
            )} style={{ animationDuration: '3s' }} />
            <div className={cn(
              "absolute inset-0 rounded-full animate-ping opacity-20 delay-700",
              theme === 'midnight' ? "bg-[#A8B69D]" : "bg-[#D9895B]"
            )} style={{ animationDuration: '3s' }} />
          </>
        )}
      </div>

      {/* Expanded Controls */}
      <div className={cn(
        "flex items-center gap-4 overflow-hidden transition-all duration-500 ease-in-out",
        isExpanded ? "w-48 opacity-100 px-3" : "w-0 opacity-0 px-0"
      )}>
        <button 
          onClick={togglePlay}
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full transition-colors shrink-0",
            theme === 'midnight' ? "hover:bg-[#2A332D] text-[#E8EFE9]" : "hover:bg-[#F5E7DB] text-[#3A332D]"
          )}
        >
          {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
        </button>

        <div className="flex items-center gap-2 flex-1 w-full">
          <button 
            onClick={toggleMute}
            className={cn(
              "transition-colors shrink-0",
              theme === 'midnight' ? "text-[#799980] hover:text-[#A8B69D]" : "text-[#8A837D] hover:text-[#D9895B]"
            )}
          >
            {isMuted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className={cn(
              "w-full h-1 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full cursor-pointer",
              theme === 'midnight' ? "bg-[#2A332D] [&::-webkit-slider-thumb]:bg-[#A8B69D]" : "bg-[#EADFD2] [&::-webkit-slider-thumb]:bg-[#D9895B]"
            )}
          />
        </div>
      </div>
    </div>
  );
}
