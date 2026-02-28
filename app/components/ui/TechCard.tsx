"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { type TechSkill, skillLevels } from "@/app/data/tech-stack-data";

interface TechCardProps {
  skill: TechSkill;
}

export default function TechCard({ skill }: TechCardProps) {
  const [imageError, setImageError] = useState(false);
  const levelInfo = skillLevels[skill.level];

  // Check if icon is a full URL or just a slug
  const iconUrl = skill.icon
    ? skill.icon.startsWith("http")
      ? skill.icon // Full URL
      : `https://cdn.simpleicons.org/${skill.icon}/${skill.color || "FFFFFF"}` // Simple Icons slug
    : undefined;

  return (
    <motion.div
      className="relative border border-terminal-border rounded-lg p-4 bg-terminal-bg/50 hover:bg-terminal-bg/70 transition-all duration-300 group"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Years badge - top right */}
      {skill.years && (
        <div className="absolute top-3 right-3 text-xs font-mono text-terminal-dim bg-terminal-bg border border-terminal-border px-2 py-0.5 rounded">
          {skill.years}
        </div>
      )}

      {/* Icon */}
      <div className="flex justify-center mb-4 mt-2">
        {iconUrl && !imageError ? (
          <div className="w-16 h-16 flex items-center justify-center bg-terminal-bg/80 rounded-lg border border-terminal-border group-hover:border-terminal-glow/50 transition-colors">
            <img
              src={iconUrl}
              alt={`${skill.name} logo`}
              className="w-10 h-10"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="w-16 h-16 flex items-center justify-center bg-terminal-bg/80 rounded-lg border border-terminal-border text-2xl font-mono text-terminal-glow">
            {skill.name.charAt(0)}
          </div>
        )}
      </div>

      {/* Tech name */}
      <h3 className="text-center text-gray-200 font-mono text-sm font-semibold mb-1">
        {skill.name}
      </h3>

      {/* Category */}
      <p className="text-center text-gray-400 text-xs font-mono mb-3">
        {skill.category}
      </p>

      {/* Skill level badge */}
      <div className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-terminal-bg/90 border border-terminal-border">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: levelInfo.color }}
        />
        <span className="text-xs font-mono uppercase tracking-wide" style={{ color: levelInfo.color }}>
          {levelInfo.label}
        </span>
      </div>
    </motion.div>
  );
}
