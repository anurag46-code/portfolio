"use client";

import { useEffect } from "react";

interface TimeColor {
  start: number; // hour (0-23)
  end: number; // hour (0-23)
  color: string;
}

const TIME_COLORS: TimeColor[] = [
  { start: 6, end: 12, color: "#00FFAA" }, // morning, cooler
  { start: 12, end: 18, color: "#00FF00" }, // afternoon, standard
  { start: 18, end: 24, color: "#88FF00" }, // evening, warmer
  { start: 0, end: 6, color: "#00AA00" }, // night, dimmer
];

function getColorForHour(hour: number): string {
  for (const tc of TIME_COLORS) {
    if (hour >= tc.start && hour < tc.end) {
      return tc.color;
    }
  }
  return "#00FF00"; // fallback
}

function applyColorTemperature(): void {
  const hour = new Date().getHours();
  const color = getColorForHour(hour);
  document.documentElement.style.setProperty("--terminal-glow", color);
}

export function useColorTemperature(): void {
  useEffect(() => {
    applyColorTemperature();

    const interval = setInterval(applyColorTemperature, 60_000);
    return () => clearInterval(interval);
  }, []);
}
