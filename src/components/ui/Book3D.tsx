"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

interface Book3DProps {
  coverUrl: string;
  title: string;
  className?: string;
}

export function Book3D({ coverUrl, title, className = "" }: Book3DProps) {
  const [rotate, setRotate] = useState({ x: 0, y: -20 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on mouse position (max 15 degrees)
    const rotateY = ((x / rect.width) - 0.5) * 30 - 10; 
    const rotateX = ((y / rect.height) - 0.5) * -30;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Return to resting isometric state
    setRotate({ x: 0, y: -20 });
  };

  return (
    <div 
      ref={containerRef}
      className={`relative perspective-1000 w-full max-w-[400px] aspect-[3/4] mx-auto cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1200px' }}
    >
      <div 
        className="w-full h-full relative transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 1s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        {/* Front Cover */}
        <div 
          className="absolute inset-0 rounded-[2px] overflow-hidden border border-black/5"
          style={{ transform: 'translateZ(20px)' }}
        >
          <img 
            src={coverUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          {/* Subtle lighting overlay based on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/20 mix-blend-overlay"></div>
        </div>

        {/* Back Cover */}
        <div 
          className="absolute inset-0 bg-[#e8efe9] rounded-[2px] border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
          style={{ transform: 'rotateY(180deg) translateZ(20px)' }}
        ></div>

        {/* Spine */}
        <div 
          className="absolute top-0 bottom-0 left-0 bg-[#d5ccbe] border-y border-l border-black/10 flex items-center justify-center overflow-hidden rounded-l-[2px]"
          style={{ width: '40px', transform: 'rotateY(-90deg) translateZ(20px)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 mix-blend-overlay"></div>
          <span className="transform -rotate-90 text-[10px] uppercase tracking-[0.2em] font-serif whitespace-nowrap text-black/60">
            {title}
          </span>
        </div>

        {/* Top Pages */}
        <div 
          className="absolute top-0 left-[2px] right-[2px] bg-[#f4f4f4] border-t border-black/5 flex items-center justify-center overflow-hidden"
          style={{ height: '40px', transform: 'rotateX(90deg) translateZ(19px)', background: 'repeating-linear-gradient(to bottom, #f4f4f4, #f4f4f4 1px, #e0e0e0 2px)' }}
        ></div>

        {/* Right Pages (Fore-edge) */}
        <div 
          className="absolute top-[2px] bottom-[2px] right-0 bg-[#f4f4f4] border-r border-black/5 flex items-center justify-center overflow-hidden"
          style={{ width: '40px', transform: 'rotateY(90deg) translateZ(19px)', background: 'repeating-linear-gradient(to right, #f4f4f4, #f4f4f4 1px, #e0e0e0 2px)' }}
        ></div>
        
        {/* Bottom Pages */}
        <div 
          className="absolute bottom-0 left-[2px] right-[2px] bg-[#f4f4f4] border-b border-black/5 flex items-center justify-center overflow-hidden"
          style={{ height: '40px', transform: 'rotateX(-90deg) translateZ(19px)', background: 'repeating-linear-gradient(to top, #f4f4f4, #f4f4f4 1px, #e0e0e0 2px)' }}
        ></div>
      </div>
    </div>
  );
}
