"use client";

import { ReactNode, useEffect, useState } from "react";

interface HolographicTextProps {
  children: ReactNode;
  className?: string;
  enabled?: boolean;
}

export default function HolographicText({
  children,
  className = "",
  enabled = true,
}: HolographicTextProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(query.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  if (!enabled || prefersReducedMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span
      className={`holographic-text ${className}`}
      style={{
        background:
          "linear-gradient(90deg, #00FF00, #00FFFF, #0088FF, #FF00FF, #FF0088, #00FF00)",
        backgroundSize: "200% auto",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        animation: "shimmer 3s linear infinite",
        textShadow:
          "0 0 10px rgba(0, 255, 0, 0.5), 0 0 20px rgba(0, 255, 255, 0.3), 0 0 30px rgba(0, 136, 255, 0.2)",
        filter: "drop-shadow(0 0 8px rgba(0, 255, 0, 0.4)) drop-shadow(0 0 15px rgba(0, 255, 255, 0.2))",
      }}
    >
      {children}
    </span>
  );
}
