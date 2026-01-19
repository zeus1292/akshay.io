"use client";

import { useEffect, useRef, useCallback } from "react";

type WorkActivity = "code" | "read" | "meditate" | "coffee" | "meeting" | "chart";
type PlayActivity = "skydive" | "surf" | "hike" | "game" | "climb" | "kayak";
type Activity = WorkActivity | PlayActivity;

interface PixelBackgroundProps {
  mode: "work" | "play";
}

interface PixelCharacter {
  x: number;
  y: number;
  vx: number;
  vy: number;
  activity: Activity;
  frame: number;
  scale: number;
  opacity: number;
}

// Pixel art data for each activity (12x12 grids)
const pixelArt: Record<Activity, string[][]> = {
  // === WORK MODE ACTIVITIES ===

  // Coding at laptop
  code: [
    [
      "............",
      "....####....",
      "....#SS#....",
      "....####....",
      "...######...",
      "..##.LL.##..",
      "..#..LL..#..",
      "..#..LL..#..",
      "..########..",
      "....#..#....",
      "...##..##...",
      "............",
    ],
    [
      "............",
      "....####....",
      "....#SS#....",
      "....####....",
      "..########..",
      "..##.LL.##..",
      "..#..LL..#..",
      "..#..LL..#..",
      "..########..",
      "....#..#....",
      "...##..##...",
      "............",
    ],
  ],
  // Reading a book
  read: [
    [
      "............",
      "....####....",
      "....#SS#....",
      "....####....",
      "...######...",
      "..##.BB.##..",
      "..#..BB..#..",
      "..#..BB..#..",
      "..#..BB..#..",
      "....#..#....",
      "...##..##...",
      "............",
    ],
    [
      "............",
      "....####....",
      "....#SS#....",
      "....####....",
      "...######...",
      "..##.BB.##..",
      "..#..BB..#..",
      "..#..BB..#..",
      "..#..BB..#..",
      "....#..#....",
      "...##..##...",
      "............",
    ],
  ],
  // Meditation/yoga pose
  meditate: [
    [
      "............",
      "....####....",
      "....#SS#....",
      "....####....",
      "...######...",
      "..###..###..",
      ".###....###.",
      "............",
      "...######...",
      "..##....##..",
      "..#......#..",
      "..########..",
    ],
    [
      "............",
      "....####....",
      "....#SS#....",
      "....####....",
      "...######...",
      "..###..###..",
      ".###....###.",
      "....PPPP....",
      "...######...",
      "..##....##..",
      "..#......#..",
      "..########..",
    ],
  ],
  // Drinking coffee
  coffee: [
    [
      "............",
      "....####....",
      "....#SS#....",
      "....####....",
      "...######...",
      "..##.CC.##..",
      "..#..CC..#..",
      "..#..CC..#..",
      "..#..CC..#..",
      "....#..#....",
      "...##..##...",
      "............",
    ],
    [
      "....~~......",
      "....####....",
      "....#SS#....",
      "....####....",
      "...######...",
      "..##.CC.##..",
      "..#..CC..#..",
      "..#..CC..#..",
      "..#..CC..#..",
      "....#..#....",
      "...##..##...",
      "............",
    ],
  ],
  // In a meeting
  meeting: [
    [
      "............",
      "....####....",
      "....#SS#....",
      "....####....",
      "...######...",
      "..##....##..",
      "..#......#..",
      "MMMMMMMMMMMM",
      "M..........M",
      "M..........M",
      "MMMMMMMMMMMM",
      "............",
    ],
    [
      "............",
      "....####....",
      "....#SS#....",
      "....####....",
      "..########..",
      "..##....##..",
      "..#......#..",
      "MMMMMMMMMMMM",
      "M..........M",
      "M..........M",
      "MMMMMMMMMMMM",
      "............",
    ],
  ],
  // Looking at chart/analytics
  chart: [
    [
      "............",
      "....####....",
      "....#SS#....",
      "....####....",
      "...######...",
      "..##GGGG##..",
      "..#.G..G.#..",
      "..#.G.GG.#..",
      "..#.GGGG.#..",
      "....#..#....",
      "...##..##...",
      "............",
    ],
    [
      "............",
      "....####....",
      "....#SS#....",
      "....####....",
      "..########..",
      "..##GGGG##..",
      "..#.GG.G.#..",
      "..#.GG.G.#..",
      "..#.GGGG.#..",
      "....#..#....",
      "...##..##...",
      "............",
    ],
  ],

  // === PLAY MODE ACTIVITIES ===

  // Skydiving with parachute
  skydive: [
    [
      "....PPPP....",
      "...P....P...",
      "..P......P..",
      ".P........P.",
      "P..........P",
      "....####....",
      "....#SS#....",
      "....####....",
      "...##..##...",
      "...#....#...",
      "..##....##..",
      ".##......##.",
    ],
    [
      "....PPPP....",
      "...P....P...",
      "..P......P..",
      ".P........P.",
      "P..........P",
      "....####....",
      "....#SS#....",
      "....####....",
      "...#....#...",
      "...##..##...",
      "..##....##..",
      ".##......##.",
    ],
  ],
  // Surfing on wave
  surf: [
    [
      "............",
      "....####....",
      "....#SS#....",
      "...#####....",
      "...##..#....",
      "...#...#....",
      "..#....#....",
      "WWWWWWWWWWWW",
      ".WWWWWWWWWW.",
      "..WWWWWWWW..",
      "...WWWWWW...",
      "............",
    ],
    [
      "............",
      "....####....",
      "....#SS#....",
      "...#####....",
      "...#...##...",
      "...#....#...",
      "..#.....#...",
      "WWWWWWWWWWWW",
      ".WWWWWWWWWW.",
      "..WWWWWWWW..",
      "...WWWWWW...",
      "............",
    ],
  ],
  // Hiking with backpack
  hike: [
    [
      "............",
      "....####....",
      "....#SS#....",
      "...B####....",
      "...B##.#..O.",
      "...B#..#..O.",
      "....#..#..O.",
      "...##..##.O.",
      "...#....#.O.",
      "..##....##..",
      "..#......#..",
      "............",
    ],
    [
      "............",
      "....####....",
      "....#SS#....",
      "...B####....",
      "...B#..#.O..",
      "...B#..#.O..",
      "....#..#.O..",
      "...#....#O..",
      "...##..##...",
      "..#......#..",
      "..##....##..",
      "............",
    ],
  ],
  // Gaming with controller
  game: [
    [
      "............",
      "....####....",
      "....#SS#....",
      "....####....",
      "...######...",
      "..##LLLL##..",
      "..#.LLLL.#..",
      "..#......#..",
      "..########..",
      "....#..#....",
      "...##..##...",
      "............",
    ],
    [
      "............",
      "....####....",
      "....#SS#....",
      "....####....",
      "...######...",
      "..##LLLL##..",
      "..#.LLLL.#..",
      "..#......#..",
      "..########..",
      "....#..#....",
      "...##..##...",
      "............",
    ],
  ],
  // Rock climbing
  climb: [
    [
      "............",
      "....SS##....",
      "....SS##....",
      "...####.....",
      "..##..#.....",
      ".##...#.....",
      ".#....##....",
      "......#.#...",
      ".....##..#..",
      ".....#...#..",
      "....##...#..",
      "OOOOOOOOOOOO",
    ],
    [
      "............",
      "....SS##....",
      "....SS##....",
      "...####.....",
      "...#..##....",
      "...#...#....",
      "..##...##...",
      "..#.....#...",
      ".##......#..",
      ".#.......#..",
      "##.......#..",
      "OOOOOOOOOOOO",
    ],
  ],
  // Kayaking
  kayak: [
    [
      "............",
      "....####....",
      "....#SS#....",
      "....####....",
      "O..######..O",
      "O.########.O",
      "OOOOOOOOOOOO",
      ".OOOOOOOOOO.",
      "WWWWWWWWWWWW",
      ".WWWWWWWWWW.",
      "..WWWWWWWW..",
      "............",
    ],
    [
      "............",
      "....####....",
      "....#SS#....",
      "....####....",
      "...######.OO",
      ".########.OO",
      "OOOOOOOOOOOO",
      ".OOOOOOOOOO.",
      "WWWWWWWWWWWW",
      ".WWWWWWWWWW.",
      "..WWWWWWWW..",
      "............",
    ],
  ],
};

