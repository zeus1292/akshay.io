"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  GraduationCap,
  Rocket,
  TrendingUp,
  Code2,
  Brain,
  Sparkles,
  Lightbulb,
  Coffee,
} from "lucide-react";

interface MyJourneyProps {
  mode: "work" | "play";
}

interface JourneyMilestone {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  icon: typeof GraduationCap;
  color: {
    iconBg: string;
    text: string;
    dot: string;
  };
  highlights: string[];
}

const workMilestones: JourneyMilestone[] = [
  {
    id: "consulting",
    year: "May 2025 - Present",
    title: "AI Product Manager & Builder",
    company: "Contract/Consulting",
    description:
      "Building Agentic AI solutions and advising on product-market fit for Enterprise SaaS and Fintech sectors.",
    icon: Rocket,
    color: {
      iconBg: "bg-accent-violet",
      text: "text-accent-violet",
      dot: "bg-accent-violet",
    },
    highlights: [
      "Productized multi-modal AI agents (Smart Chef, Research Lens)",
      "Established LLM-Ops framework with 20% latency reduction",
      "Advising 10+ VC and Builder Summits on AI adoption",
    ],
  },
  {
    id: "c3ai",
    year: "Dec 2024 - May 2025",
    title: "Senior AI Solutions & Product Manager",
    company: "C3 AI",
    description:
      "Drove 0-to-1 AI product development, delivering enterprise-grade solutions for Fortune 500 clients.",
    icon: Brain,
    color: {
      iconBg: "bg-pink-500",
      text: "text-pink-500",
      dot: "bg-pink-500",
    },
    highlights: [
      "Unlocked $6.5M in working capital savings",
      "Pioneered Generative AI ingestion framework",
      "Accelerated deployment speed by 30%",
    ],
  },
  {
    id: "spglobal",
    year: "Jan 2020 - Nov 2024",
    title: "Senior Product Manager",
    company: "S&P Global",
    description:
      "Owned end-to-end product strategy for Capital IQ Pro, integrating AI capabilities and driving platform growth.",
    icon: TrendingUp,
    color: {
      iconBg: "bg-accent-indigo",
      text: "text-accent-indigo",
      dot: "bg-accent-indigo",
    },
    highlights: [
      "Delivered 69% user growth & 101% usage growth YoY",
      "Pioneered RAG pipelines, boosting search accuracy 40%",
      "Contributed to $2B+ annual platform revenue",
    ],
  },
  {
    id: "cowen",
    year: "Jun 2019 - Dec 2019",
    title: "Data Scientist",
    company: "Cowen Investment Management",
    description:
      "Built predictive analytics solutions for investment professionals using advanced ML models.",
    icon: Code2,
    color: {
      iconBg: "bg-accent-emerald",
      text: "text-accent-emerald",
      dot: "bg-accent-emerald",
    },
    highlights: [
      "5-10% higher accuracy than existing algorithms",
      "Forecasted energy prices with 80% accuracy",
      "Enhanced model performance through feature engineering",
    ],
  },
  {
    id: "columbia",
    year: "Sep 2018 - Dec 2019",
    title: "M.S. Business Analytics",
    company: "Columbia University",
    description:
      "Joint program between Columbia Engineering and Columbia Business School, focusing on data science and ML.",
    icon: GraduationCap,
    color: {
      iconBg: "bg-sky-500",
      text: "text-sky-500",
      dot: "bg-sky-500",
    },
    highlights: [
      "Columbia Engineering & Business School",
      "Data Science & Machine Learning focus",
    ],
  },
  {
    id: "spglobal-india",
    year: "Jul 2015 - Jul 2018",
    title: "Product Owner",
    company: "S&P Global Market Intelligence",
    description:
      "Led machine learning integration for Capital IQ, managing product development from concept through launch.",
    icon: Lightbulb,
    color: {
      iconBg: "bg-accent-coral",
      text: "text-accent-coral",
      dot: "bg-accent-coral",
    },
    highlights: [
      "25% improvement in user engagement",
      "Enterprise APIs for 900+ clients ($133M ACV)",
      "MIFID II compliance solutions",
    ],
  },
  {
    id: "vit",
    year: "Jul 2011 - May 2015",
    title: "B.S. Computer Science & Engineering",
    company: "Vellore Institute of Technology",
    description:
      "Foundation in computer science, software engineering, and problem-solving.",
    icon: GraduationCap,
    color: {
      iconBg: "bg-teal-500",
      text: "text-teal-500",
      dot: "bg-teal-500",
    },
    highlights: [
      "Computer Science & Engineering",
    ],
  },
];

