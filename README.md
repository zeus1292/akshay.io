# Akshay Kumar | Personal Portfolio

A modern, interactive portfolio website with a unique Work/Play mode toggle, showcasing professional experience and personal interests.

**Live Site**: [akshay-io.vercel.app](https://akshay-io.vercel.app/)

## Features

- **Dual Mode Experience**: Toggle between Work mode (professional) and Play mode (personal/fun)
- **Bento Grid Layout**: Clean, modern card-based design
- **Photo Gallery**: Interactive carousel showcasing adventures (skydiving, hiking, surfing)
- **Animated Background**: Canvas-based pixel art characters doing various activities
- **Skills Visualization**: Physics-based floating skill bubbles
- **PM Hustle Mini-Game**: Interactive game with high score tracking
- **Fully Responsive**: Works on desktop, tablet, and mobile

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and Tailwind theme
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page component
├── components/
│   ├── Hero.tsx             # Hero section with mode toggle
│   ├── BentoGrid.tsx        # Overview cards with photo gallery
│   ├── ProjectGallery.tsx   # Featured projects
│   ├── SkillsBubbles.tsx    # Floating skills (Work mode)
│   ├── InterestsMarquee.tsx # Scrolling interests (Play mode)
│   ├── PMHustleGame.tsx     # Mini-game
│   ├── PixelBackground.tsx  # Animated pixel characters
│   └── ui/                  # UI components (Button, Toggle)
└── lib/
    └── utils.ts             # Utility functions
```

## License

MIT

---

Built with Next.js, Tailwind CSS, and Framer Motion