// Muted color palette for Work mode
const workColorMap: Record<string, string> = {
  "#": "#6B6156", // Body/clothes (muted brown)
  "S": "#D4B896", // Skin (muted tan)
  "O": "#C4B8AB", // Object color (muted beige)
  "W": "#B8C9D9", // Water (muted blue-gray)
  "B": "#C4B5FD", // Accent (soft purple)
  "L": "#A7C4A0", // Laptop screen (muted green)
  "P": "#D4B8C4", // Accent (muted pink)
  "C": "#B8A090", // Coffee (muted brown)
  "M": "#C4B8AB", // Meeting table (beige)
  "G": "#A7C4A0", // Chart/graph (muted green)
  "~": "#C4C4C4", // Steam (gray)
  ".": "transparent",
};

// Vibrant color palette for Play mode
const playColorMap: Record<string, string> = {
  "#": "#4A423A", // Body/clothes (warm brown)
  "S": "#FDBA74", // Skin (peachy)
  "O": "#FB923C", // Object color (vibrant orange) - kayak, climbing wall
  "W": "#38BDF8", // Water (bright sky blue)
  "B": "#A78BFA", // Accent (vibrant purple) - backpack
  "L": "#4ADE80", // Controller (bright green)
  "P": "#F472B6", // Parachute (vibrant pink)
  "C": "#92400E", // Coffee
  "M": "#94A3B8", // Meeting table
  "G": "#4ADE80", // Chart
  "~": "#9CA3AF", // Steam
  ".": "transparent",
};

