"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ExternalLink,
  Github,
  Lightbulb,
  Target,
  Sparkles,
  Rocket,
  Brain,
  BarChart3,
  Users,
  Zap,
} from "lucide-react";

interface ProjectGalleryProps {
  mode: "work" | "play";
}

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  techStack: string[];
  color: string;
  icon: typeof Brain;
  links?: {
    demo?: string;
    github?: string;
  };
}

const workProjects: Project[] = [
  {
    id: "ai-research-tool",
    title: "AI-Powered Research Tool",
    subtitle: "S&P Global",
    description:
      "Led product development for an AI research assistant that revolutionized how financial analysts discover and synthesize market intelligence.",
    problem:
      "Financial analysts spent 60% of their time manually searching through millions of documents, transcripts, and filings to find relevant insights.",
    solution:
      "Built a RAG-powered research tool with semantic search, automated summarization, and citation tracking. Implemented LangGraph for multi-step reasoning workflows.",
    impact: "Reduced research time by 70%, adopted by 500+ analysts across global teams",
    techStack: ["RAG", "LangGraph", "Python", "PostgreSQL", "React", "AWS"],
    color: "bg-pastel-blue",
    icon: BarChart3,
  },
  {
    id: "agentic-platform",
    title: "Agentic Workflow Platform",
    subtitle: "C3 AI",
    description:
      "Designed and shipped an enterprise platform enabling teams to build, deploy, and monitor AI agents for complex business processes.",
    problem:
      "Enterprises wanted to automate complex multi-step processes but struggled with reliability, observability, and governance of AI agents.",
    solution:
      "Created a no-code agent builder with crewAI integration, LangSmith observability, human-in-the-loop checkpoints, and enterprise-grade security controls.",
    impact: "Enabled 10+ Fortune 500 clients to deploy production AI agents",
    techStack: ["crewAI", "LangSmith", "Python", "Azure", "React", "Docker"],
    color: "bg-pastel-purple",
    icon: Rocket,
  },
  {
    id: "data-platform",
    title: "Market Data Platform",
    subtitle: "S&P Global",
    description:
      "Spearheaded the modernization of legacy data infrastructure into a scalable, real-time market data platform serving global clients.",
    problem:
      "Legacy systems couldn't handle growing data volumes. Clients experienced delays and data quality issues impacting trading decisions.",
    solution:
      "Architected a modern data platform with real-time streaming, automated quality checks, and self-service analytics powered by Snowflake and dbt.",
    impact: "99.9% uptime, 10x faster data delivery, $2M annual cost savings",
    techStack: ["Snowflake", "dbt", "Python", "Kafka", "SQL", "Looker"],
    color: "bg-pastel-mint",
    icon: Users,
  },
];

