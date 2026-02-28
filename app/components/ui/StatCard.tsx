"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { getCpPlatformIcon } from "@/app/lib/icon-mappings";

interface StatCardProps {
  platform: string;
  rating: string;
  solved: string;
  rank: string;
}

export default function StatCard({ platform, rating, solved, rank }: StatCardProps) {
  const iconUrl = getCpPlatformIcon(platform);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      className="border border-terminal-border rounded-md p-4 sm:p-5 bg-terminal-bg/50 transition-all duration-300"
      style={{
        boxShadow: "0 0 5px #00ff0033, 0 0 10px #00ff0011, inset 0 0 5px #00ff0011",
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
          <span className="text-gray-300">{rating}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">solved:</span>
          <span className="text-gray-300">{solved}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">rank:</span>
          <span className="text-gray-300">{rank}</span>
        </div>
      </div>
    </motion.div>
  );
}
