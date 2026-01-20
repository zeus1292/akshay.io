"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Brain,
  Server,
  Database,
  Briefcase,
  Users,
} from "lucide-react";

interface Skill {
  name: string;
  category: "ai" | "infrastructure" | "data" | "product" | "leadership";
}

const skills: Skill[] = [
  // AI/ML
  { name: "RAG Pipelines", category: "ai" },
  { name: "LangGraph", category: "ai" },
  { name: "crewAI", category: "ai" },
  { name: "LLM Fine-tuning", category: "ai" },
  { name: "Prompt Engineering", category: "ai" },
  { name: "LangSmith", category: "ai" },
  { name: "Agentic Workflows", category: "ai" },

  // Infrastructure
  { name: "AWS", category: "infrastructure" },
  { name: "Azure", category: "infrastructure" },
  { name: "Docker", category: "infrastructure" },
  { name: "CI/CD", category: "infrastructure" },
  { name: "REST APIs", category: "infrastructure" },
  { name: "Microservices", category: "infrastructure" },

  // Data
  { name: "Python", category: "data" },
  { name: "SQL", category: "data" },
  { name: "Snowflake", category: "data" },
  { name: "dbt", category: "data" },
  { name: "PostgreSQL", category: "data" },
  { name: "Data Modeling", category: "data" },

  // Product
  { name: "Roadmapping", category: "product" },
  { name: "PRDs", category: "product" },
  { name: "User Research", category: "product" },
  { name: "Figma", category: "product" },
  { name: "Jira", category: "product" },
  { name: "Agile/Scrum", category: "product" },

  // Leadership
  { name: "Strategy", category: "leadership" },
  { name: "Stakeholder Mgmt", category: "leadership" },
  { name: "Cross-functional", category: "leadership" },
  { name: "Technical Writing", category: "leadership" },
];

const categoryConfig = {
  ai: {
    bg: "bg-pastel-purple",
    text: "text-accent-violet",
    icon: Brain,
  },
  infrastructure: {
    bg: "bg-pastel-blue",
    text: "text-accent-indigo",
    icon: Server,
  },
  data: {
    bg: "bg-pastel-mint",
    text: "text-accent-emerald",
    icon: Database,
  },
  product: {
    bg: "bg-pastel-peach",
    text: "text-accent-coral",
    icon: Briefcase,
  },
  leadership: {
    bg: "bg-pastel-pink",
    text: "text-accent-coral",
    icon: Users,
  },
};

function MarqueeRow({
  skills,
  direction = "left",
  speed = 25,
}: {
  skills: Skill[];
  direction?: "left" | "right";
  speed?: number;
}) {
  // Double the items for seamless looping
  const items = [...skills, ...skills];

  return (
    <div className="relative overflow-hidden py-3">
      <motion.div
        className="flex gap-4"
        animate={{
          x: direction === "left" ? [0, -50 * skills.length * 4] : [-50 * skills.length * 4, 0],
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
        {items.map((skill, index) => {
          const config = categoryConfig[skill.category];
          const Icon = config.icon;

          return (
            <motion.div
              key={`${skill.name}-${index}`}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap",
                "border border-white/60 shadow-sm",
                "hover:scale-105 transition-transform cursor-default",
                config.bg
              )}
              whileHover={{ y: -3 }}
            >
              <Icon className={cn("w-4 h-4", config.text)} />
              <span className="text-cream-700 font-medium text-sm">{skill.name}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export function SkillsMarquee() {
  // Split skills into rows by category for visual variety
  const aiAndData = skills.filter(s => s.category === "ai" || s.category === "data");
  const infraAndProduct = skills.filter(s => s.category === "infrastructure" || s.category === "product");
  const leadershipAndMore = skills.filter(s => s.category === "leadership");

  // Create three balanced rows
  const row1 = [...aiAndData.slice(0, 7), ...infraAndProduct.slice(0, 3)];
  const row2 = [...aiAndData.slice(7), ...infraAndProduct.slice(3), ...leadershipAndMore.slice(0, 2)];
  const row3 = [...leadershipAndMore.slice(2), ...skills.slice(0, 6)];

  // Category legend
  const categories = [
    { key: "ai" as const, label: "AI/ML" },
    { key: "infrastructure" as const, label: "Infrastructure" },
    { key: "data" as const, label: "Data" },
    { key: "product" as const, label: "Product" },
    { key: "leadership" as const, label: "Leadership" },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 rounded-full bg-pastel-purple/30 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 rounded-full bg-pastel-blue/30 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
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
          {categories.map(({ key, label }) => {
            const config = categoryConfig[key];
            const Icon = config.icon;
            return (
              <div
                key={key}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-white/60",
                  config.bg
                )}
              >
                <Icon className={cn("w-3 h-3", config.text)} />
                <span className="text-cream-700">{label}</span>
              </div>
            );
          })}
        </motion.div>

        {/* Marquee Rows */}
        <div className="space-y-2">
          <MarqueeRow skills={row1} direction="left" speed={35} />
          <MarqueeRow skills={row2} direction="right" speed={40} />
          <MarqueeRow skills={row3} direction="left" speed={30} />
        </div>

        {/* Tagline */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-cream-400 text-sm">
            Always learning, always building, always caffeinated.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
