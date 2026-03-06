"use client";

import { motion } from "framer-motion";
import useScrollAnimation from "@/app/hooks/useScrollAnimation";
import { headingFadeInUp } from "@/app/utils/animation-variants";

interface SectionProps {
  id: string;
  title?: string;
  children: React.ReactNode;
}

export default function Section({ id, title, children }: SectionProps) {
  const { ref, inView } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id={id}
      ref={ref}
      className="px-4 py-12 sm:px-6 md:px-8 lg:py-16 scroll-mt-28"
      aria-labelledby={title ? `${id}-heading` : undefined}
    >
      {title && (
        <motion.h2
          id={`${id}-heading`}
          className="glow-text text-xl sm:text-2xl mb-6 border-b border-terminal-border pb-2"
          variants={headingFadeInUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <span className="text-terminal-glow">&gt;</span> {title}
        </motion.h2>
      )}
      {children}
    </section>
  );
}
