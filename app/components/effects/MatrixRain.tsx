"use client";

import { useEffect, useRef } from "react";

const CHARACTERS = "01АБВГДЕЖЗКЛМН▓▒░アイウエオカキクケコ";
const FONT_SIZE = 14;
const COLUMN_SPACING = 20; // Wider spacing for better performance
const FPS_INTERVAL = 33; // ~30fps

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let columns: number;
    let drops: number[];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      columns = Math.floor(canvas.width / COLUMN_SPACING); // Use wider spacing for fewer columns
      drops = Array.from({ length: columns }, () =>
        Math.floor(Math.random() * -canvas.height / FONT_SIZE)
      );
    };

    resize();

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)"; // Faster fade for less blur trail
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00FF00";
      ctx.font = `${FONT_SIZE}px monospace`;

      for (let i = 0; i < columns; i++) {
        const char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        const x = i * COLUMN_SPACING; // Use column spacing instead of font size
        const y = drops[i] * FONT_SIZE;

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const intervalId = setInterval(draw, FPS_INTERVAL);

    window.addEventListener("resize", resize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full opacity-10 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
