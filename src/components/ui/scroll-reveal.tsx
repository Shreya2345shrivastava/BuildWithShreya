"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.8,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const directionOffset = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        ...directionOffset[direction] 
      }}
      animate={
        isInView 
          ? { opacity: 1, y: 0, x: 0 } 
          : { opacity: 0, ...directionOffset[direction] }
      }
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Custom ease for smooth cinematic feel
      }}
      className={cn("will-change-transform", className)}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

interface FadeInStaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
}

export function FadeInStagger({ 
  children, 
  className,
  staggerDelay = 0.1,
  initialDelay = 0
}: FadeInStaggerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInStaggerItem({
  children,
  className,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}) {
  const directionOffset = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, ...directionOffset[direction] },
        visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } },
      }}
      className={cn("will-change-transform", className)}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  className?: string;
  offset?: number;
}

export function ParallaxBackground({
  children,
  className,
  offset = 100,
}: ParallaxBackgroundProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <motion.div style={{ y }} className="w-full h-full will-change-transform [transform:translateZ(0)]">
        {children}
      </motion.div>
    </div>
  );
}
