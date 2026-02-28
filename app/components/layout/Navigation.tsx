"use client";

import { useState } from "react";
import { useSmoothScroll } from "@/app/hooks/useSmoothScroll";

const NAV_ITEMS = [
  { label: "About", id: "about" },
  { label: "CP Stats", id: "cp-stats" },
  { label: "Experience", id: "experience" },
  { label: "Tech Stack", id: "tech-stack" },
  { label: "Contact", id: "contact" },
] as const;

export default function Navigation() {
  const { scrollTo } = useSmoothScroll();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleClick = (id: string) => {
    scrollTo(id);
    setMobileOpen(false);
  };

  return (
    <nav className="border-b border-terminal-border px-4 py-2 sm:px-6" role="navigation" aria-label="Main navigation">
      {/* Desktop nav */}
      <ul className="hidden sm:flex items-center gap-1">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => handleClick(item.id)}
              className="px-3 py-2 text-sm text-terminal-text hover:text-terminal-glow hover:shadow-text-glow transition-all duration-200 rounded"
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Mobile toggle */}
      <div className="sm:hidden flex items-center justify-between">
        <span className="text-terminal-dim text-xs">nav://</span>
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="text-terminal-text text-sm min-w-[44px] min-h-[44px] flex items-center justify-center border border-terminal-border rounded hover:border-terminal-glow transition-colors"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? "[x]" : "[=]"}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <ul className="sm:hidden flex flex-col gap-1 pt-2 pb-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                className="w-full text-left px-3 py-3 min-h-[44px] text-sm text-terminal-text hover:text-terminal-glow hover:shadow-text-glow transition-all duration-200"
              >
                <span className="text-terminal-glow mr-1">&gt;</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
