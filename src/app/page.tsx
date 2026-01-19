"use client";

import { useState } from "react";
import { Hero } from "@/components/Hero";
import { BentoGrid } from "@/components/BentoGrid";
import { PixelBackground } from "@/components/PixelBackground";
import { ProjectGallery } from "@/components/ProjectGallery";
import { InterestsMarquee } from "@/components/InterestsMarquee";
import { SkillsBubbles } from "@/components/SkillsBubbles";
import { PMHustleGame } from "@/components/PMHustleGame";

export default function Home() {
  const [mode, setMode] = useState<"work" | "play">("work");

  return (
    <main className={`relative min-h-screen ${mode === "work" ? "mode-work" : "mode-play"}`}>
      {/* Lightweight pixel art animation running in background */}
      <PixelBackground mode={mode} />

      {/* Main content sections */}
      <Hero mode={mode} onModeToggle={setMode} />
      <BentoGrid mode={mode} />

      {/* Professional Experience (Work) or Personal Projects (Play) */}
      <ProjectGallery mode={mode} />

      {/* Work mode: Skills Bubbles | Play mode: Interests Marquee */}
      {mode === "work" ? (
        <SkillsBubbles />
      ) : (
        <InterestsMarquee mode={mode} />
      )}

      {/* Mini-game - shown in both modes with different tone */}
      <PMHustleGame mode={mode} />

      {/* Footer */}
      <footer className="py-12 px-4 text-center border-t border-cream-200">
        <p className="text-cream-400 text-sm">
          {mode === "work"
            ? "Built with Next.js, Tailwind CSS, and Framer Motion"
            : "Made with ☕, 🎮, and questionable life choices"}
        </p>
        <p className="text-cream-300 text-xs mt-2">
          © {new Date().getFullYear()} • All rights reserved
        </p>
      </footer>
    </main>
  );
}
