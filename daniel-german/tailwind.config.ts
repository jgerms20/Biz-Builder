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
        "dg-black": "#0A0A0A",
        "dg-surface": "#141414",
        "dg-surface-light": "#1C1C1C",
        "dg-border": "#2A2A2A",
        "dg-border-light": "#3A3A3A",
        cream: "#F5F0E8",
        "cream-muted": "#C8C0B4",
        gold: "#C9A85C",
        "gold-dark": "#A88A40",
        "gold-light": "#D9BF80",
        burgundy: "#6B1F2A",
        "burgundy-light": "#8A2E3C",
        "burgundy-dark": "#4A1520",
      },
      fontFamily: {
        serif: ["Cormorant Garant", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": [
          "4.5rem",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        "display-lg": [
          "3.5rem",
          { lineHeight: "1.1", letterSpacing: "-0.015em" },
        ],
        "display-md": [
          "2.5rem",
          { lineHeight: "1.15", letterSpacing: "-0.01em" },
        ],
        "display-sm": ["1.875rem", { lineHeight: "1.2" }],
      },
      spacing: {
        section: "6rem",
        "section-sm": "4rem",
      },
      maxWidth: {
        content: "1140px",
      },
      borderRadius: {
        brand: "2px",
      },
      backgroundImage: {
        "gradient-gold":
          "linear-gradient(135deg, #C9A85C 0%, #D9BF80 50%, #A88A40 100%)",
        "gradient-dark":
          "linear-gradient(180deg, #0A0A0A 0%, #141414 100%)",
        "gradient-burgundy":
          "linear-gradient(135deg, #6B1F2A 0%, #4A1520 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
