"use client";

import { motion } from "framer-motion";
import { ModeToggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Rocket } from "lucide-react";

interface HeroProps {
  mode: "work" | "play";
  onModeToggle: (mode: "work" | "play") => void;
}

const workContent = {
  headline: "Product Manager",
  subheadline: "& AI Explorer",
  description:
    "Building intelligent products at the intersection of enterprise software and artificial intelligence. Passionate about translating complex AI capabilities into delightful user experiences.",
  cta: "View My Work",
};

const playContent = {
  headline: "Chaos Coordinator",
  subheadline: "& AI Whisperer",
  description:
    "Professional meeting survivor who occasionally ships products between coffee runs. I speak fluent AI and turn stakeholder dreams into reality (after negotiating scope, of course).",
  cta: "See the Fun Stuff",
};

export function Hero({ mode, onModeToggle }: HeroProps) {
  const content = mode === "work" ? workContent : playContent;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-electric/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-grape/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-sunset/10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 sm:p-6 lg:p-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div
          className="text-2xl font-bold gradient-text"
          whileHover={{ scale: 1.05 }}
        >
          {/* Replace with your name/logo */}
          JD
        </motion.div>
        <ModeToggle mode={mode} onToggle={onModeToggle} />
      </motion.nav>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full glass text-sm text-dark-300 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            {mode === "work" ? "🚀 Open to opportunities" : "🎮 Ready to play"}
          </motion.span>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.span
            key={content.headline}
            className="block text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {content.headline}
          </motion.span>
          <motion.span
            key={content.subheadline}
            className="block gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {content.subheadline}
          </motion.span>
        </motion.h1>

        <motion.p
          key={content.description}
          className="mt-6 text-lg sm:text-xl text-dark-300 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {content.description}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Button
            size="lg"
            variant={mode === "work" ? "default" : "sunset"}
            className="group"
          >
            <Rocket className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
            {content.cta}
          </Button>
          <Button size="lg" variant="secondary">
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
            { icon: Github, href: "#", label: "GitHub" },
            { icon: Linkedin, href: "#", label: "LinkedIn" },
            { icon: Mail, href: "#", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              className="p-3 rounded-full glass glass-hover text-dark-300 hover:text-white"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-dark-400"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
