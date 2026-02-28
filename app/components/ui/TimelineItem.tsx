"use client";

import { motion } from "framer-motion";
import { staggerItem } from "@/app/utils/animation-variants";

interface TimelineItemProps {
  company: string;
  role: string;
  duration: string;
  description: string[];
  technologies: string[];
  location?: string;
  employmentType?: string; // "Full-time" | "Internship" | "Contract"
}

export default function TimelineItem({
  company,
  role,
  duration,
  description,
  technologies,
  location = "Remote",
  employmentType = "Full-time",
}: TimelineItemProps) {
  return (
    <motion.div variants={staggerItem} className="mb-6">
      {/* Terminal window container */}
      <div className="border border-terminal-border rounded-lg bg-terminal-bg/50 overflow-hidden shadow-terminal-glow">
        {/* Terminal header with macOS dots */}
        <div className="bg-terminal-bg/80 border-b border-terminal-border px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* macOS window control dots */}
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <span className="text-cyan-400 font-mono text-sm sm:text-base font-semibold ml-2">
              {company}
            </span>
          </div>

          {/* Employment type and duration */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2 py-1 border border-terminal-border rounded bg-terminal-bg/50 text-gray-300">
              {employmentType}
            </span>
            <span className="text-gray-400 text-xs sm:text-sm font-mono hidden sm:block">
              {duration}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Job title and tech stack */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-3">
            <div className="flex-1">
              <h3 className="text-terminal-glow text-lg sm:text-xl font-mono font-bold mb-2">
                {role}
              </h3>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm font-mono">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{location}</span>
              </div>

              {/* Duration on mobile */}
              <div className="text-gray-500 text-xs font-mono mt-1 sm:hidden">
                {duration}
              </div>
            </div>

            {/* Tech stack badges */}
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-3 py-1.5 border border-terminal-border rounded-md text-gray-300 bg-terminal-bg/80 hover:border-terminal-glow/50 hover:text-terminal-glow transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Achievements/Description with green arrows */}
          <ul className="space-y-2 mt-4">
            {description.map((item, i) => (
              <li key={i} className="text-xs sm:text-sm font-mono flex leading-relaxed">
                <span className="text-terminal-glow mr-3 shrink-0 mt-0.5">►</span>
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
