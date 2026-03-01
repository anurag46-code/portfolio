"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface ChromaticTextProps {
  children: ReactNode;
  className?: string;
  maxOffset?: number;
}

export default function ChromaticText({
  children,
  className = "",
  maxOffset = 3,
}: ChromaticTextProps) {
  const [offset, setOffset] = useState(0);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(0);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafId = useRef<number | null>(null);
  const lastOffset = useRef(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    lastScrollY.current = window.scrollY;
    lastScrollTime.current = performance.now();

    const handleScroll = () => {
      if (rafId.current !== null) return;

      rafId.current = requestAnimationFrame(() => {
        const now = performance.now();
        const deltaY = Math.abs(window.scrollY - lastScrollY.current);
        const deltaTime = Math.max(now - lastScrollTime.current, 1);
        const velocity = deltaY / deltaTime; // px/ms

        // Map velocity to offset (velocity ~0.5-2 px/ms is typical fast scroll)
        const newOffset = Math.min(velocity * maxOffset, maxOffset);

        // Only update if offset changed significantly (reduce re-renders)
        if (Math.abs(newOffset - lastOffset.current) > 0.5) {
          setOffset(newOffset);
          lastOffset.current = newOffset;
        }

        lastScrollY.current = window.scrollY;
        lastScrollTime.current = now;
        rafId.current = null;

        // Reset after 100ms of no scrolling
        if (resetTimer.current) clearTimeout(resetTimer.current);
        resetTimer.current = setTimeout(() => {
          setOffset(0);
          lastOffset.current = 0;
        }, 100);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [maxOffset]);

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Red channel - shifts left */}
      <span
        aria-hidden="true"
        className="absolute inset-0 text-red-500 mix-blend-screen"
        style={{
          transform: `translateX(${-offset}px)`,
          transition: "transform 0.08s ease-out",
        }}
      >
        {children}
      </span>

      {/* Blue channel - shifts right */}
      <span
        aria-hidden="true"
        className="absolute inset-0 text-blue-500 mix-blend-screen"
        style={{
          transform: `translateX(${offset}px)`,
          transition: "transform 0.08s ease-out",
        }}
      >
        {children}
      </span>

      {/* Main text on top */}
      <span className="relative z-10">{children}</span>
    </span>
  );
}
