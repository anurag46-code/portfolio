"use client";

import { motion } from "framer-motion";
import Section from "@/app/components/layout/Section";
import TimelineItem from "@/app/components/ui/TimelineItem";
import { portfolioData } from "@/app/data/portfolio-data";
import useScrollAnimation from "@/app/hooks/useScrollAnimation";
import { staggerContainer } from "@/app/utils/animation-variants";

export default function Experience() {
  const { experience } = portfolioData;
  const { ref, inView } = useScrollAnimation();

  if (experience.length === 0) return null;

  return (
    <Section id="experience" title="experience">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {experience.map((exp, index) => (
          <TimelineItem
            key={`${exp.company}-${index}`}
            company={exp.company}
            role={exp.role}
            duration={exp.duration}
            description={exp.description}
            technologies={exp.technologies}
            location={exp.location}
            employmentType={exp.employmentType}
          />
        ))}
      </motion.div>
    </Section>
  );
}
