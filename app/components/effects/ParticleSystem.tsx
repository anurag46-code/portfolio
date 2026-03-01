"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
}

const MAX_PARTICLES = 50; // Reduced from 100 for better performance
const PARTICLE_SIZE = 2;
const FRICTION = 0.95;
const ATTRACTION_FORCE_SCALE = 0.1;
const MAX_FORCE = 2;
const LIFE_DECAY = 0.015; // Slightly faster decay since we have fewer particles

export default function ParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect if device supports touch
    const hasTouchCapability =
      () => !!(
        (typeof window !== "undefined" &&
          ("ontouchstart" in window ||
            (typeof navigator !== "undefined" &&
              navigator.maxTouchPoints > 0))) ||
        (typeof navigator !== "undefined" &&
          "msMaxTouchPoints" in navigator &&
          (navigator as { msMaxTouchPoints?: number }).msMaxTouchPoints)
      );

    setIsTouchDevice(hasTouchCapability());
  }, []);

  useEffect(() => {
    // Disable on touch devices
    if (isTouchDevice) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Spawn particles near cursor (max 100 total)
      if (particlesRef.current.length < MAX_PARTICLES) {
        const particle: Particle = {
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1,
          size: PARTICLE_SIZE,
        };
        particlesRef.current.push(particle);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      // Clear canvas with slight fade
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      // Update and draw particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];

        // Calculate distance to mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Calculate attraction force
        const force = Math.min(100 / Math.max(distance, 1), MAX_FORCE);

        // Apply attraction
        p.vx += (dx / Math.max(distance, 1)) * force * ATTRACTION_FORCE_SCALE;
        p.vy += (dy / Math.max(distance, 1)) * force * ATTRACTION_FORCE_SCALE;

        // Apply friction
        p.vx *= FRICTION;
        p.vy *= FRICTION;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Decay life
        p.life -= LIFE_DECAY;

        // Remove dead particles
        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        // Draw particle with glow
        ctx.shadowColor = "rgba(0, 255, 0, 0.8)";
        ctx.shadowBlur = 10;
        ctx.fillStyle = `rgba(0, 255, 0, ${p.life})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowColor = "transparent";
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTouchDevice]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    />
  );
}
