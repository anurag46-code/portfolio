"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Tilt {
  x: number;
  y: number;
}

/**
 * Tracks mouse position relative to an element's center and maps it
 * to rotateX / rotateY values for a 3D tilt effect.
 *
 * Desktop only -- disabled on touch devices.
 *
 * @param ref  React ref attached to the card element
 * @param maxDeg  Maximum tilt in degrees (default 15)
 */
export default function use3DTilt(
  ref: React.RefObject<HTMLElement | null>,
  maxDeg: number = 15
): Tilt {
  const [tilt, setTilt] = useState<Tilt>({ x: 0, y: 0 });
  const isTouchDevice = useRef(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el || isTouchDevice.current) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // -1 to 1 range from center
      const relX = (e.clientX - centerX) / (rect.width / 2);
      const relY = (e.clientY - centerY) / (rect.height / 2);

      // rotateY follows horizontal mouse, rotateX follows vertical (inverted)
      setTilt({
        x: -(relY * maxDeg),
        y: relX * maxDeg,
      });
    },
    [ref, maxDeg]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    isTouchDevice.current =
      typeof window !== "undefined" &&
      (("ontouchstart" in window) || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || isTouchDevice.current) return;

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, handleMouseMove, handleMouseLeave]);

  return tilt;
}
