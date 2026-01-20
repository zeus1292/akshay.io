"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AnimatedAvatarProps {
  mode: "work" | "play";
}

export function AnimatedAvatar({ mode }: AnimatedAvatarProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Animated rings */}
      <motion.div
        className={cn(
          "absolute -inset-4 rounded-full",
          mode === "work"
            ? "bg-gradient-to-r from-accent-indigo/20 via-accent-violet/20 to-accent-indigo/20"
            : "bg-gradient-to-r from-accent-coral/20 via-accent-violet/20 to-accent-emerald/20"
        )}
        animate={{
          rotate: 360,
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      <motion.div
        className={cn(
          "absolute -inset-2 rounded-full",
          mode === "work"
            ? "bg-gradient-to-l from-pastel-blue/40 via-pastel-purple/40 to-pastel-blue/40"
            : "bg-gradient-to-l from-pastel-pink/40 via-pastel-mint/40 to-pastel-yellow/40"
        )}
        animate={{
          rotate: -360,
        }}
        transition={{
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
        }}
      />

      {/* Avatar container with stylized effect */}
      <motion.div
        className={cn(
          "relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 shadow-xl",
          mode === "work"
            ? "border-white/80"
            : "border-pastel-yellow"
        )}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.05 }}
      >
        {/* Profile image with cartoon effect filter */}
        <div
          className={cn(
            "relative w-full h-full",
            mode === "play" && "animate-avatar-filter"
          )}
        >
          <Image
            src="/images/cartoon-avatar.png"
            alt="Akshay Kumar"
            fill
            className="object-cover object-top"
            style={{ objectPosition: "center 15%" }}
            priority
          />

          {/* Overlay for cartoon effect */}
          <div
            className={cn(
              "absolute inset-0 mix-blend-soft-light",
              mode === "work"
                ? "bg-gradient-to-br from-transparent via-transparent to-accent-indigo/10"
                : "bg-gradient-to-br from-pastel-pink/20 via-transparent to-pastel-mint/20"
            )}
          />
        </div>
      </motion.div>

      {/* Sparkle effects for Play mode */}
      {mode === "play" && (
        <>
          <motion.div
            className="absolute -top-2 -right-2 text-xl"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 15, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ✨
          </motion.div>
          <motion.div
            className="absolute -bottom-1 -left-3 text-lg"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            ⭐
          </motion.div>
          <motion.div
            className="absolute top-1/2 -right-4 text-sm"
            animate={{
              y: [0, -5, 0],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
          >
            ✦
          </motion.div>
        </>
      )}

      {/* Professional badge for Work mode */}
      {mode === "work" && (
        <motion.div
          className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-accent-indigo to-accent-violet flex items-center justify-center shadow-lg border-2 border-white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
        >
          <span className="text-white text-xs font-bold">PM</span>
        </motion.div>
      )}
    </motion.div>
  );
}
