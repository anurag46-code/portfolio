"use client";

import { portfolioData } from "@/app/data/portfolio-data";
import SocialLink from "@/app/components/ui/SocialLink";
import { getSocialIcon } from "@/app/lib/icon-mappings";

export default function Footer() {
  const { contact, hero } = portfolioData;
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="px-4 py-12 sm:px-6 md:px-8 border-t border-terminal-border"
      role="contentinfo"
    >
      <div className="max-w-4xl mx-auto">
        {/* Terminal prompt header */}
        <div className="font-mono text-sm text-gray-400 mb-6">
          <span className="text-terminal-glow">$</span> cat footer.txt
        </div>

        {/* Resume download CTA */}
        <div className="mb-10 p-6 border border-terminal-border rounded-lg bg-terminal-bg/50">
          <p className="font-mono text-sm text-gray-400 mb-1">
            <span className="text-terminal-glow">#</span> Want the full picture?
          </p>
          <p className="font-mono text-base text-terminal-text mb-4">
            Download my resume for a detailed look at my experience and skills.
          </p>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-terminal-glow text-black font-mono font-bold text-sm rounded hover:bg-terminal-glow/80 transition-all"
          >
            <span>{">"}</span> ./download-resume.sh
          </a>
        </div>

        {/* Social links */}
        <div className="mb-10">
          <p className="font-mono text-sm text-gray-400 mb-4">
            <span className="text-terminal-glow">$</span> ls ~/social/
          </p>
          <div className="flex flex-wrap gap-4">
            <SocialLink
              href={contact.github}
              iconSrc={getSocialIcon("github")}
              label="GitHub"
            />
            <SocialLink
              href={contact.linkedin}
              iconSrc={getSocialIcon("linkedin")}
              label="LinkedIn"
            />
            <SocialLink
              href={`mailto:${contact.email}`}
              iconSrc={getSocialIcon("email")}
              label={contact.email}
              external={false}
            />
          </div>
        </div>

        {/* Divider and copyright */}
        <div className="border-t border-terminal-border pt-6">
          <div className="font-mono text-xs text-gray-500 space-y-1">
            <p>
              <span className="text-terminal-glow/50">$</span>{" "}
              {hero.name} &copy; {currentYear} &mdash; All rights reserved.
            </p>
            <p>
              <span className="text-terminal-glow/50">$</span>{" "}
              Built with Next.js &amp; Tailwind CSS. Deployed on Vercel.
            </p>
            <p className="text-gray-600 mt-2">
              <span className="text-terminal-glow animate-cursor-blink">_</span>{" "}
              EOF
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
