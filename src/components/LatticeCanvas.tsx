import { useEffect, useRef } from "react";

export type LatticeTheme = "light" | "dark-teal" | "dark-blue";

interface LatticeCanvasProps {
  className?: string;
  reduceMotion?: boolean;
  theme?: LatticeTheme;
}

// Nodes: mix of human (H) and agent (A) types, distributed across the canvas
const NODES = [
  { x: 0.14, y: 0.20, type: "human" },
  { x: 0.38, y: 0.14, type: "agent" },
  { x: 0.65, y: 0.10, type: "agent" },
  { x: 0.86, y: 0.22, type: "agent" },
  { x: 0.26, y: 0.42, type: "agent" },
  { x: 0.52, y: 0.36, type: "human" },
  { x: 0.80, y: 0.40, type: "agent" },
  { x: 0.12, y: 0.64, type: "agent" },
  { x: 0.38, y: 0.66, type: "agent" },
  { x: 0.62, y: 0.60, type: "human" },
  { x: 0.86, y: 0.66, type: "agent" },
  { x: 0.20, y: 0.84, type: "human" },
  { x: 0.50, y: 0.82, type: "agent" },
  { x: 0.78, y: 0.86, type: "agent" },
] as const;

// Hand-crafted lattice connections — form a mesh, not a hub-and-spoke
const CONNECTIONS: [number, number][] = [
  [0, 1], [0, 4], [0, 7],
  [1, 2], [1, 4], [1, 5],
  [2, 3], [2, 5], [2, 6],
  [3, 6],
  [4, 5], [4, 7], [4, 8],
  [5, 6], [5, 8], [5, 9],
  [6, 9], [6, 10],
  [7, 8], [7, 11],
  [8, 9], [8, 11], [8, 12],
  [9, 10], [9, 12],
  [10, 13],
  [11, 12],
  [12, 13],
];

interface Colors {
  drawBg: (ctx: CanvasRenderingContext2D, w: number, h: number) => void;
  grid: string;
  connection: string;
  humanFill: string;
  humanRing: string;
  humanPulse: [number, number, number]; // rgb
  agentFill: string;
  agentRing: string;
  particle: string;
  particleGlowRgb: [number, number, number];
}

