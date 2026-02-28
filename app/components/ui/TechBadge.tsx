"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { staggerItem } from "@/app/utils/animation-variants";
import { getTechIcon } from "@/app/lib/icon-mappings";

interface TechBadgeProps {
  name: string;
  category?: string;
}

export default function TechBadge({ name }: TechBadgeProps) {
  const iconUrl = getTechIcon(name);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.span
      variants={staggerItem}
      className="inline-flex items-center gap-2 px-3 py-2 border border-terminal-border rounded text-xs sm:text-sm font-mono text-terminal-text bg-terminal-bg/50 transition-all duration-200 hover:border-terminal-glow/60 hover:shadow-text-glow hover:text-terminal-glow cursor-default select-none"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {iconUrl && !imageError && (
        <img
          src={iconUrl}
          alt={`${name} logo`}
          className="w-4 h-4 flex-shrink-0"
          loading="lazy"
          onError={() => setImageError(true)}
        />
      )}
      <span>{name}</span>
    </motion.span>
  );
}
