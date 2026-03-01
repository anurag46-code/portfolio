"use client";

import { useRef, useEffect, useState } from "react";

interface NeonBorderProps {
  isActive?: boolean;
  children?: React.ReactNode;
}

export default function NeonBorder({ isActive = false, children }: NeonBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      setDimensions({
        width: containerRef.current?.offsetWidth || 0,
        height: containerRef.current?.offsetHeight || 0,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const cornerRadius = 4;
  const strokeWidth = 1;

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {children}

      {isActive && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ overflow: "visible" }}
        >
          {/* Border rectangle */}
          <rect
            x={strokeWidth / 2}
            y={strokeWidth / 2}
            width={dimensions.width - strokeWidth}
            height={dimensions.height - strokeWidth}
            fill="none"
            stroke="#00FF00"
            strokeWidth={strokeWidth}
            strokeDasharray={`${2 * (dimensions.width + dimensions.height - 2 * cornerRadius) + 2 * Math.PI * cornerRadius}`}
            strokeDashoffset={`${2 * (dimensions.width + dimensions.height - 2 * cornerRadius) + 2 * Math.PI * cornerRadius}`}
            rx={cornerRadius}
            ry={cornerRadius}
            className="animate-draw-border"
            vectorEffect="non-scaling-stroke"
          />

          {/* Corner glow circles */}
          {/* Top-left */}
          <circle
            cx={cornerRadius + strokeWidth}
            cy={cornerRadius + strokeWidth}
            r="3"
            fill="none"
            stroke="#00FF00"
            strokeWidth={strokeWidth}
            className="animate-corner-glow"
            style={{ animationDelay: "0s" }}
            vectorEffect="non-scaling-stroke"
          />

          {/* Top-right */}
          <circle
            cx={dimensions.width - cornerRadius - strokeWidth}
            cy={cornerRadius + strokeWidth}
            r="3"
            fill="none"
            stroke="#00FF00"
            strokeWidth={strokeWidth}
            className="animate-corner-glow"
            style={{ animationDelay: "0.25s" }}
            vectorEffect="non-scaling-stroke"
          />

          {/* Bottom-right */}
          <circle
            cx={dimensions.width - cornerRadius - strokeWidth}
            cy={dimensions.height - cornerRadius - strokeWidth}
            r="3"
            fill="none"
            stroke="#00FF00"
            strokeWidth={strokeWidth}
            className="animate-corner-glow"
            style={{ animationDelay: "0.5s" }}
            vectorEffect="non-scaling-stroke"
          />

          {/* Bottom-left */}
          <circle
            cx={cornerRadius + strokeWidth}
            cy={dimensions.height - cornerRadius - strokeWidth}
            r="3"
            fill="none"
            stroke="#00FF00"
            strokeWidth={strokeWidth}
            className="animate-corner-glow"
            style={{ animationDelay: "0.75s" }}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
    </div>
  );
}
