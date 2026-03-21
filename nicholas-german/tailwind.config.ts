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
        "ng-black": "#080808",
        "ng-surface": "#111111",
        "ng-surface-2": "#1A1A1A",
        "ng-border": "#2C2C2C",
        "ng-amber": "#E8921A",
        "ng-amber-light": "#F5A832",
        "ng-amber-dark": "#C47610",
        "ng-cream": "#F0EBE3",
        "ng-muted": "#888880",
        "ng-charcoal": "#222222",
      },
      backgroundImage: {
        "gradient-amber": "linear-gradient(135deg, #E8921A 0%, #F5A832 50%, #C47610 100%)",
        "gradient-dark": "linear-gradient(180deg, #080808 0%, #111111 100%)",
        "gradient-stage": "radial-gradient(ellipse at top, #2A1A0A 0%, #080808 70%)",
      },
      fontFamily: {
        display: ["Oswald", "Impact", "sans-serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