// Personal projects and side hustles for Play mode
const playProjects: Project[] = [
  {
    id: "ai-dungeon-master",
    title: "AI Dungeon Master",
    subtitle: "Personal Project",
    description:
      "Built an AI-powered D&D campaign generator that creates dynamic storylines, NPCs, and encounters. Because finding a DM who shows up consistently is harder than fine-tuning GPT-4.",
    problem:
      "My D&D group kept losing dungeon masters to 'real life responsibilities.' The audacity.",
    solution:
      "Created an LLM-powered DM that never cancels, never forgets the plot, and doesn't judge when you try to seduce the dragon.",
    impact: "3 successful campaigns, 0 scheduling conflicts, 1 very confused AI dragon",
    techStack: ["GPT-4", "LangChain", "React", "Supabase", "Tears of Joy"],
    color: "bg-pastel-purple",
    icon: Sparkles,
    links: { github: "#" },
  },
  {
    id: "adventure-tracker",
    title: "Adventure Tracker",
    subtitle: "Travel & Outdoor App",
    description:
      "A personal app to log and visualize all my skydiving jumps, surf sessions, and hiking adventures with photos, stats, and way too many details.",
    problem:
      "I kept forgetting which mountains I've climbed and how many times I've almost died doing 'fun' activities.",
    solution:
      "Built a beautiful tracker with maps, weather data, and a 'near-death experience' counter (currently at 7).",
    impact: "47 hikes logged, 23 surf sessions, 12 skydives, infinite bragging rights",
    techStack: ["React Native", "MapBox", "Firebase", "Adrenaline", "Sunscreen"],
    color: "bg-pastel-mint",
    icon: Zap,
  },
  {
    id: "coffee-optimizer",
    title: "Coffee Optimizer 3000",
    subtitle: "Serious Business",
    description:
      "An over-engineered system to track, rate, and optimize my coffee brewing. Yes, I have a spreadsheet. Yes, it has formulas. No, I'm not sorry.",
    problem:
      "My morning coffee was inconsistent. Some days perfect, some days tragic. This was unacceptable.",
    solution:
      "IoT sensors on my coffee setup, ML model to predict optimal brew parameters, and a dashboard that would make NASA jealous.",
    impact: "Coffee quality up 34%, morning mood up 89%, partner's patience down 12%",
    techStack: ["Raspberry Pi", "Python", "InfluxDB", "Obsession", "Caffeine"],
    color: "bg-pastel-peach",
    icon: Brain,
  },
  {
    id: "game-night-coordinator",
    title: "Game Night Coordinator",
    subtitle: "Solving Real Problems",
    description:
      "An app that finally answers 'what game should we play?' by matching group size, mood, time available, and who's still salty from last week's betrayal.",
    problem:
      "Spending 45 minutes deciding what to play, then 15 minutes actually playing before someone has to leave.",
    solution:
      "Smart recommendation engine that considers player preferences, game length, complexity, and historical grudge data.",
    impact: "Game selection time: 45min → 2min. Friend group: Still intact (barely)",
    techStack: ["Next.js", "PostgreSQL", "Friendship", "Board Games", "Snacks API"],
    color: "bg-pastel-yellow",
    icon: Users,
    links: { demo: "#", github: "#" },
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = project.icon;

  return (
    <motion.div
      variants={cardVariants}
      className={cn(
        "rounded-3xl overflow-hidden border border-cream-200 shadow-sm",
        "hover:shadow-lg transition-shadow duration-300",
        project.color
      )}
      whileHover={{ y: -5 }}
    >
      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-white/60 shadow-sm">
              <Icon className="w-6 h-6 text-cream-700" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-cream-800">{project.title}</h3>
              <p className="text-sm text-cream-500">{project.subtitle}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {project.links?.demo && (
              <motion.a
                href={project.links.demo}
                className="p-2 rounded-xl bg-white/60 text-cream-500 hover:text-accent-indigo transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            )}
            {project.links?.github && (
              <motion.a
                href={project.links.github}
                className="p-2 rounded-xl bg-white/60 text-cream-500 hover:text-cream-800 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-4 h-4" />
              </motion.a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-cream-600 mb-6 leading-relaxed">{project.description}</p>

        {/* Problem/Solution Dropdown */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/50 border border-white/60 mb-4 group hover:bg-white/70 transition-colors"
        >
          <span className="flex items-center gap-2 text-cream-700 font-medium">
            <Lightbulb className="w-4 h-4 text-accent-coral" />
            Problem & Solution
          </span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5 text-cream-400 group-hover:text-cream-600" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-2xl bg-white/40 border border-white/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-accent-coral" />
                    <span className="text-sm font-semibold text-cream-700">The Problem</span>
                  </div>
                  <p className="text-cream-600 text-sm leading-relaxed">{project.problem}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/40 border border-white/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Rocket className="w-4 h-4 text-accent-emerald" />
                    <span className="text-sm font-semibold text-cream-700">The Solution</span>
                  </div>
                  <p className="text-cream-600 text-sm leading-relaxed">{project.solution}</p>
                </div>
                <div className="p-4 rounded-2xl bg-accent-emerald/10 border border-accent-emerald/20">
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart3 className="w-4 h-4 text-accent-emerald" />
                    <span className="text-sm font-semibold text-accent-emerald">Impact</span>
                  </div>
                  <p className="text-cream-700 text-sm font-medium">{project.impact}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, i) => (
            <motion.span
              key={tech}
              className="px-3 py-1.5 rounded-full bg-white/70 text-cream-600 text-xs font-medium border border-cream-200 cursor-default shadow-sm"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.9)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectGallery({ mode }: ProjectGalleryProps) {
  const projects = mode === "work" ? workProjects : playProjects;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className={cn(
              "inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4",
              mode === "work"
                ? "bg-pastel-blue/50 text-accent-indigo"
                : "bg-pastel-mint/50 text-accent-emerald"
            )}
            whileHover={{ scale: 1.05 }}
          >
            {mode === "work" ? "Professional Experience" : "Side Projects & Hobbies"}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl font-bold text-cream-800 mb-4">
            {mode === "work" ? "Featured Projects" : "Things I Built for Fun"}
          </h2>
          <p className="text-cream-500 max-w-2xl mx-auto">
            {mode === "work"
              ? "Enterprise AI products I've shipped that made real impact for users and businesses."
              : "Personal projects, side hustles, and over-engineered solutions to problems nobody asked me to solve."}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* View More CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/70 border border-cream-200 text-cream-600 font-medium hover:bg-white hover:border-cream-300 transition-colors shadow-sm"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{mode === "work" ? "View All Projects" : "See More Chaos"}</span>
            <ExternalLink className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
