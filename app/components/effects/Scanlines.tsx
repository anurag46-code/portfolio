"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const DURATION_MIN = 2; // seconds – fast scroll
const DURATION_MAX = 8; // seconds – idle / slow scroll
const DECAY_INTERVAL = 100; // ms – how often we ease back toward DURATION_MAX
const DECAY_STEP = 0.15; // seconds added per decay tick
const BASE_INTENSITY = 0.15;
const MAX_INTENSITY = 0.5;
const SCROLL_STOP_TIMEOUT = 200; // ms until returning to base intensity
const SHOCKWAVE_MAX_RADIUS = 200; // px

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  startTime: number;
}

interface ScanlinesProps {
  opacity?: number;
  className?: string;
}

export default function Scanlines({
  opacity = 0.05,
  className = "",
}: ScanlinesProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [animDuration, setAnimDuration] = useState(DURATION_MAX);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intensityRef = useRef(BASE_INTENSITY);
  const shockwavesRef = useRef<Shockwave[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const animateRef = useRef<(() => void) | null>(null);
  const scrollStopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(0);
  const decayTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reduced-motion media query
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Map scroll velocity to intensity
  const velocityToIntensity = useCallback((velocity: number): number => {
    // velocity is in px/ms; typical fast scroll ≈ 3-10 px/ms
    const clamped = Math.min(Math.max(velocity, 0), 8);
    // Linear interpolation: 0 velocity → BASE_INTENSITY, 8+ velocity → MAX_INTENSITY
    return BASE_INTENSITY + (clamped / 8) * (MAX_INTENSITY - BASE_INTENSITY);
  }, []);

  // Canvas animation loop
  useEffect(() => {
    if (reducedMotion || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Set canvas size to match container
    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Handle clicks anywhere on the page for shockwave effect
    const handleClick = (e: MouseEvent) => {
      shockwavesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        startTime: performance.now(),
      });
      // Restart animation loop if it was paused
      if (animationFrameRef.current === null) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    window.addEventListener("click", handleClick);

    let lastIntensity = BASE_INTENSITY;

    const animate = () => {
      const now = performance.now();
      const hasShockwaves = shockwavesRef.current.length > 0;
      const intensityChanged = Math.abs(intensityRef.current - lastIntensity) > 0.001;

      // Only redraw if there's something to animate
      if (hasShockwaves || intensityChanged) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw scanlines with current intensity (only if intensity is visible)
        if (intensityRef.current > 0.01) {
          const lineSpacing = 2;
          const lineHeight = 2;
          ctx.strokeStyle = `rgba(0, 0, 0, ${intensityRef.current})`;
          ctx.lineWidth = lineHeight;

          for (let y = 0; y < canvas.height; y += lineSpacing + lineHeight) {
            ctx.beginPath();
            ctx.moveTo(0, y + lineHeight);
            ctx.lineTo(canvas.width, y + lineHeight);
            ctx.stroke();
          }
        }

        lastIntensity = intensityRef.current;

        // Draw shockwaves
        if (hasShockwaves) {
          const newShockwaves: Shockwave[] = [];

          for (const wave of shockwavesRef.current) {
            const elapsed = now - wave.startTime;
            const progress = elapsed / 300; // 300ms total animation duration

            if (progress < 1) {
              wave.radius = (progress * SHOCKWAVE_MAX_RADIUS);
              const alpha = Math.max(0, 1 - progress);
              // Get CSS variable for terminal glow color
              const glowColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--terminal-glow')
                .trim() || '#00FF00';

              // Convert hex to RGB
              const r = parseInt(glowColor.slice(1, 3), 16);
              const g = parseInt(glowColor.slice(3, 5), 16);
              const b = parseInt(glowColor.slice(5, 7), 16);

              ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
              ctx.lineWidth = 3; // Thicker for better visibility
              ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${alpha * 0.8})`;
              ctx.shadowBlur = 15;
              ctx.beginPath();
              ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
              ctx.stroke();
              ctx.shadowBlur = 0; // Reset shadow

              newShockwaves.push(wave);
            }
          }

          shockwavesRef.current = newShockwaves;
        }
      }

      // Only continue RAF if there's work to do (shockwaves or intensity changing)
      if (hasShockwaves || intensityChanged) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        animationFrameRef.current = null; // Pause loop when idle
      }
    };

    // Store animate function in ref so it can be restarted from scroll handler
    animateRef.current = animate;
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("click", handleClick);
    };
  }, [reducedMotion]);


  // Map scroll velocity to animation duration
  const velocityToDuration = useCallback((velocity: number): number => {
    const clamped = Math.min(Math.max(velocity, 0), 8);
    return DURATION_MAX - (clamped / 8) * (DURATION_MAX - DURATION_MIN);
  }, []);

  // Scroll tracking + intensity updates
  useEffect(() => {
    if (reducedMotion) return;

    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        const now = performance.now();
        const dt = now - lastScrollTime.current;

        if (dt > 0 && lastScrollTime.current !== 0) {
          const dy = Math.abs(window.scrollY - lastScrollY.current);
          const velocity = dy / dt; // px/ms
          const intensity = velocityToIntensity(velocity);
          intensityRef.current = intensity;
          const dur = velocityToDuration(velocity);
          setAnimDuration((prev) => Math.min(prev, dur));

          // Restart canvas animation if it was paused
          if (animationFrameRef.current === null && animateRef.current) {
            animationFrameRef.current = requestAnimationFrame(animateRef.current);
          }
        }

        lastScrollY.current = window.scrollY;
        lastScrollTime.current = now;
        rafId = null;

        // Clear existing scroll stop timer
        if (scrollStopTimerRef.current) {
          clearTimeout(scrollStopTimerRef.current);
        }

        // Set new scroll stop timer
        scrollStopTimerRef.current = setTimeout(() => {
          intensityRef.current = BASE_INTENSITY;
        }, SCROLL_STOP_TIMEOUT);
      });
    };

    // Decay: gradually return to DURATION_MAX when scrolling stops
    decayTimer.current = setInterval(() => {
      setAnimDuration((prev) => {
        const next = Math.min(prev + DECAY_STEP, DURATION_MAX);
        // Stop interval when max is reached to prevent unnecessary state updates
        if (next >= DURATION_MAX && decayTimer.current) {
          clearInterval(decayTimer.current);
          decayTimer.current = null;
        }
        return next;
      });
    }, DECAY_INTERVAL);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (decayTimer.current) clearInterval(decayTimer.current);
      if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion, velocityToIntensity, velocityToDuration]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Static scanline pattern */}
      <div
        className="absolute inset-0"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, ${opacity}) 2px,
            rgba(0, 0, 0, ${opacity}) 4px
          )`,
        }}
      />
      {/* Dynamic canvas for scanlines */}
      {!reducedMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{
            willChange: "contents",
            pointerEvents: "none",
          }}
        />
      )}
      {/* Moving scanline highlight - skipped for reduced motion */}
      {!reducedMotion && (
        <div
          className="absolute inset-0 animate-scanline"
          style={{
            background: `linear-gradient(
              180deg,
              transparent 0%,
              rgba(0, 255, 0, 0.03) 50%,
              transparent 100%
            )`,
            height: "33%",
            willChange: "transform",
            animationDuration: `${animDuration}s`,
          }}
        />
      )}
    </div>
  );
}
