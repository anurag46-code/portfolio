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
      </motion.div>
    </Section>
  );
}
