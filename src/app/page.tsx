"use client";

import { useState } from "react";
import { Hero } from "@/components/Hero";
import { BentoGrid } from "@/components/BentoGrid";

export default function Home() {
  const [mode, setMode] = useState<"work" | "play">("work");

  return (
    <main className="relative">
      <Hero mode={mode} onModeToggle={setMode} />
      <BentoGrid mode={mode} />
    </main>
  );
}
