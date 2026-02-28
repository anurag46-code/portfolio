"use client";

import { motion } from "framer-motion";
import Section from "@/app/components/layout/Section";
import { portfolioData } from "@/app/data/portfolio-data";
import useScrollAnimation from "@/app/hooks/useScrollAnimation";
import { staggerContainer, staggerItem } from "@/app/utils/animation-variants";

export default function DSA() {
  const { dsaSkills } = portfolioData;
  const { ref, inView } = useScrollAnimation();

  if (dsaSkills.length === 0) return null;

  return (
    <Section id="dsa" title="dsa-skills">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="space-y-6"
      >
        {dsaSkills.map((category) => (
          <motion.div key={category.category} variants={staggerItem}>
            <h3 className="text-terminal-glow text-sm sm:text-base font-mono mb-3 glow-text">
              <span className="text-gray-400">$</span> {category.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-2 border border-terminal-border rounded text-xs sm:text-sm font-mono text-gray-300 bg-terminal-bg/50 transition-all duration-200 hover:border-terminal-glow/60 hover:shadow-text-glow hover:text-terminal-glow cursor-default select-none"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
