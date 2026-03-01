"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSmoothScroll } from "@/app/hooks/useSmoothScroll";

const SECTIONS = [
  { name: "about", id: "about" },
  { name: "cp-stats", id: "cp-stats" },
  { name: "experience", id: "experience" },
  { name: "stack", id: "tech-stack" },
  { name: "contact", id: "contact" },
] as const;

export default function Navigation() {
  const { scrollTo } = useSmoothScroll();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const query = input.startsWith("cd ") ? input.slice(3) : "";
  const hasPrefix = input.startsWith("cd ");

  const suggestions = hasPrefix
    ? SECTIONS.filter((s) => s.name.startsWith(query))
    : [];

  const navigateToSection = useCallback(
    (sectionName: string) => {
      const section = SECTIONS.find((s) => s.name === sectionName);
      if (section) {
        scrollTo(section.id);
        setInput("");
        setShowSuggestions(false);
        setSelectedIndex(-1);
        setMobileOpen(false);
        inputRef.current?.blur();
      }
    },
    [scrollTo]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    // Show suggestions as soon as user types "cd " (length >= 3)
    setShowSuggestions(val.startsWith("cd "));
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Tab" && suggestions.length > 0) {
      e.preventDefault();
      const idx = selectedIndex >= 0 ? selectedIndex : 0;
      setInput("cd " + suggestions[idx].name);
      setShowSuggestions(false);
      setSelectedIndex(-1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        navigateToSection(suggestions[selectedIndex].name);
      } else {
        // Try exact match on the query
        const exactMatch = SECTIONS.find((s) => s.name === query);
        if (exactMatch) {
          navigateToSection(exactMatch.name);
        } else if (suggestions.length === 1) {
          navigateToSection(suggestions[0].name);
        }
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setSelectedIndex(-1);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (sectionName: string) => {
    setInput("cd " + sectionName);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const commandInput = (
    <div className="relative w-full max-w-xs sm:max-w-sm">
      <div className="flex items-center font-mono text-sm">
        <span className="text-terminal-glow mr-1 shrink-0">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (hasPrefix && query.length > 0) setShowSuggestions(true);
          }}
          placeholder={`cd sections/`}
          className="w-full bg-transparent border-b border-terminal-glow/40 focus:border-terminal-glow text-terminal-glow placeholder-terminal-dim font-mono text-sm py-1 px-1 outline-none transition-colors"
          aria-label="Terminal navigation command"
          aria-autocomplete="list"
          aria-controls={showSuggestions ? "nav-suggestions" : undefined}
          aria-activedescendant={
            selectedIndex >= 0 ? `suggestion-${selectedIndex}` : undefined
          }
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          id="nav-suggestions"
          ref={suggestionsRef}
          role="listbox"
          className="absolute left-0 right-0 top-full mt-1 bg-terminal-bg border border-terminal-glow/30 rounded z-50 shadow-terminal-glow overflow-hidden"
        >
          {suggestions.map((section, idx) => (
            <button
              key={section.name}
              id={`suggestion-${idx}`}
              role="option"
              aria-selected={idx === selectedIndex}
              onClick={() => handleSuggestionClick(section.name)}
              className={`w-full text-left px-3 py-2 font-mono text-sm transition-colors ${
                idx === selectedIndex
                  ? "bg-terminal-glow/20 text-terminal-glow"
                  : "text-terminal-glow/70 hover:bg-terminal-glow/10 hover:text-terminal-glow"
              }`}
            >
              <span className="text-terminal-dim">sections/</span>
              {section.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-terminal-bg/95 backdrop-blur-sm border-b border-terminal-border"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 border border-terminal-glow rounded flex items-center justify-center">
              <span className="text-terminal-glow text-lg font-bold">&gt;</span>
            </div>
            <span className="font-mono text-sm sm:text-base hidden sm:inline">
              <span className="text-terminal-glow">terminal</span>{" "}
              <span className="text-gray-400">PORTFOLIO</span>
            </span>
          </div>

          {/* Desktop Command Input */}
          <div className="hidden md:flex items-center flex-1 justify-center">
            {commandInput}
          </div>

          {/* HIRE_ME Button */}
          <div className="hidden md:block shrink-0">
            <button
              onClick={() => {
                scrollTo("contact");
              }}
              className="px-5 py-2 bg-terminal-glow text-black font-mono font-bold text-sm rounded hover:bg-terminal-glow/80 transition-all"
            >
              HIRE_ME
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden text-terminal-text text-sm min-w-[44px] min-h-[44px] flex items-center justify-center border border-terminal-border rounded hover:border-terminal-glow transition-colors"
            aria-label={
              mobileOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? "[x]" : "[=]"}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4">
            <div className="mb-3">{commandInput}</div>
            <ul className="flex flex-col gap-1">
              {SECTIONS.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => {
                      scrollTo(section.id);
                      setMobileOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 min-h-[44px] text-sm font-mono text-gray-300 hover:text-terminal-glow transition-all duration-200"
                  >
                    <span className="text-terminal-glow mr-2">&gt;</span>
                    ~/
                    {section.name}
                  </button>
                </li>
              ))}
              <li className="mt-2">
                <button
                  onClick={() => {
                    scrollTo("contact");
                    setMobileOpen(false);
                  }}
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
