import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Operating-console palette: near-black ground, signal accents
        ink: "#08090B",
        surface: "#0E1014",
        raised: "#14171D",
        elevated: "#1B1F27",
        line: "#242933",
        "line-bright": "#333A47",
        signal: "#4ADE80",
        "signal-dim": "#22A45D",
        amber: "#FBBF24",
        "amber-dim": "#B27F0C",
        ion: "#60A5FA",
        "ion-dim": "#2563EB",
        violet: "#A78BFA",
        rose: "#FB7185",
        chalk: "#F4F5F7",
        muted: "#9AA3B2",
        faint: "#5C6675",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      backgroundImage: {
        grid: "linear-gradient(#242933 1px, transparent 1px), linear-gradient(90deg, #242933 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
