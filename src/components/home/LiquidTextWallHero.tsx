"use client";

import { layoutWithLines, prepareWithSegments } from "@chenglou/pretext";
import { useEffect, useRef } from "react";
import type { Messages } from "@/i18n/types";

const FONT_FAMILY =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace';
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

const BACKDROP_COLORS = {
  dust: "#2f2f2f",
  sand: "#464646",
  wave: "#5a5a5a",
  spark: "#767676",
  void: "#000000",
  snake: "#f2f2f2",
  apple: "#ff4d4d",
  stem: "#b3b3b3",
  message: "#d0d0d0",
} as const;

const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1, glyph: "^" },
  ArrowDown: { x: 0, y: 1, glyph: "v" },
  ArrowLeft: { x: -1, y: 0, glyph: "<" },
  ArrowRight: { x: 1, y: 0, glyph: ">" },
} as const;

type Direction = (typeof DIRECTIONS)[keyof typeof DIRECTIONS];
type Token = keyof typeof BACKDROP_COLORS;

type Point = { x: number; y: number };

type Game = {
  snake: Point[];
  direction: Direction;
  apple: Point;
  score: number;
  growth: number;
  alive: boolean;
  paused: boolean;
  tickMs: number;
  camera: Point;
  lastStepAt: number;
};

