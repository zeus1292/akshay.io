"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Briefcase, Sparkles } from "lucide-react";

interface ModeToggleProps {
  mode: "work" | "play";
  onToggle: (mode: "work" | "play") => void;
  className?: string;
}

export function ModeToggle({ mode, onToggle, className }: ModeToggleProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "text-sm font-medium transition-colors duration-300",
          mode === "work" ? "text-accent-indigo" : "text-cream-400"
        )}
      >
        Work
      </span>
      <button
        onClick={() => onToggle(mode === "work" ? "play" : "work")}
        className={cn(
          "relative w-16 h-8 rounded-full p-1 transition-all duration-300",
          "bg-cream-200 border border-cream-300",
          "hover:border-cream-400",
          "shadow-sm"
        )}
        aria-label={`Switch to ${mode === "work" ? "play" : "work"} mode`}
      >
        <motion.div
          className={cn(
            "absolute top-1 w-6 h-6 rounded-full flex items-center justify-center shadow-md",
            mode === "work"
              ? "bg-gradient-to-br from-accent-indigo to-accent-violet"
              : "bg-gradient-to-br from-accent-coral to-pastel-pink-dark"
          )}
          animate={{
            x: mode === "work" ? 0 : 32,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        >
          {mode === "work" ? (
            <Briefcase className="w-3.5 h-3.5 text-white" />
          ) : (
            <Sparkles className="w-3.5 h-3.5 text-white" />
          )}
        </motion.div>
      </button>
      <span
        className={cn(
          "text-sm font-medium transition-colors duration-300",
          mode === "play" ? "text-accent-coral" : "text-cream-400"
        )}
      >
        Play
      </span>
    </div>
  );
}
