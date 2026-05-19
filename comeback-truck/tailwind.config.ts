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
        "ct-black": "#0E0B0A",
        "ct-charcoal": "#1A1614",
        "ct-surface": "#231C18",
        "ct-surface-2": "#2D2521",
        "ct-border": "#3A2E27",
        "ct-mustard": "#E5A018",
        "ct-mustard-light": "#F0B53D",
        "ct-mustard-dark": "#B8800F",
        "ct-red": "#B5301E",
        "ct-red-dark": "#8A1F11",
        "ct-cream": "#F5EDD8",
        "ct-cream-muted": "#C4B89C",
        "ct-muted": "#8A7F73",
      },
      backgroundImage: {
        "gradient-mustard":
          "linear-gradient(135deg, #E5A018 0%, #F0B53D 50%, #B8800F 100%)",
        "gradient-smoke":
          "linear-gradient(180deg, #0E0B0A 0%, #1A1614 100%)",
        "gradient-heat":
          "linear-gradient(135deg, #B5301E 0%, #E5A018 100%)",
      },
      fontFamily: {
        display: ["Alfa Slab One", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
