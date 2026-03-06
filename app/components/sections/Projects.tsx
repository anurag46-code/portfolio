"use client";

import { motion } from "framer-motion";
import Section from "@/app/components/layout/Section";
import ProjectCard from "@/app/components/ui/ProjectCard";
import { portfolioData } from "@/app/data/portfolio-data";
import useScrollAnimation from "@/app/hooks/useScrollAnimation";
import { staggerContainer } from "@/app/utils/animation-variants";

export default function Projects() {
  const { projects } = portfolioData;
  const { ref, inView } = useScrollAnimation();

  if (projects.length === 0) return null;

  return (
    <Section id="projects" title="projects">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </motion.div>
    </Section>
  );
}
