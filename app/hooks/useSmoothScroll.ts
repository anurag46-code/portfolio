"use client";

import { useCallback } from "react";

export function useSmoothScroll() {
  const scrollTo = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return { scrollTo };
}
