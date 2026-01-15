"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Gamepad2,
  Mountain,
  Waves,
  Coffee,
  Book,
  Music,
  Camera,
  Plane,
  Code2,
  Brain,
  Dumbbell,
  ChefHat,
  Film,
  Podcast,
  Telescope,
  Palette,
  Guitar,
  TreePine,
} from "lucide-react";

interface InterestsMarqueeProps {
  mode: "work" | "play";
}

interface Interest {
  label: string;
  icon: typeof Gamepad2;
  color: string;
  bgColor: string;
}

const workInterests: Interest[] = [
  { label: "AI/ML Research", icon: Brain, color: "text-accent-violet", bgColor: "bg-pastel-purple" },
  { label: "Product Strategy", icon: Telescope, color: "text-accent-indigo", bgColor: "bg-pastel-blue" },
  { label: "System Design", icon: Code2, color: "text-accent-emerald", bgColor: "bg-pastel-mint" },
  { label: "Data Visualization", icon: Palette, color: "text-accent-coral", bgColor: "bg-pastel-peach" },
  { label: "Technical Writing", icon: Book, color: "text-accent-violet", bgColor: "bg-pastel-lavender" },
  { label: "Open Source", icon: Code2, color: "text-accent-indigo", bgColor: "bg-pastel-blue" },
  { label: "Podcasts", icon: Podcast, color: "text-accent-coral", bgColor: "bg-pastel-pink" },
  { label: "Fitness", icon: Dumbbell, color: "text-accent-emerald", bgColor: "bg-pastel-mint" },
  { label: "Photography", icon: Camera, color: "text-accent-violet", bgColor: "bg-pastel-purple" },
  { label: "Travel", icon: Plane, color: "text-accent-indigo", bgColor: "bg-pastel-blue" },
  { label: "Cooking", icon: ChefHat, color: "text-accent-coral", bgColor: "bg-pastel-peach" },
  { label: "Music", icon: Music, color: "text-accent-violet", bgColor: "bg-pastel-lavender" },
];

const playInterests: Interest[] = [
  { label: "Gaming (obviously)", icon: Gamepad2, color: "text-accent-violet", bgColor: "bg-pastel-purple" },
  { label: "Skydiving", icon: Plane, color: "text-accent-indigo", bgColor: "bg-pastel-blue" },
  { label: "Surfing", icon: Waves, color: "text-accent-indigo", bgColor: "bg-pastel-blue" },
  { label: "Hiking", icon: Mountain, color: "text-accent-emerald", bgColor: "bg-pastel-mint" },
  { label: "Coffee Snobbery", icon: Coffee, color: "text-accent-coral", bgColor: "bg-pastel-peach" },
  { label: "Sci-Fi Everything", icon: Telescope, color: "text-accent-violet", bgColor: "bg-pastel-lavender" },
  { label: "Dad Jokes", icon: Film, color: "text-accent-coral", bgColor: "bg-pastel-pink" },
  { label: "Guitar (badly)", icon: Guitar, color: "text-accent-violet", bgColor: "bg-pastel-purple" },
  { label: "Nature Walks", icon: TreePine, color: "text-accent-emerald", bgColor: "bg-pastel-mint" },
  { label: "Meme Analysis", icon: Brain, color: "text-accent-indigo", bgColor: "bg-pastel-blue" },
  { label: "Napping", icon: Coffee, color: "text-accent-coral", bgColor: "bg-pastel-peach" },
  { label: "Snack Procurement", icon: ChefHat, color: "text-accent-coral", bgColor: "bg-pastel-yellow" },
];

function MarqueeRow({
  interests,
  direction = "left",
  speed = 25,
}: {
  interests: Interest[];
  direction?: "left" | "right";
  speed?: number;
}) {
  // Double the items for seamless looping
  const items = [...interests, ...interests];

  return (
    <div className="relative overflow-hidden py-3">
      <motion.div
        className="flex gap-4"
        animate={{
          x: direction === "left" ? [0, -50 * interests.length * 4] : [-50 * interests.length * 4, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {items.map((interest, index) => (
          <motion.div
            key={`${interest.label}-${index}`}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap",
              "border border-white/60 shadow-sm",
              "hover:scale-105 transition-transform cursor-default",
              interest.bgColor
            )}
            whileHover={{ y: -3 }}
          >
            <interest.icon className={cn("w-4 h-4", interest.color)} />
            <span className="text-cream-700 font-medium text-sm">{interest.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// Floating 3D-ish tag cloud
function TagCloud({ interests }: { interests: Interest[] }) {
  return (
    <div className="relative h-64 sm:h-80 overflow-hidden">
      {interests.map((interest, index) => {
        // Create pseudo-random positions that look natural
        const angle = (index / interests.length) * Math.PI * 2;
        const radius = 30 + (index % 3) * 15;
        const x = 50 + Math.cos(angle) * radius;
        const y = 50 + Math.sin(angle) * radius;
        const scale = 0.8 + (index % 4) * 0.15;
        const delay = index * 0.3;

        return (
          <motion.div
            key={interest.label}
            className={cn(
              "absolute flex items-center gap-2 px-4 py-2.5 rounded-full",
              "border border-white/60 shadow-sm cursor-default",
              interest.bgColor
            )}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: scale,
              y: [0, -10, 0, 10, 0],
              x: [0, 5, 0, -5, 0],
            }}
            transition={{
              opacity: { duration: 0.5, delay: delay * 0.1 },
              scale: { duration: 0.5, delay: delay * 0.1 },
              y: {
                duration: 6 + (index % 3),
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay * 0.2,
              },
              x: {
                duration: 8 + (index % 4),
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay * 0.3,
              },
            }}
            whileHover={{ scale: scale * 1.15, zIndex: 10 }}
          >
            <interest.icon className={cn("w-4 h-4", interest.color)} />
            <span className="text-cream-700 font-medium text-sm whitespace-nowrap">
              {interest.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

export function InterestsMarquee({ mode }: InterestsMarqueeProps) {
  const interests = mode === "work" ? workInterests : playInterests;
  const firstHalf = interests.slice(0, Math.ceil(interests.length / 2));
  const secondHalf = interests.slice(Math.ceil(interests.length / 2));

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 rounded-full bg-pastel-pink/30 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 rounded-full bg-pastel-blue/30 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full bg-pastel-pink/50 text-accent-coral text-sm font-medium mb-4"
            whileHover={{ scale: 1.05 }}
          >
            {mode === "work" ? "Beyond the Code" : "The Real Me"}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl font-bold text-cream-800 mb-4">
            {mode === "work" ? "Interests & Passions" : "Things That Spark Joy"}
          </h2>
          <p className="text-cream-500 max-w-2xl mx-auto">
            {mode === "work"
              ? "I believe the best products come from curious minds. Here's what keeps me inspired."
              : "When I'm not pretending to be productive, you'll find me doing these things."}
          </p>
        </motion.div>

        {/* Desktop: Double marquee rows */}
        <div className="hidden md:block">
          <MarqueeRow interests={firstHalf} direction="left" speed={30} />
          <MarqueeRow interests={secondHalf} direction="right" speed={35} />
        </div>

        {/* Mobile: Floating tag cloud */}
        <div className="md:hidden">
          <TagCloud interests={interests} />
        </div>

        {/* Fun stat */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-cream-400 text-sm">
            {mode === "work"
              ? "Always learning, always building, always caffeinated."
              : "Current status: Probably doing one of these right now."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
