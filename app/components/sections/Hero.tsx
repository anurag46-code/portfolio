"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/app/data/portfolio-data";
import { useSmoothScroll } from "@/app/hooks/useSmoothScroll";

const bootSequence = [
  "BIOS v2.6.0 - Initializing hardware...",
  "Memory check: 16384 MB OK",
  "Loading kernel modules...",
  "[OK] Developer environment ready",
  "[OK] Competitive programming engine loaded",
  "[OK] DSA library v4.2.1 mounted",
  "",
  "Welcome to TerminalPortfolio. Type help for commands.",
];

const skillBadges = ["C++", "ALGORITHMS", "DATA STRUCTURES", "FULL STACK", "OPEN SOURCE"];

export default function Hero() {
  const { hero } = portfolioData;
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [bootComplete, setBootComplete] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    let currentLine = 0;
    let isMounted = true;

    const interval = setInterval(() => {
      if (!isMounted) {
        clearInterval(interval);
        return;
      }

      if (currentLine < bootSequence.length) {
        setBootLines((prev) => [...prev, bootSequence[currentLine]]);
        currentLine++;
      } else {
        setBootComplete(true);
        clearInterval(interval);
      }
    }, 300);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Floating terminal windows background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <motion.div
          className="absolute top-20 left-10 w-64 h-48 border border-terminal-glow rounded-lg shadow-terminal-glow"
          animate={{
            y: [0, -20, 0],
            rotate: [-5, -8, -5],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-20 w-72 h-40 border border-terminal-glow rounded-lg shadow-terminal-glow"
          animate={{
            y: [0, 15, 0],
            rotate: [3, 6, 3],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-56 h-36 border border-terminal-glow rounded-lg shadow-terminal-glow"
          animate={{
            y: [0, -10, 0],
            rotate: [2, -2, 2],
          }}
          transition={{ duration: 7, repeat: Infinity }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl w-full">
        {/* Boot sequence terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 border border-terminal-border rounded-lg overflow-hidden shadow-terminal-glow"
        >
          {/* Terminal header */}
          <div className="bg-terminal-bg/80 border-b border-terminal-border px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <span className="text-cyan-400 font-mono text-sm ml-2">boot --bash</span>
          </div>

          {/* Terminal content */}
          <div className="bg-terminal-bg/50 p-6 font-mono text-xs sm:text-sm">
            {bootLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`${
                  line && line.startsWith("[OK]")
                    ? "text-terminal-glow"
                    : line === ""
                    ? "h-4"
                    : "text-gray-400"
                }`}
              >
                {line}
              </motion.div>
            ))}
            {bootComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-terminal-glow"
              >
                <span className="animate-cursor-blink">▋</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Main hero content */}
        {bootComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            {/* WHOAMI prompt */}
            <div className="text-terminal-glow font-mono text-lg sm:text-xl mb-6">
              <span className="text-gray-400">$</span> WHOAMI
            </div>

            {/* Name - Large and glowing */}
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-mono mb-4 glow-text"
              style={{
                color: "#00FF00",
                textShadow: "0 0 20px rgba(0, 255, 0, 0.8), 0 0 40px rgba(0, 255, 0, 0.5)",
              }}
            >
              {hero.name.toUpperCase()}
            </motion.h1>

            {/* Role/Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-lg sm:text-xl md:text-2xl font-mono text-gray-300 mb-8"
            >
              <span className="text-terminal-glow">&gt;</span> {hero.role}
            </motion.p>

            {/* Skill badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap justify-center gap-3 mb-10"
            >
              {skillBadges.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 border border-terminal-border rounded-md font-mono text-xs sm:text-sm text-gray-300 bg-terminal-bg/50 hover:border-terminal-glow hover:text-terminal-glow transition-all"
                >
                  {skill}
                </span>
              ))}
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <button
                onClick={() => scrollTo("cp-stats")}
                className="group px-6 py-3 bg-terminal-glow text-black font-mono font-bold rounded-md hover:bg-terminal-glow/80 transition-all flex items-center gap-2 min-w-[180px] justify-center"
              >
                <span>▶</span> VIEW_STATS
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="px-6 py-3 border-2 border-terminal-glow text-terminal-glow font-mono font-bold rounded-md hover:bg-terminal-glow/10 transition-all flex items-center gap-2 min-w-[180px] justify-center"
              >
                <span>▶</span> GET_IN_TOUCH
              </button>
            </motion.div>

            {/* Scroll down indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="text-gray-400 font-mono text-sm"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ↓ scroll down
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
