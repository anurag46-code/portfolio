"use client";

import { useState, useEffect, useRef } from "react";

interface ScrollSpySection {
  id: string;
  label: string;
}

export function useScrollSpy(sections: ScrollSpySection[]) {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Track which sections are currently visible and their intersection ratios
    const visibleSections = new Map<string, number>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });

        // Pick the section with highest intersection ratio
        if (visibleSections.size > 0) {
          let bestId = "";
          let bestRatio = 0;
          visibleSections.forEach((ratio, id) => {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              bestId = id;
            }
          });
          if (bestId) setActiveId(bestId);
        }
      },
      {
        // Offset for the fixed nav (top ~64px) and scroll spy bar (~48px)
        rootMargin: "-112px 0px -30% 0px",
        threshold: [0, 0.1, 0.2, 0.3, 0.5, 0.7, 1],
      }
    );

    const elements: Element[] = [];
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        observerRef.current!.observe(el);
        elements.push(el);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [sections]);

  return activeId;
}
