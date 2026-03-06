"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { staggerItem } from "@/app/utils/animation-variants";
import type { Project } from "@/app/data/portfolio-data";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const animationDuration = prefersReducedMotion ? 0 : 0.6;

  return (
    <motion.div
      variants={staggerItem}
      onClick={handleFlip}
      className="relative w-full h-72 cursor-pointer"
      style={{ perspective: "1000px" }}
    >
      {/* 3D flip container */}
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: animationDuration,
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
      >
        {/* Front face */}
        <motion.div
          className="absolute w-full h-full border border-terminal-border rounded-lg p-5 bg-terminal-bg/50 flex flex-col group"
          style={{
            backfaceVisibility: "hidden",
            transformStyle: "preserve-3d",
          }}
          whileHover={{
            borderColor: "rgba(0, 255, 65, 0.5)",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            boxShadow:
              "0 0 10px rgba(0, 255, 65, 0.3), 0 0 20px rgba(0, 255, 65, 0.1)",
          }}
        >
          {/* Terminal title bar */}
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-terminal-border/50">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            <span className="ml-2 text-xs font-mono text-terminal-dim truncate">
              ~/projects/{project.title.toLowerCase().replace(/\s+/g, "-")}
            </span>
          </div>

          {/* Project title */}
          <h3 className="text-terminal-glow font-mono text-sm font-semibold mb-2">
            <span className="text-terminal-dim">$ </span>
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-xs font-mono leading-relaxed mb-auto line-clamp-3">
            {project.description}
          </p>

          {/* Tech stack badges */}
          <div className="flex flex-wrap gap-1.5 mt-3 mb-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] font-mono border border-terminal-border rounded text-terminal-glow/80 bg-terminal-bg/80"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links row */}
          <div className="flex items-center gap-3 mt-1">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs font-mono text-gray-400 hover:text-terminal-glow transition-colors"
                aria-label={`GitHub repository for ${project.title}`}
              >
                [github]
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs font-mono text-gray-400 hover:text-terminal-glow transition-colors"
                aria-label={`Live demo for ${project.title}`}
              >
                [live]
              </a>
            )}
          </div>

          {/* Click hint */}
          <div className="absolute bottom-2 right-3 text-[10px] text-terminal-dim font-mono">
            click to flip
          </div>
        </motion.div>

        {/* Back face */}
        <motion.div
          className="absolute w-full h-full border border-terminal-border rounded-lg p-5 bg-terminal-bg/50 flex flex-col overflow-y-auto"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            transformStyle: "preserve-3d",
          }}
          whileHover={{
            borderColor: "rgba(0, 255, 65, 0.5)",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            boxShadow:
              "0 0 10px rgba(0, 255, 65, 0.3), 0 0 20px rgba(0, 255, 65, 0.1)",
          }}
        >
          {/* Header */}
          <h4 className="text-terminal-glow font-mono text-xs font-semibold mb-3 uppercase tracking-wide">
            <span className="text-terminal-dim">$ cat </span>
            highlights.md
          </h4>

          {/* Highlights list */}
          {project.highlights && project.highlights.length > 0 ? (
            <ul className="space-y-2.5 flex-1">
              {project.highlights.map((highlight, idx) => (
                <li
                  key={idx}
                  className="text-gray-300 text-xs font-mono flex items-start gap-2"
                >
                  <span className="text-terminal-glow flex-shrink-0 mt-0.5">
                    &gt;
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-xs font-mono flex-1">
              No highlights listed
            </p>
          )}

          {/* Tech stack on back too */}
          <div className="mt-auto pt-3 border-t border-terminal-border/50">
            <p className="text-terminal-dim text-[10px] font-mono mb-1.5">
              STACK:
            </p>
            <p className="text-gray-400 text-xs font-mono">
              {project.techStack.join(" / ")}
            </p>
          </div>

          {/* Click hint */}
          <div className="absolute bottom-2 right-3 text-[10px] text-terminal-dim font-mono">
            click to flip back
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
