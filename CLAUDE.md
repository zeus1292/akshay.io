# Personal Portfolio - Claude Code Reference

## Project Overview

Personal portfolio for **Akshay Kumar**, AI Product Manager. Built with Next.js 16, Tailwind CSS 4, Framer Motion, and TypeScript. Features a **Work/Play mode toggle** that switches the entire site between professional and playful themes.

## Tech Stack

- **Framework**: Next.js 16 (App Router, `src/app/`)
- **Styling**: Tailwind CSS 4 with `@theme` directive in `globals.css` (NOT `tailwind.config.ts` for colors)
- **Animations**: Framer Motion 12
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)
- **Language**: TypeScript

## Project Structure

```
src/
├── app/
│   ├── page.tsx           # Main page - manages work/play mode state
│   ├── layout.tsx         # Root layout, metadata, Inter font
│   └── globals.css        # Theme config (@theme), pastel colors, mode overrides
├── components/
│   ├── Hero.tsx           # Hero section with work/play toggle
│   ├── BentoGrid.tsx      # Bento-style info grid (adapts to mode)
│   ├── ProjectGallery.tsx # Featured project tiles (work + play arrays)
│   ├── MyJourney.tsx      # Career timeline
│   ├── SkillsMarquee.tsx  # Skills ticker (work mode)
│   ├── InterestsMarquee.tsx # Interests ticker (play mode)
│   ├── SkillsBubbles.tsx  # Interactive skills visualization
│   ├── BugSquasherGame.tsx # Mini-game (play mode only)
│   ├── PMHustleGame.tsx   # PM-themed mini-game
│   ├── PixelBackground.tsx # Canvas-based pixel art background
│   ├── AnimatedAvatar.tsx # Profile image with animations
│   └── ui/               # Shadcn-style primitives (button, toggle)
└── lib/
    └── utils.ts           # cn() helper (clsx + tailwind-merge)
```

## Key Architecture Patterns

### Work/Play Mode

- State lives in `src/app/page.tsx` as `useState<"work" | "play">("work")`
- Passed as `mode` prop to all major components
- CSS class `mode-work` / `mode-play` on `<main>` controls background gradients
- Play mode intensifies pastel colors via CSS overrides in `globals.css`

### Project Tiles (ProjectGallery.tsx)

Two separate arrays in `src/components/ProjectGallery.tsx`:
- `workProjects: Project[]` - Professional/enterprise projects
- `playProjects: Project[]` - Personal/side projects

**Project interface:**
```typescript
interface Project {
  id: string;           // unique kebab-case id
  title: string;        // display name
  subtitle: string;     // company or context (e.g., "S&P Global", "Personal Project")
  description: string;  // one-sentence overview
  problem: string;      // expandable - the challenge
  solution: string;     // expandable - how it was solved
  impact: string;       // expandable - quantifiable results
  techStack: string[];  // array of tech names (rendered as pills)
  color: string;        // Tailwind bg class (e.g., "bg-pastel-blue")
  icon: typeof Brain;   // Lucide React icon component
  links?: {             // optional
    demo?: string;
    github?: string;
  };
}
```

**To add a new project tile:**
1. Choose an icon from `lucide-react` and import it at the top
2. Pick an unused pastel color
3. Add the object to `workProjects` or `playProjects` array

### Available Pastel Colors

Defined in `globals.css` under `@theme`:
- `bg-pastel-pink` (#FFE4E6)
- `bg-pastel-blue` (#DBEAFE)
- `bg-pastel-purple` (#EDE9FE)
- `bg-pastel-mint` (#D1FAE5)
- `bg-pastel-peach` (#FED7AA)
- `bg-pastel-yellow` (#FEF3C7)
- `bg-pastel-lavender` (#E9D5FF)

### Color System

- **Pastel backgrounds**: `bg-pastel-*` for cards and sections
- **Accent colors**: `accent-coral`, `accent-indigo`, `accent-emerald`, `accent-violet`
- **Neutral scale**: `cream-50` through `cream-900` (warm-tinted grays)

## Commands

```bash
npm run dev    # Start dev server
npm run build  # Production build
npm run lint   # ESLint
```

## Conventions

- All components are in `src/components/` as named exports
- Utility function `cn()` from `src/lib/utils.ts` for conditional Tailwind classes
- Animations use Framer Motion (`motion.div`, `AnimatePresence`, variants)
- Project data is co-located in `ProjectGallery.tsx` (not in a separate data file)
- Grid layout: `grid grid-cols-1 lg:grid-cols-2 gap-8` for project cards
- Cards use rounded-3xl with pastel backgrounds and white/60 glass effects
