"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Animates a number counting up from 0 to `end` over `duration` ms
 * using requestAnimationFrame for smooth 60fps animation.
 */
export default function useCountUp(
  end: number,
  duration: number = 1500,
  shouldStart: boolean = false
): number {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for a natural deceleration feel
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(eased * end);

      setCount(currentValue);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
  }, [end, duration]);

  useEffect(() => {
    if (shouldStart && !hasAnimated.current) {
      animate();
    }

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [shouldStart, animate]);

  return count;
}
