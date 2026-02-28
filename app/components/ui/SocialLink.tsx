"use client";

import { useState } from "react";

interface SocialLinkProps {
  href: string;
  iconSrc: string;
  label: string;
  external?: boolean;
}

export default function SocialLink({ href, iconSrc, label, external = true }: SocialLinkProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-2 px-4 py-2 border border-terminal-border rounded text-sm font-mono text-terminal-text bg-terminal-bg/50 hover:border-terminal-glow/60 hover:shadow-text-glow hover:text-terminal-glow transition-all duration-200"
    >
      {!imageError && (
        <img
          src={iconSrc}
          alt={label}
          className="w-5 h-5 flex-shrink-0"
          loading="lazy"
          onError={() => setImageError(true)}
        />
      )}
      <span>{label}</span>
    </a>
  );
}
