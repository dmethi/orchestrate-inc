import { useEffect, useRef } from "react";

interface SystemsCanvasProps {
  className?: string;
  reduceMotion?: boolean;
}

type Point = { x: number; y: number };

const AGENT_NODES = [
  { x: 0.78, y: 0.18, speed: 0.55 },
  { x: 0.88, y: 0.28, speed: 0.7 },
  { x: 0.8, y: 0.44, speed: 0.65 },
  { x: 0.9, y: 0.54, speed: 0.48 },
  { x: 0.78, y: 0.7, speed: 0.52 },
  { x: 0.88, y: 0.82, speed: 0.75 },
] as const;

const PORTFOLIO_NODES = [0.14, 0.29, 0.44, 0.59, 0.74, 0.89] as const;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function pointOnCurve(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const inv = 1 - t;
  return {
    x:
      inv * inv * inv * p0.x +
      3 * inv * inv * t * p1.x +
      3 * inv * t * t * p2.x +
      t * t * t * p3.x,
    y:
      inv * inv * inv * p0.y +
      3 * inv * inv * t * p1.y +
      3 * inv * t * t * p2.y +
      t * t * t * p3.y,
  };
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, h / 2, w / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

export function SystemsCanvas({ className, reduceMotion = false }: SystemsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let animationId = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const resizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    resize();

    const render = () => {
      const t = reduceMotion ? 0 : performance.now() * 0.001;
      context.clearRect(0, 0, width, height);

      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "rgba(4, 15, 38, 0.98)");
      gradient.addColorStop(0.6, "rgba(8, 24, 56, 0.96)");
      gradient.addColorStop(1, "rgba(7, 17, 40, 0.98)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      context.strokeStyle = "rgba(82, 112, 160, 0.12)";
      context.lineWidth = 1;
      for (let x = 0; x < width; x += 28) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }
      for (let y = 0; y < height; y += 28) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }

      const core = { x: width * 0.34, y: height * 0.42 };
      const coreRadius = Math.min(width, height) * 0.14;

      const ambientGlow = context.createRadialGradient(
        core.x,
        core.y,
        coreRadius * 0.2,
        core.x,
        core.y,
        coreRadius * 2.2
      );
      ambientGlow.addColorStop(0, "rgba(255, 244, 234, 0.7)");
      ambientGlow.addColorStop(0.4, "rgba(70, 144, 255, 0.16)");
      ambientGlow.addColorStop(1, "rgba(70, 144, 255, 0)");
      context.fillStyle = ambientGlow;
      context.beginPath();
      context.arc(core.x, core.y, coreRadius * 2.4, 0, Math.PI * 2);
      context.fill();

      context.strokeStyle = "rgba(126, 180, 255, 0.26)";
      context.lineWidth = 1.5;
      context.beginPath();
      context.arc(core.x, core.y, coreRadius * 1.1, 0, Math.PI * 2);
      context.stroke();

      context.strokeStyle = "rgba(255, 255, 255, 0.12)";
      context.setLineDash([6, 10]);
      context.beginPath();
      context.arc(core.x, core.y, coreRadius * 1.7, 0, Math.PI * 2);
      context.stroke();
      context.setLineDash([]);

      const pulseRadius = coreRadius * (1.32 + (reduceMotion ? 0 : Math.sin(t * 1.4) * 0.08));
      context.strokeStyle = "rgba(90, 165, 255, 0.22)";
      context.beginPath();
      context.arc(core.x, core.y, pulseRadius, 0, Math.PI * 2);
      context.stroke();

      AGENT_NODES.forEach((node, index) => {
        const bob = reduceMotion ? 0 : Math.sin(t * node.speed + index * 1.8) * 10;
        const point = {
          x: width * node.x,
          y: height * node.y + bob,
        };
        const cp1 = { x: lerp(point.x, core.x, 0.42), y: point.y };
        const cp2 = { x: lerp(point.x, core.x, 0.76), y: core.y + (point.y - core.y) * 0.1 };

        context.strokeStyle = "rgba(86, 147, 255, 0.26)";
        context.lineWidth = 1.2;
        context.beginPath();
        context.moveTo(point.x, point.y);
        context.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, core.x, core.y);
        context.stroke();

        const progress = reduceMotion ? 0.58 : (t * (0.2 + node.speed * 0.07) + index * 0.16) % 1;
        const particle = pointOnCurve(point, cp1, cp2, core, progress);
        const particleGlow = context.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          14
        );
        particleGlow.addColorStop(0, "rgba(156, 204, 255, 0.95)");
        particleGlow.addColorStop(1, "rgba(156, 204, 255, 0)");
        context.fillStyle = particleGlow;
        context.beginPath();
        context.arc(particle.x, particle.y, 14, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = "rgba(142, 195, 255, 0.95)";
        context.beginPath();
        context.arc(point.x, point.y, 4, 0, Math.PI * 2);
        context.fill();

        context.strokeStyle = "rgba(182, 220, 255, 0.4)";
        context.beginPath();
        context.arc(point.x, point.y, 10, 0, Math.PI * 2);
        context.stroke();
      });

      const coreGradient = context.createRadialGradient(
        core.x,
        core.y,
        0,
        core.x,
        core.y,
        coreRadius
      );
      coreGradient.addColorStop(0, "rgba(255, 252, 248, 0.98)");
      coreGradient.addColorStop(0.55, "rgba(246, 247, 255, 0.72)");
      coreGradient.addColorStop(1, "rgba(246, 247, 255, 0)");
      context.fillStyle = coreGradient;
      context.beginPath();
      context.arc(core.x, core.y, coreRadius, 0, Math.PI * 2);
      context.fill();

      PORTFOLIO_NODES.forEach((fraction, index) => {
        const cardWidth = width * 0.095;
        const cardHeight = 34;
        const x = width * fraction - cardWidth * 0.5;
        const y = height * 0.84 + (index % 2) * 6;
        drawRoundedRect(context, x, y, cardWidth, cardHeight, 9);
        context.fillStyle = "rgba(10, 23, 49, 0.92)";
        context.fill();
        context.strokeStyle = "rgba(103, 138, 188, 0.18)";
        context.stroke();

        const pulse = reduceMotion ? 0.55 : 0.48 + 0.18 * Math.sin(t * 1.7 + index);
        const barWidth = cardWidth * pulse;
        drawRoundedRect(context, x + 8, y + 10, barWidth, 6, 3);
        context.fillStyle =
          index === 2 || index === 3
            ? "rgba(110, 182, 255, 0.88)"
            : "rgba(88, 120, 168, 0.66)";
        context.fill();
      });

      const sweepX = reduceMotion ? width * 0.68 : (t * 55) % (width + 160) - 160;
      const sweep = context.createLinearGradient(sweepX, 0, sweepX + 160, 0);
      sweep.addColorStop(0, "rgba(70, 144, 255, 0)");
      sweep.addColorStop(0.5, "rgba(70, 144, 255, 0.08)");
      sweep.addColorStop(1, "rgba(70, 144, 255, 0)");
      context.fillStyle = sweep;
      context.fillRect(0, 0, width, height);

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, [reduceMotion]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