const THEMES: Record<LatticeTheme, Colors> = {
  light: {
    drawBg: (ctx, w, h) => { ctx.fillStyle = "#f5f9f8"; ctx.fillRect(0, 0, w, h); },
    grid: "rgba(42,81,100,0.06)",
    connection: "rgba(31,77,100,0.12)",
    humanFill: "#1f4d64",
    humanRing: "rgba(31,77,100,0.45)",
    humanPulse: [31, 77, 100],
    agentFill: "#415764",
    agentRing: "rgba(65,87,100,0.28)",
    particle: "rgba(31,77,100,0.9)",
    particleGlowRgb: [31, 77, 100],
  },
  "dark-teal": {
    drawBg: (ctx, w, h) => {
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "rgba(8,24,34,1)");
      g.addColorStop(1, "rgba(10,28,38,1)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    },
    grid: "rgba(74,159,176,0.08)",
    connection: "rgba(74,159,176,0.18)",
    humanFill: "#6bc4d8",
    humanRing: "rgba(107,196,216,0.5)",
    humanPulse: [107, 196, 216],
    agentFill: "#4a9fb0",
    agentRing: "rgba(74,159,176,0.35)",
    particle: "rgba(107,196,216,0.92)",
    particleGlowRgb: [107, 196, 216],
  },
  "dark-blue": {
    drawBg: (ctx, w, h) => {
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "rgba(4,15,38,0.98)");
      g.addColorStop(1, "rgba(7,17,40,0.98)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    },
    grid: "rgba(82,112,160,0.12)",
    connection: "rgba(86,147,255,0.2)",
    humanFill: "#8ec4ff",
    humanRing: "rgba(142,196,255,0.5)",
    humanPulse: [142, 196, 255],
    agentFill: "#5693ff",
    agentRing: "rgba(86,147,255,0.35)",
    particle: "rgba(142,196,255,0.92)",
    particleGlowRgb: [142, 196, 255],
  },
};

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

export function LatticeCanvas({ className, reduceMotion = false, theme = "dark-blue" }: LatticeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0, height = 0, animId = 0;
    const colors = THEMES[theme];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width; height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    resize();

    const render = () => {
      const t = reduceMotion ? 0 : performance.now() * 0.001;
      ctx.clearRect(0, 0, width, height);
      colors.drawBg(ctx, width, height);

      // Grid
      ctx.strokeStyle = colors.grid;
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 32) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += 32) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Pixel positions
      const pts = NODES.map(n => ({ x: n.x * width, y: n.y * height, type: n.type }));

      // Connections + bidirectional particles
      CONNECTIONS.forEach(([i, j], ci) => {
        const p0 = pts[i], p1 = pts[j];
        ctx.strokeStyle = colors.connection;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();

        const speed = 0.13 + (ci % 5) * 0.008;

        // Particle A→B
        const pa = ((t * speed + ci * 0.37) % 1 + 1) % 1;
        const pxA = { x: lerp(p0.x, p1.x, pa), y: lerp(p0.y, p1.y, pa) };
        const [r, g, b] = colors.particleGlowRgb;
        const gA = ctx.createRadialGradient(pxA.x, pxA.y, 0, pxA.x, pxA.y, 10);
        gA.addColorStop(0, `rgba(${r},${g},${b},0.28)`);
        gA.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = gA;
        ctx.beginPath(); ctx.arc(pxA.x, pxA.y, 10, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = colors.particle;
        ctx.beginPath(); ctx.arc(pxA.x, pxA.y, 2.5, 0, Math.PI * 2); ctx.fill();

        // Particle B→A (0.5 phase offset = traveling the opposite direction on same connection)
        const pb = ((t * speed + ci * 0.37 + 0.5) % 1 + 1) % 1;
        const pxB = { x: lerp(p1.x, p0.x, pb), y: lerp(p1.y, p0.y, pb) };
        const gB = ctx.createRadialGradient(pxB.x, pxB.y, 0, pxB.x, pxB.y, 8);
        gB.addColorStop(0, `rgba(${r},${g},${b},0.22)`);
        gB.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = gB;
        ctx.beginPath(); ctx.arc(pxB.x, pxB.y, 8, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = colors.particle;
        ctx.globalAlpha = 0.7;
        ctx.beginPath(); ctx.arc(pxB.x, pxB.y, 2, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Nodes (drawn on top)
      pts.forEach((p, idx) => {
        const isHuman = p.type === "human";
        const size = isHuman ? 7 : 4.5;
        const bob = reduceMotion ? 0 : Math.sin(t * (isHuman ? 1.1 : 1.7) + idx * 0.9) * 0.3;

        // Human direction pulses
        if (isHuman) {
          const phase = ((t * 0.18 + idx * 0.6) % 1 + 1) % 1;
          if (phase < 0.5) {
            const fr = phase / 0.5;
            const pr = fr * Math.min(width, height) * 0.12;
            const [hr, hg, hb] = colors.humanPulse;
            ctx.strokeStyle = `rgba(${hr},${hg},${hb},${(1 - fr) * 0.3})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.arc(p.x, p.y, pr, 0, Math.PI * 2); ctx.stroke();
          }
        }

        // Ring
        ctx.strokeStyle = isHuman ? colors.humanRing : colors.agentRing;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * (1.7 + bob * 0.2), 0, Math.PI * 2);
        ctx.stroke();

        // Core
        ctx.fillStyle = isHuman ? colors.humanFill : colors.agentFill;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => { ro.disconnect(); cancelAnimationFrame(animId); };
  }, [reduceMotion, theme]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
