"use client";

import { useState, useEffect, useRef, useCallback, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/app/data/portfolio-data";
import { useSmoothScroll } from "@/app/hooks/useSmoothScroll";
import useParallax from "@/app/hooks/useParallax";
import MatrixRain from "@/app/components/effects/MatrixRain";
import ChromaticText from "@/app/components/effects/ChromaticText";
import ParticleSystem from "@/app/components/effects/ParticleSystem";

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

const COWSAY_ART = ` ________________________
< Hello from the shell! >
 ------------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;

interface TerminalOutput {
  command: string;
  result: string;
}

function TerminalPrompt({ scrollTo }: { scrollTo: (id: string) => void }) {
  const { hero } = portfolioData;
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<TerminalOutput[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const PROMPT = "user@portfolio:~$ ";

  const commands: Record<string, (args?: string) => string> = {
    help: () =>
      [
        "Available commands:",
        "  help       - Show this help message",
        "  whoami     - Display name and role",
        "  skills     - Jump to tech stack section",
        "  contact    - Jump to contact section",
        "  ls         - List section directories",
        "  cat <file> - Read a file (try: cat about.txt)",
        "  clear      - Clear terminal output",
        "  cowsay     - A friendly cow",
      ].join("\n"),
    whoami: () => `${hero.name} - ${hero.role}`,
    skills: () => {
      scrollTo("tech-stack");
      return "Scrolling to tech-stack/...";
    },
    contact: () => {
      scrollTo("contact");
      return "Scrolling to contact/...";
    },
    ls: () => "about/  cp-stats/  experience/  stack/  contact/",
    clear: () => "__CLEAR__",
    cowsay: () => COWSAY_ART,
  };

  const executeCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim();
      if (!trimmed) return;

      setHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);

      if (trimmed === "clear") {
        setOutput([]);
        return;
      }

      // Handle "cat" with arguments
      if (trimmed.startsWith("cat ")) {
        const file = trimmed.slice(4).trim();
        if (file === "about.txt") {
          setOutput((prev) => [
            ...prev,
            { command: trimmed, result: portfolioData.hero.tagline },
          ]);
          return;
        }
        setOutput((prev) => [
          ...prev,
          { command: trimmed, result: `cat: ${file}: No such file or directory` },
        ]);
        return;
      }

      const handler = commands[trimmed];
      if (handler) {
        const result = handler();
        setOutput((prev) => [...prev, { command: trimmed, result }]);
      } else {
        setOutput((prev) => [
          ...prev,
          {
            command: trimmed,
            result: `command not found: ${trimmed}. Type 'help' for available commands.`,
          },
        ]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scrollTo]
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const newIndex =
        historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(history[newIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    }
  };

  // Auto-scroll terminal output to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [output]);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      ref={containerRef}
      className="mt-4 max-h-48 overflow-y-auto font-mono text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Previous command outputs */}
      {output.map((entry, i) => (
        <div key={i} className="mb-1">
          <div>
            <span className="text-terminal-glow">{PROMPT}</span>
            <span className="text-gray-300">{entry.command}</span>
          </div>
          <div className="text-gray-400 whitespace-pre-wrap">{entry.result}</div>
        </div>
      ))}

      {/* Active input line */}
      <div className="flex items-center">
        <span className="text-terminal-glow shrink-0">{PROMPT}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setHistoryIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-gray-300 font-mono text-sm caret-terminal-glow"
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </div>
  );
}

export default function Hero() {
  const { hero } = portfolioData;
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [bootComplete, setBootComplete] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const { scrollTo } = useSmoothScroll();

  // Parallax layers
  const backgroundParallax = useParallax(0.3); // Matrix rain - 0.3x speed, no blur (blur causes lag)
  const midgroundParallax = useParallax(0.6); // Floating terminals - 0.6x speed, no blur
  const foregroundParallax = useParallax(1); // Main content - 1x speed, no blur

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

  // Glitch effect: trigger every 3 seconds for 200ms
  useEffect(() => {
    if (!bootComplete) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleGlitch = () => {
      const delay = 3000; // 3 seconds
      timeoutId = setTimeout(() => {
        setIsGlitching(true);
        setTimeout(() => {
          setIsGlitching(false);
          scheduleGlitch();
        }, 200);
      }, delay);
    };

    scheduleGlitch();

    return () => clearTimeout(timeoutId);
  }, [bootComplete]);

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Particle system */}
      <ParticleSystem />

      {/* Matrix rain background - Layer 1 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: backgroundParallax.transform,
          filter: backgroundParallax.filter,
          pointerEvents: "none",
        }}
      >
        <MatrixRain />
      </div>

      {/* Floating terminal windows background - Layer 2 */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          transform: midgroundParallax.transform,
          filter: midgroundParallax.filter,
        }}
      >
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

      {/* Main content - Layer 3 */}
      <div
        className="relative z-10 max-w-4xl w-full"
        style={{
          transform: foregroundParallax.transform,
          filter: foregroundParallax.filter,
        }}
      >
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
              >
                <TerminalPrompt scrollTo={scrollTo} />
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
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-mono mb-4 text-terminal-glow hero-name-glitch${isGlitching ? " glitching" : ""}`}
              data-text={hero.name.toUpperCase()}
              style={{
                textShadow: "0 0 10px rgba(0, 255, 0, 0.3)",
              }}
            >
              <ChromaticText>{hero.name.toUpperCase()}</ChromaticText>
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
