"use client";

import { motion } from "framer-motion";
import Section from "@/app/components/layout/Section";
import StatCard from "@/app/components/ui/StatCard";
import { portfolioData } from "@/app/data/portfolio-data";
import useScrollAnimation from "@/app/hooks/useScrollAnimation";
import { staggerContainer, staggerItem } from "@/app/utils/animation-variants";

export default function CPStats() {
  const { cpStats } = portfolioData;
  const { ref, inView } = useScrollAnimation();

  if (cpStats.length === 0) return null;

  return (
    <Section id="cp-stats" title="cp-stats">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {cpStats.map((stat) => (
          <motion.div key={stat.platform} variants={staggerItem}>
            <StatCard
              platform={stat.platform}
              rating={stat.rating}
              solved={stat.solved}
              rank={stat.rank}
            />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
