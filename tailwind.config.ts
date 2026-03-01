import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "terminal-bg": "#000000",
        "terminal-text": "#00FF00",
        "terminal-glow": "var(--terminal-glow, #00FF41)",
        "terminal-dim": "#00802080",
        "terminal-border": "#00FF0033",
        "terminal-amber": "#FFB000",
      },
      fontFamily: {
        mono: [
          "'Courier New'",
          "Courier",
          "Monaco",
          "'Lucida Console'",
          "monospace",
        ],
      },
      boxShadow: {
        "terminal-glow": "0 0 10px #00FF0066, 0 0 20px #00FF0033, 0 0 40px #00FF0011",
        "text-glow": "0 0 5px #00FF0099, 0 0 10px #00FF0066",
        "border-glow": "inset 0 0 10px #00FF0022, 0 0 10px #00FF0022",
      },
      animation: {
        scanline: "scanline 8s linear infinite",
        blink: "blink 1s step-end infinite",
        "cursor-blink": "blink 0.8s step-end infinite",
        flicker: "flicker 0.15s infinite",
        "cursor-trail-fade": "cursor-trail-fade 0.3s ease-out forwards",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        flicker: {
          "0%": { opacity: "0.97" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0.98" },
        },
        "cursor-trail-fade": {
          "0%": { opacity: "0.8", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.3)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
