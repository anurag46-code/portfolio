"use client";

import { useMemo } from "react";
import { useSmoothScroll } from "@/app/hooks/useSmoothScroll";
import { useScrollSpy } from "@/app/hooks/useScrollSpy";

const SECTIONS = [
  { id: "about", label: "about" },
  { id: "cp-stats", label: "cp-stats" },
  { id: "dsa", label: "dsa" },
  { id: "projects", label: "projects" },
  { id: "experience", label: "experience" },
  { id: "tech-stack", label: "stack" },
  { id: "contact", label: "contact" },
] as const;

export default function ScrollSpy() {
  const sections = useMemo(() => [...SECTIONS], []);
  const activeId = useScrollSpy(sections);
  const { scrollTo } = useSmoothScroll();

  return (
    <div
      className="sticky top-16 z-40 bg-terminal-bg/95 backdrop-blur-sm border-b border-terminal-border"
      role="tablist"
      aria-label="Section navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {SECTIONS.map((section) => {
            const isActive = activeId === section.id;
            return (
              <button
                key={section.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={section.id}
                onClick={() => scrollTo(section.id)}
                className={`relative shrink-0 px-3 py-1.5 font-mono text-xs sm:text-sm transition-all duration-200 rounded ${
                  isActive
                    ? "text-terminal-glow bg-terminal-glow/10"
                    : "text-gray-500 hover:text-terminal-glow/70 hover:bg-terminal-glow/5"
                }`}
              >
                <span className="relative z-10">
                  {isActive && (
                    <span className="text-terminal-glow mr-1" aria-hidden="true">
                      &gt;
                    </span>
                  )}
                  {section.label}
                </span>
                {/* Active indicator bar */}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-1 right-1 h-0.5 bg-terminal-glow rounded-full shadow-text-glow"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
