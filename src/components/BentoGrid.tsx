"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
  MapPin,
  Plane,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface BentoGridProps {
  mode: "work" | "play";
}

const workCards = {
  professional: {
    title: "The TL;DR",
    icon: Briefcase,
    bgColor: "bg-pastel-blue",
    borderColor: "border-pastel-blue-dark/30",
    iconBg: "bg-accent-indigo",
    content: {
      headline: "Enterprise AI Product Leader",
      bullets: [
        "10+ years shipping AI products at S&P Global, C3 AI & startups",
        "Built RAG pipelines and Agentic workflows serving Fortune 500 clients",
        "Columbia Business Analytics grad who turns complex AI into real impact",
      ],
      companies: [
        { name: "S&P Global", role: "Sr. Product Manager" },
        { name: "C3 AI", role: "Product Manager" },
        { name: "Cowen & Co", role: "Analyst" },
      ],
    },
  },
  personal: {
    title: "The Origin Story",
    icon: Heart,
    bgColor: "bg-pastel-pink",
    borderColor: "border-pastel-pink-dark/30",
    iconBg: "bg-accent-coral",
    content: {
      headline: "From VIT to Columbia to AI",
      story:
        "Started as a software engineer in India, built my way up through S&P Global, then pivoted to pursue my Master's at Columbia. Now I help enterprises unlock value from AI—from research tools to agentic workflows.",
      passions: ["Human-centered AI", "0→1 Products", "Data Storytelling"],
    },
  },
  skills: {
    title: "The Toolkit",
    icon: Code2,
    bgColor: "bg-pastel-purple",
    borderColor: "border-pastel-purple-dark/30",
    iconBg: "bg-accent-violet",
    content: {
      categories: [
        {
          name: "AI/ML",
          icon: Brain,
          color: "text-accent-violet",
          bgColor: "bg-pastel-purple/50",
          skills: ["RAG", "LangGraph", "crewAI", "Fine-tuning"],
        },
        {
          name: "Infrastructure",
          icon: Cloud,
          color: "text-accent-indigo",
          bgColor: "bg-pastel-blue/50",
          skills: ["LangSmith", "AWS", "Azure", "Docker"],
        },
        {
          name: "Data",
          icon: Database,
          color: "text-accent-emerald",
          bgColor: "bg-pastel-mint/50",
          skills: ["SQL", "Python", "Snowflake", "dbt"],
        },
        {
          name: "Product",
          icon: Cpu,
          color: "text-accent-coral",
          bgColor: "bg-pastel-peach/50",
          skills: ["Figma", "Jira", "A/B Testing", "Roadmapping"],
        },
      ],
    },
  },
};

