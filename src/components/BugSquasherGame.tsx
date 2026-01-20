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
  Crosshair,
  Zap,
  Bug,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface BugSquasherGameProps {
  mode: "work" | "play";
}

interface Target {
  id: number;
  x: number;
  y: number;
  type: "bug" | "feature" | "collaboration" | "downtime";
  spawnTime: number;
  lifetime: number;
  scale: number;
}

type GameState = "idle" | "playing" | "gameover";

const GAME_CONFIG = {
  gameDuration: 45000, // 45 seconds
  spawnRate: 1200,
  minSpawnRate: 600,
  targetLifetime: 2500,
  minTargetLifetime: 1500,
  canvasWidth: 400,
  canvasHeight: 500,
  targetSize: 80,
};

// Sprite regions in the 2x2 grid (approximate pixel positions)
// The image appears to be roughly split into 4 equal quadrants
const SPRITE_CONFIG = {
  bug: { points: 15, spawnChance: 0.35, label: "Bug Squashed!", color: "#10B981" },
  feature: { points: 20, spawnChance: 0.25, label: "Feature Shipped!", color: "#6366F1" },
  collaboration: { points: 30, spawnChance: 0.15, label: "Team Synergy!", color: "#F59E0B" },
  downtime: { points: -25, spawnChance: 0.25, label: "Server Down!", color: "#EF4444" },
};

