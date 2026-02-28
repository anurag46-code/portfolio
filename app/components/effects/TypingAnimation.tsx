"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypingAnimationProps {
  text: string;
  speed?: number;
  showCursor?: boolean;
  className?: string;
  onComplete?: () => void;
}

export default function TypingAnimation({
  text,
  speed = 60,
  showCursor = true,
  className = "",
  onComplete,
}: TypingAnimationProps) {
  const [displayedCount, setDisplayedCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayedCount < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedCount((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [displayedCount, text.length, speed, isComplete, onComplete]);

  // Reset when text changes
  useEffect(() => {
    setDisplayedCount(0);
    setIsComplete(false);
  }, [text]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      {text.slice(0, displayedCount)}
      {showCursor && (
        <span
          className="inline-block w-[0.6em] h-[1.1em] bg-terminal-text align-middle animate-cursor-blink ml-[1px]"
          aria-hidden="true"
        />
      )}
    </motion.span>
  );
}
