"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  category: "ai" | "infrastructure" | "data" | "product" | "leadership";
  level: "expert" | "advanced" | "proficient";
}

const skills: Skill[] = [
  // AI/ML
  { name: "RAG Pipelines", category: "ai", level: "expert" },
  { name: "LangGraph", category: "ai", level: "expert" },
  { name: "crewAI", category: "ai", level: "expert" },
  { name: "LLM Fine-tuning", category: "ai", level: "advanced" },
  { name: "Prompt Engineering", category: "ai", level: "expert" },
  { name: "LangSmith", category: "ai", level: "advanced" },
  { name: "Agentic Workflows", category: "ai", level: "expert" },

  // Infrastructure
  { name: "AWS", category: "infrastructure", level: "advanced" },
  { name: "Azure", category: "infrastructure", level: "advanced" },
  { name: "Docker", category: "infrastructure", level: "proficient" },
  { name: "CI/CD", category: "infrastructure", level: "advanced" },
  { name: "REST APIs", category: "infrastructure", level: "expert" },
  { name: "Microservices", category: "infrastructure", level: "advanced" },

  // Data
  { name: "Python", category: "data", level: "expert" },
  { name: "SQL", category: "data", level: "expert" },
  { name: "Snowflake", category: "data", level: "advanced" },
  { name: "dbt", category: "data", level: "advanced" },
  { name: "PostgreSQL", category: "data", level: "advanced" },
  { name: "Data Modeling", category: "data", level: "expert" },

  // Product
  { name: "Roadmapping", category: "product", level: "expert" },
  { name: "PRDs", category: "product", level: "expert" },
  { name: "User Research", category: "product", level: "advanced" },
  { name: "Figma", category: "product", level: "proficient" },
  { name: "Jira", category: "product", level: "expert" },
  { name: "Agile/Scrum", category: "product", level: "expert" },

  // Leadership
  { name: "Strategy", category: "leadership", level: "expert" },
  { name: "Stakeholder Mgmt", category: "leadership", level: "expert" },
  { name: "Cross-functional", category: "leadership", level: "expert" },
  { name: "Technical Writing", category: "leadership", level: "advanced" },
];

const categoryColors = {
  ai: { bg: "bg-pastel-purple", border: "border-pastel-purple-dark/40", text: "text-accent-violet" },
  infrastructure: { bg: "bg-pastel-blue", border: "border-pastel-blue-dark/40", text: "text-accent-indigo" },
  data: { bg: "bg-pastel-mint", border: "border-pastel-mint-dark/40", text: "text-accent-emerald" },
  product: { bg: "bg-pastel-peach", border: "border-pastel-peach-dark/40", text: "text-accent-coral" },
  leadership: { bg: "bg-pastel-pink", border: "border-pastel-pink-dark/40", text: "text-accent-coral" },
};

const levelSizes = {
  expert: "text-sm px-4 py-2",
  advanced: "text-xs px-3 py-1.5",
  proficient: "text-xs px-2.5 py-1",
};

interface Bubble {
  skill: Skill;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export function SkillsBubbles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef<number>(0);

  // Initialize bubbles
  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });

        // Create bubbles with random positions
        const newBubbles: Bubble[] = skills.map((skill, i) => {
          const size = skill.level === "expert" ? 1.2 : skill.level === "advanced" ? 1 : 0.85;
          return {
            skill,
            x: Math.random() * (width - 120) + 60,
            y: Math.random() * (height - 60) + 30,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size,
          };
        });
        setBubbles(newBubbles);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Animate bubbles
  useEffect(() => {
    if (bubbles.length === 0 || dimensions.width === 0) return;

    const animate = () => {
      setBubbles((prevBubbles) =>
        prevBubbles.map((bubble) => {
          let { x, y, vx, vy } = bubble;

          // Update position
          x += vx;
          y += vy;

          // Bounce off walls with some padding
          const padding = 60;
          if (x < padding || x > dimensions.width - padding) {
            vx = -vx * 0.9;
            x = Math.max(padding, Math.min(dimensions.width - padding, x));
          }
          if (y < padding || y > dimensions.height - padding) {
            vy = -vy * 0.9;
            y = Math.max(padding, Math.min(dimensions.height - padding, y));
          }

          // Add slight random movement for organic feel
          vx += (Math.random() - 0.5) * 0.02;
          vy += (Math.random() - 0.5) * 0.02;

          // Dampen velocity
          vx *= 0.999;
          vy *= 0.999;

          // Ensure minimum movement
          if (Math.abs(vx) < 0.1) vx = (Math.random() - 0.5) * 0.3;
          if (Math.abs(vy) < 0.1) vy = (Math.random() - 0.5) * 0.3;

          return { ...bubble, x, y, vx, vy };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [bubbles.length, dimensions]);

  // Category legend
  const categories = [
    { key: "ai", label: "AI/ML" },
    { key: "infrastructure", label: "Infrastructure" },
    { key: "data", label: "Data" },
    { key: "product", label: "Product" },
    { key: "leadership", label: "Leadership" },
  ] as const;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full bg-pastel-blue/50 text-accent-indigo text-sm font-medium mb-4"
            whileHover={{ scale: 1.05 }}
          >
            Technical Expertise
          </motion.span>
          <h2 className="text-3xl sm:text-4xl font-bold text-cream-800 mb-4">
            Skills & Technologies
          </h2>
          <p className="text-cream-500 max-w-2xl mx-auto">
            A dynamic view of my technical toolkit, built over years of shipping AI-powered products.
          </p>
        </motion.div>

        {/* Category Legend */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {categories.map(({ key, label }) => (
            <div
              key={key}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium",
                categoryColors[key].bg,
                categoryColors[key].border,
                "border"
              )}
            >
              <span className={cn("w-2 h-2 rounded-full", categoryColors[key].text, "bg-current")} />
              <span className="text-cream-700">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Bubbles Container */}
        <motion.div
          ref={containerRef}
          className="relative h-[400px] sm:h-[500px] rounded-3xl bg-gradient-to-br from-cream-50 to-cream-100 border border-cream-200 overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-pastel-purple/50 blur-3xl" />
            <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-pastel-blue/50 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-pastel-mint/40 blur-3xl" />
          </div>

          {/* Floating Bubbles */}
          {bubbles.map((bubble, index) => {
            const colors = categoryColors[bubble.skill.category];
            const sizeClass = levelSizes[bubble.skill.level];

            return (
              <motion.div
                key={`${bubble.skill.name}-${index}`}
                className={cn(
                  "absolute rounded-full font-medium whitespace-nowrap cursor-default",
                  "border shadow-sm backdrop-blur-sm",
                  "hover:scale-110 hover:shadow-md transition-all duration-200",
                  colors.bg,
                  colors.border,
                  sizeClass
                )}
                style={{
                  left: bubble.x,
                  top: bubble.y,
                  transform: `translate(-50%, -50%) scale(${bubble.size})`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: bubble.size }}
                transition={{ delay: index * 0.02, duration: 0.3 }}
                whileHover={{ zIndex: 10 }}
              >
                <span className="text-cream-700">{bubble.skill.name}</span>
              </motion.div>
            );
          })}

          {/* Empty state for SSR */}
          {bubbles.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-cream-400">Loading skills...</p>
            </div>
          )}
        </motion.div>

        {/* Size legend */}
        <motion.div
          className="flex justify-center gap-6 mt-6 text-xs text-cream-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <span>Larger = More expertise</span>
        </motion.div>
      </div>
    </section>
  );
}