export function BugSquasherGame({ mode }: BugSquasherGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spriteRef = useRef<HTMLImageElement | null>(null);
  const [gameState, setGameState] = useState<GameState>("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_CONFIG.gameDuration);
  const [combo, setCombo] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [lastHit, setLastHit] = useState<{ text: string; color: string; x: number; y: number } | null>(null);

  const gameStateRef = useRef<GameState>("idle");
  const highScoreRef = useRef(0);

  const gameRef = useRef({
    targets: [] as Target[],
    animationId: 0,
    lastSpawn: 0,
    gameStartTime: 0,
    score: 0,
    combo: 0,
    isRunning: false,
    nextId: 0,
  });

  // Load sprite image
  useEffect(() => {
    const img = new Image();
    img.src = "/images/game-sprites.png";
    img.onload = () => {
      spriteRef.current = img;
    };
  }, []);

  // Load high score from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("bugSquasherHighScore");
    if (saved) {
      const s = parseInt(saved, 10);
      setHighScore(s);
      highScoreRef.current = s;
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
      localStorage.setItem("bugSquasherHighScore", finalScore.toString());
    }
  }, []);

  const spawnTarget = useCallback(() => {
    const game = gameRef.current;
    const rand = Math.random();
    let cumulative = 0;
    let type: keyof typeof SPRITE_CONFIG = "bug";

    for (const [key, config] of Object.entries(SPRITE_CONFIG)) {
      cumulative += config.spawnChance;
      if (rand < cumulative) {
        type = key as keyof typeof SPRITE_CONFIG;
        break;
      }
    }

    // Calculate difficulty scaling based on elapsed time
    const elapsed = Date.now() - game.gameStartTime;
    const difficultyFactor = Math.min(elapsed / GAME_CONFIG.gameDuration, 1);
    const lifetime = GAME_CONFIG.targetLifetime - difficultyFactor * (GAME_CONFIG.targetLifetime - GAME_CONFIG.minTargetLifetime);

    const padding = GAME_CONFIG.targetSize / 2 + 10;
    const target: Target = {
      id: game.nextId++,
      x: padding + Math.random() * (GAME_CONFIG.canvasWidth - 2 * padding),
      y: padding + Math.random() * (GAME_CONFIG.canvasHeight - 2 * padding),
      type,
      spawnTime: Date.now(),
      lifetime,
      scale: 0,
    };

    game.targets.push(target);
  }, []);

  const drawSprite = useCallback((ctx: CanvasRenderingContext2D, type: keyof typeof SPRITE_CONFIG, x: number, y: number, scale: number) => {
    const sprite = spriteRef.current;
    if (!sprite) return;

    // The sprite sheet is 2x2 grid
    // bug: top-left, feature: top-right, collaboration: bottom-left, downtime: bottom-right
    const spriteWidth = sprite.width / 2;
    const spriteHeight = sprite.height / 2;

    let sx = 0, sy = 0;
    switch (type) {
      case "bug":
        sx = 0; sy = 0;
        break;
      case "feature":
        sx = spriteWidth; sy = 0;
        break;
      case "collaboration":
        sx = 0; sy = spriteHeight;
        break;
      case "downtime":
        sx = spriteWidth; sy = spriteHeight;
        break;
    }

    const size = GAME_CONFIG.targetSize * scale;
    ctx.save();
    ctx.imageSmoothingEnabled = false; // Preserve pixel art crispness
    ctx.drawImage(
      sprite,
      sx, sy, spriteWidth, spriteHeight,
      x - size / 2, y - size / 2, size, size
    );
    ctx.restore();
  }, []);

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    const game = gameRef.current;

    if (!canvas || !game.isRunning) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const now = Date.now();
    const elapsed = now - game.gameStartTime;
    const remaining = Math.max(0, GAME_CONFIG.gameDuration - elapsed);
    setTimeLeft(remaining);

    // Check if game ended
    if (remaining <= 0) {
      endGame();
      return;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#1a1a2e");
    gradient.addColorStop(0.5, "#16213e");
    gradient.addColorStop(1, "#0f3460");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw subtle grid pattern
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Spawn new targets
    const difficultyFactor = Math.min(elapsed / GAME_CONFIG.gameDuration, 1);
    const currentSpawnRate = GAME_CONFIG.spawnRate - difficultyFactor * (GAME_CONFIG.spawnRate - GAME_CONFIG.minSpawnRate);

    if (now - game.lastSpawn > currentSpawnRate && game.targets.length < 8) {
      spawnTarget();
      game.lastSpawn = now;
    }

    // Update and draw targets
    game.targets = game.targets.filter((target) => {
      const age = now - target.spawnTime;
      const lifeRatio = age / target.lifetime;

      if (lifeRatio >= 1) {
        // Target expired - reset combo if it was a bug
        if (target.type === "bug") {
          game.combo = 0;
          setCombo(0);
        }
        return false;
      }

      // Animate scale: pop in, then shrink out
      let scale = 1;
      if (lifeRatio < 0.1) {
        scale = lifeRatio / 0.1; // Pop in
      } else if (lifeRatio > 0.8) {
        scale = 1 - (lifeRatio - 0.8) / 0.2; // Shrink out
      }

      // Add subtle pulse animation
      scale *= 0.9 + Math.sin(age / 100) * 0.1;
      target.scale = scale;

      // Draw target
      drawSprite(ctx, target.type, target.x, target.y, scale);

      // Draw timer ring
      const ringRadius = GAME_CONFIG.targetSize * scale / 2 + 5;
      ctx.beginPath();
      ctx.arc(target.x, target.y, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(target.x, target.y, ringRadius, -Math.PI / 2, -Math.PI / 2 + (1 - lifeRatio) * Math.PI * 2);
      const config = SPRITE_CONFIG[target.type];
      ctx.strokeStyle = config.color;
      ctx.lineWidth = 3;
      ctx.stroke();

      return true;
    });

    // Draw HUD
    ctx.fillStyle = "white";
    ctx.font = "bold 18px 'Inter', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`Score: ${game.score}`, 15, 30);

    if (game.combo > 1) {
      ctx.fillStyle = "#F59E0B";
      ctx.fillText(`x${game.combo} Combo!`, 15, 55);
    }

    ctx.textAlign = "right";
    ctx.fillStyle = remaining < 10000 ? "#EF4444" : "white";
    ctx.fillText(`${Math.ceil(remaining / 1000)}s`, canvas.width - 15, 30);

    // Continue game loop
    if (game.isRunning) {
      game.animationId = requestAnimationFrame(gameLoop);
    }
  }, [spawnTarget, drawSprite, endGame]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameStateRef.current !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    const game = gameRef.current;

    // Find clicked target (check in reverse to get topmost)
    for (let i = game.targets.length - 1; i >= 0; i--) {
      const target = game.targets[i];
      const hitRadius = GAME_CONFIG.targetSize * target.scale / 2;
      const dx = clickX - target.x;
      const dy = clickY - target.y;

      if (dx * dx + dy * dy <= hitRadius * hitRadius) {
        const config = SPRITE_CONFIG[target.type];

        // Calculate points with combo
        let points = config.points;
        if (points > 0) {
          game.combo++;
          points *= Math.min(game.combo, 5); // Cap combo multiplier at 5x
        } else {
          game.combo = 0;
        }

        game.score += points;
        if (game.score < 0) game.score = 0;

        setScore(game.score);
        setCombo(game.combo);
        setLastHit({ text: config.label, color: config.color, x: target.x, y: target.y });
        setTimeout(() => setLastHit(null), 800);

        // Remove target
        game.targets.splice(i, 1);
        break;
      }
    }
  }, []);

  const startGame = useCallback(() => {
    const game = gameRef.current;
    game.targets = [];
    game.score = 0;
    game.combo = 0;
    game.gameStartTime = Date.now();
    game.lastSpawn = Date.now();
    game.isRunning = true;

    setScore(0);
    setCombo(0);
    setTimeLeft(GAME_CONFIG.gameDuration);
    setGameState("playing");

    game.animationId = requestAnimationFrame(gameLoop);
  }, [gameLoop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      gameRef.current.isRunning = false;
      cancelAnimationFrame(gameRef.current.animationId);
    };
  }, []);

  const shareToLinkedIn = () => {
    const text = encodeURIComponent(
      `I squashed ${score} points worth of bugs in Bug Squasher! Can you beat my score? #GameDev #BugSquasher #ProductManagement`
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
            className="inline-block px-4 py-1.5 rounded-full bg-pastel-mint/50 text-accent-emerald text-sm font-medium mb-4"
            whileHover={{ scale: 1.05 }}
          >
            {mode === "work" ? "Interactive Demo" : "Bug Hunting Time"}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl font-bold text-cream-800 mb-4">
            {mode === "work" ? "Bug Squasher" : "Squash 'Em All!"}
          </h2>
          <p className="text-cream-500 max-w-2xl mx-auto">
            {mode === "work"
              ? "Click bugs to squash them, ship features, and build team synergy. Avoid the server downtime!"
              : "My actual job, gamified. Click fast, score big, pretend you're being productive."}
          </p>
        </motion.div>

        {/* Game Container */}
        <div className="flex flex-col items-center">
          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-lg border-2 border-cream-300"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {/* Game Canvas */}
            <canvas
              ref={canvasRef}
              width={GAME_CONFIG.canvasWidth}
              height={GAME_CONFIG.canvasHeight}
              className={cn(
                "block cursor-crosshair",
                gameState === "playing" && "cursor-crosshair"
              )}
              onClick={handleClick}
            />

            {/* Hit Feedback */}
            <AnimatePresence>
              {lastHit && (
                <motion.div
                  className="absolute pointer-events-none font-bold text-lg"
                  style={{
                    left: lastHit.x,
                    top: lastHit.y,
                    color: lastHit.color,
                    textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                  }}
                  initial={{ opacity: 1, scale: 0.5, y: 0 }}
                  animate={{ opacity: 0, scale: 1.2, y: -40 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {lastHit.text}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Idle Screen Overlay */}
            <AnimatePresence>
              {gameState === "idle" && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e]/95 to-[#0f3460]/95 flex flex-col items-center justify-center p-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Bug className="w-16 h-16 text-accent-emerald mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Bug Squasher</h3>
                  <p className="text-gray-300 text-center mb-6 max-w-xs">
                    Click targets to score points before they disappear! Build combos for bonus points.
                  </p>

                  {/* Legend */}
                  <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                      <span className="text-xl">🐛</span>
                      <span className="text-emerald-300">Bug (+15)</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-500/20 border border-indigo-500/30">
                      <span className="text-xl">⚙️</span>
                      <span className="text-indigo-300">Feature (+20)</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/20 border border-amber-500/30">
                      <span className="text-xl">🤝</span>
                      <span className="text-amber-300">Collab (+30)</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/20 border border-red-500/30">
                      <span className="text-xl">🤖</span>
                      <span className="text-red-300">Downtime (-25)</span>
                    </div>
                  </div>

                  {highScore > 0 && (
                    <div className="flex items-center gap-2 mb-4 text-amber-400">
                      <Trophy className="w-5 h-5" />
                      <span className="font-semibold">High Score: {highScore}</span>
                    </div>
                  )}

                  <Button onClick={startGame} size="lg" className="bg-emerald-500 hover:bg-emerald-600">
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
                  className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e]/95 to-[#0f3460]/95 flex flex-col items-center justify-center p-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Trophy className="w-16 h-16 text-amber-400 mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Time's Up!</h3>
                  <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400 mb-2">
                    {score}
                  </p>
                  <p className="text-gray-300 mb-4">points</p>

                  {score >= highScore && score > 0 && (
                    <motion.div
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.3 }}
                    >
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span className="text-amber-300 font-semibold">New High Score!</span>
                    </motion.div>
                  )}

                  <div className="flex gap-3">
                    <Button onClick={startGame} className="bg-emerald-500 hover:bg-emerald-600">
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

          {/* Controls hint */}
          {gameState === "playing" && (
            <p className="text-cream-400 text-sm mt-4">
              Click targets to score! Combos multiply your points.
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
                <p className="text-cream-500 mb-2">You squashed</p>
                <p className="text-5xl font-bold gradient-text-warm">{score}</p>
                <p className="text-cream-500 mt-2">points worth of bugs!</p>
              </div>

              <button
                onClick={shareToLinkedIn}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0077B5] text-white font-medium hover:bg-[#006699] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                Share to LinkedIn
              </button>

              <p className="text-cream-400 text-xs text-center mt-4">
                Show off your bug-squashing skills!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
