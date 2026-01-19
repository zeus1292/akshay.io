"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ModeToggleProps {
  mode: "work" | "play";
  onToggle: (mode: "work" | "play") => void;
  className?: string;
}

export function ModeToggle({ mode, onToggle, className }: ModeToggleProps) {
  const isPlay = mode === "play";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "text-sm font-medium transition-colors duration-300",
          !isPlay ? "text-cream-700" : "text-cream-400"
        )}
      >
        Work
      </span>

      {/* Light Bulb Toggle */}
      <button
        onClick={() => onToggle(isPlay ? "work" : "play")}
        className="relative group"
        aria-label={`Switch to ${isPlay ? "work" : "play"} mode`}
      >
        {/* Glow effect for Play mode */}
        {isPlay && (
          <motion.div
            className="absolute inset-0 rounded-full bg-yellow-300 blur-xl"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.6, scale: 1.5 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Light bulb container */}
        <motion.div
          className={cn(
            "relative w-12 h-16 flex flex-col items-center justify-end cursor-pointer transition-all duration-300",
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Bulb */}
          <motion.svg
            viewBox="0 0 48 64"
            className="w-12 h-16"
            initial={false}
            animate={{
              filter: isPlay ? "drop-shadow(0 0 8px #FCD34D)" : "none",
            }}
          >
            {/* Bulb glass */}
            <motion.path
              d="M24 4 C12 4 4 14 4 26 C4 34 8 40 14 44 L14 48 L34 48 L34 44 C40 40 44 34 44 26 C44 14 36 4 24 4"
              fill={isPlay ? "#FEF3C7" : "#E8DFD5"}
              stroke={isPlay ? "#FCD34D" : "#C4B8AB"}
              strokeWidth="2"
              initial={false}
              animate={{
                fill: isPlay ? "#FEF3C7" : "#E8DFD5",
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Inner glow when on */}
            {isPlay && (
              <motion.ellipse
                cx="24"
                cy="26"
                rx="12"
                ry="14"
                fill="#FCD34D"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.3 }}
              />
            )}

            {/* Filament */}
            <motion.path
              d="M18 28 Q20 22 24 28 Q28 22 30 28"
              fill="none"
              stroke={isPlay ? "#F97316" : "#9A8F82"}
              strokeWidth="2"
              strokeLinecap="round"
              initial={false}
              animate={{
                stroke: isPlay ? "#F97316" : "#9A8F82",
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Base/screw part */}
            <rect x="14" y="48" width="20" height="4" fill="#6B6156" rx="1" />
            <rect x="16" y="52" width="16" height="3" fill="#4A423A" rx="1" />
            <rect x="18" y="55" width="12" height="3" fill="#6B6156" rx="1" />
            <rect x="20" y="58" width="8" height="4" fill="#4A423A" rx="2" />
          </motion.svg>

          {/* Sparkles when in Play mode */}
          {isPlay && (
            <>
              <motion.div
                className="absolute -top-1 -left-1 text-yellow-400 text-xs"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                ✦
              </motion.div>
              <motion.div
                className="absolute top-2 -right-2 text-yellow-400 text-xs"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                ✦
              </motion.div>
              <motion.div
                className="absolute -top-2 right-1 text-yellow-300 text-[10px]"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
              >
                ✦
              </motion.div>
            </>
          )}
        </motion.div>
      </button>

      <span
        className={cn(
          "text-sm font-medium transition-colors duration-300",
          isPlay ? "text-yellow-600" : "text-cream-400"
        )}
      >
        Play
      </span>
    </div>
  );
}
