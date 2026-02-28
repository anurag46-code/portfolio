"use client";

import { useEffect, useState } from "react";

interface ScanlinesProps {
  opacity?: number;
  className?: string;
}

export default function Scanlines({
  opacity = 0.05,
  className = "",
}: ScanlinesProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

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
          }}
        />
      )}
    </div>
  );
}