type Metrics = {
  cssWidth: number;
  cssHeight: number;
  fontSize: number;
  lineHeight: number;
  cellWidth: number;
  cols: number;
  rows: number;
  boardWidth: number;
  boardHeight: number;
  left: number;
  top: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function samePoint(a: Point, b: Point) {
  return a.x === b.x && a.y === b.y;
}

function isOpposite(a: Point, b: Point) {
  return a.x === -b.x && a.y === -b.y;
}

function keyFor(x: number, y: number) {
  return `${x},${y}`;
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hash2(x: number, y: number) {
  const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return value - Math.floor(value);
}

function createGame(): Game {
  return {
    snake: [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: -2, y: 0 },
      { x: -3, y: 0 },
      { x: -4, y: 0 },
    ],
    direction: DIRECTIONS.ArrowRight,
    apple: { x: 12, y: -4 },
    score: 0,
    growth: 0,
    alive: true,
    paused: false,
    tickMs: 128,
    camera: { x: 0, y: 0 },
    lastStepAt: performance.now(),
  };
}

export function LiquidTextWallHero({ dict }: { dict: Messages }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);
  const speedRef = useRef<HTMLSpanElement>(null);
  const stateRef = useRef<HTMLSpanElement>(null);
  const noteRef = useRef<HTMLSpanElement>(null);

  const hl = dict.home.heroLiquid;

  useEffect(() => {
    const canvas = canvasRef.current;
    const viewport = viewportRef.current;
    const scoreEl = scoreRef.current;
    const speedEl = speedRef.current;
    const stateEl = stateRef.current;
    const noteEl = noteRef.current;
    if (!canvas || !viewport || !scoreEl || !speedEl || !stateEl || !noteEl) {
      return;
    }
    const canvasNode = canvas;
    const viewportNode = viewport;
    const scoreNode = scoreEl;
    const speedNode = speedEl;
    const stateNode = stateEl;
    const noteNode = noteEl;

    const ctx = canvasNode.getContext("2d");
    if (!ctx) return;
    const context = ctx;

    const metrics: Metrics = {
      cssWidth: 0,
      cssHeight: 0,
      fontSize: 18,
      lineHeight: 22,
      cellWidth: 11,
      cols: 40,
      rows: 20,
      boardWidth: 0,
      boardHeight: 0,
      left: 0,
      top: 0,
    };

    let queuedDirections: Direction[] = [];
    let needsResize = true;
    let needsRender = true;
    let needsCameraReset = true;
    let lastAmbientFrameAt = 0;
    let raf = 0;

    const game = createGame();
    const reducedMotion = window.matchMedia(REDUCED_MOTION);

    function syncHud() {
      scoreNode.textContent = `score ${game.score}`;
      speedNode.textContent = `speed ${(1000 / game.tickMs).toFixed(1)}`;

      if (!game.alive) {
        stateNode.textContent = "state dead";
        noteNode.textContent = "arrows move | enter restart";
        return;
      }
      if (game.paused) {
        stateNode.textContent = "state paused";
        noteNode.textContent = "space resume | enter restart";
        return;
      }
      stateNode.textContent = "state running";
      noteNode.textContent = "arrows move | space pause | enter restart";
    }

    function getAppleSpawnBounds(camera = game.camera) {
      const left = camera.x + 2;
      const top = camera.y + 2;
      const right = camera.x + metrics.cols - 3;
      const bottom = camera.y + metrics.rows - 3;
      const bandX = Math.max(4, Math.floor((right - left + 1) * 0.18));
      const bandY = Math.max(3, Math.floor((bottom - top + 1) * 0.2));
      return { left, top, right, bottom, bandX, bandY };
    }

    function randomEdgeCandidate(bounds: ReturnType<typeof getAppleSpawnBounds>) {
      const side = randomInt(0, 3);
      if (side === 0) {
        return {
          x: randomInt(bounds.left, bounds.left + bounds.bandX - 1),
          y: randomInt(bounds.top, bounds.bottom),
        };
      }
      if (side === 1) {
        return {
          x: randomInt(bounds.right - bounds.bandX + 1, bounds.right),
          y: randomInt(bounds.top, bounds.bottom),
        };
      }
      if (side === 2) {
        return {
          x: randomInt(bounds.left, bounds.right),
          y: randomInt(bounds.top, bounds.top + bounds.bandY - 1),
        };
      }
      return {
        x: randomInt(bounds.left, bounds.right),
        y: randomInt(bounds.bottom - bounds.bandY + 1, bounds.bottom),
      };
    }

    function distanceToSnake(point: Point) {
      let closest = Infinity;
      for (const segment of game.snake) {
        const distance = Math.abs(segment.x - point.x) + Math.abs(segment.y - point.y);
        closest = Math.min(closest, distance);
      }
      return closest;
    }

    function spawnApple(camera = game.camera) {
      const head = game.snake[0]!;
      const bounds = getAppleSpawnBounds(camera);
      const minHeadDistance = Math.max(
        10,
        Math.floor(Math.min(metrics.cols, metrics.rows) * 0.35),
      );
      for (let attempt = 0; attempt < 500; attempt += 1) {
        const candidate = randomEdgeCandidate(bounds);
        if (Math.abs(candidate.x - head.x) < 5 && Math.abs(candidate.y - head.y) < 3) {
          continue;
        }
        if (Math.abs(candidate.x - head.x) + Math.abs(candidate.y - head.y) < minHeadDistance) {
          continue;
        }
        if (distanceToSnake(candidate) < 4) {
          continue;
        }
        return candidate;
      }
      return randomEdgeCandidate(bounds);
    }

    function syncCamera(force = false) {
      const head = game.snake[0]!;
      const marginX = Math.max(12, Math.min(22, Math.floor(metrics.cols * 0.22)));
      const marginY = Math.max(5, Math.min(8, Math.floor(metrics.rows * 0.2)));
      if (force) {
        game.camera.x = head.x - (marginX + 1);
        game.camera.y = head.y - Math.floor(metrics.rows / 2);
        return;
      }
      const screenX = head.x - game.camera.x;
      const screenY = head.y - game.camera.y;
      if (screenX < marginX) game.camera.x = head.x - marginX;
      else if (screenX > metrics.cols - marginX - 1) {
        game.camera.x = head.x - (metrics.cols - marginX - 1);
      }
      if (screenY < marginY) game.camera.y = head.y - marginY;
      else if (screenY > metrics.rows - marginY - 1) {
        game.camera.y = head.y - (metrics.rows - marginY - 1);
      }
    }

    function appleIsOutOfView() {
      const { left, top, right, bottom } = getAppleSpawnBounds();
      return (
        game.apple.x < left ||
        game.apple.x > right ||
        game.apple.y < top ||
        game.apple.y > bottom
      );
    }

    function updateMetrics() {
      const rect = viewportNode.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      metrics.cssWidth = rect.width;
      metrics.cssHeight = rect.height;

      canvasNode.width = Math.floor(rect.width * dpr);
      canvasNode.height = Math.floor(rect.height * dpr);
      canvasNode.style.width = `${rect.width}px`;
      canvasNode.style.height = `${rect.height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      metrics.fontSize = clamp(Math.min(rect.width / 56, rect.height / 28), 13, 23);
      metrics.lineHeight = Math.ceil(metrics.fontSize * 1.18);
      context.font = `500 ${metrics.fontSize}px ${FONT_FAMILY}`;
      context.textBaseline = "alphabetic";
      metrics.cellWidth = context.measureText("M").width;

      metrics.cols = Math.max(26, Math.floor((rect.width - 8) / metrics.cellWidth));
      metrics.rows = Math.max(14, Math.floor((rect.height - 8) / metrics.lineHeight));
      metrics.boardWidth = metrics.cols * metrics.cellWidth;
      metrics.boardHeight = metrics.rows * metrics.lineHeight;
      metrics.left = Math.floor((rect.width - metrics.boardWidth) / 2);
      metrics.top = Math.floor((rect.height - metrics.boardHeight) / 2);

      syncCamera();
      if (!needsCameraReset && appleIsOutOfView()) {
        game.apple = spawnApple();
      }
    }

    function queueDirection(nextDirection: Direction) {
      const lastQueued = queuedDirections[queuedDirections.length - 1] ?? game.direction;
      if (samePoint(nextDirection, lastQueued) || isOpposite(nextDirection, lastQueued)) {
        return;
      }
      queuedDirections.push(nextDirection);
      if (queuedDirections.length > 2) queuedDirections.shift();
    }

    function advanceGame(now: number) {
      if (!game.alive || game.paused) return false;
      let changed = false;
      while (now - game.lastStepAt >= game.tickMs) {
        game.lastStepAt += game.tickMs;
        changed = true;

        const candidateDirection = queuedDirections.shift();
        if (candidateDirection && !isOpposite(candidateDirection, game.direction)) {
          game.direction = candidateDirection;
        }

        const head = game.snake[0]!;
        const nextHead = { x: head.x + game.direction.x, y: head.y + game.direction.y };
        const willEatApple = samePoint(nextHead, game.apple);
        const bodyToCheck = willEatApple ? game.snake : game.snake.slice(0, -1);
        if (bodyToCheck.some((segment) => samePoint(segment, nextHead))) {
          game.alive = false;
          game.paused = false;
          syncHud();
          return true;
        }

        game.snake.unshift(nextHead);
        if (willEatApple) {
          game.score += 1;
          game.growth += 2;
          game.tickMs = Math.max(78, 128 - game.score * 2.8);
        }
        if (game.growth > 0) game.growth -= 1;
        else game.snake.pop();

        syncCamera();
        if (willEatApple) game.apple = spawnApple();
      }
      return changed;
    }

    function headGlyph() {
      return game.direction.glyph;
    }

    function bodyGlyph(index: number) {
      if (index === game.snake.length - 1) return ".";
      return index % 2 === 0 ? "O" : "o";
    }

    function appleSprite() {
      return [
        { x: game.apple.x, y: game.apple.y - 1, glyph: "'", color: "stem" as Token },
        { x: game.apple.x, y: game.apple.y, glyph: "&", color: "apple" as Token },
      ];
    }

    function addMoatCross(cells: Set<string>, point: Point, radius = 1) {
      cells.add(keyFor(point.x, point.y));
      for (let offset = 1; offset <= radius; offset += 1) {
        cells.add(keyFor(point.x - offset, point.y));
        cells.add(keyFor(point.x + offset, point.y));
        cells.add(keyFor(point.x, point.y - offset));
        cells.add(keyFor(point.x, point.y + offset));
      }
    }

    function backdropGlyph(x: number, y: number) {
      const wave =
        Math.sin(x * 0.2) +
        Math.cos(y * 0.18) +
        Math.sin((x + y) * 0.09) +
        Math.cos((x - y) * 0.07);
      const grain = hash2(x * 1.9, y * 2.3) - 0.5;
      const value = wave * 0.68 + grain * 0.78;

      if (value > 1.7) return { glyph: "#", color: "spark" as Token };
      if (value > 1.15) return { glyph: "*", color: "spark" as Token };
      if (value > 0.72) return { glyph: "+", color: "wave" as Token };
      if (value > 0.34) return { glyph: "~", color: "wave" as Token };
      if (value > -0.06) return { glyph: ":", color: "sand" as Token };
      if (value > -0.4) return { glyph: ".", color: "sand" as Token };
      if (value > -0.78) return { glyph: ",", color: "dust" as Token };
      return { glyph: hash2(x, y) > 0.5 ? "'" : "`", color: "dust" as Token };
    }

    function animateBackdropCell(baseCell: { glyph: string; color: Token }, x: number, y: number, now: number) {
      const phase = Math.floor(now / (reducedMotion.matches ? 320 : 140));
      const shimmer = hash2(x * 0.61 + phase * 0.37, y * 0.57 - phase * 0.29);
      const pulse = Math.sin(x * 0.05 + y * 0.04 + phase * 0.45);

      if (baseCell.color === "spark") {
        if (shimmer > 0.991) return { glyph: "#", color: "spark" as Token };
        if (shimmer < 0.012 || pulse > 0.96) return { glyph: "*", color: "spark" as Token };
        return baseCell;
      }
      if (baseCell.color === "wave") {
        if (shimmer > 0.985) return { glyph: "+", color: "wave" as Token };
        if (shimmer < 0.02 || pulse < -0.95) return { glyph: "~", color: "wave" as Token };
        return baseCell;
      }
      if (baseCell.color === "sand") {
        if (shimmer > 0.988) return { glyph: ":", color: "sand" as Token };
        if (shimmer < 0.018 || pulse > 0.97) return { glyph: ".", color: "sand" as Token };
        return baseCell;
      }
      if (shimmer > 0.992) return { glyph: ".", color: "sand" as Token };
      if (shimmer < 0.018 || pulse < -0.96) {
        return {
          glyph: hash2(x - phase * 0.19, y + phase * 0.13) > 0.5 ? "'" : "`",
          color: "dust" as Token,
        };
      }
      return baseCell;
    }

    function stampMessage(rows: string[][], colors: Token[][], lines: string[]) {
      const startRow = Math.floor(rows.length / 2) - Math.floor(lines.length / 2);
      for (let rowIndex = 0; rowIndex < lines.length; rowIndex += 1) {
        const line = lines[rowIndex]!;
        const targetRow = startRow + rowIndex;
        const startCol = Math.floor((metrics.cols - line.length) / 2);

        for (let pad = -2; pad < line.length + 2; pad += 1) {
          const col = startCol + pad;
          if (rows[targetRow] && colors[targetRow] && col >= 0 && col < metrics.cols) {
            rows[targetRow]![col] = " ";
            colors[targetRow]![col] = "void";
          }
        }
        for (let i = 0; i < line.length; i += 1) {
          const col = startCol + i;
          rows[targetRow]![col] = line[i]!;
          colors[targetRow]![col] = "message";
        }
      }
    }

    function buildScene(now: number) {
      const rows = Array.from({ length: metrics.rows }, () => Array(metrics.cols).fill(" "));
      const colors: Token[][] = Array.from({ length: metrics.rows }, () =>
        Array(metrics.cols).fill("void" as Token),
      );
      const snakeCells = new Map<string, { glyph: string; color: Token }>();
      const moatCells = new Set<string>();
      const appleCells = new Map<string, { x: number; y: number; glyph: string; color: Token }>();

      for (let index = 0; index < game.snake.length; index += 1) {
        const segment = game.snake[index]!;
        snakeCells.set(
          keyFor(segment.x, segment.y),
          index === 0
            ? { glyph: headGlyph(), color: "snake" }
            : { glyph: bodyGlyph(index), color: "snake" },
        );
        if (index === 0) addMoatCross(moatCells, segment, 1);
      }

      for (const piece of appleSprite()) {
        appleCells.set(keyFor(piece.x, piece.y), piece);
      }
      addMoatCross(moatCells, game.apple, 1);

      for (let row = 0; row < metrics.rows; row += 1) {
        const worldY = game.camera.y + row;
        for (let col = 0; col < metrics.cols; col += 1) {
          const worldX = game.camera.x + col;
          const key = keyFor(worldX, worldY);
          const snakePiece = snakeCells.get(key);
          const applePiece = appleCells.get(key);

          if (snakePiece) {
            rows[row]![col] = snakePiece.glyph;
            colors[row]![col] = snakePiece.color;
            continue;
          }
          if (applePiece) {
            rows[row]![col] = applePiece.glyph;
            colors[row]![col] = applePiece.color;
            continue;
          }
          if (moatCells.has(key)) {
            rows[row]![col] = " ";
            colors[row]![col] = "void";
            continue;
          }

          const animatedBackdrop = animateBackdropCell(
            backdropGlyph(worldX, worldY),
            worldX,
            worldY,
            now,
          );
          rows[row]![col] = animatedBackdrop.glyph;
          colors[row]![col] = animatedBackdrop.color;
        }
      }

      if (!game.alive) {
        stampMessage(rows, colors, ["SELF COLLISION", "PRESS ENTER"]);
      } else if (game.paused) {
        stampMessage(rows, colors, ["PAUSED", "SPACE TO RESUME"]);
      }

      const rowText = rows.map((row) => row.join(""));
      return { rows: rowText, text: rowText.join("\n"), colors } as {
        rows: string[];
        text: string;
        colors: Token[][];
      };
    }

    function drawBoard() {
      context.clearRect(0, 0, metrics.cssWidth, metrics.cssHeight);
      context.fillStyle = BACKDROP_COLORS.void;
      context.fillRect(0, 0, metrics.cssWidth, metrics.cssHeight);
      context.fillStyle = "#050505";
      context.fillRect(metrics.left, metrics.top, metrics.boardWidth, metrics.boardHeight);
      context.strokeStyle = "#242424";
      context.strokeRect(metrics.left + 0.5, metrics.top + 0.5, metrics.boardWidth - 1, metrics.boardHeight - 1);
    }

    function render(now: number) {
      syncHud();
      drawBoard();
      context.font = `500 ${metrics.fontSize}px ${FONT_FAMILY}`;
      context.textBaseline = "alphabetic";

      const scene = buildScene(now);
      const prepared = prepareWithSegments(scene.text, context.font, { whiteSpace: "pre-wrap" });
      layoutWithLines(prepared, metrics.boardWidth + 1, metrics.lineHeight);
      const baseline = metrics.top + metrics.fontSize;

      for (let row = 0; row < scene.rows.length; row += 1) {
        const line = scene.rows[row]!;
        const paletteRow: Token[] = scene.colors[row] ?? [];
        const y = baseline + row * metrics.lineHeight;
        for (let col = 0; col < line.length; col += 1) {
          const char = line[col]!;
          const token = paletteRow[col] ?? "dust";
          context.fillStyle = BACKDROP_COLORS[token] ?? BACKDROP_COLORS.dust;
          context.fillText(char, metrics.left + col * metrics.cellWidth, y);
        }
      }
    }

    function resetGame() {
      Object.assign(game, createGame());
      queuedDirections = [];
      needsCameraReset = true;
      needsRender = true;
      syncHud();
    }

    function animationFrame(now: number) {
      if (needsResize) {
        updateMetrics();
        needsResize = false;
        needsRender = true;
      }
      if (needsCameraReset) {
        syncCamera(true);
        game.apple = spawnApple();
        needsCameraReset = false;
        needsRender = true;
      }
      if (advanceGame(now)) needsRender = true;

      const ambientInterval = reducedMotion.matches ? 260 : 120;
      if (now - lastAmbientFrameAt >= ambientInterval) {
        lastAmbientFrameAt = now;
        needsRender = true;
      }
      if (needsRender) {
        render(now);
        needsRender = false;
      }
      raf = requestAnimationFrame(animationFrame);
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key in DIRECTIONS) {
        event.preventDefault();
        queueDirection(DIRECTIONS[event.key as keyof typeof DIRECTIONS]);
        return;
      }
      if (event.key === " ") {
        event.preventDefault();
        if (game.alive) {
          game.paused = !game.paused;
          syncHud();
          needsRender = true;
        }
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        resetGame();
      }
    };

    const onResize = () => {
      needsResize = true;
    };

    const observer = new ResizeObserver(() => {
      needsResize = true;
    });
    observer.observe(viewportNode);

    window.addEventListener("keydown", onKeyDown, { passive: false });
    window.addEventListener("resize", onResize);

    resetGame();
    syncHud();
    raf = requestAnimationFrame(animationFrame);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      className="relative min-h-[100dvh] w-full overflow-hidden border-b border-zinc-200/80 bg-black dark:border-zinc-800"
      aria-label={hl.ariaLabel}
    >
      <div className="absolute inset-x-0 top-0 z-10 border-b border-zinc-700/60 bg-black/70 px-4 py-2 font-mono text-xs text-zinc-300 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-4 gap-y-1">
          <span ref={scoreRef}>score 0</span>
          <span ref={speedRef}>speed 0.0</span>
          <span ref={stateRef}>state running</span>
        </div>
      </div>

      <div ref={viewportRef} className="relative h-[100dvh] w-full">
        <canvas ref={canvasRef} className="h-full w-full" aria-hidden />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-zinc-700/60 bg-black/70 px-4 py-2 font-mono text-xs text-zinc-300 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
          <span ref={noteRef}>arrows move | space pause | enter restart</span>
          <span className="flex items-center gap-3">
            <span>{dict.home.title}</span>
            <a
              href="https://github.com/cocktailpeanut/asciisnake"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 underline-offset-4 hover:text-zinc-200 hover:underline"
            >
              Source: cocktailpeanut/asciisnake
            </a>
          </span>
        </div>
      </div>

      <p className="sr-only">{hl.seoText}</p>
    </section>
  );
}