const playCards = {
  professional: {
    title: "The Resume Version",
    icon: Coffee,
    bgColor: "bg-pastel-yellow",
    borderColor: "border-pastel-yellow-dark/30",
    iconBg: "bg-accent-coral",
    content: {
      headline: "Professional Meeting Attendee",
      bullets: [
        "Expert at nodding thoughtfully in Zoom calls",
        "Can turn any stakeholder request into a Jira epic",
        "Survived 5 years of enterprise software politics",
      ],
      companies: [
        { name: "S&P Global", role: "Slide Deck Artisan" },
        { name: "C3 AI", role: "AI Explainer-in-Chief" },
        { name: "Cowen", role: "Excel Wizard" },
      ],
    },
  },
  personal: {
    title: "The Real Me",
    icon: Gamepad2,
    bgColor: "bg-pastel-mint",
    borderColor: "border-pastel-mint-dark/30",
    iconBg: "bg-accent-emerald",
    content: {
      headline: "Adrenaline Junkie & Coffee Snob",
      story:
        "When not shipping AI products, you'll find me skydiving, catching waves, or hiking to the top of something that looks mildly dangerous. Life's too short for boring weekends.",
      passions: ["Skydiving", "Surfing", "Hiking"],
      photos: [
        { src: "/images/skydiving.jpg", label: "Skydiving in Hawaii" },
        { src: "/images/hiking.jpg", label: "Hiking in Yosemite" },
        { src: "/images/surfing.jpg", label: "Catching waves" },
      ],
    },
  },
  skills: {
    title: "The Secret Powers",
    icon: Sparkles,
    bgColor: "bg-pastel-lavender",
    borderColor: "border-pastel-purple-dark/30",
    iconBg: "bg-accent-violet",
    content: {
      categories: [
        {
          name: "Survival",
          icon: Coffee,
          color: "text-accent-coral",
          bgColor: "bg-pastel-peach/50",
          skills: ["Coffee brewing", "Deadline dodging", "Scope negotiation", "Meeting escape"],
        },
        {
          name: "Adventure",
          icon: Plane,
          color: "text-accent-indigo",
          bgColor: "bg-pastel-blue/50",
          skills: ["Skydiving", "Surfing", "Hiking", "Getting lost"],
        },
        {
          name: "Creative",
          icon: Music,
          color: "text-accent-violet",
          bgColor: "bg-pastel-purple/50",
          skills: ["Playlist curation", "Meme analysis", "GIF selection", "Emoji fluency"],
        },
        {
          name: "Learning",
          icon: Book,
          color: "text-accent-emerald",
          bgColor: "bg-pastel-mint/50",
          skills: ["Wikipedia diving", "Tutorial hoarding", "Side projects", "Never finishing"],
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

// Personal card component with photo gallery for Play mode
function PersonalCard({ mode, cards }: { mode: "work" | "play"; cards: typeof workCards | typeof playCards }) {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const photos = mode === "play" && "photos" in cards.personal.content
    ? (cards.personal.content as typeof playCards.personal.content).photos
    : null;

  const nextPhoto = () => {
    if (photos) setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    if (photos) setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // Play mode: larger card with photos
  if (mode === "play" && photos) {
    return (
      <motion.div
        variants={cardVariants}
        className={cn(
          "lg:col-span-2 rounded-3xl overflow-hidden",
          cards.personal.bgColor,
          "border",
          cards.personal.borderColor,
          "shadow-sm hover:shadow-md transition-shadow"
        )}
        whileHover={{ scale: 1.01, y: -3 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-8 h-full">
          <div className="flex items-center gap-3 mb-6">
            <div
              className={cn(
                "p-3 rounded-2xl shadow-sm",
                cards.personal.iconBg
              )}
            >
              <cards.personal.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-cream-800">
              {cards.personal.title}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Text content */}
            <div className="flex flex-col justify-center">
              <h4 className="text-2xl font-bold text-cream-800 mb-3">
                {cards.personal.content.headline}
              </h4>

              <p className="text-cream-600 leading-relaxed mb-6">
                {cards.personal.content.story}
              </p>

              <div className="flex flex-wrap gap-2">
                {cards.personal.content.passions.map((passion, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-full bg-white/60 text-cream-700 text-sm border border-white/80 shadow-sm"
                  >
                    {passion}
                  </span>
                ))}
              </div>
            </div>

            {/* Photo carousel */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream-200 shadow-lg">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPhoto}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={photos[currentPhoto].src}
                      alt={photos[currentPhoto].label}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation buttons */}
                <button
                  onClick={prevPhoto}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm text-cream-700 hover:bg-white transition-colors shadow-md"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm text-cream-700 hover:bg-white transition-colors shadow-md"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Photo label */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm text-sm text-cream-700 font-medium shadow-sm">
                  {photos[currentPhoto].label}
                </div>
              </div>

              {/* Dots indicator */}
              <div className="flex justify-center gap-2 mt-4">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPhoto(i)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      i === currentPhoto
                        ? "bg-accent-emerald w-6"
                        : "bg-cream-300 hover:bg-cream-400"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Work mode: simple card
  return (
    <motion.div
      variants={cardVariants}
      className={cn(
        "rounded-3xl overflow-hidden",
        cards.personal.bgColor,
        "border",
        cards.personal.borderColor,
        "shadow-sm hover:shadow-md transition-shadow"
      )}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-8 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div
            className={cn(
              "p-3 rounded-2xl shadow-sm",
              cards.personal.iconBg
            )}
          >
            <cards.personal.icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-cream-800">
            {cards.personal.title}
          </h3>
        </div>

        <h4 className="text-xl font-bold text-cream-800 mb-3">
          {cards.personal.content.headline}
        </h4>

        <p className="text-cream-600 leading-relaxed mb-6 flex-grow">
          {cards.personal.content.story}
        </p>

        <div className="flex flex-wrap gap-2">
          {cards.personal.content.passions.map((passion, i) => (
            <span
              key={i}
              className="px-3 py-1.5 rounded-full bg-white/60 text-cream-700 text-sm border border-white/80 shadow-sm"
            >
              {passion}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function BentoGrid({ mode }: BentoGridProps) {
  const cards = mode === "work" ? workCards : playCards;

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
            className="inline-block px-4 py-1.5 rounded-full bg-pastel-purple/50 text-accent-violet text-sm font-medium mb-4"
            whileHover={{ scale: 1.05 }}
          >
            {mode === "work" ? "Quick Overview" : "The Fun Stuff"}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl font-bold text-cream-800 mb-4">
            {mode === "work" ? "At a Glance" : "The Unfiltered Version"}
          </h2>
          <p className="text-cream-500 max-w-2xl mx-auto">
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
          {/* Card 1: Professional - spans 2 columns in Work, 1 in Play */}
          <motion.div
            variants={cardVariants}
            className={cn(
              "rounded-3xl overflow-hidden",
              mode === "work" ? "lg:col-span-2" : "",
              cards.professional.bgColor,
              "border",
              cards.professional.borderColor,
              "shadow-sm hover:shadow-md transition-shadow"
            )}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={cn(
                    "p-3 rounded-2xl shadow-sm",
                    cards.professional.iconBg
                  )}
                >
                  <cards.professional.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-cream-800">
                  {cards.professional.title}
                </h3>
              </div>

              <h4 className="text-2xl font-bold text-cream-800 mb-4">
                {cards.professional.content.headline}
              </h4>

              <ul className="space-y-3 mb-6">
                {cards.professional.content.bullets.map((bullet, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3 text-cream-600"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <Rocket className="w-5 h-5 text-accent-indigo mt-0.5 flex-shrink-0" />
                    {bullet}
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                {cards.professional.content.companies.map((company, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white/80 shadow-sm"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(255,255,255,0.9)",
                    }}
                  >
                    <Building2 className="w-4 h-4 text-accent-indigo" />
                    <span className="text-sm text-cream-700 font-medium">
                      {company.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2: Personal - spans 2 columns in Play mode */}
          <PersonalCard mode={mode} cards={cards} />

          {/* Card 3: Skills - spans all 3 columns */}
          <motion.div
            variants={cardVariants}
            className={cn(
              "lg:col-span-3 rounded-3xl overflow-hidden",
              cards.skills.bgColor,
              "border",
              cards.skills.borderColor,
              "shadow-sm hover:shadow-md transition-shadow"
            )}
            whileHover={{ scale: 1.01, y: -3 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <div
                  className={cn(
                    "p-3 rounded-2xl shadow-sm",
                    cards.skills.iconBg
                  )}
                >
                  <cards.skills.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-cream-800">
                  {cards.skills.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.skills.content.categories.map((category, i) => (
                  <motion.div
                    key={i}
                    className={cn(
                      "p-5 rounded-2xl bg-white/50 border border-white/60 shadow-sm",
                      "hover:bg-white/70 transition-colors"
                    )}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    whileHover={{ y: -3 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className={cn("p-2 rounded-lg", category.bgColor)}>
                        <category.icon className={cn("w-5 h-5", category.color)} />
                      </div>
                      <span className="font-semibold text-cream-800">
                        {category.name}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, j) => (
                        <motion.span
                          key={j}
                          className="px-2.5 py-1 rounded-lg bg-white/70 text-cream-600 text-xs border border-cream-200 hover:border-cream-300 transition-colors cursor-default shadow-sm"
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
