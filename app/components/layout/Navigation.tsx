"use client";

import { useState } from "react";
import { useSmoothScroll } from "@/app/hooks/useSmoothScroll";

const NAV_ITEMS = [
  { label: "~/about", id: "about" },
  { label: "~/cp-stats", id: "cp-stats" },
  { label: "~/experience", id: "experience" },
  { label: "~/stack", id: "tech-stack" },
  { label: "~/contact", id: "contact" },
] as const;

export default function Navigation() {
  const { scrollTo } = useSmoothScroll();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleClick = (id: string) => {
    scrollTo(id);
    setMobileOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-terminal-bg/95 backdrop-blur-sm border-b border-terminal-border"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border border-terminal-glow rounded flex items-center justify-center">
              <span className="text-terminal-glow text-lg font-bold">&gt;</span>
            </div>
            <span className="font-mono text-sm sm:text-base">
              <span className="text-terminal-glow">terminal</span>{" "}
              <span className="text-gray-400">PORTFOLIO</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleClick(item.id)}
                  className="px-4 py-2 text-sm font-mono text-gray-300 hover:text-terminal-glow transition-all duration-200 rounded"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* HIRE_ME Button */}
          <div className="hidden md:block">
            <button
              onClick={() => handleClick("contact")}
              className="px-5 py-2 bg-terminal-glow text-black font-mono font-bold text-sm rounded hover:bg-terminal-glow/80 transition-all"
            >
              HIRE_ME
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden text-terminal-text text-sm min-w-[44px] min-h-[44px] flex items-center justify-center border border-terminal-border rounded hover:border-terminal-glow transition-colors"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? "[x]" : "[=]"}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4">
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleClick(item.id)}
                    className="w-full text-left px-4 py-3 min-h-[44px] text-sm font-mono text-gray-300 hover:text-terminal-glow transition-all duration-200"
                  >
                    <span className="text-terminal-glow mr-2">&gt;</span>
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="mt-2">
                <button
                  onClick={() => handleClick("contact")}
                  className="w-full px-4 py-3 bg-terminal-glow text-black font-mono font-bold text-sm rounded hover:bg-terminal-glow/80 transition-all"
                >
                  HIRE_ME
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
