"use client";

import { ReactNode } from "react";

interface CRTGlowProps {
  children: ReactNode;
  intensity?: "low" | "medium" | "high";
  className?: string;
}

const glowStyles = {
  low: {
    boxShadow:
      "0 0 5px #00FF0033, 0 0 10px #00FF0011, inset 0 0 5px #00FF0011",
  },
  medium: {
    boxShadow:
      "0 0 10px #00FF0066, 0 0 20px #00FF0033, 0 0 40px #00FF0011, inset 0 0 10px #00FF0022",
  },
  high: {
    boxShadow:
      "0 0 15px #00FF0088, 0 0 30px #00FF0055, 0 0 60px #00FF0022, 0 0 100px #00FF0011, inset 0 0 20px #00FF0033",
  },
};

export default function CRTGlow({
  children,
  intensity = "medium",
  className = "",
}: CRTGlowProps) {
  return (
    <div
      className={`relative rounded-md ${className}`}
      style={glowStyles[intensity]}
    >
      {children}
    </div>
  );
}
