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
    id: "natural-language-screener",
    title: "Natural Language Screener",
    subtitle: "S&P Global",
    description:
      "Built an AI-powered screening tool that lets financial analysts query complex datasets using plain English instead of writing SQL or using clunky filter UIs.",
    problem:
      "Analysts needed to screen thousands of companies based on complex criteria, but existing tools required technical expertise or multiple manual steps.",
    solution:
      "Developed a natural language interface powered by LLMs that translates user queries into structured filters, with smart suggestions and query refinement.",
    impact: "Reduced screening time from hours to minutes, adopted across multiple analyst teams",
    techStack: ["LLMs", "RAG", "Python", "SQL", "React", "AWS"],
    color: "bg-pastel-blue",
    icon: Brain,
  },
  {
    id: "cowen-analytics",
    title: "Analytics Engine",
    subtitle: "Cowen & Co",
    description:
      "Designed and built a comprehensive analytics platform for investment research, enabling data-driven insights for equity research analysts.",
    problem:
      "Research analysts relied on fragmented data sources and manual Excel workflows, making it difficult to generate timely, accurate insights.",
    solution:
      "Created a unified analytics engine with automated data pipelines, interactive dashboards, and custom reporting capabilities for research teams.",
    impact: "Streamlined research workflows, improved data accuracy, supported key investment decisions",
    techStack: ["Python", "SQL", "Tableau", "Excel VBA", "Data Modeling"],
    color: "bg-pastel-purple",
    icon: BarChart3,
  },
  {
    id: "research-lens",
    title: "Research Lens",
    subtitle: "Personal Project",
    description:
      "An AI-powered research aggregator that scans and synthesizes content from arXiv and TechCrunch to surface relevant AI/ML papers and startup news.",
    problem:
      "Keeping up with the latest AI research and startup news requires scanning multiple sources daily—time-consuming and easy to miss important developments.",
    solution:
      "Built an automated pipeline that fetches papers from arXiv and articles from TechCrunch, uses LLMs to summarize and categorize content, and delivers personalized digests.",
    impact: "Daily curated insights, never miss important AI developments",
    techStack: ["Python", "LangChain", "OpenAI", "arXiv API", "Web Scraping"],
    color: "bg-pastel-mint",
    icon: Rocket,
  },
];

// Personal projects and side hustles for Play mode
const playProjects: Project[] = [
  {
    id: "portfolio-website",
    title: "This Website",
    subtitle: "The One You're Looking At",
    description:
      "A bento-box style portfolio with Work/Play modes, pixelated background animations, photo galleries, and a mini-game. Because a plain resume is boring.",
    problem:
      "Needed a portfolio that shows personality, not just a list of jobs. Also wanted an excuse to over-engineer something fun.",
    solution:
      "Built a fully interactive site with Framer Motion animations, canvas-based pixel art, a PM Hustle mini-game, and dual-mode content switching.",
    impact: "You're here, so it worked. Hire me?",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript", "Canvas API"],
    color: "bg-pastel-pink",
    icon: Sparkles,
    links: { github: "https://github.com/zeus1292/personal-portfolio" },
  },
  {
    id: "resolution-tracker",
    title: "Resolution Tracker",
    subtitle: "iOS App",
    description:
      "A gamified goal-tracking app that helps you stick to resolutions with streaks, points, badges, and partner accountability. Because willpower alone wasn't cutting it.",
    problem:
      "New Year's resolutions have a 92% failure rate. Needed something beyond sticky notes and guilt to actually follow through.",
    solution:
      "Built a mobile app with daily/weekly/monthly goal tracking, streak multipliers, 20+ achievement badges, and partner challenges to keep you accountable.",
    impact: "Currently tracking my own resolutions. Streak: still alive. Badges: collected.",
    techStack: ["React Native", "Expo", "Firebase", "TypeScript", "Push Notifications"],
    color: "bg-pastel-purple",
    icon: Zap,
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

      </div>
    </section>
  );
}
