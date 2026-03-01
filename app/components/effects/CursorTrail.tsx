"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface TrailDot {
  id: number;
  x: number;
  y: number;
}

const MAX_DOTS = 10;
const DOT_LIFETIME_MS = 300;
const MOBILE_BREAKPOINT = 768;

export default function CursorTrail() {
  const [dots, setDots] = useState<TrailDot[]>([]);
  const [enabled, setEnabled] = useState(false);
  const nextId = useRef(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isDesktop = window.innerWidth >= MOBILE_BREAKPOINT;
    setEnabled(!reducedMotion && isDesktop);

    const handleResize = () => {
      setEnabled(
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
          window.innerWidth >= MOBILE_BREAKPOINT
      );
    };

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setEnabled(!e.matches && window.innerWidth >= MOBILE_BREAKPOINT);
    };

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    window.addEventListener("resize", handleResize);
    mq.addEventListener("change", handleMotionChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      mq.removeEventListener("change", handleMotionChange);
    };
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!enabled) return;

      const id = nextId.current++;
      const newDot: TrailDot = { id, x: e.clientX, y: e.clientY };

      setDots((prev) => {
        const updated = [...prev, newDot];
        return updated.length > MAX_DOTS ? updated.slice(-MAX_DOTS) : updated;
      });

      setTimeout(() => {
        setDots((prev) => prev.filter((dot) => dot.id !== id));
      }, DOT_LIFETIME_MS);
    },
    [enabled]
  );

  useEffect(() => {
    if (!enabled) return;
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [enabled, handleMouseMove]);

  if (!enabled || dots.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 9999 }}
      aria-hidden="true"
    >
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute animate-cursor-trail-fade"
          style={{
            left: dot.x - 2,
            top: dot.y - 2,
            width: 4,
            height: 4,
            borderRadius: "50%",
            backgroundColor: "#00FF00",
            boxShadow: "0 0 6px #00FF00, 0 0 10px #00FF0088",
            willChange: "opacity, transform",
          }}
        />
      ))}
    </div>
  );
}