const workActivities: WorkActivity[] = ["code", "read", "meditate", "coffee", "meeting", "chart"];
const playActivities: PlayActivity[] = ["skydive", "surf", "hike", "game", "climb", "kayak"];

export function PixelBackground({ mode }: PixelBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const charactersRef = useRef<PixelCharacter[]>([]);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const currentModeRef = useRef<"work" | "play">(mode);

  const initCharacters = useCallback((width: number, height: number, currentMode: "work" | "play") => {
    const activities = currentMode === "work" ? workActivities : playActivities;
    const characters: PixelCharacter[] = [];

    // Create 6-10 characters spread across the canvas
    const numCharacters = Math.min(10, Math.max(6, Math.floor((width * height) / 180000)));

    for (let i = 0; i < numCharacters; i++) {
      characters.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (currentMode === "work" ? 0.3 : 0.5), // Slower for work
        vy: (Math.random() - 0.5) * (currentMode === "work" ? 0.2 : 0.35),
        activity: activities[i % activities.length],
        frame: 0,
        scale: 2.5 + Math.random() * 1.5,
        opacity: currentMode === "work" ? 0.08 + Math.random() * 0.07 : 0.15 + Math.random() * 0.15, // More visible in play
      });
    }

    charactersRef.current = characters;
  }, []);

  const drawPixelArt = useCallback(
    (ctx: CanvasRenderingContext2D, character: PixelCharacter, colorMap: Record<string, string>) => {
      const art = pixelArt[character.activity]?.[character.frame];
      if (!art) return;

      const pixelSize = character.scale;

      ctx.globalAlpha = character.opacity;

      for (let row = 0; row < art.length; row++) {
        for (let col = 0; col < art[row].length; col++) {
          const pixel = art[row][col];
          const color = colorMap[pixel];

          if (color && color !== "transparent") {
            ctx.fillStyle = color;
            ctx.fillRect(
              character.x + col * pixelSize,
              character.y + row * pixelSize,
              pixelSize,
              pixelSize
            );
          }
        }
      }

      ctx.globalAlpha = 1;
    },
    []
  );

  const animate = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Throttle to ~30fps for performance
      if (timestamp - lastTimeRef.current < 33) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTimeRef.current = timestamp;

      // Get current color map based on mode
      const colorMap = currentModeRef.current === "work" ? workColorMap : playColorMap;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw characters
      charactersRef.current.forEach((character) => {
        // Update position
        character.x += character.vx;
        character.y += character.vy;

        // Wrap around edges
        const charWidth = 12 * character.scale;
        const charHeight = 12 * character.scale;

        if (character.x > canvas.width + charWidth) {
          character.x = -charWidth;
        } else if (character.x < -charWidth) {
          character.x = canvas.width + charWidth;
        }

        if (character.y > canvas.height + charHeight) {
          character.y = -charHeight;
        } else if (character.y < -charHeight) {
          character.y = canvas.height + charHeight;
        }

        // Animate frames (every ~400ms on average)
        if (Math.random() < 0.025) {
          character.frame = (character.frame + 1) % 2;
        }

        // Draw character
        drawPixelArt(ctx, character, colorMap);
      });

      animationRef.current = requestAnimationFrame(animate);
    },
    [drawPixelArt]
  );

  // Re-initialize when mode changes
  useEffect(() => {
    currentModeRef.current = mode;
    const canvas = canvasRef.current;
    if (canvas) {
      initCharacters(canvas.width, canvas.height, mode);
    }
  }, [mode, initCharacters]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initCharacters(canvas.width, canvas.height, currentModeRef.current);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [animate, initCharacters]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
      style={{ opacity: 1 }}
      aria-hidden="true"
    />
  );
}
