"use client";

import { getTechIcon, getCpPlatformIcon, getSocialIcon } from "@/app/lib/icon-mappings";

export default function IconDebug() {
  const testTechs = ["AWS", "boto3", "React.js", "Docker"];
  const testPlatforms = ["LeetCode", "Codeforces", "CodeChef"];

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 border border-terminal-glow p-4 rounded max-w-md max-h-96 overflow-auto text-xs font-mono z-50">
      <h3 className="text-terminal-glow mb-2">Icon URL Debug</h3>

      <div className="space-y-2 text-terminal-text">
        <div>
          <p className="text-terminal-dim">Tech Icons:</p>
          {testTechs.map(tech => (
            <div key={tech} className="flex items-center gap-2 ml-2">
              <span>{tech}:</span>
              <img src={getTechIcon(tech)} alt={tech} className="w-4 h-4" />
              <span className="text-terminal-dim text-[10px] truncate">{getTechIcon(tech)}</span>
            </div>
          ))}
        </div>

        <div>
          <p className="text-terminal-dim">Platform Icons:</p>
          {testPlatforms.map(platform => (
            <div key={platform} className="flex items-center gap-2 ml-2">
              <span>{platform}:</span>
              <img src={getCpPlatformIcon(platform)} alt={platform} className="w-4 h-4" />
              <span className="text-terminal-dim text-[10px] truncate">{getCpPlatformIcon(platform)}</span>
            </div>
          ))}
        </div>

        <div>
          <p className="text-terminal-dim">Social Icons:</p>
          <div className="flex items-center gap-2 ml-2">
            <span>LinkedIn:</span>
            <img src={getSocialIcon("linkedin")} alt="linkedin" className="w-4 h-4" />
            <span className="text-terminal-dim text-[10px] truncate">{getSocialIcon("linkedin")}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => document.getElementById('icon-debug')?.remove()}
        className="mt-2 text-terminal-dim hover:text-terminal-glow"
      >
        [close]
      </button>
    </div>
  );
}
