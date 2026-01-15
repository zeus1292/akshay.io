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
          mode === "work" ? "text-electric" : "text-dark-400"
        )}
      >
        Work
      </span>
      <button
        onClick={() => onToggle(mode === "work" ? "play" : "work")}
        className={cn(
          "relative w-16 h-8 rounded-full p-1 transition-all duration-300",
          "bg-dark-800 border border-dark-700",
          mode === "work"
            ? "shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)]"
            : "shadow-[0_0_20px_-5px_rgba(249,115,22,0.5)]"
        )}
        aria-label={`Switch to ${mode === "work" ? "play" : "work"} mode`}
      >
        <motion.div
          className={cn(
            "absolute top-1 w-6 h-6 rounded-full flex items-center justify-center",
            mode === "work"
              ? "bg-gradient-to-br from-electric to-grape"
              : "bg-gradient-to-br from-sunset to-grape"
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
          mode === "play" ? "text-sunset" : "text-dark-400"
        )}
      >
        Play
      </span>
    </div>
  );
}
