"use client";

import { motion } from "framer-motion";
import Section from "@/app/components/layout/Section";
import TechCard from "@/app/components/ui/TechCard";
import { techSkills, skillLevels } from "@/app/data/tech-stack-data";
import useScrollAnimation from "@/app/hooks/useScrollAnimation";
import { staggerContainer } from "@/app/utils/animation-variants";

export default function TechStack() {
  const { ref, inView } = useScrollAnimation();

  return (
    <Section id="tech-stack" title="tech-stack">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="space-y-8"
      >
        {/* Skill level legend */}
        <div className="flex flex-wrap gap-4 justify-center mb-8 pb-6 border-b border-terminal-border">
          {Object.entries(skillLevels).map(([key, level]) => (
            <div key={key} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: level.color }}
              />
              <span
                className="text-xs font-mono uppercase tracking-wide"
                style={{ color: level.color }}
              >
                {level.label}
              </span>
            </div>
          ))}
        </div>

        {/* Tech cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {techSkills.map((skill) => (
            <TechCard key={skill.name} skill={skill} />
          ))}
        </div>

        {/* GitHub Stats Section */}
        <div className="mt-12 pt-8 border-t border-terminal-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-amber-400 text-sm sm:text-base font-mono uppercase tracking-wider border border-amber-400/50 px-3 py-1 rounded">
              Open Source
            </div>
            <span className="text-gray-400 font-mono text-sm">
              github.com/anurag46-code
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-2xl">
            <div className="text-center p-4 border border-terminal-border rounded-lg bg-terminal-bg/50">
              <div className="text-2xl sm:text-3xl font-mono text-terminal-glow mb-1">
                40+
              </div>
              <div className="text-xs sm:text-sm text-gray-400 font-mono">
                Repositories
              </div>
            </div>
            <div className="text-center p-4 border border-terminal-border rounded-lg bg-terminal-bg/50">
              <div className="text-2xl sm:text-3xl font-mono text-terminal-glow mb-1">
                500+
              </div>
              <div className="text-xs sm:text-sm text-gray-400 font-mono">
                Stars
              </div>
            </div>
            <div className="text-center p-4 border border-terminal-border rounded-lg bg-terminal-bg/50">
              <div className="text-2xl sm:text-3xl font-mono text-terminal-glow mb-1">
                1k+
              </div>
              <div className="text-xs sm:text-sm text-gray-400 font-mono">
                Contributions
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
