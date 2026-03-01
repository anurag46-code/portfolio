"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { type TechSkill, skillLevels } from "@/app/data/tech-stack-data";

interface TechCardProps {
  skill: TechSkill;
}

export default function TechCard({ skill }: TechCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const levelInfo = skillLevels[skill.level];

  useEffect(() => {
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Check if icon is a full URL or just a slug
  const iconUrl = skill.icon
    ? skill.icon.startsWith("http")
      ? skill.icon // Full URL
      : `https://cdn.simpleicons.org/${skill.icon}/${skill.color || "FFFFFF"}` // Simple Icons slug
    : undefined;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const animationDuration = prefersReducedMotion ? 0 : 0.6;

  return (
    <motion.div
      onClick={handleFlip}
      className="relative w-full h-64 cursor-pointer"
      style={{
        perspective: "1000px",
      }}
    >
      {/* 3D flip container */}
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{
          duration: animationDuration,
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
      >
        {/* Front face */}
        <motion.div
          className="absolute w-full h-full border border-terminal-border rounded-lg p-4 bg-terminal-bg/50 transition-all duration-300 group flex flex-col items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            transformStyle: "preserve-3d",
          }}
          whileHover={{
            borderColor: "rgba(0, 255, 65, 0.5)",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            boxShadow: "0 0 10px rgba(0, 255, 65, 0.3), 0 0 20px rgba(0, 255, 65, 0.1)",
          }}
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

          {/* Click hint */}
          <div className="absolute bottom-2 text-xs text-terminal-dim font-mono">
            Click to flip
          </div>
        </motion.div>

        {/* Back face */}
        <motion.div
          className="absolute w-full h-full border border-terminal-border rounded-lg p-4 bg-terminal-bg/50 overflow-y-auto flex flex-col"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            transformStyle: "preserve-3d",
          }}
          whileHover={{
            borderColor: "rgba(0, 255, 65, 0.5)",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            boxShadow: "0 0 10px rgba(0, 255, 65, 0.3), 0 0 20px rgba(0, 255, 65, 0.1)",
          }}
        >
          <h4 className="text-gray-200 font-mono text-xs font-semibold mb-3 uppercase tracking-wide">
            Projects & Experience
          </h4>

          {skill.projects && skill.projects.length > 0 ? (
            <ul className="space-y-2 flex-1">
              {skill.projects.map((project, idx) => (
                <li key={idx} className="text-gray-300 text-xs font-mono flex items-start gap-2">
                  <span className="text-terminal-glow flex-shrink-0 mt-0.5">▸</span>
                  <span>{project}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-xs font-mono">No projects listed</p>
          )}

          {/* Proficiency note */}
          <div className="mt-auto pt-3 border-t border-terminal-border/50">
            <p className="text-gray-400 text-xs font-mono">
              {levelInfo.description}
            </p>
          </div>

          {/* Click hint */}
          <div className="text-center text-xs text-terminal-dim font-mono mt-2">
            Click to flip back
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