const playMilestones: JourneyMilestone[] = [
  {
    id: "consulting",
    year: "May 2025 - Present",
    title: "Chief AI Whisperer",
    company: "Self-employed (a.k.a. Coffee Shop Regular)",
    description:
      "Teaching robots to think and convincing VCs that my agents won't take over the world. Mostly.",
    icon: Sparkles,
    color: {
      iconBg: "bg-accent-violet",
      text: "text-accent-violet",
      dot: "bg-accent-violet",
    },
    highlights: [
      "Built a chef AI (still can't cook IRL)",
      "Attended 10+ summits for the free snacks",
      "20% faster at making AI go brrr",
    ],
  },
  {
    id: "c3ai",
    year: "Dec 2024 - May 2025",
    title: "Enterprise AI Whisperer",
    company: "C3 AI (Redwood City vibes)",
    description:
      "Convinced a steel company that AI could save them $6.5M. They believed me. It worked. I'm as surprised as you.",
    icon: Brain,
    color: {
      iconBg: "bg-pink-500",
      text: "text-pink-500",
      dot: "bg-pink-500",
    },
    highlights: [
      "Made steel manufacturing exciting (somehow)",
      "30% faster deployments = 30% more coffee breaks",
      "C-level stakeholder translator",
    ],
  },
  {
    id: "spglobal",
    year: "Jan 2020 - Nov 2024",
    title: "Professional Dashboard Maker",
    company: "S&P Global (NYC Subway Survivor)",
    description:
      "Spent 5 years making Wall Street's data look pretty. They paid me to add AI to everything. I obliged.",
    icon: TrendingUp,
    color: {
      iconBg: "bg-accent-indigo",
      text: "text-accent-indigo",
      dot: "bg-accent-indigo",
    },
    highlights: [
      "69% growth (nice)",
      "$2B revenue platform = fancy coffee budget",
      "Pioneered 'RAG' before it was cool",
    ],
  },
  {
    id: "cowen",
    year: "Jun 2019 - Dec 2019",
    title: "Baby Data Scientist",
    company: "Cowen (My First NYC Winter)",
    description:
      "Fresh out of grad school, predicting credit defaults and energy prices. Spoiler: California energy is wild.",
    icon: Code2,
    color: {
      iconBg: "bg-accent-emerald",
      text: "text-accent-emerald",
      dot: "bg-accent-emerald",
    },
    highlights: [
      "80% accuracy (not bad for a newbie)",
      "Learned what 'exogenous variables' means",
      "Survived my first NYC winter",
    ],
  },
  {
    id: "columbia",
    year: "Sep 2018 - Dec 2019",
    title: "Professional Student",
    company: "Columbia (The Expensive Part of NYC)",
    description:
      "Paid a lot of money to learn that networking events have free food. Also picked up some data science skills.",
    icon: GraduationCap,
    color: {
      iconBg: "bg-sky-500",
      text: "text-sky-500",
      dot: "bg-sky-500",
    },
    highlights: [
      "Free pizza hunter extraordinaire",
      "Survived business school + engineering",
      "Sleep? Never heard of her",
    ],
  },
  {
    id: "spglobal-india",
    year: "Jul 2015 - Jul 2018",
    title: "Product Padawan",
    company: "S&P Global (Gurugram, India)",
    description:
      "My origin story. Learned that 'enterprise APIs' is fancy speak for 'make the thing talk to the other thing.'",
    icon: Lightbulb,
    color: {
      iconBg: "bg-accent-coral",
      text: "text-accent-coral",
      dot: "bg-accent-coral",
    },
    highlights: [
      "900+ clients who trusted a 22-year-old",
      "MIFID II compliance (as thrilling as it sounds)",
      "Discovered I like building products",
    ],
  },
  {
    id: "vit",
    year: "Jul 2011 - May 2015",
    title: "Code Monkey in Training",
    company: "VIT (Where the Chai is Strong)",
    description:
      "Wrote code, broke code, blamed the compiler. Four years of learning that 'it works on my machine' isn't an excuse.",
    icon: Coffee,
    color: {
      iconBg: "bg-teal-500",
      text: "text-teal-500",
      dot: "bg-teal-500",
    },
    highlights: [
      "Stack Overflow copy-paste certified",
      "Survived Indian engineering school",
      "Chennai heat resistance: maxed out",
    ],
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

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export function MyJourney({ mode }: MyJourneyProps) {
  const milestones = mode === "work" ? workMilestones : playMilestones;
  const lineColor = mode === "work" ? "from-accent-violet via-pink-500 to-sky-500" : "from-accent-violet via-pink-500 to-teal-500";

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background with gradient */}
      <div className={cn(
        "absolute inset-0 -z-10",
        mode === "work"
          ? "bg-gradient-to-br from-pastel-purple/30 via-pastel-blue/20 to-pastel-lavender/30"
          : "bg-gradient-to-br from-pastel-peach/30 via-pastel-pink/20 to-pastel-yellow/30"
      )} />

      {/* Decorative blobs */}
      <motion.div
        className={cn(
          "absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-40",
          mode === "work" ? "bg-accent-violet/30" : "bg-accent-coral/30"
        )}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={cn(
          "absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-3xl opacity-30",
          mode === "work" ? "bg-accent-indigo/30" : "bg-pink-400/30"
        )}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.4, 0.2, 0.4]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold italic mb-4">
            {mode === "work" ? (
              <>
                <span className="text-cream-800">My </span>
                <span className="text-accent-violet">Journey</span>
              </>
            ) : (
              <>
                <span className="text-cream-800">The </span>
                <span className="text-accent-coral">Plot</span>
                <span className="text-cream-800"> So Far</span>
              </>
            )}
          </h2>
          <p className="text-cream-500 text-lg">
            {mode === "work"
              ? "A timeline of my professional and educational experiences"
              : "How I accidentally became an AI person (and other adventures)"}
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Timeline line - centered */}
          <div className={cn(
            "absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b transform md:-translate-x-1/2 rounded-full",
            lineColor
          )} />

          {/* Milestones */}
          {milestones.map((milestone, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={milestone.id}
                variants={itemVariants}
                className={cn(
                  "relative mb-12 last:mb-0",
                  "md:flex md:items-start",
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Timeline dot */}
                <motion.div
                  className={cn(
                    "absolute left-8 md:left-1/2 w-5 h-5 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 z-10",
                    milestone.color.dot
                  )}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  whileHover={{ scale: 1.3 }}
                />

                {/* Card */}
                <motion.div
                  className={cn(
                    "ml-16 md:ml-0 md:w-[calc(50%-2.5rem)]",
                    isLeft ? "md:mr-auto md:pr-0" : "md:ml-auto md:pl-0"
                  )}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={cn(
                    "bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border",
                    mode === "work"
                      ? "border-accent-violet/20 hover:border-accent-violet/40"
                      : "border-accent-coral/20 hover:border-accent-coral/40"
                  )}>
                    {/* Header with icon */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className={cn(
                        "p-3 rounded-xl shrink-0",
                        milestone.color.iconBg
                      )}>
                        <milestone.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-cream-800 leading-tight">
                          {milestone.title}
                        </h3>
                        <p className={cn("font-medium mt-0.5", milestone.color.text)}>
                          {milestone.company}
                        </p>
                        <p className="text-cream-400 text-sm mt-1">
                          {milestone.year}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-cream-600 text-sm leading-relaxed mb-4">
                      {milestone.description}
                    </p>

                    {/* Highlights as bullet points */}
                    <ul className="space-y-2">
                      {milestone.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className={cn(
                            "w-2 h-2 rounded-full mt-1.5 shrink-0",
                            milestone.color.dot
                          )} />
                          <span className="text-cream-600 text-sm">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
