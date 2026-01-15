"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Play,
  RotateCcw,
  Trophy,
  Share2,
  Linkedin,
  X,
  Gamepad2,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PMHustleGameProps {
  mode: "work" | "play";
}

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  type: "value" | "scope-creep" | "coffee" | "deadline";
  emoji: string;
  points: number;
}

interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
}

type GameState = "idle" | "playing" | "gameover";

const GAME_CONFIG = {
  playerSpeed: 8,
  spawnRate: 1500,
  baseObjectSpeed: 2,
  speedIncreaseRate: 0.1,
  canvasWidth: 400,
  canvasHeight: 500,
};

const GAME_OBJECTS = {
  value: { emoji: "💎", points: 10, spawnChance: 0.4 },
  "scope-creep": { emoji: "🐛", points: -15, spawnChance: 0.35 },
  coffee: { emoji: "☕", points: 5, spawnChance: 0.15 },
  deadline: { emoji: "⏰", points: -10, spawnChance: 0.1 },
};

export function PMHustleGame({ mode }: PMHustleGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);

  // Use refs to avoid stale closures in game loop
  const gameStateRef = useRef<GameState>("idle");
  const highScoreRef = useRef(0);

  const gameRef = useRef({
    player: { x: 175, y: 440, width: 50, height: 50 } as Player,
    objects: [] as GameObject[],
    keys: { left: false, right: false },
    animationId: 0,
    lastSpawn: 0,
    score: 0,
    isRunning: false,
  });

  // Load high score from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("pmHustleHighScore");
    if (saved) {
      const score = parseInt(saved, 10);
      setHighScore(score);
      highScoreRef.current = score;
    }
  }, []);

  // Sync refs with state
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    highScoreRef.current = highScore;
  }, [highScore]);

  const endGame = useCallback(() => {
    const game = gameRef.current;
    game.isRunning = false;
    cancelAnimationFrame(game.animationId);
    setGameState("gameover");

    const finalScore = game.score;
    if (finalScore > highScoreRef.current) {
      setHighScore(finalScore);
      localStorage.setItem("pmHustleHighScore", finalScore.toString());
    }
  }, []);

  const spawnObject = useCallback(() => {
    const rand = Math.random();
    let cumulative = 0;
    let type: keyof typeof GAME_OBJECTS = "value";

    for (const [key, config] of Object.entries(GAME_OBJECTS)) {
      cumulative += config.spawnChance;
      if (rand < cumulative) {
        type = key as keyof typeof GAME_OBJECTS;
        break;
      }
    }

    const config = GAME_OBJECTS[type];
    const speedMultiplier = 1 + (gameRef.current.score / 100) * GAME_CONFIG.speedIncreaseRate;

    const obj: GameObject = {
      x: Math.random() * (GAME_CONFIG.canvasWidth - 40) + 20,
      y: -40,
      width: 36,
      height: 36,
      speed: GAME_CONFIG.baseObjectSpeed * speedMultiplier * (0.8 + Math.random() * 0.4),
      type,
      emoji: config.emoji,
      points: config.points,
    };

    gameRef.current.objects.push(obj);
  }, []);

  const checkCollision = useCallback((player: Player, obj: GameObject): boolean => {
    return (
      player.x < obj.x + obj.width &&
      player.x + player.width > obj.x &&
      player.y < obj.y + obj.height &&
      player.y + player.height > obj.y
    );
  }, []);

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    const game = gameRef.current;

    if (!canvas || !game.isRunning) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#FEF7EC");
    gradient.addColorStop(1, "#FFFBF5");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Move player
    if (game.keys.left && game.player.x > 5) {
      game.player.x -= GAME_CONFIG.playerSpeed;
    }
    if (game.keys.right && game.player.x < canvas.width - game.player.width - 5) {
      game.player.x += GAME_CONFIG.playerSpeed;
    }

    // Draw player (PM character)
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("🧑‍💼", game.player.x + game.player.width / 2, game.player.y + 38);

    // Spawn new objects
    const now = Date.now();
    const spawnInterval = Math.max(800, GAME_CONFIG.spawnRate - game.score * 2);
    if (now - game.lastSpawn > spawnInterval) {
      spawnObject();
      game.lastSpawn = now;
    }

    // Update and draw objects
    game.objects = game.objects.filter((obj) => {
      obj.y += obj.speed;

      // Draw object
      ctx.font = "32px Arial";
      ctx.textAlign = "center";
      ctx.fillText(obj.emoji, obj.x + obj.width / 2, obj.y + 30);

      // Check collision
      if (checkCollision(game.player, obj)) {
        game.score += obj.points;
        if (game.score < 0) game.score = 0;
        setScore(game.score);

        // Visual feedback
        if (obj.points > 0) {
          ctx.fillStyle = "rgba(16, 185, 129, 0.3)";
        } else {
          ctx.fillStyle = "rgba(239, 68, 68, 0.3)";
        }
        ctx.beginPath();
        ctx.arc(obj.x + obj.width / 2, obj.y + obj.height / 2, 30, 0, Math.PI * 2);
        ctx.fill();

        return false;
      }

      return obj.y < canvas.height + 50;
    });

    // Draw score
    ctx.fillStyle = "#4A423A";
    ctx.font = "bold 18px Inter, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`Score: ${game.score}`, 15, 30);

    // Continue game loop
    if (game.isRunning) {
      game.animationId = requestAnimationFrame(gameLoop);
    }
  }, [spawnObject, checkCollision]);

  const startGame = useCallback(() => {
    const game = gameRef.current;
    game.player = { x: 175, y: 440, width: 50, height: 50 };
    game.objects = [];
    game.score = 0;
    game.lastSpawn = Date.now();
    game.isRunning = true;

    setScore(0);
    setGameState("playing");

    game.animationId = requestAnimationFrame(gameLoop);
  }, [gameLoop]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") {
        gameRef.current.keys.left = true;
      }
      if (e.key === "ArrowRight" || e.key === "d") {
        gameRef.current.keys.right = true;
      }
      if (e.key === " " && gameStateRef.current === "idle") {
        startGame();
      }
      if (e.key === "Escape" && gameStateRef.current === "playing") {
        endGame();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") {
        gameRef.current.keys.left = false;
      }
      if (e.key === "ArrowRight" || e.key === "d") {
        gameRef.current.keys.right = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      gameRef.current.isRunning = false;
      cancelAnimationFrame(gameRef.current.animationId);
    };
  }, [startGame, endGame]);

  // Touch controls
  const handleTouchStart = useCallback((side: "left" | "right") => {
    gameRef.current.keys[side] = true;
  }, []);

  const handleTouchEnd = useCallback((side: "left" | "right") => {
    gameRef.current.keys[side] = false;
  }, []);

  const shareToLinkedIn = () => {
    const text = encodeURIComponent(
      `I just scored ${score} points in PM Hustle! 💎 Catching value and dodging scope creep like a pro. Think you can beat my score? #ProductManagement #PMHustle`
    );
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${text}`,
      "_blank"
    );
    setShowShareModal(false);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full bg-pastel-yellow/50 text-accent-coral text-sm font-medium mb-4"
            whileHover={{ scale: 1.05 }}
          >
            {mode === "work" ? "Interactive Demo" : "Time Waster 3000"}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl font-bold text-cream-800 mb-4">
            {mode === "work" ? "The PM Hustle" : "Procrastination Station"}
          </h2>
          <p className="text-cream-500 max-w-2xl mx-auto">
            {mode === "work"
              ? "A day in the life of a PM: catch value, dodge scope creep, and try not to miss deadlines."
              : "Finally, a game that accurately simulates my job. Catch the good stuff, avoid the bad stuff."}
          </p>
        </motion.div>

        {/* Game Container */}
        <div className="flex flex-col items-center">
          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-lg border border-cream-200 bg-white"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {/* Game Canvas */}
            <canvas
              ref={canvasRef}
              width={GAME_CONFIG.canvasWidth}
              height={GAME_CONFIG.canvasHeight}
              className="block"
            />

            {/* Idle Screen Overlay */}
            <AnimatePresence>
              {gameState === "idle" && (
                <motion.div
                  className="absolute inset-0 bg-cream-50/95 flex flex-col items-center justify-center p-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Gamepad2 className="w-16 h-16 text-accent-indigo mb-4" />
                  <h3 className="text-2xl font-bold text-cream-800 mb-2">PM Hustle</h3>
                  <p className="text-cream-500 text-center mb-6 max-w-xs">
                    Use arrow keys or buttons to move. Catch value, avoid scope creep!
                  </p>

                  {/* Legend */}
                  <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-pastel-mint/50">
                      <span>💎</span>
                      <span className="text-cream-600">Value (+10)</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-pastel-mint/50">
                      <span>☕</span>
                      <span className="text-cream-600">Coffee (+5)</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-pastel-pink/50">
                      <span>🐛</span>
                      <span className="text-cream-600">Scope Creep (-15)</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-pastel-pink/50">
                      <span>⏰</span>
                      <span className="text-cream-600">Deadline (-10)</span>
                    </div>
                  </div>

                  {highScore > 0 && (
                    <div className="flex items-center gap-2 mb-4 text-accent-coral">
                      <Trophy className="w-5 h-5" />
                      <span className="font-semibold">High Score: {highScore}</span>
                    </div>
                  )}

                  <Button onClick={startGame} size="lg">
                    <Play className="w-5 h-5" />
                    Start Game
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Game Over Overlay */}
            <AnimatePresence>
              {gameState === "gameover" && (
                <motion.div
                  className="absolute inset-0 bg-cream-50/95 flex flex-col items-center justify-center p-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Trophy className="w-16 h-16 text-accent-coral mb-4" />
                  <h3 className="text-2xl font-bold text-cream-800 mb-2">Game Over!</h3>
                  <p className="text-4xl font-bold gradient-text-warm mb-2">{score}</p>
                  <p className="text-cream-500 mb-4">points</p>

                  {score >= highScore && score > 0 && (
                    <motion.div
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-pastel-yellow mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.3 }}
                    >
                      <Zap className="w-4 h-4 text-accent-coral" />
                      <span className="text-cream-700 font-semibold">New High Score!</span>
                    </motion.div>
                  )}

                  <div className="flex gap-3">
                    <Button onClick={startGame} variant="default">
                      <RotateCcw className="w-4 h-4" />
                      Play Again
                    </Button>
                    <Button onClick={() => setShowShareModal(true)} variant="secondary">
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Touch Controls (Mobile) */}
          {gameState === "playing" && (
            <div className="flex gap-4 mt-6 md:hidden">
              <button
                className="w-20 h-20 rounded-2xl bg-pastel-blue border border-pastel-blue-dark/30 flex items-center justify-center text-3xl active:scale-95 transition-transform shadow-md"
                onTouchStart={() => handleTouchStart("left")}
                onTouchEnd={() => handleTouchEnd("left")}
                onMouseDown={() => handleTouchStart("left")}
                onMouseUp={() => handleTouchEnd("left")}
              >
                ⬅️
              </button>
              <button
                className="w-20 h-20 rounded-2xl bg-pastel-blue border border-pastel-blue-dark/30 flex items-center justify-center text-3xl active:scale-95 transition-transform shadow-md"
                onTouchStart={() => handleTouchStart("right")}
                onTouchEnd={() => handleTouchEnd("right")}
                onMouseDown={() => handleTouchStart("right")}
                onMouseUp={() => handleTouchEnd("right")}
              >
                ➡️
              </button>
            </div>
          )}

          {/* Controls hint */}
          {gameState === "playing" && (
            <p className="text-cream-400 text-sm mt-4 hidden md:block">
              Use ← → arrow keys or A/D to move • ESC to quit
            </p>
          )}
        </div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-cream-800">Share Your Score</h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-2 rounded-full hover:bg-cream-100 transition-colors"
                >
                  <X className="w-5 h-5 text-cream-500" />
                </button>
              </div>

              <div className="text-center mb-6">
                <p className="text-cream-500 mb-2">You scored</p>
                <p className="text-5xl font-bold gradient-text-warm">{score}</p>
                <p className="text-cream-500 mt-2">points in PM Hustle!</p>
              </div>

              <button
                onClick={shareToLinkedIn}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0077B5] text-white font-medium hover:bg-[#006699] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                Share to LinkedIn
              </button>

              <p className="text-cream-400 text-xs text-center mt-4">
                Show off your PM skills to your network!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
