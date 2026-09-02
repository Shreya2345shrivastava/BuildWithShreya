"use client";
import React from "react";
import { motion } from "framer-motion";

export function MotionPageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col pb-24 max-w-full"
    >
      {children}
    </motion.div>
  );
}
