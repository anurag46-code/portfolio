"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { getCpPlatformIcon } from "@/app/lib/icon-mappings";
import useCountUp from "@/app/hooks/useCountUp";
import use3DTilt from "@/app/hooks/use3DTilt";

interface StatCardProps {
  platform: string;
  rating: string;
  solved: string;
  rank: string;
}

/**
 * Extracts the leading integer and any trailing suffix from a string.
 * Returns null if the string doesn't start with a digit.
 *
 * Examples:
 *   "1440"   -> { num: 1440, suffix: "" }
 *   "1800+"  -> { num: 1800, suffix: "+" }
 *   "500+"   -> { num: 500, suffix: "+" }
 *   "Knight" -> null
 *   "4-star" -> { num: 4, suffix: "-star" }
 */
function parseNumericValue(value: string): { num: number; suffix: string } | null {
  const match = value.match(/^(\d+)(.*)/);
  if (!match) return null;
  return { num: parseInt(match[1], 10), suffix: match[2] };
}

function AnimatedValue({
  value,
  inView,
}: {
  value: string;
  inView: boolean;
}) {
  const parsed = parseNumericValue(value);

  if (!parsed) {
    // Non-numeric value (e.g. "Specialist") -- render as-is
    return <span className="text-gray-300">{value}</span>;
  }

  return <CountUpValue end={parsed.num} suffix={parsed.suffix} inView={inView} />;
}

function CountUpValue({
  end,
  suffix,
  inView,
}: {
  end: number;
  suffix: string;
  inView: boolean;
}) {
  const count = useCountUp(end, 1500, inView);
  return (
    <span className="text-gray-300 tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function StatCard({ platform, rating, solved, rank }: StatCardProps) {
  const iconUrl = getCpPlatformIcon(platform);
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.5 });
  const tilt = use3DTilt(cardRef);

  return (
    <motion.div
      ref={cardRef}
      className="relative border border-terminal-border rounded-md p-4 sm:p-5 bg-terminal-bg/50 transition-all duration-300"
      style={{
        boxShadow: "0 0 5px #00ff0033, 0 0 10px #00ff0011, inset 0 0 5px #00ff0011",
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 10px #00ff0066, 0 0 20px #00ff0033, 0 0 40px #00ff0011, inset 0 0 10px #00ff0022",
        borderColor: "rgba(0, 255, 65, 0.5)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {iconUrl && !imageError && (
            <div className="w-10 h-10 flex items-center justify-center bg-terminal-bg/80 rounded-lg border border-terminal-border">
              <img
                src={iconUrl}
                alt={`${platform} logo`}
                className="w-6 h-6"
                loading="lazy"
                onError={() => setImageError(true)}
              />
            </div>
          )}
          <h3 className="text-terminal-glow text-base sm:text-lg font-mono font-semibold">
            {platform}
          </h3>
        </div>
      </div>

      <div className="space-y-2 text-xs sm:text-sm font-mono">
        <div className="flex justify-between">
          <span className="text-gray-400">rating:</span>
          <AnimatedValue value={rating} inView={isInView} />
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">solved:</span>
          <AnimatedValue value={solved} inView={isInView} />
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">rank:</span>
          <AnimatedValue value={rank} inView={isInView} />
        </div>
      </div>
    </motion.div>
  );
}
