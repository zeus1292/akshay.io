"use client";

import { useEffect, useRef, useCallback } from "react";

type Activity =
  | "skydive"
  | "surf"
  | "hike"
  | "code"
  | "climb"
  | "meditate"
  | "guitar"
  | "game"
  | "read"
  | "run"
  | "kayak"
  | "photo";

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
// Legend: # = body/clothes, S = skin, O = object color 1, W = object color 2,
//         B = accent 1, L = accent 2, P = accent 3, . = transparent
const pixelArt: Record<Activity, string[][]> = {
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
  // Hiking with backpack and walking stick
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
  // Playing guitar
  guitar: [
    [
      "............",
      "....####....",
      "....#SS#....",
      "....####....",
      "...##OO#....",
      "...#.OO.#...",
      "...#.OO.#...",
      "...#.OO.#...",
      "....#OO#....",
      "....#..#....",
      "...##..##...",
      "............",
    ],
    [
      "............",
      "....####....",
      "....#SS#....",
      "....####....",
      "...#.OO##...",
      "...#.OO.#...",
      "...#.OO.#...",
      "...#.OO.#...",
      "....#OO#....",
      "....#..#....",
      "...##..##...",
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
  // Running
  run: [
    [
      "............",
      "....####....",
      "....#SS#....",
      "....####....",
      "...##.##....",
      "...#...#....",
      "..##...##...",
      "..#.....#...",
      ".##......#..",
      ".#........#.",
      "##.........#",
      "............",
    ],
    [
      "............",
      "....####....",
      "....#SS#....",
      "....####....",
      "...#...#....",
      "...##.##....",
      "....#.#.....",
      "...#...#....",
      "..##...##...",
      "..#.....#...",
      ".#.......#..",
      "............",
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
  // Photography with camera
  photo: [
    [
      "............",
      "....####....",
      "....#SS#....",
      "....####....",
      "...##PP#....",
      "...#PPPP#...",
      "...#PPPP#...",
      "...#.PP.#...",
      "....####....",
      "....#..#....",
      "...##..##...",
      "............",
    ],
    [
      "............",
      "....####....",
      "....#SS#....",
      "....####....",
      "...#PP##....",
      "...#PPPP#...",
      "...#PPPP#...",
      "...#.PP.#...",
      "....####....",
      "....#..#....",
      "...##..##...",
      "............",
    ],
  ],
};

// Color mappings for pixel art - using pastel colors
const colorMap: Record<string, string> = {
  "#": "#4A423A", // Body/clothes (warm brown)
  "S": "#FDBA74", // Skin (peachy)
  "O": "#FDBA74", // Object color 1 (peach) - kayak, climbing wall, stick
  "W": "#93C5FD", // Water (pastel blue)
  "B": "#C4B5FD", // Accent 1 (pastel purple) - backpack, book
  "L": "#6EE7B7", // Accent 2 (pastel mint) - laptop screen, controller
  "P": "#FDA4AF", // Accent 3 (pastel pink) - parachute, camera, meditation aura
  ".": "transparent",
};

export function PixelBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const charactersRef = useRef<PixelCharacter[]>([]);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const initCharacters = useCallback((width: number, height: number) => {
    const activities: Activity[] = [
      "skydive", "surf", "hike", "code",
      "climb", "meditate", "guitar", "game",
      "read", "run", "kayak", "photo"
    ];
    const characters: PixelCharacter[] = [];

    // Create 8-12 characters spread across the canvas
    const numCharacters = Math.min(12, Math.max(6, Math.floor((width * height) / 150000)));

    for (let i = 0; i < numCharacters; i++) {
      characters.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4, // Slow horizontal movement
        vy: (Math.random() - 0.5) * 0.25, // Slow vertical movement
        activity: activities[i % activities.length],
        frame: 0,
        scale: 2.5 + Math.random() * 1.5, // Vary sizes (2.5-4)
        opacity: 0.12 + Math.random() * 0.13, // Subtle opacity (0.12-0.25)
      });
    }

    charactersRef.current = characters;
  }, []);

  const drawPixelArt = useCallback(
    (ctx: CanvasRenderingContext2D, character: PixelCharacter) => {
      const art = pixelArt[character.activity][character.frame];
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
        drawPixelArt(ctx, character);
      });

      animationRef.current = requestAnimationFrame(animate);
    },
    [drawPixelArt]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initCharacters(canvas.width, canvas.height);
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
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 1 }}
      aria-hidden="true"
    />
  );
}
