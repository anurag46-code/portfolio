"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TypingAnimation from "@/app/components/effects/TypingAnimation";
import Section from "@/app/components/layout/Section";
import { portfolioData } from "@/app/data/portfolio-data";
import useScrollAnimation from "@/app/hooks/useScrollAnimation";
import { fadeIn } from "@/app/utils/animation-variants";

export default function Hero() {
  const { hero } = portfolioData;
  const { ref, inView } = useScrollAnimation({ threshold: 0.2 });
  const [nameComplete, setNameComplete] = useState(false);
  const [roleComplete, setRoleComplete] = useState(false);

  return (
    <Section id="about">
      <motion.div
        ref={ref}
        variants={fadeIn}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="py-8 sm:py-12 md:py-16"
      >
        {/* Greeting prompt */}
        <p className="text-terminal-dim text-sm sm:text-base font-mono mb-4">
          <span className="text-terminal-glow">$</span> cat welcome.txt
        </p>

        {/* Name with typing animation */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-mono mb-3">
          <span className="text-terminal-glow">&gt;</span>{" "}
          <TypingAnimation
            text={hero.name}
            speed={80}
            showCursor={!nameComplete}
            className="glow-text text-terminal-text"
            onComplete={() => setNameComplete(true)}
          />
        </h1>

        {/* Role */}
        {nameComplete && (
          <h2 className="text-lg sm:text-xl md:text-2xl font-mono mb-4">
            <span className="text-terminal-dim">$</span>{" "}
            <TypingAnimation
              text={hero.role}
              speed={50}
              showCursor={!roleComplete}
              className="text-terminal-glow"
              onComplete={() => setRoleComplete(true)}
            />
          </h2>
        )}

        {/* Tagline */}
        {roleComplete && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-terminal-dim text-sm sm:text-base font-mono max-w-xl"
          >
            <span className="text-terminal-glow mr-1">#</span>
            {hero.tagline}
          </motion.p>
        )}
      </motion.div>
    </Section>
  );
}
