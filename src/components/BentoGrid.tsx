"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  Heart,
  Code2,
  Brain,
  Building2,
  Rocket,
  Coffee,
  Gamepad2,
  Music,
  Book,
  Cpu,
  Database,
  Cloud,
  Sparkles,
} from "lucide-react";

interface BentoGridProps {
  mode: "work" | "play";
}

const workCards = {
  professional: {
    title: "The TL;DR",
    icon: Briefcase,
    gradient: "from-electric to-electric/50",
    glowColor: "glow-electric",
    content: {
      headline: "Enterprise AI Product Leader",
      bullets: [
        "Led AI/ML product initiatives at Fortune 500 companies",
        "Shipped products used by 10,000+ enterprise users",
        "Expert in translating complex AI into user value",
      ],
      companies: [
        { name: "S&P Global", role: "Senior Product Manager" },
        { name: "C3 AI", role: "Product Manager" },
        { name: "Your Company", role: "Previous Role" },
      ],
    },
  },
  personal: {
    title: "The Origin Story",
    icon: Heart,
    gradient: "from-grape to-grape/50",
    glowColor: "glow-grape",
    content: {
      headline: "From Curious Kid to AI Builder",
      story:
        "Started coding at 12, fell in love with the intersection of technology and human experience. Today, I bridge the gap between cutting-edge AI research and products people actually want to use.",
      passions: ["Human-centered AI", "Product-led growth", "Data storytelling"],
    },
  },
  skills: {
    title: "The Toolkit",
    icon: Code2,
    gradient: "from-sunset to-sunset/50",
    glowColor: "glow-sunset",
    content: {
      categories: [
        {
          name: "AI/ML",
          icon: Brain,
          skills: ["LLMs", "RAG", "Fine-tuning", "Prompt Engineering"],
        },
        {
          name: "Infrastructure",
          icon: Cloud,
          skills: ["Docker", "Kubernetes", "AWS", "GCP"],
        },
        {
          name: "Data",
          icon: Database,
          skills: ["SQL", "Python", "Spark", "dbt"],
        },
        {
          name: "Product",
          icon: Cpu,
          skills: ["Figma", "Analytics", "A/B Testing", "Roadmapping"],
        },
      ],
    },
  },
};

const playCards = {
  professional: {
    title: "The Resume Version",
    icon: Coffee,
    gradient: "from-electric to-electric/50",
    glowColor: "glow-electric",
    content: {
      headline: "Professional Meeting Attendee",
      bullets: [
        "Expert at nodding thoughtfully in Zoom calls",
        "Can turn any feature request into a Jira epic",
        "Fluent in corporate buzzword bingo",
      ],
      companies: [
        { name: "S&P Global", role: "Slide Deck Artisan" },
        { name: "C3 AI", role: "AI Explainer-in-Chief" },
        { name: "Your Company", role: "Chief Coffee Drinker" },
      ],
    },
  },
  personal: {
    title: "The Real Me",
    icon: Gamepad2,
    gradient: "from-grape to-grape/50",
    glowColor: "glow-grape",
    content: {
      headline: "Part-Time Human, Full-Time Nerd",
      story:
        "When not debugging production issues at 2am, you'll find me exploring new games, going down YouTube rabbit holes, or convincing my friends that AI won't take their jobs (probably).",
      passions: ["Gaming marathons", "Sci-fi everything", "Dad jokes about AI"],
    },
  },
  skills: {
    title: "The Secret Powers",
    icon: Sparkles,
    gradient: "from-sunset to-sunset/50",
    glowColor: "glow-sunset",
    content: {
      categories: [
        {
          name: "Survival",
          icon: Coffee,
          skills: ["Coffee brewing", "Deadline dodging", "Scope negotiation", "Meeting escape"],
        },
        {
          name: "Entertainment",
          icon: Gamepad2,
          skills: ["Boss fights", "Speedruns", "Achievement hunting", "Rage quitting"],
        },
        {
          name: "Creative",
          icon: Music,
          skills: ["Playlist curation", "Meme analysis", "GIF selection", "Emoji fluency"],
        },
        {
          name: "Learning",
          icon: Book,
          skills: ["Wikipedia diving", "Tutorial hoarding", "Side project starting", "Never finishing"],
        },
      ],
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export function BentoGrid({ mode }: BentoGridProps) {
  const cards = mode === "work" ? workCards : playCards;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {mode === "work" ? "At a Glance" : "The Fun Version"}
          </h2>
          <p className="text-dark-400 max-w-2xl mx-auto">
            {mode === "work"
              ? "A quick overview of my professional journey, passions, and technical expertise."
              : "Everything they don't put on LinkedIn (for good reason)."}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Card 1: Professional */}
          <motion.div
            variants={cardVariants}
            className={cn(
              "lg:col-span-2 rounded-3xl glass noise overflow-hidden group",
              cards.professional.glowColor
            )}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={cn(
                    "p-3 rounded-2xl bg-gradient-to-br",
                    cards.professional.gradient
                  )}
                >
                  <cards.professional.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {cards.professional.title}
                </h3>
              </div>

              <h4 className="text-2xl font-bold gradient-text mb-4">
                {cards.professional.content.headline}
              </h4>

              <ul className="space-y-3 mb-6">
                {cards.professional.content.bullets.map((bullet, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3 text-dark-300"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <Rocket className="w-5 h-5 text-electric mt-0.5 flex-shrink-0" />
                    {bullet}
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                {cards.professional.content.companies.map((company, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark-800/50 border border-dark-700"
                    whileHover={{
                      scale: 1.05,
                      borderColor: "rgba(59, 130, 246, 0.5)",
                    }}
                  >
                    <Building2 className="w-4 h-4 text-electric" />
                    <span className="text-sm text-white font-medium">
                      {company.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2: Personal */}
          <motion.div
            variants={cardVariants}
            className={cn(
              "rounded-3xl glass noise overflow-hidden group",
              cards.personal.glowColor
            )}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-8 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={cn(
                    "p-3 rounded-2xl bg-gradient-to-br",
                    cards.personal.gradient
                  )}
                >
                  <cards.personal.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {cards.personal.title}
                </h3>
              </div>

              <h4 className="text-xl font-bold text-white mb-3">
                {cards.personal.content.headline}
              </h4>

              <p className="text-dark-300 leading-relaxed mb-6 flex-grow">
                {cards.personal.content.story}
              </p>

              <div className="flex flex-wrap gap-2">
                {cards.personal.content.passions.map((passion, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-grape/20 text-grape-300 text-sm border border-grape/30"
                  >
                    {passion}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 3: Skills */}
          <motion.div
            variants={cardVariants}
            className={cn(
              "lg:col-span-3 rounded-3xl glass noise overflow-hidden group",
              cards.skills.glowColor
            )}
            whileHover={{ scale: 1.01, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <div
                  className={cn(
                    "p-3 rounded-2xl bg-gradient-to-br",
                    cards.skills.gradient
                  )}
                >
                  <cards.skills.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {cards.skills.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.skills.content.categories.map((category, i) => (
                  <motion.div
                    key={i}
                    className="p-4 rounded-2xl bg-dark-800/50 border border-dark-700 hover:border-sunset/50 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    whileHover={{ y: -3 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <category.icon className="w-5 h-5 text-sunset" />
                      <span className="font-semibold text-white">
                        {category.name}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, j) => (
                        <motion.span
                          key={j}
                          className="px-2 py-1 rounded-md bg-dark-900/50 text-dark-300 text-xs border border-dark-700 hover:border-sunset/30 hover:text-sunset-300 transition-colors cursor-default"
                          whileHover={{ scale: 1.05 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
