"use client";

import { useEffect, useState } from "react";

interface ParallaxStyles {
  transform: string;
  filter: string;
}

export default function useParallax(
  speed: number,
  blur: number = 0
): ParallaxStyles {
  const [offset, setOffset] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion preference
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPrefersReducedMotion(prefersReduced);

    if (prefersReduced) {
      return;
    }

    let ticking = false;
    let lastOffset = 0;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const newOffset = Math.round(window.scrollY * speed);
          // Only update if offset changed by at least 1px to reduce re-renders
          if (Math.abs(newOffset - lastOffset) >= 1) {
            setOffset(newOffset);
            lastOffset = newOffset;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  // If prefers-reduced-motion is enabled, return neutral styles
  if (prefersReducedMotion) {
    return {
      transform: "translateY(0px)",
      filter: "none",
    };
  }

  return {
    transform: `translateY(${offset}px)`,
    filter: blur > 0 ? `blur(${blur}px)` : "none",
  };
}
