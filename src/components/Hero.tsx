"use client";

import { motion } from "framer-motion";
import { ModeToggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Rocket, Coffee, Gamepad2, MapPin } from "lucide-react";

interface HeroProps {
  mode: "work" | "play";
  onModeToggle: (mode: "work" | "play") => void;
}

const workContent = {
  headline: "AI Product Manager",
  subheadline: "& Builder",
  description:
    "10+ years building AI-powered products at S&P Global, C3 AI, and beyond. I turn complex AI capabilities into enterprise solutions that drive real business impact—from RAG pipelines to Agentic workflows.",
  cta: "View My Work",
  ctaIcon: Rocket,
  badge: "Open to opportunities",
  location: "Foster City, CA",
};

const playContent = {
  headline: "Chaos Coordinator",
  subheadline: "& AI Whisperer",
  description:
    "Columbia grad who somehow convinced Fortune 500 companies to let me play with their data. When I'm not shipping AI products, I'm probably skydiving, surfing, or over-engineering my coffee setup.",
  cta: "See the Fun Stuff",
  ctaIcon: Gamepad2,
  badge: "Probably caffeinated",
  location: "Bay Area, CA",
};

// Floating pastel blobs for visual interest
const FloatingBlobs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-pastel-pink opacity-40 blur-3xl"
      animate={{
        scale: [1, 1.2, 1],
        x: [0, 20, 0],
        y: [0, -10, 0],
      }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute top-1/3 -left-20 w-64 h-64 rounded-full bg-pastel-blue opacity-40 blur-3xl"
      animate={{
        scale: [1.2, 1, 1.2],
        x: [0, 15, 0],
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
    />
    <motion.div
      className="absolute bottom-20 right-1/4 w-56 h-56 rounded-full bg-pastel-purple opacity-30 blur-3xl"
      animate={{
        scale: [1, 1.3, 1],
        y: [0, -20, 0],
      }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
    />
    <motion.div
      className="absolute bottom-1/3 left-1/3 w-48 h-48 rounded-full bg-pastel-mint opacity-30 blur-3xl"
      animate={{
        scale: [1.1, 1, 1.1],
        x: [0, -10, 0],
      }}
      transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
    />
  </div>
);

export function Hero({ mode, onModeToggle }: HeroProps) {
  const content = mode === "work" ? workContent : playContent;
  const CtaIcon = content.ctaIcon;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <FloatingBlobs />

      {/* Navigation */}
      <motion.nav
        className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 sm:p-6 lg:p-8 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          {/* Logo with initials */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-indigo to-accent-violet flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">AK</span>
          </div>
          <span className="text-cream-700 font-semibold hidden sm:block">
            {mode === "work" ? "Akshay Kumar" : "The Fun One"}
          </span>
        </motion.div>
        <ModeToggle mode={mode} onToggle={onModeToggle} />
      </motion.nav>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-cream-300 text-sm text-cream-600 shadow-sm"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            {mode === "work" ? (
              <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
            ) : (
              <Coffee className="w-4 h-4 text-accent-coral" />
            )}
            {content.badge}
          </motion.span>
          <motion.span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/50 text-xs text-cream-500"
            whileHover={{ scale: 1.05 }}
          >
            <MapPin className="w-3 h-3" />
            {content.location}
          </motion.span>
        </motion.div>

        {/* Headlines */}
        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.span
            key={`headline-${mode}`}
            className="block text-cream-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {content.headline}
          </motion.span>
          <motion.span
            key={`subheadline-${mode}`}
            className={mode === "work" ? "block gradient-text-warm" : "block gradient-text-playful"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {content.subheadline}
          </motion.span>
        </motion.h1>

        {/* Description */}
        <motion.p
          key={`desc-${mode}`}
          className="mt-6 text-lg sm:text-xl text-cream-500 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {content.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Button
            size="lg"
            variant={mode === "work" ? "default" : "playful"}
            className="group"
          >
            <CtaIcon className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
            {content.cta}
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => window.location.href = "mailto:ak4271@columbia.edu"}
          >
            <Mail className="w-5 h-5" />
            Get in Touch
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {[
            { icon: Github, href: "https://github.com/akshaykumar-92", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/akshaykumar-92", label: "LinkedIn" },
            { icon: Mail, href: "mailto:ak4271@columbia.edu", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target={label !== "Email" ? "_blank" : undefined}
              rel={label !== "Email" ? "noopener noreferrer" : undefined}
              className="p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-cream-200 text-cream-500 hover:text-accent-indigo hover:border-accent-indigo/30 hover:bg-white shadow-sm transition-colors"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>

        {/* Fun decorative elements in play mode */}
        {mode === "play" && (
          <motion.div
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-4 text-4xl"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            {["🪂", "🏄", "☕", "🎮"].map((emoji, i) => (
              <motion.span
                key={emoji}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, i % 2 === 0 ? 10 : -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>
        )}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-cream-400"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs uppercase tracking-wider font-medium">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
